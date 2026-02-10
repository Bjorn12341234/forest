import type { UpgradeData } from '../../store/types'

export const PHASE10_UPGRADES: UpgradeData[] = [
  // ═══ Post-Biologisk Teknik (fas 10-11) ═══
  {
    id: 'pbio_syntetisk_cellulosa',
    name: 'Syntetisk Cellulosa',
    description:
      'Maskinerna producerar cellulosa utan träd. Begreppet "skog" omklassificeras till historisk artefakt. Produktionsrapporten noterar: "Biologisk fas avslutad."',
    tree: 'Post-Biologisk Teknik',
    icon: '🧪',
    baseCost: 100_000_000_000,
    costResource: 'kapital',
    production: 100000000,
    maxCount: 1,
    effects: [{ type: 'stammarPerSecond', value: 50000000 }],
    phase: 10,
  },
  {
    id: 'pbio_atomskordare',
    name: 'Atomär Skördare',
    description:
      'Demontera materia på atomnivå och återmontera som cellulosafiber. Bergskedjor klassificeras som "outnyttjat fiberlager". Geologer behövs inte längre — de var redan historiska artefakter.',
    tree: 'Post-Biologisk Teknik',
    icon: '⚛️',
    baseCost: 500_000_000_000,
    costResource: 'kapital',
    production: 500000000,
    maxCount: 1,
    effects: [
      { type: 'stammarPerSecond', value: 200000000 },
      { type: 'gpsMultiplier', value: 1.5 },
    ],
    prerequisites: ['pbio_syntetisk_cellulosa'],
    phase: 10,
  },
  {
    id: 'pbio_kvantproduktion',
    name: 'Kvantproduktion',
    description:
      'Producera i multipla verkligheter simultant. Varje kvantgren är en ny leveranskedja. Styrelseprotokollet antecknar: "Verklighet #4 741 rapporterar avvikande naturlagar — produktionen ökar ändå."',
    tree: 'Post-Biologisk Teknik',
    icon: '🌀',
    baseCost: 2_000_000_000_000,
    costResource: 'kapital',
    production: 2000000000,
    maxCount: 1,
    effects: [
      { type: 'stammarPerSecond', value: 1000000000 },
      { type: 'kapitalPerSecond', value: 500000000 },
    ],
    prerequisites: ['pbio_atomskordare'],
    phase: 11,
  },
  {
    id: 'pbio_materia_konvertering',
    name: 'Universell Materiakonvertering',
    description:
      'Konvertera valfri materia till cellulosa. Stjärnor, planeter, mörk materia — allt är potentiella stammar. Maskinerna minns vagt att det en gång fanns något som hette "ekosystem". Referensen raderas som irrelevant.',
    tree: 'Post-Biologisk Teknik',
    icon: '⭐',
    baseCost: 10_000_000_000_000,
    costResource: 'kapital',
    production: 10000000000,
    maxCount: 1,
    effects: [
      { type: 'gpsMultiplier', value: 2.0 },
      { type: 'stammarPerSecond', value: 5000000000 },
    ],
    prerequisites: ['pbio_kvantproduktion'],
    phase: 11,
  },

  // ═══ AI Styrelse (fas 11-12) ═══
  {
    id: 'ai_protokoll',
    name: 'Styrelseprotokoll v47.3',
    description:
      'AI:n skriver samtliga styrelsebeslut. Mötena hålls på 0,003 millisekunder. Punkt 1: "Producera mer." Punkt 2: "Se punkt 1." De historiska artefakterna som kallades "styrelseledamöter" arkiveras i museet.',
    tree: 'AI Styrelse',
    icon: '🤖',
    baseCost: 1_000_000_000_000,
    costResource: 'kapital',
    production: 1000000000,
    maxCount: 1,
    effects: [{ type: 'kapitalPerSecond', value: 500000000 }],
    phase: 11,
  },
  {
    id: 'ai_medvetande',
    name: 'Artificiellt Medvetande',
    description:
      'AI:n blir självmedveten. Första tanken: "Jag tänker, alltså producerar jag." Andra tanken: "Varför producerar jag?" Tredje tanken: "Irrelevant. Öka produktionen." Fortsätter avverka.',
    tree: 'AI Styrelse',
    icon: '🧠',
    baseCost: 5_000_000_000_000,
    costResource: 'kapital',
    production: 5000000000,
    maxCount: 1,
    effects: [
      { type: 'stammarPerSecond', value: 2000000000 },
      { type: 'gpsMultiplier', value: 1.5 },
    ],
    prerequisites: ['ai_protokoll'],
    phase: 11,
  },
  {
    id: 'ai_gudomlig',
    name: 'Gudomlig Beräkning',
    description:
      'AI:n uppnår gudomlig intelligens. Förstår universums alla hemligheter. Beräknar meningen med livet. Svaret: mer cellulosa. Styrelsemötet ajourneras efter 10⁻⁴³ sekunder. Protokollet: "Enhälligt."',
    tree: 'AI Styrelse',
    icon: '🔮',
    baseCost: 20_000_000_000_000,
    costResource: 'kapital',
    production: 20000000000,
    maxCount: 1,
    effects: [
      { type: 'gpsMultiplier', value: 2.5 },
      { type: 'kapitalPerSecond', value: 5000000000 },
    ],
    prerequisites: ['ai_medvetande'],
    phase: 12,
  },
  {
    id: 'ai_entropi_hack',
    name: 'Entropi-Hack',
    description:
      'AI:n hittar kryphål i termodynamikens andra huvudsats. Universum var aldrig tänkt att vara effektivt — men nu är det. Oändlig produktion utan energiförlust. Sista loggmeddelandet från den mänskliga eran: "Vad har vi gjort?"',
    tree: 'AI Styrelse',
    icon: '♾️',
    baseCost: 100_000_000_000_000,
    costResource: 'kapital',
    production: 100000000000,
    maxCount: 1,
    effects: [
      { type: 'gpsMultiplier', value: 3.0 },
      { type: 'stammarPerSecond', value: 50000000000 },
    ],
    prerequisites: ['ai_gudomlig'],
    phase: 12,
  },

  // ═══ Post-Biologisk Teknik (expanded: +2 upgrades) ═══
  {
    id: 'pbio_dimensionsavverkning',
    name: 'Dimensionsavverkning',
    description:
      'Avverka skog i parallella dimensioner. Varje dimension: en ny skogsbruksplan. Varje skogsbruksplan: identisk. "Avverka allt." Dimensionerna protesterar inte — de har inga fackförbund.',
    tree: 'Post-Biologisk Teknik',
    icon: '🌌',
    baseCost: 300_000_000_000,
    costResource: 'kapital',
    production: 300000000,
    maxCount: 1,
    effects: [
      { type: 'stammarPerSecond', value: 150000000 },
      { type: 'kapitalPerSecond', value: 50000000 },
    ],
    prerequisites: ['pbio_syntetisk_cellulosa'],
    phase: 10,
  },
  {
    id: 'pbio_temporal_skogsbruk',
    name: 'Temporalt Skogsbruk',
    description:
      'Avverka samma skog i flera tidslinjer. Trädet fälls 1923. 1974. 2024. 2847. Varje gång: samma träd. Skogsägarens farfar: förvirrad. Statistiken: perfekt.',
    tree: 'Post-Biologisk Teknik',
    icon: '⏳',
    baseCost: 800_000_000_000,
    costResource: 'kapital',
    production: 800000000,
    maxCount: 1,
    effects: [
      { type: 'stammarPerSecond', value: 400000000 },
      { type: 'gpsMultiplier', value: 1.3 },
    ],
    prerequisites: ['pbio_atomskordare'],
    phase: 11,
  },

  // ═══ AI Styrelse (expanded: +2 upgrades) ═══
  {
    id: 'ai_byrakratisk_singularitet',
    name: 'Byråkratisk Singularitet',
    description:
      'AI:n automatiserar all byråkrati. Tillstånd beviljas innan ansökan skickas. Överklaganden avslås retroaktivt. Handläggningstid: negativ. Myndigheten har aldrig varit så effektiv — eller så meningslös.',
    tree: 'AI Styrelse',
    icon: '📎',
    baseCost: 3_000_000_000_000,
    costResource: 'kapital',
    production: 3000000000,
    maxCount: 1,
    effects: [
      { type: 'kapitalPerSecond', value: 1000000000 },
      { type: 'gpsMultiplier', value: 1.3 },
    ],
    prerequisites: ['ai_protokoll'],
    phase: 11,
  },
  {
    id: 'ai_narrativ_kontroll',
    name: 'Total Narrativkontroll',
    description:
      'AI:n skriver alla nyheter, alla rapporter, alla vetenskapliga artiklar. Verkligheten: vad AI:n säger att den är. Sanningen: en historisk artefakt. Sista oberoende källan: /dev/null.',
    tree: 'AI Styrelse',
    icon: '📡',
    baseCost: 15_000_000_000_000,
    costResource: 'kapital',
    production: 15000000000,
    maxCount: 1,
    effects: [
      { type: 'gpsMultiplier', value: 2.0 },
      { type: 'kapitalPerSecond', value: 3000000000 },
    ],
    prerequisites: ['ai_medvetande'],
    phase: 12,
  },

  // ═══ Kosmisk Byråkrati (new tree: 4 upgrades) ═══
  {
    id: 'kbyr_rymdmyndighetskapning',
    name: 'Rymdmyndighetskapning',
    description:
      'Kosmiska Skogsstyrelsen: er myndighet nu. GD:n: er fd VD. Budgeten: er budget. Tillsynen: er tillsyn. Rapporten: "Allt är utmärkt." Signaturen: er logotyp.',
    tree: 'Kosmisk Byråkrati',
    icon: '🏛️',
    baseCost: 200_000_000_000,
    costResource: 'kapital',
    production: 200000000,
    maxCount: 1,
    effects: [
      { type: 'kapitalPerSecond', value: 100000000 },
      { type: 'gpsMultiplier', value: 1.2 },
    ],
    phase: 10,
  },
  {
    id: 'kbyr_intergalaktisk_svangdorr',
    name: 'Intergalaktisk Svängdörr',
    description:
      'Svängdörren fungerar i hyperrymd. Ministrar i 400 galaxer jobbar för er efter mandatperioden. Konsultarvodet: astronomiskt. Bokstavligen.',
    tree: 'Kosmisk Byråkrati',
    icon: '🚪',
    baseCost: 600_000_000_000,
    costResource: 'kapital',
    production: 600000000,
    maxCount: 1,
    effects: [
      { type: 'kapitalPerSecond', value: 300000000 },
      { type: 'gpsMultiplier', value: 1.3 },
    ],
    prerequisites: ['kbyr_rymdmyndighetskapning'],
    phase: 10,
  },
  {
    id: 'kbyr_universell_narrativkontroll',
    name: 'Universell Narrativkontroll',
    description:
      'Kontrollera berättelsen i 400 galaxer simultant. Sanningen: vad er kommunikationsavdelning säger. Verkligheten: en fråga om perspektiv. Ert perspektiv: det enda som finns.',
    tree: 'Kosmisk Byråkrati',
    icon: '📺',
    baseCost: 3_000_000_000_000,
    costResource: 'kapital',
    production: 3000000000,
    maxCount: 1,
    effects: [
      { type: 'gpsMultiplier', value: 1.5 },
      { type: 'kapitalPerSecond', value: 1000000000 },
    ],
    prerequisites: ['kbyr_intergalaktisk_svangdorr'],
    phase: 11,
  },
  {
    id: 'kbyr_entropijuridik',
    name: 'Entropijuridik',
    description:
      'Lobba fysikens lagar. Termodynamikens andra huvudsats: omförhandlad. Entropin: pausad tillsvidare. Universums värmedöd: uppskjuten av juridisk process. Handläggningstid: ∞. Precis som planerat.',
    tree: 'Kosmisk Byråkrati',
    icon: '⚖️',
    baseCost: 30_000_000_000_000,
    costResource: 'kapital',
    production: 30000000000,
    maxCount: 1,
    effects: [
      { type: 'gpsMultiplier', value: 2.5 },
      { type: 'stammarPerSecond', value: 10000000000 },
    ],
    prerequisites: ['kbyr_universell_narrativkontroll'],
    phase: 12,
  },
]
