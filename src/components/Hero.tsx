"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface HeroImage {
  id: string;
  url: string;
  visible: boolean;
}

const HERO_IMAGES: HeroImage[] = [
  {
    id: "bg-01",
    url: "https://i.pinimg.com/736x/83/3f/5c/833f5c8a690122468de27dda69e0c2dd.jpg",
    visible: true,
  },
  {
    id: "bg-02",
    url: "https://i.pinimg.com/736x/64/5e/18/645e18298ad2ff7d7eb5c87b16be3dc0.jpg",
    visible: true,
  },
  {
    id: "bg-03",
    url: "https://i.pinimg.com/736x/12/c8/3e/12c83e3d9b9552e57da6a304d359090a.jpg",
    visible: true,
  },
  {
    id: "bg-04",
    url: "https://i.pinimg.com/736x/1b/47/c8/1b47c819e74f43e45aba38ff6f6adad8.jpg",
    visible: true,
  },
  {
    id: "bg-05",
    url: "https://i.pinimg.com/736x/37/c3/dc/37c3dc32c08915cfc398979d21c8a16d.jpg",
    visible: true,
  },
  {
    id: "bg-06",
    url: "https://i.pinimg.com/736x/0a/ed/8b/0aed8b501eccf695066ddadcb545321f.jpg",
    visible: true,
  },
  {
    id: "bg-07",
    url: "https://i.pinimg.com/736x/f0/e4/68/f0e4685bdcf05dca0ccefdf4817aa91e.jpg",
    visible: true,
  },
  {
    id: "bg-08",
    url: "https://i.pinimg.com/736x/06/d2/ed/06d2edcd64fd8e8995ab1092345cd019.jpg",
    visible: true,
  },
  {
    id: "bg-09",
    url: "https://i.pinimg.com/736x/e5/f4/bd/e5f4bdaad8908646673a2a965327477b.jpg",
    visible: true,
  },
  {
    id: "bg-10",
    url: "https://i.pinimg.com/736x/39/19/d4/3919d48146d59d45cc20d23c87abfa61.jpg",
    visible: true,
  },
  {
    id: "bg-11",
    url: "https://i.pinimg.com/1200x/5f/c1/9d/5fc19d342f9f62c95ba706d55b9c8758.jpg",
    visible: true,
  },
  {
    id: "bg-12",
    url: "https://i.pinimg.com/1200x/30/cc/70/30cc70b7d3ddb081f9c86a84aca8029c.jpg",
    visible: true,
  },
  {
    id: "bg-13",
    url: "https://i.pinimg.com/1200x/60/96/a8/6096a8fb96f930e10afd9db17a1362d7.jpg",
    visible: true,
  },
  {
    id: "bg-14",
    url: "https://i.pinimg.com/736x/e9/5a/45/e95a45e655d77b5e648b550b2988b980.jpg",
    visible: true,
  },
  {
    id: "bg-15",
    url: "https://i.pinimg.com/1200x/09/d0/64/09d064b8eddaa2572f9b7da61b9114cf.jpg",
    visible: true,
  },
  {
    id: "bg-16",
    url: "https://i.pinimg.com/736x/98/e6/81/98e681c8d1542d5c9efba44e8947b2b5.jpg",
    visible: true,
  },
  {
    id: "bg-17",
    url: "https://i.pinimg.com/736x/1f/4e/ca/1f4eca63571cef2ae62f5c5354cb8856.jpg",
    visible: true,
  },
];

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
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
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
      <div className="absolute inset-0 bg-[#3A291C]" />

      {visibleImages.length > 0
        ? visibleImages.map((img, index) => {
            const isActive = index === currentIndex;
            return (
              <div
                key={img.id}
                ref={isActive ? activeSlideRef : null}
                className="absolute inset-0 bg-no-repeat"
                style={{
                  backgroundImage: `url(${img.url})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  opacity: isActive ? 1 : 0,
                  transform: isActive
                    ? `translate(${transform.x}%, ${transform.y}%)`
                    : "translate(0, 0)",
                  filter: isActive ? "blur(0px)" : "blur(0px)",
                  transition: `opacity ${TRANSITION_DURATION}ms ease-in-out`,
                  zIndex: isActive ? 2 : 0,
                }}
              />
            );
          })
        : null}

      {visibleImages.length > 0 &&
        visibleImages.map((img, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={`blur-${img.id}`}
              className="absolute inset-0 bg-no-repeat"
              style={{
                backgroundImage: `url(${img.url})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                opacity: isActive ? 0.6 : 0,
                filter: "blur(18px)",
                transform: "scale(1.05)",
                transition: `opacity ${TRANSITION_DURATION}ms ease-in-out`,
                zIndex: isActive ? 1 : 0,
              }}
            />
          );
        })}

      <div className="absolute inset-0 bg-gradient-to-b from-coffee-deep/40 via-coffee-deep/20 to-coffee-deep/60 z-[3]" />

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
