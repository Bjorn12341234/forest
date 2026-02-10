import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../../store/gameStore'
import { getIndustryLure } from '../../data/industryLures'

export function IndustryLureModal() {
  const lureId = useGameStore(s => s.activeIndustryLure)
  const inkomst = useGameStore(s => s.inkomst)
  const resolve = useGameStore(s => s.resolveIndustryLure)
  const [revealed, setRevealed] = useState(false)

  const lure = lureId ? getIndustryLure(lureId) : null

  if (!lure) return null

  const canDecline = !lure.declineEffects.inkomstCost || inkomst >= lure.declineEffects.inkomstCost

  return (
    <AnimatePresence>
      {lure && (
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
              className="p-6 max-w-md w-full mx-auto max-h-[85vh] overflow-y-auto rounded-xl"
              style={{
                background: '#F5F0E8',
                border: '2px solid #D4730C',
                boxShadow: '0 0 40px rgba(212,115,12,0.2), 0 4px 24px rgba(0,0,0,0.3)',
              }}
            >
              {/* Category badge */}
              <div className="mb-4">
                <span
                  className="text-xs font-bold uppercase tracking-[0.15em] px-2 py-1 rounded"
                  style={{
                    color: '#D4730C',
                    background: 'rgba(212,115,12,0.1)',
                    border: '1px solid rgba(212,115,12,0.3)',
                  }}
                >
                  LOCKELSE
                </span>
              </div>

              {/* Name */}
              <h2 className="text-xl font-bold text-[#3D2B1F] leading-tight mb-3">
                {lure.name}
              </h2>

              {/* Offer */}
              <p className="text-base text-[#3D2B1F]/80 leading-relaxed mb-4">
                {lure.offer}
              </p>

              {/* Trap reveal */}
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mb-4 p-3 rounded-lg"
                  style={{ background: 'rgba(204,51,51,0.08)', border: '1px solid rgba(204,51,51,0.2)' }}
                >
                  <p className="text-sm text-[#CC3333] font-medium mb-1">Sanningen:</p>
                  <p className="text-sm text-[#3D2B1F]/70">{lure.trap}</p>
                </motion.div>
              )}

              {/* Choices */}
              <div className="flex flex-col gap-3">
                {/* Accept (trap) */}
                <button
                  onClick={() => {
                    if (!revealed) {
                      setRevealed(true)
                    } else {
                      resolve(true)
                    }
                  }}
                  className="w-full text-left p-3 rounded-lg border cursor-pointer transition-all duration-150"
                  style={{
                    background: revealed ? 'rgba(204,51,51,0.05)' : 'rgba(212,115,12,0.08)',
                    borderColor: revealed ? 'rgba(204,51,51,0.2)' : 'rgba(212,115,12,0.3)',
                  }}
                >
                  <span className="text-base font-medium" style={{ color: revealed ? '#CC3333' : '#D4730C' }}>
                    {revealed ? 'Acceptera \u00e4nd\u00e5' : 'Acceptera erbjudandet'}
                  </span>
                  {revealed && (
                    <p className="text-sm text-[#3D2B1F]/60 mt-1">
                      {lure.acceptEffects.skogsvardering
                        ? `-${Math.round((1 - lure.acceptEffects.skogsvardering) * 100)}% Skogsv\u00e4rdering`
                        : ''}
                      {lure.acceptEffects.resiliensPenalty ? ` -${lure.acceptEffects.resiliensPenalty} Resiliens` : ''}
                      {lure.acceptEffects.biodivPenalty ? ` -${lure.acceptEffects.biodivPenalty} Biodiversitet` : ''}
                    </p>
                  )}
                </button>

                {/* Decline */}
                <button
                  onClick={() => {
                    if (!revealed) setRevealed(true)
                    resolve(false)
                  }}
                  disabled={!canDecline}
                  className="w-full text-left p-3 rounded-lg border cursor-pointer transition-all duration-150"
                  style={{
                    background: 'rgba(45,106,79,0.08)',
                    borderColor: 'rgba(45,106,79,0.3)',
                    opacity: canDecline ? 1 : 0.5,
                  }}
                >
                  <span className="text-base font-medium text-[#2D6A4F]">
                    Tacka nej
                  </span>
                  <p className="text-sm text-[#3D2B1F]/60 mt-1">
                    {lure.declineText}
                  </p>
                  {lure.declineEffects.inkomstCost && (
                    <p className="text-xs text-[#3D2B1F]/50 mt-1">
                      Kostar {lure.declineEffects.inkomstCost.toLocaleString('sv-SE')} Inkomst
                      {lure.declineEffects.kunskapGain ? `, +${lure.declineEffects.kunskapGain} Kunskap` : ''}
                    </p>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
