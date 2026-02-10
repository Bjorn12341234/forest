import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../../store/gameStore'
import { formatNumber, formatDuration } from '../../engine/format'

interface OwnerEndScreenProps {
  onContinue: () => void
  onReset: () => void
}

const POST_CREDITS: string[] = [
  'Du valde att l\u00e5ta skogen st\u00e5 kvar.',
  '',
  'Lavskrikan h\u00e4ckar fortfarande. Den har gjort det i tre generationer nu.',
  'Barkborren tog tre granar. Tallarna stod kvar. Bj\u00f6rkarna stod kvar.',
  '',
  'Din granne kalavverkade f\u00f6r tio \u00e5r sedan.',
  'Hans mark \u00e4r fortfarande stubbar och contortaplantage.',
  'Han fr\u00e5gade nyligen om du kunde visa honom hur du g\u00f6r.',
  '',
  'Industrins lobbybudget: 200 000 000 kr per \u00e5r.',
  'Din budget: en termos och en kikare.',
  '',
  'Du tj\u00e4nade lika mycket. Men din skog FINNS KVAR.',
  '',
  'Det \u00e4r inte nostalgi. Det \u00e4r vetenskap.',
  'Det \u00e4r inte ineffektivt. Det \u00e4r l\u00e5ngsiktigt.',
  'Det \u00e4r inte en trend. Det \u00e4r det \u00e4ldsta skogsbruket som finns.',
]

const REALITY_SECTIONS: { heading: string; text: string }[] = [
  {
    heading: 'Det h\u00e4r var ett spel. Men det \u00e4r ocks\u00e5 sant.',
    text: 'Allt du just spelade bygger p\u00e5 verkliga metoder. Hyggesfritt skogsbruk \u2014 plockhuggning, bl\u00e4dning, naturlig f\u00f6ryngring \u2014 \u00e4r inget nytt. Det \u00e4r s\u00e5 m\u00e4nniskor sk\u00f6tte skog i tusentals \u00e5r innan industriellt skogsbruk tog \u00f6ver p\u00e5 1950-talet.',
  },
  {
    heading: 'Plockhuggning fungerar',
    text: 'Forskning fr\u00e5n SLU och internationella studier visar att selektiv avverkning ger j\u00e4mf\u00f6rbar ekonomisk avkastning som kalhyggesbruk \u2014 men med 200\u2013400% h\u00f6gre biodiversitet, b\u00e4ttre kolinlagring och st\u00f6rre motst\u00e5ndskraft mot storm, torka och insektsangrepp.',
  },
  {
    heading: 'Industrins ber\u00e4ttelse',
    text: 'Den svenska skogsindustrin har systematiskt spridit budskapet att kalhyggesbruk \u00e4r det enda \"vetenskapliga\" s\u00e4ttet att sk\u00f6ta skog. Deras lobbyorganisationer finansierar forskning, skriver l\u00e4romedel och p\u00e5verkar myndigheter. Alternativa metoder har medvetet marginaliserats.',
  },
  {
    heading: 'Vad skogs\u00e4garen f\u00e5r',
    text: 'En typisk skogs\u00e4gare f\u00e5r cirka 200\u2013300 kr per kubikmeter vid f\u00f6rs\u00e4ljning till massaindustrin. Samma virke, om det f\u00e5r v\u00e4xa l\u00e4ngre och s\u00e4ljs direkt till snickerier eller byggf\u00f6retag, kan ge 3\u20135 g\u00e5nger mer. Industrin tj\u00e4nar p\u00e5 volym. Skogs\u00e4garen tj\u00e4nar p\u00e5 kvalitet.',
  },
  {
    heading: 'D\u00f6d ved = liv',
    text: '\u00d6ver 2 000 arter i svensk skog \u00e4r beroende av d\u00f6d ved. N\u00e4r industrin \"st\u00e4dar\" skogen efter avverkning, tar de bort det som hundratals svampar, insekter, lavar och f\u00e5glar beh\u00f6ver f\u00f6r att \u00f6verleva. I en naturlig skog utg\u00f6r d\u00f6d ved 20\u201330% av volymen. I en produktionsskog: n\u00e4stan noll.',
  },
  {
    heading: 'Resiliens',
    text: 'Monokulturer av gran \u00e4r extremt s\u00e5rbara f\u00f6r storm, torka och insektsangrepp. Stormen Gudrun 2005 f\u00e4llde 75 miljoner kubikmeter skog \u2014 n\u00e4stan uteslutande monokulturer. Blandskog med varierad \u00e5ldersstruktur klarar samma storm med minimala f\u00f6rluster.',
  },
  {
    heading: 'Kolinlagring',
    text: 'St\u00e5ende skog lagrar kol. Kalavverkning frig\u00f6r enorma m\u00e4ngder markbundet kol. N\u00e4r virket g\u00e5r till kortlivade produkter \u2014 massa, papper, wellpapp \u2014 \u00e5terv\u00e4nder kolet till atmosf\u00e4ren inom \u00e5r. L\u00e5ngsiktigt skogsbruk med l\u00e5nga omloppstider och massivtr\u00e4produkter lagrar kol i \u00e5rhundraden.',
  },
  {
    heading: 'Du kan g\u00f6ra skillnad',
    text: 'Om du \u00e4ger skog: fr\u00e5ga din inspekt\u00f6r om alternativ till kalhyggen. Om du inte \u00e4ger skog: st\u00f6d organisationer som arbetar f\u00f6r hyggesfritt skogsbruk. Fr\u00e5ga var ditt papper, dina m\u00f6bler och ditt byggvirke kommer ifr\u00e5n.',
  },
]

