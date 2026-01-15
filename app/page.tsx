"use client";

import { useState } from "react";
import Navigation from "@/components/navigation";
import Landing from "@/components/landing";
import Journey from "@/components/journey";
import Gallery from "@/components/gallery";
import Countdown from "@/components/countdown";
import GiftBox from "@/components/gift-box";
import Game from "@/components/game";
import FoodPicker from "@/components/menu";

export default function Home() {
  const [currentSection, setCurrentSection] = useState("landing");

  const renderSection = () => {
    switch (currentSection) {
      case "journey":
        return <Journey />;
      case "gallery":
        return <Gallery />;
      case "countdown":
        return <Countdown />;
      case "gift":
        return <GiftBox />;
      case "game":
        return <Game />;
      case "food":
        return <FoodPicker />;
      default:
        return <Landing setCurrentSection={setCurrentSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50">
      <Navigation
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />

      <main className="pt-20">{renderSection()}</main>
    </div>
  );
}
