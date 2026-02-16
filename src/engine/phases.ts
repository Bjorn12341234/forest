import type { GameState, Phase, Era } from '../store/types'

// ── Era System ──

export const ERA_PHASES: Record<Era, [number, number]> = {
  SVERIGE: [1, 3],
  MAKT: [4, 6],
  INTERNATIONELL: [7, 9],
  EXPANSION: [10, 12],
}

export function getEra(phase: number): Era {
  if (phase <= 3) return 'SVERIGE'
  if (phase <= 6) return 'MAKT'
  if (phase <= 9) return 'INTERNATIONELL'
  return 'EXPANSION'
}

// ── Phase Names ──

export const PHASE_NAMES: Record<Phase, string> = {
  1: 'Lokalpatriot',
  2: 'Den Goda Grannen',
  3: 'Massabaronen',
  4: 'PR-Katastrofen',
  5: 'Det Skogsindustriella Komplexet',
  6: 'Total Kontroll',
  7: 'Kolonialt Ramverk',
  8: 'Global Dominans',
  9: 'Jordens Sista Skog',
  10: 'Post-Biologisk Produktion',
  11: 'Kosmisk Industrialisering',
  12: 'Entropins Slut',
}

// ── Phase Transition Conditions ──
// Based on totalStammar thresholds (see spec.md section 6)

const PHASE_THRESHOLDS: Record<number, number> = {
  1: 10_000,              // → Phase 2
  2: 100_000,             // → Phase 3
  3: 1_000_000,           // → Phase 4
  4: 10_000_000,          // → Phase 5
  5: 100_000_000,         // → Phase 6
  6: 1_000_000_000,       // → Phase 7
  7: 5_000_000_000,       // → Phase 8
  8: 100_000_000_000,     // → Phase 9
  9: 1_000_000_000_000,   // → Phase 10
  10: 10_000_000_000_000, // → Phase 11
  11: 100_000_000_000_000,// → Phase 12
}

export function checkPhaseTransition(state: GameState): Phase | null {
  const threshold = PHASE_THRESHOLDS[state.phase]
  if (threshold && state.totalStammar >= threshold) {
    return (state.phase + 1) as Phase
  }
  return null
}

// ── Transition Text Sequences ──

export interface TransitionLine {
  text: string
  delay: number
  style?: 'normal' | 'bold' | 'accent' | 'dim'
}

