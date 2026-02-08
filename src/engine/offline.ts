import type { GameState, GameEvent } from '../store/types'
import { calculateGPS, calculateOfflineRate, calculateNetLegitimacyChange, getNextEventDelay } from './formulas'
import { selectEvent } from './events'

export interface OfflineResult {
  elapsedSeconds: number
  greatnessGained: number
  offlineRate: number
  legitimacyBefore: number
  legitimacyAfter: number
  legitimacyCritical: boolean
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
      greatnessGained: 0,
      offlineRate: 0,
      legitimacyBefore: state.legitimacy,
      legitimacyAfter: state.legitimacy,
      legitimacyCritical: false,
      offlineEvents: [],
      autoResolvedCount: 0,
    }
  }

  const gps = calculateGPS(state)
  const offlineRate = calculateOfflineRate(state)
  const greatnessGained = gps * elapsed * offlineRate

  // Estimate legitimacy change during offline
  const legitimacyBefore = state.legitimacy
  const netLegitimacyPerSec = calculateNetLegitimacyChange(state)
  const legitimacyChange = netLegitimacyPerSec * elapsed
  const hasGoldenConstant = state.prestigeUpgrades['the_golden_constant']
  const floor = hasGoldenConstant ? 25 : 0
  const legitimacyAfter = Math.max(floor, Math.min(100, legitimacyBefore + legitimacyChange))
  const legitimacyCritical = legitimacyAfter < 25

  // Generate offline event queue
  const offlineEvents: GameEvent[] = []
  let autoResolvedCount = 0

  if (state.phase >= 1) {
    // Simulate event scheduling across the offline period
    const avgDelayMs = getNextEventDelay(state.phase, state)
    const avgDelaySec = avgDelayMs / 1000
    const potentialEvents = Math.floor(elapsed / avgDelaySec)

    // Clone a temporary state for event selection to avoid picking same unique event
    const tempState = { ...state, eventHistory: [...state.eventHistory] }

    for (let i = 0; i < potentialEvents && offlineEvents.length + autoResolvedCount < MAX_OFFLINE_EVENTS; i++) {
      const event = selectEvent(tempState, eventPool)
      if (!event) break

      // Auto-resolve crisis/scandal events if legitimacy is critical
      if (legitimacyCritical && (event.category === 'crisis' || event.category === 'scandal')) {
        // Auto-resolve: pick the least harmful choice (last one is usually safest)
        autoResolvedCount++
        if (event.unique) {
          tempState.eventHistory.push(event.id)
        }
        continue
      }

      offlineEvents.push(event)
      // Mark unique events so they don't get picked again
      if (event.unique) {
        tempState.eventHistory.push(event.id)
      }
    }
  }

  return {
    elapsedSeconds: elapsed,
    greatnessGained,
    offlineRate,
    legitimacyBefore,
    legitimacyAfter,
    legitimacyCritical,
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
    greatness: state.greatness + result.greatnessGained,
    legitimacy: result.legitimacyAfter,
    lastTickAt: Date.now(),
  }

  return { updates, result }
}
