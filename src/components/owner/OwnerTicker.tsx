import { useMemo, useRef, useState, useEffect, useCallback } from 'react'
import { useGameStore } from '../../store/gameStore'
import { getAvailableOwnerHeadlines } from '../../data/ownerNewsLines'

const SCROLL_SPEED = 50 // pixels per second

export function OwnerTicker() {
  const totalSV = useGameStore(s => s.totalSkogsvardering)
  const biodivOwner = useGameStore(s => s.biodivOwner)
  const legacy = useGameStore(s => s.legacy)
  const kunskap = useGameStore(s => s.kunskap)
  const resiliens = useGameStore(s => s.resiliens)
  const realCarbonPos = useGameStore(s => s.realCarbonPos)
  const deadwood = useGameStore(s => s.deadwood)
  const ownerAttacksResisted = useGameStore(s => s.ownerAttacksResisted)
  const ownerLuresDeclined = useGameStore(s => s.ownerLuresDeclined)
  const ownerLuresAccepted = useGameStore(s => s.ownerLuresAccepted)
  const ownerGenerators = useGameStore(s => s.ownerGenerators)

  const headlines = useMemo(() => {
    const stateSlice = {
      totalSkogsvardering: totalSV,
      biodivOwner, legacy, kunskap, resiliens,
      realCarbonPos, deadwood,
      ownerAttacksResisted, ownerLuresDeclined, ownerLuresAccepted,
      ownerGenerators,
    }
    const available = getAvailableOwnerHeadlines(totalSV, stateSlice as Parameters<typeof getAvailableOwnerHeadlines>[1])
    return available.slice(-6).map(h => h.text)
  }, [totalSV, biodivOwner, legacy, kunskap, resiliens, realCarbonPos, deadwood,
      ownerAttacksResisted, ownerLuresDeclined, ownerLuresAccepted, ownerGenerators])

  const measureRef = useRef<HTMLSpanElement>(null)
  const [duration, setDuration] = useState(30)

  const measure = useCallback(() => {
    if (!measureRef.current) return
    const textWidth = measureRef.current.scrollWidth
    if (textWidth > 0) {
      setDuration(Math.max(12, textWidth / SCROLL_SPEED))
    }
  }, [])

  useEffect(() => {
    measure()
    // Re-measure on resize (mobile orientation change etc)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure, headlines])

  if (headlines.length === 0) return null

  const tickerText = headlines.join('  ···  ')

  return (
    <div
      className="w-full overflow-hidden relative flex-shrink-0"
      style={{
        background: 'linear-gradient(90deg, rgba(var(--color-owner-accent-rgb),0.15) 0%, rgba(var(--color-owner-accent-rgb),0.04) 30%, rgba(var(--color-owner-accent-rgb),0.04) 70%, rgba(var(--color-owner-accent-rgb),0.15) 100%)',
        borderBottom: '1px solid rgba(var(--color-owner-accent-rgb), 0.2)',
        paddingTop: 'env(safe-area-inset-top)',
        height: 'calc(2rem + env(safe-area-inset-top))',
      }}
    >
      <div
        className="absolute inset-0 flex items-center whitespace-nowrap"
        style={{
          animation: `ticker-scroll ${duration}s linear infinite`,
          willChange: 'transform',
        }}
      >
        <span ref={measureRef} className="text-sm text-owner-text/90 tracking-wide px-8 inline-block">
          {tickerText}
        </span>
        <span className="text-sm text-owner-text/90 tracking-wide px-8 inline-block" aria-hidden="true">
          {tickerText}
        </span>
      </div>
    </div>
  )
}
