import { useMemo } from 'react'
import { useGameStore } from '../store/gameStore'
import { getAvailableHeadlines } from '../data/newsTickerLines'

export function Ticker() {
  const phase = useGameStore(s => s.phase)
  const totalStammar = useGameStore(s => s.totalStammar)
  const lobbyProjects = useGameStore(s => s.lobbyProjects)
  const generators = useGameStore(s => s.generators)
  const eventHistory = useGameStore(s => s.eventHistory)

  const headlines = useMemo(() => {
    const available = getAvailableHeadlines(phase, totalStammar, lobbyProjects, generators, eventHistory)
    // Show the most recent 6 headlines (latest phases first, then by array order)
    return available.slice(-6).map(h => h.text)
  }, [phase, totalStammar, lobbyProjects, generators, eventHistory])

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
      <div className="absolute inset-0 flex items-center animate-ticker whitespace-nowrap">
        <span className="text-[0.75rem] text-text-primary/80 tracking-wide px-4">
          {tickerText}
        </span>
        <span className="text-[0.75rem] text-text-primary/80 tracking-wide px-4">
          {tickerText}
        </span>
      </div>
    </div>
  )
}
