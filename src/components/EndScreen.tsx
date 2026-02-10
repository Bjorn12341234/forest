import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { formatNumber, formatDuration } from '../engine/format'

interface EndScreenProps {
  onReset: () => void
  onContinue: () => void
}

const POST_CREDITS: string[] = [
  'Akteägarna är nöjda. Styrelsen gratulerar.',
  '',
  'Marknadsandelen överstiger 100%. Det borde vara omöjligt. Det är det inte.',
  '',
  'All biologisk mångfald har ersatts med produktiv biomassa.',
  'Varje kvadratmeter är optimerad. Varje organism är en produktionsenhet.',
  '',
  'Klimatförändringarna visade sig vara en utmärkt affärsmöjlighet.',
  'FSC-certifikatet hänger kvar. Ingen frågar varför.',
  'Svängdörren snurrar fortfarande. Snabbare än någonsin.',
  '',
  'Nästa kvartal: Expansion bortom Sveriges gränser.',
  'Nästa år: Expansion bortom jordens gränser.',
  'Nästa århundrade: Expansion bortom fysikens gränser.',
  '',
  'Tillväxt är den enda lagen.',
]

export function EndScreen({ onReset, onContinue }: EndScreenProps) {
  const [stage, setStage] = useState<'reveal' | 'postcredits' | 'reality'>('reveal')
  const [revealStep, setRevealStep] = useState(0)
  const [showReset, setShowReset] = useState(false)
  const [creditScroll, setCreditScroll] = useState(false)

  const totalStammar = useGameStore(s => s.totalStammar)
  const kapital = useGameStore(s => s.kapital)
  const realCO2 = useGameStore(s => s.realCO2)
  const ownerProfit = useGameStore(s => s.ownerProfit)
  const industryProfit = useGameStore(s => s.industryProfit)
  const biodiversity = useGameStore(s => s.biodiversity)
  const species = useGameStore(s => s.species)
  const samiLand = useGameStore(s => s.samiLand)
  const totalPlayTime = useGameStore(s => s.totalPlayTime)
  const lobbyProjects = useGameStore(s => s.lobbyProjects)
  const antagonists = useGameStore(s => s.antagonists)
  const countries = useGameStore(s => s.countries)

  // Mark endgame as seen
  useEffect(() => {
    useGameStore.setState(s => ({
      achievements: { ...s.achievements, endgame_seen: true },
    }))
  }, [])

  // Reveal steps sequentially
  useEffect(() => {
    if (stage !== 'reveal') return
    const totalSteps = 10
    const timers: ReturnType<typeof setTimeout>[] = []

    for (let i = 1; i <= totalSteps; i++) {
      timers.push(setTimeout(() => setRevealStep(i), i * 1200))
    }

    // Show reset button after all reveals
    timers.push(setTimeout(() => setShowReset(true), (totalSteps + 1) * 1200))

    return () => timers.forEach(clearTimeout)
  }, [stage])

  const handlePostCredits = useCallback(() => {
    setStage('postcredits')
    setTimeout(() => setCreditScroll(true), 500)
  }, [])

  // Derived stats
  const ratio = ownerProfit > 0 ? Math.round(industryProfit / ownerProfit) : 12
  const reportedCO2 = realCO2 * 0.15 // industry reports ~15% of actual
  const skogsstyrelsen = lobbyProjects['lobby_buy_myndighetskapning']?.purchased
  const fsc = lobbyProjects['lobby_buy_certifiering']?.purchased
  const omnibus = lobbyProjects['lobby_buy_omnibus']?.purchased
  const antagonistsCountered = Object.values(antagonists).filter(a => a.countered).length
  const countriesControlled = Object.values(countries).filter(c => c.status === 'controlled').length

  if (stage === 'reality') {
    return <RealityPage onContinue={onContinue} onReset={onReset} />
  }

  if (stage === 'postcredits') {
    return (
      <motion.div
        className="fixed inset-0 z-[200] flex flex-col items-center justify-start overflow-y-auto"
        style={{ background: '#000' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 max-w-lg">
          <AnimatePresence>
            {creditScroll && POST_CREDITS.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 2.5, duration: 1.2 }}
                className={`text-sm leading-relaxed mb-6 text-center ${
                  line === '' ? 'h-4' :
                  i === POST_CREDITS.length - 1 ? 'text-text-muted/60 italic text-xs' :
                  i >= POST_CREDITS.length - 3 ? 'text-white font-bold' :
                  'text-white/70'
                }`}
                style={{ fontFamily: 'IBM Plex Mono, monospace' }}
              >
                {line}
              </motion.p>
            ))}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: POST_CREDITS.length * 2.5 + 2 }}
            className="mt-12 flex flex-col gap-6 items-center"
          >
            <button
              onClick={() => setStage('reality')}
              className="px-8 py-3 bg-white text-black text-sm font-bold tracking-wider cursor-pointer border-none hover:bg-gray-200 transition-colors"
            >
              FORTSÄTT EXPANDERA
            </button>
            <button
              onClick={onReset}
              className="px-4 py-1 bg-transparent text-white/20 text-[0.5rem] tracking-wider cursor-pointer border-none hover:text-white/40 transition-colors"
            >
              starta om
            </button>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto"
      style={{ background: '#FAFAFA' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <div className="w-full max-w-md px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-center mb-10"
        >
          <p className="text-[0.6rem] tracking-[0.3em] text-gray-400 mb-2">SILVA MAXIMUS AB</p>
          <h1
            className="text-2xl font-bold tracking-wider text-black"
            style={{ fontFamily: 'IBM Plex Mono, monospace' }}
          >
            ÅRSREDOVISNING
          </h1>
          <div className="w-16 h-px bg-gray-300 mx-auto mt-4" />
        </motion.div>

        {/* Stats rows — revealed sequentially */}
        <div className="flex flex-col gap-0">
          <RevealRow step={1} current={revealStep} label="Total stammar avverkade" value={formatNumber(totalStammar)} />
          <RevealRow step={2} current={revealStep} label="Total kapital genererat" value={`${formatNumber(kapital)} Mkr`} />
          <RevealRow step={3} current={revealStep} label="Speltid" value={formatDuration(totalPlayTime)} />

          {/* Divider: VERKSAMHETENS RESULTAT */}
          {revealStep >= 4 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="my-6 text-center"
            >
              <p className="text-[0.55rem] tracking-[0.4em] text-gray-500 font-bold">
                — VERKSAMHETENS RESULTAT —
              </p>
            </motion.div>
          )}

          <RevealRow
            step={4} current={revealStep}
            label="Verkligt netto-CO&#x2082;"
            value={`${formatNumber(realCO2)} ton`}
            subtext={`Rapporterat: ${formatNumber(reportedCO2)} ton`}
          />
          <RevealRow
            step={5} current={revealStep}
            label="Skogsägare fick"
            value={`${formatNumber(ownerProfit)} Mkr`}
            subtext={`Industrin tjänade: ${formatNumber(industryProfit)} Mkr — Förhållande: 1:${ratio}`}
          />
          <RevealRow
            step={6} current={revealStep}
            label="Biologisk mångfald"
            value={`${biodiversity.toFixed(1)}% kvar`}
            subtext={`${species} arter försvunna`}
          />
          <RevealRow
            step={7} current={revealStep}
            label="Samebyars betesmark"
            value={`${samiLand.toFixed(1)} km² förlorad`}
          />
          <RevealRow
            step={8} current={revealStep}
            label="Länder erövrade"
            value={`${countriesControlled} nationer`}
            subtext="Den svenska modellen exporterad globalt"
          />

          {/* Institutional capture */}
          {revealStep >= 9 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-4 py-3 border-t border-gray-200"
            >
              <p className="text-[0.55rem] tracking-wider text-gray-400 mb-2">INSTITUTIONELL KAPNING</p>
              <div className="flex flex-col gap-1">
                <StatusLine label="Skogsstyrelsen" status={skogsstyrelsen ? 'KÖPT' : 'OBEROENDE'} bought={!!skogsstyrelsen} />
                <StatusLine label="FSC-certifiering" status={fsc ? 'KÖPT' : 'AKTIV'} bought={!!fsc} />
                <StatusLine label="EU:s miljölagstiftning" status={omnibus ? 'URVATTNAD' : 'INTAKT'} bought={!!omnibus} />
              </div>
            </motion.div>
          )}

          {/* Antagonists summary */}
          {revealStep >= 10 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="py-3 border-t border-gray-200"
            >
              <p className="text-[0.55rem] tracking-wider text-gray-400 mb-1">NEUTRALISERADE RÖSTER</p>
              <p className="text-xs text-gray-600" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
                {antagonistsCountered} av {Object.keys(antagonists).length} kritiker tystade
              </p>
            </motion.div>
          )}
        </div>

        {/* Buttons */}
        <AnimatePresence>
          {showReset && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-10 text-center"
            >
              <div className="w-16 h-px bg-gray-300 mx-auto mb-6" />
              <button
                onClick={handlePostCredits}
                className="px-8 py-3 bg-black text-white text-xs font-bold tracking-[0.2em] cursor-pointer border-none hover:bg-gray-800 transition-colors"
                style={{ fontFamily: 'IBM Plex Mono, monospace' }}
              >
                DELA UT VINST TILL AKTIEÄGARNA
              </button>
              <p className="text-[0.5rem] text-gray-400 mt-3 italic">
                Aktieägarna fick sin utdelning. Allt annat är detaljer.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// ── Sub-components ──

function RevealRow({ step, current, label, value, subtext }: {
  step: number
  current: number
  label: string
  value: string
  subtext?: string
}) {
  if (current < step) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="py-2.5 border-b border-gray-100 flex justify-between items-baseline gap-4"
    >
      <span className="text-xs text-gray-500" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
        {label}
      </span>
      <div className="text-right">
        <span
          className="text-sm font-bold text-black"
          style={{ fontFamily: 'IBM Plex Mono, monospace' }}
        >
          {value}
        </span>
        {subtext && (
          <p className="text-[0.5rem] text-gray-400 mt-0.5">{subtext}</p>
        )}
      </div>
    </motion.div>
  )
}

