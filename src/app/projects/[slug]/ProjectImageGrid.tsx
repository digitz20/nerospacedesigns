"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import Lightbox from "@/components/Lightbox";

interface ProjectImageGridProps {
  images: string[];
  title: string;
}

export default function ProjectImageGrid({ images, title }: ProjectImageGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const safeImages = images.filter((src) => src && src.trim() !== "");

  if (safeImages.length === 0) {
    return null;
  }

  const gridClass =
    safeImages.length === 1
      ? "grid-cols-1"
      : safeImages.length === 2
        ? "grid-cols-1 md:grid-cols-2"
        : safeImages.length === 3
          ? "grid-cols-1 md:grid-cols-12"
          : "grid-cols-1 md:grid-cols-12";

  return (
    <>
      <div className={`grid ${gridClass} gap-4 md:gap-6 mb-16 md:mb-24`}>
        {safeImages.map((src, index) => {
          const isFirst = index === 0;
          const isLast = index === safeImages.length - 1;
          const colSpan =
            safeImages.length === 1
              ? "md:col-span-12"
              : safeImages.length === 2
                ? "md:col-span-6"
                : safeImages.length === 3
                  ? index === 0
                    ? "md:col-span-12"
                    : "md:col-span-6"
                  : index % 2 === 0
                    ? "md:col-span-8"
                    : "md:col-span-4";

          const aspectClass =
            safeImages.length === 1
              ? "aspect-[16/9]"
              : safeImages.length === 2
                ? "aspect-[4/3]"
                : safeImages.length === 3
                  ? index === 0
                    ? "aspect-[16/9]"
                    : "aspect-[4/3]"
                  : index % 2 === 0
                    ? "aspect-[16/9]"
                    : "aspect-[3/4]";

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`${colSpan} ${aspectClass} overflow-hidden cursor-pointer`}
              onClick={() => setLightboxIndex(index)}
            >
              <Image
                src={src}
                alt={isFirst ? title : isLast ? `${title} detail` : `${title} view ${index + 1}`}
                width={1200}
                height={675}
                className="w-full h-full object-cover"
                priority={isFirst}
              />
            </motion.div>
          );
        })}
      </div>

      {lightboxIndex !== null && safeImages.length > 0 && (
        <Lightbox
          images={safeImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
