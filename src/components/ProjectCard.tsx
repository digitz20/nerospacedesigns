"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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
        <div
          className={`relative overflow-hidden ${aspectRatio} mb-4 md:mb-6`}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
            loading="lazy"
          />
          {secondaryImage && (
            <img
              src={secondaryImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              aria-hidden="true"
            />
          )}
          <div className="absolute inset-0 bg-coffee-dark/0 group-hover:bg-coffee-dark/20 transition-colors duration-500" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="text-beige-light text-[11px] tracking-[0.2em] uppercase border border-beige-light/50 px-6 py-3 font-semibold">
              View Project
            </span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
          <div>
            <h3 className="font-heading text-xl md:text-2xl text-coffee-dark mb-1 group-hover:text-coffee-accent transition-colors duration-300 font-bold uppercase tracking-wide">
              {title}
            </h3>
            <p className="text-xs text-coffee-dark/60 tracking-wide font-heading">
              {location} — {category}
            </p>
          </div>
          <span className="text-xs text-coffee-muted tracking-wider font-heading">
            {year}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
