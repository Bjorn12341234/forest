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
    name: 'Battre penna',
    description: 'Montblanc. Viktigt att se serios ut.',
    cost: 50,
    costResource: 'kapital',
    stammarPerClickBonus: 1,
    icon: '🖊️',
  },
  {
    id: 'click_digital',
    name: 'Digital plan',
    description: 'Nu med fargglada kartor. Agaren fattar inget.',
    cost: 200,
    costResource: 'kapital',
    stammarPerClickBonus: 5,
    icon: '💻',
  },
  {
    id: 'click_fabrik',
    name: 'Planfabrik',
    description: 'En plan var tredje sekund. Agarnas namn autogenereras.',
    cost: 1_000,
    costResource: 'kapital',
    stammarPerClickBonus: 20,
    icon: '🏭',
  },
  {
    id: 'click_ai',
    name: 'AI-Planering',
    description: 'Maskininlarning optimerar gallringsintervall. Inga manniskor inblandade.',
    cost: 10_000,
    costResource: 'kapital',
    stammarPerClickBonus: 100,
    icon: '🤖',
  },
]

export function getClickUpgrade(id: string): ClickUpgradeData | undefined {
  return CLICK_UPGRADES.find(u => u.id === id)
}
