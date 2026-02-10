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
    description: 'Plockhugget h\u00e5ller kurs. De tar betalt, till skillnad fr\u00e5n industrin. Men de ljuger inte heller.',
    cost: 500,
    svPerClickBonus: 2,
    bonuses: { kunskap: 5 },
    icon: '\uD83D\uDCD6',
  },
  {
    id: 'oclk_flora',
    name: 'Florabok & kikare',
    description: 'Du b\u00f6rjar se saker du aldrig sett f\u00f6rut. Arter du inte visste fanns.',
    cost: 1_000,
    svPerClickBonus: 5,
    bonuses: { biodiv: 1 },
    icon: '\uD83D\uDD2D',
  },
  {
    id: 'oclk_motorsag',
    name: 'Motorsåg (egen, liten)',
    description: 'Inte en Sk\u00f6rdare. En Husqansen 562. Du v\u00e4ljer varje tr\u00e4d sj\u00e4lv.',
    cost: 2_500,
    svPerClickBonus: 10,
    icon: '\uD83E\uDE93',
  },
  {
    id: 'oclk_biolog',
    name: 'Samarbete med biolog',
    description: 'Hon hittar tre r\u00f6dlistade arter p\u00e5 din mark. Du blir stolt, inte orolig.',
    cost: 5_000,
    svPerClickBonus: 20,
    bonuses: { kunskap: 10 },
    icon: '\uD83E\uDDEC',
  },
  {
    id: 'oclk_mentor',
    name: 'Mentorskap fr\u00e5n gammal skogs\u00e4gare',
    description: 'Han \u00e4r 78. Han brukade sin skog i 50 \u00e5r utan att kalavverka. Skogen ser ut som en katedral.',
    cost: 10_000,
    svPerClickBonus: 50,
    icon: '\uD83E\uDDD3',
  },
]

export function getOwnerClickUpgrade(id: string): OwnerClickUpgradeData | undefined {
  return OWNER_CLICK_UPGRADES.find(u => u.id === id)
}
