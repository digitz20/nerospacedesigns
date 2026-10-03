"use client";

import { motion } from "framer-motion";

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
}

export default function Testimonial({ quote, author, role }: TestimonialProps) {
  return (
    <section className="py-24 md:py-32 bg-beige-warm">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <blockquote className="font-heading text-3xl md:text-4xl lg:text-5xl text-coffee-dark leading-snug mb-8 md:mb-12 font-bold uppercase">
            {quote}
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-[1px] bg-coffee-accent/50" />
            <div className="text-left">
              <p className="text-sm font-semibold text-coffee-dark tracking-wide font-heading">
                {author}
              </p>
              <p className="text-xs text-coffee-muted font-heading">{role}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
