// ── Silva Maximus — Lobby System Data ──
// Lobby earner activities (spend Kapital -> earn PK) and lobby purchases (spend PK -> effects)

export interface LobbyEarnerData {
  id: string
  name: string
  description: string
  cost: number          // Kapital cost
  pkReward: number      // Politiskt Kapital gained
  unlockPhase: number
  icon: string
}

export interface LobbyPurchaseData {
  id: string
  name: string
  description: string
  basedOn: string       // real-world reference
  cost: number          // PK cost
  effects: LobbyEffect[]
  unlockPhase: number
  icon: string
}

export interface LobbyEffect {
  type: 'scandalReduction' | 'imageLossReduction' | 'ownerTrustLock' | 'generatorBoost' | 'lobbyDiscount' | 'imageDecayReduction' | 'kapitalBoost'
  value: number
  description: string   // Swedish UI text
}

// ── Earn PK (repeatable activities) ──

export const LOBBY_EARNERS: LobbyEarnerData[] = [
  {
    id: 'lobby_earn_algjakt',
    name: 'Älgjakt med riksdagsledamot',
    description: 'Inget diskuteras. Allt förstås.',
    cost: 5_000,
    pkReward: 10,
    unlockPhase: 2,
    icon: '🦌',
  },
  {
    id: 'lobby_earn_tankesmedja',
    name: 'Finansiera tankesmedja',
    description: 'Rapporten "Skog i Tillväxt: Varför Avverkning Räddar Klimatet" publiceras i DN Debatt.',
    cost: 25_000,
    pkReward: 50,
    unlockPhase: 2,
    icon: '🏛️',
  },
  {
    id: 'lobby_earn_partistamma',
    name: 'Sponsra partistämma',
    description: 'Äganderätten nämns 47 gånger i motionerna.',
    cost: 100_000,
    pkReward: 200,
    unlockPhase: 3,
    icon: '🎪',
  },
  {
    id: 'lobby_earn_transatlantiska',
    name: 'Transatlantiska Kontakten',
    description: 'Ett möte i Washington DC. Frihetens Tankesmedja. Oljebolaget med i rummet. EU:s hållbarhetslagar diskuteras. Din svenska delegat nickar.',
    cost: 500_000,
    pkReward: 1_000,
    unlockPhase: 4,
    icon: '🌐',
  },
  // ── INTERNATIONELL (7-9) ──
  {
    id: 'lobby_earn_handelsavtal',
    name: 'Tvångshandelsavtal',
    description: 'Skriv in "nordisk skogsexpertis" i EU:s handelsavtal. Ingen läser det finstilta.',
    cost: 500_000,
    pkReward: 2_000,
    unlockPhase: 7,
    icon: '📜',
  },
  {
    id: 'lobby_earn_fn_korridorer',
    name: 'FN-korridorsamtal',
    description: 'Whisky i FN-lobbyn. Delegater från 40 länder nickar instämmande.',
    cost: 2_000_000,
    pkReward: 5_000,
    unlockPhase: 8,
    icon: '🌐',
  },
  // ── EXPANSION (10-12) ──
  {
    id: 'lobby_earn_galaktiskt',
    name: 'Galaktiskt Handelsmöte',
    description: 'Möte med utomjordiska delegater. De förstår inte avverkning men de gillar kapital.',
    cost: 10_000_000,
    pkReward: 20_000,
    unlockPhase: 10,
    icon: '🛸',
  },
  {
    id: 'lobby_earn_terraforming',
    name: 'Terraformingsubvention',
    description: 'Lobba för statlig subvention av planetomvandling. "För mänsklighetens bästa."',
    cost: 50_000_000,
    pkReward: 100_000,
    unlockPhase: 11,
    icon: '🌍',
  },
  {
    id: 'lobby_earn_kosmiskt_konferens',
    name: 'Kosmiskt Konferenscentrum',
    description: 'Konferenscenter i omloppsbana. Tyngdlöst mingel. Gravitationsfri handtryckning. Lobbyn har aldrig varit så bokstavlig.',
    cost: 200_000_000,
    pkReward: 500_000,
    unlockPhase: 12,
    icon: '🛰️',
  },
]

// ── Spend PK (one-time law changes / projects) ──

