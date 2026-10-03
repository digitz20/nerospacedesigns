"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Lightbox from "@/components/Lightbox";

const images = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
];

export default function ProjectGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 bg-primary-cream">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {images.map((src, i) => (
            <motion.div
              key={i}
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              whileInView={{ clipPath: "inset(0)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className={`overflow-hidden cursor-pointer ${
                i === 0 ? "col-span-2 row-span-2" : ""
              } ${i === 1 ? "col-span-1 row-span-1" : ""} ${
                i === 2 ? "col-span-1 row-span-2" : ""
              } ${i === 3 ? "col-span-1 row-span-1" : ""}`}
              onClick={() => setLightboxIndex(i)}
            >
              <img
                src={src}
                alt={`Gallery image ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
}
