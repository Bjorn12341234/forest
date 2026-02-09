// ── Silva Maximus — Click Multiplier Upgrades ──
// From GDD section 3: Click Mechanic upgrades

export interface ClickUpgradeData {
  id: string
  name: string
  description: string
  cost: number
  costResource: 'kapital'
  stammarPerClickBonus: number
  icon: string
}

export const CLICK_UPGRADES: ClickUpgradeData[] = [
  {
    id: 'click_penna',
    name: 'Bättre penna',
    description: 'Montblanc. Viktigt att se seriös ut.',
    cost: 50,
    costResource: 'kapital',
    stammarPerClickBonus: 1,
    icon: '\ud83d\udd8a\ufe0f',
  },
  {
    id: 'click_digital',
    name: 'Digital plan',
    description: 'Nu med färgglada kartor. Ägaren fattar inget.',
    cost: 200,
    costResource: 'kapital',
    stammarPerClickBonus: 5,
    icon: '\ud83d\udcbb',
  },
  {
    id: 'click_fabrik',
    name: 'Planfabrik',
    description: 'En plan var tredje sekund. Ägarnas namn autogenereras.',
    cost: 1_000,
    costResource: 'kapital',
    stammarPerClickBonus: 20,
    icon: '\ud83c\udfed',
  },
  {
    id: 'click_ai',
    name: 'AI-Planering',
    description: 'Maskininlärning optimerar gallringsintervall. Inga människor inblandade.',
    cost: 10_000,
    costResource: 'kapital',
    stammarPerClickBonus: 100,
    icon: '\ud83e\udd16',
  },
]

export function getClickUpgrade(id: string): ClickUpgradeData | undefined {
  return CLICK_UPGRADES.find(u => u.id === id)
}
