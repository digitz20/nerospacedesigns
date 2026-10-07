"use client";

import { useEffect, useRef } from "react";

interface UseViewportAutoplayOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useViewportAutoplay(options: UseViewportAutoplayOptions = {}) {
  const { threshold = 0.5, rootMargin = "0px" } = options;
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return videoRef;
}
