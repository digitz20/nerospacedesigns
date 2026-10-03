import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/lib/data";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div>
      <section className="pt-32 md:pt-40 pb-16 md:pb-24 bg-beige-light">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-3xl">
            <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-coffee-accent mb-4 font-semibold">
              Get In Touch
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-coffee-dark leading-[1.1] mb-6 font-bold uppercase">
              Start A Project
            </h1>
            <p className="text-sm md:text-base text-coffee-dark/70 leading-relaxed font-heading">
              Whether you&apos;re planning a new interior, refreshing an existing space, or developing a completely bespoke environment, we&apos;d love to hear about it.
            </p>
          </div>
        </div>
      </section>

      <ContactForm />

      <section className="py-16 md:py-24 bg-beige-warm">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                label: "Email",
                value: siteConfig.email,
                href: `mailto:${siteConfig.email}`,
                icon: Mail,
              },
              {
                label: "Phone",
                value: siteConfig.phone,
                href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
                icon: Phone,
              },
              {
                label: "Location",
                value: siteConfig.location,
                href: "#",
                icon: MapPin,
              },
            ].map((item, i) => (
              <div key={i}>
                <p className="text-[10px] tracking-[0.2em] uppercase text-coffee-muted mb-3 font-semibold">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-lg font-heading text-coffee-dark hover:text-coffee-accent transition-colors font-semibold"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-lg font-heading text-coffee-dark font-semibold">
                    {item.value}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
