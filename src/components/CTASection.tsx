"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 md:py-32 bg-coffee-deep relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img
          src="/images/cta-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
      </div>
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-beige-medium mb-6 font-semibold">
            Start A Project
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-beige-light leading-[1.1] mb-6 md:mb-8 font-bold uppercase">
            Let&apos;s Create Something Considered.
          </h2>
          <p className="text-sm md:text-base text-beige-light/70 max-w-xl mx-auto mb-10 md:mb-12 leading-relaxed font-heading">
            Have a space in mind? Tell us about your project.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 bg-beige-light text-coffee-dark px-10 py-5 text-[11px] tracking-[0.2em] uppercase transition-all duration-300 hover:bg-beige-warm font-semibold"
          >
            Book Consultation
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
