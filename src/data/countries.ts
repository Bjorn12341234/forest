// ── Silva Maximus — Country Definitions (INTERNATIONELL Era, Phases 7-9) ──
// Fictional but recognizable nations to invade with your forestry industrial complex

export interface CountryUniqueReward {
  label: string
  description: string
  effects: {
    generatorEfficiency?: number   // multiplier, e.g. 1.10 = +10%
    kapitalMultiplier?: number     // multiplier on kapital/s
    stammarMultiplier?: number     // multiplier on stammar/s
    lobbyPerSecond?: number        // flat PK/s bonus
    imagePerSecond?: number        // flat image/s change
  }
}

export interface CountryDef {
  id: string
  name: string
  description: string
  unlockPhase: 7 | 8 | 9
  invasionCost: { stammar: number; kapital: number; lobby: number }
  resistance: number // 0-100, starting resistance
  defenseType: 'environmental' | 'political' | 'economic'
  defenseStrength: number // 1-10
  maintenanceCost: { kapitalPerSecond: number; lobbyPerSecond: number }
  production: { stammarPerSecond: number; kapitalPerSecond: number }
  hiddenCosts: { biodiversityLoss: number; co2Gain: number }
  position: { x: number; y: number } // map placement, 0-100 percentage
  /** Unique bonus granted when country is controlled */
  uniqueReward?: CountryUniqueReward
}

