"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data";
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    location: "",
    budget: "",
    timeline: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your inquiry. We will get back to you shortly.");
    setFormData({ name: "", email: "", phone: "", projectType: "", location: "", budget: "", timeline: "", message: "" });
  };

  return (
    <section className="py-24 md:py-32 bg-beige-light">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-coffee-accent mb-4 font-semibold">
              Send Enquiry
            </p>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-coffee-dark leading-[1.1] mb-6 md:mb-8 font-bold uppercase">
              Tell Us About Your Project
            </h2>
            <p className="text-sm md:text-base text-coffee-dark/70 leading-relaxed mb-12 font-heading">
              Whether you&apos;re planning a new interior, refreshing an existing space, or developing a completely bespoke environment, we&apos;d love to hear about it.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail size={18} className="text-coffee-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-coffee-muted tracking-wide uppercase mb-1 font-semibold">
                    Email
                  </p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-sm text-coffee-dark hover:text-coffee-accent transition-colors font-heading"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone size={18} className="text-coffee-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-coffee-muted tracking-wide uppercase mb-1 font-semibold">
                    WhatsApp
                  </p>
                  <a
                    href={siteConfig.social.whatsapp}
                    className="text-sm text-coffee-dark hover:text-coffee-accent transition-colors font-heading"
                  >
                    {siteConfig.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin size={18} className="text-coffee-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-coffee-muted tracking-wide uppercase mb-1 font-semibold">
                    Location
                  </p>
                  <p className="text-sm text-coffee-dark font-heading">{siteConfig.location}</p>
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
                  className="block text-xs text-coffee-muted tracking-wide uppercase mb-2 font-semibold"
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
                  className="w-full bg-transparent border-b border-coffee-accent/30 py-3 text-sm text-coffee-dark focus:outline-none focus:border-coffee-accent transition-colors font-heading"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs text-coffee-muted tracking-wide uppercase mb-2 font-semibold"
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
                  className="w-full bg-transparent border-b border-coffee-accent/30 py-3 text-sm text-coffee-dark focus:outline-none focus:border-coffee-accent transition-colors font-heading"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs text-coffee-muted tracking-wide uppercase mb-2 font-semibold"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-coffee-accent/30 py-3 text-sm text-coffee-dark focus:outline-none focus:border-coffee-accent transition-colors font-heading"
                />
              </div>

              <div>
                <label
                  htmlFor="projectType"
                  className="block text-xs text-coffee-muted tracking-wide uppercase mb-2 font-semibold"
                >
                  Project Type
                </label>
                <input
                  type="text"
                  id="projectType"
                  value={formData.projectType}
                  onChange={(e) =>
                    setFormData({ ...formData, projectType: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-coffee-accent/30 py-3 text-sm text-coffee-dark focus:outline-none focus:border-coffee-accent transition-colors font-heading"
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-xs text-coffee-muted tracking-wide uppercase mb-2 font-semibold"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-coffee-accent/30 py-3 text-sm text-coffee-dark focus:outline-none focus:border-coffee-accent transition-colors font-heading"
                />
              </div>

              <div>
                <label
                  htmlFor="budget"
                  className="block text-xs text-coffee-muted tracking-wide uppercase mb-2 font-semibold"
                >
                  Estimated Budget
                </label>
                <input
                  type="text"
                  id="budget"
                  value={formData.budget}
                  onChange={(e) =>
                    setFormData({ ...formData, budget: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-coffee-accent/30 py-3 text-sm text-coffee-dark focus:outline-none focus:border-coffee-accent transition-colors font-heading"
                />
              </div>

              <div>
                <label
                  htmlFor="timeline"
                  className="block text-xs text-coffee-muted tracking-wide uppercase mb-2 font-semibold"
                >
                  Project Timeline
                </label>
                <input
                  type="text"
                  id="timeline"
                  value={formData.timeline}
                  onChange={(e) =>
                    setFormData({ ...formData, timeline: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-coffee-accent/30 py-3 text-sm text-coffee-dark focus:outline-none focus:border-coffee-accent transition-colors font-heading"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs text-coffee-muted tracking-wide uppercase mb-2 font-semibold"
                >
                  Tell us about your project
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-coffee-accent/30 py-3 text-sm text-coffee-dark focus:outline-none focus:border-coffee-accent transition-colors resize-none font-heading"
                />
              </div>

              <button
                type="submit"
                className="group inline-flex items-center gap-3 bg-coffee-dark text-beige-light px-10 py-4 text-[11px] tracking-[0.2em] uppercase transition-all duration-300 hover:bg-coffee-accent font-semibold"
              >
                Send Project Enquiry
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
