"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/lib/data";
import { Mail, Phone, MapPin, Ruler, Sofa, Box, Hammer, Paintbrush, ShoppingCart, ClipboardList, PenTool, Home, ExternalLink, FolderOpen, Wrench } from "lucide-react";

interface Project {
  id: string;
  slug: string;
  title: string;
  location: string;
  category: string;
  year: string;
  description: string;
  images: string[];
  videos: string[];
  aspectRatio: string;
  secondaryImage?: string;
}

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
}

const services = [
  {
    title: "Consultation and site assessment",
    description: "We visit, measure and listen, then agree a clear brief and budget.",
    icon: Ruler,
  },
  {
    title: "Interior design and space planning",
    description: "Layouts that make every room work harder and feel larger.",
    icon: Sofa,
  },
  {
    title: "3D visualization",
    description: "See your finished room in realistic renders before anything is built.",
    icon: Box,
  },
  {
    title: "Technical drawings",
    description: "Precise plans and details your contractors can build from.",
    icon: ClipboardList,
  },
  {
    title: "Custom furniture",
    description: "Beds, wardrobes, kitchens and shelving made to fit your space.",
    icon: Hammer,
  },
  {
    title: "Sourcing and procurement",
    description: "Materials, lighting and furnishings bought from trusted suppliers.",
    icon: ShoppingCart,
  },
  {
    title: "Project management",
    description: "We coordinate trades, timelines and quality so you don't have to.",
    icon: PenTool,
  },
  {
    title: "Styling and finishing",
    description: "Art, textiles and accessories that bring the room together.",
    icon: Paintbrush,
  },
  {
    title: "Renovations",
    description: "Full remodels of kitchens, living areas, bathrooms and more.",
    icon: Home,
  },
];