export const TRANSITION_SCRIPTS: Partial<Record<`${Phase}_${Phase}`, TransitionLine[]>> = {
  '1_2': [
    { text: 'LOKALPATRIOT', delay: 0, style: 'bold' },
    { text: 'Din första massaorder är fylld.', delay: 2000 },
    { text: 'Skogsägarna litar på dig.', delay: 4000 },
    { text: 'Dags att expandera.', delay: 6500, style: 'dim' },
    { text: 'LOBBYMODULEN UPPLÅST', delay: 9000, style: 'accent' },
    { text: 'Fas 2: Den Goda Grannen', delay: 11500, style: 'bold' },
  ],
  '2_3': [
    { text: 'DEN GODA GRANNEN', delay: 0, style: 'bold' },
    { text: 'Du kontrollerar regionen.', delay: 2000 },
    { text: 'Men Kina börjar dumpa billig massa...', delay: 4000 },
    { text: 'Lösning: volym. Alltid mer volym.', delay: 6500, style: 'dim' },
    { text: 'INTERNATIONELL LOBBY UPPLÅST', delay: 9000, style: 'accent' },
    { text: 'Fas 3: Massabaronen', delay: 12000, style: 'bold' },
  ],
  '3_4': [
    { text: 'MASSABARONEN', delay: 0, style: 'bold' },
    { text: 'Du dominerar den nationella marknaden.', delay: 2000 },
    { text: 'Men din image börjar krackelera...', delay: 4000 },
    { text: 'Nastlé ringer. De tycker ni har för dåligt rykte.', delay: 6500, style: 'dim' },
    { text: '...Nastlé. Tänk på det.', delay: 8500, style: 'dim' },
    { text: '═══ ERA: MAKT ═══', delay: 11000, style: 'accent' },
    { text: 'Fas 4: PR-Katastrofen', delay: 14000, style: 'bold' },
  ],
  '4_5': [
    { text: 'PR-KATASTROFEN', delay: 0, style: 'bold' },
    { text: 'Du överlevde skandalerna.', delay: 2000 },
    { text: 'Nu har du kontroll över narrativet.', delay: 4000 },
    { text: 'Politiker. Myndigheter. Media. Allt ditt.', delay: 6500, style: 'dim' },
    { text: 'MAKTUTREDNINGEN UPPLÅST', delay: 9000, style: 'accent' },
    { text: 'Fas 5: Det Skogsindustriella Komplexet', delay: 12000, style: 'bold' },
  ],
  '5_6': [
    { text: 'DET SKOGSINDUSTRIELLA KOMPLEXET', delay: 0, style: 'bold' },
    { text: 'Sverige är klart. All skog är industriskog.', delay: 2000 },
    { text: 'Institutionerna är kapade.', delay: 4000 },
    { text: 'Total kontroll över narrativ, politik och lag.', delay: 6500, style: 'dim' },
    { text: 'Fas 6: Total Kontroll', delay: 9000, style: 'bold' },
  ],
  '6_7': [
    { text: 'TOTAL KONTROLL', delay: 0, style: 'bold' },
    { text: 'Sverige är erövrat. Varje träd, varje myndighet, varje lag.', delay: 2000 },
    { text: 'Men världen har mer skog.', delay: 4000 },
    { text: 'Exportera den svenska modellen. Globalt.', delay: 6500, style: 'dim' },
    { text: '═══ ERA: INTERNATIONELL ═══', delay: 9000, style: 'accent' },
    { text: 'LÄNDER-SYSTEMET UPPLÅST', delay: 11000, style: 'accent' },
    { text: 'Fas 7: Kolonialt Ramverk', delay: 13000, style: 'bold' },
  ],
  '7_8': [
    { text: 'KOLONIALT RAMVERK', delay: 0, style: 'bold' },
    { text: 'De nordiska länderna föll först.', delay: 2000 },
    { text: 'Europa är nästa. Sedan världen.', delay: 4000 },
    { text: 'Motstånd krossas med kapital, lobby och stammar.', delay: 6500, style: 'dim' },
    { text: 'Fas 8: Global Dominans', delay: 9000, style: 'bold' },
  ],
  '8_9': [
    { text: 'GLOBAL DOMINANS', delay: 0, style: 'bold' },
    { text: 'Varje kontinent. Varje skog.', delay: 2000 },
    { text: 'Biodiversiteten sjunker mot noll.', delay: 4000 },
    { text: 'Jordens sista naturliga skog faller.', delay: 6500, style: 'dim' },
    { text: 'Fas 9: Jordens Sista Skog', delay: 9000, style: 'bold' },
  ],
  '9_10': [
    { text: 'JORDENS SISTA SKOG', delay: 0, style: 'bold' },
    { text: 'Jorden är uttömd. Biologi är en flaskhals.', delay: 2000 },
    { text: 'Maskiner behöver inte fotosyntes.', delay: 4000 },
    { text: 'Inga människor behövs längre.', delay: 6500, style: 'dim' },
    { text: '═══ ERA: EXPANSION ═══', delay: 9000, style: 'accent' },
    { text: 'ÅRSREDOVISNING PUBLICERAD', delay: 11000, style: 'accent' },
    { text: 'Fas 10: Post-Biologisk Produktion', delay: 13000, style: 'bold' },
  ],
  '10_11': [
    { text: 'POST-BIOLOGISK PRODUKTION', delay: 0, style: 'bold' },
    { text: 'Maskiner producerar cellulosa utan biologi.', delay: 2000 },
    { text: 'AI-styrelsen har full kontroll.', delay: 4000 },
    { text: 'Solsystemet är en produktionsenhet.', delay: 6500, style: 'dim' },
    { text: 'KOSMISK EXPANSION UPPLÅST', delay: 9000, style: 'accent' },
    { text: 'Fas 11: Kosmisk Industrialisering', delay: 12000, style: 'bold' },
  ],
  '11_12': [
    { text: 'KOSMISK INDUSTRIALISERING', delay: 0, style: 'bold' },
    { text: 'Alla verkligheter är avverkade.', delay: 2000 },
    { text: 'Entropin är det sista hindret.', delay: 4000 },
    { text: 'Styrelsen: "Lös det."', delay: 6500, style: 'dim' },
    { text: 'ENTROPI-MODULEN UPPLÅST', delay: 9000, style: 'accent' },
    { text: 'Fas 12: Entropins Slut', delay: 12000, style: 'bold' },
  ],
}

export function getTransitionScript(from: Phase, to: Phase): TransitionLine[] {
  return TRANSITION_SCRIPTS[`${from}_${to}`] ?? [
    { text: `Fas ${to}...`, delay: 0, style: 'bold' },
  ]
}
