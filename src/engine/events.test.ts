import { describe, it, expect } from 'vitest'
import { checkEventTrigger, selectEvent, scheduleNextEvent } from './events'
import type { GameState, GameEvent, Phase } from '../store/types'

function makeState(overrides: Partial<GameState> = {}): GameState {
  return {
    phase: 1 as Phase,
    activeEvent: null,
    nextEventAt: 0,
    eventHistory: [],
    lastEventFiredAt: {},
    totalStammar: 0,
    stammar: 0,
    image: 50,
    ...overrides,
  } as GameState
}

function makeEvent(overrides: Partial<GameEvent> = {}): GameEvent {
  return {
    id: 'test_event',
    phase: 1,
    category: 'opportunity',
    headline: 'Test Event',
    context: 'Test context',
    choices: [{ label: 'OK', effects: [] }],
    ...overrides,
  }
}

describe('checkEventTrigger', () => {
  it('returns true when no active event and time has passed', () => {
    const state = makeState({ nextEventAt: 1000 })
    expect(checkEventTrigger(state, 1001)).toBe(true)
    expect(checkEventTrigger(state, 1000)).toBe(true)
  })

  it('returns false when there is an active event', () => {
    const state = makeState({
      activeEvent: makeEvent(),
      nextEventAt: 0,
    })
    expect(checkEventTrigger(state, 99999)).toBe(false)
  })

  it('returns false when time has not passed', () => {
    const state = makeState({ nextEventAt: 5000 })
    expect(checkEventTrigger(state, 4999)).toBe(false)
  })
})

describe('selectEvent', () => {
  it('returns null for empty pool', () => {
    const state = makeState()
    expect(selectEvent(state, [])).toBeNull()
  })

  it('returns null when all events already seen (non-replayable)', () => {
    const event = makeEvent({ id: 'seen_event' })
    const state = makeState({ eventHistory: ['seen_event'] })
    expect(selectEvent(state, [event])).toBeNull()
  })

  it('selects eligible event', () => {
    const event = makeEvent({ id: 'new_event', phase: 1 })
    const state = makeState({ phase: 1 as Phase })
    expect(selectEvent(state, [event])).toEqual(event)
  })

  it('filters by phase (event.phase > state.phase excluded)', () => {
    const event = makeEvent({ id: 'future_event', phase: 5 })
    const state = makeState({ phase: 1 as Phase })
    expect(selectEvent(state, [event])).toBeNull()
  })

  it('filters by maxPhase (event.maxPhase < state.phase excluded)', () => {
    const event = makeEvent({ id: 'old_event', phase: 1, maxPhase: 3 })
    const state = makeState({ phase: 5 as Phase })
    expect(selectEvent(state, [event])).toBeNull()
  })

  it('includes events within maxPhase range', () => {
    const event = makeEvent({ id: 'ranged_event', phase: 1, maxPhase: 6 })
    const state = makeState({ phase: 5 as Phase })
    expect(selectEvent(state, [event])).toEqual(event)
  })

  it('respects conditions', () => {
    const event = makeEvent({
      id: 'conditional_event',
      phase: 1,
      conditions: [{ resource: 'totalStammar', operator: '>=', value: 1000 }],
    })
    const stateLow = makeState({ phase: 1 as Phase, totalStammar: 500 })
    expect(selectEvent(stateLow, [event])).toBeNull()

    const stateHigh = makeState({ phase: 1 as Phase, totalStammar: 1000 })
    expect(selectEvent(stateHigh, [event])).toEqual(event)
  })

  it('allows replayable events after cooldown', () => {
    const now = Date.now()
    const event = makeEvent({ id: 'replay_event', phase: 1, replayable: true })

    // Within cooldown (15 min)
    const stateRecent = makeState({
      phase: 1 as Phase,
      eventHistory: ['replay_event'],
      lastEventFiredAt: { replay_event: now - 5 * 60 * 1000 },
    })
    expect(selectEvent(stateRecent, [event])).toBeNull()

    // After cooldown
    const stateOld = makeState({
      phase: 1 as Phase,
      eventHistory: ['replay_event'],
      lastEventFiredAt: { replay_event: now - 20 * 60 * 1000 },
    })
    expect(selectEvent(stateOld, [event])).toEqual(event)
  })

  it('blocks non-replayable events that are in history', () => {
    const event = makeEvent({ id: 'unique_event', phase: 1 })
    const state = makeState({ phase: 1 as Phase, eventHistory: ['unique_event'] })
    expect(selectEvent(state, [event])).toBeNull()
  })
})

describe('scheduleNextEvent', () => {
  it('returns timestamp greater than now', () => {
    const now = Date.now()
    const next = scheduleNextEvent(1, now)
    expect(next).toBeGreaterThan(now)
  })

  it('returns reasonable delay range', () => {
    const now = 0
    for (let i = 0; i < 20; i++) {
      const next = scheduleNextEvent(1, now)
      // Phase 1: 95-155 seconds
      expect(next).toBeGreaterThanOrEqual(95_000)
      expect(next).toBeLessThanOrEqual(155_000)
    }
  })
})
