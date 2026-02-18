import type { GameState, GameEvent, EventCondition } from '../store/types'
import { getNextEventDelay } from './formulas'

// Category weights for random selection
const CATEGORY_WEIGHTS: Record<string, number> = {
  opportunity: 3,
  scandal: 2,
  absurd: 2,
  contradiction: 1.5,
  crisis: 1,
  nobel: 0.5,
  reality_glitch: 0.5,
}

// ── Phase-based event pool cache ──
// Pre-filters events by phase/maxPhase so we only run condition checks on candidates
let cachedPhase = -1
let cachedPool: GameEvent[] = []
let cachedFullPool: GameEvent[] = []

function getPhaseFilteredPool(phase: number, eventPool: GameEvent[]): GameEvent[] {
  // Invalidate if phase changed or pool changed (different array ref)
  if (phase === cachedPhase && eventPool === cachedFullPool) return cachedPool
  cachedPhase = phase
  cachedFullPool = eventPool
  cachedPool = eventPool.filter(e => e.phase <= phase && (!e.maxPhase || phase <= e.maxPhase))
  return cachedPool
}

export function checkEventTrigger(state: GameState, now: number): boolean {
  if (state.activeEvent) return false
  return now >= state.nextEventAt
}

export function selectEvent(
  state: GameState,
  eventPool: GameEvent[]
): GameEvent | null {
  const phaseFiltered = getPhaseFilteredPool(state.phase, eventPool)
  const eligible = phaseFiltered.filter(e => isEligible(e, state))
  if (eligible.length === 0) return null

  // Weighted random selection
  const weights = eligible.map(e => CATEGORY_WEIGHTS[e.category] ?? 1)
  const totalWeight = weights.reduce((a, b) => a + b, 0)
  let roll = Math.random() * totalWeight

  for (let i = 0; i < eligible.length; i++) {
    roll -= weights[i]
    if (roll <= 0) return eligible[i]
  }

  return eligible[eligible.length - 1]
}

/** Cooldown between replays of a replayable event (15 minutes) */
const REPLAY_COOLDOWN_MS = 15 * 60 * 1000

function isEligible(event: GameEvent, state: GameState): boolean {
  // Phase/maxPhase already filtered by cache — skip those checks

  // Replayable events: allow re-firing after cooldown
  if (event.replayable) {
    const lastFired = state.lastEventFiredAt?.[event.id]
    if (lastFired && (Date.now() - lastFired) < REPLAY_COOLDOWN_MS) return false
  } else {
    // Non-replayable: unique events can only fire once
    if (state.eventHistory.includes(event.id)) return false
  }

  // Check conditions
  if (event.conditions) {
    for (const condition of event.conditions) {
      if (!checkCondition(condition, state)) return false
    }
  }

  return true
}

function checkCondition(condition: EventCondition, state: GameState): boolean {
  const value = state[condition.resource as keyof GameState]
  if (typeof value !== 'number') return false

  switch (condition.operator) {
    case '>': return value > condition.value
    case '<': return value < condition.value
    case '>=': return value >= condition.value
    case '<=': return value <= condition.value
    case '==': return value === condition.value
  }
}

export function scheduleNextEvent(phase: number, now: number): number {
  return now + getNextEventDelay(phase)
}
