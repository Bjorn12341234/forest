// ── Silva Maximus — Owner Manipulation Actions ──
// Actions the player can take to manipulate skogsagarfortroende (owner trust)

export interface OwnerActionData {
  id: string
  name: string
  description: string
  costResource: 'kapital' | 'lobby'
  cost: number
  trustChange: number       // positive = increase trust, negative = decrease
  sideEffects: OwnerSideEffect[]
  cooldownSeconds: number   // seconds before can be used again
  icon: string
}

export interface OwnerSideEffect {
  resource: 'kapital' | 'stammar' | 'image' | 'lobby'
  type: 'add' | 'multiply'
  amount: number
  description: string
}

export const OWNER_ACTIONS: OwnerActionData[] = [
  {
    id: 'owner_gratis_plan',
    name: 'Gratis skogsbruksplan',
    description: 'Kostnadsfritt! (Vardet av virket vi far: 4,7 Mkr.)',
    costResource: 'kapital',
    cost: 500,
    trustChange: 15,
    sideEffects: [],
    cooldownSeconds: 30,
    icon: '📋',
  },
  {
    id: 'owner_aganderatt_kampanj',
    name: '"Aganderatten!"-kampanj',
    description: 'VI kampar for DIN skog! (Mot folk som vill skydda den.)',
    costResource: 'kapital',
    cost: 2_000,
    trustChange: 25,
    sideEffects: [
      { resource: 'image', type: 'add', amount: -5, description: '-5 Image' },
    ],
    cooldownSeconds: 60,
    icon: '📢',
  },
  {
    id: 'owner_sank_virkespris',
    name: 'Sank virkespriset',
    description: 'Marknadskrafterna, tyvarr. (Du AR marknadskraften.)',
    costResource: 'kapital',
    cost: 0,
    trustChange: -10,
    sideEffects: [
      { resource: 'kapital', type: 'multiply', amount: 1.3, description: '+30% Kapital tillfallgt' },
    ],
    cooldownSeconds: 45,
    icon: '📉',
  },
  {
    id: 'owner_hardgallring',
    name: 'Hardgallring',
    description: 'Du tog de basta traden och lamnade skrapet. Agaren ser inte skillnad.',
    costResource: 'kapital',
    cost: 0,
    trustChange: -5,
    sideEffects: [
      { resource: 'stammar', type: 'add', amount: 500, description: '+500 stammar' },
    ],
    cooldownSeconds: 20,
    icon: '🪓',
  },
  {
    id: 'owner_partnerskap',
    name: '"Partnerskap"',
    description: 'Ett handslag. En kopp kaffe. 500 hektar.',
    costResource: 'kapital',
    cost: 5_000,
    trustChange: 20,
    sideEffects: [
      { resource: 'stammar', type: 'add', amount: 1_000, description: '+1 000 stammar' },
    ],
    cooldownSeconds: 90,
    icon: '🤝',
  },
]

export const PR_CAMPAIGNS: PRCampaignData[] = [
  {
    id: 'pr_hallbarhetsrapport',
    name: 'Hallbarhetsrapport',
    description: '"Vi planterar fler trad an vi avverkar." (Monokulturer raknas.)',
    cost: 1_000,
    imageGain: 5,
    icon: '📊',
  },
  {
    id: 'pr_skolbesok',
    name: 'Skolbesok: "Skogen vaxer!"',
    description: 'Barn far plantera ett trad. Instagram-content i manader.',
    cost: 5_000,
    imageGain: 10,
    icon: '🌱',
  },
  {
    id: 'pr_certifiering',
    name: 'Fornya FSC-certifiering',
    description: 'Certifieringen ar meningslos men ser bra ut pa forpackningen.',
    cost: 20_000,
    imageGain: 20,
    icon: '♻️',
  },
  {
    id: 'pr_klimatkampanj',
    name: '"Klimathjaltarna"-kampanj',
    description: 'Helsidesannons i DN: "Svensk skog raddar klimatet." Ingen namner markberedningen.',
    cost: 100_000,
    imageGain: 35,
    icon: '🌍',
  },
]

export interface PRCampaignData {
  id: string
  name: string
  description: string
  cost: number         // Kapital cost
  imageGain: number
  icon: string
}

export function getOwnerAction(id: string): OwnerActionData | undefined {
  return OWNER_ACTIONS.find(a => a.id === id)
}

export function getPRCampaign(id: string): PRCampaignData | undefined {
  return PR_CAMPAIGNS.find(c => c.id === id)
}
