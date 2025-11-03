"use client"

import { motion } from "framer-motion"

interface AudioPlayerProps {
  isOn: boolean
  setIsOn: (isOn: boolean) => void
}

export default function AudioPlayer({ isOn, setIsOn }: AudioPlayerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed top-24 right-4 z-40"
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOn(!isOn)}
        className={`p-3 rounded-full transition-all ${
          isOn ? "bg-primary text-white shadow-lg" : "bg-white/80 text-primary border border-pink-200"
        }`}
      >
        <span className="text-xl">{isOn ? "🔊" : "🔇"}</span>
      </motion.button>
      {isOn && (
        <audio src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" autoPlay loop muted={false} />
      )}
    </motion.div>
  )
}
