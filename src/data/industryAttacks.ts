// ── Silva Maximus — Industry Attacks on the Owner (Skogsägare) ──
// These trigger at skogsvardering milestones and require kunskap to resist.

export interface IndustryAttackData {
  id: string
  name: string
  description: string
  triggerSV: number           // total skogsvardering threshold
  kunskapRequired: number     // kunskap needed to resist
  extraCostResource?: 'inkomst'
  extraCostAmount?: number
  acceptEffects: {
    description: string
    skogsvardering?: number   // multiplier on current sv (e.g., 0.5 = lose 50%)
    inkomstBonus?: number     // one-time inkomst gain
    resiliensPenalty?: number  // flat resiliens loss
  }
  resistFlavour: string       // text shown when resisted
  acceptFlavour: string       // text shown when accepted
}

export const INDUSTRY_ATTACKS: IndustryAttackData[] = [
  {
    id: 'atk_gratisplan',
    name: '"Gratis skogsbruksplan"',
    description: 'En inspektör från det stora bolaget dyker upp med en "gratis skogsbruksplan". Planen schemalägger kalavverkning av dina bästa bestånd.',
    triggerSV: 800,
    kunskapRequired: 10,
    acceptEffects: {
      description: '-50% Skogsvärde, +5 000 Inkomst',
      skogsvardering: 0.5,
      inkomstBonus: 5_000,
    },
    resistFlavour: 'Nej tack. Jag vet vad "gallring" betyder när ni säger det.',
    acceptFlavour: 'Planen godkänd. Skördaren är på plats imorgon. Hälften av din skog är borta på en vecka.',
  },
  {
    id: 'atk_virkesuppkopare',
    name: 'Virkesuppköparen',
    description: 'En man i Barburr-jacka dyker upp. Han erbjuder "fantastiskt pris" för dina bästa tallar.',
    triggerSV: 3_000,
    kunskapRequired: 30,
    acceptEffects: {
      description: '-30% Skogsvärde, +8 000 Inkomst',
      skogsvardering: 0.7,
      inkomstBonus: 8_000,
    },
    resistFlavour: 'Jag vet vad mina träd är värda. Inte som massa. Som virke.',
    acceptFlavour: 'Han tar dina finaste tallar. 150 år gamla. Priset var bra. Känslan är inte det.',
  },
  {
    id: 'atk_priskollaps',
    name: 'Priskollaps-panik',
    description: 'Massapriserna rasar. Kina dumpar. Industrin säger: "Avverka nu innan det blir värre!"',
    triggerSV: 8_000,
    kunskapRequired: 50,
    acceptEffects: {
      description: '-40% Skogsvärde, +12 000 Inkomst',
      skogsvardering: 0.6,
      inkomstBonus: 12_000,
    },
    resistFlavour: 'Massa-marknaden kollapsar. Men jag säljer inte massa. Jag säljer 150-årig tallvirke till snickerier.',
    acceptFlavour: 'Du panikavverkar. Priset var skit. Men du hade behövt pengarna. Eller?',
  },
  {
    id: 'atk_aganderatt',
    name: '"Äganderätten är hotad!"-kampanjen',
    description: 'Industrin vill att du protesterar mot EU-kartläggning av gammelskog — kartläggning som faktiskt SKYDDAR din skog.',
    triggerSV: 10_000,
    kunskapRequired: 100,
    acceptEffects: {
      description: '+5 000 Inkomst, -20 Biodiversitet',
      inkomstBonus: 5_000,
      resiliensPenalty: 5,
    },
    resistFlavour: 'Vänta. Ni säger att ni försvarar MIN äganderätt. Men ni vill att jag ska protestera mot kartläggningen som visar att min skog är VÄRDEFULL?',
    acceptFlavour: 'Du skrev under. Kampanjen vann. Kartläggningen stoppades. Industrin avverkar grannens gammelskog nästa månad.',
  },
  {
    id: 'atk_kontrakt',
    name: 'Kontraktsofferten',
    description: '25-årskontrakt. Garanterad inkomst. Men industrin styr avverkningen. Du förlorar kontrollen.',
    triggerSV: 20_000,
    kunskapRequired: 150,
    acceptEffects: {
      description: '-25% Skogsvärde, +15 000 Inkomst, -30 Resiliens',
      skogsvardering: 0.75,
      inkomstBonus: 15_000,
      resiliensPenalty: 30,
    },
    resistFlavour: '25 år. De vill ha min skog i 25 år. Min farfar hade den i 60 år och den ser fortfarande ut som en skog.',
    acceptFlavour: 'Kontraktet är påskrivet. Inkomsten är stabil. Men det är inte din skog längre. Inte på 25 år.',
  },
  {
    id: 'atk_svartmalning',
    name: 'Svartmålningskampanjen',
    description: 'Industrin kallar plockhuggning "ovetenskapligt" och "oekonomiskt" i media. Din inkomst sjunker.',
    triggerSV: 40_000,
    kunskapRequired: 200,
    acceptEffects: {
      description: '-20% Inkomst-generering permanent',
      resiliensPenalty: 10,
    },
    resistFlavour: 'Ovetenskapligt? Det finns peer-reviewed forskning. Oekonomiskt? Jag har lika hög avkastning — den kommer bara inte som en enda klumpsumma till er fabrik.',
    acceptFlavour: 'Du har inget svar. Media kör deras berättelse. Dina grannar tittar misstroget på din skog.',
  },
  {
    id: 'atk_inspektor',
    name: 'Inspektörens "misstag"',
    description: 'Din grannes industriinspektör "råkar" anmäla avverkning som går in på DIN mark. Du måste agera snabbt.',
    triggerSV: 75_000,
    kunskapRequired: 300,
    extraCostResource: 'inkomst',
    extraCostAmount: 10_000,
    acceptEffects: {
      description: '-10% Skogsvärde',
      skogsvardering: 0.9,
    },
    resistFlavour: '"Det blev inte som jag sa", sa grannen. Inspektören tolkade. Entreprenören tolkade. Maskinföraren körde. Du överklagade. Du vann.',
    acceptFlavour: 'Det blev inte som inspektören sa. Men din skog fick betäla priset.',
  },
  {
    id: 'atk_totala_offensiven',
    name: 'Den Totala Offensiven',
    description: 'Industrin, politikerna och myndigheterna koordinerar. Ny lagändring: "ökad skoglig tillväxt" = tvingande avverkningskrav.',
    triggerSV: 150_000,
    kunskapRequired: 500,
    acceptEffects: {
      description: '-50% Skogsvärde, -50 Resiliens',
      skogsvardering: 0.5,
      resiliensPenalty: 50,
    },
    resistFlavour: 'De ändrade lagen. Men vi var 200 skogsägare som svarade på remissen. Vi hade biologerna. Vi hade siffrorna. Vi hade skogen. De hade lobbyister.',
    acceptFlavour: 'Lagen antogs. Du har inget val. Skördarna kommer i november.',
  },
]

const INDUSTRY_ATTACK_MAP = new Map<string, IndustryAttackData>(
  INDUSTRY_ATTACKS.map(a => [a.id, a])
)

export function getIndustryAttack(id: string): IndustryAttackData | undefined {
  return INDUSTRY_ATTACK_MAP.get(id)
}
