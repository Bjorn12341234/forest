import { describe, it, expect } from 'vitest'
import {
  calculateUpgradeCost,
  getKapitalConversionRate,
  getOwnerTrustModifier,
  getNextEventDelay,
  calculateOfflineRate,
} from './formulas'

describe('calculateUpgradeCost', () => {
  it('returns base cost when count is 0', () => {
    expect(calculateUpgradeCost(100, 0)).toBe(100)
  })

  it('scales by 1.15^count', () => {
    expect(calculateUpgradeCost(100, 1)).toBe(Math.floor(100 * 1.15))
    expect(calculateUpgradeCost(100, 5)).toBe(Math.floor(100 * Math.pow(1.15, 5)))
    expect(calculateUpgradeCost(100, 10)).toBe(Math.floor(100 * Math.pow(1.15, 10)))
  })

  it('floors the result', () => {
    const raw = 100 * Math.pow(1.15, 3)
    expect(calculateUpgradeCost(100, 3)).toBe(Math.floor(raw))
    expect(Number.isInteger(calculateUpgradeCost(100, 3))).toBe(true)
  })

  it('works with large base costs', () => {
    expect(calculateUpgradeCost(1_000_000, 0)).toBe(1_000_000)
    expect(calculateUpgradeCost(1_000_000, 50)).toBe(Math.floor(1_000_000 * Math.pow(1.15, 50)))
  })
})

describe('getKapitalConversionRate', () => {
  it('returns correct rate for each phase', () => {
    const expected: Record<number, number> = {
      1: 0.02, 2: 0.03, 3: 0.04, 4: 0.06, 5: 0.08, 6: 0.10,
      7: 0.12, 8: 0.14, 9: 0.16, 10: 0.20, 11: 0.25, 12: 0.30,
    }
    for (const [phase, rate] of Object.entries(expected)) {
      expect(getKapitalConversionRate(Number(phase))).toBe(rate)
    }
  })

  it('returns fallback 0.01 for unknown phases', () => {
    expect(getKapitalConversionRate(0)).toBe(0.01)
    expect(getKapitalConversionRate(13)).toBe(0.01)
    expect(getKapitalConversionRate(-1)).toBe(0.01)
  })
})

describe('getOwnerTrustModifier', () => {
  it('returns 1.0 for sweet spot (40-60)', () => {
    expect(getOwnerTrustModifier(40)).toBe(1.0)
    expect(getOwnerTrustModifier(50)).toBe(1.0)
    expect(getOwnerTrustModifier(60)).toBe(1.0)
  })

  it('returns 0.6 for high trust (>80)', () => {
    expect(getOwnerTrustModifier(81)).toBe(0.6)
    expect(getOwnerTrustModifier(100)).toBe(0.6)
  })

  it('returns 0.7 for low trust (<20)', () => {
    expect(getOwnerTrustModifier(0)).toBe(0.7)
    expect(getOwnerTrustModifier(19)).toBe(0.7)
  })

  it('returns 0.85 for mid ranges (20-39, 61-80)', () => {
    expect(getOwnerTrustModifier(20)).toBe(0.85)
    expect(getOwnerTrustModifier(39)).toBe(0.85)
    expect(getOwnerTrustModifier(61)).toBe(0.85)
    expect(getOwnerTrustModifier(80)).toBe(0.85)
  })
})

describe('getNextEventDelay', () => {
  it('returns value in correct range for phase 1', () => {
    for (let i = 0; i < 20; i++) {
      const delay = getNextEventDelay(1)
      expect(delay).toBeGreaterThanOrEqual(95_000)
      expect(delay).toBeLessThanOrEqual(155_000)
    }
  })

  it('returns value in correct range for phase 6', () => {
    for (let i = 0; i < 20; i++) {
      const delay = getNextEventDelay(6)
      expect(delay).toBeGreaterThanOrEqual(40_000)
      expect(delay).toBeLessThanOrEqual(65_000)
    }
  })

  it('returns value in correct range for phase 12', () => {
    for (let i = 0; i < 20; i++) {
      const delay = getNextEventDelay(12)
      expect(delay).toBeGreaterThanOrEqual(80_000)
      expect(delay).toBeLessThanOrEqual(130_000)
    }
  })

  it('returns fallback range for unknown phases', () => {
    for (let i = 0; i < 20; i++) {
      const delay = getNextEventDelay(99)
      expect(delay).toBeGreaterThanOrEqual(120_000)
      expect(delay).toBeLessThanOrEqual(180_000)
    }
  })
})

describe('calculateOfflineRate', () => {
  it('returns 0.1', () => {
    expect(calculateOfflineRate()).toBe(0.1)
  })
})
