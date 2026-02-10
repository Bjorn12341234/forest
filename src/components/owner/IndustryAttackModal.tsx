import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../../store/gameStore'
import { getIndustryAttack } from '../../data/industryAttacks'
import { computeKnowledgeModifiers } from '../../data/ownerKnowledgeTree'
import { useFocusTrap } from '../../hooks/useFocusTrap'

export function IndustryAttackModal() {
  const attackId = useGameStore(s => s.activeIndustryAttack)
  const kunskap = useGameStore(s => s.kunskap)
  const inkomst = useGameStore(s => s.inkomst)
  const resolve = useGameStore(s => s.resolveIndustryAttack)
  const knowledgeUpgrades = useGameStore(s => s.ownerKnowledgeUpgrades)

  const trapRef = useFocusTrap()
  const atk = attackId ? getIndustryAttack(attackId) : null

  if (!atk) return null

  const mods = computeKnowledgeModifiers(knowledgeUpgrades)
  const effectiveKunskapReq = Math.floor(atk.kunskapRequired * (1 - mods.attackResistance))
  const canResist = kunskap >= effectiveKunskapReq
    && (!atk.extraCostResource || !atk.extraCostAmount || inkomst >= atk.extraCostAmount)

  return (
    <AnimatePresence>
      {atk && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div
              ref={trapRef}
              role="dialog"
              aria-modal="true"
              aria-label={atk.name}
              className="p-6 max-w-md w-full mx-auto max-h-[85vh] overflow-y-auto rounded-xl"
              style={{
                background: 'var(--color-owner-bg)',
                border: '2px solid #CC3333',
                boxShadow: '0 0 40px rgba(204,51,51,0.2), 0 4px 24px rgba(0,0,0,0.3)',
              }}
            >
              {/* Category badge */}
              <div className="mb-4">
                <span
                  className="text-xs font-bold uppercase tracking-[0.15em] px-2 py-1 rounded"
                  style={{
                    color: '#CC3333',
                    background: 'rgba(204,51,51,0.1)',
                    border: '1px solid rgba(204,51,51,0.3)',
                  }}
                >
                  INDUSTRIATTACK
                </span>
              </div>

              {/* Name */}
              <h2 className="text-xl font-bold text-owner-text leading-tight mb-3">
                {atk.name}
              </h2>

              {/* Description */}
              <p className="text-base text-owner-text/80 leading-relaxed mb-6">
                {atk.description}
              </p>

              {/* Choices */}
              <div className="flex flex-col gap-3">
                {/* Resist button */}
                <button
                  onClick={() => resolve(false)}
                  disabled={!canResist}
                  className="w-full text-left p-3 rounded-lg border cursor-pointer transition-all duration-150"
                  style={{
                    background: canResist ? 'rgba(45,106,79,0.1)' : 'rgba(0,0,0,0.05)',
                    borderColor: canResist ? 'rgba(45,106,79,0.4)' : 'rgba(0,0,0,0.1)',
                    opacity: canResist ? 1 : 0.5,
                  }}
                >
                  <span className="text-base font-medium text-owner-accent">
                    Motstå
                  </span>
                  <p className="text-sm text-owner-text/60 mt-1">
                    Kräver {effectiveKunskapReq} Kunskap
                    {effectiveKunskapReq < atk.kunskapRequired && (
                      <span className="text-owner-accent/50 line-through ml-1">{atk.kunskapRequired}</span>
                    )}
                    {atk.extraCostAmount ? ` + ${atk.extraCostAmount.toLocaleString('sv-SE')} Inkomst` : ''}
                  </p>
                  {canResist && (
                    <p className="text-xs text-owner-accent/70 mt-2 italic">
                      {atk.resistFlavour}
                    </p>
                  )}
                </button>

                {/* Accept/surrender button */}
                <button
                  onClick={() => resolve(true)}
                  className="w-full text-left p-3 rounded-lg border cursor-pointer transition-all duration-150"
                  style={{
                    background: 'rgba(204,51,51,0.05)',
                    borderColor: 'rgba(204,51,51,0.2)',
                  }}
                >
                  <span className="text-base font-medium text-[#CC3333]">
                    Ge efter
                  </span>
                  <p className="text-sm text-owner-text/60 mt-1">
                    {atk.acceptEffects.description}
                  </p>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
