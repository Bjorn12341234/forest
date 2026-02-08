import { useEffect, useRef } from 'react'
import { useGameStore } from '../store/gameStore'
import { applyOfflineProgress } from '../engine/offline'
import type { OfflineResult } from '../engine/offline'
import type { GameEvent } from '../store/types'

export type { OfflineResult }

export function useOfflineCalc(
  eventPool: GameEvent[],
  onReport?: (report: OfflineResult) => void,
) {
  const hasRun = useRef(false)

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true

    const state = useGameStore.getState()
    const { updates, result } = applyOfflineProgress(state, eventPool)

    if (result.elapsedSeconds >= 60) {
      useGameStore.setState(updates)
      onReport?.(result)
    }
  }, [eventPool, onReport])
}
