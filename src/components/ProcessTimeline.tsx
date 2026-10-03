"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

interface ProcessTimelineProps {
  steps: { id: string; title: string; description: string }[];
}

export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <section className="py-24 md:py-32 bg-primary-cream">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <SectionHeading
          eyebrow="How We Work"
          title="Our Process"
          subtitle="A structured approach to creating spaces that inspire and endure."
          center
        />

        <div className="hidden md:grid grid-cols-4 gap-8 lg:gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-earthen-brown flex items-center justify-center flex-shrink-0">
                  <span className="font-heading text-lg text-primary-cream">
                    {step.id}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex-1 h-[1px] bg-earthen-brown/30" />
                )}
              </div>
              <h3 className="font-heading text-2xl text-primary-dark mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-primary-dark/70 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="md:hidden space-y-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex gap-6"
            >
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-earthen-brown flex items-center justify-center flex-shrink-0">
                  <span className="font-heading text-lg text-primary-cream">
                    {step.id}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-[1px] h-full bg-earthen-brown/30 mt-2" />
                )}
              </div>
              <div className="flex-1 pb-8">
                <h3 className="font-heading text-2xl text-primary-dark mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-primary-dark/70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
