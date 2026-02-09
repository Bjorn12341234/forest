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
    icon: '\ud83e\udd8c',
  },
  {
    id: 'lobby_earn_tankesmedja',
    name: 'Finansiera tankesmedja',
    description: 'Rapporten "Skog i Tillväxt: Varför Avverkning Räddar Klimatet" publiceras i DN Debatt.',
    cost: 25_000,
    pkReward: 50,
    unlockPhase: 2,
    icon: '\ud83c\udfdb\ufe0f',
  },
  {
    id: 'lobby_earn_partistamma',
    name: 'Sponsra partistämma',
    description: 'Äganderätten nämns 47 gånger i motionerna.',
    cost: 100_000,
    pkReward: 200,
    unlockPhase: 3,
    icon: '\ud83c\udfaa',
  },
  {
    id: 'lobby_earn_transatlantiska',
    name: 'Transatlantiska Kontakten',
    description: 'Ett möte i Washington DC. Frihetens Tankesmedja. Oljebolaget med i rummet. EU:s hållbarhetslagar diskuteras. Din svenska delegat nickar.',
    cost: 500_000,
    pkReward: 1_000,
    unlockPhase: 4,
    icon: '\ud83c\udf10',
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
    icon: '\ud83d\uddfd',
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
    icon: '\ud83d\udcc9',
  },
  {
    id: 'lobby_buy_aganderatt',
    name: '"Äganderätten Är Hotad!\u2122"',
    description: 'Skogsägare protesterar aldrig mot dig. De tror du kämpar för dem.',
    basedOn: 'Skogsindustrins 200M kr lobbybudget 2022',
    cost: 200,
    effects: [
      { type: 'ownerTrustLock', value: 50, description: 'Skogsägarförtroende sjunker aldrig under 40' },
    ],
    unlockPhase: 2,
    icon: '\ud83d\udee1\ufe0f',
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
    icon: '\ud83c\uddea\ud83c\uddfa',
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
    icon: '\ud83d\udeaa',
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
    icon: '\ud83d\udd04',
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
    icon: '\ud83c\udf0d',
  },
]

export function getLobbyEarner(id: string): LobbyEarnerData | undefined {
  return LOBBY_EARNERS.find(e => e.id === id)
}

export function getLobbyPurchase(id: string): LobbyPurchaseData | undefined {
  return LOBBY_PURCHASES.find(p => p.id === id)
}

export function getLobbyEarnersByPhase(phase: number): LobbyEarnerData[] {
  return LOBBY_EARNERS.filter(e => e.unlockPhase <= phase)
}

export function getLobbyPurchasesByPhase(phase: number): LobbyPurchaseData[] {
  return LOBBY_PURCHASES.filter(p => p.unlockPhase <= phase)
}
