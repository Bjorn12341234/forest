// ── Silva Maximus — Owner Knowledge Activities ──
// Spend inkomst → earn kunskap

export interface KnowledgeActivityData {
  id: string
  name: string
  description: string
  cost: number         // inkomst cost (0 = free)
  kunskapReward: number
  icon: string
  unlockKunskap: number // kunskap required to unlock this activity
}

export const KNOWLEDGE_ACTIVITIES: KnowledgeActivityData[] = [
  {
    id: 'know_maktutredning',
    name: 'Läs Skogsstyrelsens maktutredning',
    description: 'Dina ögon öppnas. Du läser om svängdörrarna. Du förstår varför "gratisplanen" var gratis.',
    cost: 25,
    kunskapReward: 10,
    icon: '📜',
    unlockKunskap: 0,
  },
  {
    id: 'know_markberedning',
    name: 'Studera markberedningens effekter',
    description: 'Du lär dig att markberedning släpper ut mer kol än vad de nya plantorna binder på 30 år.',
    cost: 500,
    kunskapReward: 15,
    icon: '📐',
    unlockKunskap: 25,
  },
  {
    id: 'know_gammelskog',
    name: 'Besök gammelskog',
    description: 'Du ser en skog som ingen rört på 200 år. Du gråter lite. Det är okej.',
    cost: 1_500,
    kunskapReward: 25,
    icon: '🌳',
    unlockKunskap: 50,
  },
  {
    id: 'know_plockhugget',
    name: 'Gå Plockhugget-kurs',
    description: 'De tar betalt. Industrin skickar inspektörer gratis. Nu förstår du varför.',
    cost: 3_000,
    kunskapReward: 40,
    icon: '🌲',
    unlockKunskap: 100,
  },
  {
    id: 'know_artinventering',
    name: 'Artinventering med biolog',
    description: 'Du har 47 arter av lavar. Grannen som kalavverkade har 3.',
    cost: 5_000,
    kunskapReward: 60,
    icon: '🦞',
    unlockKunskap: 200,
  },
]

// Passive bonuses at knowledge thresholds
export interface KnowledgeThreshold {
  level: number
  label: string
  description: string
}

export const KNOWLEDGE_THRESHOLDS: KnowledgeThreshold[] = [
  { level: 25, label: 'Genomskådar gratisplaner', description: 'Du läser planen ordentligt. "Föryngringsavverkning"? Det betyder kalavverkning.' },
  { level: 50, label: 'Genomskådar äganderättskampanjer', description: '"De vill ta din skog!" Vilka "de"? Fågelskådare?' },
  { level: 100, label: 'Kan överklaga avverkningsanmälningar', description: 'Grannens inspektör "missade" nyckelbiotopen. Du överklagade. Du vann.' },
  { level: 200, label: 'Kommunpolitisk påverkan', description: 'Kommunen inför riktlinjer för plockhuggning. Industrins lobbyist ringer. Du svarar inte.' },
  { level: 500, label: 'Nationell debatt', description: 'DN skriver om din skog. "Kan skogsbruk se ut så här?" Ja.' },
  { level: 1_000, label: 'Nationell policy-påverkan', description: 'Riksdagen diskuterar plockhuggning som standard. Din budget: en termos kaffe och en kikare.' },
]

const KNOWLEDGE_ACTIVITY_MAP = new Map<string, KnowledgeActivityData>(
  KNOWLEDGE_ACTIVITIES.map(a => [a.id, a])
)

export function getKnowledgeActivity(id: string): KnowledgeActivityData | undefined {
  return KNOWLEDGE_ACTIVITY_MAP.get(id)
}
