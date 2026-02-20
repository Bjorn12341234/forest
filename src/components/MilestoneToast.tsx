import { motion, AnimatePresence } from 'framer-motion'
import type { MilestoneToast } from '../hooks/useMilestones'

interface MilestoneToastManagerProps {
  toasts: MilestoneToast[]
  onDismiss: (id: number) => void
}

export function MilestoneToastManager({ toasts, onDismiss }: MilestoneToastManagerProps) {
  return (
    <div role="status" aria-live="polite" className="fixed top-20 left-1/2 -translate-x-1/2 z-[85] flex flex-col gap-2 pointer-events-none max-w-[calc(100vw-2rem)] sm:max-w-xs w-full px-4">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="pointer-events-auto"
            onClick={() => onDismiss(toast.id)}
          >
            <div
              className="rounded-lg px-4 py-2 text-center font-bold tracking-wider text-sm cursor-pointer"
              style={{
                background: toast.isOwner
                  ? 'linear-gradient(135deg, rgba(var(--color-owner-accent-rgb), 0.9), rgba(var(--color-owner-accent-rgb), 0.7))'
                  : 'linear-gradient(135deg, rgba(212, 115, 12, 0.9), rgba(212, 115, 12, 0.7))',
                color: '#fff',
                boxShadow: toast.isOwner
                  ? '0 0 20px rgba(var(--color-owner-accent-rgb), 0.4), 0 4px 16px rgba(0, 0, 0, 0.3)'
                  : '0 0 20px rgba(212, 115, 12, 0.4), 0 4px 16px rgba(0, 0, 0, 0.3)',
                border: `1px solid ${toast.isOwner ? 'rgba(var(--color-owner-accent-rgb), 0.5)' : 'rgba(212, 115, 12, 0.5)'}`,
              }}
            >
              {toast.text}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
