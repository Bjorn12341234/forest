import type { GameState, Phase } from '../store/types'

// ── Phase Transition Conditions ──
// Based on totalStammar thresholds (see spec.md section 6)

const PHASE_THRESHOLDS: Record<number, number> = {
  1: 10_000,         // → Phase 2
  2: 100_000,        // → Phase 3
  3: 1_000_000,      // → Phase 4
  4: 10_000_000,     // → Phase 5
  5: 100_000_000,    // → Phase 6
  6: 1_000_000_000,  // → Phase 7
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
    { text: 'PR-SYSTEMET UPPLÅST', delay: 11000, style: 'accent' },
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
    { text: 'De sista blandskogarna ersätts med monokulturer.', delay: 4000 },
    { text: 'Exakt 1,8m mellanrum. Inga fåglar.', delay: 6500, style: 'dim' },
    { text: 'SILVA MAXIMUS GRID UPPLÅST', delay: 9000, style: 'accent' },
    { text: 'Fas 6: Post-Biologisk Skogsbruk', delay: 12000, style: 'bold' },
  ],
  '6_7': [
    { text: 'POST-BIOLOGISK SKOGSBRUK', delay: 0, style: 'bold' },
    { text: 'Jorden räcker inte.', delay: 2000 },
    { text: 'Månen har mineraler. Du har skördare.', delay: 4000 },
    { text: 'Klimatförändringarna var en investering.', delay: 6500, style: 'dim' },
    { text: 'TERRAFORMING UPPLÅST', delay: 9000, style: 'accent' },
    { text: 'Fas 7: UNIVERSUM AB', delay: 12000, style: 'bold' },
  ],
}

export function getTransitionScript(from: Phase, to: Phase): TransitionLine[] {
  return TRANSITION_SCRIPTS[`${from}_${to}`] ?? [
    { text: `Fas ${to}...`, delay: 0, style: 'bold' },
  ]
}
