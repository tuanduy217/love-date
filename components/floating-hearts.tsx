"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"

interface Heart {
  id: number
  left: number
  delay: number
  duration: number
  size: number
}

export default function FloatingHearts() {
  const hearts = useMemo(() => {
    return Array.from({ length: 8 }).map(
      (_, i) =>
        ({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 2,
          duration: 8 + Math.random() * 4,
          size: 20 + Math.random() * 30,
        }) as Heart,
    )
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: "100vh", opacity: 0.3 }}
          animate={{ y: "-100vh", opacity: [0.3, 0.6, 0.3] }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute"
          style={{ left: `${heart.left}%` }}
        >
          <span style={{ fontSize: heart.size }} className="block">
            ❤️
          </span>
        </motion.div>
      ))}
    </div>
  )
}
