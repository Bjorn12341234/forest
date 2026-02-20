import { motion } from 'framer-motion'
import { useGameStore } from '../../store/gameStore'
import { getExpansionTarget } from '../../data/expansionTargets'
import { formatNumber } from '../../engine/format'
import { playPurchase } from '../../engine/audio'

const STAGE_LABELS = ['Uppskjutningsramp', 'Omloppsrelä', 'Månbas']

interface Props {
  targetId: string
}

export function SupplyChainMechanic({ targetId }: Props) {
  const ts = useGameStore(s => s.expansionTargets[targetId])
  const stammar = useGameStore(s => s.stammar)
  const kapital = useGameStore(s => s.kapital)
  const advanceSupplyChainStage = useGameStore(s => s.advanceSupplyChainStage)

  const target = getExpansionTarget(targetId)
  if (!ts?.supplyChain || !target?.stageCosts) return null

  const sc = ts.supplyChain
  const isBuilding = sc.stageStartedAt != null && sc.stageProgress < 1

  function handleBuild() {
    advanceSupplyChainStage(targetId)
    playPurchase()
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs uppercase tracking-widest text-text-muted">Leveranskedja</span>

      {/* Stage nodes */}
      <div className="flex items-center gap-1">
        {STAGE_LABELS.map((label, i) => {
          const completed = sc.stage > i
          const active = sc.stage === i
          const building = active && isBuilding

          return (
            <div key={i} className="flex items-center gap-1 flex-1">
              <div className={`flex flex-col items-center flex-1 ${active ? '' : 'opacity-60'}`}>
                <div className={`w-full h-6 rounded-sm flex items-center justify-center text-xs
                  ${completed ? 'bg-accent/20 text-accent' :
                    building ? 'bg-accent/10 text-accent' :
                    'bg-bg-tertiary text-text-muted'}`}>
                  {completed ? '✓' : `${i + 1}`}
                </div>
                <span className="text-xs text-text-muted mt-0.5 text-center leading-tight">{label}</span>
              </div>
              {i < 2 && (
                <span className={`text-xs ${completed ? 'text-accent' : 'text-text-muted/30'}`}>→</span>
              )}
            </div>
          )
        })}
      </div>

      {/* Progress bar for active building stage */}
      {isBuilding && (
        <div className="w-full h-2 bg-bg-tertiary rounded-sm overflow-hidden">
          <motion.div
            className="h-full bg-accent rounded-sm"
            initial={{ width: 0 }}
            animate={{ width: `${sc.stageProgress * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}

      {/* Build button for current stage */}
      {sc.stage < 3 && !isBuilding && (
        (() => {
          const cost = target.stageCosts![sc.stage]
          const canAfford = stammar >= cost.stammar && kapital >= cost.kapital
          return (
            <button
              onClick={() => canAfford && handleBuild()}
              disabled={!canAfford}
              className={`w-full px-3 py-2 rounded-sm text-xs font-medium border transition-all cursor-pointer
                ${canAfford
                  ? 'bg-accent/10 border-accent/30 text-accent hover:bg-accent/20'
                  : 'bg-bg-tertiary border-bg-tertiary text-text-muted cursor-not-allowed'}`}
            >
              Bygg {STAGE_LABELS[sc.stage]} — {formatNumber(cost.stammar)} stammar + {formatNumber(cost.kapital)} kapital
            </button>
          )
        })()
      )}
    </div>
  )
}
