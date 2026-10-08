"use client";

import { useEffect, useState } from "react";

const SPLASH_DURATION = 60;
const SPLASH_KEY = "nerospacedesigns_splash_shown";

export default function SplashScreen() {
  const [countdown, setCountdown] = useState(SPLASH_DURATION);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasShown = sessionStorage.getItem(SPLASH_KEY);
    if (hasShown) {
      setVisible(false);
      return;
    }

    setVisible(true);
    sessionStorage.setItem(SPLASH_KEY, "true");

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = "/";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!visible) return null;

  const handleExplore = () => {
    window.location.href = "/";
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/mainimage.jpeg')" }}
      />

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-end pb-20 md:pb-28 px-6">
        <div className="w-full max-w-6xl mb-10 md:mb-14">
          <button
            onClick={handleExplore}
            className="group inline-flex items-center gap-3 bg-coffee-accent text-beige-light px-8 py-4 text-[11px] tracking-[0.2em] uppercase transition-all duration-300 hover:bg-beige-warm hover:text-coffee-dark font-semibold"
          >
            Explore Our Work
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="w-full max-w-6xl">
          <h1 className="font-halogen text-7xl md:text-9xl lg:text-[10rem] text-beige-light leading-none tracking-[0.06em] font-black uppercase w-full text-left">
            NEROSPACE
          </h1>
          <h1 className="font-halogen text-7xl md:text-9xl lg:text-[10rem] text-beige-light leading-none tracking-[0.06em] font-black uppercase w-full text-left">
            DESIGNS
          </h1>
        </div>

        <p className="text-xs text-beige-light/60 mt-8 font-heading">
          Auto-redirecting in {countdown}s
        </p>
      </div>
    </div>
  );
}
