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
]
