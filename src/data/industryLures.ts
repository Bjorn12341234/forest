// ── Silva Maximus — Industry Lures (Lockelser) ──
// Appear as tempting offers that are actually traps.

export interface IndustryLureData {
  id: string
  name: string
  offer: string            // what they promise
  trap: string             // what actually happens
  declineText: string      // what happens if you say no
  triggerSV: number        // total skogsvardering threshold
  acceptEffects: {
    skogsvardering?: number  // multiplier
    resiliensPenalty?: number
    biodivPenalty?: number
  }
  declineEffects: {
    inkomstCost?: number     // cost of the alternative
    kunskapGain?: number
    biodivGain?: number
  }
}

export const INDUSTRY_LURES: IndustryLureData[] = [
  {
    id: 'lure_markanalys',
    name: '"Gratis markanalys"',
    offer: '"Vi analyserar din mark — kostnadsfritt!"',
    trap: 'Analysen rekommenderar kalavverkning och contortaplantering. Ingen nämner att contorta är en invasiv art.',
    declineText: 'Du anlitar en oberoende biolog istället. Kostar 8 000 kr. Analysen visar att din mark mår utmärkt.',
    triggerSV: 2_000,
    acceptEffects: {
      skogsvardering: 0.8,
      resiliensPenalty: 15,
      biodivPenalty: 5,
    },
    declineEffects: {
      inkomstCost: 500,
      kunskapGain: 15,
      biodivGain: 2,
    },
  },
  {
    id: 'lure_gsc',
    name: '"GSC-certifiering"',
    offer: '"Certifiera din skog! Marknaden kräver det!"',
    trap: 'Certifieringen kräver en "skötselplan" skriven av industrin. Planen innebär gallring av dina finaste träd.',
    declineText: 'Du certifierar via Plockhugget-nätverket istället. Mindre känt, men ärligt.',
    triggerSV: 6_000,
    acceptEffects: {
      skogsvardering: 0.85,
      resiliensPenalty: 10,
    },
    declineEffects: {
      inkomstCost: 1_500,
      kunskapGain: 20,
    },
  },
  {
    id: 'lure_eubidrag',
    name: '"EU-bidrag via oss"',
    offer: '"Vi hjälper dig söka EU-stöd för skogsåtgärder!"',
    trap: 'Åtgärderna = markberedning + plantering av monokultur. EU-pengarna går till industrins metoder.',
    declineText: 'Du söker bidraget själv. Det tar längre tid. Men det används till naturvård, inte industriplantering.',
    triggerSV: 15_000,
    acceptEffects: {
      resiliensPenalty: 20,
      biodivPenalty: 10,
    },
    declineEffects: {
      inkomstCost: 2_500,
      kunskapGain: 25,
      biodivGain: 5,
    },
  },
  {
    id: 'lure_virkesprispremie',
    name: '"Virkesprispremie"',
    offer: '"Vi erbjuder TRIPPELT massapris för ditt bästa virke! Exklusiv premieköpare!"',
    trap: 'De köper dina bästa träd — de som tagit 150 år att växa. Priset var bra. Skogen blev fattigare.',
    declineText: 'Du ringer din snickare istället. Samma pris, men du väljer vilka träd som tas.',
    triggerSV: 80_000,
    acceptEffects: {
      skogsvardering: 0.85,
      resiliensPenalty: 15,
    },
    declineEffects: {
      inkomstCost: 3_000,
      kunskapGain: 30,
    },
  },
  {
    id: 'lure_forskningssamarbete',
    name: '"Forskningssamarbete"',
    offer: '"Vårt universitet vill studera din skog! Helt kostnadsfritt! Publicering i Nature!"',
    trap: 'Universitetet finansieras av industrin. Studien "visar" att din metod ger lägre tillväxt. De utelämnar biodiversitetsdatan.',
    declineText: 'Du anlitar en oberoende forskare. Kostar mer. Men resultaten är ärliga.',
    triggerSV: 120_000,
    acceptEffects: {
      skogsvardering: 0.9,
      biodivPenalty: 15,
    },
    declineEffects: {
      inkomstCost: 5_000,
      kunskapGain: 35,
    },
  },
]

const INDUSTRY_LURE_MAP = new Map<string, IndustryLureData>(
  INDUSTRY_LURES.map(l => [l.id, l])
)

export function getIndustryLure(id: string): IndustryLureData | undefined {
  return INDUSTRY_LURE_MAP.get(id)
}
