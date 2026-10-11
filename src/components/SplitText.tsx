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
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          animate={
            animateOnView
              ? isInView
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 16, filter: "blur(4px)" }
              : { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          transition={{
            duration: 0.7,
            delay: delay + i * 0.025,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: "inline-block", willChange: "opacity, transform, filter" }}
        >
          {item}
          {splitBy === "words" && i < items.length - 1 && " "}
        </motion.span>
      ))}
    </MotionTag>
  );
}
