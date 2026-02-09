// ── Silva Maximus — Owner Manipulation Actions ──
// Actions the player can take to manipulate skogsägarförtroende (owner trust)

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
    description: 'Kostnadsfritt! (Värdet av virket vi får: 4,7 Mkr.)',
    costResource: 'kapital',
    cost: 500,
    trustChange: 15,
    sideEffects: [],
    cooldownSeconds: 30,
    icon: '\ud83d\udccb',
  },
  {
    id: 'owner_aganderatt_kampanj',
    name: '"Äganderätten!"-kampanj',
    description: 'VI kämpar för DIN skog! (Mot folk som vill skydda den.)',
    costResource: 'kapital',
    cost: 2_000,
    trustChange: 25,
    sideEffects: [
      { resource: 'image', type: 'add', amount: -5, description: '-5 Image' },
    ],
    cooldownSeconds: 60,
    icon: '\ud83d\udce2',
  },
  {
    id: 'owner_sank_virkespris',
    name: 'Sänk virkespriset',
    description: 'Marknadskrafterna, tyvärr. (Du ÄR marknadskraften.)',
    costResource: 'kapital',
    cost: 0,
    trustChange: -10,
    sideEffects: [
      { resource: 'kapital', type: 'multiply', amount: 1.3, description: '+30% Kapital tillfälligt' },
    ],
    cooldownSeconds: 45,
    icon: '\ud83d\udcc9',
  },
  {
    id: 'owner_hardgallring',
    name: 'Hårdgallring',
    description: 'Du tog de bästa träden och lämnade skrapet. Ägaren ser inte skillnad.',
    costResource: 'kapital',
    cost: 0,
    trustChange: -5,
    sideEffects: [
      { resource: 'stammar', type: 'add', amount: 500, description: '+500 stammar' },
    ],
    cooldownSeconds: 20,
    icon: '\ud83e\ude93',
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
    icon: '\ud83e\udd1d',
  },
]

export const PR_CAMPAIGNS: PRCampaignData[] = [
  {
    id: 'pr_hallbarhetsrapport',
    name: 'Hållbarhetsrapport',
    description: '"Vi planterar fler träd än vi avverkar." (Monokulturer räknas.)',
    cost: 1_000,
    imageGain: 5,
    icon: '\ud83d\udcca',
  },
  {
    id: 'pr_skolbesok',
    name: 'Skolbesök: "Skogen växer!"',
    description: 'Barn får plantera ett träd. Instagram-content i månader.',
    cost: 5_000,
    imageGain: 10,
    icon: '\ud83c\udf31',
  },
  {
    id: 'pr_certifiering',
    name: 'Förnya FSC-certifiering',
    description: 'Certifieringen är meningslös men ser bra ut på förpackningen.',
    cost: 20_000,
    imageGain: 20,
    icon: '\u267b\ufe0f',
  },
  {
    id: 'pr_klimatkampanj',
    name: '"Klimathjältarna"-kampanj',
    description: 'Helsidesannons i DN: "Svensk skog räddar klimatet." Ingen nämner markberedningen.',
    cost: 100_000,
    imageGain: 35,
    icon: '\ud83c\udf0d',
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
