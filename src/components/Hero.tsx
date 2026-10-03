"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-secondary-dark">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover opacity-40"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-secondary-dark/60 via-secondary-dark/40 to-secondary-dark/80" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 text-center">
        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-warm-beige mb-6 md:mb-8"
        >
          Interior Architecture Studio
        </motion.p>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-heading text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-primary-cream leading-[0.9] tracking-tight mb-6 md:mb-8"
        >
          Spaces That Feel<br />
          Like Home.
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-sm md:text-base text-primary-cream/80 max-w-xl mx-auto mb-10 md:mb-12 leading-relaxed"
        >
          Interior architecture, spatial planning and bespoke design for considered living.
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 bg-earthen-brown text-primary-cream px-8 py-4 text-[11px] tracking-[0.2em] uppercase transition-all duration-300 hover:bg-muted-taupe"
          >
            Explore Our Work
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 border border-primary-cream/30 text-primary-cream px-8 py-4 text-[11px] tracking-[0.2em] uppercase transition-all duration-300 hover:border-primary-cream hover:bg-primary-cream/5"
          >
            Start A Project
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-primary-cream/50 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
