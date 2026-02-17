import type { GameState, SaveFile } from '../store/types'

const SAVE_KEY = 'silva_maximus_save'
const BACKUP_KEY = 'silva_maximus_backup'
const CURRENT_VERSION = 8

export function saveGame(state: GameState): void {
  const saveFile: SaveFile = {
    version: CURRENT_VERSION,
    savedAt: Date.now(),
    state,
  }

  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(saveFile))
  } catch (e) {
    console.error('Failed to save game:', e)
  }
}

export function loadGame(): GameState | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    if (!raw) return null

    const saveFile: SaveFile = JSON.parse(raw)

    // Run migrations if needed
    const migrated = migrate(saveFile)

    return migrated.state
  } catch (e) {
    console.error('Failed to load save:', e)
    return null
  }
}

export function deleteSave(): void {
  localStorage.removeItem(SAVE_KEY)
}

export function hasSave(): boolean {
  return localStorage.getItem(SAVE_KEY) !== null
}

// ── Backup (pre-reset snapshot) ──

/** Copy current main save to backup slot (called before reset) */
export function backupSave(): void {
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    if (raw) {
      localStorage.setItem(BACKUP_KEY, raw)
    }
  } catch (e) {
    console.error('Failed to backup save:', e)
  }
}

export function loadBackup(): GameState | null {
  try {
    const raw = localStorage.getItem(BACKUP_KEY)
    if (!raw) return null
    const saveFile: SaveFile = JSON.parse(raw)
    const migrated = migrate(saveFile)
    return migrated.state
  } catch (e) {
    console.error('Failed to load backup:', e)
    return null
  }
}

export function hasBackup(): boolean {
  return localStorage.getItem(BACKUP_KEY) !== null
}

export function deleteBackup(): void {
  localStorage.removeItem(BACKUP_KEY)
}

export interface SaveSlotInfo {
  key: 'main' | 'backup'
  label: string
  savedAt: number
  phase: number
  gameMode: string | null
  totalStammar: number
}

/** Get info about all available save slots */
export function getSaveSlots(): SaveSlotInfo[] {
  const slots: SaveSlotInfo[] = []

  for (const [key, storageKey, label] of [
    ['main', SAVE_KEY, 'Senaste sparning'],
    ['backup', BACKUP_KEY, 'Före nollställning'],
  ] as const) {
    try {
      const raw = localStorage.getItem(storageKey)
      if (!raw) continue
      const sf: SaveFile = JSON.parse(raw)
      const state = migrate(sf).state
      slots.push({
        key,
        label,
        savedAt: sf.savedAt,
        phase: state.phase,
        gameMode: state.gameMode,
        totalStammar: state.totalStammar ?? 0,
      })
    } catch { /* skip corrupt slots */ }
  }

  return slots
}

export function exportSave(state: GameState): string {
  const saveFile: SaveFile = {
    version: CURRENT_VERSION,
    savedAt: Date.now(),
    state,
  }
  return btoa(JSON.stringify(saveFile))
}

export function importSave(encoded: string): GameState | null {
  try {
    const json = atob(encoded)
    const saveFile: SaveFile = JSON.parse(json)
    const migrated = migrate(saveFile)
    return migrated.state
  } catch (e) {
    console.error('Failed to import save:', e)
    return null
  }
}

// ── Migration Framework ──
// Add migration functions as the save format evolves.

type MigrationFn = (save: SaveFile) => SaveFile

