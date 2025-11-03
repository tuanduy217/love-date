"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Example: Dinner at 7 PM today
      const targetDate = new Date()
      targetDate.setHours(19, 0, 0, 0)

      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    const timer = setInterval(calculateTimeLeft, 1000)
    calculateTimeLeft()

    return () => clearInterval(timer)
  }, [])

  const TimeUnit = ({
    value,
    label,
    index,
  }: {
    value: number
    label: string
    index: number
  }) => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      className="flex flex-col items-center"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="bg-gradient-to-br from-primary to-accent rounded-2xl p-8 shadow-lg"
      >
        <span className="text-4xl md:text-5xl font-bold text-white">{String(value).padStart(2, "0")}</span>
      </motion.div>
      <span className="text-sm md:text-lg font-semibold text-primary mt-4">{label}</span>
    </motion.div>
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 min-h-screen flex flex-col items-center justify-center">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-center text-primary mb-4"
      >
        ⏰ Countdown
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl text-primary/70 text-center mb-16"
      >
        Time until our dinner at 7 PM ❤️
      </motion.p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
        <TimeUnit value={timeLeft.days} label="Days" index={0} />
        <TimeUnit value={timeLeft.hours} label="Hours" index={1} />
        <TimeUnit value={timeLeft.minutes} label="Minutes" index={2} />
        <TimeUnit value={timeLeft.seconds} label="Seconds" index={3} />
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        className="mt-16"
      >
        <span className="text-5xl">💕</span>
      </motion.div>
    </div>
  )
}
