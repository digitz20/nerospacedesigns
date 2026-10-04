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
                label: "WhatsApp",
                value: siteConfig.phone,
                href: siteConfig.social.whatsapp,
                icon: Phone,
              },
              {
                label: "Location",
                value: siteConfig.location,
                href: `https://maps.google.com/?q=${encodeURIComponent(siteConfig.location)}`,
                icon: MapPin,
              },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-6 border border-coffee-dark/10 hover:border-coffee-dark/30 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-coffee-dark text-beige-light flex items-center justify-center group-hover:bg-coffee-accent transition-colors">
                    <item.icon size={18} />
                  </div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-coffee-muted font-semibold">
                    {item.label}
                  </p>
                </div>
                <p className="text-lg font-heading text-coffee-dark group-hover:text-coffee-accent transition-colors font-semibold">
                  {item.value}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