export function OwnerEndScreen({ onContinue, onReset }: OwnerEndScreenProps) {
  const [stage, setStage] = useState<'reveal' | 'postcredits' | 'reality'>('reveal')
  const [revealStep, setRevealStep] = useState(0)
  const [showButtons, setShowButtons] = useState(false)
  const [creditScroll, setCreditScroll] = useState(false)

  const totalSV = useGameStore(s => s.totalSkogsvardering)
  const biodiv = useGameStore(s => s.biodivOwner)
  const resiliens = useGameStore(s => s.resiliens)
  const realCarbon = useGameStore(s => s.realCarbonPos)
  const legacy = useGameStore(s => s.legacy)
  const kunskap = useGameStore(s => s.kunskap)
  const totalPlayTime = useGameStore(s => s.totalPlayTime)
  const attacksResisted = useGameStore(s => s.ownerAttacksResisted)
  const attacksSurrendered = useGameStore(s => s.ownerAttacksSurrendered)
  const luresDeclined = useGameStore(s => s.ownerLuresDeclined)
  const ownerGenerators = useGameStore(s => s.ownerGenerators)

  // Mark endgame seen
  useEffect(() => {
    useGameStore.setState(s => ({
      achievements: { ...s.achievements, owner_endgame_seen: true },
    }))
  }, [])

  // Sequential reveal
  useEffect(() => {
    if (stage !== 'reveal') return
    const totalSteps = 8
    const timers: ReturnType<typeof setTimeout>[] = []

    for (let i = 1; i <= totalSteps; i++) {
      timers.push(setTimeout(() => setRevealStep(i), i * 1500))
    }
    timers.push(setTimeout(() => setShowButtons(true), (totalSteps + 1) * 1500))

    return () => timers.forEach(clearTimeout)
  }, [stage])

  const handlePostCredits = useCallback(() => {
    setStage('postcredits')
    setTimeout(() => setCreditScroll(true), 500)
  }, [])

  // Derived stats
  const resistedCount = Object.values(attacksResisted).filter(Boolean).length
  const surrenderedCount = Object.values(attacksSurrendered).filter(Boolean).length
  const totalGenerators = Object.values(ownerGenerators).reduce((sum, g) => sum + g.count, 0)

  if (stage === 'reality') {
    return <OwnerRealityPage onContinue={onContinue} onReset={onReset} />
  }

  if (stage === 'postcredits') {
    return (
      <motion.div
        className="fixed inset-0 z-[200] flex flex-col items-center justify-start overflow-y-auto"
        style={{ background: '#1A2E1A' }}
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
                  i >= POST_CREDITS.length - 3 ? 'text-[#A8D5BA] font-bold' :
                  'text-[#A8D5BA]/70'
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
              className="px-8 py-3 text-sm font-bold tracking-wider cursor-pointer border-none transition-colors"
              style={{
                background: '#2D6A4F',
                color: '#F5F0E8',
                fontFamily: 'IBM Plex Mono, monospace',
              }}
            >
              L\u00c4S MER
            </button>
            <button
              onClick={onReset}
              className="px-4 py-1 bg-transparent text-[#A8D5BA]/20 text-[0.5rem] tracking-wider cursor-pointer border-none hover:text-[#A8D5BA]/40 transition-colors"
            >
              starta om
            </button>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  // ── Reveal Stage ──
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto"
      style={{ background: '#F5F0E8' }}
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
          <p className="text-[0.6rem] tracking-[0.3em] text-[#3D2B1F]/40 mb-2">SKOGS\u00c4GARENS</p>
          <h1
            className="text-2xl font-bold tracking-wider text-[#2D6A4F]"
            style={{ fontFamily: 'IBM Plex Mono, monospace' }}
          >
            GENERATIONSARV
          </h1>
          <div className="w-16 h-px bg-[#2D6A4F]/30 mx-auto mt-4" />
        </motion.div>

        {/* Stats */}
        <div className="flex flex-col gap-0">
          <OwnerRevealRow step={1} current={revealStep} label="Skogsv\u00e4rdering" value={formatNumber(totalSV)} />
          <OwnerRevealRow step={2} current={revealStep} label="Speltid" value={formatDuration(totalPlayTime)} />
          <OwnerRevealRow step={3} current={revealStep} label="Generationsarv" value={formatNumber(legacy)} />

          {revealStep >= 4 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="my-6 text-center"
            >
              <p className="text-[0.55rem] tracking-[0.4em] text-[#2D6A4F]/60 font-bold">
                \u2014 SKOGENS TILLST\u00c5ND \u2014
              </p>
            </motion.div>
          )}

          <OwnerRevealRow
            step={4} current={revealStep}
            label="Biodiversitet"
            value={`${biodiv.toFixed(1)} arter`}
            subtext="Lavskrikan h\u00e4ckar. Talltickan \u00e4r tillbaka."
          />
          <OwnerRevealRow
            step={5} current={revealStep}
            label="Resiliens"
            value={`${resiliens.toFixed(0)}%`}
            subtext="Din skog klarar stormar, torka och barkborrar."
          />
          <OwnerRevealRow
            step={6} current={revealStep}
            label="Verklig kolinlagring"
            value={`${formatNumber(realCarbon)} ton`}
            subtext="Inte industrins kreativa bokf\u00f6ring. Verkligt lagrad kol."
          />
          <OwnerRevealRow
            step={7} current={revealStep}
            label="Kunskap"
            value={formatNumber(kunskap)}
            subtext={`${totalGenerators} ekologiska processer aktiva`}
          />

          {/* Resistance summary */}
          {revealStep >= 8 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-4 py-3 border-t border-[#2D6A4F]/15"
            >
              <p className="text-[0.55rem] tracking-wider text-[#3D2B1F]/40 mb-2">MOTST\u00c5ND MOT INDUSTRIN</p>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-xs" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
                  <span className="text-[#3D2B1F]/50">Attacker motst\u00e5dda</span>
                  <span className="text-[#2D6A4F] font-bold">{resistedCount}</span>
                </div>
                {surrenderedCount > 0 && (
                  <div className="flex justify-between items-center text-xs" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
                    <span className="text-[#3D2B1F]/50">Attacker accepterade</span>
                    <span className="text-[#CC3333]/70">{surrenderedCount}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-xs" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
                  <span className="text-[#3D2B1F]/50">Lockelser avb\u00f6jda</span>
                  <span className="text-[#2D6A4F] font-bold">{luresDeclined}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Buttons */}
        <AnimatePresence>
          {showButtons && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-10 text-center"
            >
              <div className="w-16 h-px bg-[#2D6A4F]/20 mx-auto mb-6" />
              <button
                onClick={handlePostCredits}
                className="px-8 py-3 text-xs font-bold tracking-[0.2em] cursor-pointer border-none transition-colors"
                style={{
                  background: '#2D6A4F',
                  color: '#F5F0E8',
                  fontFamily: 'IBM Plex Mono, monospace',
                }}
              >
                L\u00c4MNA SKOGEN TILL N\u00c4STA GENERATION
              </button>
              <p className="text-[0.5rem] text-[#3D2B1F]/40 mt-3 italic">
                Dina barnbarn \u00e4rver en skog, inte ett plantage.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// ── Sub-components ──

function OwnerRevealRow({ step, current, label, value, subtext }: {
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
      className="py-2.5 border-b border-[#2D6A4F]/10 flex justify-between items-baseline gap-4"
    >
      <span className="text-xs text-[#3D2B1F]/50" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
        {label}
      </span>
      <div className="text-right">
        <span
          className="text-sm font-bold text-[#2D6A4F]"
          style={{ fontFamily: 'IBM Plex Mono, monospace' }}
        >
          {value}
        </span>
        {subtext && (
          <p className="text-[0.5rem] text-[#3D2B1F]/35 mt-0.5">{subtext}</p>
        )}
      </div>
    </motion.div>
  )
}

// ── Reality Page ──

function OwnerRealityPage({ onContinue, onReset }: { onContinue: () => void; onReset: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[200] overflow-y-auto"
      style={{ background: '#1A2E1A' }}
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
          <div className="w-12 h-px bg-[#A8D5BA]/20 mx-auto mb-8" />
          <p
            className="text-[0.6rem] tracking-[0.4em] text-[#A8D5BA]/40 mb-3 uppercase"
            style={{ fontFamily: 'IBM Plex Mono, monospace' }}
          >
            Verkligheten.
          </p>
          <p
            className="text-[0.6rem] tracking-[0.3em] text-[#A8D5BA]/30"
            style={{ fontFamily: 'IBM Plex Mono, monospace' }}
          >
            Det h\u00e4r \u00e4r inte ett spel l\u00e4ngre.
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
              className={`text-sm font-bold mb-3 ${i === 0 ? 'text-[#A8D5BA]' : 'text-[#A8D5BA]/80'}`}
              style={{ fontFamily: 'IBM Plex Mono, monospace' }}
            >
              {section.heading}
            </h3>
            <p
              className="text-xs leading-relaxed text-[#A8D5BA]/50"
              style={{ fontFamily: 'IBM Plex Mono, monospace' }}
            >
              {section.text}
            </p>
            {i < REALITY_SECTIONS.length - 1 && (
              <div className="w-8 h-px bg-[#A8D5BA]/10 mt-10" />
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
          <div className="w-12 h-px bg-[#A8D5BA]/20 mx-auto mb-10" />

          <p
            className="text-xs text-[#A8D5BA]/60 leading-relaxed mb-2"
            style={{ fontFamily: 'IBM Plex Mono, monospace' }}
          >
            Vill du veta mer? St\u00f6d de som k\u00e4mpar f\u00f6r skogen:
          </p>

          <a
            href="https://naturhansyn.se/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 mb-12 px-6 py-3 border border-[#2D6A4F] text-[#A8D5BA] text-xs font-bold tracking-[0.15em] no-underline hover:bg-[#2D6A4F]/20 transition-colors"
            style={{ fontFamily: 'IBM Plex Mono, monospace' }}
          >
            F\u00d6RENINGEN NATURH\u00c4NSYN
          </a>

          <p
            className="text-[0.55rem] text-[#A8D5BA]/25 leading-relaxed mb-12"
            style={{ fontFamily: 'IBM Plex Mono, monospace' }}
          >
            naturhansyn.se
          </p>

          <div className="w-8 h-px bg-[#A8D5BA]/10 mx-auto mb-10" />

          <div className="flex flex-col gap-4 items-center">
            <button
              onClick={onContinue}
              className="px-8 py-3 text-xs font-bold tracking-wider cursor-pointer border transition-colors"
              style={{
                background: 'rgba(45,106,79,0.15)',
                borderColor: 'rgba(45,106,79,0.4)',
                color: '#A8D5BA',
                fontFamily: 'IBM Plex Mono, monospace',
              }}
            >
              FORTS\u00c4TT V\u00c5RDA SKOGEN
            </button>
            <button
              onClick={onReset}
              className="px-4 py-1 bg-transparent text-[#A8D5BA]/20 text-[0.5rem] tracking-wider cursor-pointer border-none hover:text-[#A8D5BA]/40 transition-colors"
            >
              starta om
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
