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
    svFreeze?: boolean        // locks sv growth
    resiliensPenalty?: number  // flat resiliens loss
  }
  resistFlavour: string       // text shown when resisted
  acceptFlavour: string       // text shown when accepted
}

export const INDUSTRY_ATTACKS: IndustryAttackData[] = [
  {
    id: 'atk_gratisplan',
    name: '"Gratis skogsbruksplan"',
    description: 'En inspekt\u00f6r fr\u00e5n det stora bolaget dyker upp med en "gratis skogsbruksplan". Planen schemal\u00e4gger kalavverkning av dina b\u00e4sta best\u00e5nd.',
    triggerSV: 500,
    kunskapRequired: 25,
    acceptEffects: {
      description: '-50% Skogsv\u00e4rde, +5 000 Inkomst',
      skogsvardering: 0.5,
      inkomstBonus: 5_000,
    },
    resistFlavour: 'Nej tack. Jag vet vad "gallring" betyder n\u00e4r ni s\u00e4ger det.',
    acceptFlavour: 'Planen godk\u00e4nd. Sk\u00f6rdaren \u00e4r p\u00e5 plats imorgon. H\u00e4lften av din skog \u00e4r borta p\u00e5 en vecka.',
  },
  {
    id: 'atk_virkesuppkopare',
    name: 'Virkesuppk\u00f6paren',
    description: 'En man i Barburr-jacka dyker upp. Han erbjuder "fantastiskt pris" f\u00f6r dina b\u00e4sta tallar.',
    triggerSV: 2_000,
    kunskapRequired: 50,
    acceptEffects: {
      description: '-30% Skogsv\u00e4rde, +8 000 Inkomst',
      skogsvardering: 0.7,
      inkomstBonus: 8_000,
    },
    resistFlavour: 'Jag vet vad mina tr\u00e4d \u00e4r v\u00e4rda. Inte som massa. Som virke.',
    acceptFlavour: 'Han tar dina finaste tallar. 150 \u00e5r gamla. Priset var bra. K\u00e4nslan \u00e4r inte det.',
  },
  {
    id: 'atk_priskollaps',
    name: 'Priskollaps-panik',
    description: 'Massapriserna rasar. Kina dumpar. Industrin s\u00e4ger: "Avverka nu innan det blir v\u00e4rre!"',
    triggerSV: 5_000,
    kunskapRequired: 75,
    acceptEffects: {
      description: '-40% Skogsv\u00e4rde, +12 000 Inkomst',
      skogsvardering: 0.6,
      inkomstBonus: 12_000,
    },
    resistFlavour: 'Massa-marknaden kollapsar. Men jag s\u00e4ljer inte massa. Jag s\u00e4ljer 150-\u00e5rig tallvirke till snickerier.',
    acceptFlavour: 'Du panikavverkar. Priset var skit. Men du hade beh\u00f6vt pengarna. Eller?',
  },
  {
    id: 'atk_aganderatt',
    name: '"\u00c4gander\u00e4tten \u00e4r hotad!"-kampanjen',
    description: 'Industrin vill att du protesterar mot EU-kartl\u00e4ggning av gammelskog \u2014 kartl\u00e4ggning som faktiskt SKYDDAR din skog.',
    triggerSV: 10_000,
    kunskapRequired: 100,
    acceptEffects: {
      description: '+5 000 Inkomst, -20 Biodiversitet',
      inkomstBonus: 5_000,
      resiliensPenalty: 5,
    },
    resistFlavour: 'V\u00e4nta. Ni s\u00e4ger att ni f\u00f6rsvarar MIN \u00e4gander\u00e4tt. Men ni vill att jag ska protestera mot kartl\u00e4ggningen som visar att min skog \u00e4r V\u00c4RDEFULL?',
    acceptFlavour: 'Du skrev under. Kampanjen vann. Kartl\u00e4ggningen stoppades. Industrin avverkar grannens gammelskog n\u00e4sta m\u00e5nad.',
  },
  {
    id: 'atk_kontrakt',
    name: 'Kontraktsofferten',
    description: '25-\u00e5rskontrakt. Garanterad inkomst. Men industrin styr avverkningen. Du f\u00f6rlorar kontrollen.',
    triggerSV: 20_000,
    kunskapRequired: 150,
    acceptEffects: {
      description: '+500 Inkomst/s, Skogsv\u00e4rde fryser, -30 Resiliens',
      svFreeze: true,
      resiliensPenalty: 30,
    },
    resistFlavour: '25 \u00e5r. De vill ha min skog i 25 \u00e5r. Min farfar hade den i 60 \u00e5r och den ser fortfarande ut som en skog.',
    acceptFlavour: 'Kontraktet \u00e4r p\u00e5skrivet. Inkomsten \u00e4r stabil. Men det \u00e4r inte din skog l\u00e4ngre. Inte p\u00e5 25 \u00e5r.',
  },
  {
    id: 'atk_svartmalning',
    name: 'Svartm\u00e5lningskampanjen',
    description: 'Industrin kallar plockhuggning "ovetenskapligt" och "oekonomiskt" i media. Din inkomst sjunker.',
    triggerSV: 40_000,
    kunskapRequired: 200,
    acceptEffects: {
      description: '-20% Inkomst-generering permanent',
      resiliensPenalty: 10,
    },
    resistFlavour: 'Ovetenskapligt? Det finns peer-reviewed forskning. Oekonomiskt? Jag har lika h\u00f6g avkastning \u2014 den kommer bara inte som en enda klumpsumma till er fabrik.',
    acceptFlavour: 'Du har inget svar. Media k\u00f6r deras ber\u00e4ttelse. Dina grannar tittar misstroget p\u00e5 din skog.',
  },
  {
    id: 'atk_inspektor',
    name: 'Inspekt\u00f6rens "misstag"',
    description: 'Din grannes industriinspekt\u00f6r "r\u00e5kar" anm\u00e4la avverkning som g\u00e5r in p\u00e5 DIN mark. Du m\u00e5ste agera snabbt.',
    triggerSV: 75_000,
    kunskapRequired: 300,
    extraCostResource: 'inkomst',
    extraCostAmount: 10_000,
    acceptEffects: {
      description: '-10% Skogsv\u00e4rde',
      skogsvardering: 0.9,
    },
    resistFlavour: '"Det blev inte som jag sa", sa grannen. Inspekt\u00f6ren tolkade. Entrepren\u00f6ren tolkade. Maskinf\u00f6raren k\u00f6rde. Du \u00f6verklagade. Du vann.',
    acceptFlavour: 'Det blev inte som inspekt\u00f6ren sa. Men din skog fick bet\u00e4la priset.',
  },
  {
    id: 'atk_totala_offensiven',
    name: 'Den Totala Offensiven',
    description: 'Industrin, politikerna och myndigheterna koordinerar. Ny lag\u00e4ndring: "\u00f6kad skoglig tillv\u00e4xt" = tvingande avverkningskrav.',
    triggerSV: 150_000,
    kunskapRequired: 500,
    acceptEffects: {
      description: '-50% Skogsv\u00e4rde, -50 Resiliens',
      skogsvardering: 0.5,
      resiliensPenalty: 50,
    },
    resistFlavour: 'De \u00e4ndrade lagen. Men vi var 200 skogs\u00e4gare som svarade p\u00e5 remissen. Vi hade biologerna. Vi hade siffrorna. Vi hade skogen. De hade lobbyister.',
    acceptFlavour: 'Lagen antogs. Du har inget val. Sk\u00f6rdarna kommer i november.',
  },
]

export function getIndustryAttack(id: string): IndustryAttackData | undefined {
  return INDUSTRY_ATTACKS.find(a => a.id === id)
}
