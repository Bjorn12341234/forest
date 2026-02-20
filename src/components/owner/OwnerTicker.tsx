import { useMemo } from 'react'
import { useGameStore } from '../../store/gameStore'
import { getAvailableOwnerHeadlines } from '../../data/ownerNewsLines'

export function OwnerTicker() {
  const totalSV = useGameStore(s => s.totalSkogsvardering)
  // Subscribe to state slices used by dynamic headline conditions
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
    // Build a minimal state object for dynamic condition checks
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

  if (headlines.length === 0) return null

  const tickerText = headlines.join('  ···  ')

  return (
    <div
      className="w-full overflow-hidden relative flex-shrink-0"
      style={{
        background: 'linear-gradient(90deg, rgba(45,106,79,0.12) 0%, rgba(45,106,79,0.04) 30%, rgba(45,106,79,0.04) 70%, rgba(45,106,79,0.12) 100%)',
        borderBottom: '1px solid rgba(45, 106, 79, 0.2)',
        paddingTop: 'env(safe-area-inset-top)',
        height: 'calc(2rem + env(safe-area-inset-top))',
      }}
    >
      <div className="absolute inset-0 flex items-center animate-ticker whitespace-nowrap">
        <span className="text-sm text-owner-text/90 tracking-wide px-4">
          {tickerText}
        </span>
        <span className="text-sm text-owner-text/90 tracking-wide px-4">
          {tickerText}
        </span>
      </div>
    </div>
  )
}
