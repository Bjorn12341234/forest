// ── Silva Maximus — Expansion Targets Data ──
// Territories to acquire on the stylized world/space/multiverse map

export type ExpansionRegion = 'nordic' | 'europe' | 'global' | 'space' | 'cosmic' | 'beyond'

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
  // ── Fas 6: Norden/Europa (v\u00e4rldskarta) ──
  {
    id: 'exp_finland',
    name: 'Finland',
    description: 'De har liknande modell. L\u00e4tt att kopiera.',
    unlockPhase: 6,
    cost: { stammar: 50_000_000, kapital: 500_000, lobby: 200 },
    production: { stammarPerSecond: 50_000, kapitalPerSecond: 500 },
    hiddenCosts: { biodiversityLoss: 0.5, co2Gain: 2000 },
    region: 'nordic',
    position: { x: 58, y: 18 },
  },
  {
    id: 'exp_norge',
    name: 'Norge',
    description: 'Oljefonden ger investeringsmedel.',
    unlockPhase: 6,
    cost: { stammar: 80_000_000, kapital: 800_000, lobby: 300 },
    production: { stammarPerSecond: 40_000, kapitalPerSecond: 800 },
    hiddenCosts: { biodiversityLoss: 0.3, co2Gain: 1500 },
    region: 'nordic',
    position: { x: 48, y: 15 },
  },
  {
    id: 'exp_baltikum',
    name: 'Baltikum',
    description: 'Billig arbetskraft, minimal \u00f6vervakning.',
    unlockPhase: 6,
    cost: { stammar: 30_000_000, kapital: 300_000, lobby: 100 },
    production: { stammarPerSecond: 30_000, kapitalPerSecond: 300 },
    hiddenCosts: { biodiversityLoss: 0.8, co2Gain: 3000 },
    region: 'nordic',
    position: { x: 56, y: 25 },
  },
  {
    id: 'exp_tyskland',
    name: 'Tyskland',
    description: 'Kraftledningar beh\u00f6ver tr\u00e4virke. Vi levererar.',
    unlockPhase: 6,
    cost: { stammar: 100_000_000, kapital: 1_000_000, lobby: 500 },
    production: { stammarPerSecond: 80_000, kapitalPerSecond: 1200 },
    hiddenCosts: { biodiversityLoss: 0.4, co2Gain: 2500 },
    region: 'europe',
    position: { x: 48, y: 32 },
  },
  {
    id: 'exp_brasilien',
    name: 'Brasilien',
    description: 'Mammaz\u00e5nas Prime-leverans inom 24 timmar.',
    unlockPhase: 6,
    cost: { stammar: 200_000_000, kapital: 2_000_000, lobby: 800 },
    production: { stammarPerSecond: 150_000, kapitalPerSecond: 2000 },
    hiddenCosts: { biodiversityLoss: 2.0, co2Gain: 10000 },
    region: 'global',
    position: { x: 30, y: 62 },
  },
  {
    id: 'exp_kongo',
    name: 'Kongo',
    description: 'Tropisk monokultur. Ingen FSC beh\u00f6vs.',
    unlockPhase: 6,
    cost: { stammar: 150_000_000, kapital: 1_500_000, lobby: 600 },
    production: { stammarPerSecond: 120_000, kapitalPerSecond: 1500 },
    hiddenCosts: { biodiversityLoss: 3.0, co2Gain: 15000 },
    region: 'global',
    position: { x: 52, y: 58 },
  },

  // ── Fas 7: Global ──
  {
    id: 'exp_sibirien',
    name: 'Sibirien',
    description: 'Ryssland \u00e4r \u00f6ppen f\u00f6r aff\u00e4rer igen.',
    unlockPhase: 7,
    cost: { stammar: 500_000_000, kapital: 5_000_000, lobby: 1_000 },
    production: { stammarPerSecond: 300_000, kapitalPerSecond: 3000 },
    hiddenCosts: { biodiversityLoss: 1.5, co2Gain: 8000 },
    region: 'global',
    position: { x: 72, y: 18 },
  },
  {
    id: 'exp_kanada',
    name: 'Kanada',
    description: 'Bore-skog. Samma DNA, annan flagga.',
    unlockPhase: 7,
    cost: { stammar: 400_000_000, kapital: 4_000_000, lobby: 900 },
    production: { stammarPerSecond: 250_000, kapitalPerSecond: 2500 },
    hiddenCosts: { biodiversityLoss: 1.0, co2Gain: 5000 },
    region: 'global',
    position: { x: 18, y: 22 },
  },
  {
    id: 'exp_indonesien',
    name: 'Indonesien',
    description: 'Palmoljan var bara b\u00f6rjan.',
    unlockPhase: 7,
    cost: { stammar: 300_000_000, kapital: 3_000_000, lobby: 700 },
    production: { stammarPerSecond: 200_000, kapitalPerSecond: 2000 },
    hiddenCosts: { biodiversityLoss: 2.5, co2Gain: 12000 },
    region: 'global',
    position: { x: 78, y: 56 },
  },

  // ── Fas 8-9: Rymden (solsystem \u2192 galax) ──
  {
    id: 'exp_manen',
    name: 'M\u00e5nen',
    description: 'Lunar Silva AB. Registrerat p\u00e5 Cayman\u00f6arna.',
    unlockPhase: 8,
    cost: { stammar: 5_000_000_000, kapital: 50_000_000, lobby: 5_000 },
    production: { stammarPerSecond: 2_000_000, kapitalPerSecond: 20_000 },
    hiddenCosts: { biodiversityLoss: 0, co2Gain: 50000 },
    region: 'space',
    position: { x: 35, y: 30 },
  },
  {
    id: 'exp_mars',
    name: 'Mars',
    description: 'R\u00f6d jord. Gr\u00f6n gran. Orange vinst.',
    unlockPhase: 8,
    cost: { stammar: 10_000_000_000, kapital: 100_000_000, lobby: 8_000 },
    production: { stammarPerSecond: 5_000_000, kapitalPerSecond: 50_000 },
    hiddenCosts: { biodiversityLoss: 0, co2Gain: 100000 },
    region: 'space',
    position: { x: 55, y: 40 },
  },
  {
    id: 'exp_titan',
    name: 'Titan',
    description: 'Metansj\u00f6ar. Perfekt f\u00f6r industriell kylning.',
    unlockPhase: 9,
    cost: { stammar: 50_000_000_000, kapital: 500_000_000, lobby: 15_000 },
    production: { stammarPerSecond: 20_000_000, kapitalPerSecond: 200_000 },
    hiddenCosts: { biodiversityLoss: 0, co2Gain: 500000 },
    region: 'space',
    position: { x: 75, y: 55 },
  },
  {
    id: 'exp_proxima',
    name: 'Exoplanet Proxima b',
    description: 'Rutn\u00e4tskogsbruk p\u00e5 4,2 ljus\u00e5rs avst\u00e5nd.',
    unlockPhase: 9,
    cost: { stammar: 100_000_000_000, kapital: 1_000_000_000, lobby: 25_000 },
    production: { stammarPerSecond: 50_000_000, kapitalPerSecond: 500_000 },
    hiddenCosts: { biodiversityLoss: 0, co2Gain: 1000000 },
    region: 'cosmic',
    position: { x: 30, y: 35 },
  },
  {
    id: 'exp_dyson',
    name: 'Dysonsfär',
    description: 'Stj\u00e4rnenergi f\u00f6r industriell torkning av massa.',
    unlockPhase: 9,
    cost: { stammar: 200_000_000_000, kapital: 2_000_000_000, lobby: 40_000 },
    production: { stammarPerSecond: 100_000_000, kapitalPerSecond: 1_000_000 },
    hiddenCosts: { biodiversityLoss: 0, co2Gain: 5000000 },
    region: 'cosmic',
    position: { x: 50, y: 50 },
  },

  // ── Fas 11-12: Bortom ──
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
