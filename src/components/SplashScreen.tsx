"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SPLASH_DURATION = 60;
const SPLASH_KEY = "nerospacedesigns_splash_shown";

export default function SplashScreen() {
  const [countdown, setCountdown] = useState(SPLASH_DURATION);
  const [visible, setVisible] = useState(false);
  const router = useRouter();

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
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/mainimage.jpeg')" }}
      />

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6">
        <div className="animate-fadeUp">
          <button
            onClick={() => router.push("/")}
            className="group inline-flex items-center gap-3 bg-coffee-accent text-beige-light px-8 py-4 text-[11px] tracking-[0.2em] uppercase transition-all duration-300 hover:bg-beige-warm hover:text-coffee-dark font-semibold mb-8"
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

        <div className="w-full max-w-6xl animate-fadeUp">
          <h1 className="font-halogen text-6xl md:text-8xl lg:text-9xl text-beige-light leading-[0.9] tracking-[0.08em] font-black uppercase w-full text-left">
            Nerospacedesigns
          </h1>
        </div>

        <p className="text-xs text-beige-light/60 mt-6 font-heading animate-fadeUp">
          Auto-redirecting in {countdown}s
        </p>
      </div>
    </div>
  );
}
