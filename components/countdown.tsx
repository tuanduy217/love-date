"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Count elapsed time since 11/10/2025 (dd/mm/yyyy -> 2025-10-11)
      // If the target is in the future, this will show time remaining until that date.
      const targetDate = new Date("2025-10-11T00:00:00");

      const now = new Date();
      // positive -> elapsed since targetDate, negative -> time until targetDate
      const difference = now.getTime() - targetDate.getTime();

      const absDiff = Math.abs(difference);

      const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((absDiff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((absDiff / 1000 / 60) % 60);
      const seconds = Math.floor((absDiff / 1000) % 60);

      // Always set values (use elapsed if difference >= 0, otherwise it's a countdown)
      setTimeLeft({ days, hours, minutes, seconds });
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-8 shadow-lg">
        <span className="text-4xl md:text-5xl font-bold text-white">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-sm md:text-lg font-semibold text-primary mt-4">
        {label}
      </span>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 min-h-screen flex flex-col items-center justify-center">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-center text-primary mb-4"
      >
        ⏰ Count the days
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl text-primary/70 text-center mb-16"
      >
        Time from first date ❤️
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
  );
}
