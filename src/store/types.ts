// ── Silva Maximus — Game State Types ──
// Matches spec.md schema. Single source of truth for all game state types.

export type Phase = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
export type Era = 'SVERIGE' | 'MAKT' | 'INTERNATIONELL' | 'EXPANSION'
export type GameMode = 'industry' | 'owner' | null

export interface GameState {
  // Meta
  gameMode: GameMode
  phase: Phase
  startedAt: number
  lastTickAt: number
  lastSaveAt: number
  totalPlayTime: number

  // ── Industry Path Resources ──
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

  // Country takeover state (INTERNATIONELL era)
  countries: Record<string, CountryState>

  // Warning level based on image (0-3)
  warningLevel: 0 | 1 | 2 | 3

  // Entropy countdown (phase 12, 100→0)
  entropi: number

  // Owner action cooldowns (timestamp when action becomes available again)
  ownerActionCooldowns: Record<string, number>

  // Events
  eventQueue: GameEvent[]
  eventHistory: string[]
  activeEvent: GameEvent | null
  nextEventAt: number
  /** Timestamp of last firing per replayable event (for 15-min cooldown) */
  lastEventFiredAt: Record<string, number>

  // Achievements
  achievements: Record<string, boolean>

  // Phase transition
  pendingTransition: { from: Phase; to: Phase } | null

  // Settings
  settings: GameSettings

  // ── Owner (Skogsägare) Path Resources ──
  skogsvardering: number       // forest value — click resource
  skogsvarderingPerSecond: number // computed each tick
  skogsvarderingPerClick: number  // base + upgrades
  inkomst: number              // income (tkr) — currency
  kunskap: number              // knowledge — replaces lobby
  resiliens: number            // forest resilience (storm/pest resistance)

  // Owner visible meters
  biodivOwner: number          // species count in owner's forest
  realCarbonPos: number        // real carbon storage (positive)
  legacy: number               // generational legacy meter
  deadwood: number             // dead wood → biodiversity boost

  // Owner tracking
  ownerClickCount: number
  totalSkogsvardering: number  // lifetime total for milestone triggers

  // Owner generators & upgrades
  ownerGenerators: Record<string, GeneratorState>
  ownerClickUpgrades: Record<string, boolean>

  // Owner antagonism tracking
  ownerAttacksResisted: Record<string, boolean>
  ownerAttacksSurrendered: Record<string, boolean>
  ownerLuresDeclined: number
  ownerLuresAccepted: Record<string, boolean>

  // Active industry attack/lure (owner path modal state)
  activeIndustryAttack: string | null
  activeIndustryLure: string | null

  // Owner knowledge tree upgrades
  ownerKnowledgeUpgrades: Record<string, boolean>

  // Owner knowledge activity cooldown
  lastKnowledgeActivityAt: number

  // Owner phase (1-3 based on totalSkogsvardering)
  ownerPhase: number

  // ── Sprint 10: Game Feel ──

  // Entropy-slowing purchases (phase 12)
  entropyPurchases: Record<string, boolean>

  // Milestones already celebrated (don't re-toast)
  milestonesSeen: Record<string, boolean>

  // Player chose to continue to Epilog (phases 10-12) after Årsredovisning
  epilogChosen: boolean

  // Game speed multiplier (1 = normal, 5 = fast-forward) — ephemeral, not persisted
  gameSpeed: number

  // Golden opportunity production multiplier active until (timestamp, 0 = inactive)
  goldenMultiplierUntil: number
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
  /** Timestamp when antagonist became active (for escalation timer) */
  activatedAt?: number
  /** Whether this antagonist has escalated (2× penalties, +50% counter cost) */
  escalated?: boolean
}

export interface ExpansionTargetState {
  status: 'locked' | 'available' | 'in_progress' | 'controlled'
  supplyChain?: { stage: 0 | 1 | 2 | 3; stageProgress: number; stageStartedAt?: number }
  terraform?: { atmosphere: number; soil: number; water: number; allocation: { atmosphere: number; soil: number; water: number } }
  megaproject?: { progress: number; bonusesClaimed: number }
  rift?: { sacrificePercent: number; progress: number }
  paradox?: { currentWave: 0 | 1 | 2 | 3; waveProgress: number; waveStartedAt?: number }
}

export interface CountryState {
  status: 'locked' | 'available' | 'invading' | 'controlled' | 'rebelling'
  resistance: number           // 0-100, must reduce to 0 to control
  controlProgress: number      // 0-100, tracks invasion progress
  rebellionTimer?: number       // timestamp when rebellion started
  pressureAllocation?: {
    kapital: number
    lobby: number
    stammar: number
  }
}

export interface GameEvent {
  id: string
  phase: number
  maxPhase?: number            // event won't appear after this phase
  category: string
  headline: string
  context: string
  choices: EventChoice[]
  conditions?: EventCondition[]
  cooldown?: number
  unique?: boolean
  /** If true, this event can fire multiple times (15-min cooldown between repeats) */
  replayable?: boolean
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
  /** If set, buying this upgrade locks out the other upgrade (mutually exclusive fork) */
  exclusiveWith?: string
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
  ownerClick: () => void
  setGameMode: (mode: 'industry' | 'owner') => void
  buyOwnerGenerator: (id: string) => void
  buyOwnerClickUpgrade: (id: string) => void
  buyKnowledgeActivity: (id: string) => void
  resolveIndustryAttack: (accept: boolean) => void
  resolveIndustryLure: (accept: boolean) => void
  buyGenerator: (id: string) => void
  buyClickUpgrade: (id: string) => void
  purchaseUpgrade: (id: string) => void
  unlockUpgrade: (id: string) => void
  buyLobbyEarner: (id: string) => void
  buyLobbyProject: (id: string) => void
  performOwnerAction: (id: string) => void
  buyPRCampaign: (id: string) => void
  counterAntagonist: (id: string) => void
  purchaseOwnerKnowledge: (id: string) => void
  buyExpansionTarget: (id: string) => void
  startExpansionTarget: (id: string) => void
  advanceSupplyChainStage: (id: string) => void
  setTerraformAllocation: (id: string, alloc: { atmosphere: number; soil: number; water: number }) => void
  setSacrificePercent: (id: string, percent: number) => void
  invadeCountry: (id: string) => void
  allocatePressure: (id: string, vector: 'kapital' | 'lobby' | 'stammar', amount: number) => void
  buyEntropyPurchase: (id: string) => void
  setGameSpeed: (speed: number) => void
  activateGoldenMultiplier: (durationMs: number, multiplier: number) => void
  markMilestoneSeen: (key: string) => void
  resolveEvent: (choiceIndex: number) => void
  dismissEvent: () => void
  save: () => void
  load: () => boolean
  loadFromBackup: () => boolean
  reset: () => void
  setPhase: (phase: Phase) => void
  triggerPhaseTransition: (from: Phase, to: Phase) => void
  completePhaseTransition: () => void
  updateSettings: (settings: Partial<GameSettings>) => void
  applyEffect: (effect: Effect) => void
}
