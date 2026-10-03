import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/data";

export default function ProjectsPage() {
  return (
    <div>
      <section className="pt-32 md:pt-40 pb-16 md:pb-24 bg-primary-cream">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <SectionHeading
            eyebrow="Selected Work"
            title="Our Projects"
            subtitle="A curated selection of residential and commercial spaces that reflect our commitment to considered design."
            center
          />
        </div>
      </section>

      <section className="pb-24 md:pb-32 bg-primary-cream">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            {projects.map((project, index) => (
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
        </div>
      </section>
    </div>
  );
}
