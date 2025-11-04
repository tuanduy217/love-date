"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "./confetti";
import loveMessages from "@/app/data/loveMessages.json";

interface Message {
  icon: string;
  title: string;
  text: string;
}

export default function GiftBox() {
  const [isOpened, setIsOpened] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<Message | null>(null);
  const [lastIndex, setLastIndex] = useState<number | null>(null);

  const openGift = () => {
    let randomIndex: number;

    // tránh trùng lặp với lần trước
    do {
      randomIndex = Math.floor(Math.random() * loveMessages.length);
    } while (randomIndex === lastIndex && loveMessages.length > 1);

    setCurrentMessage(loveMessages[randomIndex]);
    setLastIndex(randomIndex);
    setIsOpened(true);
  };

  const nextMessage = () => {
    setIsOpened(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 min-h-screen flex flex-col items-center justify-center">
      <AnimatePresence>{isOpened && <Confetti />}</AnimatePresence>

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-center text-primary mb-16"
      >
        🎁 Said I love you everyday 💌
      </motion.h2>

      {!isOpened ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-9xl mb-8 cursor-pointer"
            onClick={openGift}
          >
            🎁
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={openGift}
            className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow text-lg"
          >
            Today's message 💌
          </motion.button>

          <motion.p
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-primary/60 mt-8 text-sm"
          >
            Click the gift box to open your daily love message ✨
          </motion.p>
        </motion.div>
      ) : (
        <motion.div
          key={currentMessage?.title}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-2xl p-12 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="mb-6"
          >
            <span className="text-7xl">{currentMessage?.icon}</span>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-3xl font-bold text-primary mb-4"
          >
            {currentMessage?.title}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-lg text-muted-foreground mb-8"
          >
            {currentMessage?.text}
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextMessage}
            className="px-8 py-3 bg-primary text-white rounded-full font-semibold hover:shadow-lg transition-shadow"
          >
            Mở lời nhắn khác 💖
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
