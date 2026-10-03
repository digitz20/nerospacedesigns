"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 10, suffix: "+", label: "YEARS EXPERIENCE" },
  { value: 50, suffix: "+", label: "PROJECTS COMPLETED" },
  { value: 15, suffix: "+", label: "DESIGN AWARDS" },
  { value: 100, suffix: "%", label: "CLIENT SATISFACTION" },
];

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-coffee-deep">
      <div ref={ref} className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`text-center ${i > 0 ? "md:border-l md:border-beige-medium/20" : ""}`}
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} isInView={isInView} />
              <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-beige-medium mt-3 font-semibold">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedCounter({
  value,
  suffix,
  isInView,
}: {
  value: number;
  suffix: string;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 2000;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      start = Math.floor(progress * end);
      setCount(start);

      if (progress >= 1) {
        clearInterval(timer);
        setCount(end);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div className="font-heading text-5xl md:text-6xl lg:text-7xl text-beige-light font-bold">
      {count}{suffix}
    </div>
  );
}
