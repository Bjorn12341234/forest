import { useMemo, useRef, useState, useEffect, useCallback } from 'react'
import { useGameStore } from '../store/gameStore'
import { getAvailableHeadlines } from '../data/newsTickerLines'
import { isDonator } from '../engine/donation'

const SCROLL_SPEED = 90 // pixels per second

export function Ticker() {
  const phase = useGameStore(s => s.phase)
  const totalStammar = useGameStore(s => s.totalStammar)
  const lobbyProjects = useGameStore(s => s.lobbyProjects)
  const generators = useGameStore(s => s.generators)
  const eventHistory = useGameStore(s => s.eventHistory)
  const donated = useMemo(() => isDonator(), [])

  const headlines = useMemo(() => {
    const available = getAvailableHeadlines(phase, totalStammar, lobbyProjects, generators, eventHistory, donated)
    return available.slice(-10).map(h => h.text)
  }, [phase, totalStammar, lobbyProjects, generators, eventHistory, donated])

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
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure, headlines])

  if (headlines.length === 0) return null

  const tickerText = headlines.join('  ///  ')

  return (
    <div className="w-full overflow-hidden relative flex-shrink-0"
      style={{
        background: 'linear-gradient(90deg, rgba(212, 115, 12, 0.1) 0%, rgba(212, 115, 12, 0.05) 50%, rgba(212, 115, 12, 0.1) 100%)',
        borderBottom: '1px solid rgba(212, 115, 12, 0.15)',
        paddingTop: 'env(safe-area-inset-top)',
        height: 'calc(2rem + env(safe-area-inset-top))',
      }}
    >
      {/* Game name — fixed left */}
      <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center pl-3 pr-2"
        style={{ background: 'linear-gradient(90deg, rgba(30,30,30,0.95) 70%, transparent)' }}
      >
        <span className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: '#D4730C' }}>
          TRÄD
        </span>
        <span className="ml-2.5 opacity-40 text-sm" style={{ color: '#D4730C' }}>│</span>
      </div>
      <div
        className="absolute inset-0 flex items-center whitespace-nowrap"
        style={{
          animation: `ticker-scroll ${duration}s linear infinite`,
          willChange: 'transform',
        }}
      >
        <span ref={measureRef} className="text-sm text-text-primary/80 tracking-wide pl-20 pr-8 inline-block">
          {tickerText}
        </span>
        <span className="text-sm text-text-primary/80 tracking-wide px-8 inline-block" aria-hidden="true">
          {tickerText}
        </span>
      </div>
    </div>
  )
}