const processSteps = [
  {
    title: "Consult",
    description: "We visit your space and agree the brief.",
  },
  {
    title: "Design",
    description: "Layouts, materials and a 3D preview.",
  },
  {
    title: "Draw",
    description: "Technical drawings and a costed plan.",
  },
  {
    title: "Build",
    description: "Furniture made, trades managed, items sourced.",
  },
  {
    title: "Style",
    description: "Final touches, then handover.",
  },
];

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch("/api/projects?page=1")
      .then((res) => res.json())
      .then((data) => {
        if (data.projects) {
          setProjects(data.projects.slice(0, 4));
        }
      })
      .catch(() => {});

    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        if (data.testimonials && data.testimonials.length > 0) {
          setTestimonials(data.testimonials);
        }
      })
      .catch(() => {});

    const INACTIVITY_LIMIT = 15 * 60 * 1000;
    let lastActivity = Date.now();
    let inactivityTimer: ReturnType<typeof setTimeout> | null = null;
    let pollTimer: ReturnType<typeof setInterval> | null = null;

    const refreshIfNeeded = () => {
      const now = Date.now();
      if (now - lastActivity >= INACTIVITY_LIMIT) {
        window.location.reload();
      }
    };

    const resetInactivity = () => {
      lastActivity = Date.now();
    };

    const events = ["mousedown", "mousemove", "keydown", "scroll", "touchstart", "click"];
    events.forEach((event) => window.addEventListener(event, resetInactivity));

    pollTimer = setInterval(() => {
      refreshIfNeeded();
    }, 60000);

    const handleContentUpdate = () => {
      lastActivity = Date.now();
      refreshProjects();
      refreshTestimonials();
    };

    window.addEventListener("content-updated", handleContentUpdate);

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetInactivity));
      window.removeEventListener("content-updated", handleContentUpdate);
      if (pollTimer) clearInterval(pollTimer);
      if (inactivityTimer) clearTimeout(inactivityTimer);
    };
  }, []);

  const refreshProjects = () => {
    fetch("/api/projects?page=1")
      .then((res) => res.json())
      .then((data) => {
        if (data.projects) {
          setProjects(data.projects.slice(0, 4));
        }
      })
      .catch(() => {});
  };

  const refreshTestimonials = () => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        if (data.testimonials && data.testimonials.length > 0) {
          setTestimonials(data.testimonials);
        }
      })
      .catch(() => {});
  };

  return (
    <div>
      <Hero />

      <section className="py-24 md:py-32 bg-beige-light">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-3xl">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-coffee-dark leading-[1.1] mb-6 font-bold uppercase">
              Rooms that feel like you.
            </h2>
            <p className="text-base md:text-lg text-coffee-dark/70 leading-relaxed font-heading mb-8">
              Nerospacedesigns is an interior design studio in Abuja. We plan, design and build calm, warm spaces for homes and offices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-coffee-accent text-beige-light px-8 py-4 text-[11px] tracking-[0.2em] uppercase transition-all duration-300 hover:bg-beige-warm hover:text-coffee-dark font-semibold"
              >
                Book a consultation
              </a>
              <a
                href="/projects"
                className="inline-flex items-center justify-center gap-2 border-2 border-coffee-dark text-coffee-dark px-8 py-4 text-[11px] tracking-[0.2em] uppercase transition-all duration-300 hover:bg-coffee-dark hover:text-beige-light font-semibold"
              >
                See our work
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-beige-warm">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-coffee-dark leading-[1.1] mb-6 font-bold uppercase">
              A studio built around how you live.
            </h2>
            <p className="text-base md:text-lg text-coffee-dark/70 leading-relaxed font-heading mb-8">
              Nerospacedesigns is an interior design studio that shapes spaces with warmth, restraint, and intention. We pair considered layouts with refined materials and quiet detail, creating interiors that feel calm, personal, and effortlessly lived-in.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-coffee-accent hover:text-coffee-dark transition-colors font-semibold"
            >
              Talk to the studio
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-beige-light border-y border-coffee-dark/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              {
                label: "Location",
                icon: MapPin,
                value:
                  "Abuja. We serve clients across the city and nearby areas, with site visits and consultations available on request.",
              },
              {
                label: "Projects",
                icon: FolderOpen,
                value:
                  "Residential and commercial spaces. From homes and bathrooms to offices, cafes, and shops, we design spaces that feel considered, comfortable, and true to the people who use them.",
              },
              {
                label: "Service",
                icon: ClipboardList,
                value:
                  "Concept to handover. We guide you through every step: consultation and site assessment, space planning, 3D visualization, technical drawings, sourcing and procurement, project management, and final styling.",
              },
              {
                label: "Workshop",
                icon: Wrench,
                value:
                  "Custom furniture and curated sourcing. We bring together foreign and locally made products, so you get pieces that suit your taste, budget, and space, whether made to measure or selected from trusted suppliers.",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-coffee-dark text-beige-light flex items-center justify-center flex-shrink-0 mt-0.5">
                  <item.icon size={16} />
                </div>
                <div>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-coffee-dark mb-2 font-extrabold">
                    {item.label}
                  </p>
                  <p className="text-sm md:text-base text-coffee-dark/80 font-heading font-semibold leading-relaxed">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-beige-warm">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <SectionHeading
            eyebrow="What we do"
            title="Hire us for one service or let us run the whole project."
            subtitle=""
            center
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-16">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group p-6 border border-coffee-dark/10 hover:border-coffee-dark/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-coffee-dark text-beige-light flex items-center justify-center mb-4 group-hover:bg-coffee-accent transition-colors">
                  <service.icon size={18} />
                </div>
                <h3 className="font-heading text-lg text-coffee-dark mb-2 font-bold uppercase tracking-wide">
                  {service.title}
                </h3>
                <p className="text-sm text-coffee-dark/70 leading-relaxed font-heading">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-beige-light">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <SectionHeading
            eyebrow="How a project runs"
            title="Start your project."
            subtitle="Tell us about your space. We reply within two working days."
            center
          />

          <div className="grid md:grid-cols-5 gap-8 md:gap-12 mt-12 md:mt-16">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-coffee-dark text-beige-light flex items-center justify-center mx-auto mb-4 font-heading text-lg font-bold">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-heading text-lg text-coffee-dark mb-2 font-bold uppercase tracking-wide">
                  {step.title}
                </h3>
                <p className="text-sm text-coffee-dark/70 leading-relaxed font-heading">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-beige-warm">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
            <div>
              <SectionHeading
                eyebrow="Contact"
                title="Talk to the studio"
                subtitle=""
              />

              <div className="space-y-6 mt-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-coffee-dark text-beige-light flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-coffee-muted mb-1 font-semibold">
                      Visit
                    </p>
                    <p className="text-sm text-coffee-dark font-heading font-semibold">
                      The carpenter, 6th Ave, Gwarinpa,<br />
                      Abuja, Federal Capital Territory
                    </p>
                  </div>
                </div>

                <a href={siteConfig.social.whatsapp} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-coffee-dark text-beige-light flex items-center justify-center flex-shrink-0 group-hover:bg-coffee-accent transition-colors">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-coffee-muted mb-1 font-semibold">
                      WhatsApp
                    </p>
                    <p className="text-sm text-coffee-dark font-heading font-semibold group-hover:text-coffee-accent transition-colors">
                      {siteConfig.phone}
                    </p>
                  </div>
                </a>

                <a href={`mailto:${siteConfig.email}`} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-coffee-dark text-beige-light flex items-center justify-center flex-shrink-0 group-hover:bg-coffee-accent transition-colors">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-coffee-muted mb-1 font-semibold">
                      Email
                    </p>
                    <p className="text-sm text-coffee-dark font-heading font-semibold group-hover:text-coffee-accent transition-colors">
                      {siteConfig.email}
                    </p>
                  </div>
                </a>

                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-full bg-coffee-dark text-beige-light flex items-center justify-center flex-shrink-0 group-hover:bg-coffee-accent transition-colors">
                    <ExternalLink size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-coffee-muted mb-1 font-semibold">
                      Instagram
                    </p>
                    <p className="text-sm text-coffee-dark font-heading font-semibold group-hover:text-coffee-accent transition-colors">
                      @nerospacedesigns
                    </p>
                  </div>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-heading text-2xl text-coffee-dark mb-6 font-bold uppercase">
                Send enquiry
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {projects.length > 0 && (
        <section className="py-24 md:py-32 bg-beige-light">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
            <SectionHeading
              eyebrow="Selected Work"
              title="Our Projects"
              subtitle="A curated selection of residential and commercial spaces that reflect our commitment to considered design."
              center
            />

            <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  location={project.location}
                  category={project.category}
                  year={project.year}
                  image={project.images[0]}
                  videos={project.videos}
                  aspectRatio={project.aspectRatio}
                  slug={project.slug}
                  index={index}
                  secondaryImage={project.secondaryImage}
                />
              ))}
            </div>

            <div className="text-center mt-12 md:mt-16">
              <a
                href="/projects"
                className="group inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-coffee-accent hover:text-coffee-dark transition-colors font-semibold"
              >
                View all projects
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </section>
      )}

      {testimonials.length > 0 && (
        <section className="py-24 md:py-32 bg-beige-warm">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
            <SectionHeading
              eyebrow="Testimonials"
              title="What our clients say"
              subtitle=""
              center
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {testimonials.slice(0, 3).map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 border border-coffee-dark/10 hover:border-coffee-dark/30 transition-colors"
                >
                  <p className="text-sm text-coffee-dark leading-relaxed font-heading mb-4">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="w-8 h-[1px] bg-coffee-accent/50 mb-3" />
                  <p className="text-xs text-coffee-dark font-semibold font-heading">{t.author}</p>
                  {t.role && (
                    <p className="text-xs text-coffee-muted font-heading">{t.role}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
