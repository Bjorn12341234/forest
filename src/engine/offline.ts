import type { GameState, GameEvent } from '../store/types'
import { calculateOfflineRate, getNextEventDelay } from './formulas'
import { selectEvent } from './events'

export interface OfflineResult {
  elapsedSeconds: number
  stammarGained: number
  offlineRate: number
  offlineEvents: GameEvent[]
  autoResolvedCount: number
}

const MAX_OFFLINE_EVENTS = 10

export function calculateOfflineProgress(
  state: GameState,
  eventPool: GameEvent[],
): OfflineResult {
  const now = Date.now()
  const elapsed = (now - state.lastTickAt) / 1000

  if (elapsed < 60) {
    return {
      elapsedSeconds: 0,
      stammarGained: 0,
      offlineRate: 0,
      offlineEvents: [],
      autoResolvedCount: 0,
    }
  }

  const sps = state.stammarPerSecond
  const offlineRate = calculateOfflineRate()
  const stammarGained = sps * elapsed * offlineRate

  // Generate offline event queue
  const offlineEvents: GameEvent[] = []
  let autoResolvedCount = 0

  if (state.phase >= 1) {
    const avgDelayMs = getNextEventDelay(state.phase)
    const avgDelaySec = avgDelayMs / 1000
    const potentialEvents = Math.floor(elapsed / avgDelaySec)

    const tempState = { ...state, eventHistory: [...state.eventHistory] }

    for (let i = 0; i < potentialEvents && offlineEvents.length + autoResolvedCount < MAX_OFFLINE_EVENTS; i++) {
      const event = selectEvent(tempState, eventPool)
      if (!event) break

      if (event.category === 'crisis') {
        autoResolvedCount++
        if (event.unique) {
          tempState.eventHistory.push(event.id)
        }
        continue
      }

      offlineEvents.push(event)
      if (event.unique) {
        tempState.eventHistory.push(event.id)
      }
    }
  }

  return {
    elapsedSeconds: elapsed,
    stammarGained,
    offlineRate,
    offlineEvents,
    autoResolvedCount,
  }
}

export function applyOfflineProgress(
  state: GameState,
  eventPool: GameEvent[],
): { updates: Partial<GameState>; result: OfflineResult } {
  const result = calculateOfflineProgress(state, eventPool)

  if (result.elapsedSeconds < 60) {
    return {
      updates: { lastTickAt: Date.now() },
      result,
    }
  }

  const updates: Partial<GameState> = {
    stammar: state.stammar + result.stammarGained,
    totalStammar: state.totalStammar + result.stammarGained,
    lastTickAt: Date.now(),
  }

  return { updates, result }
}
