// ── Silva Maximus — Owner Knowledge Tree ──
// 20 upgrades across 4 categories, costing kunskap

export type KnowledgeCategory = 'ekologisk' | 'skoglig' | 'ekonomisk' | 'samhallelig'

export interface OwnerKnowledgeEffect {
  type: 'svPerClickMult' | 'svPerSecondMult' | 'inkomstMult' | 'biodivRate'
       | 'resiliensRate' | 'legacyRate' | 'attackResistance' | 'lureCostReduction'
  value: number
}

export interface OwnerKnowledgeUpgrade {
  id: string
  name: string
  description: string
  category: KnowledgeCategory
  icon: string
  cost: number              // kunskap cost
  prerequisites: string[]   // other upgrade IDs
  effects: OwnerKnowledgeEffect[]
  svRequired?: number       // minimum totalSkogsvardering to purchase
}

export const KNOWLEDGE_CATEGORIES: { id: KnowledgeCategory; name: string; icon: string }[] = [
  { id: 'ekologisk', name: 'Ekologisk förståelse', icon: '🌿' },
  { id: 'skoglig', name: 'Skoglig praxis', icon: '🪓' },
  { id: 'ekonomisk', name: 'Ekonomiskt oberoende', icon: '💰' },
  { id: 'samhallelig', name: 'Samhällspåverkan', icon: '📢' },
]

