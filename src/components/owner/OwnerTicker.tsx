import { useMemo } from 'react'
import { useGameStore } from '../../store/gameStore'
import { getAvailableOwnerHeadlines } from '../../data/ownerNewsLines'

export function OwnerTicker() {
  const totalSV = useGameStore(s => s.totalSkogsvardering)

  const headlines = useMemo(() => {
    const available = getAvailableOwnerHeadlines(totalSV)
    return available.slice(-6).map(h => h.text)
  }, [totalSV])

  if (headlines.length === 0) return null

  const tickerText = headlines.join('  ···  ')

  return (
    <div
      className="w-full overflow-hidden relative flex-shrink-0"
      style={{
        background: 'linear-gradient(90deg, rgba(45,106,79,0.08) 0%, rgba(45,106,79,0.03) 50%, rgba(45,106,79,0.08) 100%)',
        borderBottom: '1px solid rgba(45,106,79,0.15)',
        paddingTop: 'env(safe-area-inset-top)',
        height: 'calc(2rem + env(safe-area-inset-top))',
      }}
    >
      <div className="absolute inset-0 flex items-center animate-ticker whitespace-nowrap">
        <span className="text-sm text-[#3D2B1F]/70 tracking-wide px-4">
          {tickerText}
        </span>
        <span className="text-sm text-[#3D2B1F]/70 tracking-wide px-4">
          {tickerText}
        </span>
      </div>
    </div>
  )
}