const migrations: Record<number, MigrationFn> = {
  1: (save) => {
    // v1 → v2: Add ownerActionCooldowns field
    if (!save.state.ownerActionCooldowns) {
      (save.state as GameState).ownerActionCooldowns = {}
    }
    save.version = 2
    return save
  },
  2: (save) => {
    // v2 → v3: Add expansionTargets field for Sprint 5
    if (!(save.state as GameState).expansionTargets) {
      (save.state as GameState).expansionTargets = {}
    }
    save.version = 3
    return save
  },
  3: (save) => {
    // v3 → v4: Add countries and warningLevel for Sprint 6
    const state = save.state as GameState
    if (!state.countries) {
      state.countries = {}
    }
    if (state.warningLevel === undefined) {
      state.warningLevel = 0
    }
    save.version = 4
    return save
  },
  4: (save) => {
    // v4 → v5: Add gameMode and owner (Skogsägare) path fields
    const state = save.state as GameState
    if (state.gameMode === undefined) {
      // Existing saves are industry path
      (state as GameState).gameMode = 'industry'
    }
    if (state.skogsvardering === undefined) state.skogsvardering = 0
    if (state.skogsvarderingPerSecond === undefined) state.skogsvarderingPerSecond = 0
    if (state.skogsvarderingPerClick === undefined) state.skogsvarderingPerClick = 1
    if (state.inkomst === undefined) state.inkomst = 0
    if (state.kunskap === undefined) state.kunskap = 0
    if (state.resiliens === undefined) state.resiliens = 10
    if (state.biodivOwner === undefined) state.biodivOwner = 5
    if (state.realCarbonPos === undefined) state.realCarbonPos = 0
    if (state.legacy === undefined) state.legacy = 0
    if (state.deadwood === undefined) state.deadwood = 0
    if (state.ownerClickCount === undefined) state.ownerClickCount = 0
    if (state.totalSkogsvardering === undefined) state.totalSkogsvardering = 0
    if (!state.ownerGenerators) state.ownerGenerators = {}
    if (!state.ownerClickUpgrades) state.ownerClickUpgrades = {}
    if (!state.ownerAttacksResisted) state.ownerAttacksResisted = {}
    if (state.ownerLuresDeclined === undefined) state.ownerLuresDeclined = 0
    save.version = 5
    return save
  },
  5: (save) => {
    // v5 → v6: Add industry attack/lure modal state and tracking
    const state = save.state as GameState
    if (!state.ownerAttacksSurrendered) state.ownerAttacksSurrendered = {}
    if (!state.ownerLuresAccepted) state.ownerLuresAccepted = {}
    if (state.activeIndustryAttack === undefined) state.activeIndustryAttack = null
    if (state.activeIndustryLure === undefined) state.activeIndustryLure = null
    save.version = 6
    return save
  },
  6: (save) => {
    // v6 → v7: Add ownerKnowledgeUpgrades + convert expansionTargets to cosmic conquest
    const state = save.state as GameState
    if (!state.ownerKnowledgeUpgrades) state.ownerKnowledgeUpgrades = {}

    // Convert old expansion targets format to new CosmicTargetState
    if (state.expansionTargets) {
      const oldTargets = state.expansionTargets as Record<string, { acquired?: boolean; status?: string }>
      const newTargets: Record<string, {
        status: string; resistance: number; controlProgress: number;
        pressureAllocation: { energi: number; byrakrati: number; resurser: number }
      }> = {}

      // Import target defs for resistance values
      const targetResistanceMap: Record<string, number> = {
        exp_manen: 40, exp_mars: 50, exp_titan: 55, exp_proxima: 60,
        exp_dyson: 65, exp_universe_alpha: 60, exp_universe_beta: 65, exp_tidslinje: 75,
      }

      for (const [id, entry] of Object.entries(oldTargets)) {
        if (entry.acquired || entry.status === 'controlled') {
          newTargets[id] = {
            status: 'controlled',
            resistance: 0,
            controlProgress: 100,
            pressureAllocation: { energi: 0, byrakrati: 0, resurser: 0 },
          }
        } else if (entry.status) {
          // Already in new format, keep as-is
          newTargets[id] = entry as typeof newTargets[string]
        } else {
          newTargets[id] = {
            status: 'available',
            resistance: targetResistanceMap[id] ?? 50,
            controlProgress: 0,
            pressureAllocation: { energi: 0, byrakrati: 0, resurser: 0 },
          }
        }
      }

      ;(state as unknown as Record<string, unknown>).expansionTargets = newTargets
    }

    save.version = 7
    return save
  },
  7: (save) => {
    // v7 → v8: Add entropi, simplify expansion targets (remove pressure/resistance)
    const state = save.state as GameState
    if ((state as Record<string, unknown>).entropi === undefined) {
      (state as Record<string, unknown>).entropi = state.phase >= 12 ? 100 : 100
    }

    // Convert expansion target states: remove pressure/resistance, drop removed targets
    const validTargetIds = new Set(['exp_manen', 'exp_mars', 'exp_dyson', 'exp_universe_alpha', 'exp_tidslinje'])
    if (state.expansionTargets) {
      const oldTargets = state.expansionTargets as Record<string, { status?: string; acquired?: boolean }>
      const newTargets: Record<string, { status: string }> = {}

      for (const [id, entry] of Object.entries(oldTargets)) {
        if (!validTargetIds.has(id)) continue // drop removed targets
        if (entry.status === 'controlled' || entry.acquired) {
          newTargets[id] = { status: 'controlled' }
        }
        // Drop 'conquering' entries — they lose their progress (no more conquest mechanic)
      }

      ;(state as unknown as Record<string, unknown>).expansionTargets = newTargets
    }

    save.version = 8
    return save
  },
}

function migrate(save: SaveFile): SaveFile {
  let current = save

  while (current.version < CURRENT_VERSION) {
    const fn = migrations[current.version]
    if (!fn) {
      console.warn(`No migration for version ${current.version}, resetting`)
      break
    }
    current = fn(current)
  }

  return current
}
