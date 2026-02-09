import { motion, AnimatePresence } from 'framer-motion'
import type { OfflineResult } from '../engine/offline'
import { formatNumber, formatDuration } from '../engine/format'

interface Props {
  report: OfflineResult | null
  onDismiss: () => void
}

export function OfflineReturnModal({ report, onDismiss }: Props) {
  return (
    <AnimatePresence>
      {report && <OfflineReturnContent report={report} onDismiss={onDismiss} />}
    </AnimatePresence>
  )
}

function OfflineReturnContent({ report, onDismiss }: { report: OfflineResult; onDismiss: () => void }) {
  const pendingCount = report.offlineEvents.length

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        className="fixed inset-0 z-[101] flex items-center justify-center p-4"
      >
        <div
          className="glass-card p-6 max-w-sm w-full mx-auto"
          style={{
            borderColor: 'rgba(212, 115, 12, 0.2)',
            boxShadow: '0 0 60px rgba(212, 115, 12, 0.15), 0 4px 32px rgba(0,0,0,0.6)',
          }}
        >
          {/* Header */}
          <div className="text-center mb-5">
            <div className="text-2xl mb-1">VÄLKOMMEN TILLBAKA</div>
            <div className="text-xs text-text-muted uppercase tracking-widest">
              Skogen har vuxit medan du var borta
            </div>
          </div>

          {/* Time away */}
          <div className="glass-card p-3 mb-3" style={{ background: 'rgba(0, 0, 0, 0.03)' }}>
            <div className="flex justify-between items-center">
              <span className="text-xs text-text-secondary">Tid borta</span>
              <span className="font-numbers text-sm text-text-primary">
                {formatDuration(report.elapsedSeconds)}
              </span>
            </div>
          </div>

          {/* Stammar gained */}
          <div className="glass-card p-3 mb-3" style={{ background: 'rgba(212, 115, 12, 0.05)' }}>
            <div className="flex justify-between items-center">
              <span className="text-xs text-text-secondary">Stammar avverkade</span>
              <span className="font-numbers text-sm font-bold" style={{ color: '#D4730C' }}>
                +{formatNumber(report.stammarGained)}
              </span>
            </div>
            <div className="text-[0.6rem] text-text-muted mt-1">
              Offlinetakt: {Math.round(report.offlineRate * 100)}%
            </div>
          </div>

          {/* Pending events */}
          {(pendingCount > 0 || report.autoResolvedCount > 0) && (
            <div className="glass-card p-3 mb-3" style={{ background: 'rgba(125, 184, 64, 0.05)' }}>
              {pendingCount > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-text-secondary">Väntande händelser</span>
                  <span className="font-numbers text-sm" style={{ color: '#7DB840' }}>
                    {pendingCount}
                  </span>
                </div>
              )}
              {report.autoResolvedCount > 0 && (
                <div className="text-[0.6rem] text-text-muted mt-1">
                  {report.autoResolvedCount} kris{report.autoResolvedCount > 1 ? 'er' : ''} auto-hanterade
                </div>
              )}
            </div>
          )}

          {/* Continue button */}
          <button
            onClick={onDismiss}
            className="w-full mt-4 py-3 rounded-lg font-bold text-sm cursor-pointer
                       border-none transition-all duration-150 hover:brightness-110 active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #D4730C, #E8943A)',
              color: '#FFFFFF',
              boxShadow: '0 2px 12px rgba(212, 115, 12, 0.3)',
            }}
          >
            {pendingCount > 0
              ? `Fortsätt (${pendingCount} händelse${pendingCount > 1 ? 'r' : ''} väntar)`
              : 'Fortsätt'}
          </button>
        </div>
      </motion.div>
    </>
  )
}