export const COUNTRIES: CountryDef[] = [
  // ══════════════════════════════════════════════
  // ── Fas 7: Norden (4 länder) ──
  // ══════════════════════════════════════════════
  {
    id: 'c_finlandia',
    name: 'Finlandia',
    description:
      'Liknande modell. Lätt att kopiera. De kallar det "bioekonomi" också — plagiatet säljer sig självt.',
    unlockPhase: 7,
    invasionCost: { stammar: 100_000_000, kapital: 1_000_000, lobby: 500 },
    resistance: 40,
    defenseType: 'environmental',
    defenseStrength: 3,
    maintenanceCost: { kapitalPerSecond: 200, lobbyPerSecond: 0.5 },
    production: { stammarPerSecond: 120_000, kapitalPerSecond: 1_200 },
    hiddenCosts: { biodiversityLoss: 0.8, co2Gain: 4_000 },
    position: { x: 62, y: 14 },
    uniqueReward: {
      label: 'Finsk Ingenjörskonst',
      description: '+10% generatoreffektivitet',
      effects: { generatorEfficiency: 1.10 },
    },
  },
  {
    id: 'c_norgia',
    name: 'Norgia',
    description:
      'Oljefonden finansierar motståndet. Men de behöver pellets till att värma fjordstugorna.',
    unlockPhase: 7,
    invasionCost: { stammar: 350_000_000, kapital: 3_500_000, lobby: 1_500 },
    resistance: 60,
    defenseType: 'economic',
    defenseStrength: 5,
    maintenanceCost: { kapitalPerSecond: 500, lobbyPerSecond: 1.5 },
    production: { stammarPerSecond: 80_000, kapitalPerSecond: 3_000 },
    hiddenCosts: { biodiversityLoss: 0.5, co2Gain: 3_000 },
    position: { x: 40, y: 10 },
    uniqueReward: {
      label: 'Oljefondens Synergi',
      description: '+20% kapital/s',
      effects: { kapitalMultiplier: 1.20 },
    },
  },
  {
    id: 'c_island',
    name: 'Ísland',
    description:
      'Inga träd. Inte ett enda. Men geotermiska konferensanläggningar perfekta för diskreta lobbymöten — bastu med EU-kommissionärer och lunnefågelmiddag ingår.',
    unlockPhase: 7,
    invasionCost: { stammar: 50_000_000, kapital: 500_000, lobby: 200 },
    resistance: 15,
    defenseType: 'political',
    defenseStrength: 1,
    maintenanceCost: { kapitalPerSecond: 80, lobbyPerSecond: 0.1 },
    production: { stammarPerSecond: 2_000, kapitalPerSecond: 3_000 },
    hiddenCosts: { biodiversityLoss: 0.1, co2Gain: 200 },
    position: { x: 22, y: 5 },
    uniqueReward: {
      label: 'Diskreta Lobbymöten',
      description: '+0,5 PK/s',
      effects: { lobbyPerSecond: 0.5 },
    },
  },
  {
    id: 'c_danmark',
    name: 'Danmark',
    description:
      'Platt som en pannkaka. Danskarna högg ner allt redan på vikingatiden — nu säljer vi dem tillbaka som certifierade julgranar till 400% påslag.',
    unlockPhase: 7,
    invasionCost: { stammar: 200_000_000, kapital: 2_000_000, lobby: 800 },
    resistance: 35,
    defenseType: 'environmental',
    defenseStrength: 3,
    maintenanceCost: { kapitalPerSecond: 250, lobbyPerSecond: 0.5 },
    production: { stammarPerSecond: 60_000, kapitalPerSecond: 2_000 },
    hiddenCosts: { biodiversityLoss: 0.4, co2Gain: 2_000 },
    position: { x: 48, y: 22 },
    uniqueReward: {
      label: 'Julgransmonopol',
      description: '+15% kapital/s',
      effects: { kapitalMultiplier: 1.15 },
    },
  },

  // ══════════════════════════════════════════════
  // ── Fas 8: Global (3 länder) ──
  // ══════════════════════════════════════════════
  {
    id: 'c_amazonia',
    name: 'Amazonia',
    description:
      'Världens lungor. Snart er plantage. Regnskogen ersätts med eukalyptus — tekniskt sett fortfarande "skog".',
    unlockPhase: 8,
    invasionCost: { stammar: 3_000_000_000, kapital: 30_000_000, lobby: 8_000 },
    resistance: 80,
    defenseType: 'environmental',
    defenseStrength: 8,
    maintenanceCost: { kapitalPerSecond: 5_000, lobbyPerSecond: 8.0 },
    production: { stammarPerSecond: 2_000_000, kapitalPerSecond: 30_000 },
    hiddenCosts: { biodiversityLoss: 5.0, co2Gain: 50_000 },
    position: { x: 30, y: 60 },
    uniqueReward: {
      label: 'Tropisk Monokultur',
      description: '+25% stammar/s, -0,1 Image/s',
      effects: { stammarMultiplier: 1.25, imagePerSecond: -0.1 },
    },
  },
  {
    id: 'c_siberien',
    name: 'Siberien',
    description:
      'Permafrost smälter. Ny skogsmark. Klimatförändringen är äntligen lönsam — tack, fossila bränslen!',
    unlockPhase: 8,
    invasionCost: { stammar: 1_500_000_000, kapital: 15_000_000, lobby: 5_000 },
    resistance: 50,
    defenseType: 'economic',
    defenseStrength: 5,
    maintenanceCost: { kapitalPerSecond: 3_000, lobbyPerSecond: 5.0 },
    production: { stammarPerSecond: 1_500_000, kapitalPerSecond: 20_000 },
    hiddenCosts: { biodiversityLoss: 3.0, co2Gain: 40_000 },
    position: { x: 72, y: 18 },
    uniqueReward: {
      label: 'Permafrost-exploatering',
      description: '+20% stammar/s',
      effects: { stammarMultiplier: 1.20 },
    },
  },
  {
    id: 'c_kanadien',
    name: 'Kanadien',
    description:
      'Bore-skog. Samma DNA, annan flagga. De säger "sustainable forestry" istället för "hållbart skogsbruk". Samma sak.',
    unlockPhase: 8,
    invasionCost: { stammar: 2_000_000_000, kapital: 20_000_000, lobby: 6_000 },
    resistance: 55,
    defenseType: 'economic',
    defenseStrength: 6,
    maintenanceCost: { kapitalPerSecond: 4_000, lobbyPerSecond: 6.0 },
    production: { stammarPerSecond: 1_800_000, kapitalPerSecond: 25_000 },
    hiddenCosts: { biodiversityLoss: 3.5, co2Gain: 35_000 },
    position: { x: 20, y: 22 },
    uniqueReward: {
      label: 'Bore-skog Synergi',
      description: '+15% stammar/s, +1 PK/s',
      effects: { stammarMultiplier: 1.15, lobbyPerSecond: 1.0 },
    },
  },

  // ══════════════════════════════════════════════
  // ── Fas 9: Slutfas (2 länder) ──
  // ══════════════════════════════════════════════
  {
    id: 'c_chinova',
    name: 'Chinova',
    description:
      'Statlig kontroll kräver statlig muta. Femårsplanen inkluderar nu "nordisk skogsexpertis" — vi skrev den åt dem.',
    unlockPhase: 9,
    invasionCost: { stammar: 12_000_000_000, kapital: 120_000_000, lobby: 15_000 },
    resistance: 90,
    defenseType: 'economic',
    defenseStrength: 9,
    maintenanceCost: { kapitalPerSecond: 50_000, lobbyPerSecond: 40.0 },
    production: { stammarPerSecond: 15_000_000, kapitalPerSecond: 200_000 },
    hiddenCosts: { biodiversityLoss: 8.0, co2Gain: 200_000 },
    position: { x: 75, y: 32 },
    uniqueReward: {
      label: 'Tillverkningsskala',
      description: '+30% generatoreffektivitet',
      effects: { generatorEfficiency: 1.30 },
    },
  },
  {
    id: 'c_indiska',
    name: 'Indiska Unionen',
    description:
      'En miljard människor i vägen. Men de behöver alla möbler — BJÖRKEA öppnar 200 varuhus samtidigt.',
    unlockPhase: 9,
    invasionCost: { stammar: 8_000_000_000, kapital: 80_000_000, lobby: 12_000 },
    resistance: 85,
    defenseType: 'political',
    defenseStrength: 8,
    maintenanceCost: { kapitalPerSecond: 40_000, lobbyPerSecond: 35.0 },
    production: { stammarPerSecond: 10_000_000, kapitalPerSecond: 150_000 },
    hiddenCosts: { biodiversityLoss: 6.0, co2Gain: 150_000 },
    position: { x: 70, y: 42 },
    uniqueReward: {
      label: 'BJÖRKEA-distributionsnät',
      description: '+25% kapital/s, +2 PK/s',
      effects: { kapitalMultiplier: 1.25, lobbyPerSecond: 2.0 },
    },
  },
]

