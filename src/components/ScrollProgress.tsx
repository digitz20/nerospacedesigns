"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [height, setHeight] = useState(0);
  const { scrollY } = useScroll();

  useEffect(() => {
    const updateHeight = () => {
      setHeight(document.documentElement.scrollHeight - window.innerHeight);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const progress = useTransform(scrollY, [0, height], [0, 1], { clamp: true });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-earthen-brown z-[9999] origin-left"
      style={{ scaleX: progress }}
    />
  );
}
