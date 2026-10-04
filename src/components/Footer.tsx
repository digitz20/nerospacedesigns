"use client";

import { siteConfig } from "@/lib/data";
import Link from "next/link";
import { Camera, Pin, MessageCircle, Phone, MapPin, Mail } from "lucide-react";

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

export default function Footer() {
  const socialLinks = [
    { href: siteConfig.social.instagram, label: "Instagram", icon: Camera },
    { href: siteConfig.social.pinterest, label: "Pinterest", icon: Pin },
    { href: siteConfig.social.whatsapp, label: "WhatsApp", icon: MessageCircle },
    { href: siteConfig.social.tiktok, label: "TikTok", icon: TikTokIcon },
    { href: siteConfig.social.twitter, label: "X", icon: XIcon },
    { href: siteConfig.social.facebook, label: "Facebook", icon: FacebookIcon },
  ].filter((link) => link.href);

  return (
    <footer className="bg-coffee-deep py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-16">
          <div>
            <Link
              href="/"
              className="font-heading text-3xl md:text-4xl text-beige-light tracking-wide font-bold uppercase"
            >
              {siteConfig.name}
            </Link>
            <p className="text-sm text-beige-light/60 mt-4 max-w-xs leading-relaxed font-heading">
              Interior architecture, spatial planning and bespoke design for considered living.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-beige-medium mb-6 font-semibold">
              Navigation
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { href: "/about", label: "About" },
                { href: "/services", label: "Services" },
                { href: "/projects", label: "Projects" },
                { href: "/process", label: "Process" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-beige-light/70 hover:text-beige-medium transition-colors font-heading"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-beige-medium mb-6 font-semibold">
              Contact
            </h4>
            <div className="space-y-4">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 group"
              >
                <div className="w-8 h-8 rounded-full bg-beige-medium/20 text-beige-medium flex items-center justify-center group-hover:bg-coffee-accent group-hover:text-beige-light transition-colors">
                  <Mail size={16} />
                </div>
                <span className="text-sm text-beige-light/70 group-hover:text-beige-light transition-colors font-heading">
                  {siteConfig.email}
                </span>
              </a>
              <a
                href={siteConfig.social.whatsapp}
                className="flex items-center gap-3 group"
              >
                <div className="w-8 h-8 rounded-full bg-beige-medium/20 text-beige-medium flex items-center justify-center group-hover:bg-coffee-accent group-hover:text-beige-light transition-colors">
                  <Phone size={16} />
                </div>
                <span className="text-sm text-beige-light/70 group-hover:text-beige-light transition-colors font-heading">
                  {siteConfig.phone}
                </span>
              </a>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.location)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="w-8 h-8 rounded-full bg-beige-medium/20 text-beige-medium flex items-center justify-center group-hover:bg-coffee-accent group-hover:text-beige-light transition-colors">
                  <MapPin size={16} />
                </div>
                <span className="text-sm text-beige-light/70 group-hover:text-beige-light transition-colors font-heading">
                  {siteConfig.location}
                </span>
              </a>
            </div>
            <div className="flex items-center gap-4 mt-8">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-10 h-10 rounded-full bg-beige-medium/20 text-beige-medium flex items-center justify-center hover:bg-coffee-accent hover:text-beige-light transition-colors"
                >
                  {link.icon ? <link.icon size={18} /> : link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-beige-light/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-beige-light/40 font-heading">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-beige-light/40 font-heading">
            Designed with intention.
          </p>
        </div>
      </div>
    </footer>
  );
}
