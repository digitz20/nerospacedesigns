"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import Lightbox from "@/components/Lightbox";

interface ProjectImageGridProps {
  images: string[];
  videos: string[];
  title: string;
}

export default function ProjectImageGrid({ images, videos, title }: ProjectImageGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [playingVideoIndex, setPlayingVideoIndex] = useState<number | null>(null);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

  const safeImages = images.filter((src) => src && src.trim() !== "");
  const safeVideos = videos.filter((src) => src && src.trim() !== "");
  const totalItems = safeImages.length + safeVideos.length;

  if (totalItems === 0) {
    return null;
  }

  const getItemSrc = (index: number) => {
    if (index < safeImages.length) {
      return { type: "image" as const, src: safeImages[index] };
    }
    const videoIndex = index - safeImages.length;
    return { type: "video" as const, src: safeVideos[videoIndex] };
  };

  const gridClass =
    totalItems === 1
      ? "grid-cols-1"
      : totalItems === 2
        ? "grid-cols-1 md:grid-cols-2"
        : totalItems === 3
          ? "grid-cols-1 md:grid-cols-12"
          : "grid-cols-1 md:grid-cols-12";

  return (
    <>
      <div className={`grid ${gridClass} gap-4 md:gap-6 mb-16 md:mb-24`}>
        {Array.from({ length: totalItems }).map((_, index) => {
          const item = getItemSrc(index);
          const isFirst = index === 0;
          const isLast = index === totalItems - 1;
          const colSpan =
            totalItems === 1
              ? "md:col-span-12"
              : totalItems === 2
                ? "md:col-span-6"
                : totalItems === 3
                  ? index === 0
                    ? "md:col-span-12"
                    : "md:col-span-6"
                  : index % 2 === 0
                    ? "md:col-span-8"
                    : "md:col-span-4";

          const aspectClass =
            totalItems === 1
              ? "aspect-[16/9]"
              : totalItems === 2
                ? "aspect-[4/3]"
                : totalItems === 3
                  ? index === 0
                    ? "aspect-[16/9]"
                    : "aspect-[4/3]"
                  : index % 2 === 0
                    ? "aspect-[16/9]"
                    : "aspect-[3/4]";

          const isVideo = item.type === "video";
          const videoIndex = isVideo ? index - safeImages.length : -1;
          const isPlaying = isVideo && playingVideoIndex === videoIndex;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`${colSpan} ${aspectClass} overflow-hidden ${isVideo ? "cursor-pointer" : "cursor-pointer"}`}
              onClick={() => {
                if (isVideo) {
                  const video = videoRefs.current[videoIndex];
                  if (video) {
                    if (isPlaying) {
                      video.pause();
                      setPlayingVideoIndex(null);
                    } else {
                      video.play();
                      setPlayingVideoIndex(videoIndex);
                    }
                  }
                } else {
                  setLightboxIndex(index);
                }
              }}
            >
              {isVideo ? (
                <video
                  ref={(el) => {
                    videoRefs.current[videoIndex] = el;
                  }}
                  src={item.src}
                  className="w-full h-full object-cover"
                  muted
                  autoPlay
                  playsInline
                  loop
                  onEnded={() => setPlayingVideoIndex(null)}
                />
              ) : (
                <Image
                  src={item.src}
                  alt={isFirst ? title : isLast ? `${title} detail` : `${title} view ${index + 1}`}
                  width={1200}
                  height={675}
                  className="w-full h-full object-cover"
                  priority={isFirst}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {lightboxIndex !== null && safeImages.length > 0 && (
        <Lightbox
          images={safeImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
