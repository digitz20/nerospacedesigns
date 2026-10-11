"use client";

import { motion } from "framer-motion";
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
      initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.85, delay: Math.min(index * 0.08, 0.32), ease: [0.22, 1, 0.36, 1] as const }}
      className="group"
    >
      <div
        className={cn(
          "bg-beige-warm rounded-2xl p-8 md:p-10 lg:p-12",
          "transition-all duration-500 hover:shadow-xl hover:-translate-y-1",
          "border border-transparent hover:border-beige-medium"
        )}
      >
        <div className="flex items-start gap-4 md:gap-6">
          <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-beige-medium flex items-center justify-center">
            <span className="font-heading text-xl md:text-2xl text-coffee-dark font-bold">
              {id}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="font-heading text-xl md:text-2xl text-coffee-dark mb-3 md:mb-4 leading-tight font-bold uppercase tracking-wide">
              {title}
            </h3>
            <p className="text-sm text-coffee-dark/70 leading-relaxed font-heading">
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
