import { describe, it, expect } from 'vitest'
import {
  ACHIEVEMENTS,
  TIER_LABELS,
  TIER_COLORS,
  getAchievementsByTier,
  getAchievementsByPhase,
} from './achievements'
import type { AchievementTier } from './achievements'

const VALID_TIERS: AchievementTier[] = [
  'lokal', 'regional', 'nationell', 'internationell',
  'endgame', 'kosmisk', 'meta', 'skogsagare', 'naturvan',
]

describe('ACHIEVEMENTS data integrity', () => {
  it('has achievements defined', () => {
    expect(ACHIEVEMENTS.length).toBeGreaterThanOrEqual(50)
  })

  it('all achievements have required fields', () => {
    for (const ach of ACHIEVEMENTS) {
      expect(typeof ach.id).toBe('string')
      expect(ach.id.length).toBeGreaterThan(0)
      expect(typeof ach.name).toBe('string')
      expect(typeof ach.description).toBe('string')
      expect(typeof ach.icon).toBe('string')
      expect(typeof ach.phase).toBe('number')
      expect(VALID_TIERS).toContain(ach.tier)
      expect(typeof ach.check).toBe('function')
    }
  })

  it('has no duplicate IDs', () => {
    const ids = ACHIEVEMENTS.map(a => a.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('all tiers have at least one achievement', () => {
    for (const tier of VALID_TIERS) {
      const inTier = ACHIEVEMENTS.filter(a => a.tier === tier)
      expect(inTier.length).toBeGreaterThanOrEqual(1)
    }
  })
})

describe('TIER_LABELS', () => {
  it('has labels for all valid tiers', () => {
    for (const tier of VALID_TIERS) {
      expect(TIER_LABELS[tier]).toBeDefined()
      expect(typeof TIER_LABELS[tier]).toBe('string')
    }
  })
})

describe('TIER_COLORS', () => {
  it('has colors for all valid tiers', () => {
    for (const tier of VALID_TIERS) {
      expect(TIER_COLORS[tier]).toBeDefined()
      expect(typeof TIER_COLORS[tier]).toBe('string')
    }
  })
})

describe('getAchievementsByTier', () => {
  it('returns only achievements of requested tier', () => {
    const lokal = getAchievementsByTier('lokal')
    expect(lokal.length).toBeGreaterThanOrEqual(1)
    expect(lokal.every(a => a.tier === 'lokal')).toBe(true)
  })
})

describe('getAchievementsByPhase', () => {
  it('returns achievements for phase 1', () => {
    const phase1 = getAchievementsByPhase(1)
    expect(phase1.length).toBeGreaterThanOrEqual(1)
    expect(phase1.every(a => a.phase <= 1)).toBe(true)
  })

  it('returns more achievements for higher phases', () => {
    const phase1 = getAchievementsByPhase(1)
    const phase12 = getAchievementsByPhase(12)
    expect(phase12.length).toBeGreaterThan(phase1.length)
  })
})