function StatusLine({ label, status, bought }: {
  label: string
  status: string
  bought: boolean
}) {
  return (
    <div className="flex justify-between items-center text-xs" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
      <span className="text-gray-500">{label}</span>
      <span className={bought ? 'text-black font-bold' : 'text-gray-400'}>
        {status}
      </span>
    </div>
  )
}

// ── Reality Page ──

const REALITY_SECTIONS: { heading: string; text: string }[] = [
  {
    heading: 'Det här var ett spel. Det här är inte det.',
    text: 'Allt du just spelade är en satir. Men den bygger på verkligheten. Svensk skogsindustri är en av de mäktigaste lobbygrupperna i Europa — och det som händer i våra skogar är något de flesta aldrig ser.',
  },
  {
    heading: 'Kalhyggesbruket',
    text: 'Cirka 95% av all avverkning i Sverige är kalhyggen. Hela skogsekosystem jämnas med marken. Det som planteras är monokulturer av gran i raka rader — biologiska öknar där nästan ingenting annat lever. Över 2 000 skogslevande arter är rödlistade i Sverige. Gammelskogen, den som aldrig kalhuggits, utgör idag under 5% av den produktiva skogsmarken.',
  },
  {
    heading: 'Lobbyn',
    text: 'Skogsindustrierna och LRF Skogsägarna är bland Sveriges mest inflytelserika lobbyorganisationer. De har systematiskt format berättelsen om att svenskt skogsbruk är \"hållbart\" och \"klimatsmart\" — trots att oberoende forskning gång på gång visar motsatsen. Budskapen genomsyrar läromedel, myndighetstexter och politiska debatter.',
  },
  {
    heading: 'Svängdörren',
    text: 'Före detta politiker och myndighetschefer rekryteras regelbundet av skogsindustrin, och personer från industrin hamnar i nyckelpositioner på myndigheter. Det skapar en kultur där reglering och kontroll systematiskt försvagas inifrån. Skogsstyrelsen, som ska sköta tillsynen, har fått sin budget skären gång på gång.',
  },
  {
    heading: 'EU och Sverige',
    text: 'Sverige har aktivt motarbetat EU:s miljölagstiftning som berör skog. Restaureringsförordningen, taxonomin, avskogningsförordningen — Sverige har i varje fall lobbat för undantag och utspädning, ofta på direkt begäran från skogsindustrin. När EU föreslog att kalhyggesbruk inte skulle klassas som hållbart, reagerade den svenska regeringen som om det vore ett angrepp på nationen.',
  },
  {
    heading: 'Kina och snabbprodukter',
    text: 'En stor del av det svenska virket exporteras som råvara eller halvfabrikat — ofta till Kina, där det blir engångsprodukter, pappersförpackningar och viskostyg till snabbmode. Träd som tog 60–100 år att växa förvandlas till produkter som används i minuter. Toalettpapper, näsdukar, kartonger. Merärdet försvinner utomlands. Kvar i Sverige finns kahyggena.',
  },
  {
    heading: 'Det finns andra sätt',
    text: 'Hyggesfritt skogsbruk — kontinuitetsskogsbruk — behåller skogens struktur och ekologiska funktioner medan man fortfarande producerar virke. Selektiv avverkning, längre omloppstider och fokus på högvärdiga massivträprodukter istället för massa och papper ger både bättre ekonomi för skogsägaren och bättre koldioxidlagring på lång sikt. Det lagrar kol i byggmaterial i århundraden istället för att elda upp det eller göra engångsprodukter.',
  },
  {
    heading: 'Samerna',
    text: 'Kalhyggesbruket slår hårt mot renskötande samer. Marklavar, som renar är beroende av för vinterbete, behöver 50–100 år för att återhämta sig efter en kalavverkning. Industrins avverkningsplaner görs ofta utan samråd med samebyar. Urfolksrättigheterna hamnar konsekvent under industrins ekonomiska intressen.',
  },
  {
    heading: 'Klimatet',
    text: 'Industrin hävdar att skogsbruket är \"klimatpositivt\". Men kalhyggen frigör enorma mängder markbundet kol, och det tar årtionden innan nyplanterad skog börjar ta upp kol netto. När virket går till kortlivade produkter som eldas eller komposteras, återvänder kolet till atmosfären snabbt. Bokföringen som används för att visa \"klimatnytta\" har kritiserats av forskare internationellt.',
  },
]

