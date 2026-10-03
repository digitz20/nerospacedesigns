"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      className={cn("mb-12 md:mb-16", center ? "text-center" : "text-left")}
    >
      {eyebrow && (
        <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-earthen-brown mb-4">
          {eyebrow}
        </p>
      )}
      <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary-dark leading-[1.1] mb-4 md:mb-6">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm md:text-base text-primary-dark/70 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

import { cn } from "@/lib/utils";
