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
    offer: '"Vi analyserar din mark \u2014 kostnadsfritt!"',
    trap: 'Analysen rekommenderar kalavverkning och contortaplantering. Ingen n\u00e4mner att contorta \u00e4r en invasiv art.',
    declineText: 'Du anlitar en oberoende biolog ist\u00e4llet. Kostar 8 000 kr. Analysen visar att din mark m\u00e5r utm\u00e4rkt.',
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
    offer: '"Certifiera din skog! Marknaden kr\u00e4ver det!"',
    trap: 'Certifieringen kr\u00e4ver en "sk\u00f6tselplan" skriven av industrin. Planen inneb\u00e4r gallring av dina finaste tr\u00e4d.',
    declineText: 'Du certifierar via Plockhugget-n\u00e4tverket ist\u00e4llet. Mindre k\u00e4nt, men \u00e4rligt.',
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
    offer: '"Vi hj\u00e4lper dig s\u00f6ka EU-st\u00f6d f\u00f6r skogs\u00e5tg\u00e4rder!"',
    trap: '\u00c5tg\u00e4rderna = markberedning + plantering av monokultur. EU-pengarna g\u00e5r till industrins metoder.',
    declineText: 'Du s\u00f6ker bidraget sj\u00e4lv. Det tar l\u00e4ngre tid. Men det anv\u00e4nds till naturv\u00e5rd, inte industriplantering.',
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
]

export function getIndustryLure(id: string): IndustryLureData | undefined {
  return INDUSTRY_LURES.find(l => l.id === id)
}
