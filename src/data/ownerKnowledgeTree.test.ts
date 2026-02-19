import { describe, it, expect } from 'vitest'
import {
  OWNER_KNOWLEDGE_UPGRADES,
  KNOWLEDGE_CATEGORIES,
  getOwnerKnowledgeUpgrade,
  getUpgradesByCategory,
  computeKnowledgeModifiers,
} from './ownerKnowledgeTree'
import type { KnowledgeCategory } from './ownerKnowledgeTree'

const VALID_CATEGORIES: KnowledgeCategory[] = ['ekologisk', 'skoglig', 'ekonomisk', 'samhallelig']
const VALID_EFFECTS = [
  'svPerClickMult', 'svPerSecondMult', 'inkomstMult',
  'biodivRate', 'resiliensRate', 'legacyRate',
  'attackResistance', 'lureCostReduction',
]

describe('OWNER_KNOWLEDGE_UPGRADES data integrity', () => {
  it('has 20 upgrades', () => {
    expect(OWNER_KNOWLEDGE_UPGRADES).toHaveLength(20)
  })

  it('all upgrades have required fields', () => {
    for (const upg of OWNER_KNOWLEDGE_UPGRADES) {
      expect(typeof upg.id).toBe('string')
      expect(typeof upg.name).toBe('string')
      expect(typeof upg.description).toBe('string')
      expect(VALID_CATEGORIES).toContain(upg.category)
      expect(typeof upg.cost).toBe('number')
      expect(upg.cost).toBeGreaterThan(0)
      expect(Array.isArray(upg.prerequisites)).toBe(true)
      expect(Array.isArray(upg.effects)).toBe(true)
      expect(upg.effects.length).toBeGreaterThanOrEqual(1)
    }
  })

  it('has no duplicate IDs', () => {
    const ids = OWNER_KNOWLEDGE_UPGRADES.map(u => u.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('5 upgrades per category', () => {
    for (const cat of VALID_CATEGORIES) {
      const inCat = OWNER_KNOWLEDGE_UPGRADES.filter(u => u.category === cat)
      expect(inCat).toHaveLength(5)
    }
  })

  it('effects reference valid types', () => {
    for (const upg of OWNER_KNOWLEDGE_UPGRADES) {
      for (const effect of upg.effects) {
        expect(VALID_EFFECTS).toContain(effect.type)
        expect(typeof effect.value).toBe('number')
      }
    }
  })

  it('prerequisites reference existing upgrade IDs', () => {
    const allIds = new Set(OWNER_KNOWLEDGE_UPGRADES.map(u => u.id))
    for (const upg of OWNER_KNOWLEDGE_UPGRADES) {
      for (const prereq of upg.prerequisites) {
        expect(allIds.has(prereq)).toBe(true)
      }
    }
  })

  it('has no circular dependencies', () => {
    const graph = new Map<string, string[]>()
    for (const upg of OWNER_KNOWLEDGE_UPGRADES) {
      graph.set(upg.id, upg.prerequisites)
    }

    function hasCycle(id: string, visited: Set<string>): boolean {
      if (visited.has(id)) return true
      visited.add(id)
      for (const prereq of graph.get(id) ?? []) {
        if (hasCycle(prereq, new Set(visited))) return true
      }
      return false
    }

    for (const upg of OWNER_KNOWLEDGE_UPGRADES) {
      expect(hasCycle(upg.id, new Set())).toBe(false)
    }
  })
})

describe('KNOWLEDGE_CATEGORIES', () => {
  it('has 4 categories', () => {
    expect(KNOWLEDGE_CATEGORIES).toHaveLength(4)
  })

  it('each has id, name, icon', () => {
    for (const cat of KNOWLEDGE_CATEGORIES) {
      expect(VALID_CATEGORIES).toContain(cat.id)
      expect(typeof cat.name).toBe('string')
      expect(typeof cat.icon).toBe('string')
    }
  })
})

describe('getOwnerKnowledgeUpgrade', () => {
  it('returns upgrade by ID', () => {
    const upg = getOwnerKnowledgeUpgrade('kt_ekosystem')
    expect(upg).toBeDefined()
    expect(upg!.category).toBe('ekologisk')
  })

  it('returns undefined for unknown ID', () => {
    expect(getOwnerKnowledgeUpgrade('nonexistent')).toBeUndefined()
  })
})

describe('getUpgradesByCategory', () => {
  it('returns 5 upgrades for each category', () => {
    for (const cat of VALID_CATEGORIES) {
      expect(getUpgradesByCategory(cat)).toHaveLength(5)
    }
  })
})

describe('computeKnowledgeModifiers', () => {
  it('returns zero modifiers when no upgrades purchased', () => {
    const mods = computeKnowledgeModifiers({})
    // All modifiers start at 0 — consuming code adds 1 for multipliers
    expect(mods.svPerClickMult).toBe(0)
    expect(mods.svPerSecondMult).toBe(0)
    expect(mods.inkomstMult).toBe(0)
    expect(mods.biodivRate).toBe(0)
    expect(mods.resiliensRate).toBe(0)
    expect(mods.legacyRate).toBe(0)
    expect(mods.attackResistance).toBe(0)
    expect(mods.lureCostReduction).toBe(0)
  })

  it('applies effects from purchased upgrades', () => {
    const mods = computeKnowledgeModifiers({ kt_ekosystem: true })
    // kt_ekosystem should boost biodivRate
    const hasEffect = mods.biodivRate > 0 || mods.svPerClickMult > 1 || mods.svPerSecondMult > 1
    expect(hasEffect).toBe(true)
  })

  it('ignores non-purchased upgrades', () => {
    const mods = computeKnowledgeModifiers({ kt_ekosystem: false })
    expect(mods.biodivRate).toBe(0)
  })
})
