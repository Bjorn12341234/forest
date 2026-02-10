import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'

export function CharacterSelect() {
  const setGameMode = useGameStore(s => s.setGameMode)

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A0A0A]">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      <div className="flex flex-col items-center gap-8 px-4 max-w-2xl w-full">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-3xl sm:text-4xl font-bold tracking-widest text-[#F0F0F0] mb-4">
            SILVA MAXIMUS
          </h1>
          <p className="text-sm sm:text-base text-[#8A8A8A] tracking-wide">
            Vem vill du vara i den svenska skogen?
          </p>
        </motion.div>

        {/* Two cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
          {/* Industry card */}
          <motion.button
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.02, borderColor: '#D4730C' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setGameMode('industry')}
            className="flex flex-col gap-4 p-6 bg-[#1E1E1E] border-2 border-[#383838] rounded-sm cursor-pointer text-left transition-colors"
          >
            <span className="text-4xl">{'🏭'}</span>
            <h2 className="text-lg font-bold tracking-wider text-[#D4730C]">
              SKOGSINDUSTRIN
            </h2>
            <p className="text-sm text-[#B0B0B0] leading-relaxed">
              &quot;Massaindustrin AB söker nya tillväxtmöjligheter i den svenska skogen.&quot;
            </p>
            <span className="text-xs text-[#8A8A8A] uppercase tracking-widest mt-auto">
              Välj
            </span>
          </motion.button>

          {/* Owner card */}
          <motion.button
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ scale: 1.02, borderColor: '#2D6A4F' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setGameMode('owner')}
            className="flex flex-col gap-4 p-6 bg-[#1E1E1E] border-2 border-[#383838] rounded-sm cursor-pointer text-left transition-colors"
          >
            <span className="text-4xl">{'🌲'}</span>
            <h2 className="text-lg font-bold tracking-wider text-owner-accent">
              SMÅSKOGSÄGAREN
            </h2>
            <p className="text-sm text-[#B0B0B0] leading-relaxed">
              &quot;Du ärvde 80 hektar skog i Ångermanland som din farfar ägde.&quot;
            </p>
            <span className="text-xs text-[#8A8A8A] uppercase tracking-widest mt-auto">
              Välj
            </span>
          </motion.button>
        </div>
      </div>
    </div>
  )
}
