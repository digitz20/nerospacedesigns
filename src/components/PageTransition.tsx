"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SEAMLESS = [0.22, 1, 0.36, 1] as const;

// Runs when a page's content mounts (inside the keyed wrapper), so the scroll
// resets exactly as the new page fades in — never yanking the old page.
function ScrollReset() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);
  return null;
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  // mode="wait": the old page finishes fading out before the new one enters —
  // no stacked pages, no layout jump. Only opacity/transform are animated
  // (blur on a full page drops frames on mobile GPUs).
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10, transition: { duration: 0.28, ease: SEAMLESS } }}
        transition={{ duration: 0.45, ease: SEAMLESS }}
      >
        <ScrollReset />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
