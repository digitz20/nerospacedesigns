"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SPLASH_DURATION = 60; // seconds

export default function SplashPage() {
  const [countdown, setCountdown] = useState(SPLASH_DURATION);
  const router = useRouter();

  useEffect(() => {
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

  const handleExplore = () => {
    router.push("/");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/mainimage.jpeg')" }}
      />
      <div className="absolute inset-0 bg-coffee-deep/70" />

      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <h1 className="font-halogen text-5xl md:text-7xl lg:text-8xl text-beige-light leading-[0.9] tracking-tight mb-6 md:mb-8 font-black uppercase animate-fadeUp">
          Nerospacedesigns
        </h1>

        <p className="text-sm md:text-base text-beige-light/80 max-w-xl mx-auto mb-8 md:mb-10 leading-relaxed font-heading animate-fadeUp">
          Interior architecture, spatial planning and bespoke design for considered living.
        </p>

        <div className="animate-fadeUp">
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

        <p className="text-xs text-beige-light/60 mt-8 font-heading">
          Auto-redirecting in {countdown}s
        </p>
      </div>
    </div>
  );
}
