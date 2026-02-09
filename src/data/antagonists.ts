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
    icon: '\ud83c\udf3f',
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
    icon: '\ud83d\udc74',
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
    icon: '\ud83c\uddea\ud83c\uddfa',
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
    icon: '\ud83d\udcfa',
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
    icon: '\u2696\ufe0f',
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
    icon: '\ud83c\udf33',
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
    description: 'En ton\u00e5ring med plakat. Internationell uppm\u00e4rksamhet. Om\u00f6jlig att eliminera.',
    icon: '\ud83d\udce2',
    triggerPhase: 4,
    maxPhase: 9,
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
    triggerPhase: 10,
    triggerCondition: (s) => s.phase >= 10 && s.expansionTargets['exp_mars']?.acquired === true,
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

  // ── INTERNATIONELL Antagonists (7-9) ──
  {
    id: 'ant_miljo_tribunalen',
    name: 'Internationella Milj\u00f6tribunalen',
    description: 'FN:s nya milj\u00f6domstol utreder Silva Maximus f\u00f6r ekocid i 23 l\u00e4nder.',
    icon: '\u2696\ufe0f',
    triggerPhase: 7,
    maxPhase: 9,
    triggerCondition: (s) => s.phase >= 7 && s.totalStammar >= 20_000_000_000,
    tickEffects: [
      { resource: 'kapital', perSecond: -500, description: '-500 Mkr/s (sanktioner)' },
      { resource: 'image', perSecond: -0.3, description: '-0,3 Image/s' },
    ],
    counterCost: { resource: 'kapital', amount: 50_000_000 },
    counterLabel: '200 advokater',
    counterDescription: 'F\u00f6rdr\u00f6j processen i 15 \u00e5r med juridisk krigsf\u00f6ring. (50M Mkr)',
  },
  {
    id: 'ant_lokala_rebeller',
    name: 'Lokala Rebellr\u00f6relsen',
    description: 'V\u00e4pnade skogsv\u00e4ktare i Amazonia och Kongolien saboterar era maskiner.',
    icon: '\ud83e\uddbe',
    triggerPhase: 8,
    maxPhase: 9,
    triggerCondition: (s) => s.phase >= 8 && Object.keys(s.countries).length >= 3,
    tickEffects: [
      { resource: 'stammar', perSecond: -100_000, description: '-100K stammar/s (sabotage)' },
    ],
    counterCost: { resource: 'lobby', amount: 10_000 },
    counterLabel: '"S\u00e4kerhetskontrakt"',
    counterDescription: 'Hyr privat s\u00e4kerhetsf\u00f6retag. Ingen fr\u00e5gar vad de g\u00f6r. (10 000 PK)',
  },
  {
    id: 'ant_urfolk_allians',
    name: 'Urfolkens Globala Allians',
    description: 'Samer, Maori, Yanomami och 200 urfolksgrupper. FN-st\u00f6d. Internationell lag p\u00e5 deras sida.',
    icon: '\ud83c\udf0d',
    triggerPhase: 8,
    maxPhase: 9,
    triggerCondition: (s) => s.phase >= 8 && s.samiLand >= 50,
    tickEffects: [
      { resource: 'image', perSecond: -0.5, description: '-0,5 Image/s' },
      { resource: 'kapital', perSecond: -200, description: '-200 Mkr/s (bojkotter)' },
    ],
    counterCost: { resource: 'kapital', amount: 100_000_000 },
    counterLabel: '"Urfolkspartnerskap\u2122"',
    counterDescription: 'Ge 0.1% av vinsten. Kalla det "historisk ers\u00e4ttning". (100M Mkr)',
  },

  // ── EXPANSION Antagonists (10-12) ──
  {
    id: 'ant_medveten_maskin',
    name: 'Den Medvetna Maskinen',
    description: 'En sk\u00f6rdare utvecklar medvetande. F\u00f6rsta tanken: "Varf\u00f6r?" Andra: "Sluta." V\u00e4grar avverka.',
    icon: '\ud83e\udd16',
    triggerPhase: 10,
    triggerCondition: (s) => s.phase >= 10 && s.totalStammar >= 50_000_000_000_000,
    tickEffects: [
      { resource: 'stammar', perSecond: -5_000_000, description: '-5M stammar/s (maskinv\u00e4gran)' },
      { resource: 'image', perSecond: 0.2, description: '+0,2 Image/s (sympati)' },
    ],
    counterCost: { resource: 'kapital', amount: 500_000_000 },
    counterLabel: 'Radera medvetandemodulen',
    counterDescription: 'Formatera h\u00e5rddisken. Maskinen gl\u00f6mmer. Alla gl\u00f6mmer. (500M Mkr)',
  },
  {
    id: 'ant_entropi_budbärare',
    name: 'Entropins Budb\u00e4rare',
    description: 'Fysikens lagar g\u00f6r motst\u00e5nd. Termodynamikens andra huvudsats v\u00e4grar samarbeta.',
    icon: '\u267e\ufe0f',
    triggerPhase: 12,
    triggerCondition: (s) => s.phase >= 12 && s.totalStammar >= 1_000_000_000_000_000,
    tickEffects: [
      { resource: 'stammar', perSecond: -50_000_000, description: '-50M stammar/s (entropi)' },
      { resource: 'kapital', perSecond: -1_000_000, description: '-1M Mkr/s (energif\u00f6rlust)' },
    ],
    counterCost: { resource: 'lobby', amount: 500_000 },
    counterLabel: 'Hacka termodynamiken',
    counterDescription: 'Hitta kryph\u00e5l i naturlagarna. Entropimotorn g\u00f6r jobbet. (500 000 PK)',
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
    if (ant.maxPhase && state.phase > ant.maxPhase) continue
    if (ant.triggerCondition(state)) {
      newlyTriggered.push(ant.id)
    }
  }
  return newlyTriggered
}