export const OWNER_KNOWLEDGE_UPGRADES: OwnerKnowledgeUpgrade[] = [
  // ── Ekologisk förståelse (biodiv/resiliens) ──
  {
    id: 'kt_ekosystem',
    name: 'Ekosystemförståelse',
    description: 'Du lär dig att skogen inte är en fabrik. Den är ett system.',
    category: 'ekologisk',
    icon: '🌱',
    cost: 50,
    prerequisites: [],
    effects: [{ type: 'biodivRate', value: 0.1 }],
  },
  {
    id: 'kt_mykoriza',
    name: 'Mykorizan',
    description: 'Svampnätverket under dina fötter kopplar ihop alla träd. "Wood wide web" är inte en metafor.',
    category: 'ekologisk',
    icon: '🍄',
    cost: 100,
    prerequisites: ['kt_ekosystem'],
    effects: [{ type: 'svPerSecondMult', value: 0.15 }],
  },
  {
    id: 'kt_gammelskog',
    name: 'Gammelskogskompetens',
    description: 'Du slutar se döda träd som "skräp". De är hotellrum för 1 000 arter.',
    category: 'ekologisk',
    icon: '🦉',
    cost: 150,
    prerequisites: ['kt_mykoriza'],
    effects: [{ type: 'resiliensRate', value: 0.5 }],
    svRequired: 25_000,
  },
  {
    id: 'kt_vatmark',
    name: 'Våtmarksrestaurering',
    description: 'Du öppnar dikena. Vattnet stannar. Grodorna kommer tillbaka.',
    category: 'ekologisk',
    icon: '🐸',
    cost: 200,
    prerequisites: ['kt_gammelskog'],
    effects: [
      { type: 'biodivRate', value: 0.3 },
      { type: 'resiliensRate', value: 0.2 },
    ],
    svRequired: 60_000,
  },
  {
    id: 'kt_ekosystem_master',
    name: 'Ekologisk mästare',
    description: 'Din skog har fler arter per hektar än nationalparken bredvid. Skogsstyrelsen skickar gratulationsbrev. Sedan en avverkningsanmälan.',
    category: 'ekologisk',
    icon: '🏆',
    cost: 400,
    prerequisites: ['kt_vatmark'],
    effects: [{ type: 'biodivRate', value: 0.5 }],
    svRequired: 120_000,
  },

  // ── Skoglig praxis (sv production) ──
  {
    id: 'kt_plockhugga',
    name: 'Plockhuggning',
    description: 'Ta ett träd. Lämna tio. Industrin kallar det "ineffektivt". Du kallar det "skogsbruk".',
    category: 'skoglig',
    icon: '🪚',
    cost: 40,
    prerequisites: [],
    effects: [{ type: 'svPerClickMult', value: 0.10 }],
  },
  {
    id: 'kt_naturlig_foryngring',
    name: 'Naturlig föryngring',
    description: 'Du planterar inga träd. De planterar sig själva. Gratis.',
    category: 'skoglig',
    icon: '🌱',
    cost: 80,
    prerequisites: ['kt_plockhugga'],
    effects: [{ type: 'svPerSecondMult', value: 0.20 }],
  },
  {
    id: 'kt_timmer_kvalitet',
    name: 'Virkeskvalitet',
    description: 'Ditt virke har täta årsringar. Snickaren betalar 3× massapris. Industrin fattar inte varför.',
    category: 'skoglig',
    icon: '🪵',
    cost: 120,
    prerequisites: ['kt_naturlig_foryngring'],
    effects: [{ type: 'inkomstMult', value: 0.25 }],
    svRequired: 25_000,
  },
  {
    id: 'kt_agroforestry',
    name: 'Agroforestry',
    description: 'Svamp, bär, örter, honung — allt mellan träden. Industrin ser bara virke. Du ser ett ekosystem med kassaflöde.',
    category: 'skoglig',
    icon: '🍯',
    cost: 200,
    prerequisites: ['kt_timmer_kvalitet'],
    effects: [{ type: 'svPerSecondMult', value: 0.30 }],
    svRequired: 60_000,
  },
  {
    id: 'kt_skoglig_master',
    name: 'Skoglig mästare',
    description: 'SLU publicerar en studie om din skog. Konklusion: "Plockhuggning ger likvärdig avkastning." Industrin: "Metodologiska brister."',
    category: 'skoglig',
    icon: '🏅',
    cost: 350,
    prerequisites: ['kt_agroforestry'],
    effects: [
      { type: 'svPerClickMult', value: 0.20 },
      { type: 'svPerSecondMult', value: 0.25 },
    ],
    svRequired: 120_000,
  },

  // ── Ekonomiskt oberoende (inkomst/resistance) ──
  {
    id: 'kt_direkt_forsaljning',
    name: 'Direktförsäljning',
    description: 'Du säljer till snickare istället för massa. Inga mellanhänder. Inga "gratisplaner".',
    category: 'ekonomisk',
    icon: '🤝',
    cost: 60,
    prerequisites: [],
    effects: [{ type: 'inkomstMult', value: 0.15 }],
  },
  {
    id: 'kt_kooperativ_grund',
    name: 'Kooperativ grund',
    description: 'Fem grannar bildar kooperativ. Ni sätter priset. Inte bolaget.',
    category: 'ekonomisk',
    icon: '👥',
    cost: 100,
    prerequisites: ['kt_direkt_forsaljning'],
    effects: [{ type: 'inkomstMult', value: 0.20 }],
  },
  {
    id: 'kt_juridisk_kunskap',
    name: 'Juridisk kunskap',
    description: 'Du läser miljöbalken. Du överklagnar. Du vinner. Inspektören slutar ringa.',
    category: 'ekonomisk',
    icon: '⚖️',
    cost: 150,
    prerequisites: ['kt_kooperativ_grund'],
    effects: [{ type: 'attackResistance', value: 0.25 }],
    svRequired: 25_000,
  },
  {
    id: 'kt_ekonomisk_resiliens',
    name: 'Ekonomisk resiliens',
    description: 'Kina dumpar massa. Dina grannar panikringner. Du dricker kaffe. Ditt virke säljs till möbelsnickare.',
    category: 'ekonomisk',
    icon: '🛡️',
    cost: 250,
    prerequisites: ['kt_juridisk_kunskap'],
    effects: [{ type: 'lureCostReduction', value: 0.50 }],
    svRequired: 60_000,
  },
  {
    id: 'kt_ekonomi_master',
    name: 'Ekonomisk mästare',
    description: 'Du tjänar mer per hektar än grannen som kalavverkade. Med en tiondel av arbetsinsatsen.',
    category: 'ekonomisk',
    icon: '💎',
    cost: 400,
    prerequisites: ['kt_ekonomisk_resiliens'],
    effects: [{ type: 'inkomstMult', value: 0.50 }],
    svRequired: 120_000,
  },

  // ── Samhällspåverkan (legacy/political) ──
  {
    id: 'kt_lokal_opinion',
    name: 'Lokal opinion',
    description: 'Du visar grannen din skog. Hans plantage ser plötsligt ut som en parkeringsplats.',
    category: 'samhallelig',
    icon: '🗣️',
    cost: 25,
    prerequisites: [],
    effects: [{ type: 'legacyRate', value: 0.2 }],
  },
  {
    id: 'kt_media_kontakter',
    name: 'Mediakontakter',
    description: 'Lokaltidningen skriver om dig. "Skogsägare vägrar kalavverka." Rubriken går viralt.',
    category: 'samhallelig',
    icon: '📰',
    cost: 100,
    prerequisites: ['kt_lokal_opinion'],
    effects: [{ type: 'legacyRate', value: 0.5 }],
  },
  {
    id: 'kt_kommunpolitik',
    name: 'Kommunpolitik',
    description: 'Kommunen ändrar översiktsplanen. "Plockhuggning rekommenderas." Industrins lobbyist ringer. Du svarar inte.',
    category: 'samhallelig',
    icon: '🏛️',
    cost: 180,
    prerequisites: ['kt_media_kontakter'],
    effects: [{ type: 'legacyRate', value: 1.0 }],
    svRequired: 25_000,
  },
  {
    id: 'kt_riksdagskontakt',
    name: 'Riksdagskontakt',
    description: 'En riksdagsledamot besöker din skog. Ställer frågor. Tar bilder. Nästa vecka: interpellation om skogsbruksmetoder.',
    category: 'samhallelig',
    icon: '🇸🇪',
    cost: 300,
    prerequisites: ['kt_kommunpolitik'],
    effects: [{ type: 'legacyRate', value: 2.0 }],
    svRequired: 60_000,
  },
  {
    id: 'kt_samhall_master',
    name: 'Samhällsmästare',
    description: 'DN Debatt: "Dags att ompröva det svenska skogsbruket." Din budget: en termos kaffe och en kikare. Industrins budget: 200 miljoner.',
    category: 'samhallelig',
    icon: '🌟',
    cost: 500,
    prerequisites: ['kt_riksdagskontakt'],
    effects: [{ type: 'legacyRate', value: 3.0 }],
    svRequired: 120_000,
  },
]

