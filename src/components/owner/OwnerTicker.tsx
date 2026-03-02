import { useMemo, useRef, useState, useEffect, useCallback } from 'react'
import { useGameStore } from '../../store/gameStore'
import { getAvailableOwnerHeadlines } from '../../data/ownerNewsLines'
import { isDonator } from '../../engine/donation'

const SCROLL_SPEED = 90 // pixels per second

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
  const donated = useMemo(() => isDonator(), [])

  const headlines = useMemo(() => {
    const stateSlice = {
      totalSkogsvardering: totalSV,
      biodivOwner, legacy, kunskap, resiliens,
      realCarbonPos, deadwood,
      ownerAttacksResisted, ownerLuresDeclined, ownerLuresAccepted,
      ownerGenerators,
    }
    const available = getAvailableOwnerHeadlines(totalSV, stateSlice as Parameters<typeof getAvailableOwnerHeadlines>[1], donated)
    return available.slice(-10).map(h => h.text)
  }, [totalSV, biodivOwner, legacy, kunskap, resiliens, realCarbonPos, deadwood,
      ownerAttacksResisted, ownerLuresDeclined, ownerLuresAccepted, ownerGenerators, donated])

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
        background: '#111111',
        borderBottom: '1px solid rgba(94, 158, 110, 0.12)',
        paddingTop: 'env(safe-area-inset-top)',
        height: 'calc(2rem + env(safe-area-inset-top))',
      }}
    >
      {/* Game name — fixed left */}
      <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center pl-3 pr-2"
        style={{ background: 'linear-gradient(90deg, #111111 70%, transparent)' }}
      >
        <span className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: '#5E9E6E' }}>
          TRÄD
        </span>
        <span className="ml-2.5 opacity-40 text-sm" style={{ color: '#5E9E6E' }}>│</span>
      </div>
      <div
        className="absolute inset-0 flex items-center whitespace-nowrap"
        style={{
          animation: `ticker-scroll ${duration}s linear infinite`,
          willChange: 'transform',
        }}
      >
        <span ref={measureRef} className="text-sm text-owner-text/90 tracking-wide pl-20 pr-8 inline-block">
          {tickerText}
        </span>
        <span className="text-sm text-owner-text/90 tracking-wide px-8 inline-block" aria-hidden="true">
          {tickerText}
        </span>
      </div>
    </div>
  )
}
