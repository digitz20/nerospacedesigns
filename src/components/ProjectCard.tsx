"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface ProjectCardProps {
  title: string;
  location: string;
  category: string;
  year: string;
  image: string;
  videos: string[];
  aspectRatio: string;
  slug: string;
  index: number;
  secondaryImage?: string;
}

export default function ProjectCard({
  title,
  location,
  category,
  year,
  image,
  videos,
  aspectRatio,
  slug,
  index,
  secondaryImage,
}: ProjectCardProps) {
  const hasVideo = videos && videos.length > 0;
  const hasImage = image && image.trim() !== "";
  const poster = hasImage ? image : undefined;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !hasVideo || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [hasVideo]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasVideo || !isInView) return;

    const tryPlay = () => {
      video.play().catch(() => {});
    };

    video.addEventListener("loadeddata", tryPlay, { once: true });
    video.addEventListener("canplay", tryPlay, { once: true });

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
    };
  }, [hasVideo, isInView]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.85, delay: Math.min(index * 0.08, 0.32), ease: [0.22, 1, 0.36, 1] as const }}
    >
      <Link href={`/projects/${slug}`} className="group block">
        <div ref={containerRef} className={`relative overflow-hidden ${aspectRatio}`}>
          {hasVideo ? (
            <video
              ref={videoRef}
              src={isInView ? videos[0] : undefined}
              className="w-full h-full object-cover"
              muted
              autoPlay={isInView}
              playsInline
              loop
              preload="none"
              poster={poster}
            >
              Your browser does not support the video tag.
            </video>
          ) : hasImage ? (
            <>
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {secondaryImage && (
                <img
                  src={secondaryImage}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  aria-hidden="true"
                />
              )}
            </>
          ) : (
            <div className={`${aspectRatio} bg-coffee-dark/10 flex items-center justify-center`}>
              <span className="text-coffee-muted text-xs tracking-widest uppercase font-semibold">
                No Media
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-coffee-dark/0 group-hover:bg-coffee-dark/20 transition-colors duration-500" />
        </div>
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-2 mt-3 md:mt-4">
          <div>
            <h3 className="font-heading text-lg md:text-xl text-coffee-dark mb-0.5 group-hover:text-coffee-accent transition-colors duration-300 font-bold uppercase tracking-wide">
              {title}
            </h3>
            <p className="text-[11px] md:text-xs text-coffee-dark/60 tracking-wide font-heading">
              {location} — {category}
            </p>
          </div>
          <span className="text-[11px] md:text-xs text-coffee-muted tracking-wider font-heading">
            {year}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
