"use client"

import { motion } from "framer-motion"

interface Milestone {
  date: string
  title: string
  description: string
  icon: string
}

const milestones: Milestone[] = [
  {
    date: "March 15, 2022",
    title: "First Meet",
    description: "The day our hearts first connected. A moment that changed everything.",
    icon: "✨",
  },
  {
    date: "April 20, 2022",
    title: "First Date",
    description: "Coffee turned into hours of laughter and endless conversations.",
    icon: "☕",
  },
  {
    date: "July 4, 2022",
    title: "First Kiss",
    description: "Under the stars, everything felt perfect.",
    icon: "💋",
  },
  {
    date: "December 25, 2022",
    title: "First Trip",
    description: "Exploring new places and creating unforgettable memories together.",
    icon: "🌍",
  },
  {
    date: "June 10, 2023",
    title: "Said I Love You",
    description: "Three words that mean everything in the world.",
    icon: "💕",
  },
  {
    date: "Today & Forever",
    title: "Our Forever Story",
    description: "And every day with you is a blessing I never take for granted.",
    icon: "💍",
  },
]

export default function Journey() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-center text-primary mb-16"
      >
        ✨ Our Journey
      </motion.h2>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-accent to-primary opacity-30" />

        <div className="space-y-12">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`flex items-center gap-8 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
            >
              <div className="flex-1 text-end md:text-right">
                {index % 2 === 0 && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <p className="text-sm text-accent font-semibold">{milestone.date}</p>
                    <h3 className="text-xl font-bold text-primary mt-2">{milestone.title}</h3>
                    <p className="text-muted-foreground mt-2">{milestone.description}</p>
                  </motion.div>
                )}
              </div>

              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-3xl shadow-lg flex-shrink-0 z-10 cursor-pointer"
              >
                {milestone.icon}
              </motion.div>

              <div className="flex-1">
                {index % 2 === 1 && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <p className="text-sm text-accent font-semibold">{milestone.date}</p>
                    <h3 className="text-xl font-bold text-primary mt-2">{milestone.title}</h3>
                    <p className="text-muted-foreground mt-2">{milestone.description}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
