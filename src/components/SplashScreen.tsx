"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const SPLASH_DURATION = 60;

// Module scope: lives across client-side navigation, resets on full page reload.
// This is the "once per visit" memory — sessionStorage keys went stale and
// permanently killed the splash, which is why you see nothing now.
let splashCompleted = false;

export default function SplashScreen() {
  const router = useRouter();
  const pathname = usePathname();
  const [countdown, setCountdown] = useState(SPLASH_DURATION);
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const leavingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Never show splash chrome on admin / splash route itself
  const isExcluded =
    pathname?.startsWith("/admin") || pathname === "/splash";
  const isHome = pathname === "/";

  // THE rule, once and for all:
  // - land on "/" fresh (reload / new tab) → splash shows, counts down
  // - dismiss it (button or countdown) → gone for the rest of this visit,
  //   clicking to other pages and back to "/" NEVER brings it back
  // - full reload / new tab → shows again (that's a new visit)
  // NOTE: deps stay CONSTANT size ([isExcluded, isHome]) — React crashes
  // if a dep array changes length between renders.
  useEffect(() => {
    if (isExcluded || !isHome || splashCompleted || leavingRef.current) return;
    const t = setTimeout(() => setShow(true), 80);
    return () => clearTimeout(t);
  }, [isExcluded, isHome]);

  // If the user navigates away while the splash is up, kill it instantly —
  // the splash must never follow you to another page.
  useEffect(() => {
    if (!isHome && show) {
      if (timerRef.current) clearInterval(timerRef.current);
      splashCompleted = true;
      leavingRef.current = true;
      setShow(false);
      document.body.style.overflow = "";
    }
  }, [isHome, show]);

  useEffect(() => {
    if (!show || isExcluded) return;
    if (leavingRef.current) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          // countdown expiry fades the splash away in place —
          // no router.push needed, we're already on "/"
          if (!leavingRef.current) {
            leavingRef.current = true;
            splashCompleted = true;
            setLeaving(true);
            setTimeout(() => setShow(false), 750);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, isExcluded]);

  // lock scroll while splash is up, restore smoothly after
  useEffect(() => {
    if (!show || leaving) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [show, leaving]);

  const handleExit = (href: string) => {
    if (leavingRef.current) return;
    leavingRef.current = true;
    splashCompleted = true;
    if (timerRef.current) clearInterval(timerRef.current);
    setLeaving(true);
    // fade out in place, then unmount; if we're somehow not on "/",
    // navigate there softly after the fade (no hard reload)
    setTimeout(() => {
      setShow(false);
      if (pathname !== href) {
        router.push(href);
      }
    }, 700);
  };

  if (isExcluded || !show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          initial={{ opacity: 0 }}
          animate={{ opacity: leaving ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-black overflow-hidden"
        >
          {/* slow cinematic zoom — same image, but free / seamless */}
          <motion.div
            initial={{ scale: 1.12 }}
            animate={{ scale: leaving ? 1.18 : 1.02 }}
            transition={{ duration: leaving ? 0.7 : 8, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/mainimage.jpeg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/70" />

          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                onClick={() => handleExit("/")}
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

            {/* SINGLE LINE — same font-family / weight / tracking language as Explore Our Work button */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 text-center font-heading font-semibold uppercase text-beige-light leading-none tracking-[0.18em] text-[9vw] sm:text-5xl md:text-6xl lg:text-7xl whitespace-nowrap"
            >
              nerospacedesigns
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="fixed bottom-6 left-4 md:bottom-10 md:left-10 text-[10px] sm:text-xs text-beige-light/60 font-heading tracking-[0.14em] uppercase"
            >
              Auto-redirecting in {countdown}s
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

