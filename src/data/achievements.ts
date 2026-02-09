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
    name: 'Forsta Planen',
    description: 'Den forsta ar gratis. Precis som dealern sa.',
    icon: '\ud83d\udccb',
    phase: 1,
    tier: 'lokal',
    check: (s) => s.clickCount >= 1,
  },
  {
    id: 'kaffekoppen',
    name: 'Kaffekoppen',
    description: 'Tio inspektorer. Tio kaffekoppar. 5 000 hektar.',
    icon: '\u2615',
    phase: 1,
    tier: 'lokal',
    check: (s) => (s.generators['gen_virkesuppkopare']?.count ?? 0) >= 10,
  },
  {
    id: 'gallringsmastaren',
    name: 'Gallringsmastaren',
    description: 'Du tog de basta traden och lamnade skrapet. Agaren tackade dig.',
    icon: '\ud83e\ude93',
    phase: 1,
    tier: 'lokal',
    check: (s) => s.clickCount >= 100,
  },
  {
    id: 'forsta_kronan',
    name: 'Forsta kronan',
    description: 'Kapital borjar strommen in. Det har gar att vaxa.',
    icon: '\ud83d\udcb0',
    phase: 1,
    tier: 'lokal',
    check: (s) => s.kapital >= 1,
  },
  {
    id: 'stammar_1k',
    name: 'Lokalpatriot',
    description: 'Na 1 000 stammar totalt. Du ar pa vag.',
    icon: '\ud83c\udf32',
    phase: 1,
    tier: 'lokal',
    check: (s) => s.totalStammar >= 1_000,
  },
  {
    id: 'stammar_10k',
    name: 'Storskogsbrukare',
    description: 'Na 10 000 stammar. Dags att expandera.',
    icon: '\ud83c\udfd4\ufe0f',
    phase: 1,
    tier: 'lokal',
    check: (s) => s.totalStammar >= 10_000,
  },
  {
    id: 'first_event',
    name: 'Senaste nytt',
    description: 'Hantera din forsta handelse. Valj klokt.',
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
    description: 'Staten litar pa dig. Det borde den inte.',
    icon: '\ud83d\uddfd',
    phase: 2,
    tier: 'regional',
    check: (s) => s.lobbyProjects['lobby_buy_frihet']?.purchased === true,
  },
  {
    id: 'aganderattskrigaren',
    name: 'Aganderattskrigaren',
    description: 'De tror du kampar for dem. Du kampar for deras skog.',
    icon: '\ud83d\udee1\ufe0f',
    phase: 2,
    tier: 'regional',
    check: (s) => s.ownerTrust >= 80,
  },
  {
    id: 'rysslands_bonansen',
    name: 'Rysslands-Bonansen',
    description: 'En tragedi. Men din omsattning okade 40%.',
    icon: '\ud83c\uddf7\ud83c\uddfa',
    phase: 2,
    tier: 'regional',
    check: (s) => s.eventHistory.includes('p2_ryssland_embargo'),
  },
  {
    id: 'grontvattare',
    name: 'Grontvattare',
    description: 'Lat Gron Image sjunka under 50. Men du ar ju hallbar!',
    icon: '\ud83c\udfad',
    phase: 2,
    tier: 'regional',
    check: (s) => s.image < 50,
  },
  {
    id: 'lobbyist',
    name: 'Forsta lobbymote',
    description: 'Algjakt med riksdagsledamot. Inget diskuteras. Allt forstass.',
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
    description: 'Det foretag som salde brostmjolksersattning till fattiga modrar tycker att DU har etikproblem.',
    icon: '\ud83c\udf6b',
    phase: 4,
    tier: 'nationell',
    check: (s) => s.eventHistory.includes('p4_nestle_retratten'),
  },
  {
    id: 'gd_flansen',
    name: 'GD-Flansen',
    description: 'Han raderade mejlen. Han ager skogen. Han jobbar for dig nu.',
    icon: '\ud83d\udeaa',
    phase: 4,
    tier: 'nationell',
    check: (s) => s.lobbyProjects['lobby_buy_myndighetskapning']?.purchased === true,
  },
  {
    id: 'klimatambassadoren',
    name: 'Klimatambassadoren',
    description: 'Du slappte ut 4 miljoner ton CO2. Din rapport visar -200 000. Matematik!',
    icon: '\ud83c\udf31',
    phase: 3,
    tier: 'nationell',
    check: (s) => s.image >= 80 && s.totalStammar >= 500_000,
  },
  {
    id: 'massabaronen',
    name: 'Massabaronen',
    description: 'Na 1 miljon stammar. Du dominerar.',
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
    name: 'Warborn-Manovern',
    description: 'Anmald for jav. Omnibus antogs anda. Frihetens Tankesmedja skickar blommor.',
    icon: '\ud83c\uddea\ud83c\uddfa',
    phase: 3,
    tier: 'internationell',
    check: (s) => s.lobbyProjects['lobby_buy_omnibus']?.purchased === true,
  },
  {
    id: 'transatlantiska_pipansen',
    name: 'Den Transatlantiska Pipansen',
    description: 'Exxon, en tankesmedja, och din EU-parlamentariker i samma rum. Ingen antecknar.',
    icon: '\ud83e\udd1d',
    phase: 4,
    tier: 'internationell',
    check: (s) => (s.lobbyProjects['lobby_earn_transatlantiska']?.count ?? 0) >= 5,
  },
  {
    id: 'fsc_karussellen',
    name: 'FSC-Karussellen',
    description: 'Lamna. Hugga nyckelbiotoper. Ga tillbaka. Repeat. Certifiering!',
    icon: '\u267b\ufe0f',
    phase: 3,
    tier: 'internationell',
    check: (s) => s.eventHistory.includes('p2_fsc_revision') && s.totalStammar >= 500_000,
  },
  {
    id: 'svangdorren',
    name: 'Svangdorren',
    description: 'Ministrar jobbar for dig efterat. Svangdorren snurrar.',
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
    name: 'Den Tysta Varen',
    description: 'Rachel Carson varnade. Du levererade.',
    icon: '\ud83d\udd07',
    phase: 6,
    tier: 'endgame',
    check: (s) => s.biodiversity <= 0,
  },
  {
    id: 'djurfritt_sedan_2035',
    name: 'Djurfritt Sedan 2035',
    description: 'Inte ens insekterna overlevde. Men din wellpapp-produktion okade 12%.',
    icon: '\ud83e\udeb3',
    phase: 6,
    tier: 'endgame',
    check: (s) => s.species >= 50,
  },
  {
    id: 'kolonialmakten',
    name: 'Kolonialmakten',
    description: 'Jorden var inte nog. Manen har mineraler. Och du har skordare.',
    icon: '\ud83c\udf11',
    phase: 7,
    tier: 'endgame',
    check: (s) => (s.generators['gen_orbital']?.count ?? 0) >= 1,
  },
  {
    id: 'den_perfekta_raden',
    name: 'Den Perfekta Raden',
    description: 'Universum har blivit en industriskog. Stjarnorna lyser genom rutnattet.',
    icon: '\u221e',
    phase: 7,
    tier: 'endgame',
    check: (s) => s.totalStammar >= 10_000_000_000,
  },
  {
    id: 'och_sen_da',
    name: 'Och Sen Da?',
    description: 'Aktieagarna fick sin utdelning. Allt annat ar detaljer.',
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
    description: 'Klicka 1 000 ganger. Overvag ergonomi.',
    icon: '\ud83e\uddbe',
    phase: 1,
    tier: 'meta',
    check: (s) => s.clickCount >= 1_000,
  },
  {
    id: 'talamod',
    name: 'Talamod',
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
