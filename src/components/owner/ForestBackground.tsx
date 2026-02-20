import { lazy, Suspense, useMemo } from 'react'
import { useGameStore } from '../../store/gameStore'

// Lazy-load canvas to keep it out of the initial bundle
const ForestCanvas = lazy(() => import('./ForestCanvas'))

// Check reduced motion preference
function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Check if device is likely low-powered
function isLowPowerDevice(): boolean {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  const lowCores = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 2 : false
  return isMobile || lowCores
}

export function ForestBackground() {
  const totalSV = useGameStore(s => s.totalSkogsvardering)
  const biodivOwner = useGameStore(s => s.biodivOwner)
  const activeAttack = useGameStore(s => s.activeIndustryAttack)

  const reducedMotion = useMemo(() => prefersReducedMotion(), [])
  const lowPower = useMemo(() => isLowPowerDevice(), [])

  // Static fallback for reduced motion
  if (reducedMotion) {
    return <StaticForestBackground />
  }

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    >
      <Suspense fallback={<StaticForestBackground />}>
        <ForestCanvas
          totalSV={totalSV}
          biodiv={biodivOwner}
          isAttacked={!!activeAttack}
          lowPower={lowPower}
        />
      </Suspense>
    </div>
  )
}

// Static CSS fallback — gradient-based forest impression
function StaticForestBackground() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
      style={{
        background: `
          linear-gradient(to bottom, rgba(26,38,24,0) 0%, rgba(26,38,24,0.15) 100%)
        `,
      }}
    />
  )
}
