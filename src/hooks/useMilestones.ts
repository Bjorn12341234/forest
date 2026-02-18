import { useEffect, useRef } from 'react'
import { useGameStore } from '../store/gameStore'
import { playMilestoneDing } from '../engine/audio'
import { formatNumber } from '../engine/format'

export interface MilestoneToast {
  id: number
  text: string
  isOwner: boolean
}

// Industry stammar milestones
const STAMMAR_MILESTONES = [
  1_000, 10_000, 100_000, 1_000_000, 10_000_000,
  100_000_000, 1_000_000_000, 10_000_000_000, 100_000_000_000, 1_000_000_000_000,
]

// Owner sv milestones
const SV_MILESTONES = [
  1_000, 5_000, 10_000, 25_000, 50_000, 100_000, 200_000,
]

let milestoneToastId = 0

export function useMilestones(
  onToast: (toast: MilestoneToast) => void
) {
  const gameMode = useGameStore(s => s.gameMode)
  const totalStammar = useGameStore(s => s.totalStammar)
  const totalSV = useGameStore(s => s.totalSkogsvardering)
  const milestonesSeen = useGameStore(s => s.milestonesSeen)
  const pendingTransition = useGameStore(s => s.pendingTransition)
  const markMilestoneSeen = useGameStore(s => s.markMilestoneSeen)

  // Track last transition time to suppress milestones within 5s
  const lastTransitionAt = useRef(0)

  useEffect(() => {
    if (pendingTransition) {
      lastTransitionAt.current = Date.now()
    }
  }, [pendingTransition])

  // Industry milestones
  useEffect(() => {
    if (gameMode !== 'industry') return
    if (pendingTransition) return
    if (Date.now() - lastTransitionAt.current < 5000) return

    for (const ms of STAMMAR_MILESTONES) {
      const key = `stammar_${ms}`
      if (totalStammar >= ms && !milestonesSeen[key]) {
        markMilestoneSeen(key)
        playMilestoneDing()
        onToast({
          id: ++milestoneToastId,
          text: `🪵 ${formatNumber(ms)} STAMMAR`,
          isOwner: false,
        })
        break // one at a time
      }
    }
  }, [totalStammar, gameMode, milestonesSeen, pendingTransition, markMilestoneSeen, onToast])

  // Owner milestones
  useEffect(() => {
    if (gameMode !== 'owner') return

    for (const ms of SV_MILESTONES) {
      const key = `sv_${ms}`
      if (totalSV >= ms && !milestonesSeen[key]) {
        markMilestoneSeen(key)
        playMilestoneDing()
        onToast({
          id: ++milestoneToastId,
          text: `🌲 ${formatNumber(ms)} SKOGSVÄRDE`,
          isOwner: true,
        })
        break
      }
    }
  }, [totalSV, gameMode, milestonesSeen, markMilestoneSeen, onToast])
}
