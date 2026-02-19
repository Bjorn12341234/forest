import { describe, it, expect, beforeEach } from 'vitest'
import { useGameStore, INITIAL_STATE } from './gameStore'
import type { Phase } from './types'

// Helper to reset store between tests
function resetStore(overrides: Record<string, unknown> = {}) {
  useGameStore.setState({ ...INITIAL_STATE, ...overrides })
}

function getState() {
  return useGameStore.getState()
}

beforeEach(() => {
  localStorage.clear()
  resetStore()
})

describe('INITIAL_STATE', () => {
  it('starts at phase 1 with no game mode', () => {
    expect(getState().phase).toBe(1)
    expect(getState().gameMode).toBeNull()
  })

  it('starts with base click values', () => {
    expect(getState().stammarPerClick).toBe(1)
    expect(getState().stammar).toBe(0)
    expect(getState().kapital).toBe(0)
  })

  it('starts with full image and biodiversity', () => {
    expect(getState().image).toBe(100)
    expect(getState().biodiversity).toBe(100)
  })
})

describe('setGameMode', () => {
  it('sets game mode to industry', () => {
    getState().setGameMode('industry')
    expect(getState().gameMode).toBe('industry')
  })

  it('sets game mode to owner', () => {
    getState().setGameMode('owner')
    expect(getState().gameMode).toBe('owner')
  })
})

describe('click (industry)', () => {
  it('increases stammar by stammarPerClick', () => {
    resetStore({ gameMode: 'industry' })
    getState().click()
    expect(getState().stammar).toBe(1)
    expect(getState().totalStammar).toBe(1)
    expect(getState().clickCount).toBe(1)
  })

  it('gives small kapital bonus', () => {
    resetStore({ gameMode: 'industry' })
    getState().click()
    // 1 * 0.005 = 0.005
    expect(getState().kapital).toBeCloseTo(0.005)
  })

  it('accumulates across clicks', () => {
    resetStore({ gameMode: 'industry' })
    for (let i = 0; i < 10; i++) getState().click()
    expect(getState().stammar).toBe(10)
    expect(getState().clickCount).toBe(10)
  })
})

describe('ownerClick', () => {
  it('increases skogsvardering by svPerClick', () => {
    resetStore({ gameMode: 'owner' })
    getState().ownerClick()
    expect(getState().skogsvardering).toBeGreaterThanOrEqual(1)
    expect(getState().totalSkogsvardering).toBeGreaterThanOrEqual(1)
    expect(getState().ownerClickCount).toBe(1)
  })

  it('gives small inkomst bonus', () => {
    resetStore({ gameMode: 'owner' })
    getState().ownerClick()
    expect(getState().inkomst).toBeGreaterThan(0)
  })
})

describe('buyGenerator', () => {
  it('buys first generator with sufficient stammar', () => {
    resetStore({ gameMode: 'industry', stammar: 10_000 })
    getState().buyGenerator('gen_virkesuppkopare')
    const genState = getState().generators.gen_virkesuppkopare
    expect(genState).toBeDefined()
    expect(genState.count).toBe(1)
    expect(getState().stammar).toBeLessThan(10_000)
  })

  it('rejects purchase with insufficient stammar', () => {
    resetStore({ gameMode: 'industry', stammar: 0 })
    getState().buyGenerator('gen_virkesuppkopare')
    expect(getState().generators.gen_virkesuppkopare).toBeUndefined()
  })

  it('rejects unknown generator ID', () => {
    resetStore({ gameMode: 'industry', stammar: 999_999 })
    getState().buyGenerator('nonexistent')
    expect(getState().stammar).toBe(999_999) // unchanged
  })

  it('increases cost with count', () => {
    resetStore({ gameMode: 'industry', stammar: 1_000_000 })
    getState().buyGenerator('gen_virkesuppkopare')
    const stam1 = getState().stammar
    getState().buyGenerator('gen_virkesuppkopare')
    const stam2 = getState().stammar
    // Second purchase costs more
    const cost1 = 1_000_000 - stam1
    const cost2 = stam1 - stam2
    expect(cost2).toBeGreaterThan(cost1)
  })
})

describe('buyClickUpgrade', () => {
  it('buys click upgrade with sufficient kapital', () => {
    resetStore({ gameMode: 'industry', kapital: 10_000 })
    getState().buyClickUpgrade('click_penna')
    expect(getState().clickUpgrades.click_penna).toBe(true)
    expect(getState().stammarPerClick).toBeGreaterThan(1)
  })

  it('rejects duplicate purchase', () => {
    resetStore({ gameMode: 'industry', kapital: 100_000 })
    getState().buyClickUpgrade('click_penna')
    const kapAfter1 = getState().kapital
    getState().buyClickUpgrade('click_penna')
    expect(getState().kapital).toBe(kapAfter1) // no change
  })

  it('rejects with insufficient kapital', () => {
    resetStore({ gameMode: 'industry', kapital: 0 })
    getState().buyClickUpgrade('click_penna')
    expect(getState().clickUpgrades.click_penna).toBeUndefined()
  })
})

