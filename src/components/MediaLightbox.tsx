"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface MediaItem {
  type: "image" | "video";
  src: string;
}

interface MediaLightboxProps {
  items: MediaItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function MediaLightbox({
  items,
  currentIndex,
  onClose,
  onNavigate,
}: MediaLightboxProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        onNavigate((currentIndex - 1 + items.length) % items.length);
      }
      if (e.key === "ArrowRight") {
        onNavigate((currentIndex + 1) % items.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, items.length, onClose, onNavigate]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [currentIndex]);

  const currentItem = items[currentIndex];
  const isVideo = currentItem?.type === "video";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[10001] bg-coffee-deep/95 flex items-center justify-center p-4 md:p-8 backdrop-blur-sm"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-beige-light/70 hover:text-beige-light transition-colors z-10"
          aria-label="Close lightbox"
        >
          <X size={32} />
        </button>

        {currentIndex > 0 && (
          <button
            onClick={() => onNavigate(currentIndex - 1)}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-beige-light/70 hover:text-beige-light transition-colors z-10"
            aria-label="Previous"
          >
            <ChevronLeft size={40} />
          </button>
        )}

        {currentIndex < items.length - 1 && (
          <button
            onClick={() => onNavigate(currentIndex + 1)}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-beige-light/70 hover:text-beige-light transition-colors z-10"
            aria-label="Next"
          >
            <ChevronRight size={40} />
          </button>
        )}

        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.97, filter: "blur(6px)" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-full max-h-[85vh] flex items-center justify-center will-change-[opacity,transform,filter]"
          onClick={(e) => e.stopPropagation()}
        >
          {isVideo ? (
            <video
              ref={videoRef}
              src={currentItem.src}
              className="max-w-full max-h-[85vh] object-contain"
              controls
              autoPlay
              playsInline
            />
          ) : (
            <img
              src={currentItem.src}
              alt={`Gallery media ${currentIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </motion.div>

        {items.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
            <span className="text-beige-light/70 text-xs tracking-widest uppercase font-semibold">
              {currentIndex + 1} / {items.length}
            </span>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
