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

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-8 aspect-[16/9] overflow-hidden cursor-pointer"
          onClick={() => setLightboxIndex(0)}
        >
          <Image
            src={images[0]}
            alt={title}
            width={1200}
            height={675}
            className="w-full h-full object-cover"
            priority
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="md:col-span-4 aspect-[3/4] md:aspect-auto overflow-hidden cursor-pointer"
          onClick={() => setLightboxIndex(1)}
        >
          <Image
            src={images[1]}
            alt={`${title} detail`}
            width={600}
            height={800}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:col-span-4 aspect-[4/3] overflow-hidden cursor-pointer"
          onClick={() => setLightboxIndex(2)}
        >
          <Image
            src={images[2]}
            alt={`${title} detail`}
            width={600}
            height={450}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="md:col-span-8 aspect-[16/9] overflow-hidden cursor-pointer"
          onClick={() => setLightboxIndex(0)}
        >
          <Image
            src={images[0]}
            alt={`${title} wide`}
            width={1200}
            height={675}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
