"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Confetti from "./confetti"

export default function GiftBox() {
  const [isOpened, setIsOpened] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
  }

  const giftVariants = {
    closed: { rotateZ: 0 },
    opened: {
      rotateZ: -15,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 min-h-screen flex flex-col items-center justify-center">
      <AnimatePresence>{isOpened && <Confetti />}</AnimatePresence>

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-center text-primary mb-16"
      >
        🎁 Your Surprise
      </motion.h2>

      {!isOpened ? (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center">
          <motion.div
            variants={giftVariants}
            animate={isOpened ? "opened" : "closed"}
            whileHover={{ scale: 1.05 }}
            className="text-9xl mb-8 cursor-pointer"
            onClick={() => setIsOpened(true)}
          >
            🎁
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpened(true)}
            className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow text-lg"
          >
            Open your surprise 🎁
          </motion.button>

          <motion.p
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            className="text-primary/60 mt-8 text-sm"
          >
            Click to reveal what's inside ✨
          </motion.p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-12 shadow-2xl max-w-2xl text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="mb-6"
          >
            <span className="text-7xl">💕</span>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-3xl font-bold text-primary mb-4"
          >
            You are my greatest gift
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-lg text-muted-foreground mb-8"
          >
            Every moment with you is a treasure I hold dear. Your smile, your laugh, your love - they fill my heart with
            endless joy. Thank you for being the most beautiful part of my life. 💕
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpened(false)}
              className="px-8 py-3 bg-primary text-white rounded-full font-semibold hover:shadow-lg transition-shadow"
            >
              Back
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
