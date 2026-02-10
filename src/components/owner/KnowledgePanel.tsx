import { useGameStore } from '../../store/gameStore'
import { KNOWLEDGE_ACTIVITIES, KNOWLEDGE_THRESHOLDS } from '../../data/ownerKnowledge'
import { formatNumber } from '../../engine/format'
import { AnimatedNumber } from '../ui/AnimatedNumber'
import { playPurchase } from '../../engine/audio'

export function KnowledgePanel() {
  const inkomst = useGameStore(s => s.inkomst)
  const kunskap = useGameStore(s => s.kunskap)
  const resiliens = useGameStore(s => s.resiliens)
  const biodivOwner = useGameStore(s => s.biodivOwner)
  const buyKnowledgeActivity = useGameStore(s => s.buyKnowledgeActivity)

  // Find current and next threshold
  const currentThreshold = KNOWLEDGE_THRESHOLDS.filter(t => kunskap >= t.level).pop()
  const nextThreshold = KNOWLEDGE_THRESHOLDS.find(t => kunskap < t.level)

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      {/* Resource Summary */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white/60 border border-owner-accent/20 rounded-sm p-3">
          <span className="text-owner-text/60 text-xs uppercase tracking-wider">Skogskunskap</span>
          <AnimatedNumber value={kunskap} className="text-lg text-owner-accent" />
        </div>
        <div className="bg-white/60 border border-owner-accent/20 rounded-sm p-3">
          <span className="text-owner-text/60 text-xs uppercase tracking-wider">Resiliens</span>
          <AnimatedNumber value={resiliens} className={`text-lg ${resiliens > 50 ? 'text-owner-accent' : resiliens > 20 ? 'text-[#B8860B]' : 'text-[#CC2222]'}`} />
        </div>
      </div>

      {/* Biodiversity meter */}
      <div className="bg-white/60 border border-owner-accent/20 rounded-sm p-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-owner-text/60 text-xs uppercase tracking-wider">Biologisk mångfald</span>
          <span className="text-sm font-numbers text-owner-accent">{formatNumber(biodivOwner)} arter</span>
        </div>
        <div className="w-full h-2 bg-owner-text/10 rounded-sm overflow-hidden">
          <div
            className="h-full bg-owner-accent transition-all duration-500"
            style={{ width: `${Math.min(100, (biodivOwner / 100) * 100)}%` }}
          />
        </div>
      </div>

      {/* Knowledge Threshold Progress */}
      <div className="bg-white/60 border border-owner-accent/20 rounded-sm p-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-owner-text/60 text-xs uppercase tracking-wider">Kunskapsnivå</span>
          {nextThreshold && (
            <span className="text-xs text-owner-text/40 font-numbers">
              {formatNumber(kunskap)} / {formatNumber(nextThreshold.level)}
            </span>
          )}
        </div>

        {currentThreshold && (
          <div className="mb-2">
            <span className="text-sm font-medium text-owner-accent">{currentThreshold.label}</span>
            <p className="text-xs text-owner-text/50 italic mt-0.5">{currentThreshold.description}</p>
          </div>
        )}

        {nextThreshold && (
          <div className="w-full h-2 bg-owner-text/10 rounded-sm overflow-hidden mb-2">
            <div
              className="h-full bg-owner-accent/60 transition-all duration-500"
              style={{ width: `${Math.min(100, (kunskap / nextThreshold.level) * 100)}%` }}
            />
          </div>
        )}

        {/* All thresholds as checklist */}
        <div className="flex flex-col gap-1 mt-2">
          {KNOWLEDGE_THRESHOLDS.map(t => {
            const reached = kunskap >= t.level
            return (
              <div key={t.level} className="flex items-center gap-2 text-xs">
                <span className={reached ? 'text-owner-accent' : 'text-owner-text/30'}>
                  {reached ? '✓' : '○'}
                </span>
                <span className={reached ? 'text-owner-text/70' : 'text-owner-text/30'}>
                  {t.level}: {t.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Knowledge Activities */}
      <div className="flex flex-col gap-3">
        <h2 className="text-base font-medium text-owner-text">Lär dig mer</h2>
        <p className="text-xs text-owner-text/50 -mt-2">
          Spendera Inkomst för att öka din Skogskunskap.
        </p>

        <div className="flex flex-col gap-2">
          {KNOWLEDGE_ACTIVITIES.map(activity => {
            const canAfford = inkomst >= activity.cost
            return (
              <div
                key={activity.id}
                className={`bg-white/60 border rounded-sm p-3 select-none
                  ${canAfford ? 'border-owner-accent/50 cursor-pointer hover:border-owner-accent' : 'border-owner-text/10 opacity-50'}`}
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
                    <p className="text-xs text-owner-text/50 leading-relaxed">{activity.description}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className={`text-sm font-numbers ${canAfford ? 'text-owner-accent' : 'text-owner-text/40'}`}>
                      {activity.cost === 0 ? 'Gratis' : `${formatNumber(activity.cost)} tkr`}
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