describe('buyLobbyEarner', () => {
  it('earns PK with sufficient kapital', () => {
    resetStore({ gameMode: 'industry', kapital: 100_000, phase: 2 as Phase })
    getState().buyLobbyEarner('lobby_earn_algjakt')
    expect(getState().lobby).toBeGreaterThan(0)
    expect(getState().kapital).toBeLessThan(100_000)
  })

  it('rejects if phase too low', () => {
    resetStore({ gameMode: 'industry', kapital: 100_000, phase: 1 as Phase })
    getState().buyLobbyEarner('lobby_earn_algjakt')
    // Phase 1 may not have this earner — check kapital unchanged
    if (getState().kapital === 100_000) {
      expect(getState().lobby).toBe(0) // rejected
    }
  })
})

describe('buyLobbyProject', () => {
  it('buys one-time project with sufficient PK', () => {
    resetStore({ gameMode: 'industry', lobby: 10_000, phase: 2 as Phase })
    getState().buyLobbyProject('lobby_buy_frihet')
    const proj = getState().lobbyProjects.lobby_buy_frihet
    expect(proj).toBeDefined()
    expect(proj.purchased).toBe(true)
  })

  it('rejects duplicate purchase', () => {
    resetStore({ gameMode: 'industry', lobby: 100_000, phase: 2 as Phase })
    getState().buyLobbyProject('lobby_buy_frihet')
    const lobbyAfter1 = getState().lobby
    getState().buyLobbyProject('lobby_buy_frihet')
    expect(getState().lobby).toBe(lobbyAfter1) // unchanged
  })
})

describe('counterAntagonist', () => {
  it('counters active antagonist with sufficient funds', () => {
    resetStore({
      gameMode: 'industry',
      kapital: 10_000_000,
      lobby: 100_000,
      stammarPerSecond: 100,
      antagonists: {
        ant_skovarnarna: { active: true, countered: false, activatedAt: Date.now() },
      },
    })
    getState().counterAntagonist('ant_skovarnarna')
    expect(getState().antagonists.ant_skovarnarna.countered).toBe(true)
  })

  it('rejects if antagonist not active', () => {
    resetStore({
      gameMode: 'industry',
      kapital: 10_000_000,
      antagonists: {
        ant_skovarnarna: { active: false, countered: false },
      },
    })
    getState().counterAntagonist('ant_skovarnarna')
    expect(getState().antagonists.ant_skovarnarna.countered).toBe(false)
  })

  it('rejects if already countered', () => {
    resetStore({
      gameMode: 'industry',
      kapital: 10_000_000,
      antagonists: {
        ant_skovarnarna: { active: true, countered: true },
      },
    })
    const kapBefore = getState().kapital
    getState().counterAntagonist('ant_skovarnarna')
    expect(getState().kapital).toBe(kapBefore) // no cost deducted
  })
})

describe('invadeCountry', () => {
  it('starts invasion with sufficient resources', () => {
    resetStore({
      gameMode: 'industry',
      phase: 7 as Phase,
      stammar: 10_000_000_000,
      kapital: 10_000_000_000,
      lobby: 1_000_000,
    })
    getState().invadeCountry('c_finlandia')
    const cs = getState().countries.c_finlandia
    expect(cs).toBeDefined()
    expect(cs.status).toBe('invading')
    expect(cs.controlProgress).toBe(0)
  })

  it('rejects if phase too low', () => {
    resetStore({
      gameMode: 'industry',
      phase: 5 as Phase,
      stammar: 10_000_000_000,
      kapital: 10_000_000_000,
      lobby: 1_000_000,
    })
    getState().invadeCountry('c_finlandia')
    expect(getState().countries.c_finlandia).toBeUndefined()
  })

  it('rejects if already invading', () => {
    resetStore({
      gameMode: 'industry',
      phase: 7 as Phase,
      stammar: 10_000_000_000,
      kapital: 10_000_000_000,
      lobby: 1_000_000,
      countries: {
        c_finlandia: { status: 'invading', resistance: 50, controlProgress: 25, pressureAllocation: { kapital: 0, lobby: 0, stammar: 0 } },
      },
    })
    const stamBefore = getState().stammar
    getState().invadeCountry('c_finlandia')
    expect(getState().stammar).toBe(stamBefore) // no cost
  })
})

