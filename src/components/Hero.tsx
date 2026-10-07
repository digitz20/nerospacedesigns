"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface HeroImage {
  id: string;
  url: string;
  visible: boolean;
}

const HERO_IMAGES: HeroImage[] = Array.from({ length: 12 }, (_, i) => ({
  id: `bg-${String(i + 1).padStart(2, "0")}`,
  url: `/images/backgrounds/bg-${String(i + 1).padStart(2, "0")}.jpeg`,
  visible: true,
}));

const DISPLAY_DURATION = 60000;
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
  const numWaypoints = 8 + Math.floor(Math.random() * 6);

  let currentX = randomBetween(-2, 2);
  let currentY = randomBetween(-2, 2);

  waypoints.push({ x: currentX, y: currentY, scale: 1 });

  for (let i = 1; i < numWaypoints; i++) {
    currentX = randomBetween(-6, 6);
    currentY = randomBetween(-6, 6);

    waypoints.push({ x: currentX, y: currentY, scale: 1 });
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
  const [position, setPosition] = useState({ x: 50, y: 50 });
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

      setPosition({ x: 50 + x, y: 50 + y });

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
      <div className="absolute inset-0 bg-[#3A291C]" />

      {visibleImages.length > 0 &&
        visibleImages.map((img, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={`blur-${img.id}`}
              className="absolute inset-0 bg-no-repeat hidden md:block"
              style={{
                backgroundImage: `url(${img.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: isActive ? 0.5 : 0,
                filter: "blur(25px) brightness(0.7)",
                transform: "scale(1.05)",
                transition: `opacity ${TRANSITION_DURATION}ms ease-in-out`,
                zIndex: isActive ? 1 : 0,
              }}
            />
          );
        })}

      {visibleImages.length > 0
        ? visibleImages.map((img, index) => {
            const isActive = index === currentIndex;
            return (
              <div
                key={img.id}
                ref={isActive ? activeSlideRef : null}
                className="absolute inset-0 bg-no-repeat hero-sharp-image"
                style={{
                  backgroundImage: `url(${img.url})`,
                  backgroundPosition: isActive
                    ? `${position.x}% ${position.y}%`
                    : "center",
                  opacity: isActive ? 1 : 0,
                  filter: "blur(0px)",
                  transition: `opacity ${TRANSITION_DURATION}ms ease-in-out`,
                  zIndex: isActive ? 2 : 0,
                }}
              />
            );
          })
        : null}

      <div className="absolute inset-0 bg-gradient-to-b from-coffee-deep/40 via-coffee-deep/20 to-coffee-deep/60 z-[3]" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24 lg:py-28 text-center">
        {isLoaded && (
          <>
            <p
              className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-beige-medium mb-6 md:mb-8 font-semibold animate-fadeUp"
              style={{ animationDelay: "0.1s" }}
            >
              Interior Architecture Studio
            </p>

            <h1
              className="font-halogen text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] text-beige-light leading-[0.95] tracking-[0.08em] mb-16 md:mb-24 lg:mb-32 font-black uppercase animate-fadeUp"
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
