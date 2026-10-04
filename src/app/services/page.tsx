"use client";

import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import { motion } from "framer-motion";
import { servicesHeading } from "@/lib/data";

export default function ServicesPage() {
  return (
    <div>
      <section className="pt-32 md:pt-40 pb-16 md:pb-24 bg-beige-light">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <SectionHeading
            eyebrow={servicesHeading.eyebrow}
            title={servicesHeading.title}
            subtitle={servicesHeading.subtitle}
            center
          />
        </div>
      </section>

      <section className="pb-24 md:pb-32 bg-beige-light">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="space-y-6 md:space-y-8">
            {[
              {
                id: "01",
                title: "CONSULTATION & SITE ASSESSMENT",
                description: "We begin with a thorough understanding of your space, lifestyle, and aspirations. Our initial consultation establishes the foundation for a design that is both functional and deeply personal.",
              },
              {
                id: "02",
                title: "INTERIOR DESIGN & SPACE PLANNING",
                description: "Through spatial analysis and thoughtful layouts, we craft environments that flow naturally. Every room is considered as part of a cohesive whole, balancing aesthetics with everyday usability.",
              },
              {
                id: "03",
                title: "3D DESIGN & VISUALIZATION",
                description: "Before a single wall is moved, you will see your space come to life. Our photorealistic visualizations ensure complete clarity and confidence in the design direction.",
              },
              {
                id: "04",
                title: "TECHNICAL DRAWINGS",
                description: "Precision in execution is non-negotiable. We produce detailed technical documentation that guides contractors and craftspeople to realize the design exactly as intended.",
              },
              {
                id: "05",
                title: "FURNITURE & CUSTOM DESIGN",
                description: "From curated pieces to fully bespoke furniture, we source and design elements that are unique to your space. Each item is selected or created to enhance the overall narrative of the home.",
              },
            ].map((service, index) => (
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

      <section className="py-24 md:py-32 bg-beige-warm">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
            <div>
              <h2 className="font-heading text-4xl md:text-5xl text-coffee-dark leading-[1.1] mb-6 font-bold uppercase">
                Bespoke By Nature
              </h2>
              <p className="text-sm md:text-base text-coffee-dark/70 leading-relaxed mb-6 font-heading">
                Every project is unique. We tailor our services to meet your specific needs, whether you are designing a single room or an entire home.
              </p>
              <p className="text-sm md:text-base text-coffee-dark/70 leading-relaxed font-heading">
                Our collaborative approach ensures that your vision is at the heart of every decision, resulting in spaces that are truly yours.
              </p>
            </div>
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/images/services-hero.jpg"
                alt="Interior design services"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
