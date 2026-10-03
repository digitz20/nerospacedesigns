"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  location: string;
  category: string;
  year: string;
  image: string;
  aspectRatio: string;
  slug: string;
  index: number;
  secondaryImage?: string;
}

export default function ProjectCard({
  title,
  location,
  category,
  year,
  image,
  aspectRatio,
  slug,
  index,
  secondaryImage,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
    >
      <Link href={`/projects/${slug}`} className="group block">
        <motion.div
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          whileInView={{ clipPath: "inset(0)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className={`relative overflow-hidden ${aspectRatio} mb-4 md:mb-6`}
        >
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
            loading="lazy"
          />
          {secondaryImage && (
            <img
              src={secondaryImage}
              alt={`${title} alternate`}
              className="absolute inset-0 w-full h-full object-cover opacity-0 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              loading="lazy"
            />
          )}
          <div className="absolute inset-0 bg-primary-dark/0 group-hover:bg-primary-dark/20 transition-colors duration-500" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="text-primary-cream text-[11px] tracking-[0.2em] uppercase border border-primary-cream/50 px-6 py-3">
              View Project
            </span>
          </div>
        </motion.div>
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
          <div>
            <h3 className="font-heading text-xl md:text-2xl text-primary-dark mb-1 group-hover:text-earthen-brown transition-colors duration-300">
              {title}
            </h3>
            <p className="text-xs text-primary-dark/60 tracking-wide">
              {location} — {category}
            </p>
          </div>
          <span className="text-xs text-muted-taupe tracking-wider">
            {year}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
