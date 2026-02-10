import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { LOBBY_EARNERS, LOBBY_PURCHASES, type LobbyEarnerData, type LobbyPurchaseData } from '../data/lobbyProjects'
import { PR_CAMPAIGNS, type PRCampaignData } from '../data/ownerActions'
import { formatNumber } from '../engine/format'
import { GlassCard } from './ui/GlassCard'
import { AnimatedNumber } from './ui/AnimatedNumber'
import { playPurchase } from '../engine/audio'
import { OwnerMeter } from './OwnerMeter'
import { AntagonistPanel } from './AntagonistPanel'

export function LobbyPanel() {
  const phase = useGameStore(s => s.phase)
  const kapital = useGameStore(s => s.kapital)
  const lobby = useGameStore(s => s.lobby)
  const image = useGameStore(s => s.image)
  const lobbyProjects = useGameStore(s => s.lobbyProjects)
  const buyLobbyEarner = useGameStore(s => s.buyLobbyEarner)
  const buyLobbyProject = useGameStore(s => s.buyLobbyProject)
  const buyPRCampaign = useGameStore(s => s.buyPRCampaign)

  const visibleEarners = useMemo(() => {
    return LOBBY_EARNERS.filter(e => e.unlockPhase <= phase)
  }, [phase])

  const visiblePurchases = useMemo(() => {
    return LOBBY_PURCHASES.filter(p => p.unlockPhase <= phase)
  }, [phase])

  // Show PR campaigns when image < 80 or phase >= 3
  const showPR = image < 80 || phase >= 3

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      {/* Resource Summary */}
      <div className="grid grid-cols-2 gap-2">
        <GlassCard padding="sm">
          <div className="flex flex-col gap-0.5">
            <span className="text-text-muted text-xs uppercase tracking-wider">Politiskt Kapital</span>
            <AnimatedNumber value={lobby} className="text-lg text-text-primary" />
          </div>
        </GlassCard>
        <GlassCard padding="sm">
          <div className="flex flex-col gap-0.5">
            <span className="text-text-muted text-xs uppercase tracking-wider">Grön Image™</span>
            <AnimatedNumber value={image} className={`text-lg ${image > 60 ? 'text-accent-green' : image > 30 ? 'text-accent' : 'text-danger'}`} />
          </div>
        </GlassCard>
      </div>

      {/* Owner Trust Meter */}
      <OwnerMeter />

      {/* Antagonists (shown when any are active) */}
      <AntagonistPanel />

      {/* Two-column layout on larger screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Earn PK */}
        <div className="flex flex-col gap-3">
          <h2 className="text-base font-medium text-text-primary">Tjäna Politiskt Kapital</h2>
          <p className="text-xs text-text-muted -mt-2">Spendera Kapital för att bygga politiskt inflytande.</p>

          <div className="flex flex-col gap-2">
            {visibleEarners.map(earner => (
              <LobbyEarnerRow
                key={earner.id}
                data={earner}
                kapital={kapital}
                count={lobbyProjects[earner.id]?.count ?? 0}
                onBuy={() => {
                  buyLobbyEarner(earner.id)
                  playPurchase()
                }}
              />
            ))}
          </div>

          {/* PR Campaigns */}
          {showPR && (
            <>
              <h2 className="text-base font-medium text-text-primary mt-4">PR-kampanjer</h2>
              <p className="text-xs text-text-muted -mt-2">Köp tillbaka er Gröna Image™.</p>
              <div className="flex flex-col gap-2">
                {PR_CAMPAIGNS.map(campaign => (
                  <PRCampaignRow
                    key={campaign.id}
                    data={campaign}
                    kapital={kapital}
                    image={image}
                    onBuy={() => {
                      buyPRCampaign(campaign.id)
                      playPurchase()
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Right: Spend PK on law changes */}
        <div className="flex flex-col gap-3">
          <h2 className="text-base font-medium text-text-primary">Lagändringar & Projekt</h2>
          <p className="text-xs text-text-muted -mt-2">Använd Politiskt Kapital för att ändra regelverket.</p>

          <div className="flex flex-col gap-2">
            <AnimatePresence initial={false}>
              {visiblePurchases.map((purchase, i) => (
                <motion.div
                  key={purchase.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                >
                  <LobbyPurchaseRow
                    data={purchase}
                    lobby={lobby}
                    purchased={lobbyProjects[purchase.id]?.purchased === true}
                    onBuy={() => {
                      buyLobbyProject(purchase.id)
                      playPurchase()
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Sub-components ──

function LobbyEarnerRow({ data, kapital, count, onBuy }: {
  data: LobbyEarnerData
  kapital: number
  count: number
  onBuy: () => void
}) {
  const canAfford = kapital >= data.cost
  return (
    <GlassCard
      padding="sm"
      hover={canAfford}
      glow={canAfford ? 'orange' : 'none'}
      className={`cursor-pointer select-none ${!canAfford ? 'opacity-50' : ''}`}
      onClick={() => canAfford && onBuy()}
      whileTap={canAfford ? { scale: 0.97 } : undefined}
    >
      <div className="flex items-center gap-2">
        <span className="text-lg flex-shrink-0">{data.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-text-primary">{data.name}</span>
            {count > 0 && (
              <span className="text-xs text-text-muted">x{count}</span>
            )}
          </div>
          <p className="text-xs text-text-muted leading-relaxed">{data.description}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <span className={`text-sm font-numbers ${canAfford ? 'text-accent' : 'text-text-muted'}`}>
            {formatNumber(data.cost)} Mkr
          </span>
          <div className="text-xs text-accent-green font-numbers">+{data.pkReward} PK</div>
        </div>
      </div>
    </GlassCard>
  )
}

function LobbyPurchaseRow({ data, lobby, purchased, onBuy }: {
  data: LobbyPurchaseData
  lobby: number
  purchased: boolean
  onBuy: () => void
}) {
  const canAfford = !purchased && lobby >= data.cost
  return (
    <GlassCard
      padding="sm"
      hover={canAfford}
      glow={purchased ? 'green' : canAfford ? 'gold' : 'none'}
      className={`cursor-pointer select-none ${!canAfford && !purchased ? 'opacity-50' : ''}`}
      onClick={() => canAfford && onBuy()}
      whileTap={canAfford ? { scale: 0.97 } : undefined}
    >
      <div className="flex items-start gap-2">
        <span className="text-lg flex-shrink-0 mt-0.5">{data.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-text-primary">{data.name}</span>
            {purchased && <span className="w-2 h-2 rounded-full bg-success flex-shrink-0" />}
          </div>
          <p className="text-xs text-text-muted leading-relaxed">{data.description}</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {data.effects.map((eff, i) => (
              <span key={i} className="text-xs text-accent-green bg-accent-green/10 px-1.5 py-0.5 rounded">
                {eff.description}
              </span>
            ))}
          </div>
          <p className="text-xs text-text-muted/60 mt-1 italic">Baserat på: {data.basedOn}</p>
        </div>
        <div className="text-right flex-shrink-0">
          {purchased ? (
            <span className="text-xs text-success">Antagen</span>
          ) : (
            <span className={`text-sm font-numbers ${canAfford ? 'text-accent' : 'text-text-muted'}`}>
              {formatNumber(data.cost)} PK
            </span>
          )}
        </div>
      </div>
    </GlassCard>
  )
}

function PRCampaignRow({ data, kapital, image, onBuy }: {
  data: PRCampaignData
  kapital: number
  image: number
  onBuy: () => void
}) {
  const canAfford = kapital >= data.cost
  const atMax = image >= 100
  const effective = !atMax && canAfford
  return (
    <GlassCard
      padding="sm"
      hover={effective}
      glow={effective ? 'green' : 'none'}
      className={`cursor-pointer select-none ${!effective ? 'opacity-50' : ''}`}
      onClick={() => effective && onBuy()}
      whileTap={effective ? { scale: 0.97 } : undefined}
    >
      <div className="flex items-center gap-2">
        <span className="text-lg flex-shrink-0">{data.icon}</span>
        <div className="flex-1 min-w-0">
          <span className="text-sm font-medium text-text-primary block">{data.name}</span>
          <p className="text-xs text-text-muted leading-relaxed">{data.description}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <span className={`text-sm font-numbers ${canAfford ? 'text-accent' : 'text-text-muted'}`}>
            {formatNumber(data.cost)} Mkr
          </span>
          <div className="text-xs text-accent-green font-numbers">+{data.imageGain} Image</div>
        </div>
      </div>
    </GlassCard>
  )
}
