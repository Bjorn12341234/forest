// ── Silva Maximus — Owner (Skogsägare) Click Upgrades ──

export interface OwnerClickUpgradeData {
  id: string
  name: string
  description: string
  cost: number             // cost in inkomst
  svPerClickBonus: number  // skogsvardering per click bonus
  bonuses?: {
    kunskap?: number       // one-time kunskap gain
    biodiv?: number        // one-time biodiv gain
  }
  icon: string
}

export const OWNER_CLICK_UPGRADES: OwnerClickUpgradeData[] = [
  {
    id: 'oclk_kurs',
    name: 'Skogskunskapskurs',
    description: 'Plockhugget håller kurs. De tar betalt, till skillnad från industrin. Men de ljuger inte heller.',
    cost: 200,
    svPerClickBonus: 2,
    bonuses: { kunskap: 5 },
    icon: '📖',
  },
  {
    id: 'oclk_flora',
    name: 'Florabok & kikare',
    description: 'Du börjar se saker du aldrig sett förut. Arter du inte visste fanns.',
    cost: 1_000,
    svPerClickBonus: 5,
    bonuses: { biodiv: 1 },
    icon: '🔭',
  },
  {
    id: 'oclk_motorsag',
    name: 'Motorsåg (egen, liten)',
    description: 'Inte en Skördare. En Husqansen 562. Du väljer varje träd själv.',
    cost: 2_500,
    svPerClickBonus: 10,
    icon: '🪓',
  },
  {
    id: 'oclk_biolog',
    name: 'Samarbete med biolog',
    description: 'Hon hittar tre rödlistade arter på din mark. Du blir stolt, inte orolig.',
    cost: 5_000,
    svPerClickBonus: 20,
    bonuses: { kunskap: 10 },
    icon: '🧬',
  },
  {
    id: 'oclk_mentor',
    name: 'Mentorskap från gammal skogsägare',
    description: 'Han är 78. Han brukade sin skog i 50 år utan att kalavverka. Skogen ser ut som en katedral.',
    cost: 10_000,
    svPerClickBonus: 50,
    icon: '🧓',
  },
]

const OWNER_CLICK_UPGRADE_MAP = new Map<string, OwnerClickUpgradeData>(
  OWNER_CLICK_UPGRADES.map(u => [u.id, u])
)

export function getOwnerClickUpgrade(id: string): OwnerClickUpgradeData | undefined {
  return OWNER_CLICK_UPGRADE_MAP.get(id)
}
