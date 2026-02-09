import type { GameState } from '../store/types'

export type AchievementTier = 'lokal' | 'regional' | 'nationell' | 'internationell' | 'endgame' | 'kosmisk' | 'meta'

export interface AchievementDef {
  id: string
  name: string
  description: string
  icon: string
  phase: number
  tier: AchievementTier
  check: (state: GameState) => boolean
}

// Keep the old category type as alias for backwards compatibility
export type AchievementCategory = AchievementTier

export const TIER_LABELS: Record<AchievementTier, string> = {
  lokal: 'Tier 1: Lokal',
  regional: 'Tier 2: Regional',
  nationell: 'Tier 3: Nationell',
  internationell: 'Tier 4: Internationell',
  endgame: 'Tier 5: Endgame',
  kosmisk: 'Tier 6: Kosmisk',
  meta: 'Meta',
}

export const TIER_COLORS: Record<AchievementTier, string> = {
  lokal: '#88CC44',
  regional: '#4488CC',
  nationell: '#FFD700',
  internationell: '#FF6600',
  endgame: '#CC22CC',
  kosmisk: '#00CCFF',
  meta: '#888888',
}

export const ACHIEVEMENTS: AchievementDef[] = [
  // ═══════════════════════════════════════════
  //  TIER 1: LOKAL
  // ═══════════════════════════════════════════
  {
    id: 'forsta_planen',
    name: 'Första Planen',
    description: 'Den första är gratis. Precis som dealern sa.',
    icon: '\ud83d\udccb',
    phase: 1,
    tier: 'lokal',
    check: (s) => s.clickCount >= 1,
  },
  {
    id: 'kaffekoppen',
    name: 'Kaffekoppen',
    description: 'Tio inspektörer. Tio kaffekoppar. 5 000 hektar.',
    icon: '\u2615',
    phase: 1,
    tier: 'lokal',
    check: (s) => (s.generators['gen_virkesuppkopare']?.count ?? 0) >= 10,
  },
  {
    id: 'gallringsmastaren',
    name: 'Gallringsmästaren',
    description: 'Du tog de bästa träden och lämnade skrapet. Ägaren tackade dig.',
    icon: '\ud83e\ude93',
    phase: 1,
    tier: 'lokal',
    check: (s) => s.clickCount >= 100,
  },
  {
    id: 'forsta_kronan',
    name: 'Första kronan',
    description: 'Kapital börjar strömma in. Det här går att växa.',
    icon: '\ud83d\udcb0',
    phase: 1,
    tier: 'lokal',
    check: (s) => s.kapital >= 1,
  },
  {
    id: 'stammar_1k',
    name: 'Lokalpatriot',
    description: 'Nå 1 000 stammar totalt. Du är på väg.',
    icon: '\ud83c\udf32',
    phase: 1,
    tier: 'lokal',
    check: (s) => s.totalStammar >= 1_000,
  },
  {
    id: 'stammar_10k',
    name: 'Storskogsbrukare',
    description: 'Nå 10 000 stammar. Dags att expandera.',
    icon: '\ud83c\udfd4\ufe0f',
    phase: 1,
    tier: 'lokal',
    check: (s) => s.totalStammar >= 10_000,
  },
  {
    id: 'first_event',
    name: 'Senaste nytt',
    description: 'Hantera din första händelse. Välj klokt.',
    icon: '\ud83d\udcf0',
    phase: 1,
    tier: 'lokal',
    check: (s) => s.eventHistory.length >= 1,
  },

  // ═══════════════════════════════════════════
  //  TIER 2: REGIONAL
  // ═══════════════════════════════════════════
  {
    id: 'frihet_under_ansvar',
    name: 'Frihet Under Ansvar',
    description: 'Staten litar på dig. Det borde den inte.',
    icon: '\ud83d\uddfd',
    phase: 2,
    tier: 'regional',
    check: (s) => s.lobbyProjects['lobby_buy_frihet']?.purchased === true,
  },
  {
    id: 'aganderattskrigaren',
    name: 'Äganderättskrigaren',
    description: 'De tror du kämpar för dem. Du kämpar för deras skog.',
    icon: '\ud83d\udee1\ufe0f',
    phase: 2,
    tier: 'regional',
    check: (s) => s.ownerTrust >= 80,
  },
  {
    id: 'rysslands_bonansen',
    name: 'Rysslands-Bonansen',
    description: 'En tragedi. Men din omsättning ökade 40%.',
    icon: '\ud83c\uddf7\ud83c\uddfa',
    phase: 2,
    tier: 'regional',
    check: (s) => s.eventHistory.includes('p2_ryssland_embargo'),
  },
  {
    id: 'grontvattare',
    name: 'Gröntvättare',
    description: 'Låt Grön Image sjunka under 50. Men du är ju hållbar!',
    icon: '\ud83c\udfad',
    phase: 2,
    tier: 'regional',
    check: (s) => s.image < 50,
  },
  {
    id: 'lobbyist',
    name: 'Första lobbymöte',
    description: 'Älgjakt med riksdagsledamot. Inget diskuteras. Allt förstås.',
    icon: '\ud83e\udd8c',
    phase: 2,
    tier: 'regional',
    check: (s) => s.lobby >= 10,
  },

  // ═══════════════════════════════════════════
  //  TIER 3: NATIONELL
  // ═══════════════════════════════════════════
  {
    id: 'nestle_sa_nej',
    name: 'Choco-Corp sa nej',
    description: 'Det företag som sålde bröstmjölksersättning till fattiga mödrar tycker att DU har etikproblem.',
    icon: '\ud83c\udf6b',
    phase: 4,
    tier: 'nationell',
    check: (s) => s.eventHistory.includes('p4_nestle_retratten'),
  },
  {
    id: 'gd_flansen',
    name: 'GD-Fansen',
    description: 'Han raderade mejlen. Han äger skogen. Han jobbar för dig nu.',
    icon: '\ud83d\udeaa',
    phase: 4,
    tier: 'nationell',
    check: (s) => s.lobbyProjects['lobby_buy_myndighetskapning']?.purchased === true,
  },
  {
    id: 'klimatambassadoren',
    name: 'Klimatambassadören',
    description: 'Du släppte ut 4 miljoner ton CO2. Din rapport visar -200 000. Matematik!',
    icon: '\ud83c\udf31',
    phase: 3,
    tier: 'nationell',
    check: (s) => s.image >= 80 && s.totalStammar >= 500_000,
  },
  {
    id: 'massabaronen',
    name: 'Massabaronen',
    description: 'Nå 1 miljon stammar. Du dominerar.',
    icon: '\ud83c\udfe2',
    phase: 3,
    tier: 'nationell',
    check: (s) => s.totalStammar >= 1_000_000,
  },

  // ═══════════════════════════════════════════
  //  TIER 4: INTERNATIONELL
  // ═══════════════════════════════════════════
  {
    id: 'warborn_manovern',
    name: 'Warborn-Manövern',
    description: 'Anmäld för jäv. Omnibus antogs ändå. Frihetens Tankesmedja skickar blommor.',
    icon: '\ud83c\uddea\ud83c\uddfa',
    phase: 3,
    tier: 'internationell',
    check: (s) => s.lobbyProjects['lobby_buy_omnibus']?.purchased === true,
  },
  {
    id: 'transatlantiska_pipansen',
    name: 'Den Transatlantiska Pipansen',
    description: 'Fossil Energi AB, en tankesmedja, och din EU-parlamentariker i samma rum. Ingen antecknar.',
    icon: '\ud83e\udd1d',
    phase: 4,
    tier: 'internationell',
    check: (s) => (s.lobbyProjects['lobby_earn_transatlantiska']?.count ?? 0) >= 5,
  },
  {
    id: 'fsc_karussellen',
    name: 'FSC-Karusellen',
    description: 'Lämna. Hugga nyckelbiotoper. Gå tillbaka. Repeat. Certifiering!',
    icon: '\u267b\ufe0f',
    phase: 3,
    tier: 'internationell',
    check: (s) => s.eventHistory.includes('p2_fsc_revision') && s.totalStammar >= 500_000,
  },
  {
    id: 'svangdorren',
    name: 'Svängdörren',
    description: 'Ministrar jobbar för dig efteråt. Svängdörren snurrar.',
    icon: '\ud83d\udd04',
    phase: 5,
    tier: 'internationell',
    check: (s) => s.lobbyProjects['lobby_buy_svangdorren']?.purchased === true,
  },

  // ═══════════════════════════════════════════
  //  TIER 5: ENDGAME
  // ═══════════════════════════════════════════
  {
    id: 'den_tysta_varen',
    name: 'Den Tysta Våren',
    description: 'Rachel Carson varnade. Du levererade.',
    icon: '\ud83d\udd07',
    phase: 6,
    tier: 'endgame',
    check: (s) => s.biodiversity <= 0,
  },
  {
    id: 'djurfritt_sedan_2035',
    name: 'Djurfritt Sedan 2035',
    description: 'Inte ens insekterna överlevde. Men din wellpapp-produktion ökade 12%.',
    icon: '\ud83e\udeb3',
    phase: 6,
    tier: 'endgame',
    check: (s) => s.species >= 50,
  },
  {
    id: 'kolonialmakten',
    name: 'Kolonialmakten',
    description: 'Jorden var inte nog. Månen har mineraler. Och du har skördare.',
    icon: '\ud83c\udf11',
    phase: 7,
    tier: 'endgame',
    check: (s) => (s.generators['gen_orbital']?.count ?? 0) >= 1,
  },
  {
    id: 'den_perfekta_raden',
    name: 'Den Perfekta Raden',
    description: 'Universum har blivit en industriskog. Stjärnorna lyser genom rutnätet.',
    icon: '\u221e',
    phase: 7,
    tier: 'endgame',
    check: (s) => s.totalStammar >= 10_000_000_000,
  },
  {
    id: 'och_sen_da',
    name: 'Och Sen Då?',
    description: 'Aktieägarna fick sin utdelning. Allt annat är detaljer.',
    icon: '\ud83d\udc80',
    phase: 7,
    tier: 'endgame',
    check: (s) => s.achievements['endgame_seen'] === true,
  },

  // \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
  //  TIER 6: KOSMISK
  // \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
  {
    id: 'nordisk_hegemoni',
    name: 'Nordisk Hegemoni',
    description: 'F\u00f6rv\u00e4rva alla nordiska l\u00e4nder. Kalmarunionen \u00e5teruppr\u00e4ttad. F\u00f6r tr\u00e4virke.',
    icon: '\ud83d\udc51',
    phase: 6,
    tier: 'kosmisk',
    check: (s) => ['exp_finland', 'exp_norge', 'exp_baltikum'].every(id => s.expansionTargets[id]?.acquired),
  },
  {
    id: 'kolonialmakten_2',
    name: 'Kolonialmakten 2.0',
    description: 'F\u00f6rv\u00e4rva Brasilien och Kongo. Historien upprepar sig, men med b\u00e4ttre logistik.',
    icon: '\ud83c\udf0d',
    phase: 6,
    tier: 'kosmisk',
    check: (s) => s.expansionTargets['exp_brasilien']?.acquired && s.expansionTargets['exp_kongo']?.acquired,
  },
  {
    id: 'global_dominans',
    name: 'Global Dominans',
    description: 'Alla jordiska territorier f\u00f6rv\u00e4rvade. Jorden \u00e4r en enda plantage.',
    icon: '\ud83c\udf0f',
    phase: 7,
    tier: 'kosmisk',
    check: (s) => ['exp_finland', 'exp_norge', 'exp_baltikum', 'exp_tyskland', 'exp_brasilien', 'exp_kongo', 'exp_sibirien', 'exp_kanada', 'exp_indonesien'].every(id => s.expansionTargets[id]?.acquired),
  },
  {
    id: 'arsredovisningen',
    name: '\u00c5rsredovisningen',
    description: 'Bevittna f\u00f6retagets milstolpesrapport. Akte\u00e4garna \u00e4r n\u00f6jda.',
    icon: '\ud83d\udcca',
    phase: 7,
    tier: 'kosmisk',
    check: (s) => s.achievements['endgame_seen'] === true,
  },
  {
    id: 'terraformaren',
    name: 'Terraformaren',
    description: 'F\u00f6rv\u00e4rva M\u00e5nen och Mars. Himlen \u00e4r inte l\u00e4ngre gr\u00e4nsen.',
    icon: '\ud83c\udf11',
    phase: 8,
    tier: 'kosmisk',
    check: (s) => s.expansionTargets['exp_manen']?.acquired && s.expansionTargets['exp_mars']?.acquired,
  },
  {
    id: 'galaktisk_skogsbrukare',
    name: 'Galaktisk Skogsbrukare',
    description: 'N\u00e5 fas 9. Tr\u00e4d v\u00e4xer p\u00e5 exoplaneter.',
    icon: '\ud83c\udf0c',
    phase: 9,
    tier: 'kosmisk',
    check: (s) => s.phase >= 9,
  },
  {
    id: 'en_punkt_atta_meter',
    name: '1,8 Meter Mellan Stj\u00e4rnorna',
    description: 'N\u00e5 fas 10. Universums perfekta plantage.',
    icon: '\u2728',
    phase: 10,
    tier: 'kosmisk',
    check: (s) => s.phase >= 10,
  },
  {
    id: 'ai_overlorden',
    name: 'AI-\u00d6verlorden',
    description: 'K\u00f6p 10 Nanosk\u00f6rdare. Maskinerna st\u00e4ller inga fr\u00e5gor.',
    icon: '\ud83e\udd16',
    phase: 9,
    tier: 'kosmisk',
    check: (s) => (s.generators['gen_nano']?.count ?? 0) >= 10,
  },
  {
    id: 'dysonbyggaren',
    name: 'Dysonbyggaren',
    description: 'F\u00f6rv\u00e4rva Dysonsfären. Solen \u00e4r nu en produktionsresurs.',
    icon: '\u2600\ufe0f',
    phase: 9,
    tier: 'kosmisk',
    check: (s) => s.expansionTargets['exp_dyson']?.acquired === true,
  },
  {
    id: 'den_sista_gransen',
    name: 'Den Sista Gr\u00e4nsen',
    description: 'N\u00e5 fas 11. Andra universum v\u00e4ntar.',
    icon: '\ud83c\udf00',
    phase: 11,
    tier: 'kosmisk',
    check: (s) => s.phase >= 11,
  },
  {
    id: 'multiverse_magnaten',
    name: 'Multiverse-Magnaten',
    description: 'F\u00f6rv\u00e4rva b\u00e5da parallella universum. Verkligheten \u00e4r en franchise.',
    icon: '\ud83c\udf10',
    phase: 11,
    tier: 'kosmisk',
    check: (s) => s.expansionTargets['exp_universe_alpha']?.acquired && s.expansionTargets['exp_universe_beta']?.acquired,
  },
  {
    id: 'tidsresenaren',
    name: 'Tidskorrekt\u00f6ren',
    description: 'F\u00f6rv\u00e4rva Tidslinje-korrektion. Dinosauriernas skog \u00e4r din.',
    icon: '\u231b',
    phase: 12,
    tier: 'kosmisk',
    check: (s) => s.expansionTargets['exp_tidslinje']?.acquired === true,
  },
  {
    id: 'entropins_besegrare',
    name: 'Entropins Besegrare',
    description: 'N\u00e5 fas 12. Universum d\u00f6r. Bolaget lever.',
    icon: '\u267e\ufe0f',
    phase: 12,
    tier: 'kosmisk',
    check: (s) => s.phase >= 12,
  },
  {
    id: 'hundra_generatorer',
    name: 'Hundra Generatorer',
    description: '\u00c4g totalt 100 generatorer. Effektivitet \u00e4r sk\u00f6nhet.',
    icon: '\ud83c\udfed',
    phase: 5,
    tier: 'kosmisk',
    check: (s) => Object.values(s.generators).reduce((sum, g) => sum + g.count, 0) >= 100,
  },
  {
    id: 'biljon_stammar',
    name: 'Biljonen',
    description: 'N\u00e5 1 biljon stammar. Det finns inte s\u00e5 m\u00e5nga tr\u00e4d. Det spelar ingen roll.',
    icon: '\ud83c\udf32',
    phase: 9,
    tier: 'kosmisk',
    check: (s) => s.totalStammar >= 1_000_000_000_000,
  },
  {
    id: 'lobby_baron',
    name: 'Lobbybaronen',
    description: 'Ackumulera 100 000 Politiskt Kapital. Demokrati \u00e4r en formalitet.',
    icon: '\ud83c\udfdb\ufe0f',
    phase: 8,
    tier: 'kosmisk',
    check: (s) => s.lobby >= 100_000,
  },
  {
    id: 'noll_biodiversitet',
    name: 'Steril Perfektion',
    description: 'Biodiversitet n\u00e5r 0%. Ingen konkurrens. Maximal produktion.',
    icon: '\ud83d\udc80',
    phase: 6,
    tier: 'kosmisk',
    check: (s) => s.biodiversity <= 0,
  },
  {
    id: 'alla_antagonister',
    name: 'Alla Tystade',
    description: 'Neutralisera alla antagonister. Ingen motst\u00e5r.',
    icon: '\ud83e\udd10',
    phase: 5,
    tier: 'kosmisk',
    check: (s) => {
      const vals = Object.values(s.antagonists)
      return vals.length >= 7 && vals.every(a => a.countered)
    },
  },
  {
    id: 'tio_tusen_klick',
    name: 'Mikrostyrning',
    description: '10 000 klick. Styrelsen rekommenderar delegering.',
    icon: '\ud83d\udd1f',
    phase: 3,
    tier: 'kosmisk',
    check: (s) => s.clickCount >= 10_000,
  },
  {
    id: 'allting_kopt',
    name: 'Allt \u00e4r K\u00f6pt',
    description: 'K\u00f6p alla lobby-projekt. Systemet \u00e4r helt ditt.',
    icon: '\ud83d\udcb8',
    phase: 5,
    tier: 'kosmisk',
    check: (s) => {
      const bought = Object.values(s.lobbyProjects).filter(p => p.purchased)
      return bought.length >= 7
    },
  },

  // \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
  //  META
  // \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
  {
    id: 'karpaltunnel',
    name: 'Karpaltunnel',
    description: '1 000 klick. Överväg att anlita en ergonomikonsult. Höj- och sänkbart skrivbord och studsboll \u2014 på bolagets bekostnad, såklart.',
    icon: '\ud83e\uddbe',
    phase: 1,
    tier: 'meta',
    check: (s) => s.clickCount >= 1_000,
  },
  {
    id: 'talamod',
    name: 'Tålamod',
    description: 'Spela i totalt 1 timme.',
    icon: '\u23f0',
    phase: 1,
    tier: 'meta',
    check: (s) => s.totalPlayTime >= 3600,
  },
]

