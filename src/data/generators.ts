// ── Silva Maximus — Generator Definitions ──
// All 8 generators from the GDD. Cost scaling: baseCost * 1.15^n

export interface GeneratorData {
  id: string
  name: string
  description: string
  baseCost: number
  baseProduction: number // stammar per second per unit
  unlockPhase: number    // phase required to see this generator
  unlockCost?: number    // show when player can almost afford (optional hint)
  costScale?: number     // cost scaling factor (default 1.15)
}

export const GENERATORS: GeneratorData[] = [
  {
    id: 'gen_virkesuppkopare',
    name: 'Virkesuppköpare',
    description: 'En karl i Barbourjacka som "bara tittar förbi". Bjuder på kaffe. Nämner att gran-priserna aldrig varit bättre.',
    baseCost: 100,
    baseProduction: 1,
    unlockPhase: 1,
  },
  {
    id: 'gen_skordarteam',
    name: 'Skördarteam',
    description: 'Björn Hjort 1270G. Tar en 150-årig tall på 40 sekunder. Perfekt.',
    baseCost: 500,
    baseProduction: 5,
    unlockPhase: 1,
  },
  {
    id: 'gen_massafabrik',
    name: 'Massafabrik',
    description: 'Allt under 25 cm i diameter blir till engångslådor för Mammazånas nästa-dags-leverans.',
    baseCost: 2_500,
    baseProduction: 25,
    unlockPhase: 1,
  },
  {
    id: 'gen_markberedning',
    name: 'Markberedningsmaskin',
    description: 'Vänder upp hela skogsmarken. Släpper ut tonvis med lagrat kol. Men: unga plantor! De binder ju CO2! (Snälla googla inte nettot.)',
    baseCost: 10_000,
    baseProduction: 100,
    unlockPhase: 2,
  },
  {
    id: 'gen_certifiering',
    name: 'Certifieringskarusell',
    description: 'FSC-stämpeln sätts på allt. Pausar vi certifieringen kan vi hugga nyckelbiotoperna, sen går vi tillbaka.',
    baseCost: 50_000,
    baseProduction: 500,
    unlockPhase: 2,
  },
  {
    id: 'gen_lobbyfirma',
    name: 'Lobbyfirma',
    description: 'Ex-statssekreterare som vet exakt vilka dörrar man knackar på.',
    baseCost: 200_000,
    baseProduction: 2_000,
    unlockPhase: 3,
  },
  {
    id: 'gen_autonomt',
    name: 'Autonomt Skördarnätverk',
    description: 'GPS-styrda skördare som opererar nattetid. Ingen ser dem. Ingen hör dem. Skogen hör dem.',
    baseCost: 500_000,
    baseProduction: 10_000,
    unlockPhase: 5,
    costScale: 1.18,
  },
  {
    id: 'gen_klonskog',
    name: 'Klon-Skog',
    description: 'Genetiskt identiska träd. Ingen variation. Ingen motståndskraft. Maximal produktion.',
    baseCost: 1_000_000,
    baseProduction: 50_000,
    unlockPhase: 6,
    costScale: 1.15,
  },

  // ── INTERNATIONELL (7-9) ──
  {
    id: 'gen_koncession',
    name: 'Global Skogskoncessioner',
    description: 'Avverkningsrätter i 40 länder. Kontrakt på svenska. Ingen förstår villkoren.',
    baseCost: 2_000_000,
    baseProduction: 200_000,
    unlockPhase: 7,
    costScale: 1.15,
  },
  {
    id: 'gen_monokultur',
    name: 'Industriell Monokulturfabrik',
    description: 'Regnskogar ersatta med gran. Planterade i raka rader. Samma DNA. Ingen fågel sjunger.',
    baseCost: 20_000_000,
    baseProduction: 1_000_000,
    unlockPhase: 8,
    costScale: 1.15,
  },
  {
    id: 'gen_avskogning',
    name: 'Automatiserad Avskogning',
    description: 'Dronsvärmar som röjer 10 000 hektar per dag. Operatören sitter i Stockholm. Skärmen visar siffror, inte skog.',
    baseCost: 100_000_000,
    baseProduction: 5_000_000,
    unlockPhase: 9,
    costScale: 1.15,
  },

  // ── EXPANSION (10-12) ──
  {
    id: 'gen_orbital',
    name: 'Orbital Timberstation',
    description: 'Varför sluta vid atmosfären?',
    baseCost: 5_000_000_000,
    baseProduction: 50_000_000,
    unlockPhase: 10,
    costScale: 1.15,
  },
  {
    id: 'gen_terraformer',
    name: 'Planetär Terraformer',
    description: 'Gör döda planeter till granplanteringar. Exakt 1,8 meter mellanrum. Även i vakuum.',
    baseCost: 50_000_000_000,
    baseProduction: 500_000_000,
    unlockPhase: 10,
    costScale: 1.15,
  },
  {
    id: 'gen_nano',
    name: 'Nanoskördare',
    description: 'Molekylära maskiner som plockar isär träd atom för atom. Effektivt. Omänskligt effektivt.',
    baseCost: 200_000_000_000,
    baseProduction: 5_000_000_000,
    unlockPhase: 11,
    costScale: 1.15,
  },
  {
    id: 'gen_dimension',
    name: 'Dimensionsskördare',
    description: 'Avverkar skog i parallella universum. Klagomål från andra dimensioner avvisas.',
    baseCost: 2_000_000_000_000,
    baseProduction: 50_000_000_000,
    unlockPhase: 11,
    costScale: 1.15,
  },
  {
    id: 'gen_multiverse',
    name: 'Multiverse-Harvester',
    description: 'Skördar träd från alla tänkbara verkligheter. Oändligheten är inte nog.',
    baseCost: 10_000_000_000_000,
    baseProduction: 500_000_000_000,
    unlockPhase: 12,
    costScale: 1.15,
  },
  {
    id: 'gen_entropi',
    name: 'Entropimotor',
    description: 'Extraherar energi från universums termiska död. Sista maskinen som någonsin går.',
    baseCost: 100_000_000_000_000,
    baseProduction: 5_000_000_000_000,
    unlockPhase: 12,
    costScale: 1.15,
  },
]

// Map for O(1) lookups (hot path — called 20×/tick)
const GENERATOR_MAP = new Map<string, GeneratorData>(
  GENERATORS.map(g => [g.id, g])
)

export function getGeneratorData(id: string): GeneratorData | undefined {
  return GENERATOR_MAP.get(id)
}

export function getGeneratorsByPhase(phase: number): GeneratorData[] {
  return GENERATORS.filter(g => g.unlockPhase <= phase)
}

export function getGeneratorCost(baseCost: number, count: number, costScale = 1.15): number {
  return Math.floor(baseCost * Math.pow(costScale, count))
}
