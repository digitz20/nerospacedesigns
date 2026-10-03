"use client";

import { siteConfig } from "@/lib/data";
import Link from "next/link";
import { Camera, Pin, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary-dark py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-16">
          <div>
            <Link
              href="/"
              className="font-heading text-3xl md:text-4xl text-primary-cream tracking-wide"
            >
              {siteConfig.name}
            </Link>
            <p className="text-sm text-primary-cream/60 mt-4 max-w-xs leading-relaxed">
              Interior architecture, spatial planning and bespoke design for
              considered living.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-warm-beige mb-6">
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
                  className="text-sm text-primary-cream/70 hover:text-warm-beige transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-warm-beige mb-6">
              Contact
            </h4>
            <div className="space-y-3">
              <p className="text-sm text-primary-cream/70">
                {siteConfig.email}
              </p>
              <p className="text-sm text-primary-cream/70">
                {siteConfig.location}
              </p>
            </div>
            <div className="flex items-center gap-6 mt-6">
              <Link
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-primary-cream/60 hover:text-warm-beige transition-colors"
              >
                <Camera size={18} />
              </Link>
              <Link
                href={siteConfig.social.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="text-primary-cream/60 hover:text-warm-beige transition-colors"
              >
                <Pin size={18} />
              </Link>
              <Link
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-primary-cream/60 hover:text-warm-beige transition-colors"
              >
                <MessageCircle size={18} />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-cream/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-cream/40">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <p className="text-xs text-primary-cream/40">
            Designed with intention.
          </p>
        </div>
      </div>
    </footer>
  );
}
