import type { GameState, Phase } from '../store/types'

// ── Phase Transition Conditions ──
// Based on totalStammar thresholds (see spec.md section 6)

const PHASE_THRESHOLDS: Record<number, number> = {
  1: 10_000,              // → Phase 2
  2: 100_000,             // → Phase 3
  3: 1_000_000,           // → Phase 4
  4: 10_000_000,          // → Phase 5
  5: 100_000_000,         // → Phase 6
  6: 1_000_000_000,       // → Phase 7
  7: 10_000_000_000,      // → Phase 8
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
    { text: 'Din f\u00f6rsta massaorder \u00e4r fylld.', delay: 2000 },
    { text: 'Skogs\u00e4garna litar p\u00e5 dig.', delay: 4000 },
    { text: 'Dags att expandera.', delay: 6500, style: 'dim' },
    { text: 'LOBBYMODULEN UPPL\u00c5ST', delay: 9000, style: 'accent' },
    { text: 'Fas 2: Den Goda Grannen', delay: 11500, style: 'bold' },
  ],
  '2_3': [
    { text: 'DEN GODA GRANNEN', delay: 0, style: 'bold' },
    { text: 'Du kontrollerar regionen.', delay: 2000 },
    { text: 'Men Kina b\u00f6rjar dumpa billig massa...', delay: 4000 },
    { text: 'L\u00f6sning: volym. Alltid mer volym.', delay: 6500, style: 'dim' },
    { text: 'INTERNATIONELL LOBBY UPPL\u00c5ST', delay: 9000, style: 'accent' },
    { text: 'Fas 3: Massabaronen', delay: 12000, style: 'bold' },
  ],
  '3_4': [
    { text: 'MASSABARONEN', delay: 0, style: 'bold' },
    { text: 'Du dominerar den nationella marknaden.', delay: 2000 },
    { text: 'Men din image b\u00f6rjar krackelera...', delay: 4000 },
    { text: 'Nastl\u00e9 ringer. De tycker ni har f\u00f6r d\u00e5ligt rykte.', delay: 6500, style: 'dim' },
    { text: '...Nastl\u00e9. T\u00e4nk p\u00e5 det.', delay: 8500, style: 'dim' },
    { text: 'PR-SYSTEMET UPPL\u00c5ST', delay: 11000, style: 'accent' },
    { text: 'Fas 4: PR-Katastrofen', delay: 14000, style: 'bold' },
  ],
  '4_5': [
    { text: 'PR-KATASTROFEN', delay: 0, style: 'bold' },
    { text: 'Du \u00f6verlevde skandalerna.', delay: 2000 },
    { text: 'Nu har du kontroll \u00f6ver narrativet.', delay: 4000 },
    { text: 'Politiker. Myndigheter. Media. Allt ditt.', delay: 6500, style: 'dim' },
    { text: 'MAKTUTREDNINGEN UPPL\u00c5ST', delay: 9000, style: 'accent' },
    { text: 'Fas 5: Det Skogsindustriella Komplexet', delay: 12000, style: 'bold' },
  ],
  '5_6': [
    { text: 'DET SKOGSINDUSTRIELLA KOMPLEXET', delay: 0, style: 'bold' },
    { text: 'Sverige \u00e4r klart. All skog \u00e4r industriskog.', delay: 2000 },
    { text: 'Dags att blicka utanf\u00f6r gr\u00e4nserna.', delay: 4000 },
    { text: 'Exakt 1,8m mellanrum. Globalt.', delay: 6500, style: 'dim' },
    { text: 'EXPANSIONSFLIKEN UPPL\u00c5ST', delay: 9000, style: 'accent' },
    { text: 'Fas 6: Global Skogskonglomerat', delay: 12000, style: 'bold' },
  ],
  '6_7': [
    { text: 'GLOBAL SKOGSKONGLOMERAT', delay: 0, style: 'bold' },
    { text: 'Alla l\u00e4nder har fallit. Alla skogar \u00e4r dina.', delay: 2000 },
    { text: 'Biologi \u00e4r en flaskhals.', delay: 4000 },
    { text: 'Maskiner beh\u00f6ver inte fotosyntes.', delay: 6500, style: 'dim' },
    { text: 'POST-BIOLOGISK MODUL UPPL\u00c5ST', delay: 9000, style: 'accent' },
    { text: 'Fas 7: Post-Biologisk Skogsbruk', delay: 12000, style: 'bold' },
  ],
  '7_8': [
    { text: 'POST-BIOLOGISK SKOGSBRUK', delay: 0, style: 'bold' },
    { text: 'Jorden \u00e4r utt\u00f6md.', delay: 2000 },
    { text: 'M\u00e5nen har mineraler. Mars har utrymme.', delay: 4000 },
    { text: 'Klimatf\u00f6r\u00e4ndringarna var en investering.', delay: 6500, style: 'dim' },
    { text: '\u00c5RSREDOVISNING PUBLICERAD', delay: 9000, style: 'accent' },
    { text: 'TERRAFORMING UPPL\u00c5ST', delay: 11000, style: 'accent' },
    { text: 'Fas 8: Terraforming AB', delay: 13000, style: 'bold' },
  ],
  '8_9': [
    { text: 'TERRAFORMING AB', delay: 0, style: 'bold' },
    { text: 'Mars \u00e4r gr\u00f6nt. I fel nyans.', delay: 2000 },
    { text: 'Solsystemet \u00e4r en produktionsenhet.', delay: 4000 },
    { text: 'Dysonsfären planeras. Aktiekursen stiger.', delay: 6500, style: 'dim' },
    { text: 'KOSMISK EXPANSION UPPL\u00c5ST', delay: 9000, style: 'accent' },
    { text: 'Fas 9: Kosmisk Industrialisering', delay: 12000, style: 'bold' },
  ],
  '9_10': [
    { text: 'KOSMISK INDUSTRIALISERING', delay: 0, style: 'bold' },
    { text: 'Galaxen kartl\u00e4ggs. Varje stj\u00e4rna f\u00e5r ett produktionsnummer.', delay: 2000 },
    { text: 'Rader av tr\u00e4d str\u00e4cker sig ljus\u00e5r.', delay: 4000 },
    { text: 'Exakt 1,8 meter. \u00c4ven mellan stj\u00e4rnorna.', delay: 6500, style: 'dim' },
    { text: 'DEN PERFEKTA RADEN', delay: 9000, style: 'accent' },
    { text: 'Fas 10: Den Perfekta Raden', delay: 12000, style: 'bold' },
  ],
  '10_11': [
    { text: 'DEN PERFEKTA RADEN', delay: 0, style: 'bold' },
    { text: 'Universum \u00e4r en monokultur.', delay: 2000 },
    { text: 'Men det finns andra universum.', delay: 4000 },
    { text: 'Styrelsen godk\u00e4nner expansion bortom verkligheten.', delay: 6500, style: 'dim' },
    { text: 'MULTIVERSE-MODUL UPPL\u00c5ST', delay: 9000, style: 'accent' },
    { text: 'Fas 11: Parallella Universum', delay: 12000, style: 'bold' },
  ],
  '11_12': [
    { text: 'PARALLELLA UNIVERSUM', delay: 0, style: 'bold' },
    { text: 'Alla verkligheter \u00e4r avverkade.', delay: 2000 },
    { text: 'Entropin \u00e4r det sista hindret.', delay: 4000 },
    { text: 'Styrelsen: "L\u00f6s det."', delay: 6500, style: 'dim' },
    { text: 'ENTROPI-MODULEN UPPL\u00c5ST', delay: 9000, style: 'accent' },
    { text: 'Fas 12: Entropins Slut', delay: 12000, style: 'bold' },
  ],
}

export function getTransitionScript(from: Phase, to: Phase): TransitionLine[] {
  return TRANSITION_SCRIPTS[`${from}_${to}`] ?? [
    { text: `Fas ${to}...`, delay: 0, style: 'bold' },
  ]
}