export function getAchievementsByPhase(phase: number): AchievementDef[] {
  return ACHIEVEMENTS.filter(a => a.phase <= phase)
}

export function getAchievementsByTier(tier: AchievementTier): AchievementDef[] {
  return ACHIEVEMENTS.filter(a => a.tier === tier)
}

// Keep old name for backwards compat
export function getAchievementsByCategory(category: AchievementCategory): AchievementDef[] {
  return getAchievementsByTier(category)
}

const PHASE_NAMES: Record<number, string> = {
  1: 'Fas 1: Lokalpatriot',
  2: 'Fas 2: Den Goda Grannen',
  3: 'Fas 3: Massabaronen',
  4: 'Fas 4: PR-Katastrofen',
  5: 'Fas 5: Det Skogsindustriella Komplexet',
  6: 'Fas 6: Global Skogskonglomerat',
  7: 'Fas 7: Post-Biologisk Skogsbruk',
  8: 'Fas 8: Terraforming AB',
  9: 'Fas 9: Kosmisk Industrialisering',
  10: 'Fas 10: Den Perfekta Raden',
  11: 'Fas 11: Parallella Universum',
  12: 'Fas 12: Entropins Slut',
}

export function getPhaseLabel(phase: number): string {
  return PHASE_NAMES[phase] ?? `Fas ${phase}`
}
