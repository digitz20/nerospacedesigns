"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cloudinaryImg } from "@/lib/media";

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
  const [loadedImageIndex, setLoadedImageIndex] = useState<number | null>(null);

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

  // Prevent the page behind the lightbox from scrolling (important on mobile).
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Show a spinner whenever a new (not yet loaded) image is displayed.
  const currentItem = items[currentIndex];
  const isVideo = currentItem?.type === "video";
  const imageLoading = !isVideo && loadedImageIndex !== currentIndex;
  // Solid, high-contrast control style so buttons stay visible on top of
  // any image or video, on both desktop and mobile.
  const controlButtonClass =
    "flex items-center justify-center rounded-full bg-coffee-deep/85 border border-beige-light/25 text-beige-light hover:bg-beige-light hover:text-coffee-dark transition-colors backdrop-blur-sm";

  // Portaled to document.body: page-transition wrappers (will-change/transform
  // ancestors) would otherwise become the containing block for this fixed
  // overlay, stretching it to the document height and pushing the media
  // off-screen. The portal guarantees a true full-viewport overlay.
  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[10001] bg-coffee-deep/95 backdrop-blur-sm flex items-center justify-center"
        onClick={onClose}
      >
        {/* X button — pinned at the top to un-view (close) the media */}
        <button
          type="button"
          onClick={onClose}
          className={`absolute top-5 left-1/2 -translate-x-1/2 z-20 w-12 h-12 ${controlButtonClass}`}
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* Previous / Next */}
        {currentIndex > 0 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(currentIndex - 1);
            }}
            className={`absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 ${controlButtonClass}`}
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {currentIndex < items.length - 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(currentIndex + 1);
            }}
            className={`absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 ${controlButtonClass}`}
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Media card — same aspect-[3/4] and approximate width as the grid
            tiles, so viewed media never goes full-screen: it opens at the same
            size as the rest of the placeholders. object-contain keeps the
            whole image/video visible, never cut, on desktop and mobile. */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-[min(82vw,360px)] sm:w-[min(44vw,380px)] lg:w-[min(24vw,360px)] aspect-[3/4] max-h-[70vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {isVideo ? (
            <video
              ref={videoRef}
              src={currentItem.src}
              className="w-full h-full object-contain bg-black"
              controls
              autoPlay
              muted
              playsInline
              preload="metadata"
            />
          ) : (
            <>
              <img
                src={cloudinaryImg(currentItem.src, 1200)}
                alt={`Gallery media ${currentIndex + 1}`}
                className={`w-full h-full object-contain transition-opacity duration-300 ${
                  imageLoading ? "opacity-0" : "opacity-100"
                }`}
                decoding="async"
                onLoad={() => setLoadedImageIndex(currentIndex)}
                onError={() => setLoadedImageIndex(currentIndex)}
              />
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 border-2 border-beige-light/30 border-t-beige-light rounded-full animate-spin" />
                </div>
              )}
            </>
          )}
        </motion.div>

        {/* Cancel button + counter */}
        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className={`px-5 py-2.5 text-[11px] tracking-[0.2em] uppercase font-semibold ${controlButtonClass}`}
            aria-label="Cancel and close media view"
          >
            Cancel
          </button>
          {items.length > 1 && (
            <span className="text-beige-light/80 text-xs tracking-widest uppercase font-semibold">
              {currentIndex + 1} / {items.length}
            </span>
          )}
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
