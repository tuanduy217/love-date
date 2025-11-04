"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Milestone {
  date: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
  imageDesc?: string;
}

const milestones: Milestone[] = [
  {
    date: "November 22, 2024",
    title: "First Meet",
    description:
      "The day our hearts first connected. A moment that changed everything.",
    icon: "✨",
    image: "/images/first_meet.jpg",
    imageDesc: "Đông ấm 2024 💕",
  },
  {
    date: "October 11, 2025",
    title: "First Date",
    description:
      "A cozy café where we talked for hours and lost track of time.",
    icon: "☕",
    image: "/images/first_date.jpg",
    imageDesc: "Hẹn Rooftop☕💫",
  },
  {
    date: "November 18, 2025",
    title: "First Trip",
    description:
      "Exploring new places and creating unforgettable memories together.",
    icon: "🌍",
    image: "/images/first_trip.jpg",
    imageDesc: "Trung thu Bulum 2025 🌎",
  },
];

export default function Journey() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const togglePopup = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-20 relative">
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

        <div className="space-y-16">
          {milestones.map((milestone, index) => {
            const isLeft = index % 2 === 0;
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                className="relative flex items-center justify-between gap-8"
              >
                {/* Left card */}
                <div className="flex-1 flex justify-end">
                  {isLeft && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      onClick={() => togglePopup(index)}
                      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 w-[320px] relative z-10 cursor-pointer"
                    >
                      <p className="text-sm text-accent font-semibold">
                        {milestone.date}
                      </p>
                      <h3 className="text-xl font-bold text-primary mt-2">
                        {milestone.title}
                      </h3>
                      <p className="text-muted-foreground mt-2">
                        {milestone.description}
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Center icon */}
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  onClick={() => togglePopup(index)}
                  className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-3xl shadow-lg flex-shrink-0 z-20 cursor-pointer"
                >
                  {milestone.icon}
                </motion.div>

                {/* Right card */}
                <div className="flex-1 flex justify-start">
                  {!isLeft && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      onClick={() => togglePopup(index)}
                      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 w-[320px] relative z-10 cursor-pointer"
                    >
                      <p className="text-sm text-accent font-semibold">
                        {milestone.date}
                      </p>
                      <h3 className="text-xl font-bold text-primary mt-2">
                        {milestone.title}
                      </h3>
                      <p className="text-muted-foreground mt-2">
                        {milestone.description}
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Popup đối diện */}
                <AnimatePresence>
                  {isActive && milestone.image && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className={`absolute top-1/2 -translate-y-1/2 w-[320px] bg-white rounded-xl shadow-2xl overflow-hidden ${
                        isLeft ? "left-full ml-10" : "right-full mr-10"
                      }`}
                    >
                      <motion.img
                        src={milestone.image}
                        alt={milestone.title}
                        className="w-full h-40 object-cover"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                      <div className="p-4 text-center">
                        <p className="text-sm text-muted-foreground italic">
                          {milestone.imageDesc}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
