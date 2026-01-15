"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Generate 70 photos array dynamically
const generatePhotos = () => {
  const photos = [];
  for (let i = 1; i <= 70; i++) {
    photos.push({
      id: i,
      src: `/images/gallery/${i}.jpg`,
      title: `Memory ${i}`,
    });
  }
  return photos;
};

const allPhotos = generatePhotos();
const ITEMS_PER_PAGE = 15;

export default function Gallery() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selected = useMemo(
    () => allPhotos.find((p) => p.id === selectedId),
    [selectedId]
  );

  const paginatedPhotos = useMemo(() => {
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIdx = startIdx + ITEMS_PER_PAGE;
    return allPhotos.slice(startIdx, endIdx);
  }, [currentPage]);

  const totalPages = Math.ceil(allPhotos.length / ITEMS_PER_PAGE);

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-center text-primary mb-4"
      >
        📸 Our Memories
      </motion.h2>
      <p className="text-center text-muted-foreground mb-8">
        {allPhotos.length} precious moments
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedPhotos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 * index }}
            className="group cursor-pointer"
            onClick={() => setSelectedId(photo.id)}
          >
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
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

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-12">
        <button
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-lg bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition"
        >
          ← Previous
        </button>

        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-10 h-10 rounded-lg transition ${
                currentPage === page
                  ? "bg-primary text-white"
                  : "bg-muted hover:bg-muted-foreground/20"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() =>
            handlePageChange(Math.min(totalPages, currentPage + 1))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-lg bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition"
        >
          Next →
        </button>
      </div>

      <p className="text-center text-muted-foreground mt-4">
        Page {currentPage} of {totalPages}
      </p>

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
                <Image
                  src={selected.src}
                  alt={selected.title}
                  fill
                  className="w-full h-full object-cover"
                  priority
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
    </div>
  );
}
