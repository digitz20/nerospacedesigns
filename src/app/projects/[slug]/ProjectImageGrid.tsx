"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import MediaLightbox from "@/components/MediaLightbox";
import { cloudinaryImg } from "@/lib/media";

interface ProjectImageGridProps {
  images: string[];
  videos: string[];
  title: string;
}

export default function ProjectImageGrid({ images, videos, title }: ProjectImageGridProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [loadedVideos, setLoadedVideos] = useState<Set<number>>(new Set());
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const safeImages = images.filter((src) => src && src.trim() !== "");
  const safeVideos = videos.filter((src) => src && src.trim() !== "");
  const totalItems = safeImages.length + safeVideos.length;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      if (!video) return;
      video.play().catch(() => {});
    };

    video.addEventListener("loadeddata", tryPlay, { once: true });
    video.addEventListener("canplay", tryPlay, { once: true });

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
    };
  }, [lightboxIndex, lightboxOpen]);

  useEffect(() => {
    const videoContainers = document.querySelectorAll("[data-video-index]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-video-index"));
          if (entry.isIntersecting) {
            setLoadedVideos((prev) => {
              if (prev.has(index)) return prev;
              const next = new Set(prev);
              next.add(index);
              return next;
            });
          }
        });
      },
      { rootMargin: "300px 0px" }
    );

    videoContainers.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [totalItems, safeVideos.length]);

  if (totalItems === 0) {
    return (
      <div className="w-full aspect-[3/4] sm:aspect-[16/9] bg-coffee-dark/10 flex items-center justify-center mb-16 md:mb-24">
        <span className="text-coffee-muted text-xs tracking-widest uppercase font-semibold">
          No Media
        </span>
      </div>
    );
  }

  // Every tile uses the same aspect-[3/4] frame and the same grid as the
  // project cards on the home and projects pages, so media sizing is
  // identical across all pages and breakpoints (mobile included).
  const gridClass = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  const mediaItems = [
    ...safeImages.map((src) => ({ type: "image" as const, src })),
    ...safeVideos.map((src) => ({ type: "video" as const, src })),
  ];

  return (
    <>
      <div className={`grid ${gridClass} gap-4 md:gap-6 mb-16 md:mb-24`}>
        {mediaItems.map((item, index) => {
          const isVideo = item.type === "video";
          const isActiveVideo = isVideo && lightboxOpen && lightboxIndex === index;
          const shouldLoadVideo = isVideo && loadedVideos.has(index);

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: Math.min(index * 0.1, 0.5) }}
              className="overflow-hidden cursor-pointer"
              onClick={() => {
                setLightboxIndex(index);
                setLightboxOpen(true);
              }}
            >
              {isVideo ? (
                <div className="relative aspect-[3/4] bg-coffee-deep/80" data-video-index={index}>
                  <video
                    ref={isActiveVideo ? videoRef : undefined}
                    src={shouldLoadVideo ? item.src : undefined}
                    className="absolute inset-0 w-full h-full object-contain"
                    muted
                    autoPlay={shouldLoadVideo}
                    playsInline
                    loop
                    preload="none"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <div className="aspect-[3/4]">
                  <Image
                    src={cloudinaryImg(item.src, 1200)}
                    alt={index === 0 ? title : `${title} view ${index + 1}`}
                    width={1200}
                    height={1600}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="w-full h-full object-cover"
                    priority={index === 0}
                  />
                </div>
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
