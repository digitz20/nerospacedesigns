import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/lib/data";

export default function ServicesPage() {
  return (
    <div>
      <section className="pt-32 md:pt-40 pb-16 md:pb-24 bg-primary-cream">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <SectionHeading
            eyebrow="What We Do"
            title="Our Services"
            subtitle="From concept to completion, we offer a comprehensive suite of design services tailored to your unique vision."
            center
          />
        </div>
      </section>

      <section className="pb-24 md:pb-32 bg-primary-cream">
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

      <section className="py-24 md:py-32 bg-secondary-cream">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
            <div>
              <h2 className="font-heading text-4xl md:text-5xl text-primary-dark leading-[1.1] mb-6">
                Bespoke By Nature
              </h2>
              <p className="text-sm md:text-base text-primary-dark/70 leading-relaxed mb-6">
                Every project is unique. We tailor our services to meet your
                specific needs, whether you are designing a single room or an
                entire home.
              </p>
              <p className="text-sm md:text-base text-primary-dark/70 leading-relaxed">
                Our collaborative approach ensures that your vision is at the
                heart of every decision, resulting in spaces that are truly
                yours.
              </p>
            </div>
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80"
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
