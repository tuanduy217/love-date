"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"

interface ConfettiPiece {
  id: number
  left: number
  delay: number
  duration: number
  size: number
  emoji: string
}

export default function Confetti() {
  const confetti = useMemo(() => {
    const emojis = ["💕", "✨", "💖", "🎉", "💝", "🌹"]
    return Array.from({ length: 30 }).map(
      (_, i) =>
        ({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 0.5,
          duration: 2 + Math.random() * 1,
          size: 16 + Math.random() * 24,
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
        }) as ConfettiPiece,
    )
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{ y: 0, opacity: 1, rotate: 0 }}
          animate={{
            y: window.innerHeight,
            opacity: 0,
            rotate: 360,
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: "easeIn",
          }}
          className="absolute"
          style={{ left: `${piece.left}%` }}
        >
          <span style={{ fontSize: piece.size }} className="block">
            {piece.emoji}
          </span>
        </motion.div>
      ))}
    </div>
  )
}
