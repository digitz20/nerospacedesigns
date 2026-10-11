"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { siteConfig, navLinks } from "@/lib/data";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { lockBodyScroll } from "@/lib/useLockBodyScroll";

const SEAMLESS = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

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
            className="md:hidden p-2 -mr-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X size={24} className={headerSolid ? "text-coffee-dark" : "text-beige-light"} />
            ) : (
              <Menu size={24} className={headerSolid ? "text-coffee-dark" : "text-beige-light"} />
            )}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.22, ease: SEAMLESS } }}
            transition={{ duration: 0.4, ease: SEAMLESS }}
            className="md:hidden fixed inset-0 top-20 bg-beige-light z-40 overflow-y-auto"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.45, delay: 0.05 + index * 0.05, ease: SEAMLESS }}
                >
                  <Link
                    href={link.href}
                    className="text-2xl tracking-[0.15em] uppercase text-coffee-dark hover:text-coffee-accent transition-colors font-heading font-bold"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{
                  duration: 0.45,
                  delay: 0.05 + navLinks.length * 0.05,
                  ease: SEAMLESS,
                }}
              >
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center gap-2 bg-coffee-dark text-beige-light px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-semibold"
                  onClick={() => setIsOpen(false)}
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