// ── Helper Functions ──

// Map for O(1) lookups (hot path — called per country per tick)
const COUNTRY_MAP = new Map<string, CountryDef>(
  COUNTRIES.map(c => [c.id, c])
)

/** Get a single country by its id */
export function getCountry(id: string): CountryDef | undefined {
  return COUNTRY_MAP.get(id)
}

/** Get all countries unlocked at or before the given phase */
export function getCountriesByPhase(phase: number): CountryDef[] {
  return COUNTRIES.filter((c) => c.unlockPhase <= phase)
}

export interface CountryRewardTotals {
  generatorEfficiency: number  // multiplicative, starts at 1
  kapitalMultiplier: number    // multiplicative, starts at 1
  stammarMultiplier: number    // multiplicative, starts at 1
  lobbyPerSecond: number       // additive
  imagePerSecond: number       // additive
}

/** Compute aggregate unique rewards from all controlled countries */
export function computeCountryRewards(countries: Record<string, { status: string }>): CountryRewardTotals {
  const totals: CountryRewardTotals = {
    generatorEfficiency: 1,
    kapitalMultiplier: 1,
    stammarMultiplier: 1,
    lobbyPerSecond: 0,
    imagePerSecond: 0,
  }

  for (const country of COUNTRIES) {
    const cs = countries[country.id]
    if (cs?.status !== 'controlled' || !country.uniqueReward) continue
    const e = country.uniqueReward.effects
    if (e.generatorEfficiency) totals.generatorEfficiency *= e.generatorEfficiency
    if (e.kapitalMultiplier) totals.kapitalMultiplier *= e.kapitalMultiplier
    if (e.stammarMultiplier) totals.stammarMultiplier *= e.stammarMultiplier
    if (e.lobbyPerSecond) totals.lobbyPerSecond += e.lobbyPerSecond
    if (e.imagePerSecond) totals.imagePerSecond += e.imagePerSecond
  }

  return totals
}
