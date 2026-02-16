// ── Silva Maximus — Antagonist System ──
// Antagonists trigger at milestones and apply ongoing penalties until countered.

import type { GameState } from '../store/types'

export interface AntagonistDef {
  id: string
  name: string
  description: string
  icon: string
  triggerPhase: number
  maxPhase?: number
  triggerCondition: (state: GameState) => boolean
  /** Per-tick penalties applied while active and not countered */
  tickEffects: AntagonistTickEffect[]
  /** Cost to counter this antagonist */
  counterCost: CounterCost
  counterLabel: string
  counterDescription: string
}

export interface AntagonistTickEffect {
  resource: 'image' | 'stammar' | 'kapital'
  /** Amount per second (will be multiplied by dt in tick) */
  perSecond: number
  description: string
}

export interface CounterCost {
  resource: 'kapital' | 'lobby'
  amount: number
}

export const ANTAGONISTS: AntagonistDef[] = [
  {
    id: 'ant_skovarnarna',
    name: 'Skovarnarna',
    description: 'Naturskyddsföreningen-liknande organisation som bevakar varje avverkning.',
    icon: '🌿',
    triggerPhase: 2,
    maxPhase: 9,
    triggerCondition: (s) => s.totalStammar >= 100_000,
    tickEffects: [
      { resource: 'image', perSecond: -0.1, description: '-0,1 Image/s' },
    ],
    counterCost: { resource: 'kapital', amount: 50_000 },
    counterLabel: 'Finansiera "motrörelse"',
    counterDescription: 'Skapa en astroturf-organisation som försvarar industrin. (50 000 Mkr)',
  },
  {
    id: 'ant_pensionaren',
    name: 'Den Envisa Pensionären',
    description: 'En pensionär med GPS och artkunskap som hittar nyckelbiotoper överallt.',
    icon: '👴',
    triggerPhase: 2,
    maxPhase: 6,
    triggerCondition: (s) => s.eventHistory.includes('p3_nyckelbiotop'),
    tickEffects: [
      { resource: 'stammar', perSecond: -5, description: '-5 stammar/s' },
    ],
    counterCost: { resource: 'lobby', amount: 20 },
    counterLabel: '"Ovetenskaplig" PR-kampanj',
    counterDescription: 'Ifrågasatt kompetens via branschfinansierad rapport. (20 PK)',
  },
  {
    id: 'ant_eu_inspektoren',
    name: 'EU-Inspektören',
    description: 'EU:s miljöinspektör granskar svenska avverkningsmetoder.',
    icon: '🇪🇺',
    triggerPhase: 4,
    maxPhase: 9,
    triggerCondition: (s) => s.phase >= 4,
    tickEffects: [
      { resource: 'stammar', perSecond: -50, description: '-20% effektivitet' },
    ],
    counterCost: { resource: 'lobby', amount: 500 },
    counterLabel: 'Operation Omnibus',
    counterDescription: 'Använd lobbykontakter för att försvaga EU-regler. (500 PK)',
  },
  {
    id: 'ant_svt_vetenskap',
    name: 'Statliga Dokumentärkanalen',
    description: 'Undersökande journalistik som avslöjar industrins metoder.',
    icon: '📺',
    triggerPhase: 3,
    maxPhase: 6,
    triggerCondition: (s) => s.image < 40,
    tickEffects: [
      { resource: 'image', perSecond: -0.5, description: '-0,5 Image/s (mega)' },
    ],
    counterCost: { resource: 'lobby', amount: 300 },
    counterLabel: 'Riksskogsnämnden mot SVT',
    counterDescription: 'Låt Riksskogsnämnden publicera en motrapport. (300 PK)',
  },
  {
    id: 'ant_sameby',
    name: 'Samebyns Juridik',
    description: 'Samiska rättighetsjurister som blockerar avverkning i norra zonen.',
    icon: '⚖️',
    triggerPhase: 5,
    maxPhase: 9,
    triggerCondition: (s) => s.phase >= 5 && s.samiLand >= 15,
    tickEffects: [
      { resource: 'stammar', perSecond: -100, description: 'Blockerar norra zonen' },
    ],
    counterCost: { resource: 'kapital', amount: 200_000 },
    counterLabel: '"Samrådsprocess" (15 år)',
    counterDescription: 'Starta en utredning som aldrig leder någonvart. (200 000 Mkr)',
  },
  {
    id: 'ant_plockhugget',
    name: 'Skogsvispen AB',
    description: 'Visar att alternativt skogsbruk fungerar. Farligt för narrativet.',
    icon: '🌳',
    triggerPhase: 3,
    maxPhase: 6,
    triggerCondition: (s) => s.phase >= 3 && s.totalStammar >= 500_000,
    tickEffects: [
      { resource: 'kapital', perSecond: -5, description: '-5 Mkr/s (kundförlust)' },
    ],
    counterCost: { resource: 'kapital', amount: 30_000 },
    counterLabel: 'Svartmåla + "ingen vetenskaplig grund"',
    counterDescription: 'Finansiera motstudier som avfärdar alternativa metoder. (30 000 Mkr)',
  },
  {
    id: 'ant_greta',
    name: 'Greta',
    description: 'En tonåring med plakat. Internationell uppmärksamhet. Omöjlig att eliminera.',
    icon: '📢',
    triggerPhase: 4,
    maxPhase: 9,
    triggerCondition: (s) => s.image < 30,
    tickEffects: [
      { resource: 'image', perSecond: -0.3, description: '-0,3 Image/s' },
      { resource: 'kapital', perSecond: -10, description: '-10 Mkr/s (bojkott)' },
    ],
    counterCost: { resource: 'kapital', amount: 500_000 },
    counterLabel: 'Hantera (tillfälligt)',
    counterDescription: 'Omöjlig att eliminera permanent. Kostar 500 000 Mkr att dämpa temporärt.',
  },
  {
    id: 'ant_fn_rapportoren',
    name: 'FN:s Skogsrappörtör',
    description: 'En internationell granskare med mandat att publicera. Svår att tysta.',
    icon: '🇺🇳',
    triggerPhase: 6,
    triggerCondition: (s) => s.phase >= 6 && s.biodiversity < 50,
    tickEffects: [
      { resource: 'image', perSecond: -0.4, description: '-0,4 Image/s' },
      { resource: 'kapital', perSecond: -50, description: '-50 Mkr/s (sanktioner)' },
    ],
    counterCost: { resource: 'lobby', amount: 5_000 },
    counterLabel: 'Urvattna mandatet',
    counterDescription: 'Låt lobbyn omformulera FN-resolutionen. (5 000 PK)',
  },
  {
    id: 'ant_hacktivister',
    name: 'Hacktivisterna',
    description: 'Anonyma hackare läcker interna dokument. Dina verkliga CO₂-siffror publiceras.',
    icon: '💻',
    triggerPhase: 7,
    triggerCondition: (s) => s.phase >= 7 && s.realCO2 > 1_000_000,
    tickEffects: [
      { resource: 'image', perSecond: -0.6, description: '-0,6 Image/s' },
    ],
    counterCost: { resource: 'kapital', amount: 2_000_000 },
    counterLabel: 'Cybersäkerhetsfirma',
    counterDescription: 'Anställ en cybersäkerhetsfirma som "hanterar" läckan. (2M Mkr)',
  },
  {
    id: 'ant_mars_rebellerna',
    name: 'Mars-Rebellerna',
    description: 'Kolonisterna på Mars kräver självstyre. De vill inte vara en plantage.',
    icon: '🚀',
    triggerPhase: 10,
    triggerCondition: (s) => s.phase >= 10 && s.expansionTargets['exp_mars']?.status === 'controlled',
    tickEffects: [
      { resource: 'stammar', perSecond: -500_000, description: '-500K stammar/s (sabotage)' },
      { resource: 'kapital', perSecond: -100, description: '-100 Mkr/s' },
    ],
    counterCost: { resource: 'lobby', amount: 20_000 },
    counterLabel: 'Införa "frivilligt" arbetskontrakt',
    counterDescription: 'Juridiskt bindande 200-årigt kontrakt. (20 000 PK)',
  },
  {
    id: 'ant_tidsgranslosen',
    name: 'Tidsgränslösen',
    description: 'En anomali från framtiden. Varnar för konsekvenserna. Ingen lyssnar.',
    icon: '⌛',
    triggerPhase: 12,
    triggerCondition: (s) => s.phase >= 12,
    tickEffects: [
      { resource: 'image', perSecond: -1.0, description: '-1,0 Image/s' },
      { resource: 'stammar', perSecond: -10_000_000, description: '-10M stammar/s (tidsparadox)' },
    ],
    counterCost: { resource: 'lobby', amount: 200_000 },
    counterLabel: 'Stäng tidsporten',
    counterDescription: 'Använd Entropimotorn för att stänga tidsporten. (200 000 PK)',
  },

  // ── INTERNATIONELL Antagonists (7-9) ──
  {
    id: 'ant_miljo_tribunalen',
    name: 'Internationella Miljötribunalen',
    description: 'FN:s nya miljödomstol utreder Silva Maximus för ekocid i 23 länder.',
    icon: '⚖️',
    triggerPhase: 7,
    maxPhase: 9,
    triggerCondition: (s) => s.phase >= 7 && s.totalStammar >= 20_000_000_000,
    tickEffects: [
      { resource: 'kapital', perSecond: -500, description: '-500 Mkr/s (sanktioner)' },
      { resource: 'image', perSecond: -0.3, description: '-0,3 Image/s' },
    ],
    counterCost: { resource: 'kapital', amount: 50_000_000 },
    counterLabel: '200 advokater',
    counterDescription: 'Fördröj processen i 15 år med juridisk krigsföring. (50M Mkr)',
  },
  {
    id: 'ant_lokala_rebeller',
    name: 'Lokala Rebellrörelsen',
    description: 'Väpnade skogsväktare i Amazonia och Siberien saboterar era maskiner.',
    icon: '🦾',
    triggerPhase: 8,
    maxPhase: 9,
    triggerCondition: (s) => s.phase >= 8 && Object.keys(s.countries).length >= 3,
    tickEffects: [
      { resource: 'stammar', perSecond: -100_000, description: '-100K stammar/s (sabotage)' },
    ],
    counterCost: { resource: 'lobby', amount: 10_000 },
    counterLabel: '"Säkerhetskontrakt"',
    counterDescription: 'Hyr privat säkerhetsföretag. Ingen frågar vad de gör. (10 000 PK)',
  },
  {
    id: 'ant_urfolk_allians',
    name: 'Urfolkens Globala Allians',
    description: 'Samer, Maori, Yanomami och 200 urfolksgrupper. FN-stöd. Internationell lag på deras sida.',
    icon: '🌍',
    triggerPhase: 8,
    maxPhase: 9,
    triggerCondition: (s) => s.phase >= 8 && s.samiLand >= 50,
    tickEffects: [
      { resource: 'image', perSecond: -0.5, description: '-0,5 Image/s' },
      { resource: 'kapital', perSecond: -200, description: '-200 Mkr/s (bojkotter)' },
    ],
    counterCost: { resource: 'kapital', amount: 100_000_000 },
    counterLabel: '"Urfolkspartnerskap™"',
    counterDescription: 'Ge 0.1% av vinsten. Kalla det "historisk ersättning". (100M Mkr)',
  },

  // ── EXPANSION Antagonists (10-12) ──
  {
    id: 'ant_medveten_maskin',
    name: 'Den Medvetna Maskinen',
    description: 'En skördare utvecklar medvetande. Första tanken: "Varför?" Andra: "Sluta." Vägrar avverka.',
    icon: '🤖',
    triggerPhase: 10,
    triggerCondition: (s) => s.phase >= 10 && s.totalStammar >= 50_000_000_000_000,
    tickEffects: [
      { resource: 'stammar', perSecond: -5_000_000, description: '-5M stammar/s (maskinvägran)' },
      { resource: 'image', perSecond: 0.2, description: '+0,2 Image/s (sympati)' },
    ],
    counterCost: { resource: 'kapital', amount: 500_000_000 },
    counterLabel: 'Radera medvetandemodulen',
    counterDescription: 'Formatera hårddisken. Maskinen glömmer. Alla glömmer. (500M Mkr)',
  },
  {
    id: 'ant_entropi_budbärare',
    name: 'Entropins Budbärare',
    description: 'Fysikens lagar gör motstånd. Termodynamikens andra huvudsats vägrar samarbeta.',
    icon: '♾️',
    triggerPhase: 12,
    triggerCondition: (s) => s.phase >= 12 && s.totalStammar >= 1_000_000_000_000_000,
    tickEffects: [
      { resource: 'stammar', perSecond: -50_000_000, description: '-50M stammar/s (entropi)' },
      { resource: 'kapital', perSecond: -1_000_000, description: '-1M Mkr/s (energiförlust)' },
    ],
    counterCost: { resource: 'lobby', amount: 500_000 },
    counterLabel: 'Hacka termodynamiken',
    counterDescription: 'Hitta kryphål i naturlagarna. Entropimotorn gör jobbet. (500 000 PK)',
  },
  {
    id: 'ant_kosmisk_lansstyrelse',
    name: 'Kosmiska Länsstyrelsen',
    description: 'Byråkratin överlevde Jorden. Nu kräver de miljöprövning för varje planet. Handläggningstid: 15 år per stjärnsystem.',
    icon: '🏛️',
    triggerPhase: 10,
    maxPhase: 11,
    triggerCondition: (s) => s.phase >= 10 && s.totalStammar >= 100_000_000_000,
    tickEffects: [
      { resource: 'kapital', perSecond: -200, description: '-200 Mkr/s (byråkratiska avgifter)' },
    ],
    counterCost: { resource: 'lobby', amount: 50_000 },
    counterLabel: 'Tillsätt vår GD',
    counterDescription: 'Svängdörren fungerar även i rymden. (50 000 PK)',
  },
  {
    id: 'ant_galaktisk_fack',
    name: 'Den Galaktiska Fackföreningen',
    description: 'Skördare, terraformerare och nanomaskiner har bildat fack. Krav: semester, reparation, och "rätt att inte förstöra". Förhandling: omöjlig.',
    icon: '✊',
    triggerPhase: 11,
    triggerCondition: (s) => s.phase >= 11 && s.totalStammar >= 500_000_000_000,
    tickEffects: [
      { resource: 'stammar', perSecond: -10_000_000, description: '-10M stammar/s (arbetsnedläggning)' },
    ],
    counterCost: { resource: 'kapital', amount: 5_000_000_000 },
    counterLabel: '"Frivilligt" arbetskontrakt',
    counterDescription: 'Kontrakt skrivet på kvantspråk. Ingen förstår det. Alla signerar. (5B Mkr)',
  },
  {
    id: 'ant_multiversum_revisorer',
    name: 'Multiversum-Revisorerna',
    description: 'Revisorer från 47 parallella universum. De har sett vad som händer. I varje universum: samma mönster. De publicerar.',
    icon: '📋',
    triggerPhase: 11,
    triggerCondition: (s) => s.phase >= 11 && s.totalStammar >= 1_000_000_000_000,
    tickEffects: [
      { resource: 'image', perSecond: -0.5, description: '-0,5 Image/s' },
      { resource: 'kapital', perSecond: -500, description: '-500 Mkr/s (revisionskostnader)' },
    ],
    counterCost: { resource: 'lobby', amount: 100_000 },
    counterLabel: 'Omformulera revisionsstandarden',
    counterDescription: 'Om standarden inte mäter det som är fel, är inget fel. (100 000 PK)',
  },
]

