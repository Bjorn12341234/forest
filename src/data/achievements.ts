import type { GameState } from '../store/types'

export type AchievementTier = 'lokal' | 'regional' | 'nationell' | 'internationell' | 'endgame' | 'meta'

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
  meta: 'Meta',
}

export const TIER_COLORS: Record<AchievementTier, string> = {
  lokal: '#88CC44',
  regional: '#4488CC',
  nationell: '#FFD700',
  internationell: '#FF6600',
  endgame: '#CC22CC',
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

  // ═══════════════════════════════════════════
  //  META
  // ═══════════════════════════════════════════
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
  6: 'Fas 6: Post-Biologisk Skogsbruk',
  7: 'Fas 7: UNIVERSUM AB',
}

export function getPhaseLabel(phase: number): string {
  return PHASE_NAMES[phase] ?? `Fas ${phase}`
}
