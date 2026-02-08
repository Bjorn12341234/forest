import type { GameState } from '../store/types'

export type AchievementCategory = 'milestone' | 'strategy' | 'irony' | 'meta'

export interface AchievementDef {
  id: string
  name: string
  description: string
  icon: string
  phase: number
  category?: AchievementCategory
  check: (state: GameState) => boolean
}

export const ACHIEVEMENTS: AchievementDef[] = [
  // ═══════════════════════════════════════════
  //  PHASE 1 ACHIEVEMENTS
  // ═══════════════════════════════════════════
  {
    id: 'first_click',
    name: 'The Beginning',
    description: 'Generate your first attention.',
    icon: '👆',
    phase: 1,
    category: 'milestone',
    check: (s) => s.clickCount >= 1,
  },
  {
    id: 'hundred_clicks',
    name: 'Compulsive Clicker',
    description: 'Click 100 times. Your dedication is noted.',
    icon: '🖱️',
    phase: 1,
    category: 'milestone',
    check: (s) => s.clickCount >= 100,
  },
  {
    id: 'thousand_clicks',
    name: 'Repetitive Strain',
    description: 'Click 1,000 times. Consider a trackball.',
    icon: '🦾',
    phase: 1,
    category: 'milestone',
    check: (s) => s.clickCount >= 1000,
  },
  {
    id: 'first_upgrade',
    name: 'Self-Improvement',
    description: 'Purchase your first upgrade.',
    icon: '⬆️',
    phase: 1,
    category: 'milestone',
    check: (s) => Object.values(s.upgrades).some(u => u.purchased),
  },
  {
    id: 'all_trees',
    name: 'Diversified Portfolio',
    description: 'Purchase at least one upgrade from every tree.',
    icon: '🌳',
    phase: 1,
    category: 'strategy',
    check: (s) => {
      const trees = new Set<string>()
      const treeMap: Record<string, string> = {
        media_social_account: 'Media Presence',
        merch_red_hat: 'Merchandise Empire',
        algo_bots: 'Algorithm Manipulation',
        sci_research_div: 'Early Science',
        ent_bible: 'Entrepreneurship',
      }
      for (const [id, upgrade] of Object.entries(s.upgrades)) {
        if (upgrade.purchased && treeMap[id]) {
          trees.add(treeMap[id])
        }
      }
      return trees.size >= 5
    },
  },
  {
    id: 'neural_backup',
    name: 'Digital Immortality',
    description: 'Complete the Neural Backup. Consciousness is just data.',
    icon: '🧠',
    phase: 1,
    category: 'milestone',
    check: (s) => s.upgrades['sci_neural_backup']?.purchased === true,
  },
  {
    id: 'first_cash',
    name: 'Cash Money',
    description: 'Earn your first dollar. Capitalism begins.',
    icon: '💵',
    phase: 1,
    category: 'milestone',
    check: (s) => s.cash >= 1,
  },
  {
    id: 'attention_hog',
    name: 'Attention Hog',
    description: 'Accumulate 10,000 attention. The algorithm loves you.',
    icon: '📺',
    phase: 1,
    category: 'milestone',
    check: (s) => s.attention >= 10_000,
  },
  {
    id: 'first_event',
    name: 'Breaking News',
    description: 'Resolve your first event.',
    icon: '📰',
    phase: 1,
    category: 'milestone',
    check: (s) => s.eventHistory.length >= 1,
  },

  // ═══════════════════════════════════════════
  //  PHASE 2 ACHIEVEMENTS
  // ═══════════════════════════════════════════
  {
    id: 'first_institution',
    name: 'Institutional Alignment',
    description: 'Capture your first institution.',
    icon: '🏛️',
    phase: 2,
    category: 'milestone',
    check: (s) => Object.values(s.institutions).some(i => i.status === 'captured' || i.status === 'automated'),
  },
  {
    id: 'hostile_takeover',
    name: 'Hostile Takeover',
    description: 'Capture an institution via Purge. Efficiency above all.',
    icon: '⚡',
    phase: 2,
    category: 'strategy',
    check: (s) => s.eventHistory.length > 0 && Object.values(s.institutions).some(i => i.status === 'captured' || i.status === 'automated'),
  },
  {
    id: 'legitimacy_crisis',
    name: 'Legitimacy Crisis',
    description: 'Drop below 10% Legitimacy and survive.',
    icon: '😰',
    phase: 2,
    category: 'irony',
    check: (s) => s.legitimacy < 10 && s.phase >= 2,
  },
  {
    id: 'deep_state',
    name: 'The Deep State',
    description: 'Automate all 13 institutions. The machine runs itself.',
    icon: '🤖',
    phase: 2,
    category: 'strategy',
    check: (s) => {
      const insts = Object.values(s.institutions)
      return insts.length >= 13 && insts.every(i => i.status === 'automated')
    },
  },
  {
    id: 'tariff_man',
    name: 'Tariff Man',
    description: 'Activate all tariff categories simultaneously.',
    icon: '📊',
    phase: 2,
    category: 'strategy',
    check: (s) => {
      const tariffs = Object.values(s.tariffs)
      return tariffs.length >= 6 && tariffs.every(t => t.active)
    },
  },
  {
    id: 'austerity_king',
    name: 'Austerity King',
    description: 'Set all social programs below 10%. People are expendable.',
    icon: '📉',
    phase: 2,
    category: 'irony',
    check: (s) => s.budget.healthcare < 10 && s.budget.education < 10 && s.budget.socialBenefits < 10 && s.phase >= 2,
  },
  {
    id: 'data_center_online',
    name: 'Surveillance State',
    description: 'Deploy your first data center upgrade.',
    icon: '🖥️',
    phase: 2,
    category: 'milestone',
    check: (s) => Object.values(s.dataCenterUpgrades).some(v => v),
  },
  {
    id: 'loyalty_complete',
    name: 'Loyalty Economy',
    description: 'Purchase all loyalty upgrades. Everyone is watching everyone.',
    icon: '🏅',
    phase: 2,
    category: 'strategy',
    check: (s) => {
      const upgrades = Object.values(s.loyaltyUpgrades)
      return upgrades.length >= 4 && upgrades.every(v => v)
    },
  },
  {
    id: 'doublethink_master',
    name: 'Doublethink Master',
    description: 'Earn 10 Doublethink Tokens. Two truths at once, effortlessly.',
    icon: '🧩',
    phase: 2,
    category: 'irony',
    check: (s) => s.doublethinkTokens >= 10,
  },

  // ═══════════════════════════════════════════
  //  PHASE 3 ACHIEVEMENTS
  // ═══════════════════════════════════════════
  {
    id: 'first_annexation',
    name: 'Manifest Destiny',
    description: 'Annex your first country into the Greatness Accord.',
    icon: '🗺️',
    phase: 3,
    category: 'milestone',
    check: (s) => Object.values(s.countries).some(c => c.status === 'annexed'),
  },
  {
    id: 'peacemonger',
    name: 'Peacemonger',
    description: 'Win a Nobel Peace Prize while running active military operations.',
    icon: '🏅',
    phase: 3,
    category: 'irony',
    check: (s) => {
      const atWar = Object.values(s.countries).filter(c => c.status === 'occupied' || c.status === 'coup_target').length
      return s.nobelPrizesWon >= 1 && atWar >= 1
    },
  },
  {
    id: 'golden_fleet',
    name: 'Golden Fleet',
    description: 'Build a Golden Dreadnought. Peak military excess.',
    icon: '👑',
    phase: 3,
    category: 'milestone',
    check: (s) => (s.fleet['golden_dreadnought'] ?? 0) >= 1,
  },
  {
    id: 'extraordinary',
    name: 'Extraordinary Measures',
    description: 'Use Extraordinary Rendition. Someone is missing and it\'s your fault.',
    icon: '🕵️',
    phase: 3,
    category: 'strategy',
    check: (s) => s.eventHistory.includes('p3_rendition_fallout'),
  },
  {
    id: 'world_accord',
    name: 'The Greatness Accord',
    description: 'All 14 countries under the Accord. Earth is optimized.',
    icon: '🌍',
    phase: 3,
    category: 'milestone',
    check: (s) => {
      const countries = Object.entries(s.countries).filter(([id]) => id !== 'azure_state')
      return countries.length >= 14 && countries.every(([, c]) => c.status === 'annexed' || c.status === 'allied')
    },
  },
  {
    id: 'gunboat_diplomacy',
    name: 'Gunboat Diplomacy',
    description: 'Win Nobel Prize with 50+ warships active.',
    icon: '⚓',
    phase: 3,
    category: 'irony',
    check: (s) => {
      const totalShips = Object.values(s.fleet).reduce((sum, n) => sum + n, 0)
      return s.nobelPrizesWon >= 1 && totalShips >= 50
    },
  },
  {
    id: 'armada',
    name: 'The Armada',
    description: 'Build 100 ships. The ocean is an orange parking lot.',
    icon: '🚢',
    phase: 3,
    category: 'milestone',
    check: (s) => {
      const totalShips = Object.values(s.fleet).reduce((sum, n) => sum + n, 0)
      return totalShips >= 100
    },
  },
  {
    id: 'triple_nobel',
    name: 'Peace Industrial Complex',
    description: 'Win 3 Nobel Peace Prizes. The committee has questions.',
    icon: '🥇',
    phase: 3,
    category: 'irony',
    check: (s) => s.nobelPrizesWon >= 3,
  },
  {
    id: 'fear_factor',
    name: 'Fear Factor',
    description: 'Reach 500 Fear. The world trembles.',
    icon: '💀',
    phase: 3,
    category: 'milestone',
    check: (s) => s.fear >= 500,
  },
  {
    id: 'refugee_crisis',
    name: 'Collateral Greatness',
    description: 'Trigger refugee waves in 3 countries. Freedom has side effects.',
    icon: '🌊',
    phase: 3,
    category: 'irony',
    check: (s) => {
      const waves = Object.values(s.countries).filter(c => c.refugeeWavesSent > 0).length
      return waves >= 3
    },
  },

  // ═══════════════════════════════════════════
  //  PHASE 4 ACHIEVEMENTS
  // ═══════════════════════════════════════════
  {
    id: 'one_small_step',
    name: 'One Small Step',
    description: 'Build a Moon Base. It has a gift shop.',
    icon: '🌙',
    phase: 4,
    category: 'milestone',
    check: (s) => s.space.moonBase,
  },
  {
    id: 'the_orange_planet',
    name: 'The Orange Planet',
    description: 'Mars has been rebranded. Scientists are crying.',
    icon: '🔴',
    phase: 4,
    category: 'milestone',
    check: (s) => s.space.marsRenamed,
  },
  {
    id: 'space_landlord',
    name: 'Space Landlord',
    description: 'Claim Moon, Mars, and Asteroids. The solar system has a new owner.',
    icon: '🏠',
    phase: 4,
    category: 'strategy',
    check: (s) => s.space.moonBase && s.space.marsColony && s.space.asteroidProspectors > 0,
  },
  {
    id: 'diplomatic_railgun_achievement',
    name: 'Diplomatic Railgun',
    description: 'Deploy the Diplomatic Railgun. Diplomacy at Mach 20.',
    icon: '💥',
    phase: 4,
    category: 'milestone',
    check: (s) => s.space.spaceWeapons['diplomatic_railgun'] === true,
  },
  {
    id: 'freedom_canyon',
    name: 'Freedom Canyon',
    description: 'Rename Mars, establish colony, and reach 50% terraform.',
    icon: '🏔️',
    phase: 4,
    category: 'strategy',
    check: (s) => s.space.marsRenamed && s.space.marsColony && s.terraformProgress >= 50,
  },
  {
    id: 'satellite_network',
    name: 'Propaganda Network',
    description: 'Deploy 10 orbital propaganda satellites. Truth from above.',
    icon: '📡',
    phase: 4,
    category: 'milestone',
    check: (s) => s.space.propagandaSatellites >= 10,
  },
  {
    id: 'solar_shade_deployed',
    name: 'Climate Control',
    description: 'Deploy the Solar Shade Array. Weather is now a policy decision.',
    icon: '🌤️',
    phase: 4,
    category: 'strategy',
    check: (s) => s.space.spaceWeapons['solar_shade'] === true,
  },
  {
    id: 'dyson_prototype',
    name: 'Dyson Pioneer',
    description: 'Build the Dyson Swarm Prototype. Baby steps toward stellar domination.',
    icon: '🔆',
    phase: 4,
    category: 'milestone',
    check: (s) => s.space.dysonSwarms > 0,
  },

  // ═══════════════════════════════════════════
  //  PHASE 5 ACHIEVEMENTS
  // ═══════════════════════════════════════════
  {
    id: 'first_replicator',
    name: 'Self-Replicating',
    description: 'Launch your first MAGA Replicator. Make All Galaxies American.',
    icon: '🛸',
    phase: 5,
    category: 'milestone',
    check: (s) => s.probesLaunched >= 1,
  },
  {
    id: 'dyson_sphere',
    name: 'Solar Greatness',
    description: 'Build a Solar Greatness Harvester. The sun works for you now.',
    icon: '☀️',
    phase: 5,
    category: 'milestone',
    check: (s) => Object.values(s.universe.dysonUpgrades).some(v => v),
  },
  {
    id: 'star_brander',
    name: 'Star Brander',
    description: 'Convert 50 stars. Each one gets a name and a logo.',
    icon: '⭐',
    phase: 5,
    category: 'milestone',
    check: (s) => s.starsConverted >= 50,
  },
  {
    id: 'post_reality',
    name: 'Post-Reality',
    description: 'Reach 80% Reality Drift. Truth is whatever the spreadsheet says.',
    icon: '🌀',
    phase: 5,
    category: 'irony',
    check: (s) => s.realityDrift >= 80,
  },
  {
    id: 'universe_great',
    name: 'The Universe Is Great',
    description: 'Convert 100% of the reachable universe. Now what?',
    icon: '🌌',
    phase: 5,
    category: 'milestone',
    check: (s) => s.universe.universeConverted >= 100,
  },
  {
    id: 'infinite_loop',
    name: 'Infinite Loop',
    description: 'Prestige for the first time. It starts again. It always starts again.',
    icon: '♾️',
    phase: 5,
    category: 'milestone',
    check: (s) => s.prestigeLevel >= 1,
  },
  {
    id: 'ontological_supremacy',
    name: 'Ontological Supremacy',
    description: 'Complete the Narrative Architecture. Reality is your product.',
    icon: '👁️',
    phase: 5,
    category: 'strategy',
    check: (s) => s.universe.narrativeResearch['ontological_supremacy'] === true,
  },
  {
    id: 'black_hole_accountant',
    name: 'Black Hole Accountant',
    description: 'Create your first black hole. Debt disappears into the singularity.',
    icon: '🕳️',
    phase: 5,
    category: 'milestone',
    check: (s) => s.universe.blackHoles >= 1,
  },
  {
    id: 'star_empire',
    name: 'Star Empire',
    description: 'Convert 500 stars. The galaxy has a new franchise owner.',
    icon: '🌟',
    phase: 5,
    category: 'milestone',
    check: (s) => s.starsConverted >= 500,
  },

  // ═══════════════════════════════════════════
  //  META ACHIEVEMENTS
  // ═══════════════════════════════════════════
  {
    id: 'meta_phase1',
    name: 'True Believer',
    description: 'Unlock all Phase 1 achievements.',
    icon: '🏆',
    phase: 1,
    category: 'meta',
    check: (s) => {
      const phase1 = ACHIEVEMENTS.filter(a => a.phase === 1 && a.category !== 'meta')
      return phase1.every(a => s.achievements[a.id])
    },
  },
  {
    id: 'meta_phase2',
    name: 'The Establishment',
    description: 'Unlock all Phase 2 achievements.',
    icon: '🏆',
    phase: 2,
    category: 'meta',
    check: (s) => {
      const phase2 = ACHIEVEMENTS.filter(a => a.phase === 2 && a.category !== 'meta')
      return phase2.every(a => s.achievements[a.id])
    },
  },
  {
    id: 'meta_phase3',
    name: 'World Leader',
    description: 'Unlock all Phase 3 achievements.',
    icon: '🏆',
    phase: 3,
    category: 'meta',
    check: (s) => {
      const phase3 = ACHIEVEMENTS.filter(a => a.phase === 3 && a.category !== 'meta')
      return phase3.every(a => s.achievements[a.id])
    },
  },
  {
    id: 'meta_phase4',
    name: 'Cosmic Authority',
    description: 'Unlock all Phase 4 achievements.',
    icon: '🏆',
    phase: 4,
    category: 'meta',
    check: (s) => {
      const phase4 = ACHIEVEMENTS.filter(a => a.phase === 4 && a.category !== 'meta')
      return phase4.every(a => s.achievements[a.id])
    },
  },
  {
    id: 'meta_phase5',
    name: 'God Emperor',
    description: 'Unlock all Phase 5 achievements.',
    icon: '🏆',
    phase: 5,
    category: 'meta',
    check: (s) => {
      const phase5 = ACHIEVEMENTS.filter(a => a.phase === 5 && a.category !== 'meta')
      return phase5.every(a => s.achievements[a.id])
    },
  },
  {
    id: 'meta_completionist',
    name: 'Completionist',
    description: 'Unlock every non-meta achievement. You have a problem.',
    icon: '💎',
    phase: 5,
    category: 'meta',
    check: (s) => {
      const nonMeta = ACHIEVEMENTS.filter(a => a.category !== 'meta')
      return nonMeta.every(a => s.achievements[a.id])
    },
  },
  {
    id: 'meta_prestige_veteran',
    name: 'Prestige Veteran',
    description: 'Reach prestige level 3. The cycle continues.',
    icon: '🔄',
    phase: 5,
    category: 'meta',
    check: (s) => s.prestigeLevel >= 3,
  },
  {
    id: 'meta_long_game',
    name: 'The Long Game',
    description: 'Accumulate 24 hours of total play time. Greatness takes commitment.',
    icon: '⏰',
    phase: 1,
    category: 'meta',
    check: (s) => s.totalPlayTime >= 86400,
  },
]

export function getAchievementsByPhase(phase: number): AchievementDef[] {
  return ACHIEVEMENTS.filter(a => a.phase <= phase)
}

export function getAchievementsByCategory(category: AchievementCategory): AchievementDef[] {
  return ACHIEVEMENTS.filter(a => a.category === category)
}

const PHASE_NAMES: Record<number, string> = {
  1: 'Phase 1: Attention',
  2: 'Phase 2: Control',
  3: 'Phase 3: World',
  4: 'Phase 4: Space',
  5: 'Phase 5: Cosmic',
}

export function getPhaseLabel(phase: number): string {
  return PHASE_NAMES[phase] ?? `Phase ${phase}`
}
