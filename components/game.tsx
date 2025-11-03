"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"

export default function Game() {
  const [questionCount, setQuestionCount] = useState(0)
  const [score, setScore] = useState(0)
  const noButtonRef = useRef<HTMLButtonElement>(null)

  const handleNo = () => {
    if (noButtonRef.current) {
      const randomX = (Math.random() - 0.5) * 200
      const randomY = (Math.random() - 0.5) * 200
      noButtonRef.current.style.transform = `translate(${randomX}px, ${randomY}px)`
    }
  }

  const handleYes = () => {
    setScore(score + 1)
    setQuestionCount(questionCount + 1)

    if (noButtonRef.current) {
      noButtonRef.current.style.transform = "translate(0, 0)"
    }
  }

  const resetGame = () => {
    setQuestionCount(0)
    setScore(0)
    if (noButtonRef.current) {
      noButtonRef.current.style.transform = "translate(0, 0)"
    }
  }

  const questions = [
    "Do you love me?",
    "Will you always be mine?",
    "Am I your favorite person?",
    "Do you want to grow old with me?",
    "Are we soulmates?",
  ]

  const currentQuestion = questions[questionCount % questions.length]
  const allQuestionsAnswered = questionCount >= questions.length

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 min-h-screen flex flex-col items-center justify-center">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-center text-primary mb-8"
      >
        💖 Our Love Game
      </motion.h2>

      {!allQuestionsAnswered ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-12 shadow-2xl max-w-2xl text-center"
        >
          <motion.p
            key={currentQuestion}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-primary mb-12"
          >
            {currentQuestion}
          </motion.p>

          <p className="text-muted-foreground mb-8">
            Score: <span className="text-primary font-bold text-lg">{score}</span>
          </p>

          <div className="flex gap-6 justify-center flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleYes}
              className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow text-lg"
            >
              Yes! 💕
            </motion.button>

            <motion.button
              ref={noButtonRef}
              onClick={handleNo}
              className="px-8 py-4 bg-white text-primary border-2 border-primary rounded-full font-semibold shadow-lg transition-all relative"
              animate={{ x: 0, y: 0 }}
            >
              No 😜
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-12 shadow-2xl max-w-2xl text-center"
        >
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="mb-6">
            <span className="text-7xl">💕✨</span>
          </motion.div>

          <h3 className="text-3xl font-bold text-primary mb-4">You answered all our questions! 🎉</h3>

          <p className="text-xl text-muted-foreground mb-8">
            Final Score:{" "}
            <span className="text-primary font-bold">
              {score} / {questions.length}
            </span>
          </p>

          <p className="text-lg text-primary/80 mb-8">
            I love every bit of you, from your heart to your sense of humor. Thank you for being my forever person. 💕
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetGame}
            className="px-8 py-3 bg-primary text-white rounded-full font-semibold hover:shadow-lg transition-shadow"
          >
            Play Again
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}
