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
  // ── Sprint 12: 3 new lures ──
  {
    id: 'lure_generationsavtal',
    name: '"Generationsavtal"',
    offer: '"Vi hjälper er familj med arvsplanering! Trygghet för nästa generation!"',
    trap: 'Avtalet överför beslutsrätten till en industrikontrollerad stiftelse. Din familj äger skogen — men industrin bestämmer vad som händer med den.',
    declineText: 'Du skriver arvsplanering med en oberoende jurist. Dyrare. Men skogen stannar i familjen. På riktigt.',
    triggerSV: 180_000,
    acceptEffects: {
      skogsvardering: 0.75,
      resiliensPenalty: 25,
      biodivPenalty: 10,
    },
    declineEffects: {
      inkomstCost: 8_000,
      kunskapGain: 40,
      biodivGain: 3,
    },
  },
  {
    id: 'lure_digitalskog',
    name: '"Digital skogsinventering"',
    offer: '"Gratis drönarkartläggning av din skog! AI-baserad analys! Framtidens skogsbruk!"',
    trap: 'Datan ägs av industrin. Deras AI rekommenderar "optimerad avverkning" av dina mest värdefulla bestånd. Kartläggningen delas med virkesuppköpare.',
    declineText: 'Du köper en egen drönare. Lär dig själv. Datan stannar hos dig.',
    triggerSV: 50_000,
    acceptEffects: {
      skogsvardering: 0.9,
      resiliensPenalty: 10,
    },
    declineEffects: {
      inkomstCost: 4_000,
      kunskapGain: 30,
    },
  },
  {
    id: 'lure_klimatkompensation',
    name: '"Klimatkompensationspartner"',
    offer: '"Sälj kolkrediter via vår plattform! Garanterad inkomst! Inga krav!"',
    trap: 'Kontraktet kräver att du avverkar och nyplanterar — industrins "kolsänka" räknar bara nyplanterade träd. Dina 150-åriga tallar räknas inte.',
    declineText: 'Du ansluter dig till ett oberoende kolinlagringsnätverk. Mindre inkomst. Men dina stående träd räknas.',
    triggerSV: 100_000,
    acceptEffects: {
      skogsvardering: 0.85,
      biodivPenalty: 20,
    },
    declineEffects: {
      inkomstCost: 6_000,
      kunskapGain: 35,
      biodivGain: 5,
    },
  },
]

const INDUSTRY_LURE_MAP = new Map<string, IndustryLureData>(
  INDUSTRY_LURES.map(l => [l.id, l])
)

export function getIndustryLure(id: string): IndustryLureData | undefined {
  return INDUSTRY_LURE_MAP.get(id)
}
