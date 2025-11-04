"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const photos = [
  {
    id: 1,
    // title: "Trung thu Bulum",
    src: "/images/gallery/1.jpg",
  },
  {
    id: 2,
    // title: "Mountain Adventure",
    src: "/images/gallery/2.jpg",
  },
  {
    id: 3,
    // title: "City Lights",
    src: "/images/gallery/3.jpg",
  },
  {
    id: 4,
    // title: "Picnic Date",
    src: "/images/gallery/4.jpg",
  },
  {
    id: 5,
    // title: "Stargazing",
    src: "/images/gallery/5.jpg",
  },
  {
    id: 6,
    // title: "Cozy Moments",
    src: "/images/gallery/6.jpg",
  },
];

export default function Gallery() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selected = photos.find((p) => p.id === selectedId);

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-center text-primary mb-16"
      >
        📸 Our Memories
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
            className="group cursor-pointer"
            onClick={() => setSelectedId(photo.id)}
          >
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end">
                <div className="w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="font-semibold text-lg">{photo.title}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl overflow-hidden shadow-2xl max-w-2xl w-full"
            >
              <div className="relative h-96">
                <img
                  src={selected.src}
                  alt={selected.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-primary">
                  {selected.title}
                </h3>
                <p className="text-muted-foreground mt-2">
                  A precious moment in time ✨
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex justify-center text-4xl mt-8">
        To be continue....
      </div>
    </div>
  );
}