export const LOBBY_PURCHASES: LobbyPurchaseData[] = [
  {
    id: 'lobby_buy_frihet',
    name: '"Frihet Under Ansvar 2.0"',
    description: '-30% myndighetstillsyn. Staten litar på dig. Det borde den inte.',
    basedOn: 'Skogsreformen 1993',
    cost: 50,
    effects: [
      { type: 'scandalReduction', value: 0.3, description: '-30% risk för skandaler' },
    ],
    unlockPhase: 2,
    icon: '🗽',
  },
  {
    id: 'lobby_buy_budget',
    name: '"Skogsstyrelsen: Tillsynsbudget -40%"',
    description: 'Skandaler kostar 50% mindre Image. Ingen har råd att granska.',
    basedOn: 'Naturvårdsverkets nedskärningar',
    cost: 100,
    effects: [
      { type: 'imageLossReduction', value: 0.5, description: 'Skandaler kostar 50% mindre Image' },
    ],
    unlockPhase: 2,
    icon: '📉',
  },
  {
    id: 'lobby_buy_aganderatt',
    name: '"Äganderätten Är Hotad!™"',
    description: 'Skogsägare protesterar aldrig mot dig. De tror du kämpar för dem.',
    basedOn: 'Skogsindustrins 200M kr lobbybudget 2022',
    cost: 200,
    effects: [
      { type: 'ownerTrustLock', value: 50, description: 'Skogsägarförtroende sjunker aldrig under 40' },
    ],
    unlockPhase: 2,
    icon: '🛡️',
  },
  {
    id: 'lobby_buy_omnibus',
    name: '"Operation Omnibus"',
    description: 'EU-compliance -50%. Anmäld för jäv. Omnibus antogs ändå.',
    basedOn: 'Warborn/Omnibus-paketet',
    cost: 500,
    effects: [
      { type: 'generatorBoost', value: 0.5, description: '+50% produktion från alla generatorer' },
    ],
    unlockPhase: 3,
    icon: '🇪🇺',
  },
  {
    id: 'lobby_buy_myndighetskapning',
    name: '"Myndighetskapning"',
    description: 'Skogsstyrelsen skriver DINA rapporter. GD:n raderade mejlen.',
    basedOn: 'GD som raderade mail med lobbyister',
    cost: 1_000,
    effects: [
      { type: 'imageDecayReduction', value: 0.7, description: '-70% Image-förlust från alla källor' },
      { type: 'scandalReduction', value: 0.5, description: '-50% risk för skandaler' },
    ],
    unlockPhase: 4,
    icon: '🚪',
  },
  {
    id: 'lobby_buy_svangdorren',
    name: '"Svängdörren"',
    description: 'Permanent: ministrar jobbar för dig efteråt. Svängdörren snurrar.',
    basedOn: 'Maktutredningen 2026',
    cost: 2_000,
    effects: [
      { type: 'lobbyDiscount', value: 0.3, description: '-30% kostnad på alla lobby-aktiviteter' },
      { type: 'kapitalBoost', value: 0.2, description: '+20% Kapital-generering' },
    ],
    unlockPhase: 5,
    icon: '🔄',
  },
  {
    id: 'lobby_buy_avskogning',
    name: '"Avskogningsförordningen: Avvecklad"',
    description: 'Global avverkning utan konsekvens. Frihet, äganderätt, tillväxt.',
    basedOn: 'EU:s avskogningsförordning',
    cost: 5_000,
    effects: [
      { type: 'generatorBoost', value: 1.0, description: '+100% produktion från alla generatorer' },
      { type: 'imageDecayReduction', value: 0.5, description: '-50% Image-förlust' },
    ],
    unlockPhase: 5,
    icon: '🌍',
  },
  // ── INTERNATIONELL (7-9) ──
  {
    id: 'lobby_buy_kolonialt',
    name: '"Kolonialt Ramavtal"',
    description: 'Exportera den svenska modellen globalt. Alla länder ska se ut som Norrland.',
    basedOn: 'Världsbankens strukturanpassning',
    cost: 5_000,
    effects: [
      { type: 'generatorBoost', value: 0.5, description: '+50% produktion från alla generatorer' },
      { type: 'kapitalBoost', value: 0.3, description: '+30% Kapital-generering' },
    ],
    unlockPhase: 7,
    icon: '🌐',
  },
  {
    id: 'lobby_buy_frihandel',
    name: '"Global Frihandel i Cellulosa"',
    description: 'Nolltull på all cellulosa. Importtull på allt annat. Fri handel™.',
    basedOn: 'WTO-förhandlingar',
    cost: 15_000,
    effects: [
      { type: 'generatorBoost', value: 0.5, description: '+50% produktion' },
      { type: 'imageLossReduction', value: 0.3, description: '-30% Image-förlust' },
    ],
    unlockPhase: 8,
    icon: '🚢',
  },
  // ── EXPANSION (10-12) ──
  {
    id: 'lobby_buy_planetar',
    name: '"Planetär Äganderätt"',
    description: 'FN:s rymdavtal omskrivet. Du äger Mars. Juridiskt.',
    basedOn: 'FN:s rymdtraktat',
    cost: 30_000,
    effects: [
      { type: 'generatorBoost', value: 0.5, description: '+50% produktion från alla generatorer' },
    ],
    unlockPhase: 10,
    icon: '🌑',
  },
  {
    id: 'lobby_buy_universell',
    name: '"Universell Avreglering"',
    description: 'Alla lagar i alla dimensioner upphävs. Tillväxt är den enda lagen.',
    basedOn: 'Kosmisk libertarianism',
    cost: 100_000,
    effects: [
      { type: 'generatorBoost', value: 0.5, description: '+50% produktion' },
      { type: 'scandalReduction', value: 0.8, description: '-80% skandaler' },
    ],
    unlockPhase: 11,
    icon: '⚖️',
  },
  {
    id: 'lobby_buy_allemansratt_avskaffad',
    name: '"Kosmisk Allemansrätt: Avskaffad"',
    description: 'Allemansrätten gällde i Sverige. I rymden gäller bara äganderätten.',
    basedOn: 'Allemansrättens urholkning',
    cost: 50_000,
    effects: [
      { type: 'generatorBoost', value: 0.5, description: '+50% produktion från alla generatorer' },
      { type: 'imageDecayReduction', value: 0.3, description: '-30% Image-förlust' },
    ],
    unlockPhase: 10,
    icon: '🚷',
  },
  {
    id: 'lobby_buy_universell_revision',
    name: '"Universell Revision: Avvecklad"',
    description: 'Riksrevisionen hade redan ingen budget. Nu har den inte heller ett mandat.',
    basedOn: 'Riksrevisionens nedskärningar',
    cost: 150_000,
    effects: [
      { type: 'imageDecayReduction', value: 0.8, description: '-80% Image-förlust' },
      { type: 'lobbyDiscount', value: 0.2, description: '-20% lobby-kostnad' },
    ],
    unlockPhase: 11,
    icon: '📋',
  },
  {
    id: 'lobby_buy_monopol',
    name: '"Kosmisk Monopol"',
    description: 'All materia i universum tillhör bolaget. Aktieägarna ler.',
    basedOn: 'Entropislaveri',
    cost: 200_000,
    effects: [
      { type: 'kapitalBoost', value: 1.0, description: '+100% Kapital-generering' },
      { type: 'imageDecayReduction', value: 1.0, description: 'Image kan inte sjunka' },
    ],
    unlockPhase: 12,
    icon: '👑',
  },
]

