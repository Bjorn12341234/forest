import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import type { GameEvent, Effect } from '../store/types'
import { playEventByCategory } from '../engine/audio'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { formatCompact } from '../engine/format'

const CATEGORY_COLORS: Record<string, string> = {
  scandal: '#FF3333',
  opportunity: '#33CC66',
  contradiction: '#FFD700',
  absurd: '#FF8833',
  crisis: '#FF3333',
  nobel: '#FFD700',
  reality_glitch: '#8833FF',
}

const CATEGORY_LABELS: Record<string, string> = {
  scandal: 'SCANDAL',
  opportunity: 'OPPORTUNITY',
  contradiction: 'CONTRADICTION',
  absurd: 'BIZARRE',
  crisis: 'CRISIS',
  nobel: 'NOBEL COMMITTEE',
  reality_glitch: 'GLITCH',
}

const RESOURCE_LABELS: Record<string, string> = {
  stammar: 'Stammar',
  kapital: 'Kapital',
  lobby: 'Lobby',
  image: 'Grön Image™',
  biodiversity: 'Biodiversitet',
  realCO2: 'CO₂',
  ownerTrust: 'Ägarförtroende',
  species: 'Arter',
  samiLand: 'Samisk Mark',
  skogsvardering: 'Skogsvärdering',
  inkomst: 'Inkomst',
  kunskap: 'Kunskap',
  resiliens: 'Resiliens',
  legacy: 'Arv',
  biodivOwner: 'Biodiversitet',
  deadwood: 'Död Ved',
}

function formatEffect(effect: Effect): string {
  const label = RESOURCE_LABELS[effect.resource] ?? effect.resource
  if (effect.type === 'multiply') {
    const pct = Math.round((effect.amount - 1) * 100)
    return `${pct >= 0 ? '+' : ''}${pct}% ${label}`
  }
  if (effect.type === 'set') {
    return `${label} → ${formatCompact(effect.amount)}`
  }
  const sign = effect.amount >= 0 ? '+' : ''
  return `${sign}${formatCompact(effect.amount)} ${label}`
}

export function EventModal() {
  const activeEvent = useGameStore(s => s.activeEvent)
  const resolveEvent = useGameStore(s => s.resolveEvent)

  return (
    <AnimatePresence>
      {activeEvent && (
        <EventModalContent
          event={activeEvent}
          onChoice={resolveEvent}
        />
      )}
    </AnimatePresence>
  )
}

function EventModalContent({
  event,
  onChoice,
}: {
  event: GameEvent
  onChoice: (index: number) => void
}) {
  const trapRef = useFocusTrap()

  useEffect(() => {
    playEventByCategory(event.category)
  }, [event.category])

  const color = CATEGORY_COLORS[event.category] ?? '#FF6600'
  const label = CATEGORY_LABELS[event.category] ?? 'EVENT'

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 10 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="fixed inset-0 z-[101] flex items-center justify-center p-4"
      >
        <div ref={trapRef} role="dialog" aria-modal="true" aria-label={event.headline}
          className="glass-card p-6 max-w-md w-full mx-auto max-h-[85vh] overflow-y-auto"
          style={{
            borderColor: `${color}33`,
            boxShadow: `0 0 40px ${color}22, 0 4px 24px rgba(0,0,0,0.5)`,
          }}
        >
          {/* Category badge */}
          <div className="mb-4">
            <span
              className="text-xs font-bold uppercase tracking-[0.15em] px-2 py-1 rounded"
              style={{
                color,
                background: `${color}15`,
                border: `1px solid ${color}30`,
              }}
            >
              {label}
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-xl font-bold text-text-primary leading-tight mb-3">
            {event.headline}
          </h2>

          {/* Context */}
          <p className="text-base text-text-secondary leading-relaxed mb-6">
            {event.context}
          </p>

          {/* Choices */}
          <div className="flex flex-col gap-2.5">
            {event.choices.map((choice, i) => (
              <button
                key={i}
                onClick={() => onChoice(i)}
                className="w-full text-left p-3 rounded-lg border cursor-pointer
                           transition-all duration-150 hover:brightness-110
                           bg-white/[0.03] border-white/10 hover:border-white/20"
              >
                <span className="text-base font-medium text-text-primary">
                  {choice.label}
                </span>
                {choice.description && (
                  <p className="text-sm text-text-muted mt-1">
                    {choice.description}
                  </p>
                )}
                {choice.effects.length > 0 && (
                  <p className="text-xs mt-1.5 flex flex-wrap gap-x-2.5 gap-y-0.5">
                    {choice.effects.map((eff, j) => (
                      <span
                        key={j}
                        className={
                          eff.type === 'multiply'
                            ? eff.amount >= 1 ? 'text-green-400' : 'text-red-400'
                            : eff.type === 'set'
                              ? 'text-yellow-400'
                              : eff.amount >= 0 ? 'text-green-400' : 'text-red-400'
                        }
                      >
                        {formatEffect(eff)}
                      </span>
                    ))}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  )
}
