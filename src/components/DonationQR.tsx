import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { isDonator, markDonated } from '../engine/donation'

interface DonationQRProps {
  isOpen: boolean
  onClose: () => void
}

const SWISH_NUMBER = '123-248 51 59'
const QR_IMAGE_PATH = `${import.meta.env.BASE_URL}swish-qr.png`

export function DonationQR({ isOpen, onClose }: DonationQRProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [donated, setDonated] = useState(isDonator)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showThanks, setShowThanks] = useState(false)

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Focus trap
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus()
    }
  }, [isOpen])

  // Reset confirm state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setShowConfirm(false)
      setShowThanks(false)
    }
  }, [isOpen])

  const handleDonateClick = useCallback(() => {
    if (donated) return
    setShowConfirm(true)
  }, [donated])

  const handleConfirm = useCallback(() => {
    markDonated()
    setDonated(true)
    setShowConfirm(false)
    setShowThanks(true)
  }, [])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-label="Donera till Föreningen Naturhänsyn"
              tabIndex={-1}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-sm bg-[#1A1A1A] border border-white/15 rounded-sm p-6 outline-none"
              style={{ fontFamily: 'IBM Plex Mono, monospace' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-white/40 hover:text-white/80 text-lg cursor-pointer bg-transparent border-none transition-colors"
                aria-label="Stäng"
              >
                &#10005;
              </button>

              {/* Header */}
              <div className="text-center mb-5">
                <p className="text-[0.6rem] tracking-[0.3em] text-white/30 uppercase mb-2">
                  Stöd arbetet
                </p>
                <h2 className="text-sm font-bold tracking-wider text-white/90">
                  Donera till Föreningen Naturhänsyn
                </h2>
              </div>

              {/* QR Code — real scannable image */}
              <div className="flex justify-center mb-5">
                <img
                  src={QR_IMAGE_PATH}
                  alt="Swish QR-kod för Föreningen Naturhänsyn"
                  width={200}
                  height={283}
                  className="rounded"
                  style={{ imageRendering: 'auto' }}
                />
              </div>

              {/* Instructions */}
              <div className="text-center space-y-2">
                <p className="text-xs text-white/60 leading-relaxed">
                  Öppna Swish och scanna QR-koden, eller swisha direkt till:
                </p>
                <p className="text-sm font-bold text-[#52B5AA] tracking-wider">
                  {SWISH_NUMBER}
                </p>
                <p className="text-[0.6rem] text-white/30 mt-3">
                  Föreningen Naturhänsyn arbetar för naturhänsyn i skogsbruket
                </p>
              </div>

              {/* "Jag har swishat" button */}
              <div className="mt-5 text-center">
                {showThanks ? (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-[#52B5AA] font-bold"
                  >
                    Tack för ditt stöd! 🌿
                  </motion.p>
                ) : showConfirm ? (
                  <div className="space-y-2">
                    <p className="text-xs text-white/60">Tack! Markera som donerat?</p>
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={handleConfirm}
                        className="px-4 py-1.5 text-xs font-medium rounded-sm cursor-pointer border-none transition-colors"
                        style={{ background: '#52B5AA', color: '#fff' }}
                      >
                        Ja
                      </button>
                      <button
                        onClick={() => setShowConfirm(false)}
                        className="px-4 py-1.5 text-xs text-white/50 bg-white/5 border border-white/10 rounded-sm cursor-pointer hover:bg-white/10 transition-colors"
                      >
                        Avbryt
                      </button>
                    </div>
                  </div>
                ) : donated ? (
                  <p className="text-xs text-[#52B5AA]/70">
                    🌿 Tack för ditt stöd!
                  </p>
                ) : (
                  <button
                    onClick={handleDonateClick}
                    className="px-4 py-2 text-xs font-medium rounded-sm cursor-pointer border border-[#52B5AA]/30 bg-[#52B5AA]/10 text-[#52B5AA] hover:bg-[#52B5AA]/20 transition-colors"
                  >
                    Jag har swishat ❤️
                  </button>
                )}
              </div>

              {/* Link */}
              <div className="mt-4 text-center">
                <a
                  href="https://naturhansyn.se/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.6rem] text-white/30 hover:text-white/50 underline transition-colors"
                >
                  naturhansyn.se
                </a>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Inline version for end screens (no modal wrapper)
export function DonationQRInline() {
  return (
    <div className="text-center">
      <div className="w-8 h-px bg-white/10 mx-auto mb-6" />

      <p
        className="text-[0.6rem] tracking-[0.2em] text-white/30 uppercase mb-3"
        style={{ fontFamily: 'IBM Plex Mono, monospace' }}
      >
        Stöd arbetet
      </p>

      {/* Inline QR image */}
      <div className="flex justify-center mb-4">
        <img
          src={QR_IMAGE_PATH}
          alt="Swish QR-kod för Föreningen Naturhänsyn"
          width={140}
          height={198}
          className="rounded"
          style={{ imageRendering: 'auto' }}
        />
      </div>

      <p
        className="text-xs text-white/50 leading-relaxed mb-2"
        style={{ fontFamily: 'IBM Plex Mono, monospace' }}
      >
        Swisha direkt till:
      </p>

      <p
        className="text-lg font-bold text-[#52B5AA] tracking-wider mb-2"
        style={{ fontFamily: 'IBM Plex Mono, monospace' }}
      >
        {SWISH_NUMBER}
      </p>

      <p
        className="text-[0.55rem] text-white/25 mb-4"
        style={{ fontFamily: 'IBM Plex Mono, monospace' }}
      >
        Föreningen Naturhänsyn
      </p>
    </div>
  )
}