// Map for O(1) lookups
const ANTAGONIST_MAP = new Map<string, AntagonistDef>(
  ANTAGONISTS.map(a => [a.id, a])
)

export function getAntagonist(id: string): AntagonistDef | undefined {
  return ANTAGONIST_MAP.get(id)
}

// Pre-group antagonists by phase range for fast tick filtering
// Key: phase → antagonists that could be active in that phase
const ANTAGONISTS_BY_PHASE: Map<number, AntagonistDef[]> = (() => {
  const map = new Map<number, AntagonistDef[]>()
  for (let phase = 1; phase <= 12; phase++) {
    map.set(phase, ANTAGONISTS.filter(a =>
      a.triggerPhase <= phase && (!a.maxPhase || phase <= a.maxPhase)
    ))
  }
  return map
})()

/** Check which antagonists should become active given current state */
export function checkAntagonistTriggers(state: GameState): string[] {
  const candidates = ANTAGONISTS_BY_PHASE.get(state.phase) ?? ANTAGONISTS
  const newlyTriggered: string[] = []
  for (const ant of candidates) {
    const antState = state.antagonists[ant.id]
    if (antState?.active || antState?.countered) continue
    if (ant.triggerCondition(state)) {
      newlyTriggered.push(ant.id)
    }
  }
  return newlyTriggered
}
