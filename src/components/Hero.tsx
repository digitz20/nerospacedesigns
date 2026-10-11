"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

interface HeroImage {
  id: string;
  url: string;
  visible: boolean;
}

// FIXED order for SSR — server and client render IDENTICALLY (no hydration error).
// Shuffle + random start happen ONLY after mount, inside useEffect.
const HERO_IMAGES: HeroImage[] = Array.from({ length: 12 }, (_, i) => ({
  id: `bg-${String(i + 1).padStart(2, "0")}`,
  url: `/images/backgrounds/bg-${String(i + 1).padStart(2, "0")}.jpeg`,
  visible: true,
}));

const DISPLAY_DURATION = 60000;
const TRANSITION_DURATION = 1500;

function shuffled<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

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
  // Deterministic first render — identical on server and client (no hydration error).
  // Shuffle + random start run only after mount, inside useEffect.
  const [images, setImages] = useState<HeroImage[]>(HERO_IMAGES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeSlideRef = useRef<HTMLDivElement>(null);
  const flightPathRef = useRef<Waypoint[]>([]);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const visibleImages = images.filter((img) => img.visible);

  // Mount only: reveal text, then shuffle order + jump to a random slide (client-only).
  useEffect(() => {
    setIsLoaded(true);
    const t = setTimeout(() => {
      setImages(shuffled(HERO_IMAGES));
      setCurrentIndex(Math.floor(Math.random() * HERO_IMAGES.length));
    }, 60);
    return () => clearTimeout(t);
  }, []);

  // Autoplay — a random DIFFERENT slide each cycle, never orderly.
  // Restarted on every slide change so each image gets its full duration
  // and manual dot picks keep the flow alive.
  useEffect(() => {
    const count = visibleImages.length;
    if (count <= 1) return;

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        let next = prev;
        let guard = 0;
        while (next === prev && guard++ < 25) {
          next = Math.floor(Math.random() * count);
        }
        return next === prev ? (prev + 1) % count : next;
      });
    }, DISPLAY_DURATION);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [visibleImages.length, currentIndex]);

  // Original cinematic drift — fresh flight path per slide, guarded so it can never crash.
  useEffect(() => {
    flightPathRef.current = generateRandomFlightPath(DISPLAY_DURATION);
    startTimeRef.current = performance.now();

    const animate = (currentTime: number) => {
      const path = flightPathRef.current;
      if (!Array.isArray(path) || path.length < 2) return;

      const elapsed = currentTime - startTimeRef.current;
      if (!Number.isFinite(elapsed) || elapsed < 0) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      const progress = Math.min(elapsed / DISPLAY_DURATION, 1);

      const totalSegments = path.length - 1;
      const segmentProgress = progress * totalSegments;
      const segmentIndex = Math.min(
        Math.max(Math.floor(segmentProgress), 0),
        totalSegments - 1
      );
      const localProgress = Math.min(
        Math.max(segmentProgress - segmentIndex, 0),
        1
      );

      const easedProgress = easeInOutSine(localProgress);

      const from = path[segmentIndex];
      const to = path[segmentIndex + 1];
      if (!from || !to) return;

      const x = lerp(from.x, to.x, easedProgress);
      const y = lerp(from.y, to.y, easedProgress);
      if (!Number.isFinite(x) || !Number.isFinite(y)) {
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        }
        return;
      }

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

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 text-center">
        {isLoaded && (
          <>
            <p
              className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-beige-medium mb-6 md:mb-8 font-semibold animate-fadeUp"
              style={{ animationDelay: "0.1s" }}
            >
              Interior Architecture Studio
            </p>

            <h1
              className="font-halogen text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-beige-light leading-[1.05] tracking-[0.04em] mb-8 md:mb-10 lg:mb-12 font-extrabold uppercase animate-fadeUp"
              style={{ animationDelay: "0.25s" }}
            >
              Spaces That Feel
              <br />
              Like Home.
            </h1>

              <p
                className="text-sm md:text-base text-beige-light/80 max-w-xl mx-auto mb-8 md:mb-10 leading-relaxed font-heading animate-fadeUp font-semibold"
                style={{ animationDelay: "0.4s" }}
              >
                Interior architecture, spatial planning and bespoke design for
                considered living.
              </p>

            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 animate-fadeUp"
              style={{ animationDelay: "0.55s" }}
            >
              <Link
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
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 border-2 border-beige-light text-beige-light px-8 py-4 text-[11px] tracking-[0.2em] uppercase transition-all duration-300 hover:bg-beige-light hover:text-coffee-dark font-semibold"
              >
                Book Consultation
              </Link>
            </div>
          </>
        )}
      </div>

      {visibleImages.length > 1 && (
        <div
          className="absolute bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-10 animate-fadeUp"
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
          className="absolute bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 animate-fadeUp"
          style={{ animationDelay: "1.5s" }}
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-beige-light/50 to-transparent" />
        </div>
      )}
    </section>
  );
}
