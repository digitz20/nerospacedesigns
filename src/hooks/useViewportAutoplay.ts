"use client";

import { useEffect, useRef } from "react";

interface UseViewportAutoplayOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useViewportAutoplay(options: UseViewportAutoplayOptions = {}) {
  const { threshold = 0.1, rootMargin = "50px" } = options;
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isIntersecting = false;
    let playAttempts = 0;
    const MAX_PLAY_ATTEMPTS = 8;

    const tryPlay = () => {
      if (playAttempts >= MAX_PLAY_ATTEMPTS) return;
      playAttempts++;

      video.play().then(() => {
        playAttempts = MAX_PLAY_ATTEMPTS;
      }).catch(() => {
        if (playAttempts < MAX_PLAY_ATTEMPTS) {
          setTimeout(tryPlay, 200 * playAttempts);
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isIntersecting = entry.isIntersecting;
          if (entry.isIntersecting) {
            playAttempts = 0;
            tryPlay();
          } else {
            video.pause();
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(video);

    const onCanPlay = () => {
      if (isIntersecting) {
        tryPlay();
      }
    };

    const onLoadedData = () => {
      if (isIntersecting) {
        tryPlay();
      }
    };

    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("loadeddata", onLoadedData);

    return () => {
      observer.disconnect();
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("loadeddata", onLoadedData);
    };
  }, [threshold, rootMargin]);

  return videoRef;
}
