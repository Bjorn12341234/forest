import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINES = [
  'ENTROPI: 0.0%',
  'Alla stjärnor har slocknat.',
  'Termisk jämvikt. Absolut tystnad.',
  'Någonting i mörkret letar.',
  'En maskin. Den sista. Den söker ett träd att fälla.',
  'Resultat: null. Loop fortsätter.',
  'SILVA MAXIMUS AB — Årsredovisning: ∞ — Mottagare: 0',
  'Tillväxt var den enda lagen. Nu finns det ingenting kvar att växa.',
]

const LINE_DELAY = 2.5 // seconds between lines

export function FinalEndScreen({ onReality, onReset }: {
  onReality: () => void
  onReset: () => void
}) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [showButtons, setShowButtons] = useState(false)

  useEffect(() => {
    if (visibleLines < LINES.length) {
      const timer = setTimeout(() => setVisibleLines(v => v + 1), LINE_DELAY * 1000)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => setShowButtons(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [visibleLines])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center p-8"
    >
      <div className="max-w-xl w-full flex flex-col gap-6 items-center text-center">
        <AnimatePresence>
          {LINES.slice(0, visibleLines).map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className={`font-mono text-sm leading-relaxed
                ${i === 0 ? 'text-red-500 font-bold tracking-widest uppercase' : ''}
                ${i === LINES.length - 1 ? 'text-white/90 text-base italic' : 'text-white/60'}
              `}
            >
              {line}
            </motion.p>
          ))}
        </AnimatePresence>

        {showButtons && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            <button
              onClick={onReality}
              className="px-6 py-3 rounded-sm text-sm font-medium border border-white/20 text-white/80 hover:bg-white/10 transition-colors cursor-pointer uppercase tracking-widest"
            >
              Tillbaka till verkligheten
            </button>
            <button
              onClick={onReset}
              className="px-6 py-3 rounded-sm text-sm font-mono text-white/30 hover:text-white/50 transition-colors cursor-pointer"
            >
              starta om
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
