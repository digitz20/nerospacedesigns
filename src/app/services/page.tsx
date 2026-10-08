"use client";

import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import { motion } from "framer-motion";
import { servicesHeading, services } from "@/lib/data";

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
                src="blob:https://www.pinterest.com/66ec68f6-e26c-4154-854a-af46975e2fe1"
                alt="Bespoke interior design"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
