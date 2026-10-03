"use client";

import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";
import SectionHeading from "./SectionHeading";

interface AboutSectionProps {}

export default function AboutSection({}: AboutSectionProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 100]);

  return (
    <section className="py-24 md:py-32 bg-primary-cream">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SectionHeading
              eyebrow="The Studio"
              title="About Nerospace"
              subtitle=""
            />
            <p className="text-base md:text-lg text-primary-dark/80 leading-relaxed mb-6">
              NEROSPACE DESIGNS IS A BOUTIQUE INTERIOR DESIGN STUDIO CREATING
              REFINED SPACES WHERE ARCHITECTURE, MATERIALITY AND EVERYDAY LIFE
              MEET.
            </p>
            <p className="text-sm text-primary-dark/70 leading-relaxed mb-8">
              Founded on the belief that great design is born from deep listening
              and meticulous craft, we approach each project as a unique
              collaboration. Our work spans residential and commercial spaces,
              always with a commitment to timeless elegance and thoughtful
              functionality.
            </p>
            <p className="text-sm text-primary-dark/70 leading-relaxed">
              Based in Lagos, Nigeria, our studio brings a global perspective to
              local contexts, creating spaces that are both distinctly African
              and universally refined.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <motion.img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                alt="Nerospace Designs studio"
                className="w-full h-full object-cover"
                style={{ y }}
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 md:w-48 md:h-48 border border-earthen-brown/30 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
