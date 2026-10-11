"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SEAMLESS = [0.22, 1, 0.36, 1] as const;

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    if (isAdmin) return;
    // buttery scroll reset — instant jump feels stiff, smooth glide feels free
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }, [pathname, isAdmin]);

  if (isAdmin) return <>{children}</>;

  return (
    <AnimatePresence mode="sync" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
        transition={{ duration: 0.65, ease: SEAMLESS }}
        className="will-change-[opacity,transform,filter]"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
