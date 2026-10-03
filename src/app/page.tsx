"use client";

import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import ServiceCard from "@/components/ServiceCard";
import ProjectGallery from "@/components/ProjectGallery";
import AboutSection from "@/components/AboutSection";
import ProcessTimeline from "@/components/ProcessTimeline";
import Testimonial from "@/components/Testimonial";
import CTASection from "@/components/CTASection";
import { projects, services, processSteps, testimonials } from "@/lib/data";

export default function Home() {
  return (
    <div>
      <Hero />

      <section className="py-24 md:py-32 bg-primary-cream">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <SectionHeading
            eyebrow="Selected Work"
            title="Our Projects"
            subtitle="A curated selection of residential and commercial spaces that reflect our commitment to considered design."
            center
          />

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            {projects.slice(0, 4).map((project, index) => (
              <ProjectCard
                key={project.slug}
                title={project.title}
                location={project.location}
                category={project.category}
                year={project.year}
                image={project.images[0]}
                aspectRatio={project.aspectRatio}
                slug={project.slug}
                index={index}
              />
            ))}
          </div>

          <div className="text-center mt-12 md:mt-16">
            <a
              href="/projects"
              className="group inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-earthen-brown hover:text-muted-taupe transition-colors"
            >
              View All Projects
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-secondary-cream">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <SectionHeading
            eyebrow="What We Do"
            title="Our Services"
            subtitle="From concept to completion, we offer a comprehensive suite of design services tailored to your unique vision."
            center
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                description={service.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-secondary-dark">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <SectionHeading
            eyebrow="Design Philosophy"
            title="Principles We Live By"
            subtitle=""
            center
          />

          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            {[
              {
                id: "01",
                title: "FUNCTION",
                description:
                  "Every element has a purpose. We believe that beautiful design must first and foremost serve the way you live.",
              },
              {
                id: "02",
                title: "MATERIALITY",
                description:
                  "Materials create atmosphere, texture and character. We select each material with intention and care.",
              },
              {
                id: "03",
                title: "TIMELESSNESS",
                description:
                  "Design should remain relevant beyond trends. We create spaces that will be loved for generations.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="text-center md:text-left"
              >
                <div className="w-12 h-12 rounded-full bg-earthen-brown flex items-center justify-center mx-auto md:mx-0 mb-6">
                  <span className="font-heading text-xl text-primary-cream">
                    {item.id}
                  </span>
                </div>
                <h3 className="font-heading text-2xl text-primary-cream mb-4">
                  {item.title}
                </h3>
                <p className="text-sm text-primary-cream/70 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ProjectGallery />

      <section className="py-24 md:py-32 bg-primary-cream">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <ProcessTimeline steps={processSteps} />
        </div>
      </section>

      <AboutSection />

      <Testimonial
        quote={testimonials[0].quote}
        author={testimonials[0].author}
        role={testimonials[0].role}
      />

      <CTASection />
    </div>
  );
}
