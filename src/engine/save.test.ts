import { describe, it, expect, beforeEach } from 'vitest'
import {
  saveGame,
  loadGame,
  deleteSave,
  hasSave,
  backupSave,
  loadBackup,
  hasBackup,
  deleteBackup,
  exportSave,
  importSave,
  getSaveSlots,
} from './save'
import type { GameState, Phase, SaveFile } from '../store/types'

function makeMinimalState(overrides: Partial<GameState> = {}): GameState {
  return {
    gameMode: 'industry',
    phase: 1 as Phase,
    startedAt: Date.now(),
    lastTickAt: Date.now(),
    lastSaveAt: 0,
    totalPlayTime: 0,
    stammar: 0,
    stammarPerSecond: 0,
    stammarPerClick: 1,
    kapital: 0,
    lobby: 0,
    image: 50,
    realCO2: 0,
    ownerProfit: 0,
    industryProfit: 0,
    biodiversity: 100,
    species: 0,
    samiLand: 0,
    ownerTrust: 50,
    clickCount: 0,
    totalStammar: 0,
    generators: {},
    upgrades: {},
    clickUpgrades: {},
    lobbyProjects: {},
    antagonists: {},
    expansionTargets: {},
    countries: {},
    warningLevel: 0,
    entropi: 100,
    ownerActionCooldowns: {},
    eventQueue: [],
    eventHistory: [],
    activeEvent: null,
    nextEventAt: 0,
    lastEventFiredAt: {},
    achievements: {},
    pendingTransition: null,
    settings: { musicVolume: 0.5, sfxVolume: 0.5, notificationsEnabled: true, theme: 'default' },
    skogsvardering: 0,
    skogsvarderingPerSecond: 0,
    skogsvarderingPerClick: 1,
    inkomst: 0,
    kunskap: 0,
    resiliens: 10,
    biodivOwner: 5,
    realCarbonPos: 0,
    legacy: 0,
    deadwood: 0,
    ownerClickCount: 0,
    totalSkogsvardering: 0,
    ownerGenerators: {},
    ownerClickUpgrades: {},
    ownerAttacksResisted: {},
    ownerAttacksSurrendered: {},
    ownerLuresDeclined: 0,
    ownerLuresAccepted: {},
    activeIndustryAttack: null,
    activeIndustryLure: null,
    ownerKnowledgeUpgrades: {},
    lastKnowledgeActivityAt: 0,
    ownerPhase: 1,
    entropyPurchases: {},
    milestonesSeen: {},
    epilogChosen: false,
    gameSpeed: 1,
    goldenMultiplierUntil: 0,
    ...overrides,
  }
}

beforeEach(() => {
  localStorage.clear()
})

describe('save/load round-trip', () => {
  it('saves and loads state correctly', () => {
    const state = makeMinimalState({ stammar: 500, phase: 3 as Phase })
    saveGame(state)
    const loaded = loadGame()
    expect(loaded).not.toBeNull()
    expect(loaded!.stammar).toBe(500)
    expect(loaded!.phase).toBe(3)
  })

  it('hasSave returns true after save', () => {
    expect(hasSave()).toBe(false)
    saveGame(makeMinimalState())
    expect(hasSave()).toBe(true)
  })

  it('deleteSave removes the save', () => {
    saveGame(makeMinimalState())
    expect(hasSave()).toBe(true)
    deleteSave()
    expect(hasSave()).toBe(false)
  })

  it('loadGame returns null when no save exists', () => {
    expect(loadGame()).toBeNull()
  })

  it('loadGame returns null for corrupt save data', () => {
    localStorage.setItem('silva_maximus_save', 'not json at all')
    expect(loadGame()).toBeNull()
  })
})

describe('backup', () => {
  it('creates backup from main save', () => {
    saveGame(makeMinimalState({ stammar: 999 }))
    backupSave()
    expect(hasBackup()).toBe(true)
    const backup = loadBackup()
    expect(backup).not.toBeNull()
    expect(backup!.stammar).toBe(999)
  })

  it('hasBackup returns false when no backup', () => {
    expect(hasBackup()).toBe(false)
  })

  it('deleteBackup removes the backup', () => {
    saveGame(makeMinimalState())
    backupSave()
    deleteBackup()
    expect(hasBackup()).toBe(false)
  })

  it('does nothing when no main save exists', () => {
    backupSave()
    expect(hasBackup()).toBe(false)
  })
})

describe('export/import', () => {
  it('round-trips state through export/import', () => {
    const state = makeMinimalState({ stammar: 12345, phase: 7 as Phase })
    const encoded = exportSave(state)
    const imported = importSave(encoded)
    expect(imported).not.toBeNull()
    expect(imported!.stammar).toBe(12345)
    expect(imported!.phase).toBe(7)
  })

  it('importSave returns null for invalid data', () => {
    expect(importSave('not-base64-json')).toBeNull()
  })
})

describe('getSaveSlots', () => {
  it('returns empty array when no saves', () => {
    expect(getSaveSlots()).toEqual([])
  })

  it('returns main slot info', () => {
    saveGame(makeMinimalState({ phase: 5 as Phase, totalStammar: 1_000_000 }))
    const slots = getSaveSlots()
    expect(slots).toHaveLength(1)
    expect(slots[0].key).toBe('main')
    expect(slots[0].phase).toBe(5)
    expect(slots[0].totalStammar).toBe(1_000_000)
  })

  it('returns both slots when backup exists', () => {
    saveGame(makeMinimalState({ phase: 3 as Phase }))
    backupSave()
    saveGame(makeMinimalState({ phase: 6 as Phase }))
    const slots = getSaveSlots()
    expect(slots).toHaveLength(2)
  })
})

