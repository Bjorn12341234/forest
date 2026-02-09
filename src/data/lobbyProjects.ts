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
    name: 'Algjakt med riksdagsledamot',
    description: 'Inget diskuteras. Allt forstass.',
    cost: 5_000,
    pkReward: 10,
    unlockPhase: 2,
    icon: '🦌',
  },
  {
    id: 'lobby_earn_tankesmedja',
    name: 'Finansiera tankesmedja',
    description: 'Rapporten "Skog i Tillvaxt: Varfor Avverkning Raddar Klimatet" publiceras i DN Debatt.',
    cost: 25_000,
    pkReward: 50,
    unlockPhase: 2,
    icon: '🏛️',
  },
  {
    id: 'lobby_earn_partistamma',
    name: 'Sponsra partistamma',
    description: 'Aganderatten namns 47 ganger i motionerna.',
    cost: 100_000,
    pkReward: 200,
    unlockPhase: 3,
    icon: '🎪',
  },
  {
    id: 'lobby_earn_transatlantiska',
    name: 'Transatlantiska Kontakten',
    description: 'Ett mote i Washington DC. Heritage Foundation. Oljebolag med i rummet. EU:s hallbarhetslagar diskuteras. Din svenska delegat nickar.',
    cost: 500_000,
    pkReward: 1_000,
    unlockPhase: 4,
    icon: '🌐',
  },
]

// ── Spend PK (one-time law changes / projects) ──

export const LOBBY_PURCHASES: LobbyPurchaseData[] = [
  {
    id: 'lobby_buy_frihet',
    name: '"Frihet Under Ansvar 2.0"',
    description: '-30% myndighetstillsyn. Staten litar pa dig. Det borde den inte.',
    basedOn: 'Skogsreformen 1993',
    cost: 50,
    effects: [
      { type: 'scandalReduction', value: 0.3, description: '-30% risk for skandaler' },
    ],
    unlockPhase: 2,
    icon: '🗽',
  },
  {
    id: 'lobby_buy_budget',
    name: '"Skogsstyrelsen: Tillsynsbudget -40%"',
    description: 'Skandaler kostar 50% mindre Image. Ingen har rad att granska.',
    basedOn: 'Naturvardsverkets nedskdrningar',
    cost: 100,
    effects: [
      { type: 'imageLossReduction', value: 0.5, description: 'Skandaler kostar 50% mindre Image' },
    ],
    unlockPhase: 2,
    icon: '📉',
  },
  {
    id: 'lobby_buy_aganderatt',
    name: '"Aganderatten Ar Hotad!\u2122"',
    description: 'Skogsagare protesterar aldrig mot dig. De tror du kampar for dem.',
    basedOn: 'Skogsindustrins 200M kr lobbybudget 2022',
    cost: 200,
    effects: [
      { type: 'ownerTrustLock', value: 50, description: 'Skogsagarfortroende sjunker aldrig under 40' },
    ],
    unlockPhase: 2,
    icon: '🛡️',
  },
  {
    id: 'lobby_buy_omnibus',
    name: '"Operation Omnibus"',
    description: 'EU-compliance -50%. Anmald for jav. Omnibus antogs anda.',
    basedOn: 'Warborn/Omnibus-paketet',
    cost: 500,
    effects: [
      { type: 'generatorBoost', value: 0.5, description: '+50% produktion fran alla generatorer' },
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
      { type: 'imageDecayReduction', value: 0.7, description: '-70% Image-forlust fran alla kallor' },
      { type: 'scandalReduction', value: 0.5, description: '-50% risk for skandaler' },
    ],
    unlockPhase: 4,
    icon: '🚪',
  },
  {
    id: 'lobby_buy_svangdorren',
    name: '"Svangdorren"',
    description: 'Permanent: ministrar jobbar for dig efterat. Svangdorren snurrar.',
    basedOn: 'Maktutredningen 2026',
    cost: 2_000,
    effects: [
      { type: 'lobbyDiscount', value: 0.3, description: '-30% kostnad pa alla lobby-aktiviteter' },
      { type: 'kapitalBoost', value: 0.2, description: '+20% Kapital-generering' },
    ],
    unlockPhase: 5,
    icon: '🔄',
  },
  {
    id: 'lobby_buy_avskogning',
    name: '"Avskogningsforordningen: Avvecklad"',
    description: 'Global avverkning utan konsekvens. Frihet, aganderatt, tillvaxt.',
    basedOn: 'EU:s avskogningsforordning',
    cost: 5_000,
    effects: [
      { type: 'generatorBoost', value: 1.0, description: '+100% produktion fran alla generatorer' },
      { type: 'imageDecayReduction', value: 0.5, description: '-50% Image-forlust' },
    ],
    unlockPhase: 5,
    icon: '🌍',
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
