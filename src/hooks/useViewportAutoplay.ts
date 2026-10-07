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

    let isIntersecting = false;

    const playWhenReady = () => {
      if (isIntersecting) {
        video.play().catch(() => {});
      }
    };

    video.addEventListener("canplay", playWhenReady, { once: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isIntersecting = entry.isIntersecting;
          if (entry.isIntersecting) {
            if (video.readyState >= 3) {
              video.play().catch(() => {});
            } else {
              video.load();
            }
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
      video.removeEventListener("canplay", playWhenReady);
    };
  }, [threshold, rootMargin]);

  return videoRef;
}
