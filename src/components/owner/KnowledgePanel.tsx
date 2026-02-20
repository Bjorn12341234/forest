import { useState, useEffect } from 'react'
import { useGameStore } from '../../store/gameStore'
import { KNOWLEDGE_ACTIVITIES, KNOWLEDGE_THRESHOLDS } from '../../data/ownerKnowledge'
import { KNOWLEDGE_CATEGORIES, getUpgradesByCategory, computeKnowledgeModifiers, type OwnerKnowledgeUpgrade } from '../../data/ownerKnowledgeTree'
import { formatNumber } from '../../engine/format'
import { AnimatedNumber } from '../ui/AnimatedNumber'
import { playPurchase } from '../../engine/audio'

export function KnowledgePanel() {
  const inkomst = useGameStore(s => s.inkomst)
  const kunskap = useGameStore(s => s.kunskap)
  const resiliens = useGameStore(s => s.resiliens)
  const biodivOwner = useGameStore(s => s.biodivOwner)
  const totalSV = useGameStore(s => s.totalSkogsvardering)
  const ownerKnowledgeUpgrades = useGameStore(s => s.ownerKnowledgeUpgrades)
  const lastKnowledgeActivityAt = useGameStore(s => s.lastKnowledgeActivityAt)
  const buyKnowledgeActivity = useGameStore(s => s.buyKnowledgeActivity)
  const purchaseOwnerKnowledge = useGameStore(s => s.purchaseOwnerKnowledge)

  // Cooldown timer for knowledge activities
  const [cooldownRemaining, setCooldownRemaining] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = Math.max(0, 15_000 - (Date.now() - lastKnowledgeActivityAt))
      setCooldownRemaining(remaining)
    }, 500)
    return () => clearInterval(interval)
  }, [lastKnowledgeActivityAt])

  const isOnCooldown = cooldownRemaining > 0

  // Find current and next threshold
  const currentThreshold = KNOWLEDGE_THRESHOLDS.filter(t => kunskap >= t.level).pop()
  const nextThreshold = KNOWLEDGE_THRESHOLDS.find(t => kunskap < t.level)

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      {/* Resource Summary */}
      <div className="grid grid-cols-2 gap-2">
        <div className="owner-card p-3">
          <span className="text-owner-text/80 text-xs uppercase tracking-wider flex items-center gap-1">
            <span className="text-xs">📚</span> Skogskunskap
          </span>
          <AnimatedNumber value={kunskap} className="text-lg text-owner-accent" />
        </div>
        <div className="owner-card p-3">
          <span className="text-owner-text/80 text-xs uppercase tracking-wider flex items-center gap-1">
            <span className="text-xs">🛡️</span> Resiliens
          </span>
          <AnimatedNumber value={resiliens} className={`text-lg ${resiliens > 50 ? 'text-owner-accent' : resiliens > 20 ? 'text-[#B8860B]' : 'text-[#CC2222]'}`} />
        </div>
      </div>

      {/* Aggregate Modifiers — Sprint 12 */}
      {Object.values(ownerKnowledgeUpgrades).some(Boolean) && (
        <KnowledgeModifiersSummary upgrades={ownerKnowledgeUpgrades} />
      )}

      {/* Biodiversity meter */}
      <div className="owner-card p-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-owner-text/80 text-xs uppercase tracking-wider">🦌 Biologisk mångfald</span>
          <span className="text-sm font-numbers text-owner-accent font-medium">{formatNumber(biodivOwner)} arter</span>
        </div>
        <div className="w-full h-2 bg-owner-text/8 rounded-sm overflow-hidden">
          <div
            className="h-full rounded-sm transition-all duration-500"
            style={{
              width: `${Math.min(100, (biodivOwner / 100) * 100)}%`,
              background: 'linear-gradient(90deg, #5E9E6E, #6BAF7B)',
            }}
          />
        </div>
      </div>

      {/* Knowledge Threshold Progress */}
      <div className="owner-card p-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-owner-text/80 text-xs uppercase tracking-wider">Kunskapsnivå</span>
          {nextThreshold && (
            <span className="text-xs text-owner-text/70 font-numbers">
              {formatNumber(kunskap)} / {formatNumber(nextThreshold.level)}
            </span>
          )}
        </div>

        {currentThreshold && (
          <div className="mb-2">
            <span className="text-sm font-medium text-owner-accent">{currentThreshold.label}</span>
            <p className="text-xs text-owner-text/70 italic mt-0.5">{currentThreshold.description}</p>
          </div>
        )}

        {nextThreshold && (
          <div className="w-full h-2 bg-owner-text/8 rounded-sm overflow-hidden mb-2">
            <div
              className="h-full rounded-sm transition-all duration-500"
              style={{
                width: `${Math.min(100, (kunskap / nextThreshold.level) * 100)}%`,
                background: 'linear-gradient(90deg, #5E9E6E88, #5E9E6E)',
              }}
            />
          </div>
        )}

        {/* All thresholds as checklist */}
        <div className="flex flex-col gap-1 mt-2">
          {KNOWLEDGE_THRESHOLDS.map(t => {
            const reached = kunskap >= t.level
            return (
              <div key={t.level} className="flex items-center gap-2 text-xs">
                <span className={reached ? 'text-owner-accent' : 'text-owner-text/50'}>
                  {reached ? '✓' : '○'}
                </span>
                <span className={reached ? 'text-owner-text/85' : 'text-owner-text/50'}>
                  {t.level}: {t.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Knowledge Tree ── */}
      <div className="flex flex-col gap-3">
        <h2 className="text-base font-medium text-owner-text">🌳 Kunskapsträd</h2>
        <p className="text-xs text-owner-text/75 -mt-2">
          Investera kunskap för att utveckla din skog och ditt motstånd.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {KNOWLEDGE_CATEGORIES.map(cat => {
            const upgrades = getUpgradesByCategory(cat.id)
            return (
              <div key={cat.id} className="owner-card-subtle p-3">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">{cat.icon}</span>
                  <span className="text-sm font-medium text-owner-text">{cat.name}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {upgrades.map((upgrade, i) => (
                    <KnowledgeNode
                      key={upgrade.id}
                      upgrade={upgrade}
                      purchased={!!ownerKnowledgeUpgrades[upgrade.id]}
                      canAfford={kunskap >= upgrade.cost}
                      prerequisitesMet={upgrade.prerequisites.every(p => ownerKnowledgeUpgrades[p])}
                      svMet={!upgrade.svRequired || totalSV >= upgrade.svRequired}
                      isFirst={i === 0}
                      onPurchase={() => {
                        purchaseOwnerKnowledge(upgrade.id)
                        playPurchase()
                      }}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Knowledge Activities */}
      <div className="flex flex-col gap-3">
        <h2 className="text-base font-medium text-owner-text">📖 Lär dig mer</h2>
        <p className="text-xs text-owner-text/75 -mt-2">
          Spendera Inkomst för att öka din Skogskunskap.
        </p>

        {isOnCooldown && (
          <div className="owner-card p-2 text-xs text-owner-text/75 text-center font-numbers" style={{
            background: 'linear-gradient(145deg, rgba(94,158,110,0.12) 0%, rgba(94,158,110,0.05) 100%)',
          }}>
            Kunskapsvila: {Math.ceil(cooldownRemaining / 1000)}s
          </div>
        )}

        <div className="flex flex-col gap-2">
          {KNOWLEDGE_ACTIVITIES.map(activity => {
            const canAfford = inkomst >= activity.cost && !isOnCooldown
            return (
              <div
                key={activity.id}
                className={`select-none p-3
                  ${canAfford ? 'owner-card-interactive' : 'owner-card-subtle opacity-60'}`}
                onClick={() => {
                  if (canAfford) {
                    buyKnowledgeActivity(activity.id)
                    playPurchase()
                  }
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg flex-shrink-0">{activity.icon}</span>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-owner-text">{activity.name}</span>
                    <p className="text-xs text-owner-text/70 leading-relaxed">{activity.description}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className={`text-sm font-numbers ${canAfford ? 'text-owner-accent font-medium' : 'text-owner-text/60'}`}>
                      {`${formatNumber(activity.cost)} tkr`}
                    </span>
                    <div className="text-xs text-owner-accent font-numbers">+{activity.kunskapReward} kunskap</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ── Knowledge Tree Node ──

function KnowledgeNode({ upgrade, purchased, canAfford, prerequisitesMet, svMet, isFirst, onPurchase }: {
  upgrade: OwnerKnowledgeUpgrade
  purchased: boolean
  canAfford: boolean
  prerequisitesMet: boolean
  svMet: boolean
  isFirst: boolean
  onPurchase: () => void
}) {
  const available = !purchased && canAfford && prerequisitesMet && svMet
  const locked = !purchased && (!prerequisitesMet || !svMet)

  return (
    <div className="flex items-start gap-2">
      {/* Connector line */}
      <div className="flex flex-col items-center flex-shrink-0 w-4 mt-1">
        {!isFirst && (
          <div className={`w-px h-2 ${purchased ? 'bg-owner-accent' : 'bg-owner-text/15'}`} />
        )}
        <div className={`w-3 h-3 rounded-full border-2 flex-shrink-0
          ${purchased
            ? 'bg-owner-accent border-owner-accent'
            : available
              ? 'bg-transparent border-owner-accent'
              : 'bg-transparent border-owner-text/25'
          }`}
        />
      </div>

      {/* Node content */}
      <div
        className={`flex-1 rounded p-2 select-none transition-all
          ${purchased
            ? 'bg-owner-accent/15 border border-owner-accent/30'
            : available
              ? 'bg-white/8 border border-owner-accent/40 cursor-pointer hover:border-owner-accent hover:shadow-sm'
              : 'bg-white/4 border border-owner-text/12 opacity-55'
          }`}
        onClick={() => {
          if (available) onPurchase()
        }}
      >
        <div className="flex items-center gap-1.5">
          <span className="text-sm">{upgrade.icon}</span>
          <span className={`text-xs font-medium ${purchased ? 'text-owner-accent' : locked ? 'text-owner-text/55' : 'text-owner-text'}`}>
            {upgrade.name}
          </span>
          {purchased && <span className="text-xs text-owner-accent ml-auto">✓</span>}
          {!purchased && (
            <span className={`text-xs font-numbers ml-auto ${canAfford && prerequisitesMet ? 'text-owner-accent' : 'text-owner-text/50'}`}>
              {upgrade.cost}
            </span>
          )}
        </div>
        <p className={`text-xs leading-relaxed mt-0.5 ${purchased ? 'text-owner-text/70' : locked ? 'text-owner-text/40' : 'text-owner-text/65'}`}>
          {upgrade.description}
        </p>
        {!purchased && upgrade.svRequired && !svMet && (
          <p className="text-[0.6rem] text-[#B8860B]/70 mt-1">
            Kräver {formatNumber(upgrade.svRequired)} skogsvärde
          </p>
        )}
      </div>
    </div>
  )
}

// ── Aggregate Knowledge Modifiers Display ──

const MODIFIER_LABELS: Record<string, { label: string; format: (v: number) => string }> = {
  svPerClickMult: { label: 'Skogsvärde/klick', format: v => `+${Math.round(v * 100)}%` },
  svPerSecondMult: { label: 'Skogsvärde/s', format: v => `+${Math.round(v * 100)}%` },
  inkomstMult: { label: 'Inkomst/s', format: v => `+${Math.round(v * 100)}%` },
  biodivRate: { label: 'Biodiversitet/s', format: v => `+${v.toFixed(2)}` },
  resiliensRate: { label: 'Resiliens/s', format: v => `+${v.toFixed(2)}` },
  legacyRate: { label: 'Generationsarv/s', format: v => `+${v.toFixed(2)}` },
  attackResistance: { label: 'Motståndskraft', format: v => `-${Math.round(v * 100)}% kunskapskrav` },
  lureCostReduction: { label: 'Lockelsekostnad', format: v => `-${Math.round(v * 100)}%` },
}

function KnowledgeModifiersSummary({ upgrades }: { upgrades: Record<string, boolean> }) {
  const mods = computeKnowledgeModifiers(upgrades)
  const activeEntries = Object.entries(mods).filter(([, v]) => v > 0)

  if (activeEntries.length === 0) return null

  return (
    <div className="owner-card p-3" style={{
      background: 'linear-gradient(145deg, rgba(94,158,110,0.12) 0%, rgba(94,158,110,0.04) 100%)',
    }}>
      <span className="text-owner-text/80 text-xs uppercase tracking-wider">Aktiva modifierare</span>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1 mt-2">
        {activeEntries.map(([key, value]) => {
          const info = MODIFIER_LABELS[key]
          if (!info) return null
          return (
            <div key={key} className="flex flex-col">
              <span className="text-[0.65rem] text-owner-text/70 uppercase tracking-wider">{info.label}</span>
              <span className="text-sm font-numbers text-owner-accent font-medium">{info.format(value)}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
