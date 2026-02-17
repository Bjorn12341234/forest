// ── Silva Maximus — Expansion Targets Data ──
// Territories to acquire directly (phases 10-12)
// Simplified: pay cost → immediately controlled → production starts

export type ExpansionRegion = 'space' | 'cosmic' | 'beyond'

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
  maintenanceCost: { kapitalPerSecond: number; lobbyPerSecond: number }
}

export const EXPANSION_TARGETS: ExpansionTargetData[] = [
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
    maintenanceCost: { kapitalPerSecond: 10_000, lobbyPerSecond: 2 },
  },

  // ── Fas 11: Galaktisk + Bortom ──
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
    maintenanceCost: { kapitalPerSecond: 500_000, lobbyPerSecond: 20 },
  },
  {
    id: 'exp_universe_alpha',
    name: 'Parallellt Universum',
    description: 'Identiskt med vårt — men där vann miljörörelsen. Vi fixar det. Dubbel produktion.',
    unlockPhase: 11,
    cost: { stammar: 5_000_000_000_000, kapital: 50_000_000_000, lobby: 100_000 },
    production: { stammarPerSecond: 1_000_000_000, kapitalPerSecond: 10_000_000 },
    hiddenCosts: { biodiversityLoss: 0, co2Gain: 50000000 },
    region: 'beyond',
    position: { x: 25, y: 35 },
    maintenanceCost: { kapitalPerSecond: 1_000_000, lobbyPerSecond: 50 },
  },

  // ── Fas 12: Final ──
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
