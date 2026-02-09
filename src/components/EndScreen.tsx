import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { formatNumber, formatDuration } from '../engine/format'

interface EndScreenProps {
  onReset: () => void
  onContinue: () => void
}

const POST_CREDITS: string[] = [
  'Akte\u00e4garna \u00e4r n\u00f6jda. Styrelsen gratulerar.',
  '',
  'Marknadsandelen \u00f6verstiger 100%. Det borde vara om\u00f6jligt. Det \u00e4r det inte.',
  '',
  'All biologisk m\u00e5ngfald har ersatts med produktiv biomassa.',
  'Varje kvadratmeter \u00e4r optimerad. Varje organism \u00e4r en produktionsenhet.',
  '',
  'Klimatf\u00f6r\u00e4ndringarna visade sig vara en utm\u00e4rkt aff\u00e4rsm\u00f6jlighet.',
  'FSC-certifikatet h\u00e4nger kvar. Ingen fr\u00e5gar varf\u00f6r.',
  'Sv\u00e4ngd\u00f6rren snurrar fortfarande. Snabbare \u00e4n n\u00e5gonsin.',
  '',
  'N\u00e4sta kvartal: Expansion bortom Sveriges gr\u00e4nser.',
  'N\u00e4sta \u00e5r: Expansion bortom jordens gr\u00e4nser.',
  'N\u00e4sta \u00e5rhundrade: Expansion bortom fysikens gr\u00e4nser.',
  '',
  'Tillv\u00e4xt \u00e4r den enda lagen.',
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
              FORTS\u00c4TT EXPANDERA
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
            subtext={`Industrin tjänade: ${formatNumber(industryProfit)} Mkr \u2014 Förhållande: 1:${ratio}`}
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
            value={`${samiLand.toFixed(1)} km\u00B2 f\u00f6rlorad`}
          />
          <RevealRow
            step={8} current={revealStep}
            label="L\u00e4nder er\u00f6vrade"
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
                <StatusLine label="Skogsstyrelsen" status={skogsstyrelsen ? 'K\u00d6PT' : 'OBEROENDE'} bought={!!skogsstyrelsen} />
                <StatusLine label="FSC-certifiering" status={fsc ? 'K\u00d6PT' : 'AKTIV'} bought={!!fsc} />
                <StatusLine label="EU:s milj\u00f6lagstiftning" status={omnibus ? 'URVATTNAD' : 'INTAKT'} bought={!!omnibus} />
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
    heading: 'Det h\u00e4r var ett spel. Det h\u00e4r \u00e4r inte det.',
    text: 'Allt du just spelade \u00e4r en satir. Men den bygger p\u00e5 verkligheten. Svensk skogsindustri \u00e4r en av de m\u00e4ktigaste lobbygrupperna i Europa \u2014 och det som h\u00e4nder i v\u00e5ra skogar \u00e4r n\u00e5got de flesta aldrig ser.',
  },
  {
    heading: 'Kalhyggesbruket',
    text: 'Cirka 95% av all avverkning i Sverige \u00e4r kalhyggen. Hela skogsekosystem j\u00e4mnas med marken. Det som planteras \u00e4r monokulturer av gran i raka rader \u2014 biologiska \u00f6knar d\u00e4r n\u00e4stan ingenting annat lever. \u00d6ver 2\u00a0000 skogslevande arter \u00e4r r\u00f6dlistade i Sverige. Gammelskogen, den som aldrig kalhuggits, utg\u00f6r idag under 5% av den produktiva skogsmarken.',
  },
  {
    heading: 'Lobbyn',
    text: 'Skogsindustrierna och LRF Skogsägarna \u00e4r bland Sveriges mest inflytelserika lobbyorganisationer. De har systematiskt format ber\u00e4ttelsen om att svenskt skogsbruk \u00e4r \"h\u00e5llbart\" och \"klimatsmart\" \u2014 trots att oberoende forskning g\u00e5ng p\u00e5 g\u00e5ng visar motsatsen. Budskapen genomsyrar l\u00e4romedel, myndighetstexter och politiska debatter.',
  },
  {
    heading: 'Sv\u00e4ngd\u00f6rren',
    text: 'F\u00f6re detta politiker och myndighetschefer rekryteras regelbundet av skogsindustrin, och personer fr\u00e5n industrin hamnar i nyckelpositioner p\u00e5 myndigheter. Det skapar en kultur d\u00e4r reglering och kontroll systematiskt f\u00f6rsvagas inifr\u00e5n. Skogsstyrelsen, som ska sk\u00f6ta tillsynen, har f\u00e5tt sin budget sk\u00e4ren g\u00e5ng p\u00e5 g\u00e5ng.',
  },
  {
    heading: 'EU och Sverige',
    text: 'Sverige har aktivt motarbetat EU:s milj\u00f6lagstiftning som ber\u00f6r skog. Restaureringsf\u00f6rordningen, taxonomin, avskogningsf\u00f6rordningen \u2014 Sverige har i varje fall lobbat f\u00f6r undantag och utsp\u00e4dning, ofta p\u00e5 direkt beg\u00e4ran fr\u00e5n skogsindustrin. N\u00e4r EU f\u00f6reslog att kalhyggesbruk inte skulle klassas som h\u00e5llbart, reagerade den svenska regeringen som om det vore ett angrepp p\u00e5 nationen.',
  },
  {
    heading: 'Kina och snabbprodukter',
    text: 'En stor del av det svenska virket exporteras som r\u00e5vara eller halvfabrikat \u2014 ofta till Kina, d\u00e4r det blir engångsprodukter, pappersf\u00f6rpackningar och viskostyg till snabbmode. Tr\u00e4d som tog 60\u2013100 \u00e5r att v\u00e4xa f\u00f6rvandlas till produkter som anv\u00e4nds i minuter. Toalettpapper, n\u00e4sdukar, kartonger. Mer\u00e4rdet f\u00f6rsvinner utomlands. Kvar i Sverige finns kahyggena.',
  },
  {
    heading: 'Det finns andra s\u00e4tt',
    text: 'Hyggesfritt skogsbruk \u2014 kontinuitetsskogsbruk \u2014 beh\u00e5ller skogens struktur och ekologiska funktioner medan man fortfarande producerar virke. Selektiv avverkning, l\u00e4ngre omloppstider och fokus p\u00e5 h\u00f6gv\u00e4rdiga massivtr\u00e4produkter ist\u00e4llet f\u00f6r massa och papper ger b\u00e5de b\u00e4ttre ekonomi f\u00f6r skogs\u00e4garen och b\u00e4ttre koldioxidlagring p\u00e5 l\u00e5ng sikt. Det lagrar kol i byggmaterial i \u00e5rhundraden ist\u00e4llet f\u00f6r att elda upp det eller g\u00f6ra engångsprodukter.',
  },
  {
    heading: 'Samerna',
    text: 'Kalhyggesbruket sl\u00e5r h\u00e5rt mot rensk\u00f6tande samer. Marklavar, som renar \u00e4r beroende av f\u00f6r vinterbete, beh\u00f6ver 50\u2013100 \u00e5r f\u00f6r att \u00e5terh\u00e4mta sig efter en kalavverkning. Industrins avverkningsplaner g\u00f6rs ofta utan samr\u00e5d med samebyar. Urfolksr\u00e4ttigheterna hamnar konsekvent under industrins ekonomiska intressen.',
  },
  {
    heading: 'Klimatet',
    text: 'Industrin h\u00e4vdar att skogsbruket \u00e4r \"klimatpositivt\". Men kalhyggen frig\u00f6r enorma m\u00e4ngder markbundet kol, och det tar \u00e5rtionden innan nyplanterad skog b\u00f6rjar ta upp kol netto. N\u00e4r virket g\u00e5r till kortlivade produkter som eldas eller komposteras, \u00e5terv\u00e4nder kolet till atmosf\u00e4ren snabbt. Bokf\u00f6ringen som anv\u00e4nds f\u00f6r att visa \"klimatnytta\" har kritiserats av forskare internationellt.',
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
            V\u00e4nta.
          </p>
          <p
            className="text-[0.6rem] tracking-[0.3em] text-white/30"
            style={{ fontFamily: 'IBM Plex Mono, monospace' }}
          >
            Innan du forts\u00e4tter.
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
            Vill du veta mer? St\u00f6d de som k\u00e4mpar f\u00f6r skogen:
          </p>

          <a
            href="https://naturhansyn.se/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 mb-12 px-6 py-3 border border-white/30 text-white text-xs font-bold tracking-[0.15em] no-underline hover:bg-white/10 transition-colors"
            style={{ fontFamily: 'IBM Plex Mono, monospace' }}
          >
            F\u00d6RENINGEN NATURH\u00c4NSYN
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
              FORTS\u00c4TT SPELA
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
