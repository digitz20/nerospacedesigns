"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig, navLinks } from "@/lib/data";
import { Menu, X, Camera, Pin, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 12a4 4 0 1 0 4 4V2" />
      <path d="M15 12a4 4 0 0 1-4 4V8" />
    </svg>
  );
}

function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4l6.5 8L4 20h2l5.5-7 4.5 7H20l-7-8.5L20 4h-2l-5.5 7L8 4H4z" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const socialLinks = [
  { href: siteConfig.social.instagram, label: "Instagram", icon: Camera },
  { href: siteConfig.social.pinterest, label: "Pinterest", icon: Pin },
  { href: siteConfig.social.whatsapp, label: "WhatsApp", icon: MessageCircle },
  { href: siteConfig.social.tiktok, label: "TikTok", icon: TikTokIcon },
  { href: siteConfig.social.twitter, label: "X", icon: XIcon },
  { href: siteConfig.social.facebook, label: "Facebook", icon: FacebookIcon },
].filter((link) => link.href);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-beige-light/95 backdrop-blur-sm shadow-sm"
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
              isScrolled ? "text-coffee-dark" : "text-beige-light"
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
                  isScrolled ? "text-coffee-dark/80" : "text-beige-light/90"
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-coffee-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className={`text-xs font-semibold uppercase tracking-wide transition-colors duration-300 ${
                  isScrolled ? "text-coffee-dark/70 hover:text-coffee-accent" : "text-beige-light/80 hover:text-beige-medium"
                }`}
              >
                {link.icon ? <link.icon size={18} /> : <TikTokIcon />}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link
              href="/contact"
              className={`inline-flex items-center gap-2 px-6 py-3 text-[11px] tracking-[0.2em] uppercase transition-all duration-300 font-semibold ${
                isScrolled
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
              <X size={24} className={isScrolled ? "text-coffee-dark" : "text-beige-light"} />
            ) : (
              <Menu size={24} className={isScrolled ? "text-coffee-dark" : "text-beige-light"} />
            )}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 top-20 bg-beige-light z-40"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
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
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-2 bg-coffee-dark text-beige-light px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-semibold"
                onClick={() => setIsOpen(false)}
              >
                Book Consultation
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
