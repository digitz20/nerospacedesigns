"use client";

export default function Marquee() {
  return (
    <section className="py-8 md:py-12 bg-beige-warm overflow-hidden">
      <div className="relative">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="text-sm md:text-base tracking-[0.2em] uppercase text-coffee-accent/80 font-heading font-semibold mx-4">
            INTERIOR DESIGN STUDIO • ABUJA • NIGERIA • BESPOKE DESIGN •
          </span>
          <span className="text-sm md:text-base tracking-[0.2em] uppercase text-coffee-accent/80 font-heading font-semibold mx-4">
            INTERIOR DESIGN STUDIO • ABUJA • NIGERIA • BESPOKE DESIGN •
          </span>
        </div>
      </div>
    </section>
  );
}