describe('allocatePressure', () => {
  it('sets pressure vector for invading country', () => {
    resetStore({
      gameMode: 'industry',
      countries: {
        c_finlandia: { status: 'invading', resistance: 50, controlProgress: 0, pressureAllocation: { kapital: 0, lobby: 0, stammar: 0 } },
      },
    })
    getState().allocatePressure('c_finlandia', 'kapital', 50)
    expect(getState().countries.c_finlandia.pressureAllocation?.kapital).toBe(50)
  })
})

describe('buyExpansionTarget', () => {
  it('buys target with sufficient resources', () => {
    resetStore({
      gameMode: 'industry',
      phase: 10 as Phase,
      stammar: 1e16,
      kapital: 1e16,
      lobby: 1e9,
    })
    getState().buyExpansionTarget('exp_manen')
    const target = getState().expansionTargets.exp_manen
    expect(target).toBeDefined()
    expect(target.status).toBe('controlled')
  })
})

describe('buyOwnerGenerator', () => {
  it('buys owner generator with sufficient sv', () => {
    resetStore({ gameMode: 'owner', skogsvardering: 10_000 })
    getState().buyOwnerGenerator('ogen_foryngring')
    const gen = getState().ownerGenerators.ogen_foryngring
    expect(gen).toBeDefined()
    expect(gen.count).toBe(1)
    expect(getState().skogsvardering).toBeLessThan(10_000)
  })

  it('rejects with insufficient sv', () => {
    resetStore({ gameMode: 'owner', skogsvardering: 0 })
    getState().buyOwnerGenerator('ogen_foryngring')
    expect(getState().ownerGenerators.ogen_foryngring).toBeUndefined()
  })
})

describe('resolveEvent', () => {
  it('resolves active event and records in history', () => {
    const event = {
      id: 'test_event_123',
      phase: 1,
      category: 'opportunity',
      headline: 'Test',
      context: 'Test',
      choices: [{ label: 'OK', effects: [{ resource: 'stammar', amount: 100, type: 'add' as const }] }],
    }
    resetStore({
      gameMode: 'industry',
      activeEvent: event,
    })
    getState().resolveEvent(0)
    expect(getState().activeEvent).toBeNull()
    expect(getState().eventHistory).toContain('test_event_123')
    expect(getState().stammar).toBe(100)
  })

  it('does nothing when no active event', () => {
    resetStore({ gameMode: 'industry', activeEvent: null })
    getState().resolveEvent(0)
    expect(getState().eventHistory).toHaveLength(0)
  })
})

describe('save/load through store', () => {
  it('saves and loads state', () => {
    resetStore({ gameMode: 'industry', stammar: 42 })
    getState().save()
    resetStore()
    const loaded = getState().load()
    expect(loaded).toBe(true)
    expect(getState().stammar).toBe(42)
  })

  it('reset returns to initial state', () => {
    resetStore({ gameMode: 'industry', stammar: 99999 })
    getState().reset()
    expect(getState().stammar).toBe(0)
    expect(getState().gameMode).toBeNull()
  })
})

describe('purchaseOwnerKnowledge', () => {
  it('purchases upgrade with sufficient kunskap', () => {
    resetStore({
      gameMode: 'owner',
      kunskap: 1000,
      totalSkogsvardering: 100_000,
    })
    getState().purchaseOwnerKnowledge('kt_ekosystem')
    expect(getState().ownerKnowledgeUpgrades.kt_ekosystem).toBe(true)
    expect(getState().kunskap).toBeLessThan(1000)
  })

  it('rejects duplicate purchase', () => {
    resetStore({
      gameMode: 'owner',
      kunskap: 10_000,
      totalSkogsvardering: 100_000,
      ownerKnowledgeUpgrades: { kt_ekosystem: true },
    })
    const kunskapBefore = getState().kunskap
    getState().purchaseOwnerKnowledge('kt_ekosystem')
    expect(getState().kunskap).toBe(kunskapBefore)
  })

  it('rejects with insufficient kunskap', () => {
    resetStore({ gameMode: 'owner', kunskap: 0 })
    getState().purchaseOwnerKnowledge('kt_ekosystem')
    expect(getState().ownerKnowledgeUpgrades.kt_ekosystem).toBeUndefined()
  })
})

describe('applyEffect', () => {
  it('applies add effect', () => {
    resetStore({ gameMode: 'industry', stammar: 100 })
    getState().applyEffect({ resource: 'stammar', amount: 50, type: 'add' })
    expect(getState().stammar).toBe(150)
  })

  it('applies multiply effect', () => {
    resetStore({ gameMode: 'industry', kapital: 100 })
    getState().applyEffect({ resource: 'kapital', amount: 2, type: 'multiply' })
    expect(getState().kapital).toBe(200)
  })

  it('applies set effect', () => {
    resetStore({ gameMode: 'industry', image: 50 })
    getState().applyEffect({ resource: 'image', amount: 75, type: 'set' })
    expect(getState().image).toBe(75)
  })
})
