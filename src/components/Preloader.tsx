"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/data";

export default function Preloader() {
  const pathname = usePathname();
  const [isFadingOut, setIsFadingOut] = useState(false);

  // never block admin / splash with the marketing preloader
  const isExcluded = pathname?.startsWith("/admin") || pathname === "/splash";

  useEffect(() => {
    if (isExcluded) {
      setIsFadingOut(true);
      return;
    }
    const timer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1100);
    return () => clearTimeout(timer);
  }, [isExcluded]);

  if (isExcluded) return null;

  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[10002] bg-coffee-deep flex items-center justify-center pointer-events-none"
        >
          <div className="text-center px-6">
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-4xl md:text-6xl text-beige-light tracking-wide mb-6 font-bold uppercase"
            >
              {siteConfig.name}
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-32 h-[1px] bg-beige-light mx-auto origin-center"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
