// ── Silva Maximus — Owner (Skogsägare) Generator Definitions ──
// Ecological processes and relationships. Cost scaling: 1.12^n

export interface OwnerGeneratorData {
  id: string
  name: string
  description: string
  baseCost: number         // cost in skogsvardering
  svPerSecond: number      // skogsvardering per second per unit
  inkomstPerSecond: number // inkomst per second per unit
  bonuses?: {
    biodiv?: number        // per tick per unit
    resiliens?: number     // per tick per unit
    carbon?: number        // per tick per unit
    kunskap?: number       // per tick per unit (only kooperativ)
    legacy?: number        // per tick per unit (only arvsskogen)
    deadwood?: number      // per tick per unit (only dod-ved)
  }
  costScale: number
}

export const OWNER_GENERATORS: OwnerGeneratorData[] = [
  {
    id: 'ogen_foryngring',
    name: 'Naturlig föryngring',
    description: 'Du slutade plantera i rader. Skogen planterar sig själv nu. Den vet vad den gör.',
    baseCost: 100,
    svPerSecond: 1,
    inkomstPerSecond: 0,
    costScale: 1.12,
  },
  {
    id: 'ogen_plockhuggning',
    name: 'Plockhuggning (schema)',
    description: 'Du tar ett träd här, ett där. Aldrig mer än skogen ger tillbaka. Det finns ett ord för det: hållbarhet. Det riktiga ordet.',
    baseCost: 500,
    svPerSecond: 2,
    inkomstPerSecond: 0.5,
    costScale: 1.12,
  },
  {
    id: 'ogen_dodved',
    name: 'Död-ved-program',
    description: 'Du lämnar fallna stammar kvar. Inom ett år: ticka, vedsvamp, tretåig hackspett. Livet kommer tillbaka.',
    baseCost: 1_500,
    svPerSecond: 0,
    inkomstPerSecond: 0,
    bonuses: { biodiv: 0.3, resiliens: 0.1, deadwood: 0.2 },
    costScale: 1.12,
  },
  {
    id: 'ogen_skogsbete',
    name: 'Skogsbete',
    description: 'Korna betar i gläntan. Ljuset släpps ner. Blommorna kommer. Insekterna kommer. Fåglarna kommer.',
    baseCost: 3_000,
    svPerSecond: 5,
    inkomstPerSecond: 2,
    costScale: 1.12,
  },
  {
    id: 'ogen_premiumvirke',
    name: 'Premium-virke (långsamväxt)',
    description: 'En 150-årig tall med täta årsringar. Snickare betalar tredubbelt. Massaindustrin betalar spotpris.',
    baseCost: 8_000,
    svPerSecond: 0,
    inkomstPerSecond: 10,
    costScale: 1.12,
  },
  {
    id: 'ogen_turism',
    name: 'Skogsturism / Naturupplevelse',
    description: 'Japanska turister betalar 2 000 kr per person för "Forest Bathing" i din skog. De gråter av lycka.',
    baseCost: 15_000,
    svPerSecond: 5,
    inkomstPerSecond: 15,
    costScale: 1.12,
  },
  {
    id: 'ogen_kolkrediter',
    name: 'Kolkrediter (verkliga)',
    description: 'Du säljer verifierad kolinlagring. Inte industrins "kreativa bokföring". Din skog lagrar faktiskt kol.',
    baseCost: 30_000,
    svPerSecond: 0,
    inkomstPerSecond: 25,
    bonuses: { carbon: 1.0 },
    costScale: 1.12,
  },
  {
    id: 'ogen_kooperativ',
    name: 'Skogsägar-kooperativ',
    description: 'Du och 15 grannar bildar kooperativ. Ni säljer direkt till snickerier. Ingen mellanhand.',
    baseCost: 75_000,
    svPerSecond: 0,
    inkomstPerSecond: 50,
    bonuses: { kunskap: 2.0 },
    costScale: 1.12,
  },
  {
    id: 'ogen_arvsskogen',
    name: 'Arvsskogen',
    description: 'Din dotter tar över. Hon vet namnen på alla träd. Hon vet var lavskrikan häckar. Hon vet att skogen är mer värd stående.',
    baseCost: 200_000,
    svPerSecond: 200,
    inkomstPerSecond: 0,
    bonuses: { legacy: 10.0 },
    costScale: 1.12,
  },
]

export function getOwnerGeneratorData(id: string): OwnerGeneratorData | undefined {
  return OWNER_GENERATORS.find(g => g.id === id)
}

export function getOwnerGeneratorCost(baseCost: number, count: number, costScale = 1.12): number {
  return Math.floor(baseCost * Math.pow(costScale, count))
}
