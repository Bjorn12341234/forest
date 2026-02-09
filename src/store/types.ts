// ── Silva Maximus — Game State Types ──
// Matches spec.md schema. Single source of truth for all game state types.

export type Phase = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export interface GameState {
  // Meta
  phase: Phase
  startedAt: number
  lastTickAt: number
  lastSaveAt: number
  totalPlayTime: number

  // Primary Resources
  stammar: number            // lifetime total (never decreases)
  stammarPerSecond: number   // computed each tick
  stammarPerClick: number    // base + upgrades
  kapital: number            // currency, spendable
  lobby: number              // Politiskt Kapital
  image: number              // Grön Image™, 0-100

  // Hidden Resources (not shown until endgame/reveal)
  realCO2: number
  ownerProfit: number
  industryProfit: number
  biodiversity: number       // 0-100%, starts at 100
  species: number            // species lost count
  samiLand: number           // reindeer grazing land lost (km²)

  // Skogsägarförtroende
  ownerTrust: number         // 0-100, starts at 50

  // Tracking
  clickCount: number
  totalStammar: number       // lifetime total for phase thresholds

  // Generators
  generators: Record<string, GeneratorState>

  // Upgrades
  upgrades: Record<string, UpgradeState>

  // Click upgrades purchased
  clickUpgrades: Record<string, boolean>

  // Lobby projects
  lobbyProjects: Record<string, LobbyProjectState>

  // Antagonists
  antagonists: Record<string, AntagonistState>

  // Expansion targets (acquired territories)
  expansionTargets: Record<string, ExpansionTargetState>

  // Owner action cooldowns (timestamp when action becomes available again)
  ownerActionCooldowns: Record<string, number>

  // Events
  eventQueue: GameEvent[]
  eventHistory: string[]
  activeEvent: GameEvent | null
  nextEventAt: number

  // Achievements
  achievements: Record<string, boolean>

  // Phase transition
  pendingTransition: { from: Phase; to: Phase } | null

  // Settings
  settings: GameSettings
}

export interface GeneratorState {
  count: number
  unlocked: boolean
}

export interface UpgradeState {
  purchased: boolean
  count: number
  unlocked: boolean
}

export interface LobbyProjectState {
  purchased: boolean
  count: number
  unlocked: boolean
}

export interface AntagonistState {
  active: boolean
  countered: boolean
}

export interface ExpansionTargetState {
  acquired: boolean
  acquiredAt: number
}

export interface GameEvent {
  id: string
  phase: number
  category: string
  headline: string
  context: string
  choices: EventChoice[]
  conditions?: EventCondition[]
  cooldown?: number
  unique?: boolean
}

export interface EventChoice {
  label: string
  effects: Effect[]
  description?: string
}

export interface Effect {
  resource: string
  amount: number
  type: 'add' | 'multiply' | 'set'
  duration?: number
}

export interface EventCondition {
  resource: string
  operator: '>' | '<' | '>=' | '<=' | '=='
  value: number
}

export interface GameSettings {
  musicVolume: number
  sfxVolume: number
  notificationsEnabled: boolean
  theme: string
}

// ── Upgrade Data (config, not state) ──

export interface UpgradeData {
  id: string
  name: string
  description: string
  tree: string
  icon: string
  baseCost: number
  costResource: 'kapital' | 'stammar' | 'lobby'
  production: number
  maxCount: number
  effects?: UpgradeEffect[]
  prerequisites?: string[]
  unlockAt?: UnlockCondition
  phase: number
}

export interface UpgradeEffect {
  type: 'stammarPerClick' | 'stammarPerSecond' | 'kapitalPerSecond' | 'gpsMultiplier'
  value: number
}

export interface UnlockCondition {
  resource: 'stammar' | 'kapital' | 'totalStammar' | 'clickCount'
  threshold: number
}

// Save file wrapper
export interface SaveFile {
  version: number
  savedAt: number
  state: GameState
}

// Store actions
export interface GameActions {
  tick: (now: number) => void
  click: () => void
  buyGenerator: (id: string) => void
  buyClickUpgrade: (id: string) => void
  purchaseUpgrade: (id: string) => void
  unlockUpgrade: (id: string) => void
  buyLobbyEarner: (id: string) => void
  buyLobbyProject: (id: string) => void
  performOwnerAction: (id: string) => void
  buyPRCampaign: (id: string) => void
  counterAntagonist: (id: string) => void
  acquireExpansionTarget: (id: string) => void
  resolveEvent: (choiceIndex: number) => void
  dismissEvent: () => void
  save: () => void
  load: () => boolean
  reset: () => void
  setPhase: (phase: Phase) => void
  triggerPhaseTransition: (from: Phase, to: Phase) => void
  completePhaseTransition: () => void
  updateSettings: (settings: Partial<GameSettings>) => void
  applyEffect: (effect: Effect) => void
}
