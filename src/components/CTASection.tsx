"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SplitText from "@/components/SplitText";
import MagneticButton from "@/components/MagneticButton";

export default function CTASection() {
  return (
    <section className="py-24 md:py-32 bg-secondary-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80"
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
          <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-warm-beige mb-6">
            Start A Project
          </p>
          <SplitText
            text="Let's Create Something Considered."
            as="h2"
            className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-primary-cream leading-[1.1] mb-6 md:mb-8"
          />
          <p className="text-sm md:text-base text-primary-cream/70 max-w-xl mx-auto mb-10 md:mb-12 leading-relaxed">
            Have a space in mind? Tell us about your project.
          </p>
          <MagneticButton>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 bg-earthen-brown text-primary-cream px-10 py-5 text-[11px] tracking-[0.2em] uppercase transition-all duration-300 hover:bg-muted-taupe"
            >
              Get In Touch
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
