"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface HeroImage {
  id: string;
  url: string;
  visible: boolean;
}

const HERO_IMAGES: HeroImage[] = Array.from({ length: 15 }, (_, i) => ({
  id: `bg-${String(i + 1).padStart(2, "0")}`,
  url: `/images/backgrounds/bg-${String(i + 1).padStart(2, "0")}.jpeg`,
  visible: true,
}));

const DISPLAY_DURATION = 60000;
const TRANSITION_DURATION = 2000;
const KEN_BURNS_DURATION = 60000;

const KEN_BURNS_CLASSES = [
  "hero-ken-burns-1",
  "hero-ken-burns-2",
  "hero-ken-burns-3",
  "hero-ken-burns-4",
  "hero-ken-burns-5",
  "hero-ken-burns-6",
];

export default function Hero() {
  const [images] = useState<HeroImage[]>(HERO_IMAGES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const visibleImages = images.filter((img) => img.visible);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const count = visibleImages.length;
    if (count === 0) return;

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % count);
    }, DISPLAY_DURATION);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [visibleImages.length]);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        {visibleImages.length > 0
          ? visibleImages.map((img, index) => {
              const isActive = index === currentIndex;
              const kenBurnsClass = KEN_BURNS_CLASSES[index % KEN_BURNS_CLASSES.length];
              return (
                <div
                  key={img.id}
                  className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${isActive ? kenBurnsClass : ""}`}
                  style={{
                    backgroundImage: `url(${img.url})`,
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "scale(1.15)" : "scale(1)",
                    transition: `opacity ${TRANSITION_DURATION}ms ease-in-out, transform ${TRANSITION_DURATION}ms ease-in-out`,
                    zIndex: isActive ? 1 : 0,
                  }}
                />
              );
            })
          : null}
        <div className="absolute inset-0 bg-gradient-to-b from-coffee-deep/50 via-coffee-deep/30 to-coffee-deep/70" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 text-center">
        {isLoaded && (
          <>
            <p
              className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-beige-medium mb-6 md:mb-8 font-semibold animate-fadeUp"
              style={{ animationDelay: "0.1s" }}
            >
              Interior Architecture Studio
            </p>

            <h1
              className="font-heading text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-beige-light leading-[0.9] tracking-tight mb-6 md:mb-8 font-bold uppercase animate-fadeUp"
              style={{ animationDelay: "0.25s" }}
            >
              Spaces That Feel
              <br />
              Like Home.
            </h1>

            <p
              className="text-sm md:text-base text-beige-light/80 max-w-xl mx-auto mb-10 md:mb-12 leading-relaxed font-heading animate-fadeUp"
              style={{ animationDelay: "0.4s" }}
            >
              Interior architecture, spatial planning and bespoke design for
              considered living.
            </p>

            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeUp"
              style={{ animationDelay: "0.55s" }}
            >
              <a
                href="/projects"
                className="group inline-flex items-center gap-3 bg-coffee-accent text-beige-light px-8 py-4 text-[11px] tracking-[0.2em] uppercase transition-all duration-300 hover:bg-beige-warm hover:text-coffee-dark font-semibold"
              >
                Explore Our Work
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-3 border-2 border-beige-light text-beige-light px-8 py-4 text-[11px] tracking-[0.2em] uppercase transition-all duration-300 hover:bg-beige-light hover:text-coffee-dark font-semibold"
              >
                Book Consultation
              </a>
            </div>
          </>
        )}
      </div>

      {visibleImages.length > 1 && (
        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-10 animate-fadeUp"
          style={{ animationDelay: "1.5s" }}
        >
          {visibleImages.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (intervalRef.current) clearInterval(intervalRef.current);
                setCurrentIndex(index);
              }}
              className={`h-1 rounded-full transition-all duration-500 ${
                index === currentIndex
                  ? "w-8 bg-beige-light"
                  : "w-4 bg-beige-light/30 hover:bg-beige-light/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {visibleImages.length <= 1 && (
        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-fadeUp"
          style={{ animationDelay: "1.5s" }}
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-beige-light/50 to-transparent" />
        </div>
      )}
    </section>
  );
}
