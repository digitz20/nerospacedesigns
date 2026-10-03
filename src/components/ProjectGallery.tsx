"use client";

import { motion } from "framer-motion";

const images = [
  "/images/gallery/1.jpg",
  "/images/gallery/2.jpg",
  "/images/gallery/3.jpg",
  "/images/gallery/4.jpg",
];

export default function ProjectGallery() {
  return (
    <section className="py-24 md:py-32 bg-beige-light">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {images.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`overflow-hidden ${
                i === 0 ? "col-span-2 row-span-2" : ""
              } ${i === 1 ? "col-span-1 row-span-1" : ""} ${
                i === 2 ? "col-span-1 row-span-2" : ""
              } ${i === 3 ? "col-span-1 row-span-1" : ""}`}
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
    </section>
  );
}