function RealityPage({ onContinue, onReset }: { onContinue: () => void; onReset: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[200] overflow-y-auto"
      style={{ background: '#0A0A0A' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <div className="max-w-lg mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.5 }}
          className="mb-16 text-center"
        >
          <div className="w-12 h-px bg-white/20 mx-auto mb-8" />
          <p
            className="text-[0.6rem] tracking-[0.4em] text-white/30 mb-3 uppercase"
            style={{ fontFamily: 'IBM Plex Mono, monospace' }}
          >
            Vänta.
          </p>
          <p
            className="text-[0.6rem] tracking-[0.3em] text-white/30"
            style={{ fontFamily: 'IBM Plex Mono, monospace' }}
          >
            Innan du fortsätter.
          </p>
        </motion.div>

        {/* Fact sections */}
        {REALITY_SECTIONS.map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 + i * 0.3, duration: 0.8 }}
            className="mb-10"
          >
            <h3
              className={`text-sm font-bold mb-3 ${i === 0 ? 'text-white' : 'text-white/80'}`}
              style={{ fontFamily: 'IBM Plex Mono, monospace' }}
            >
              {section.heading}
            </h3>
            <p
              className="text-xs leading-relaxed text-white/50"
              style={{ fontFamily: 'IBM Plex Mono, monospace' }}
            >
              {section.text}
            </p>
            {i < REALITY_SECTIONS.length - 1 && (
              <div className="w-8 h-px bg-white/10 mt-10" />
            )}
          </motion.div>
        ))}

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 + REALITY_SECTIONS.length * 0.3 + 0.5, duration: 1 }}
          className="mt-16 mb-8 text-center"
        >
          <div className="w-12 h-px bg-white/20 mx-auto mb-10" />

          <p
            className="text-xs text-white/60 leading-relaxed mb-2"
            style={{ fontFamily: 'IBM Plex Mono, monospace' }}
          >
            Vill du veta mer? Stöd de som kämpar för skogen:
          </p>

          <a
            href="https://naturhansyn.se/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 mb-12 px-6 py-3 border border-white/30 text-white text-xs font-bold tracking-[0.15em] no-underline hover:bg-white/10 transition-colors"
            style={{ fontFamily: 'IBM Plex Mono, monospace' }}
          >
            FÖRENINGEN NATURHÄNSYN
          </a>

          <p
            className="text-[0.55rem] text-white/25 leading-relaxed mb-12"
            style={{ fontFamily: 'IBM Plex Mono, monospace' }}
          >
            naturhansyn.se
          </p>

          <div className="w-8 h-px bg-white/10 mx-auto mb-10" />

          <div className="flex flex-col gap-4 items-center">
            <button
              onClick={onContinue}
              className="px-8 py-3 bg-white/10 text-white/70 text-xs font-bold tracking-wider cursor-pointer border border-white/20 hover:bg-white/20 transition-colors"
              style={{ fontFamily: 'IBM Plex Mono, monospace' }}
            >
              FORTSÄTT SPELA
            </button>
            <button
              onClick={onReset}
              className="px-4 py-1 bg-transparent text-white/20 text-[0.5rem] tracking-wider cursor-pointer border-none hover:text-white/40 transition-colors"
            >
              starta om
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
