import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../../store/gameStore'
import { formatNumber, formatDuration } from '../../engine/format'

interface OwnerEndScreenProps {
  onContinue: () => void
  onReset: () => void
}

const POST_CREDITS: string[] = [
  'Du valde att låta skogen stå kvar.',
  '',
  'Lavskrikan häckar fortfarande. Den har gjort det i tre generationer nu.',
  'Barkborren tog tre granar. Tallarna stod kvar. Björkarna stod kvar.',
  '',
  'Din granne kalavverkade för tio år sedan.',
  'Hans mark är fortfarande stubbar och contortaplantage.',
  'Han frågade nyligen om du kunde visa honom hur du gör.',
  '',
  'Industrins lobbybudget: 200 000 000 kr per år.',
  'Din budget: en termos och en kikare.',
  '',
  'Du tjänade lika mycket. Men din skog FINNS KVAR.',
  '',
  'Det är inte nostalgi. Det är vetenskap.',
  'Det är inte ineffektivt. Det är långsiktigt.',
  'Det är inte en trend. Det är det äldsta skogsbruket som finns.',
]

const REALITY_SECTIONS: { heading: string; text: string }[] = [
  {
    heading: 'Det här var ett spel. Men det är också sant.',
    text: 'Allt du just spelade bygger på verkliga metoder. Hyggesfritt skogsbruk — plockhuggning, blädning, naturlig föryngring — är inget nytt. Det är så människor skötte skog i tusentals år innan industriellt skogsbruk tog över på 1950-talet.',
  },
  {
    heading: 'Plockhuggning fungerar',
    text: 'Forskning från SLU och internationella studier visar att selektiv avverkning ger jämförbar ekonomisk avkastning som kalhyggesbruk — men med 200–400% högre biodiversitet, bättre kolinlagring och större motståndskraft mot storm, torka och insektsangrepp.',
  },
  {
    heading: 'Industrins berättelse',
    text: 'Den svenska skogsindustrin har systematiskt spridit budskapet att kalhyggesbruk är det enda \"vetenskapliga\" sättet att sköta skog. Deras lobbyorganisationer finansierar forskning, skriver läromedel och påverkar myndigheter. Alternativa metoder har medvetet marginaliserats.',
  },
  {
    heading: 'Vad skogsägaren får',
    text: 'En typisk skogsägare får cirka 200–300 kr per kubikmeter vid försäljning till massaindustrin. Samma virke, om det får växa längre och säljs direkt till snickerier eller byggföretag, kan ge 3–5 gånger mer. Industrin tjänar på volym. Skogsägaren tjänar på kvalitet.',
  },
  {
    heading: 'Död ved = liv',
    text: 'Över 2 000 arter i svensk skog är beroende av död ved. När industrin \"städar\" skogen efter avverkning, tar de bort det som hundratals svampar, insekter, lavar och fåglar behöver för att överleva. I en naturlig skog utgör död ved 20–30% av volymen. I en produktionsskog: nästan noll.',
  },
  {
    heading: 'Resiliens',
    text: 'Monokulturer av gran är extremt sårbara för storm, torka och insektsangrepp. Stormen Gudrun 2005 fällde 75 miljoner kubikmeter skog — nästan uteslutande monokulturer. Blandskog med varierad åldersstruktur klarar samma storm med minimala förluster.',
  },
  {
    heading: 'Kolinlagring',
    text: 'Stående skog lagrar kol. Kalavverkning frigör enorma mängder markbundet kol. När virket går till kortlivade produkter — massa, papper, wellpapp — återvänder kolet till atmosfären inom år. Långsiktigt skogsbruk med långa omloppstider och massivträprodukter lagrar kol i århundraden.',
  },
  {
    heading: 'Du kan göra skillnad',
    text: 'Om du äger skog: fråga din inspektör om alternativ till kalhyggen. Om du inte äger skog: stöd organisationer som arbetar för hyggesfritt skogsbruk. Fråga var ditt papper, dina möbler och ditt byggvirke kommer ifrån.',
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
              LÄS MER
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
          <p className="text-[0.6rem] tracking-[0.3em] text-[#3D2B1F]/40 mb-2">SKOGSÄGARENS</p>
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
          <OwnerRevealRow step={1} current={revealStep} label="Skogsvärdering" value={formatNumber(totalSV)} />
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
                — SKOGENS TILLSTÅND —
              </p>
            </motion.div>
          )}

          <OwnerRevealRow
            step={4} current={revealStep}
            label="Biodiversitet"
            value={`${biodiv.toFixed(1)} arter`}
            subtext="Lavskrikan häckar. Talltickan är tillbaka."
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
            subtext="Inte industrins kreativa bokföring. Verkligt lagrad kol."
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
              <p className="text-[0.55rem] tracking-wider text-[#3D2B1F]/40 mb-2">MOTSTÅND MOT INDUSTRIN</p>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-xs" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
                  <span className="text-[#3D2B1F]/50">Attacker motstådda</span>
                  <span className="text-[#2D6A4F] font-bold">{resistedCount}</span>
                </div>
                {surrenderedCount > 0 && (
                  <div className="flex justify-between items-center text-xs" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
                    <span className="text-[#3D2B1F]/50">Attacker accepterade</span>
                    <span className="text-[#CC3333]/70">{surrenderedCount}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-xs" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
                  <span className="text-[#3D2B1F]/50">Lockelser avböjda</span>
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
                LÄMNA SKOGEN TILL NÄSTA GENERATION
              </button>
              <p className="text-[0.5rem] text-[#3D2B1F]/40 mt-3 italic">
                Dina barnbarn ärver en skog, inte ett plantage.
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
            Det här är inte ett spel längre.
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
            Vill du veta mer? Stöd de som kämpar för skogen:
          </p>

          <a
            href="https://naturhansyn.se/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 mb-12 px-6 py-3 border border-[#2D6A4F] text-[#A8D5BA] text-xs font-bold tracking-[0.15em] no-underline hover:bg-[#2D6A4F]/20 transition-colors"
            style={{ fontFamily: 'IBM Plex Mono, monospace' }}
          >
            FÖRENINGEN NATURHÄNSYN
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
              FORTSÄTT VÅRDA SKOGEN
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
