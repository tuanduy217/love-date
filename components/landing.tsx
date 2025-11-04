"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import FloatingHearts from "./floating-hearts";
import AudioPlayer from "./audio-player";

interface LandingProps {
  setCurrentSection: (section: string) => void;
}

export default function Landing({ setCurrentSection }: LandingProps) {
  const [isAudioOn, setIsAudioOn] = useState(false);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.8, ease: "easeOut" },
    }),
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      <FloatingHearts />
      <AudioPlayer isOn={isAudioOn} setIsOn={setIsAudioOn} />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-center z-10"
      >
        <motion.h1
          custom={0}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl font-bold text-primary mb-4"
        >
          Hi my love 💕
        </motion.h1>

        <motion.p
          custom={1}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-2xl md:text-3xl text-primary/80 mb-8"
        >
          Welcome to our special website!
        </motion.p>

        <motion.p
          custom={2}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12"
        >
          A journey through our most precious moments together. Explore our
          memories, celebrate our love, and discover what awaits you. 💫
        </motion.p>

        <motion.div
          custom={3}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            // 🔥 Khi bấm nút, chuyển sang tab Journey
            onClick={() => setCurrentSection("journey")}
            className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
          >
            Start Exploring ✨
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <span className="text-3xl animate-heart-beat">💕</span>
      </motion.div>
    </div>
  );
}