// Map for O(1) lookups
const KNOWLEDGE_UPGRADE_MAP = new Map<string, OwnerKnowledgeUpgrade>(
  OWNER_KNOWLEDGE_UPGRADES.map(u => [u.id, u])
)

export function getOwnerKnowledgeUpgrade(id: string): OwnerKnowledgeUpgrade | undefined {
  return KNOWLEDGE_UPGRADE_MAP.get(id)
}

export function getUpgradesByCategory(category: KnowledgeCategory): OwnerKnowledgeUpgrade[] {
  return OWNER_KNOWLEDGE_UPGRADES.filter(u => u.category === category)
}

/** Compute aggregate modifiers from purchased knowledge upgrades */
export interface KnowledgeModifiers {
  svPerClickMult: number    // additive bonuses to sv/click (e.g., 0.10 = +10%)
  svPerSecondMult: number   // additive bonuses to sv/s
  inkomstMult: number       // additive bonuses to inkomst/s
  biodivRate: number        // flat biodiv/s bonus
  resiliensRate: number     // flat resiliens/s bonus
  legacyRate: number        // flat legacy/s bonus
  attackResistance: number  // reduction to kunskapRequired (e.g., 0.25 = -25%)
  lureCostReduction: number // reduction to lure decline cost (e.g., 0.50 = -50%)
}

export function computeKnowledgeModifiers(upgrades: Record<string, boolean>): KnowledgeModifiers {
  const mods: KnowledgeModifiers = {
    svPerClickMult: 0,
    svPerSecondMult: 0,
    inkomstMult: 0,
    biodivRate: 0,
    resiliensRate: 0,
    legacyRate: 0,
    attackResistance: 0,
    lureCostReduction: 0,
  }

  for (const upgrade of OWNER_KNOWLEDGE_UPGRADES) {
    if (!upgrades[upgrade.id]) continue
    for (const effect of upgrade.effects) {
      mods[effect.type] += effect.value
    }
  }

  return mods
}
