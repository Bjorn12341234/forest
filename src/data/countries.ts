// ── Silva Maximus — Country Definitions (INTERNATIONELL Era, Phases 7-9) ──
// Fictional but recognizable nations to invade with your forestry industrial complex

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
}

export const COUNTRIES: CountryDef[] = [
  // ══════════════════════════════════════════════
  // ── Fas 7: Norden/Europa (5 länder) ──
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
  },
  {
    id: 'c_baltiska',
    name: 'Baltiska Federationen',
    description:
      'Billig arbetskraft, minimal övervakning. EU-bidragen täcker "återplanteringen" som aldrig sker.',
    unlockPhase: 7,
    invasionCost: { stammar: 120_000_000, kapital: 1_200_000, lobby: 600 },
    resistance: 30,
    defenseType: 'political',
    defenseStrength: 2,
    maintenanceCost: { kapitalPerSecond: 150, lobbyPerSecond: 0.3 },
    production: { stammarPerSecond: 100_000, kapitalPerSecond: 800 },
    hiddenCosts: { biodiversityLoss: 1.2, co2Gain: 5_000 },
    position: { x: 58, y: 26 },
  },
  {
    id: 'c_germanien',
    name: 'Germanien',
    description:
      'Kraftledningar kräver trävirke. Deras Energiewende blev vår guldgruva — de byter kol mot pellets.',
    unlockPhase: 7,
    invasionCost: { stammar: 400_000_000, kapital: 4_000_000, lobby: 1_800 },
    resistance: 55,
    defenseType: 'political',
    defenseStrength: 6,
    maintenanceCost: { kapitalPerSecond: 600, lobbyPerSecond: 2.0 },
    production: { stammarPerSecond: 150_000, kapitalPerSecond: 4_000 },
    hiddenCosts: { biodiversityLoss: 0.6, co2Gain: 3_500 },
    position: { x: 48, y: 34 },
  },
  {
    id: 'c_gallien',
    name: 'Gallien',
    description:
      'Revolutionär tradition gör motstånd. Men byråkratin är ännu starkare — vi talar samma språk.',
    unlockPhase: 7,
    invasionCost: { stammar: 500_000_000, kapital: 5_000_000, lobby: 2_000 },
    resistance: 70,
    defenseType: 'environmental',
    defenseStrength: 7,
    maintenanceCost: { kapitalPerSecond: 700, lobbyPerSecond: 2.5 },
    production: { stammarPerSecond: 130_000, kapitalPerSecond: 3_500 },
    hiddenCosts: { biodiversityLoss: 0.7, co2Gain: 3_800 },
    position: { x: 36, y: 38 },
  },

  // ══════════════════════════════════════════════
  // ── Fas 8: Global (5 länder) ──
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
    production: { stammarPerSecond: 800_000, kapitalPerSecond: 15_000 },
    hiddenCosts: { biodiversityLoss: 5.0, co2Gain: 50_000 },
    position: { x: 30, y: 60 },
  },
  {
    id: 'c_kongolien',
    name: 'Kongolien',
    description:
      'Tropisk monokultur. Ingen FSC behövs. Certifieringsorganet vi startade godkänner allt automatiskt.',
    unlockPhase: 8,
    invasionCost: { stammar: 800_000_000, kapital: 8_000_000, lobby: 3_000 },
    resistance: 45,
    defenseType: 'political',
    defenseStrength: 4,
    maintenanceCost: { kapitalPerSecond: 2_000, lobbyPerSecond: 3.0 },
    production: { stammarPerSecond: 500_000, kapitalPerSecond: 8_000 },
    hiddenCosts: { biodiversityLoss: 6.0, co2Gain: 60_000 },
    position: { x: 52, y: 58 },
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
    production: { stammarPerSecond: 600_000, kapitalPerSecond: 10_000 },
    hiddenCosts: { biodiversityLoss: 3.0, co2Gain: 40_000 },
    position: { x: 72, y: 18 },
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
    production: { stammarPerSecond: 700_000, kapitalPerSecond: 12_000 },
    hiddenCosts: { biodiversityLoss: 3.5, co2Gain: 35_000 },
    position: { x: 20, y: 22 },
  },
  {
    id: 'c_indonesien',
    name: 'Indonesien',
    description:
      'Palmoljan var bara början. Torvmarkerna brinner "av sig själva" — men vi sålde tändstickorna.',
    unlockPhase: 8,
    invasionCost: { stammar: 1_200_000_000, kapital: 12_000_000, lobby: 4_500 },
    resistance: 50,
    defenseType: 'political',
    defenseStrength: 5,
    maintenanceCost: { kapitalPerSecond: 2_500, lobbyPerSecond: 4.0 },
    production: { stammarPerSecond: 550_000, kapitalPerSecond: 9_000 },
    hiddenCosts: { biodiversityLoss: 7.0, co2Gain: 70_000 },
    position: { x: 78, y: 55 },
  },

  // ══════════════════════════════════════════════
  // ── Fas 9: Slutfas (4 länder) ──
  // ══════════════════════════════════════════════
  {
    id: 'c_chinova',
    name: 'Chinova',
    description:
      'Statlig kontroll kräver statlig muta. Femårsplanen inkluderar nu "nordisk skogsexpertis" — vi skrev den åt dem.',
    unlockPhase: 9,
    invasionCost: { stammar: 40_000_000_000, kapital: 400_000_000, lobby: 40_000 },
    resistance: 90,
    defenseType: 'economic',
    defenseStrength: 9,
    maintenanceCost: { kapitalPerSecond: 50_000, lobbyPerSecond: 40.0 },
    production: { stammarPerSecond: 5_000_000, kapitalPerSecond: 100_000 },
    hiddenCosts: { biodiversityLoss: 8.0, co2Gain: 200_000 },
    position: { x: 75, y: 32 },
  },
  {
    id: 'c_indiska',
    name: 'Indiska Unionen',
    description:
      'En miljard människor i vägen. Men de behöver alla möbler — BJÖRKEA öppnar 200 varuhus samtidigt.',
    unlockPhase: 9,
    invasionCost: { stammar: 30_000_000_000, kapital: 300_000_000, lobby: 35_000 },
    resistance: 85,
    defenseType: 'political',
    defenseStrength: 8,
    maintenanceCost: { kapitalPerSecond: 40_000, lobbyPerSecond: 35.0 },
    production: { stammarPerSecond: 4_000_000, kapitalPerSecond: 80_000 },
    hiddenCosts: { biodiversityLoss: 6.0, co2Gain: 150_000 },
    position: { x: 70, y: 42 },
  },
  {
    id: 'c_australien',
    name: 'Australien',
    description:
      'Brinner redan. Perfekt timing. Köp brandhärjad mark till rabatterat pris — "vi hjälper till med återställningen".',
    unlockPhase: 9,
    invasionCost: { stammar: 8_000_000_000, kapital: 80_000_000, lobby: 12_000 },
    resistance: 35,
    defenseType: 'environmental',
    defenseStrength: 4,
    maintenanceCost: { kapitalPerSecond: 10_000, lobbyPerSecond: 10.0 },
    production: { stammarPerSecond: 2_000_000, kapitalPerSecond: 40_000 },
    hiddenCosts: { biodiversityLoss: 4.0, co2Gain: 80_000 },
    position: { x: 82, y: 70 },
  },
  {
    id: 'c_pacifiska',
    name: 'Pacifiska Öarna',
    description:
      'Öar försvinner. Köp dem billigt. Havsnivåerna stiger — men trädplantagerna hinner ge avkastning först.',
    unlockPhase: 9,
    invasionCost: { stammar: 5_000_000_000, kapital: 50_000_000, lobby: 10_000 },
    resistance: 25,
    defenseType: 'environmental',
    defenseStrength: 3,
    maintenanceCost: { kapitalPerSecond: 5_000, lobbyPerSecond: 5.0 },
    production: { stammarPerSecond: 1_000_000, kapitalPerSecond: 20_000 },
    hiddenCosts: { biodiversityLoss: 3.0, co2Gain: 30_000 },
    position: { x: 90, y: 58 },
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
