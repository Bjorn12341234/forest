import type { GameState } from '../store/types'

export type AchievementTier = 'lokal' | 'regional' | 'nationell' | 'internationell' | 'endgame' | 'kosmisk' | 'meta' | 'skogsagare'

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
  skogsagare: 'Skogsägaren',
}

export const TIER_COLORS: Record<AchievementTier, string> = {
  lokal: '#88CC44',
  regional: '#4488CC',
  nationell: '#FFD700',
  internationell: '#FF6600',
  endgame: '#CC22CC',
  kosmisk: '#00CCFF',
  meta: '#888888',
  skogsagare: '#5B9E6F',
}

export const ACHIEVEMENTS: AchievementDef[] = [
  // ═══════════════════════════════════════════
  //  TIER 1: LOKAL
  // ═══════════════════════════════════════════
  {
    id: 'forsta_planen',
    name: 'Första Planen',
    description: 'Den första är gratis. Precis som dealern sa.',
    icon: '📋',
    phase: 1,
    tier: 'lokal',
    check: (s) => s.clickCount >= 1,
  },
  {
    id: 'kaffekoppen',
    name: 'Kaffekoppen',
    description: 'Tio inspektörer. Tio kaffekoppar. 5 000 hektar.',
    icon: '☕',
    phase: 1,
    tier: 'lokal',
    check: (s) => (s.generators['gen_virkesuppkopare']?.count ?? 0) >= 10,
  },
  {
    id: 'gallringsmastaren',
    name: 'Gallringsmästaren',
    description: 'Du tog de bästa träden och lämnade skrapet. Ägaren tackade dig.',
    icon: '🪓',
    phase: 1,
    tier: 'lokal',
    check: (s) => s.clickCount >= 100,
  },
  {
    id: 'forsta_kronan',
    name: 'Första kronan',
    description: 'Kapital börjar strömma in. Det här går att växa.',
    icon: '💰',
    phase: 1,
    tier: 'lokal',
    check: (s) => s.kapital >= 1,
  },
  {
    id: 'stammar_1k',
    name: 'Lokalpatriot',
    description: 'Nå 1 000 stammar totalt. Du är på väg.',
    icon: '🌲',
    phase: 1,
    tier: 'lokal',
    check: (s) => s.totalStammar >= 1_000,
  },
  {
    id: 'stammar_10k',
    name: 'Storskogsbrukare',
    description: 'Nå 10 000 stammar. Dags att expandera.',
    icon: '🏔️',
    phase: 1,
    tier: 'lokal',
    check: (s) => s.totalStammar >= 10_000,
  },
  {
    id: 'first_event',
    name: 'Senaste nytt',
    description: 'Hantera din första händelse. Välj klokt.',
    icon: '📰',
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
    icon: '🗽',
    phase: 2,
    tier: 'regional',
    check: (s) => s.lobbyProjects['lobby_buy_frihet']?.purchased === true,
  },
  {
    id: 'aganderattskrigaren',
    name: 'Äganderättskrigaren',
    description: 'De tror du kämpar för dem. Du kämpar för deras skog.',
    icon: '🛡️',
    phase: 2,
    tier: 'regional',
    check: (s) => s.ownerTrust >= 80,
  },
  {
    id: 'rysslands_bonansen',
    name: 'Rysslands-Bonansen',
    description: 'En tragedi. Men din omsättning ökade 40%.',
    icon: '🇷🇺',
    phase: 2,
    tier: 'regional',
    check: (s) => s.eventHistory.includes('p2_ryssland_embargo'),
  },
  {
    id: 'grontvattare',
    name: 'Gröntvättare',
    description: 'Låt Grön Image sjunka under 50. Men du är ju hållbar!',
    icon: '🎭',
    phase: 2,
    tier: 'regional',
    check: (s) => s.image < 50,
  },
  {
    id: 'lobbyist',
    name: 'Första lobbymöte',
    description: 'Älgjakt med riksdagsledamot. Inget diskuteras. Allt förstås.',
    icon: '🦌',
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
    icon: '🍫',
    phase: 4,
    tier: 'nationell',
    check: (s) => s.eventHistory.includes('p4_nestle_retratten'),
  },
  {
    id: 'gd_flansen',
    name: 'GD-Fansen',
    description: 'Han raderade mejlen. Han äger skogen. Han jobbar för dig nu.',
    icon: '🚪',
    phase: 4,
    tier: 'nationell',
    check: (s) => s.lobbyProjects['lobby_buy_myndighetskapning']?.purchased === true,
  },
  {
    id: 'klimatambassadoren',
    name: 'Klimatambassadören',
    description: 'Du släppte ut 4 miljoner ton CO2. Din rapport visar -200 000. Matematik!',
    icon: '🌱',
    phase: 3,
    tier: 'nationell',
    check: (s) => s.image >= 80 && s.totalStammar >= 500_000,
  },
  {
    id: 'massabaronen',
    name: 'Massabaronen',
    description: 'Nå 1 miljon stammar. Du dominerar.',
    icon: '🏢',
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
    icon: '🇪🇺',
    phase: 3,
    tier: 'internationell',
    check: (s) => s.lobbyProjects['lobby_buy_omnibus']?.purchased === true,
  },
  {
    id: 'transatlantiska_pipansen',
    name: 'Den Transatlantiska Pipansen',
    description: 'Fossil Energi AB, en tankesmedja, och din EU-parlamentariker i samma rum. Ingen antecknar.',
    icon: '🤝',
    phase: 4,
    tier: 'internationell',
    check: (s) => (s.lobbyProjects['lobby_earn_transatlantiska']?.count ?? 0) >= 5,
  },
  {
    id: 'fsc_karussellen',
    name: 'FSC-Karusellen',
    description: 'Lämna. Hugga nyckelbiotoper. Gå tillbaka. Repeat. Certifiering!',
    icon: '♻️',
    phase: 3,
    tier: 'internationell',
    check: (s) => s.eventHistory.includes('p2_fsc_revision') && s.totalStammar >= 500_000,
  },
  {
    id: 'svangdorren',
    name: 'Svängdörren',
    description: 'Ministrar jobbar för dig efteråt. Svängdörren snurrar.',
    icon: '🔄',
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
    icon: '🔇',
    phase: 6,
    tier: 'endgame',
    check: (s) => s.biodiversity <= 0,
  },
  {
    id: 'djurfritt_sedan_2035',
    name: 'Djurfritt Sedan 2035',
    description: 'Inte ens insekterna överlevde. Men din wellpapp-produktion ökade 12%.',
    icon: '🪳',
    phase: 6,
    tier: 'endgame',
    check: (s) => s.species >= 50,
  },
  {
    id: 'kolonialmakten',
    name: 'Kolonialmakten',
    description: 'Jorden var inte nog. Månen har mineraler. Och du har skördare.',
    icon: '🌑',
    phase: 7,
    tier: 'endgame',
    check: (s) => (s.generators['gen_orbital']?.count ?? 0) >= 1,
  },
  {
    id: 'den_perfekta_raden',
    name: 'Den Perfekta Raden',
    description: 'Universum har blivit en industriskog. Stjärnorna lyser genom rutnätet.',
    icon: '∞',
    phase: 7,
    tier: 'endgame',
    check: (s) => s.totalStammar >= 10_000_000_000,
  },
  {
    id: 'och_sen_da',
    name: 'Och Sen Då?',
    description: 'Aktieägarna fick sin utdelning. Allt annat är detaljer.',
    icon: '💀',
    phase: 7,
    tier: 'endgame',
    check: (s) => s.achievements['endgame_seen'] === true,
  },

  // ═══════════════════════════════════════════
  //  TIER 6: KOSMISK
  // ═══════════════════════════════════════════
  {
    id: 'nordisk_hegemoni',
    name: 'Nordisk Hegemoni',
    description: 'Kontrollera alla nordiska länder. Kalmarunionen återupprättad. För trävirke.',
    icon: '👑',
    phase: 7,
    tier: 'kosmisk',
    check: (s) => ['c_finlandia', 'c_norgia', 'c_island', 'c_danmark'].every(id => s.countries[id]?.status === 'controlled'),
  },
  {
    id: 'kolonialmakten_2',
    name: 'Kolonialmakten 2.0',
    description: 'Kontrollera Amazonia och Kanadien. Historien upprepar sig, men med bättre logistik.',
    icon: '🌍',
    phase: 8,
    tier: 'kosmisk',
    check: (s) => s.countries['c_amazonia']?.status === 'controlled' && s.countries['c_kanadien']?.status === 'controlled',
  },
  {
    id: 'global_dominans',
    name: 'Global Dominans',
    description: 'Alla länder kontrollerade. Jorden är en enda plantage.',
    icon: '🌏',
    phase: 9,
    tier: 'kosmisk',
    check: (s) => Object.values(s.countries).filter(c => c.status === 'controlled').length >= 9,
  },
  {
    id: 'arsredovisningen',
    name: 'Årsredovisningen',
    description: 'Bevittna företagets milstolpesrapport. Akteägarna är nöjda.',
    icon: '📊',
    phase: 10,
    tier: 'kosmisk',
    check: (s) => s.achievements['endgame_seen'] === true,
  },
  {
    id: 'terraformaren',
    name: 'Terraformaren',
    description: 'Förvärva Månen och Mars. Himlen är inte längre gränsen.',
    icon: '🌑',
    phase: 10,
    tier: 'kosmisk',
    check: (s) => s.expansionTargets['exp_manen']?.status === 'controlled' && s.expansionTargets['exp_mars']?.status === 'controlled',
  },
  {
    id: 'galaktisk_skogsbrukare',
    name: 'Jordens Sista Skog',
    description: 'Nå fas 9. All naturlig skog på jorden är borta.',
    icon: '🌌',
    phase: 9,
    tier: 'kosmisk',
    check: (s) => s.phase >= 9,
  },
  {
    id: 'en_punkt_atta_meter',
    name: '1,8 Meter Mellan Stjärnorna',
    description: 'Nå fas 10. Universums perfekta plantage.',
    icon: '✨',
    phase: 10,
    tier: 'kosmisk',
    check: (s) => s.phase >= 10,
  },
  {
    id: 'ai_overlorden',
    name: 'AI-Överlorden',
    description: 'Köp 10 Nanoskördare. Maskinerna ställer inga frågor.',
    icon: '🤖',
    phase: 11,
    tier: 'kosmisk',
    check: (s) => (s.generators['gen_nano']?.count ?? 0) >= 10,
  },
  {
    id: 'dysonbyggaren',
    name: 'Dysonbyggaren',
    description: 'Förvärva Dysonsfären. Solen är nu en produktionsresurs.',
    icon: '☀️',
    phase: 11,
    tier: 'kosmisk',
    check: (s) => s.expansionTargets['exp_dyson']?.status === 'controlled',
  },
  {
    id: 'den_sista_gransen',
    name: 'Den Sista Gränsen',
    description: 'Nå fas 11. Andra universum väntar.',
    icon: '🌀',
    phase: 11,
    tier: 'kosmisk',
    check: (s) => s.phase >= 11,
  },
  {
    id: 'multiverse_magnaten',
    name: 'Multiverse-Magnaten',
    description: 'Förvärva det parallella universumet. Verkligheten är en franchise.',
    icon: '🌐',
    phase: 11,
    tier: 'kosmisk',
    check: (s) => s.expansionTargets['exp_universe_alpha']?.status === 'controlled',
  },
  {
    id: 'tidsresenaren',
    name: 'Tidskorrektören',
    description: 'Förvärva Tidslinje-korrektion. Dinosauriernas skog är din.',
    icon: '⌛',
    phase: 12,
    tier: 'kosmisk',
    check: (s) => s.expansionTargets['exp_tidslinje']?.status === 'controlled',
  },
  {
    id: 'entropins_besegrare',
    name: 'Entropins Besegrare',
    description: 'Nå fas 12. Universum dör. Bolaget lever.',
    icon: '♾️',
    phase: 12,
    tier: 'kosmisk',
    check: (s) => s.phase >= 12,
  },
  {
    id: 'hundra_generatorer',
    name: 'Hundra Generatorer',
    description: 'Äg totalt 100 generatorer. Effektivitet är skönhet.',
    icon: '🏭',
    phase: 5,
    tier: 'kosmisk',
    check: (s) => Object.values(s.generators).reduce((sum, g) => sum + g.count, 0) >= 100,
  },
  {
    id: 'biljon_stammar',
    name: 'Biljonen',
    description: 'Nå 1 biljon stammar. Det finns inte så många träd. Det spelar ingen roll.',
    icon: '🌲',
    phase: 9,
    tier: 'kosmisk',
    check: (s) => s.totalStammar >= 1_000_000_000_000,
  },
  {
    id: 'lobby_baron',
    name: 'Lobbybaronen',
    description: 'Ackumulera 100 000 Politiskt Kapital. Demokrati är en formalitet.',
    icon: '🏛️',
    phase: 8,
    tier: 'kosmisk',
    check: (s) => s.lobby >= 100_000,
  },
  {
    id: 'noll_biodiversitet',
    name: 'Steril Perfektion',
    description: 'Biodiversitet når 0%. Ingen konkurrens. Maximal produktion.',
    icon: '💀',
    phase: 6,
    tier: 'kosmisk',
    check: (s) => s.biodiversity <= 0,
  },
  {
    id: 'alla_antagonister',
    name: 'Alla Tystade',
    description: 'Neutralisera alla antagonister. Ingen motstår.',
    icon: '🤐',
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
    icon: '🔟',
    phase: 3,
    tier: 'kosmisk',
    check: (s) => s.clickCount >= 10_000,
  },
  {
    id: 'allting_kopt',
    name: 'Allt är Köpt',
    description: 'Köp alla lobby-projekt. Systemet är helt ditt.',
    icon: '💸',
    phase: 5,
    tier: 'kosmisk',
    check: (s) => {
      const bought = Object.values(s.lobbyProjects).filter(p => p.purchased)
      return bought.length >= 7
    },
  },

  // ═══════════════════════════════════════════
  //  STRATEGISK (Sprint 12 — playstyle rewards)
  // ═══════════════════════════════════════════
  {
    id: 'pacifisten',
    name: 'Pacifisten',
    description: 'Nå fas 6 utan att motverka en enda antagonist. De vinner, men du bryr dig inte.',
    icon: '🕊️',
    phase: 6,
    tier: 'endgame',
    check: (s) => s.phase >= 6 && Object.values(s.antagonists).every(a => !a.countered),
  },
  {
    id: 'lobbykungen',
    name: 'Lobbykungen',
    description: 'Köp alla lobbyköp före fas 5. Systemet var ditt redan innan de förstod det.',
    icon: '👑',
    phase: 4,
    tier: 'nationell',
    check: (s) => {
      if (s.phase >= 5) return false
      const bought = Object.values(s.lobbyProjects).filter(p => p.purchased)
      return bought.length >= 7
    },
  },
  {
    id: 'snabbvaxaren',
    name: 'Snabbväxaren',
    description: 'Nå fas 3 på under 15 minuter. Effektivitet är en dygd.',
    icon: '⚡',
    phase: 3,
    tier: 'regional',
    check: (s) => s.phase >= 3 && s.totalPlayTime < 900,
  },
  {
    id: 'grontvatt_deluxe',
    name: 'Gröntvätt Deluxe',
    description: 'Grön Image >80 samtidigt som du genererar >1M stammar/s. Perfekt fasad.',
    icon: '🎭',
    phase: 5,
    tier: 'nationell',
    check: (s) => s.image > 80 && s.stammarPerSecond > 1_000_000,
  },
  {
    id: 'den_rena_skogsagaren',
    name: 'Den Rena Skogsägaren',
    description: 'Avböj alla lockelser. Varje "gratis" erbjudande. Varje "samarbete". De var aldrig gratis.',
    icon: '✨',
    phase: 1,
    tier: 'skogsagare',
    check: (s) => s.gameMode === 'owner' && s.ownerLuresDeclined >= 5 && Object.keys(s.ownerLuresAccepted).length === 0,
  },
  {
    id: 'kunskapens_vag',
    name: 'Kunskapens Väg',
    description: 'Köp alla 20 kunskapsuppgraderingar. Du vet allt om din skog.',
    icon: '📚',
    phase: 1,
    tier: 'skogsagare',
    check: (s) => s.gameMode === 'owner' && Object.values(s.ownerKnowledgeUpgrades).filter(Boolean).length >= 20,
  },
  {
    id: 'fyra_generationer',
    name: 'Fyra Generationer',
    description: 'Nå 500 Generationsarv med alla attacker motstådda. Arvet är komplett.',
    icon: '🌳',
    phase: 1,
    tier: 'skogsagare',
    check: (s) => {
      if (s.gameMode !== 'owner') return false
      const resisted = Object.values(s.ownerAttacksResisted).filter(Boolean).length
      const surrendered = Object.values(s.ownerAttacksSurrendered).filter(Boolean).length
      return s.legacy >= 500 && resisted > 0 && surrendered === 0
    },
  },
  {
    id: 'mangfaldens_mastare',
    name: 'Mångfaldens Mästare',
    description: 'Nå 100 Biodiversitet. Din skog är ett ekosystem.',
    icon: '🦋',
    phase: 1,
    tier: 'skogsagare',
    check: (s) => s.gameMode === 'owner' && s.biodivOwner >= 100,
  },
  {
    id: 'sjalvforsorjande',
    name: 'Självförsörjande',
    description: 'Nå 100 000 skogsvärde utan att ge efter för en enda attack. Oberoende.',
    icon: '🏠',
    phase: 1,
    tier: 'skogsagare',
    check: (s) => s.gameMode === 'owner' && s.totalSkogsvardering >= 100_000
      && Object.keys(s.ownerAttacksSurrendered).length === 0,
  },
  {
    id: 'tidlos',
    name: 'Tidlös',
    description: 'Slutför skogsägarvägen på under 2 timmar. Effektiv naturvård.',
    icon: '⏱️',
    phase: 1,
    tier: 'skogsagare',
    check: (s) => s.gameMode === 'owner' && s.legacy >= 500 && s.totalPlayTime < 7200,
  },

  // ═══════════════════════════════════════════
  //  META
  // ═══════════════════════════════════════════
  {
    id: 'karpaltunnel',
    name: 'Karpaltunnel',
    description: '1 000 klick. Överväg att anlita en ergonomikonsult. Höj- och sänkbart skrivbord och studsboll — på bolagets bekostnad, såklart.',
    icon: '🦾',
    phase: 1,
    tier: 'meta',
    check: (s) => s.clickCount >= 1_000,
  },
  {
    id: 'talamod',
    name: 'Tålamod',
    description: 'Spela i totalt 1 timme.',
    icon: '⏰',
    phase: 1,
    tier: 'meta',
    check: (s) => s.totalPlayTime >= 3600,
  },

  // ═══════════════════════════════════════════
  //  SKOGSÄGAREN (Owner Path)
  // ═══════════════════════════════════════════
  {
    id: 'owner_forsta_tradet',
    name: 'Första Trädet',
    description: 'Klicka för första gången. Du planterar inte. Du låter det växa.',
    icon: '🌱',
    phase: 1,
    tier: 'skogsagare',
    check: (s) => s.gameMode === 'owner' && s.ownerClickCount >= 1,
  },
  {
    id: 'owner_hundra_klick',
    name: 'Tålmodets Väg',
    description: '100 klick. Skogen växer på sin tid, inte din.',
    icon: '⌛',
    phase: 1,
    tier: 'skogsagare',
    check: (s) => s.gameMode === 'owner' && s.ownerClickCount >= 100,
  },
  {
    id: 'owner_forsta_generatorn',
    name: 'Naturlig Föryngring',
    description: 'Köp din första generator. Naturen gör jobbet.',
    icon: '🌿',
    phase: 1,
    tier: 'skogsagare',
    check: (s) => s.gameMode === 'owner' && Object.values(s.ownerGenerators).some(g => g.count > 0),
  },
  {
    id: 'owner_sv_5000',
    name: 'Rötterna Håller',
    description: 'Nå 5 000 Skogsvärdering. Din skog börjar tala.',
    icon: '🌲',
    phase: 1,
    tier: 'skogsagare',
    check: (s) => s.gameMode === 'owner' && s.totalSkogsvardering >= 5_000,
  },
  {
    id: 'owner_sv_50000',
    name: 'Stående Kapital',
    description: 'Nå 50 000 Skogsvärdering. Mer än vad industrin någonsin betalat dig.',
    icon: '🏔️',
    phase: 1,
    tier: 'skogsagare',
    check: (s) => s.gameMode === 'owner' && s.totalSkogsvardering >= 50_000,
  },
  {
    id: 'owner_kunskap_100',
    name: 'Den Tysta Kunskapen',
    description: 'Nå 100 Kunskap. Du vet mer än inspektören.',
    icon: '📖',
    phase: 1,
    tier: 'skogsagare',
    check: (s) => s.gameMode === 'owner' && s.kunskap >= 100,
  },
  {
    id: 'owner_biodiv_25',
    name: 'Artrikedomen',
    description: 'Nå 25 Biodiversitet. Lavskrikan häckar.',
    icon: '🐦',
    phase: 1,
    tier: 'skogsagare',
    check: (s) => s.gameMode === 'owner' && s.biodivOwner >= 25,
  },
  {
    id: 'owner_resiliens_50',
    name: 'Stormfast',
    description: 'Nå 50 Resiliens. Din skog överlever det som kalavverkningen inte överlever.',
    icon: '🌪️',
    phase: 1,
    tier: 'skogsagare',
    check: (s) => s.gameMode === 'owner' && s.resiliens >= 50,
  },
  {
    id: 'owner_attack_resisted',
    name: 'Nej Tack',
    description: 'Motstå din första industriattack. Kunskap är makt.',
    icon: '🛡️',
    phase: 1,
    tier: 'skogsagare',
    check: (s) => s.gameMode === 'owner' && Object.values(s.ownerAttacksResisted).some(Boolean),
  },
  {
    id: 'owner_three_attacks',
    name: 'Orubblig',
    description: 'Motstå tre industriattacker. De ger sig inte. Det gör inte du heller.',
    icon: '🧱',
    phase: 1,
    tier: 'skogsagare',
    check: (s) => s.gameMode === 'owner' && Object.values(s.ownerAttacksResisted).filter(Boolean).length >= 3,
  },
  {
    id: 'owner_legacy_100',
    name: 'Generationsarv',
    description: 'Nå 100 Generationsarv. Dina barnbarn kommer att ärva en skog, inte ett plantage.',
    icon: '🏡',
    phase: 1,
    tier: 'skogsagare',
    check: (s) => s.gameMode === 'owner' && s.legacy >= 100,
  },
  {
    id: 'owner_sv_200000',
    name: 'Nastly Väljer Dig',
    description: 'Nå 200 000 Skogsvärdering. Nastly — NASTLY! — väljer dig framför industrin.',
    icon: '🍫',
    phase: 1,
    tier: 'skogsagare',
    check: (s) => s.gameMode === 'owner' && s.totalSkogsvardering >= 200_000,
  },
  {
    id: 'owner_alla_generatorer',
    name: 'Helt Ekosystem',
    description: 'Äg minst 1 av varje generator. Din skog är komplett.',
    icon: '🌳',
    phase: 1,
    tier: 'skogsagare',
    check: (s) => {
      if (s.gameMode !== 'owner') return false
      const gens = Object.values(s.ownerGenerators)
      return gens.length >= 12 && gens.every(g => g.count > 0)
    },
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
