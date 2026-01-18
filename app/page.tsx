"use client";

import Navigation from "@/components/navigation";
import Landing from "@/components/landing";
import Journey from "@/components/journey";
import Gallery from "@/components/gallery";
import Countdown from "@/components/countdown";
import GiftBox from "@/components/gift-box";
import Game from "@/components/game";
import FoodPicker from "@/components/menu";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50 flex items-center justify-center">
      <h1 className="text-2xl font-bold text-center text-gray-700">
        Chúng tôi yêu nhau xong rồi, trang web sẽ đóng vĩnh viễn
      </h1>
    </div>
  );
}
