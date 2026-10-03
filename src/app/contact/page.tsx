import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div>
      <section className="pt-32 md:pt-40 pb-16 md:pb-24 bg-primary-cream">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-3xl">
            <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-earthen-brown mb-4">
              Get In Touch
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary-dark leading-[1.1] mb-6">
              Let&apos;s Discuss Your Project
            </h1>
            <p className="text-sm md:text-base text-primary-dark/70 leading-relaxed">
              We would love to hear about your space. Reach out and we will
              arrange a consultation at your convenience.
            </p>
          </div>
        </div>
      </section>

      <ContactForm />

      <section className="py-16 md:py-24 bg-secondary-cream">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                label: "Email",
                value: "info@nerospace.designs",
                href: "mailto:info@nerospace.designs",
              },
              {
                label: "Phone",
                value: "+234 801 234 5678",
                href: "tel:+2348012345678",
              },
              {
                label: "Location",
                value: "Lagos, Nigeria",
                href: "#",
              },
            ].map((item, i) => (
              <div key={i}>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-taupe mb-3">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-lg font-heading text-primary-dark hover:text-earthen-brown transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-lg font-heading text-primary-dark">
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