describe('migrations', () => {
  function makeV1Save(stateOverrides: Record<string, unknown> = {}): string {
    const save: SaveFile = {
      version: 1,
      savedAt: Date.now(),
      state: {
        // v1 saves did NOT have gameMode — migration v4→v5 adds it
        phase: 1,
        startedAt: Date.now(),
        lastTickAt: Date.now(),
        lastSaveAt: 0,
        totalPlayTime: 0,
        stammar: 100,
        stammarPerSecond: 0,
        stammarPerClick: 1,
        kapital: 0,
        lobby: 0,
        image: 50,
        realCO2: 0,
        ownerProfit: 0,
        industryProfit: 0,
        biodiversity: 100,
        species: 0,
        samiLand: 0,
        ownerTrust: 50,
        clickCount: 0,
        totalStammar: 100,
        generators: {},
        upgrades: {},
        clickUpgrades: {},
        lobbyProjects: {},
        antagonists: {},
        eventQueue: [],
        eventHistory: [],
        activeEvent: null,
        nextEventAt: 0,
        achievements: {},
        pendingTransition: null,
        settings: { musicVolume: 0.5, sfxVolume: 0.5, notificationsEnabled: true, theme: 'default' },
        ...stateOverrides,
      } as unknown as GameState,
    }
    return JSON.stringify(save)
  }

  it('migrates v1 → v12 (full chain)', () => {
    localStorage.setItem('silva_maximus_save', makeV1Save())
    const state = loadGame()
    expect(state).not.toBeNull()

    // Fields added by migrations
    expect(state!.ownerActionCooldowns).toEqual({})   // v1→v2
    expect(state!.expansionTargets).toBeDefined()      // v2→v3 (simplified in v7→v8)
    expect(state!.countries).toEqual({})               // v3→v4
    expect(state!.warningLevel).toBe(0)                // v3→v4
    expect(state!.gameMode).toBe('industry')           // v4→v5 (existing saves → industry)
    expect(state!.skogsvardering).toBe(0)              // v4→v5
    expect(state!.kunskap).toBe(0)                     // v4→v5
    expect(state!.resiliens).toBe(10)                  // v4→v5
    expect(state!.biodivOwner).toBe(5)                 // v4→v5
    expect(state!.ownerAttacksSurrendered).toEqual({}) // v5→v6
    expect(state!.activeIndustryAttack).toBeNull()     // v5→v6
    expect(state!.ownerKnowledgeUpgrades).toEqual({})  // v6→v7
    expect(state!.entropi).toBe(100)                   // v7→v8
    expect(state!.lastKnowledgeActivityAt).toBe(0)     // v8→v9
    expect(state!.ownerPhase).toBe(1)                  // v8→v9
    expect(state!.entropyPurchases).toEqual({})         // v9→v10
    expect(state!.milestonesSeen).toEqual({})           // v9→v10
    expect(state!.epilogChosen).toBe(false)            // v9→v10
    expect(state!.lastEventFiredAt).toEqual({})        // v11→v12
  })

  it('migrates v4 save (adds owner fields)', () => {
    const save = {
      version: 4,
      savedAt: Date.now(),
      state: {
        phase: 3,
        stammar: 50000,
        totalStammar: 50000,
        stammarPerSecond: 100,
        stammarPerClick: 5,
        kapital: 1000,
        lobby: 50,
        image: 45,
        ownerTrust: 55,
        generators: {},
        upgrades: {},
        clickUpgrades: {},
        lobbyProjects: {},
        antagonists: {},
        expansionTargets: {},
        countries: {},
        warningLevel: 0,
        ownerActionCooldowns: {},
        eventQueue: [],
        eventHistory: [],
        activeEvent: null,
        nextEventAt: 0,
        achievements: {},
        pendingTransition: null,
        settings: { musicVolume: 0.5, sfxVolume: 0.5, notificationsEnabled: true, theme: 'default' },
        startedAt: Date.now(),
        lastTickAt: Date.now(),
        lastSaveAt: 0,
        totalPlayTime: 1000,
        realCO2: 10,
        ownerProfit: 100,
        industryProfit: 500,
        biodiversity: 90,
        species: 2,
        samiLand: 5,
        clickCount: 200,
      },
    }
    localStorage.setItem('silva_maximus_save', JSON.stringify(save))
    const state = loadGame()
    expect(state).not.toBeNull()
    expect(state!.gameMode).toBe('industry')
    expect(state!.skogsvardering).toBe(0)
    expect(state!.ownerGenerators).toEqual({})
    expect(state!.stammar).toBe(50000) // preserved
  })

  it('preserves v12 save without changes', () => {
    const state = makeMinimalState({ stammar: 777, phase: 5 as Phase })
    saveGame(state)
    const loaded = loadGame()
    expect(loaded).not.toBeNull()
    expect(loaded!.stammar).toBe(777)
    expect(loaded!.phase).toBe(5)
  })

  it('v10→v11 sets activatedAt on active antagonists', () => {
    const save = {
      version: 10,
      savedAt: Date.now(),
      state: makeMinimalState({
        antagonists: {
          ant_skovarnarna: { active: true, countered: false },
          ant_greta: { active: false, countered: true },
        } as Record<string, { active: boolean; countered: boolean; activatedAt?: number }>,
      }),
    }
    localStorage.setItem('silva_maximus_save', JSON.stringify(save))
    const state = loadGame()
    expect(state).not.toBeNull()
    const skov = state!.antagonists.ant_skovarnarna as { activatedAt?: number }
    expect(skov.activatedAt).toBeDefined()
    expect(skov.activatedAt).toBeGreaterThan(0)
    const greta = state!.antagonists.ant_greta as { activatedAt?: number }
    expect(greta.activatedAt).toBeUndefined()
  })
})
