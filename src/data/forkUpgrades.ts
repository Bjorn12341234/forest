import type { UpgradeData } from '../store/types'

// ── Mutually Exclusive Fork Upgrades ──
// At each fork point, the player must choose ONE of two upgrades.
// Buying one permanently locks out the other. Adds replay value.

export const FORK_UPGRADES: UpgradeData[] = [
  // ═══ Fork 1: Phase 3 — Sustainability vs Cost-Cutting ═══
  {
    id: 'fork_hallbarhet',
    name: 'Hållbarhetscertifiering',
    description: 'VÄLJ EN: Investera i certifieringsprocessen. Kostar mer men skyddar image — och kunderna betalar premium.',
    tree: 'Strategi',
    icon: '🌱',
    baseCost: 100_000,
    costResource: 'kapital',
    production: 0,
    maxCount: 1,
    effects: [
      { type: 'kapitalPerSecond', value: 100 },
      { type: 'gpsMultiplier', value: 1.1 },
    ],
    phase: 3,
    exclusiveWith: 'fork_kostnad',
  },
  {
    id: 'fork_kostnad',
    name: 'Kostnadsminimering',
    description: 'VÄLJ EN: Skippa certifieringen. Hugga snabbare, billigare, mer. Skogen ser likadan ut inifrån kontoret.',
    tree: 'Strategi',
    icon: '💰',
    baseCost: 100_000,
    costResource: 'kapital',
    production: 0,
    maxCount: 1,
    effects: [
      { type: 'gpsMultiplier', value: 1.25 },
    ],
    phase: 3,
    exclusiveWith: 'fork_hallbarhet',
  },

  // ═══ Fork 2: Phase 5 — Multinational vs National Dominance ═══
  {
    id: 'fork_multinationell',
    name: 'Multinationell Expansion',
    description: 'VÄLJ EN: Bred internationell strategi. Era kontor i 15 länder gör invasioner billigare.',
    tree: 'Strategi',
    icon: '🌐',
    baseCost: 2_000_000,
    costResource: 'kapital',
    production: 0,
    maxCount: 1,
    effects: [
      { type: 'kapitalPerSecond', value: 500 },
    ],
    phase: 5,
    prerequisites: ['fork_hallbarhet', 'fork_kostnad'], // requires EITHER fork from phase 3
    exclusiveWith: 'fork_nationell',
  },
  {
    id: 'fork_nationell',
    name: 'Nationell Dominans',
    description: 'VÄLJ EN: Total kontroll över Sverige först. Varje svensk generator producerar 30% mer.',
    tree: 'Strategi',
    icon: '🇸🇪',
    baseCost: 2_000_000,
    costResource: 'kapital',
    production: 0,
    maxCount: 1,
    effects: [
      { type: 'gpsMultiplier', value: 1.30 },
    ],
    phase: 5,
    prerequisites: ['fork_hallbarhet', 'fork_kostnad'], // requires EITHER fork from phase 3
    exclusiveWith: 'fork_multinationell',
  },

  // ═══ Fork 3: Phase 8 — Diplomatic vs Military Expansion ═══
  {
    id: 'fork_diplomatisk',
    name: 'Diplomatisk Expansion',
    description: 'VÄLJ EN: Förhandla, muta, övertyga. Invasioner kräver mindre kapital.',
    tree: 'Strategi',
    icon: '🕊️',
    baseCost: 50_000_000,
    costResource: 'kapital',
    production: 0,
    maxCount: 1,
    effects: [
      { type: 'kapitalPerSecond', value: 5_000 },
      { type: 'gpsMultiplier', value: 1.15 },
    ],
    phase: 8,
    exclusiveWith: 'fork_militar',
  },
  {
    id: 'fork_militar',
    name: 'Aggressiv Expansion',
    description: 'VÄLJ EN: Lobby, tryck, tvång. Invasioner kräver mindre politiskt kapital.',
    tree: 'Strategi',
    icon: '⚔️',
    baseCost: 50_000_000,
    costResource: 'kapital',
    production: 0,
    maxCount: 1,
    effects: [
      { type: 'gpsMultiplier', value: 1.20 },
    ],
    phase: 8,
    exclusiveWith: 'fork_diplomatisk',
  },
]
