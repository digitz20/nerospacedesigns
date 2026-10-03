"use client";

export default function Marquee() {
  return (
    <section className="py-8 md:py-12 bg-primary-cream overflow-hidden">
      <div className="relative">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="text-sm md:text-base tracking-[0.2em] uppercase text-earthen-brown/80 font-heading mx-4">
            INTERIOR DESIGN STUDIO • LAGOS • NIGERIA • BESPOKE DESIGN •
          </span>
          <span className="text-sm md:text-base tracking-[0.2em] uppercase text-earthen-brown/80 font-heading mx-4">
            INTERIOR DESIGN STUDIO • LAGOS • NIGERIA • BESPOKE DESIGN •
          </span>
        </div>
      </div>
    </section>
  );
}
