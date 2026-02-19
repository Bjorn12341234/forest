import { describe, it, expect } from 'vitest'
import {
  getEra,
  ERA_PHASES,
  PHASE_NAMES,
  checkPhaseTransition,
  getOwnerPhase,
  getOwnerPhaseProgress,
  getTransitionScript,
  TRANSITION_SCRIPTS,
} from './phases'
import type { GameState, Phase } from '../store/types'

function makeState(overrides: Partial<GameState> = {}): GameState {
  return {
    phase: 1 as Phase,
    totalStammar: 0,
    stammar: 0,
    ...overrides,
  } as GameState
}

describe('getEra', () => {
  it('returns SVERIGE for phases 1-3', () => {
    expect(getEra(1)).toBe('SVERIGE')
    expect(getEra(2)).toBe('SVERIGE')
    expect(getEra(3)).toBe('SVERIGE')
  })

  it('returns MAKT for phases 4-6', () => {
    expect(getEra(4)).toBe('MAKT')
    expect(getEra(5)).toBe('MAKT')
    expect(getEra(6)).toBe('MAKT')
  })

  it('returns INTERNATIONELL for phases 7-9', () => {
    expect(getEra(7)).toBe('INTERNATIONELL')
    expect(getEra(8)).toBe('INTERNATIONELL')
    expect(getEra(9)).toBe('INTERNATIONELL')
  })

  it('returns EXPANSION for phases 10-12', () => {
    expect(getEra(10)).toBe('EXPANSION')
    expect(getEra(11)).toBe('EXPANSION')
    expect(getEra(12)).toBe('EXPANSION')
  })

  it('returns EXPANSION for out-of-range phases', () => {
    expect(getEra(0)).toBe('SVERIGE')
    expect(getEra(13)).toBe('EXPANSION')
    expect(getEra(100)).toBe('EXPANSION')
  })
})

describe('ERA_PHASES', () => {
  it('maps each era to correct phase range', () => {
    expect(ERA_PHASES.SVERIGE).toEqual([1, 3])
    expect(ERA_PHASES.MAKT).toEqual([4, 6])
    expect(ERA_PHASES.INTERNATIONELL).toEqual([7, 9])
    expect(ERA_PHASES.EXPANSION).toEqual([10, 12])
  })
})

describe('PHASE_NAMES', () => {
  it('has all 12 phases defined', () => {
    for (let i = 1; i <= 12; i++) {
      expect(PHASE_NAMES[i as Phase]).toBeDefined()
      expect(typeof PHASE_NAMES[i as Phase]).toBe('string')
      expect(PHASE_NAMES[i as Phase].length).toBeGreaterThan(0)
    }
  })
})

describe('checkPhaseTransition', () => {
  const thresholds: Record<number, number> = {
    1: 10_000, 2: 100_000, 3: 500_000, 4: 2_000_000, 5: 10_000_000,
    6: 60_000_000, 7: 500_000_000, 8: 3_000_000_000, 9: 30_000_000_000,
    10: 500_000_000_000, 11: 5_000_000_000_000,
  }

  it('returns next phase when threshold met', () => {
    for (const [phase, threshold] of Object.entries(thresholds)) {
      const state = makeState({ phase: Number(phase) as Phase, totalStammar: threshold })
      expect(checkPhaseTransition(state)).toBe(Number(phase) + 1)
    }
  })

  it('returns null when below threshold', () => {
    for (const [phase, threshold] of Object.entries(thresholds)) {
      const state = makeState({ phase: Number(phase) as Phase, totalStammar: threshold - 1 })
      expect(checkPhaseTransition(state)).toBeNull()
    }
  })

  it('returns null for phase 12 (no further progression)', () => {
    const state = makeState({ phase: 12 as Phase, totalStammar: 999_999_999_999_999 })
    expect(checkPhaseTransition(state)).toBeNull()
  })
})

describe('getOwnerPhase', () => {
  it('returns phase 1 for sv < 50K', () => {
    expect(getOwnerPhase(0).phase).toBe(1)
    expect(getOwnerPhase(49_999).phase).toBe(1)
  })

  it('returns phase 2 for sv >= 50K', () => {
    expect(getOwnerPhase(50_000).phase).toBe(2)
    expect(getOwnerPhase(149_999).phase).toBe(2)
  })

  it('returns phase 3 for sv >= 150K', () => {
    expect(getOwnerPhase(150_000).phase).toBe(3)
    expect(getOwnerPhase(1_000_000).phase).toBe(3)
  })
})

describe('getOwnerPhaseProgress', () => {
  it('returns progress 0 at start', () => {
    const result = getOwnerPhaseProgress(0)
    expect(result.current).toBe(0)
    expect(result.next).toBe(50_000)
    expect(result.progress).toBe(0)
  })

  it('returns progress 0.5 at midpoint', () => {
    const result = getOwnerPhaseProgress(25_000)
    expect(result.progress).toBeCloseTo(0.5)
  })

  it('returns progress 1 and next null at max phase', () => {
    const result = getOwnerPhaseProgress(200_000)
    expect(result.next).toBeNull()
    expect(result.progress).toBe(1)
  })
})

describe('getTransitionScript', () => {
  it('returns script for valid transition', () => {
    const script = getTransitionScript(1 as Phase, 2 as Phase)
    expect(script.length).toBeGreaterThan(0)
    expect(script[0].text).toContain('LOKALPATRIOT')
  })

  it('returns all 11 transition scripts', () => {
    for (let from = 1; from <= 11; from++) {
      const key = `${from}_${from + 1}` as `${Phase}_${Phase}`
      expect(TRANSITION_SCRIPTS[key]).toBeDefined()
    }
  })

  it('returns fallback for invalid transition', () => {
    const script = getTransitionScript(1 as Phase, 5 as Phase)
    expect(script).toHaveLength(1)
    expect(script[0].text).toContain('Fas 5')
  })
})
