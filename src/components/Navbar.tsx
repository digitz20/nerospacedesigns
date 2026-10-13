"use client";

import { useState, useEffect, type MouseEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { siteConfig, navLinks } from "@/lib/data";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { lockBodyScroll } from "@/lib/useLockBodyScroll";

const SEAMLESS = [0.22, 1, 0.36, 1] as const;

// ── Mobile menu motion ─────────────────────────────────────────────────────
// Deliberately unhurried: the panel drops down like a curtain and retracts
// back up with the same weight, while the links settle in a soft cascade.
// Nothing snaps — both opening and closing are slow, eased landings.
const PANEL_IN = 0.7; // curtain coming down
const PANEL_OUT = 0.6; // curtain going back up
const PANEL_EASE = [0.65, 0, 0.35, 1] as const; // gentle ease-in-out, no snap
const ITEM_IN = 0.55;
const ITEM_OUT = 0.3;
const ITEM_DELAY = 0.15; // links wait for the curtain to start settling
const ITEM_STAGGER = 0.06;
const ITEM_EASE = [0.22, 1, 0.36, 1] as const; // soft deceleration
const ICON_SWAP = 0.4; // hamburger ⇄ cross fades + rotates instead of snapping

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  // The menu remembers WHICH route it was opened on. If the route changes
  // (logo tap, browser back/forward, redirect), it collapses during render —
  // derived state, so it can never be left open over a different page, and it
  // can never reopen when you come back to that route later.
  const [openPath, setOpenPath] = useState<string | null>(null);
  if (openPath !== null && openPath !== pathname) {
    setOpenPath(null);
  }
  const isOpen = openPath !== null;

  // Inner pages have light sections directly under the navbar — a transparent
  // header there leaves the light logo/hamburger invisible and lets page
  // content show through around the open menu. Only the home hero is dark.
  const solid = pathname !== "/" || isScrolled;
  // Fully opaque whenever the menu is open, so nothing shows through it.
  const headerSolid = solid || isOpen;

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);
        ticking = false;
      });
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // iOS-safe scroll lock while the mobile menu is open — overflow:hidden alone
  // does not stop touch scrolling on iPhone, so the page would move behind it.
  useEffect(() => {
    if (!isOpen) return;
    return lockBodyScroll();
  }, [isOpen]);

  // One navigation, guaranteed: cancel the anchor's default navigation and
  // push the route ourselves, so the panel closing/animating can never swallow
  // the route change — the tap always lands on the page that was chosen,
  // never stays on the page it came from.
  const handleNavClick = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setOpenPath(null);
    if (href !== pathname) router.push(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isOpen
          ? "bg-beige-light shadow-[0_8px_30px_rgba(58,41,28,0.08)]"
          : solid
            ? "bg-beige-light/95 backdrop-blur-md shadow-[0_8px_30px_rgba(58,41,28,0.08)]"
            : "bg-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <nav
          className="flex items-center justify-between h-20 md:h-24"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="flex items-center"
            onClick={() => setOpenPath(null)}
          >
            <span className={`text-xl md:text-2xl font-bold uppercase tracking-wide transition-colors duration-500 ${
              headerSolid ? "text-coffee-dark" : "text-beige-light"
            }`}>
              {siteConfig.name}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 font-semibold relative group ${
                  solid ? "text-coffee-dark/80" : "text-beige-light/90"
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-coffee-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link
              href="/contact"
              className={`inline-flex items-center gap-2 px-6 py-3 text-[11px] tracking-[0.2em] uppercase transition-all duration-300 font-semibold ${
                solid
                  ? "bg-coffee-dark text-beige-light hover:bg-coffee-accent"
                  : "bg-beige-light text-coffee-dark hover:bg-beige-warm"
              }`}
            >
              Book Consultation
            </Link>
          </div>

          <button
            className="md:hidden p-2 -mr-2 touch-manipulation"
            onClick={() => setOpenPath(isOpen ? null : pathname)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu-panel"
          >
            {/* Both glyphs share one box and cross-fade with a slow rotate,
                so hamburger → X (and back) glides instead of snapping. */}
            <span className="relative block h-6 w-6">
              <motion.span
                className="absolute inset-0 flex items-center justify-center"
                animate={{ opacity: isOpen ? 0 : 1, rotate: isOpen ? -90 : 0 }}
                transition={{ duration: ICON_SWAP, ease: SEAMLESS }}
                aria-hidden="true"
              >
                <Menu size={24} className={headerSolid ? "text-coffee-dark" : "text-beige-light"} />
              </motion.span>
              <motion.span
                className="absolute inset-0 flex items-center justify-center"
                animate={{ opacity: isOpen ? 1 : 0, rotate: isOpen ? 0 : 90 }}
                transition={{ duration: ICON_SWAP, ease: SEAMLESS }}
                aria-hidden="true"
              >
                <X size={24} className={headerSolid ? "text-coffee-dark" : "text-beige-light"} />
              </motion.span>
            </span>
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu-panel"
            // Full-height curtain: starts entirely above its slot (behind the
            // header), glides down to cover the viewport, and retracts back up
            // the exact same way when the X is pressed.
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%", transition: { duration: PANEL_OUT, ease: PANEL_EASE } }}
            transition={{ duration: PANEL_IN, ease: PANEL_EASE }}
            className="md:hidden fixed inset-0 top-20 bg-beige-light z-40 overflow-y-auto overscroll-contain"
          >
            <nav
              className="flex flex-col items-center justify-center min-h-full gap-8 py-10"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12, transition: { duration: ITEM_OUT, ease: ITEM_EASE } }}
                  transition={{
                    duration: ITEM_IN,
                    delay: ITEM_DELAY + index * ITEM_STAGGER,
                    ease: ITEM_EASE,
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={handleNavClick(link.href)}
                    className="text-2xl tracking-[0.15em] uppercase text-coffee-dark hover:text-coffee-accent transition-colors font-heading font-bold touch-manipulation"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12, transition: { duration: ITEM_OUT, ease: ITEM_EASE } }}
                transition={{
                  duration: ITEM_IN,
                  delay: ITEM_DELAY + navLinks.length * ITEM_STAGGER,
                  ease: ITEM_EASE,
                }}
              >
                <Link
                  href="/contact"
                  onClick={handleNavClick("/contact")}
                  className="mt-4 inline-flex items-center gap-2 bg-coffee-dark text-beige-light px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-semibold touch-manipulation"
                >
                  Book Consultation
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
