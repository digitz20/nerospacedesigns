"use client";

import SectionHeading from "@/components/SectionHeading";
import ProcessTimeline from "@/components/ProcessTimeline";

export default function ProcessPage() {
  return (
    <div>
      <section className="pt-32 md:pt-40 pb-16 md:pb-24 bg-beige-light">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <SectionHeading
            eyebrow="How We Work"
            title="Our Process"
            subtitle="A structured approach to creating spaces that inspire and endure."
            center
          />
        </div>
      </section>

      <section className="pb-24 md:pb-32 bg-beige-light">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <ProcessTimeline steps={[
            {
              id: "01",
              title: "DISCOVER",
              description: "We listen, observe, and ask the right questions. This phase is about understanding your needs, your lifestyle, and the unique character of your space.",
            },
            {
              id: "02",
              title: "DEFINE",
              description: "Ideas take shape. We establish the design direction, material palette, and spatial strategy that will guide the project forward.",
            },
            {
              id: "03",
              title: "DESIGN",
              description: "Concepts become detailed plans. From floor layouts to furniture specifications, every element is carefully considered and documented.",
            },
            {
              id: "04",
              title: "DELIVER",
              description: "The vision becomes reality. We oversee the execution, ensuring every detail is implemented to the highest standard.",
            },
          ]} />
        </div>
      </section>

      <section className="py-24 md:py-32 bg-beige-warm">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="/images/process.jpg"
                alt="Design process"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-heading text-4xl md:text-5xl text-coffee-dark leading-[1.1] mb-6 font-bold uppercase">
                A Collaborative Journey
              </h2>
              <p className="text-sm md:text-base text-coffee-dark/70 leading-relaxed mb-6 font-heading">
                Our process is designed to be transparent and collaborative. We keep you informed at every stage, ensuring that the final result exceeds your expectations.
              </p>
              <p className="text-sm md:text-base text-coffee-dark/70 leading-relaxed font-heading">
                From the initial consultation to the final reveal, we are with you every step of the way, turning your vision into a space that feels truly like home.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
