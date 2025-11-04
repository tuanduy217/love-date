"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Question {
  id: string;
  question: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: "mealType",
    question: "Bạn đang muốn ăn bữa nào hôm nay?",
    options: ["Sáng 🌅", "Trưa 🌞", "Tối 🌙", "Ăn vặt 🍪"],
  },
  {
    id: "style",
    question: "Bạn muốn món Việt hay món quốc tế?",
    options: ["Món Việt 🇻🇳", "Món Hàn 🇰🇷", "Ăn gì cũng được 😎"],
  },
  {
    id: "type",
    question: "Bạn muốn món nước hay món khô?",
    options: [
      "Món nước 🍜",
      "Món khô 🍱",
      "Món nướng 🔥",
      "Món chiên 🍤",
      "Món cuốn 🌯",
    ],
  },
  {
    id: "flavor",
    question: "Bạn thích hương vị như thế nào?",
    options: [
      "Cay 🌶️",
      "Mặn đậm đà 🧂",
      "Thanh đạm 🍃",
      "Ngọt nhẹ 🍯",
      "Chua cay mặn ngọt đủ vị 🌈",
      "Béo ngậy 🧈",
    ],
  },
  {
    id: "feeling",
    question: "Tâm trạng hôm nay của bạn ra sao?",
    options: [
      "Muốn ăn no căng bụng 😋",
      "Muốn ăn nhẹ thôi 🍰",
      "Ăn vui cùng bạn bè 🎉",
      "Muốn đổi món mới lạ ✨",
      "Muốn ăn đồ truyền thống 🇻🇳",
      "Thèm món nước nóng hổi 🍲",
    ],
  },
];

export default function FoodPicker() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // 🌀 trạng thái loading

  const handleSelect = async (option: string) => {
    const question = questions[current];
    const updatedAnswers = { ...answers, [question.id]: option };
    setAnswers(updatedAnswers);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setLoading(true); // bật popup chờ
      try {
        const res = await fetch("/api/food-suggestion", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: updatedAnswers }),
        });
        const data = await res.json();

        // thêm delay nhẹ cho cảm giác "đang xử lý"
        setTimeout(() => {
          setResult(data.suggestion || "Mì gói 😅");
          setLoading(false);
        }, 2000);
      } catch (err) {
        console.error(err);
        setResult("Có lỗi xảy ra, thử lại nhé 😢");
        setLoading(false);
      }
    }
  };

  const reset = () => {
    setCurrent(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <div className="max-w-xl mx-auto min-h-screen flex flex-col items-center justify-center px-4 py-12 relative">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center text-primary mb-10"
      >
        🍽️ Hôm nay ăn gì?
      </motion.h1>

      <AnimatePresence mode="wait">
        {loading ? (
          // 🔹 Popup chờ loading
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center"
            >
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-primary border-gray-300 mb-6"></div>
              <p className="text-lg font-semibold text-primary">
                Đang tìm món phù hợp cho bạn... 🍲
              </p>
            </motion.div>
          </motion.div>
        ) : !result ? (
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full bg-white rounded-2xl shadow-lg p-8 text-center"
          >
            <h2 className="text-xl font-semibold text-primary mb-6">
              {questions[current].question}
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {questions[current].options.map((opt) => (
                <motion.button
                  key={opt}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSelect(opt)}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-full font-medium shadow-md hover:shadow-xl transition"
                >
                  {opt}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-2xl p-10 text-center"
          >
            <h2 className="text-2xl font-bold text-primary mb-4">
              🥳 Gợi ý cho bạn hôm nay:
            </h2>

            <div className="text-left whitespace-pre-wrap text-gray-700 text-lg mb-8">
              {result}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={reset}
              className="px-8 py-3 bg-primary text-white rounded-full font-semibold shadow-md hover:shadow-lg"
            >
              Chọn lại 🔄
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
