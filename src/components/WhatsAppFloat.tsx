"use client";

import { siteConfig } from "@/lib/data";
import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  const phone = siteConfig.phone.replace(/\s/g, "");
  const message = encodeURIComponent("Hello, I'm interested in your interior design services.");
  const href = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-coffee-dark text-beige-light shadow-lg hover:scale-110 transition-transform duration-300"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}
