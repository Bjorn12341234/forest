import { motion, AnimatePresence } from 'framer-motion'
import type { OfflineResult } from '../engine/offline'
import { formatNumber, formatDuration } from '../engine/format'
import { getLegitimacyStatus } from '../engine/formulas'

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
  const legStatus = getLegitimacyStatus(report.legitimacyAfter)
  const legDelta = report.legitimacyAfter - report.legitimacyBefore
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
            borderColor: 'rgba(255, 102, 0, 0.2)',
            boxShadow: '0 0 60px rgba(255, 102, 0, 0.15), 0 4px 32px rgba(0,0,0,0.6)',
          }}
        >
          {/* Header */}
          <div className="text-center mb-5">
            <div className="text-2xl mb-1">WELCOME BACK</div>
            <div className="text-xs text-text-muted uppercase tracking-widest">
              Greatness never sleeps
            </div>
          </div>

          {/* Time away */}
          <div className="glass-card p-3 mb-3" style={{ background: 'rgba(255, 255, 255, 0.03)' }}>
            <div className="flex justify-between items-center">
              <span className="text-xs text-text-secondary">Time away</span>
              <span className="font-numbers text-sm text-text-primary">
                {formatDuration(report.elapsedSeconds)}
              </span>
            </div>
          </div>

          {/* Greatness gained */}
          <div className="glass-card p-3 mb-3" style={{ background: 'rgba(255, 102, 0, 0.05)' }}>
            <div className="flex justify-between items-center">
              <span className="text-xs text-text-secondary">Greatness earned</span>
              <span className="font-numbers text-sm font-bold" style={{ color: '#FF6600' }}>
                +{formatNumber(report.greatnessGained)}
              </span>
            </div>
            <div className="text-[0.6rem] text-text-muted mt-1">
              Offline rate: {Math.round(report.offlineRate * 100)}%
            </div>
          </div>

          {/* Legitimacy (Phase 2+ only) */}
          {report.legitimacyBefore !== report.legitimacyAfter && (
            <div
              className="glass-card p-3 mb-3"
              style={{
                background: legStatus.critical
                  ? 'rgba(255, 51, 51, 0.08)'
                  : 'rgba(255, 255, 255, 0.03)',
                borderColor: legStatus.critical ? 'rgba(255, 51, 51, 0.2)' : undefined,
              }}
            >
              <div className="flex justify-between items-center">
                <span className="text-xs text-text-secondary">Legitimacy</span>
                <div className="flex items-center gap-2">
                  <span className="font-numbers text-xs text-text-muted">
                    {report.legitimacyBefore.toFixed(0)}%
                  </span>
                  <span className="text-text-muted text-xs">&rarr;</span>
                  <span
                    className="font-numbers text-sm font-bold"
                    style={{ color: legStatus.color }}
                  >
                    {report.legitimacyAfter.toFixed(0)}%
                  </span>
                </div>
              </div>
              {legDelta !== 0 && (
                <div
                  className="text-[0.6rem] mt-1"
                  style={{ color: legDelta < 0 ? '#CC4433' : '#33CC66' }}
                >
                  {legDelta > 0 ? '+' : ''}{legDelta.toFixed(1)}% while away
                </div>
              )}
              {legStatus.critical && (
                <div className="text-[0.6rem] font-bold mt-1" style={{ color: '#FF3333' }}>
                  WARNING: Legitimacy critical — stability at risk
                </div>
              )}
            </div>
          )}

          {/* Pending events */}
          {(pendingCount > 0 || report.autoResolvedCount > 0) && (
            <div className="glass-card p-3 mb-3" style={{ background: 'rgba(255, 215, 0, 0.05)' }}>
              {pendingCount > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-text-secondary">Events pending</span>
                  <span className="font-numbers text-sm" style={{ color: '#FFD700' }}>
                    {pendingCount}
                  </span>
                </div>
              )}
              {report.autoResolvedCount > 0 && (
                <div className="text-[0.6rem] text-text-muted mt-1">
                  {report.autoResolvedCount} crisis event{report.autoResolvedCount > 1 ? 's' : ''} auto-resolved
                  (legitimacy was critical)
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
              background: 'linear-gradient(135deg, #FF6600, #FF8833)',
              color: '#FFFFFF',
              boxShadow: '0 2px 12px rgba(255, 102, 0, 0.3)',
            }}
          >
            {pendingCount > 0
              ? `Continue (${pendingCount} event${pendingCount > 1 ? 's' : ''} waiting)`
              : 'Continue'}
          </button>
        </div>
      </motion.div>
    </>
  )
}
