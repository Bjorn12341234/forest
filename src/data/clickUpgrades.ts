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
    icon: '🖊️',
  },
  {
    id: 'click_digital',
    name: 'Digital plan',
    description: 'Nu med färgglada kartor. Ägaren fattar inget.',
    cost: 200,
    costResource: 'kapital',
    stammarPerClickBonus: 50,
    icon: '💻',
  },
  {
    id: 'click_fabrik',
    name: 'Planfabrik',
    description: 'En plan var tredje sekund. Ägarnas namn autogenereras.',
    cost: 1_000,
    costResource: 'kapital',
    stammarPerClickBonus: 200,
    icon: '🏭',
  },
  {
    id: 'click_ai',
    name: 'AI-Planering',
    description: 'Maskininlärning optimerar gallringsintervall. Inga människor inblandade.',
    cost: 10_000,
    costResource: 'kapital',
    stammarPerClickBonus: 1000,
    icon: '🤖',
  },
]

const CLICK_UPGRADE_MAP = new Map<string, ClickUpgradeData>(
  CLICK_UPGRADES.map(u => [u.id, u])
)

export function getClickUpgrade(id: string): ClickUpgradeData | undefined {
  return CLICK_UPGRADE_MAP.get(id)
}
