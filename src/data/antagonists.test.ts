import { describe, it, expect } from 'vitest'
import {
  ANTAGONISTS,
  getAntagonist,
  getScaledCounterCost,
} from './antagonists'

describe('ANTAGONISTS data integrity', () => {
  it('has antagonists defined', () => {
    expect(ANTAGONISTS.length).toBeGreaterThanOrEqual(15)
  })

  it('all antagonists have required fields', () => {
    for (const ant of ANTAGONISTS) {
      expect(typeof ant.id).toBe('string')
      expect(typeof ant.name).toBe('string')
      expect(typeof ant.description).toBe('string')
      expect(typeof ant.icon).toBe('string')
      expect(typeof ant.triggerPhase).toBe('number')
      expect(ant.triggerPhase).toBeGreaterThanOrEqual(1)
      expect(ant.triggerPhase).toBeLessThanOrEqual(12)
      expect(typeof ant.triggerCondition).toBe('function')
      expect(Array.isArray(ant.tickEffects)).toBe(true)
      expect(ant.tickEffects.length).toBeGreaterThanOrEqual(1)
      expect(ant.counterCost).toBeDefined()
      expect(typeof ant.counterLabel).toBe('string')
    }
  })

  it('has no duplicate IDs', () => {
    const ids = ANTAGONISTS.map(a => a.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('maxPhase >= triggerPhase when defined', () => {
    for (const ant of ANTAGONISTS) {
      if (ant.maxPhase !== undefined) {
        expect(ant.maxPhase).toBeGreaterThanOrEqual(ant.triggerPhase)
      }
    }
  })

  it('tick effects reference valid resource types', () => {
    const validResources = new Set(['image', 'stammar', 'kapital'])
    for (const ant of ANTAGONISTS) {
      for (const effect of ant.tickEffects) {
        expect(validResources.has(effect.resource)).toBe(true)
        expect(typeof effect.perSecond).toBe('number')
      }
    }
  })

  it('counter costs reference valid resource types', () => {
    const validResources = new Set(['kapital', 'lobby'])
    for (const ant of ANTAGONISTS) {
      expect(validResources.has(ant.counterCost.resource)).toBe(true)
      expect(ant.counterCost.amount).toBeGreaterThan(0)
    }
  })

  it('all counter costs have scaleThreshold > 0', () => {
    for (const ant of ANTAGONISTS) {
      if (ant.counterCost.scaleThreshold !== undefined) {
        expect(ant.counterCost.scaleThreshold).toBeGreaterThan(0)
      }
    }
  })
})

describe('getAntagonist', () => {
  it('returns antagonist by ID', () => {
    const ant = getAntagonist('ant_skovarnarna')
    expect(ant).toBeDefined()
    expect(ant!.name).toBeDefined()
  })

  it('returns undefined for unknown ID', () => {
    expect(getAntagonist('nonexistent')).toBeUndefined()
  })
})

describe('getScaledCounterCost', () => {
  it('returns base cost when stammarPS is low', () => {
    const cost = { resource: 'kapital' as const, amount: 50_000, scaleThreshold: 500 }
    expect(getScaledCounterCost(cost, 100)).toBe(50_000)
  })

  it('scales cost with income', () => {
    const cost = { resource: 'kapital' as const, amount: 50_000, scaleThreshold: 500 }
    // At 5000/s with threshold 500: factor = 5000/500 = 10x
    const scaled = getScaledCounterCost(cost, 5000)
    expect(scaled).toBe(50_000 * 10)
  })

  it('caps at 100× base cost', () => {
    const cost = { resource: 'kapital' as const, amount: 50_000, scaleThreshold: 500 }
    // At 500000/s with threshold 500: factor = 1000, but capped at 100
    const scaled = getScaledCounterCost(cost, 500_000)
    expect(scaled).toBe(50_000 * 100)
  })

  it('returns base cost when no scaleThreshold', () => {
    const cost = { resource: 'kapital' as const, amount: 50_000 }
    expect(getScaledCounterCost(cost, 999_999)).toBe(50_000)
  })
})
