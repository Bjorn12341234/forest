// ── Silva Maximus — Expansion Targets Data ──
// Territories to acquire on the stylized world/space/multiverse map
// Now with cosmic conquest mechanics (resistance, defense types, pressure)

export type ExpansionRegion = 'space' | 'cosmic' | 'beyond'
export type CosmicDefenseType = 'gravitational' | 'bureaucratic' | 'existential'

export interface ExpansionTargetData {
  id: string
  name: string
  description: string
  unlockPhase: number
  cost: { stammar: number; kapital: number; lobby: number }
  production: { stammarPerSecond: number; kapitalPerSecond: number }
  hiddenCosts: { biodiversityLoss: number; co2Gain: number }
  region: ExpansionRegion
  position: { x: number; y: number }
  resistance: number
  defenseType: CosmicDefenseType
  defenseStrength: number
  maintenanceCost: { kapitalPerSecond: number; lobbyPerSecond: number }
}

export const EXPANSION_TARGETS: ExpansionTargetData[] = [
  // ── Countries now handle phases 7-9 (INTERNATIONELL era) ──
  // ── Expansion targets start at phase 10 (EXPANSION era) ──

  // ── Fas 10: Solsystemet ──
  {
    id: 'exp_manen',
    name: 'Månen',
    description: 'Lunar Silva AB. Registrerat på Caymanöarna.',
    unlockPhase: 10,
    cost: { stammar: 5_000_000_000_000, kapital: 50_000_000, lobby: 5_000 },
    production: { stammarPerSecond: 2_000_000, kapitalPerSecond: 20_000 },
    hiddenCosts: { biodiversityLoss: 0, co2Gain: 50000 },
    region: 'space',
    position: { x: 35, y: 30 },
    resistance: 40,
    defenseType: 'gravitational',
    defenseStrength: 3,
    maintenanceCost: { kapitalPerSecond: 5_000, lobbyPerSecond: 1 },
  },
  {
    id: 'exp_mars',
    name: 'Mars',
    description: 'Röd jord. Syntetisk gran. Orange vinst.',
    unlockPhase: 10,
    cost: { stammar: 10_000_000_000_000, kapital: 100_000_000, lobby: 8_000 },
    production: { stammarPerSecond: 5_000_000, kapitalPerSecond: 50_000 },
    hiddenCosts: { biodiversityLoss: 0, co2Gain: 100000 },
    region: 'space',
    position: { x: 55, y: 40 },
    resistance: 50,
    defenseType: 'bureaucratic',
    defenseStrength: 4,
    maintenanceCost: { kapitalPerSecond: 10_000, lobbyPerSecond: 2 },
  },
  {
    id: 'exp_titan',
    name: 'Titan',
    description: 'Metansjöar. Perfekt för industriell kylning.',
    unlockPhase: 10,
    cost: { stammar: 50_000_000_000_000, kapital: 500_000_000, lobby: 15_000 },
    production: { stammarPerSecond: 20_000_000, kapitalPerSecond: 200_000 },
    hiddenCosts: { biodiversityLoss: 0, co2Gain: 500000 },
    region: 'space',
    position: { x: 75, y: 55 },
    resistance: 55,
    defenseType: 'gravitational',
    defenseStrength: 5,
    maintenanceCost: { kapitalPerSecond: 50_000, lobbyPerSecond: 5 },
  },

  // ── Fas 11: Galaktisk ──
  {
    id: 'exp_proxima',
    name: 'Exoplanet Proxima b',
    description: 'Rutnätskogsbruk på 4,2 ljusårs avstånd.',
    unlockPhase: 11,
    cost: { stammar: 100_000_000_000_000, kapital: 1_000_000_000, lobby: 25_000 },
    production: { stammarPerSecond: 50_000_000, kapitalPerSecond: 500_000 },
    hiddenCosts: { biodiversityLoss: 0, co2Gain: 1000000 },
    region: 'cosmic',
    position: { x: 30, y: 35 },
    resistance: 60,
    defenseType: 'existential',
    defenseStrength: 6,
    maintenanceCost: { kapitalPerSecond: 100_000, lobbyPerSecond: 10 },
  },
  {
    id: 'exp_dyson',
    name: 'Dysonsfär',
    description: 'Stjärnenergi för industriell torkning av massa.',
    unlockPhase: 11,
    cost: { stammar: 200_000_000_000_000, kapital: 2_000_000_000, lobby: 40_000 },
    production: { stammarPerSecond: 100_000_000, kapitalPerSecond: 1_000_000 },
    hiddenCosts: { biodiversityLoss: 0, co2Gain: 5000000 },
    region: 'cosmic',
    position: { x: 50, y: 50 },
    resistance: 65,
    defenseType: 'gravitational',
    defenseStrength: 7,
    maintenanceCost: { kapitalPerSecond: 500_000, lobbyPerSecond: 20 },
  },

  // ── Fas 11-12: Bortom ──
  {
    id: 'exp_universe_alpha',
    name: 'Parallellt Universum Alpha',
    description: 'Identiskt med vårt. Dubbel produktion.',
    unlockPhase: 11,
    cost: { stammar: 5_000_000_000_000, kapital: 50_000_000_000, lobby: 100_000 },
    production: { stammarPerSecond: 1_000_000_000, kapitalPerSecond: 10_000_000 },
    hiddenCosts: { biodiversityLoss: 0, co2Gain: 50000000 },
    region: 'beyond',
    position: { x: 25, y: 35 },
    resistance: 60,
    defenseType: 'bureaucratic',
    defenseStrength: 6,
    maintenanceCost: { kapitalPerSecond: 1_000_000, lobbyPerSecond: 50 },
  },
  {
    id: 'exp_universe_beta',
    name: 'Parallellt Universum Beta',
    description: 'Där vann miljörörelsen. Vi fixar det.',
    unlockPhase: 11,
    cost: { stammar: 10_000_000_000_000, kapital: 100_000_000_000, lobby: 150_000 },
    production: { stammarPerSecond: 2_000_000_000, kapitalPerSecond: 20_000_000 },
    hiddenCosts: { biodiversityLoss: 0, co2Gain: 100000000 },
    region: 'beyond',
    position: { x: 75, y: 35 },
    resistance: 65,
    defenseType: 'existential',
    defenseStrength: 7,
    maintenanceCost: { kapitalPerSecond: 2_000_000, lobbyPerSecond: 75 },
  },
  {
    id: 'exp_tidslinje',
    name: 'Tidslinje-korrektion',
    description: 'Gå tillbaka och avverka dinosauriernas skog.',
    unlockPhase: 12,
    cost: { stammar: 50_000_000_000_000, kapital: 500_000_000_000, lobby: 500_000 },
    production: { stammarPerSecond: 10_000_000_000, kapitalPerSecond: 100_000_000 },
    hiddenCosts: { biodiversityLoss: 0, co2Gain: 1000000000 },
    region: 'beyond',
    position: { x: 50, y: 70 },
    resistance: 75,
    defenseType: 'existential',
    defenseStrength: 9,
    maintenanceCost: { kapitalPerSecond: 10_000_000, lobbyPerSecond: 200 },
  },
]

// Map for O(1) lookups
const EXPANSION_TARGET_MAP = new Map<string, ExpansionTargetData>(
  EXPANSION_TARGETS.map(t => [t.id, t])
)

export function getExpansionTarget(id: string): ExpansionTargetData | undefined {
  return EXPANSION_TARGET_MAP.get(id)
}

export function getExpansionTargetsByPhase(phase: number): ExpansionTargetData[] {
  return EXPANSION_TARGETS.filter(t => t.unlockPhase <= phase)
}

export function getExpansionTargetsByRegion(region: ExpansionRegion): ExpansionTargetData[] {
  return EXPANSION_TARGETS.filter(t => t.region === region)
}

/** Defense type labels for UI */
export const DEFENSE_TYPE_LABELS: Record<CosmicDefenseType, string> = {
  gravitational: 'Gravitationellt',
  bureaucratic: 'Byråkratiskt',
  existential: 'Existentiellt',
}

/** Pressure vector labels for UI */
export const PRESSURE_VECTOR_LABELS = {
  energi: 'Energi',
  byrakrati: 'Byråkrati',
  resurser: 'Resurser',
} as const
