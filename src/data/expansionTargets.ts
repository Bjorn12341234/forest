// ── Silva Maximus — Expansion Targets Data ──
// Territories to acquire on the stylized world/space/multiverse map

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
}

export const EXPANSION_TARGETS: ExpansionTargetData[] = [
  // ── Countries now handle phases 7-9 (INTERNATIONELL era) ──
  // ── Expansion targets start at phase 10 (EXPANSION era) ──

  // ── Fas 10: Solsystemet ──
  {
    id: 'exp_manen',
    name: 'M\u00e5nen',
    description: 'Lunar Silva AB. Registrerat p\u00e5 Cayman\u00f6arna.',
    unlockPhase: 10,
    cost: { stammar: 5_000_000_000_000, kapital: 50_000_000, lobby: 5_000 },
    production: { stammarPerSecond: 2_000_000, kapitalPerSecond: 20_000 },
    hiddenCosts: { biodiversityLoss: 0, co2Gain: 50000 },
    region: 'space',
    position: { x: 35, y: 30 },
  },
  {
    id: 'exp_mars',
    name: 'Mars',
    description: 'R\u00f6d jord. Syntetisk gran. Orange vinst.',
    unlockPhase: 10,
    cost: { stammar: 10_000_000_000_000, kapital: 100_000_000, lobby: 8_000 },
    production: { stammarPerSecond: 5_000_000, kapitalPerSecond: 50_000 },
    hiddenCosts: { biodiversityLoss: 0, co2Gain: 100000 },
    region: 'space',
    position: { x: 55, y: 40 },
  },
  {
    id: 'exp_titan',
    name: 'Titan',
    description: 'Metansj\u00f6ar. Perfekt f\u00f6r industriell kylning.',
    unlockPhase: 10,
    cost: { stammar: 50_000_000_000_000, kapital: 500_000_000, lobby: 15_000 },
    production: { stammarPerSecond: 20_000_000, kapitalPerSecond: 200_000 },
    hiddenCosts: { biodiversityLoss: 0, co2Gain: 500000 },
    region: 'space',
    position: { x: 75, y: 55 },
  },

  // ── Fas 11: Galaktisk ──
  {
    id: 'exp_proxima',
    name: 'Exoplanet Proxima b',
    description: 'Rutn\u00e4tskogsbruk p\u00e5 4,2 ljus\u00e5rs avst\u00e5nd.',
    unlockPhase: 11,
    cost: { stammar: 100_000_000_000_000, kapital: 1_000_000_000, lobby: 25_000 },
    production: { stammarPerSecond: 50_000_000, kapitalPerSecond: 500_000 },
    hiddenCosts: { biodiversityLoss: 0, co2Gain: 1000000 },
    region: 'cosmic',
    position: { x: 30, y: 35 },
  },
  {
    id: 'exp_dyson',
    name: 'Dysonsf\u00e4r',
    description: 'Stj\u00e4rnenergi f\u00f6r industriell torkning av massa.',
    unlockPhase: 11,
    cost: { stammar: 200_000_000_000_000, kapital: 2_000_000_000, lobby: 40_000 },
    production: { stammarPerSecond: 100_000_000, kapitalPerSecond: 1_000_000 },
    hiddenCosts: { biodiversityLoss: 0, co2Gain: 5000000 },
    region: 'cosmic',
    position: { x: 50, y: 50 },
  },

  // ── Fas 12: Bortom ──
  {
    id: 'exp_universe_alpha',
    name: 'Parallellt Universum Alpha',
    description: 'Identiskt med v\u00e5rt. Dubbel produktion.',
    unlockPhase: 11,
    cost: { stammar: 5_000_000_000_000, kapital: 50_000_000_000, lobby: 100_000 },
    production: { stammarPerSecond: 1_000_000_000, kapitalPerSecond: 10_000_000 },
    hiddenCosts: { biodiversityLoss: 0, co2Gain: 50000000 },
    region: 'beyond',
    position: { x: 25, y: 35 },
  },
  {
    id: 'exp_universe_beta',
    name: 'Parallellt Universum Beta',
    description: 'D\u00e4r vann milj\u00f6r\u00f6relsen. Vi fixar det.',
    unlockPhase: 11,
    cost: { stammar: 10_000_000_000_000, kapital: 100_000_000_000, lobby: 150_000 },
    production: { stammarPerSecond: 2_000_000_000, kapitalPerSecond: 20_000_000 },
    hiddenCosts: { biodiversityLoss: 0, co2Gain: 100000000 },
    region: 'beyond',
    position: { x: 75, y: 35 },
  },
  {
    id: 'exp_tidslinje',
    name: 'Tidslinje-korrektion',
    description: 'G\u00e5 tillbaka och avverka dinosauriernas skog.',
    unlockPhase: 12,
    cost: { stammar: 50_000_000_000_000, kapital: 500_000_000_000, lobby: 500_000 },
    production: { stammarPerSecond: 10_000_000_000, kapitalPerSecond: 100_000_000 },
    hiddenCosts: { biodiversityLoss: 0, co2Gain: 1000000000 },
    region: 'beyond',
    position: { x: 50, y: 70 },
  },
]

export function getExpansionTarget(id: string): ExpansionTargetData | undefined {
  return EXPANSION_TARGETS.find(t => t.id === id)
}

export function getExpansionTargetsByPhase(phase: number): ExpansionTargetData[] {
  return EXPANSION_TARGETS.filter(t => t.unlockPhase <= phase)
}

export function getExpansionTargetsByRegion(region: ExpansionRegion): ExpansionTargetData[] {
  return EXPANSION_TARGETS.filter(t => t.region === region)
}
