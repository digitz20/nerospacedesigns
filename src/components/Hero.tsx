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

const DISPLAY_DURATION = 90000;
const TRANSITION_DURATION = 1500;

interface Waypoint {
  x: number;
  y: number;
  scale: number;
}

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function generateRandomFlightPath(duration: number): Waypoint[] {
  const waypoints: Waypoint[] = [];
  const numWaypoints = 6 + Math.floor(Math.random() * 5);

  let currentX = randomBetween(-3, 3);
  let currentY = randomBetween(-3, 3);
  let currentScale = randomBetween(0.9, 1.05);

  waypoints.push({ x: currentX, y: currentY, scale: currentScale });

  const segmentDuration = duration / (numWaypoints - 1);

  for (let i = 1; i < numWaypoints; i++) {
    const isZoomIn = Math.random() > 0.45;

    if (isZoomIn) {
      currentScale = randomBetween(1.2, 1.5);
    } else {
      currentScale = randomBetween(0.9, 1.05);
    }

    currentX = randomBetween(-8, 8);
    currentY = randomBetween(-8, 8);

    waypoints.push({ x: currentX, y: currentY, scale: currentScale });
  }

  return waypoints;
}

function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

function easeInOutSine(t: number): number {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

export default function Hero() {
  const [images] = useState<HeroImage[]>(HERO_IMAGES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 0.9 });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeSlideRef = useRef<HTMLDivElement>(null);
  const flightPathRef = useRef<Waypoint[]>([]);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

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

  useEffect(() => {
    flightPathRef.current = generateRandomFlightPath(DISPLAY_DURATION);
    startTimeRef.current = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / DISPLAY_DURATION, 1);

      const path = flightPathRef.current;
      const totalSegments = path.length - 1;
      const segmentProgress = progress * totalSegments;
      const segmentIndex = Math.min(Math.floor(segmentProgress), totalSegments - 1);
      const localProgress = segmentProgress - segmentIndex;

      const easedProgress = easeInOutSine(localProgress);

      const from = path[segmentIndex];
      const to = path[segmentIndex + 1];

      const x = lerp(from.x, to.x, easedProgress);
      const y = lerp(from.y, to.y, easedProgress);
      const scale = lerp(from.scale, to.scale, easedProgress);

      setTransform({ x, y, scale });

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [currentIndex]);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        {visibleImages.length > 0
          ? visibleImages.map((img, index) => {
              const isActive = index === currentIndex;
              return (
                <div
                  key={img.id}
                  ref={isActive ? activeSlideRef : null}
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${img.url})`,
                    opacity: isActive ? 1 : 0,
                    transform: isActive
                      ? `translate(${transform.x}%, ${transform.y}%) scale(${transform.scale})`
                      : "scale(0.9)",
                    transition: `opacity ${TRANSITION_DURATION}ms ease-in-out`,
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
