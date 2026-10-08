"use client";

import { useEffect, useState } from "react";

const SPLASH_DURATION = 60;
const SPLASH_KEY = "nerospacedesigns_splash_shown";

export default function SplashScreen() {
  const [countdown, setCountdown] = useState(SPLASH_DURATION);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasShown = sessionStorage.getItem(SPLASH_KEY);
    if (hasShown) {
      document.body.style.visibility = "visible";
      window.location.replace("/");
      return;
    }

    sessionStorage.setItem(SPLASH_KEY, "true");
    setReady(true);
    document.body.style.visibility = "visible";

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.replace("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!ready) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black animate-fadeIn">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/mainimage.jpeg')" }}
      />

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6">
        <div className="mb-10 md:mb-14 animate-fadeUp" style={{ animationDelay: "0.1s" }}>
          <a
            href="/"
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
          </a>
        </div>

        <div className="fixed bottom-16 right-4 md:bottom-16 md:right-16 animate-fadeUp" style={{ animationDelay: "0.3s" }}>
          <h1 className="font-halogen text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-beige-light leading-none tracking-[0.06em] font-black uppercase">
            nerospace
          </h1>
          <h1 className="font-halogen text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-beige-light leading-none tracking-[0.06em] font-black uppercase">
            designs
          </h1>
        </div>

        <p className="fixed bottom-6 left-4 md:bottom-10 md:left-10 text-[10px] sm:text-xs text-beige-light/60 font-heading animate-fadeUp" style={{ animationDelay: "0.5s" }}>
          Auto-redirecting in {countdown}s
        </p>
      </div>
    </div>
  );
}
