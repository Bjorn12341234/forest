// ── Silva Maximus — Antagonist System ──
// Antagonists trigger at milestones and apply ongoing penalties until countered.

import type { GameState } from '../store/types'

export interface AntagonistDef {
  id: string
  name: string
  description: string
  icon: string
  triggerPhase: number
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
    icon: '\ud83c\udf3f',
    triggerPhase: 2,
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
    icon: '\ud83d\udc74',
    triggerPhase: 2,
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
    icon: '\ud83c\uddea\ud83c\uddfa',
    triggerPhase: 4,
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
    icon: '\ud83d\udcfa',
    triggerPhase: 3,
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
    icon: '\u2696\ufe0f',
    triggerPhase: 5,
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
    icon: '\ud83c\udf33',
    triggerPhase: 3,
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
    description: 'En ton\u00e5ring med plakat. Internationell uppm\u00e4rksamhet. Om\u00f6jlig att eliminera.',
    icon: '\ud83d\udce2',
    triggerPhase: 4,
    triggerCondition: (s) => s.image < 30,
    tickEffects: [
      { resource: 'image', perSecond: -0.3, description: '-0,3 Image/s' },
      { resource: 'kapital', perSecond: -10, description: '-10 Mkr/s (bojkott)' },
    ],
    counterCost: { resource: 'kapital', amount: 500_000 },
    counterLabel: 'Hantera (tillf\u00e4lligt)',
    counterDescription: 'Om\u00f6jlig att eliminera permanent. Kostar 500 000 Mkr att d\u00e4mpa tempor\u00e4rt.',
  },
  {
    id: 'ant_fn_rapportoren',
    name: 'FN:s Skogsrappört\u00f6r',
    description: 'En internationell granskare med mandat att publicera. Sv\u00e5r att tysta.',
    icon: '\ud83c\uddfa\ud83c\uddf3',
    triggerPhase: 6,
    triggerCondition: (s) => s.phase >= 6 && s.biodiversity < 50,
    tickEffects: [
      { resource: 'image', perSecond: -0.4, description: '-0,4 Image/s' },
      { resource: 'kapital', perSecond: -50, description: '-50 Mkr/s (sanktioner)' },
    ],
    counterCost: { resource: 'lobby', amount: 5_000 },
    counterLabel: 'Urvattna mandatet',
    counterDescription: 'L\u00e5t lobbyn omformulera FN-resolutionen. (5 000 PK)',
  },
  {
    id: 'ant_hacktivister',
    name: 'Hacktivisterna',
    description: 'Anonyma hackare l\u00e4cker interna dokument. Dina verkliga CO\u2082-siffror publiceras.',
    icon: '\ud83d\udcbb',
    triggerPhase: 7,
    triggerCondition: (s) => s.phase >= 7 && s.realCO2 > 1_000_000,
    tickEffects: [
      { resource: 'image', perSecond: -0.6, description: '-0,6 Image/s' },
    ],
    counterCost: { resource: 'kapital', amount: 2_000_000 },
    counterLabel: 'Cybersäkerhetsfirma',
    counterDescription: 'Anst\u00e4ll en cybersäkerhetsfirma som "hanterar" l\u00e4ckan. (2M Mkr)',
  },
  {
    id: 'ant_mars_rebellerna',
    name: 'Mars-Rebellerna',
    description: 'Kolonisterna p\u00e5 Mars kr\u00e4ver sj\u00e4lvstyre. De vill inte vara en plantage.',
    icon: '\ud83d\ude80',
    triggerPhase: 9,
    triggerCondition: (s) => s.phase >= 9 && s.expansionTargets['exp_mars']?.acquired === true,
    tickEffects: [
      { resource: 'stammar', perSecond: -500_000, description: '-500K stammar/s (sabotage)' },
      { resource: 'kapital', perSecond: -100, description: '-100 Mkr/s' },
    ],
    counterCost: { resource: 'lobby', amount: 20_000 },
    counterLabel: 'Införa "frivilligt" arbetskontrakt',
    counterDescription: 'Juridiskt bindande 200-\u00e5rigt kontrakt. (20 000 PK)',
  },
  {
    id: 'ant_tidsgranslosen',
    name: 'Tidsgränsl\u00f6sen',
    description: 'En anomali fr\u00e5n framtiden. Varnar f\u00f6r konsekvenserna. Ingen lyssnar.',
    icon: '\u231b',
    triggerPhase: 12,
    triggerCondition: (s) => s.phase >= 12,
    tickEffects: [
      { resource: 'image', perSecond: -1.0, description: '-1,0 Image/s' },
      { resource: 'stammar', perSecond: -10_000_000, description: '-10M stammar/s (tidsparadox)' },
    ],
    counterCost: { resource: 'lobby', amount: 200_000 },
    counterLabel: 'Stäng tidsporten',
    counterDescription: 'Anv\u00e4nd Entropimotorn f\u00f6r att st\u00e4nga tidsporten. (200 000 PK)',
  },
]

export function getAntagonist(id: string): AntagonistDef | undefined {
  return ANTAGONISTS.find(a => a.id === id)
}

/** Check which antagonists should become active given current state */
export function checkAntagonistTriggers(state: GameState): string[] {
  const newlyTriggered: string[] = []
  for (const ant of ANTAGONISTS) {
    if (state.antagonists[ant.id]?.active) continue // already active
    if (state.antagonists[ant.id]?.countered) continue // already countered
    if (ant.triggerPhase > state.phase) continue
    if (ant.triggerCondition(state)) {
      newlyTriggered.push(ant.id)
    }
  }
  return newlyTriggered
}
