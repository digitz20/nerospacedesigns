"use client";

import { motion } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  index: number;
}

export default function ServiceCard({
  id,
  title,
  description,
  index,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      className="group"
    >
      <MagneticButton className="block w-full">
        <div
          className={cn(
            "bg-secondary-cream rounded-2xl p-8 md:p-10 lg:p-12",
            "transition-all duration-500 hover:shadow-2xl hover:-translate-y-2",
            "border border-transparent hover:border-warm-beige/40"
          )}
        >
          <div className="flex items-start gap-4 md:gap-6">
            <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-warm-beige flex items-center justify-center">
              <span className="font-heading text-xl md:text-2xl text-earthen-brown">
                {id}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-heading text-xl md:text-2xl text-primary-dark mb-3 md:mb-4 leading-tight">
                {title}
              </h3>
              <p className="text-sm text-primary-dark/70 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
      </MagneticButton>
    </motion.div>
  );
}
