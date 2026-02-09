import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { formatNumber, formatDuration } from '../engine/format'

interface EndScreenProps {
  onReset: () => void
}

const POST_CREDITS: string[] = [
  'Skogsstyrelsen publicerade "Makten over Skogen" (2024). Den visade att industrin kontrollerar utbildning, forskning och lagstiftning.',
  '"Frihet under ansvar" — Sveriges skogspolitik sedan 1993. Frivilliga ataganden utan tillsyn.',
  'Skogsnaringens lobbybudget uppgar till uppskattningsvis 200 Mkr per ar.',
  'Nestle avslutade samarbetet med SCA 2025 pa grund av miljoproblem.',
  'EU:s hallbarhetslagar urvattnades via Omnibus-direktivet — med svensk hjalp.',
  '63% av svenskt virke gar till massa — engangsprodukter som wellpapp och papper.',
  'Alternativa brukningsformer som hyggesfritt existerar. De svartmals systematiskt av industrin.',
  'Svangdorren mellan politik och skogsindustri ar val dokumenterad.',
  'FSC-certifiering har kallats "gron fasad" — organisationer har lamnat i protest.',
  'Kalhuggning gar att se fran rymden. Varje dag avverkas 66 hektar svensk skog.',
  '',
  'Detta var satir. Men siffrorna ar verkliga.',
  '',
  'Las mer: Skogsstyrelsen, "Makten over Skogen" (2024)',
]

export function EndScreen({ onReset }: EndScreenProps) {
  const [stage, setStage] = useState<'reveal' | 'postcredits'>('reveal')
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

  // Mark endgame as seen
  useEffect(() => {
    useGameStore.setState(s => ({
      achievements: { ...s.achievements, endgame_seen: true },
    }))
  }, [])

  // Reveal steps sequentially
  useEffect(() => {
    if (stage !== 'reveal') return
    const totalSteps = 9
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

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: POST_CREDITS.length * 2.5 + 2 }}
            onClick={onReset}
            className="mt-12 px-8 py-3 bg-white text-black text-sm font-bold tracking-wider cursor-pointer border-none hover:bg-gray-200 transition-colors"
          >
            STARTA OM
          </motion.button>
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
            ARSREDOVISNING
          </h1>
          <div className="w-16 h-px bg-gray-300 mx-auto mt-4" />
        </motion.div>

        {/* Stats rows — revealed sequentially */}
        <div className="flex flex-col gap-0">
          <RevealRow step={1} current={revealStep} label="Total stammar avverkade" value={formatNumber(totalStammar)} />
          <RevealRow step={2} current={revealStep} label="Total kapital genererat" value={`${formatNumber(kapital)} Mkr`} />
          <RevealRow step={3} current={revealStep} label="Speltid" value={formatDuration(totalPlayTime)} />

          {/* Divider: DOLD BOKFORING */}
          {revealStep >= 4 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="my-6 text-center"
            >
              <p className="text-[0.55rem] tracking-[0.4em] text-red-500 font-bold">
                — DOLD BOKFORING —
              </p>
            </motion.div>
          )}

          <RevealRow
            step={4} current={revealStep}
            label="Verkligt netto-CO\u2082"
            value={`${formatNumber(realCO2)} ton`}
            subtext={`Rapporterat: ${formatNumber(reportedCO2)} ton`}
            danger
          />
          <RevealRow
            step={5} current={revealStep}
            label="Skogsagare fick"
            value={`${formatNumber(ownerProfit)} Mkr`}
            subtext={`Industrin tjanade: ${formatNumber(industryProfit)} Mkr — Forhallande: 1:${ratio}`}
            danger
          />
          <RevealRow
            step={6} current={revealStep}
            label="Biologisk mangfald"
            value={`${biodiversity.toFixed(1)}% kvar`}
            subtext={`${species} arter forsvunna`}
            danger
          />
          <RevealRow
            step={7} current={revealStep}
            label="Samebyars betesmark"
            value={`${samiLand.toFixed(1)} km\u00B2 forlorad`}
            danger
          />

          {/* Institutional capture */}
          {revealStep >= 8 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-4 py-3 border-t border-gray-200"
            >
              <p className="text-[0.55rem] tracking-wider text-gray-400 mb-2">INSTITUTIONELL KAPNING</p>
              <div className="flex flex-col gap-1">
                <StatusLine label="Skogsstyrelsen" status={skogsstyrelsen ? 'KOPT' : 'OBEROENDE'} bought={!!skogsstyrelsen} />
                <StatusLine label="FSC-certifiering" status={fsc ? 'KOPT' : 'AKTIV'} bought={!!fsc} />
                <StatusLine label="EU:s miljolagstiftning" status={omnibus ? 'URVATNAD' : 'INTAKT'} bought={!!omnibus} />
              </div>
            </motion.div>
          )}

          {/* Antagonists summary */}
          {revealStep >= 9 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="py-3 border-t border-gray-200"
            >
              <p className="text-[0.55rem] tracking-wider text-gray-400 mb-1">NEUTRALISERADE ROSTER</p>
              <p className="text-xs text-gray-600" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
                {antagonistsCountered} av {Object.keys(antagonists).length} kritiker tystade
              </p>
            </motion.div>
          )}
        </div>

        {/* Reset button */}
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
                DELA UT VINST TILL AKTIEAGARNA
              </button>
              <p className="text-[0.5rem] text-gray-400 mt-3 italic">
                Aktieagarna fick sin utdelning. Allt annat ar detaljer.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// ── Sub-components ──

function RevealRow({ step, current, label, value, subtext, danger }: {
  step: number
  current: number
  label: string
  value: string
  subtext?: string
  danger?: boolean
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
          className={`text-sm font-bold ${danger ? 'text-red-600' : 'text-black'}`}
          style={{ fontFamily: 'IBM Plex Mono, monospace' }}
        >
          {value}
        </span>
        {subtext && (
          <p className="text-[0.5rem] text-red-400 mt-0.5">{subtext}</p>
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
      <span className={bought ? 'text-red-600 font-bold' : 'text-gray-400'}>
        {status}
      </span>
    </div>
  )
}
