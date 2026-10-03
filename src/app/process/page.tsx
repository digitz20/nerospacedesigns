"use client";

import SectionHeading from "@/components/SectionHeading";
import ProcessTimeline from "@/components/ProcessTimeline";
import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";
import { processSteps } from "@/lib/data";

export default function ProcessPage() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 100]);

  return (
    <div>
      <section className="pt-32 md:pt-40 pb-16 md:pb-24 bg-primary-cream">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <SectionHeading
            eyebrow="How We Work"
            title="Our Process"
            subtitle="A structured approach to creating spaces that inspire and endure."
            center
          />
        </div>
      </section>

      <section className="pb-24 md:pb-32 bg-primary-cream">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <ProcessTimeline steps={processSteps} />
        </div>
      </section>

      <section className="py-24 md:py-32 bg-secondary-cream">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="aspect-[4/5] overflow-hidden">
              <motion.img
                src="https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80"
                alt="Design process"
                className="w-full h-full object-cover"
                style={{ y }}
              />
            </div>
            <div>
              <h2 className="font-heading text-4xl md:text-5xl text-primary-dark leading-[1.1] mb-6">
                A Collaborative Journey
              </h2>
              <p className="text-sm md:text-base text-primary-dark/70 leading-relaxed mb-6">
                Our process is designed to be transparent and collaborative. We
                keep you informed at every stage, ensuring that the final result
                exceeds your expectations.
              </p>
              <p className="text-sm md:text-base text-primary-dark/70 leading-relaxed">
                From the initial consultation to the final reveal, we are with
                you every step of the way, turning your vision into a space that
                feels truly like home.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
