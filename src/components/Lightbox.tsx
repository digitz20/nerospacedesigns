"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        onNavigate(newIndex);
      }
      if (e.key === "ArrowRight") {
        const newIndex = (currentIndex + 1) % images.length;
        onNavigate(newIndex);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, images.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[10001] bg-coffee-deep/95 flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-beige-light/70 hover:text-beige-light transition-colors z-10"
          aria-label="Close lightbox"
        >
          <X size={32} />
        </button>

        <button
          onClick={() => {
            const newIndex = (currentIndex - 1 + images.length) % images.length;
            onNavigate(newIndex);
          }}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-beige-light/70 hover:text-beige-light transition-colors z-10"
          aria-label="Previous image"
        >
          <ChevronLeft size={40} />
        </button>

        <button
          onClick={() => {
            const newIndex = (currentIndex + 1) % images.length;
            onNavigate(newIndex);
          }}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-beige-light/70 hover:text-beige-light transition-colors z-10"
          aria-label="Next image"
        >
          <ChevronRight size={40} />
        </button>

        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Gallery image ${currentIndex + 1}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="max-w-full max-h-[80vh] object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      </motion.div>
    </AnimatePresence>
  );
}
