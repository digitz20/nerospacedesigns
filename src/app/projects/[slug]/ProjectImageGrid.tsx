"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import MediaLightbox from "@/components/MediaLightbox";

interface ProjectImageGridProps {
  images: string[];
  videos: string[];
  title: string;
}

export default function ProjectImageGrid({ images, videos, title }: ProjectImageGridProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [playFailed, setPlayFailed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const safeImages = images.filter((src) => src && src.trim() !== "");
  const safeVideos = videos.filter((src) => src && src.trim() !== "");
  const totalItems = safeImages.length + safeVideos.length;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      if (!video || isPlaying) return;
      video.play().then(() => {
        setIsPlaying(true);
        setPlayFailed(false);
      }).catch(() => {
        setPlayFailed(true);
      });
    };

    video.addEventListener("loadeddata", tryPlay, { once: true });
    video.addEventListener("canplay", tryPlay, { once: true });

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
    };
  }, [isPlaying]);

  if (totalItems === 0) {
    return (
      <div className="w-full bg-coffee-dark/10 flex items-center justify-center mb-16 md:mb-24 py-20">
        <span className="text-coffee-muted text-xs tracking-widest uppercase font-semibold">
          No Media
        </span>
      </div>
    );
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

  const mediaItems = [
    ...safeImages.map((src) => ({ type: "image" as const, src })),
    ...safeVideos.map((src) => ({ type: "video" as const, src })),
  ];

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

          const isVideo = item.type === "video";
          const isCurrentVideo = isVideo && lightboxIndex === index && lightboxOpen;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`${colSpan} overflow-hidden cursor-pointer`}
              onClick={() => {
                setLightboxIndex(index);
                setLightboxOpen(true);
              }}
            >
              {isVideo && lightboxOpen && lightboxIndex === index ? (
                <video
                  ref={videoRef}
                  src={item.src}
                  className="w-full h-auto"
                  muted
                  autoPlay
                  playsInline
                  loop
                  poster={safeImages[0] || undefined}
                >
                  Your browser does not support the video tag.
                </video>
              ) : isVideo ? (
                <video
                  src={item.src}
                  className="w-full h-auto"
                  muted
                  playsInline
                  loop
                  preload="metadata"
                  poster={safeImages[0] || undefined}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Image
                  src={item.src}
                  alt={isFirst ? title : isLast ? `${title} detail` : `${title} view ${index + 1}`}
                  width={1200}
                  height={675}
                  className="w-full h-auto"
                  priority={isFirst}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {lightboxOpen && (
        <MediaLightbox
          items={mediaItems}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={(index) => setLightboxIndex(index)}
        />
      )}
    </>
  );
}
