import SectionHeading from "@/components/SectionHeading";
import AboutSection from "@/components/AboutSection";

export default function AboutPage() {
  return (
    <div>
      <section className="pt-32 md:pt-40 pb-16 md:pb-24 bg-beige-light">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <SectionHeading
            eyebrow="The Studio"
            title="About Nerospace"
            subtitle="A boutique interior design studio creating refined spaces where architecture, materiality and everyday life meet."
            center
          />
        </div>
      </section>

      <AboutSection />

      <section className="py-24 md:py-32 bg-beige-warm">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            {[
              {
                number: "01",
                title: "OUR PHILOSOPHY",
                text: "We believe that great design emerges from the intersection of beauty and functionality. Every space we create is a reflection of the people who inhabit it.",
              },
              {
                number: "02",
                title: "OUR APPROACH",
                text: "We listen first, design second. Our process is rooted in understanding your needs, your lifestyle, and your vision for the space.",
              },
              {
                number: "03",
                title: "OUR PROMISE",
                text: "We deliver spaces that are not just beautiful, but livable. Spaces that inspire, comfort, and stand the test of time.",
              },
            ].map((item, i) => (
              <div key={item.number}>
                <span className="font-heading text-4xl text-coffee-accent/40 mb-4 block font-bold">
                  {item.number}
                </span>
                <h3 className="font-heading text-2xl text-coffee-dark mb-4 font-bold uppercase tracking-wide">
                  {item.title}
                </h3>
                <p className="text-sm text-coffee-dark/70 leading-relaxed font-heading">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-beige-light">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="https://i.pinimg.com/736x/3b/ab/34/3bab349ed98fdbecab786df9b4c9ace6.jpg"
                alt="Nerospace Designs studio"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-heading text-4xl md:text-5xl text-coffee-dark leading-[1.1] mb-6 font-bold uppercase">
                Design With Intention
              </h2>
              <p className="text-sm md:text-base text-coffee-dark/70 leading-relaxed mb-6 font-heading">
                Founded in Abuja, Nigeria, NEROSPACE DESIGNS brings a contemporary, globally informed perspective to interior design. We work closely with each client to create spaces that are deeply personal yet timeless in their appeal.
              </p>
              <p className="text-sm md:text-base text-coffee-dark/70 leading-relaxed font-heading">
                Our team of designers, architects, and craftspeople collaborate to deliver projects of the highest caliber, from concept through to completion.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
