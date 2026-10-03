"use client";

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data";
import { Mail, MapPin, ArrowRight } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your inquiry. We will get back to you shortly.");
    setFormData({ name: "", email: "", project: "", message: "" });
  };

  return (
    <section className="py-24 md:py-32 bg-primary-cream">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-earthen-brown mb-4">
              Get In Touch
            </p>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary-dark leading-[1.1] mb-6 md:mb-8">
              Let&apos;s Discuss Your Project
            </h2>
            <p className="text-sm md:text-base text-primary-dark/70 leading-relaxed mb-12">
              We would love to hear about your space. Reach out and we will
              arrange a consultation at your convenience.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail size={18} className="text-earthen-brown mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-taupe tracking-wide uppercase mb-1">
                    Email
                  </p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-sm text-primary-dark hover:text-earthen-brown transition-colors"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin size={18} className="text-earthen-brown mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-taupe tracking-wide uppercase mb-1">
                    Location
                  </p>
                  <p className="text-sm text-primary-dark">{siteConfig.location}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs text-muted-taupe tracking-wide uppercase mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-earthen-brown/30 py-3 text-sm text-primary-dark focus:outline-none focus:border-earthen-brown transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs text-muted-taupe tracking-wide uppercase mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-earthen-brown/30 py-3 text-sm text-primary-dark focus:outline-none focus:border-earthen-brown transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="project"
                  className="block text-xs text-muted-taupe tracking-wide uppercase mb-2"
                >
                  Project Type
                </label>
                <input
                  type="text"
                  id="project"
                  value={formData.project}
                  onChange={(e) =>
                    setFormData({ ...formData, project: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-earthen-brown/30 py-3 text-sm text-primary-dark focus:outline-none focus:border-earthen-brown transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs text-muted-taupe tracking-wide uppercase mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-earthen-brown/30 py-3 text-sm text-primary-dark focus:outline-none focus:border-earthen-brown transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="group inline-flex items-center gap-3 bg-earthen-brown text-primary-cream px-10 py-4 text-[11px] tracking-[0.2em] uppercase transition-all duration-300 hover:bg-muted-taupe"
              >
                Send Message
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
