"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/data";

export default function Preloader() {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[10002] bg-coffee-deep flex items-center justify-center hidden md:flex"
        >
          <div className="text-center">
            <h2 className="font-heading text-4xl md:text-6xl text-beige-light tracking-wide mb-6 font-bold uppercase">
              {siteConfig.name}
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-32 h-[1px] bg-beige-light mx-auto origin-center"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
