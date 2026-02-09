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
    description: 'Naturskyddsforeningen-liknande organisation som bevakar varje avverkning.',
    icon: '\ud83c\udf3f',
    triggerPhase: 2,
    triggerCondition: (s) => s.totalStammar >= 100_000,
    tickEffects: [
      { resource: 'image', perSecond: -0.1, description: '-0,1 Image/s' },
    ],
    counterCost: { resource: 'kapital', amount: 50_000 },
    counterLabel: 'Finansiera "motrorelse"',
    counterDescription: 'Skapa en astroturf-organisation som forsvarar industrin. (50 000 Mkr)',
  },
  {
    id: 'ant_pensionaren',
    name: 'Den Envisa Pensionaren',
    description: 'En pensionar med GPS och artkunskap som hittar nyckelbiotoper overallt.',
    icon: '\ud83d\udc74',
    triggerPhase: 2,
    triggerCondition: (s) => s.eventHistory.includes('p3_nyckelbiotop'),
    tickEffects: [
      { resource: 'stammar', perSecond: -5, description: '-5 stammar/s' },
    ],
    counterCost: { resource: 'lobby', amount: 20 },
    counterLabel: '"Ovetenskaplig" PR-kampanj',
    counterDescription: 'Ifragasatt kompetens via branschfinansierad rapport. (20 PK)',
  },
  {
    id: 'ant_eu_inspektoren',
    name: 'EU-Inspektoren',
    description: 'EU:s miljoinspektor granskar svenska avverkningsmetoder.',
    icon: '\ud83c\uddea\ud83c\uddfa',
    triggerPhase: 4,
    triggerCondition: (s) => s.phase >= 4,
    tickEffects: [
      { resource: 'stammar', perSecond: -50, description: '-20% effektivitet' },
    ],
    counterCost: { resource: 'lobby', amount: 500 },
    counterLabel: 'Operation Omnibus',
    counterDescription: 'Anvand lobbykontakter for att forsvaga EU-regler. (500 PK)',
  },
  {
    id: 'ant_svt_vetenskap',
    name: 'Statliga Dokumentarkanalen',
    description: 'Undersokande journalistik som avslojur industrins metoder.',
    icon: '\ud83d\udcfa',
    triggerPhase: 3,
    triggerCondition: (s) => s.image < 40,
    tickEffects: [
      { resource: 'image', perSecond: -0.5, description: '-0,5 Image/s (mega)' },
    ],
    counterCost: { resource: 'lobby', amount: 300 },
    counterLabel: 'Riksskogsnamnden mot SVT',
    counterDescription: 'Lat Riksskogsnamnden publicera en motrapport. (300 PK)',
  },
  {
    id: 'ant_sameby',
    name: 'Samebyns Juridik',
    description: 'Samiska rattighetsjurister som blockerar avverkning i norra zonen.',
    icon: '\u2696\ufe0f',
    triggerPhase: 5,
    triggerCondition: (s) => s.phase >= 5 && s.samiLand >= 15,
    tickEffects: [
      { resource: 'stammar', perSecond: -100, description: 'Blockerar norra zonen' },
    ],
    counterCost: { resource: 'kapital', amount: 200_000 },
    counterLabel: '"Samradsprocess" (15 ar)',
    counterDescription: 'Starta en utredning som aldrig leder nagonvart. (200 000 Mkr)',
  },
  {
    id: 'ant_plockhugget',
    name: 'Skogsvispen AB',
    description: 'Visar att alternativt skogsbruk fungerar. Farligt for narrativet.',
    icon: '\ud83c\udf33',
    triggerPhase: 3,
    triggerCondition: (s) => s.phase >= 3 && s.totalStammar >= 500_000,
    tickEffects: [
      { resource: 'kapital', perSecond: -5, description: '-5 Mkr/s (kundforlust)' },
    ],
    counterCost: { resource: 'kapital', amount: 30_000 },
    counterLabel: 'Svartmala + "ingen vetenskaplig grund"',
    counterDescription: 'Finansiera motstudier som avfardar alternativa metoder. (30 000 Mkr)',
  },
  {
    id: 'ant_greta',
    name: 'Greta',
    description: 'En tonaring med plakat. Internationell uppmärksamhet. Omojlig att eliminera.',
    icon: '\ud83d\udce2',
    triggerPhase: 4,
    triggerCondition: (s) => s.image < 30,
    tickEffects: [
      { resource: 'image', perSecond: -0.3, description: '-0,3 Image/s' },
      { resource: 'kapital', perSecond: -10, description: '-10 Mkr/s (bojkott)' },
    ],
    counterCost: { resource: 'kapital', amount: 500_000 },
    counterLabel: 'Hantera (tillfaldigt)',
    counterDescription: 'Omojlig att eliminera permanent. Kostar 500 000 Mkr att dampa temporart.',
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
