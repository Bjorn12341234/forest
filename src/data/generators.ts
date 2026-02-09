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
}

export const GENERATORS: GeneratorData[] = [
  {
    id: 'gen_virkesuppkopare',
    name: 'Virkesuppkopare',
    description: 'En karl i Barbourjacka som "bara tittar forbi". Bjuder pa kaffe. Namner att gran-priserna aldrig varit battre.',
    baseCost: 100,
    baseProduction: 1,
    unlockPhase: 1,
  },
  {
    id: 'gen_skordarteam',
    name: 'Skordarteam',
    description: 'John Deere 1270G. Tar en 150-arig tall pa 40 sekunder. Perfekt.',
    baseCost: 500,
    baseProduction: 5,
    unlockPhase: 1,
  },
  {
    id: 'gen_massafabrik',
    name: 'Massafabrik',
    description: 'Allt under 25 cm i diameter blir till engangslador for Amazons nastadagsleverans.',
    baseCost: 2_500,
    baseProduction: 25,
    unlockPhase: 1,
  },
  {
    id: 'gen_markberedning',
    name: 'Markberedningsmaskin',
    description: 'Vander upp hela skogsmarken. Slapper ut tonvis med lagrat kol. Men: unga plantor! De binder ju CO2! (Snalla googla inte nettot.)',
    baseCost: 10_000,
    baseProduction: 100,
    unlockPhase: 2,
  },
  {
    id: 'gen_certifiering',
    name: 'Certifieringskarousel',
    description: 'FSC-stampeln satts pa allt. Pausar vi certifieringen kan vi hugga nyckelbiotoperna, sen gar vi tillbaka.',
    baseCost: 50_000,
    baseProduction: 500,
    unlockPhase: 2,
  },
  {
    id: 'gen_lobbyfirma',
    name: 'Lobbyfirma',
    description: 'Ex-statssekreterare som vet exakt vilka dorrar man knackar pa.',
    baseCost: 200_000,
    baseProduction: 2_000,
    unlockPhase: 3,
  },
  {
    id: 'gen_autonomt',
    name: 'Autonomt Skordarnatverk',
    description: 'GPS-styrda skordare som opererar nattetid. Ingen ser dem. Ingen hor dem. Skogen hor dem.',
    baseCost: 1_000_000,
    baseProduction: 10_000,
    unlockPhase: 5,
  },
  {
    id: 'gen_orbital',
    name: 'Orbital Timberstation',
    description: 'Varfor sluta vid atmosfaren?',
    baseCost: 10_000_000,
    baseProduction: 250_000,
    unlockPhase: 6,
  },
]

export function getGeneratorData(id: string): GeneratorData | undefined {
  return GENERATORS.find(g => g.id === id)
}

export function getGeneratorsByPhase(phase: number): GeneratorData[] {
  return GENERATORS.filter(g => g.unlockPhase <= phase)
}

export function getGeneratorCost(baseCost: number, count: number): number {
  return Math.floor(baseCost * Math.pow(1.15, count))
}
