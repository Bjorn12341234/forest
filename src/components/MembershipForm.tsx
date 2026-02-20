import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface MembershipFormProps {
  isOpen: boolean
  onClose: () => void
}

export function MembershipForm({ isOpen, onClose }: MembershipFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
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

  // Reset form on close
  useEffect(() => {
    if (!isOpen) {
      setSent(false)
      setName('')
      setEmail('')
      setMessage('')
    }
  }, [isOpen])

  const handleSubmit = () => {
    const subject = encodeURIComponent('Ny stödmedlem — Trä/d-spelet')
    const body = encodeURIComponent(
      `Hej Föreningen Naturhänsyn!\n\nJag vill bli stödmedlem.\n\nNamn: ${name}\nE-post: ${email}\n${message ? `\nMeddelande: ${message}` : ''}\n\nMed vänliga hälsningar`
    )
    window.open(`mailto:info@naturhansyn.se?subject=${subject}&body=${body}`, '_blank')
    setSent(true)
  }

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
              aria-label="Bli stödmedlem i Föreningen Naturhänsyn"
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
                  Föreningen Naturhänsyn
                </p>
                <h2 className="text-sm font-bold tracking-wider text-white/90">
                  Bli stödmedlem
                </h2>
              </div>

              {sent ? (
                /* Confirmation */
                <div className="text-center py-6">
                  <p className="text-2xl mb-4">&#10003;</p>
                  <p className="text-sm text-white/70 leading-relaxed mb-2">
                    Tack!
                  </p>
                  <p className="text-xs text-white/50 leading-relaxed">
                    Ett e-postmeddelande har öppnats. Skicka det för att anmäla ditt intresse som stödmedlem.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 px-6 py-2 bg-white/10 text-white/70 text-xs tracking-wider cursor-pointer border border-white/20 hover:bg-white/20 transition-colors"
                  >
                    STÄNG
                  </button>
                </div>
              ) : (
                /* Form */
                <div className="space-y-4">
                  <p className="text-xs text-white/50 leading-relaxed mb-4">
                    Som stödmedlem visar du att du bryr dig om naturhänsyn i skogsbruket. Fyll i dina uppgifter så öppnas ett e-postmeddelande till föreningen.
                  </p>

                  <div>
                    <label className="block text-[0.6rem] text-white/40 uppercase tracking-wider mb-1">
                      Namn
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white/80 text-sm outline-none focus:border-white/30 transition-colors rounded-sm"
                      placeholder="Ditt namn"
                    />
                  </div>

                  <div>
                    <label className="block text-[0.6rem] text-white/40 uppercase tracking-wider mb-1">
                      E-post
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white/80 text-sm outline-none focus:border-white/30 transition-colors rounded-sm"
                      placeholder="din@epost.se"
                    />
                  </div>

                  <div>
                    <label className="block text-[0.6rem] text-white/40 uppercase tracking-wider mb-1">
                      Meddelande (valfritt)
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white/80 text-sm outline-none focus:border-white/30 transition-colors rounded-sm resize-none"
                      placeholder="Valfritt meddelande..."
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={!name.trim() || !email.trim()}
                    className="w-full mt-2 px-6 py-3 text-xs font-bold tracking-[0.15em] cursor-pointer border-none transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{
                      background: name.trim() && email.trim() ? '#52B5AA' : '#333',
                      color: name.trim() && email.trim() ? '#000' : '#666',
                    }}
                  >
                    SKICKA INTRESSEANMÄLAN
                  </button>

                  <p className="text-[0.55rem] text-white/20 text-center">
                    Öppnar din e-postklient med ett förfyllt meddelande
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Inline button version for end screens
export function MembershipButton({ className }: { className?: string }) {
  const handleClick = () => {
    const subject = encodeURIComponent('Intresseanmälan stödmedlem — Trä/d-spelet')
    const body = encodeURIComponent(
      'Hej Föreningen Naturhänsyn!\n\nJag spelade Trä/d och vill veta mer om att bli stödmedlem.\n\nMed vänliga hälsningar'
    )
    window.open(`mailto:info@naturhansyn.se?subject=${subject}&body=${body}`, '_blank')
  }

  return (
    <button
      onClick={handleClick}
      className={`px-5 py-2.5 border border-white/20 text-white/60 text-xs tracking-[0.1em] cursor-pointer bg-transparent hover:bg-white/10 transition-colors ${className ?? ''}`}
      style={{ fontFamily: 'IBM Plex Mono, monospace' }}
    >
      BLI STÖDMEDLEM
    </button>
  )
}