// Maps for O(1) lookups
const LOBBY_EARNER_MAP = new Map<string, LobbyEarnerData>(
  LOBBY_EARNERS.map(e => [e.id, e])
)
const LOBBY_PURCHASE_MAP = new Map<string, LobbyPurchaseData>(
  LOBBY_PURCHASES.map(p => [p.id, p])
)

export function getLobbyEarner(id: string): LobbyEarnerData | undefined {
  return LOBBY_EARNER_MAP.get(id)
}

export function getLobbyPurchase(id: string): LobbyPurchaseData | undefined {
  return LOBBY_PURCHASE_MAP.get(id)
}

export function getLobbyEarnersByPhase(phase: number): LobbyEarnerData[] {
  return LOBBY_EARNERS.filter(e => e.unlockPhase <= phase)
}

export function getLobbyPurchasesByPhase(phase: number): LobbyPurchaseData[] {
  return LOBBY_PURCHASES.filter(p => p.unlockPhase <= phase)
}

// ── Cached lobby modifier computation ──
// Call once on buyLobbyProject instead of 5× per tick

export interface LobbyModifiers {
  generatorBoost: number   // capped at 2.0
  kapitalBoost: number
  imageProtection: number  // 0-1 factor (0 = full protection)
  lobbyDiscount: number    // capped at 0.5
  ownerTrustFloor: number
}

export function computeLobbyModifiers(lobbyProjects: Record<string, { purchased?: boolean }>): LobbyModifiers {
  let genBoost = 1.0
  let kapBoost = 1.0
  let imgReduction = 0
  let discount = 0
  let trustFloor = 0

  for (const purchase of LOBBY_PURCHASES) {
    if (!lobbyProjects[purchase.id]?.purchased) continue
    for (const effect of purchase.effects) {
      switch (effect.type) {
        case 'generatorBoost': genBoost += effect.value; break
        case 'kapitalBoost': kapBoost += effect.value; break
        case 'imageLossReduction':
        case 'imageDecayReduction': imgReduction += effect.value; break
        case 'lobbyDiscount': discount += effect.value; break
        case 'ownerTrustLock': trustFloor = 40; break
      }
    }
  }

  return {
    generatorBoost: Math.min(2.0, genBoost),
    kapitalBoost: kapBoost,
    imageProtection: Math.max(0, 1 - imgReduction),
    lobbyDiscount: Math.min(0.5, discount),
    ownerTrustFloor: trustFloor,
  }
}
