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
    baseCost: 1_000_000,
    baseProduction: 10_000,
    unlockPhase: 5,
    costScale: 1.20,
  },
  {
    id: 'gen_klonskog',
    name: 'Klon-Skog',
    description: 'Genetiskt identiska tr\u00e4d. Ingen variation. Ingen motst\u00e5ndskraft. Maximal produktion.',
    baseCost: 10_000_000,
    baseProduction: 50_000,
    unlockPhase: 6,
    costScale: 1.25,
  },

  // ── INTERNATIONELL (7-9) ──
  {
    id: 'gen_koncession',
    name: 'Global Skogskoncessioner',
    description: 'Avverkningsr\u00e4tter i 40 l\u00e4nder. Kontrakt p\u00e5 svenska. Ingen f\u00f6rst\u00e5r villkoren.',
    baseCost: 50_000_000,
    baseProduction: 200_000,
    unlockPhase: 7,
    costScale: 1.25,
  },
  {
    id: 'gen_monokultur',
    name: 'Industriell Monokulturfabrik',
    description: 'Regnskogar ersatta med gran. Planterade i raka rader. Samma DNA. Ingen f\u00e5gel sjunger.',
    baseCost: 500_000_000,
    baseProduction: 1_000_000,
    unlockPhase: 8,
    costScale: 1.25,
  },
  {
    id: 'gen_avskogning',
    name: 'Automatiserad Avskogning',
    description: 'Dronsvärmar som röjer 10 000 hektar per dag. Operatören sitter i Stockholm. Skärmen visar siffror, inte skog.',
    baseCost: 5_000_000_000,
    baseProduction: 5_000_000,
    unlockPhase: 9,
    costScale: 1.30,
  },

  // ── EXPANSION (10-12) ──
  {
    id: 'gen_orbital',
    name: 'Orbital Timberstation',
    description: 'Varf\u00f6r sluta vid atmosf\u00e4ren?',
    baseCost: 50_000_000_000,
    baseProduction: 20_000_000,
    unlockPhase: 10,
    costScale: 1.25,
  },
  {
    id: 'gen_terraformer',
    name: 'Planet\u00e4r Terraformer',
    description: 'G\u00f6r d\u00f6da planeter till granplanteringar. Exakt 1,8 meter mellanrum. \u00c4ven i vakuum.',
    baseCost: 500_000_000_000,
    baseProduction: 200_000_000,
    unlockPhase: 10,
    costScale: 1.25,
  },
  {
    id: 'gen_nano',
    name: 'Nanosk\u00f6rdare',
    description: 'Molekyl\u00e4ra maskiner som plockar is\u00e4r tr\u00e4d atom f\u00f6r atom. Effektivt. Om\u00e4nskligt effektivt.',
    baseCost: 5_000_000_000_000,
    baseProduction: 2_000_000_000,
    unlockPhase: 11,
    costScale: 1.30,
  },
  {
    id: 'gen_dimension',
    name: 'Dimensionssk\u00f6rdare',
    description: 'Avverkar skog i parallella universum. Klagom\u00e5l fr\u00e5n andra dimensioner avvisas.',
    baseCost: 50_000_000_000_000,
    baseProduction: 20_000_000_000,
    unlockPhase: 11,
    costScale: 1.30,
  },
  {
    id: 'gen_multiverse',
    name: 'Multiverse-Harvester',
    description: 'Sk\u00f6rdar tr\u00e4d fr\u00e5n alla t\u00e4nkbara verkligheter. O\u00e4ndligheten \u00e4r inte nog.',
    baseCost: 500_000_000_000_000,
    baseProduction: 200_000_000_000,
    unlockPhase: 12,
    costScale: 1.35,
  },
  {
    id: 'gen_entropi',
    name: 'Entropimotor',
    description: 'Extraherar energi fr\u00e5n universums termiska d\u00f6d. Sista maskinen som n\u00e5gonsin g\u00e5r.',
    baseCost: 5_000_000_000_000_000,
    baseProduction: 2_000_000_000_000,
    unlockPhase: 12,
    costScale: 1.35,
  },
]

export function getGeneratorData(id: string): GeneratorData | undefined {
  return GENERATORS.find(g => g.id === id)
}

export function getGeneratorsByPhase(phase: number): GeneratorData[] {
  return GENERATORS.filter(g => g.unlockPhase <= phase)
}

export function getGeneratorCost(baseCost: number, count: number, costScale = 1.15): number {
  return Math.floor(baseCost * Math.pow(costScale, count))
}
