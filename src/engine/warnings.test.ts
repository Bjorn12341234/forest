import { describe, it, expect } from 'vitest'
import {
  calculateWarningLevel,
  getWarningPenalty,
  getWarningEventDelayMultiplier,
  getWarningLobbyCostMultiplier,
  areEventsBlocked,
} from './warnings'
import type { GameState, Phase } from '../store/types'

function makeState(overrides: Partial<GameState> = {}): GameState {
  return {
    phase: 1 as Phase,
    image: 50,
    ownerTrust: 50,
    ...overrides,
  } as GameState
}

describe('calculateWarningLevel', () => {
  describe('image-based warnings (any era)', () => {
    it('returns 0 when image >= 25', () => {
      expect(calculateWarningLevel(makeState({ image: 25 }))).toBe(0)
      expect(calculateWarningLevel(makeState({ image: 100 }))).toBe(0)
    })

    it('returns 1 when image < 25 and >= 15', () => {
      expect(calculateWarningLevel(makeState({ image: 24 }))).toBe(1)
      expect(calculateWarningLevel(makeState({ image: 15 }))).toBe(1)
    })

    it('returns 2 when image < 15 and >= 5', () => {
      expect(calculateWarningLevel(makeState({ image: 14 }))).toBe(2)
      expect(calculateWarningLevel(makeState({ image: 5 }))).toBe(2)
    })

    it('returns 3 when image < 5', () => {
      expect(calculateWarningLevel(makeState({ image: 4 }))).toBe(3)
      expect(calculateWarningLevel(makeState({ image: 0 }))).toBe(3)
    })
  })

  describe('ownerTrust-based warnings (MAKT/INTERNATIONELL only)', () => {
    it('does not trigger trust warnings in SVERIGE era', () => {
      // Phase 1-3 = SVERIGE, trust < 15 should NOT trigger warning
      expect(calculateWarningLevel(makeState({ phase: 1 as Phase, image: 50, ownerTrust: 5 }))).toBe(0)
      expect(calculateWarningLevel(makeState({ phase: 3 as Phase, image: 50, ownerTrust: 0 }))).toBe(0)
    })

    it('does not trigger trust warnings in EXPANSION era', () => {
      expect(calculateWarningLevel(makeState({ phase: 10 as Phase, image: 50, ownerTrust: 5 }))).toBe(0)
    })

    it('triggers level 1 in MAKT when trust < 15', () => {
      expect(calculateWarningLevel(makeState({ phase: 4 as Phase, image: 50, ownerTrust: 14 }))).toBe(1)
    })

    it('triggers level 2 in MAKT when trust < 10', () => {
      expect(calculateWarningLevel(makeState({ phase: 5 as Phase, image: 50, ownerTrust: 9 }))).toBe(2)
    })

    it('triggers level 3 in MAKT when trust < 5', () => {
      expect(calculateWarningLevel(makeState({ phase: 6 as Phase, image: 50, ownerTrust: 4 }))).toBe(3)
    })

    it('triggers trust warnings in INTERNATIONELL era', () => {
      expect(calculateWarningLevel(makeState({ phase: 7 as Phase, image: 50, ownerTrust: 14 }))).toBe(1)
      expect(calculateWarningLevel(makeState({ phase: 8 as Phase, image: 50, ownerTrust: 9 }))).toBe(2)
      expect(calculateWarningLevel(makeState({ phase: 9 as Phase, image: 50, ownerTrust: 4 }))).toBe(3)
    })
  })

  describe('combined: worst of image/trust applies', () => {
    it('takes higher warning level', () => {
      // image = level 1, trust = level 2 → should be 2
      expect(calculateWarningLevel(makeState({ phase: 5 as Phase, image: 20, ownerTrust: 9 }))).toBe(2)
    })
  })
})

describe('getWarningPenalty', () => {
  it('returns correct production multiplier per level', () => {
    expect(getWarningPenalty(0)).toBe(1.0)
    expect(getWarningPenalty(1)).toBe(0.8)
    expect(getWarningPenalty(2)).toBe(0.5)
    expect(getWarningPenalty(3)).toBe(0.25)
  })
})

describe('getWarningEventDelayMultiplier', () => {
  it('returns 1.0 for levels 0-1', () => {
    expect(getWarningEventDelayMultiplier(0)).toBe(1.0)
    expect(getWarningEventDelayMultiplier(1)).toBe(1.0)
  })

  it('returns 2.0 for levels 2-3', () => {
    expect(getWarningEventDelayMultiplier(2)).toBe(2.0)
    expect(getWarningEventDelayMultiplier(3)).toBe(2.0)
  })
})

describe('getWarningLobbyCostMultiplier', () => {
  it('returns 1.0 for levels 0-2', () => {
    expect(getWarningLobbyCostMultiplier(0)).toBe(1.0)
    expect(getWarningLobbyCostMultiplier(1)).toBe(1.0)
    expect(getWarningLobbyCostMultiplier(2)).toBe(1.0)
  })

  it('returns 2.0 for level 3', () => {
    expect(getWarningLobbyCostMultiplier(3)).toBe(2.0)
  })
})

describe('areEventsBlocked', () => {
  it('returns false for levels 0-2', () => {
    expect(areEventsBlocked(0)).toBe(false)
    expect(areEventsBlocked(1)).toBe(false)
    expect(areEventsBlocked(2)).toBe(false)
  })

  it('returns true for level 3', () => {
    expect(areEventsBlocked(3)).toBe(true)
  })
})
