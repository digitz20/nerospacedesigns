"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SplitTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  splitBy?: "chars" | "words";
  once?: boolean;
  animateOnView?: boolean;
}

export default function SplitText({
  text,
  as = "span",
  className = "",
  delay = 0,
  splitBy = "words",
  once = true,
  animateOnView = true,
}: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  const items =
    splitBy === "words"
      ? text.split(" ").filter(Boolean)
      : text.split("");

  const MotionTag =
    as === "h1"
      ? motion.h1
      : as === "h2"
      ? motion.h2
      : as === "h3"
      ? motion.h3
      : as === "p"
      ? motion.p
      : motion.span;

  return (
    <MotionTag ref={ref} className={className}>
      {items.map((item, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={
            animateOnView
              ? isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
              : { opacity: 1, y: 0 }
          }
          transition={{
            duration: 0.5,
            delay: delay + i * 0.03,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{ display: "inline-block" }}
        >
          {item}
          {splitBy === "words" && i < items.length - 1 && " "}
        </motion.span>
      ))}
    </MotionTag>
  );
}
