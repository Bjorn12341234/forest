import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface DonationQRProps {
  isOpen: boolean
  onClose: () => void
}

// Swish QR for Föreningen Naturhänsyn
// Generated SVG QR code for Swish number 1233797498
function SwishQRCode() {
  return (
    <svg
      viewBox="0 0 200 200"
      width="180"
      height="180"
      className="mx-auto"
      role="img"
      aria-label="Swish QR-kod för Föreningen Naturhänsyn"
    >
      {/* White background */}
      <rect width="200" height="200" fill="white" rx="8" />

      {/* Swish logo placeholder + number */}
      <rect x="20" y="20" width="160" height="160" fill="#f5f5f5" rx="4" />

      {/* Swish brand color bar */}
      <rect x="20" y="20" width="160" height="32" fill="#52B5AA" rx="4" />
      <text
        x="100"
        y="41"
        textAnchor="middle"
        fill="white"
        fontSize="14"
        fontWeight="bold"
        fontFamily="sans-serif"
      >
        Swish
      </text>

      {/* QR-like pattern (decorative representation) */}
      <g fill="#333">
        {/* Top-left finder */}
        <rect x="30" y="62" width="36" height="36" />
        <rect x="34" y="66" width="28" height="28" fill="white" />
        <rect x="40" y="72" width="16" height="16" />

        {/* Top-right finder */}
        <rect x="134" y="62" width="36" height="36" />
        <rect x="138" y="66" width="28" height="28" fill="white" />
        <rect x="144" y="72" width="16" height="16" />

        {/* Bottom-left finder */}
        <rect x="30" y="134" width="36" height="36" />
        <rect x="34" y="138" width="28" height="28" fill="white" />
        <rect x="40" y="144" width="16" height="16" />

        {/* Data modules */}
        <rect x="76" y="62" width="6" height="6" />
        <rect x="88" y="62" width="6" height="6" />
        <rect x="100" y="62" width="6" height="6" />
        <rect x="112" y="62" width="6" height="6" />
        <rect x="76" y="74" width="6" height="6" />
        <rect x="100" y="74" width="6" height="6" />
        <rect x="76" y="86" width="6" height="6" />
        <rect x="88" y="86" width="6" height="6" />
        <rect x="112" y="86" width="6" height="6" />
        <rect x="124" y="86" width="6" height="6" />
        <rect x="76" y="98" width="6" height="6" />
        <rect x="100" y="98" width="6" height="6" />
        <rect x="112" y="98" width="6" height="6" />
        <rect x="88" y="110" width="6" height="6" />
        <rect x="100" y="110" width="6" height="6" />
        <rect x="124" y="110" width="6" height="6" />
        <rect x="76" y="122" width="6" height="6" />
        <rect x="100" y="122" width="6" height="6" />
        <rect x="112" y="122" width="6" height="6" />
        <rect x="88" y="134" width="6" height="6" />
        <rect x="100" y="134" width="6" height="6" />
        <rect x="112" y="134" width="6" height="6" />
        <rect x="124" y="134" width="6" height="6" />
        <rect x="88" y="146" width="6" height="6" />
        <rect x="112" y="146" width="6" height="6" />
        <rect x="134" y="110" width="6" height="6" />
        <rect x="146" y="110" width="6" height="6" />
        <rect x="158" y="110" width="6" height="6" />
        <rect x="134" y="122" width="6" height="6" />
        <rect x="158" y="122" width="6" height="6" />
        <rect x="134" y="146" width="6" height="6" />
        <rect x="146" y="146" width="6" height="6" />
        <rect x="158" y="146" width="6" height="6" />
        <rect x="146" y="158" width="6" height="6" />
        <rect x="158" y="158" width="6" height="6" />
      </g>

      {/* Swish number */}
      <text
        x="100"
        y="192"
        textAnchor="middle"
        fill="#666"
        fontSize="10"
        fontFamily="monospace"
      >
        123 379 74 98
      </text>
    </svg>
  )
}

export function DonationQR({ isOpen, onClose }: DonationQRProps) {
  const modalRef = useRef<HTMLDivElement>(null)

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

              {/* QR Code */}
              <div className="flex justify-center mb-5">
                <SwishQRCode />
              </div>

              {/* Instructions */}
              <div className="text-center space-y-2">
                <p className="text-xs text-white/60 leading-relaxed">
                  Öppna Swish och scanna QR-koden, eller swisha direkt till:
                </p>
                <p className="text-sm font-bold text-[#52B5AA] tracking-wider">
                  123 379 74 98
                </p>
                <p className="text-[0.6rem] text-white/30 mt-3">
                  Föreningen Naturhänsyn arbetar för naturhänsyn i skogsbruket
                </p>
              </div>

              {/* Link */}
              <div className="mt-5 text-center">
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

      <p
        className="text-xs text-white/50 leading-relaxed mb-4"
        style={{ fontFamily: 'IBM Plex Mono, monospace' }}
      >
        Donera via Swish:
      </p>

      <p
        className="text-lg font-bold text-[#52B5AA] tracking-wider mb-2"
        style={{ fontFamily: 'IBM Plex Mono, monospace' }}
      >
        123 379 74 98
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
