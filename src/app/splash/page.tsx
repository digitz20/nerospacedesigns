"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const SPLASH_DURATION = 60; // seconds

export default function SplashPage() {
  const [countdown, setCountdown] = useState(SPLASH_DURATION);
  const [leaving, setLeaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleExplore();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleExplore = () => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(() => router.push("/"), 650);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: leaving ? 0 : 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black"
    >
      <motion.div
        initial={{ scale: 1.12 }}
        animate={{ scale: leaving ? 1.18 : 1.02 }}
        transition={{ duration: leaving ? 0.7 : 8, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/mainimage.jpeg')" }}
      />
      <div className="absolute inset-0 bg-coffee-deep/70" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            onClick={handleExplore}
            className="group inline-flex items-center gap-3 bg-coffee-accent text-beige-light px-8 py-4 text-[11px] tracking-[0.2em] uppercase transition-all duration-500 hover:bg-beige-warm hover:text-coffee-dark font-semibold"
          >
            Explore Our Work
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="transition-transform duration-500 group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>

        {/* SINGLE LINE — same font language as Explore Our Work button */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 font-heading font-semibold uppercase text-beige-light leading-none tracking-[0.18em] text-[9vw] sm:text-5xl md:text-6xl lg:text-7xl whitespace-nowrap"
        >
          nerospacedesigns
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="text-xs text-beige-light/60 mt-8 font-heading tracking-[0.14em] uppercase"
        >
          Auto-redirecting in {countdown}s
        </motion.p>
      </div>
    </motion.div>
  );
}

