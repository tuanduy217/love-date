"use client";

import { motion } from "framer-motion";

interface NavigationProps {
  currentSection: string;
  setCurrentSection: (section: string) => void;
}

export default function Navigation({
  currentSection,
  setCurrentSection,
}: NavigationProps) {
  const sections = [
    { id: "landing", label: "💕 Home" },
    { id: "journey", label: "✨ Our Journey" },
    { id: "gallery", label: "📸 Gallery" },
    { id: "countdown", label: "⏰ Love Days" },
    { id: "gift", label: "💌 Daily Message" },
    { id: "food", label: "🍰 Menu" },
    { id: "game", label: "💖 Game" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-pink-100 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-center items-center gap-2 flex-wrap">
        {sections.map((section) => (
          <motion.button
            key={section.id}
            onClick={() => setCurrentSection(section.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              currentSection === section.id
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-foreground hover:bg-pink-100"
            }`}
          >
            {section.label}
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
}
