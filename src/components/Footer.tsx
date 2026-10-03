"use client";

import { siteConfig } from "@/lib/data";
import Link from "next/link";
import { Camera, Pin, MessageCircle, Phone, MapPin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-coffee-deep py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-16">
          <div>
            <Link
              href="/"
              className="font-heading text-3xl md:text-4xl text-beige-light tracking-wide font-bold"
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
              <div className="flex items-start gap-3">
                <Mail size={16} className="text-beige-medium mt-0.5 flex-shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="text-sm text-beige-light/70 hover:text-beige-medium transition-colors font-heading">
                  {siteConfig.email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={16} className="text-beige-medium mt-0.5 flex-shrink-0" />
                <a href={`tel:${siteConfig.phone}`} className="text-sm text-beige-light/70 hover:text-beige-medium transition-colors font-heading">
                  {siteConfig.phone}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-beige-medium mt-0.5 flex-shrink-0" />
                <p className="text-sm text-beige-light/70 font-heading">
                  {siteConfig.location}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 mt-6">
              <Link
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-beige-light/60 hover:text-beige-medium transition-colors"
              >
                <Camera size={18} />
              </Link>
              <Link
                href={siteConfig.social.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="text-beige-light/60 hover:text-beige-medium transition-colors"
              >
                <Pin size={18} />
              </Link>
              <Link
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-beige-light/60 hover:text-beige-medium transition-colors"
              >
                <MessageCircle size={18} />
              </Link>
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
