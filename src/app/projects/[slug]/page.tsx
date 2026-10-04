import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProjectImageGrid from "./ProjectImageGrid";
import { getProjects } from "@/lib/projects-server";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} | Nerospace Designs`,
    description: project.description,
  };
}

export default async function ProjectDetail({ params }: PageProps) {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div>
      <section className="pt-24 md:pt-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex items-center justify-between py-6 border-b border-coffee-accent/20 mb-8 md:mb-12">
            <Link
              href="/projects"
              className="group flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-coffee-muted hover:text-coffee-accent transition-colors font-semibold"
            >
              <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Projects
            </Link>
            <div className="text-[11px] tracking-[0.2em] uppercase text-coffee-muted font-semibold">
              {project.category} — {project.year}
            </div>
          </div>

          <div className="mb-8 md:mb-12">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-coffee-dark leading-[1.1] mb-4 font-bold uppercase">
              {project.title}
            </h1>
            <p className="text-sm md:text-base text-coffee-dark/70 max-w-2xl font-heading">
              {project.description}
            </p>
          </div>

          <ProjectImageGrid images={project.images} title={project.title} />
        </div>
      </section>

      <section className="py-16 md:py-24 bg-beige-warm">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid md:grid-cols-2 gap-8 mb-16 md:mb-24">
            <div>
              <h3 className="font-heading text-2xl text-coffee-dark mb-4 font-bold uppercase tracking-wide">
                Project Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between py-3 border-b border-coffee-accent/20">
                  <span className="text-xs tracking-wide uppercase text-coffee-muted font-semibold">
                    Location
                  </span>
                  <span className="text-sm text-coffee-dark font-heading">{project.location}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-coffee-accent/20">
                  <span className="text-xs tracking-wide uppercase text-coffee-muted font-semibold">
                    Category
                  </span>
                  <span className="text-sm text-coffee-dark font-heading">{project.category}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-coffee-accent/20">
                  <span className="text-xs tracking-wide uppercase text-coffee-muted font-semibold">
                    Year
                  </span>
                  <span className="text-sm text-coffee-dark font-heading">{project.year}</span>
                </div>
                {project.clientName && (
                  <div className="flex justify-between py-3 border-b border-coffee-accent/20">
                    <span className="text-xs tracking-wide uppercase text-coffee-muted font-semibold">
                      Client
                    </span>
                    <span className="text-sm text-coffee-dark font-heading">{project.clientName}</span>
                  </div>
                )}
                {project.projectSize && (
                  <div className="flex justify-between py-3 border-b border-coffee-accent/20">
                    <span className="text-xs tracking-wide uppercase text-coffee-muted font-semibold">
                      Size
                    </span>
                    <span className="text-sm text-coffee-dark font-heading">{project.projectSize}</span>
                  </div>
                )}
                {project.budgetRange && (
                  <div className="flex justify-between py-3 border-b border-coffee-accent/20">
                    <span className="text-xs tracking-wide uppercase text-coffee-muted font-semibold">
                      Budget
                    </span>
                    <span className="text-sm text-coffee-dark font-heading">{project.budgetRange}</span>
                  </div>
                )}
                {project.timeline && (
                  <div className="flex justify-between py-3 border-b border-coffee-accent/20">
                    <span className="text-xs tracking-wide uppercase text-coffee-muted font-semibold">
                      Timeline
                    </span>
                    <span className="text-sm text-coffee-dark font-heading">{project.timeline}</span>
                  </div>
                )}
                {project.status && (
                  <div className="flex justify-between py-3 border-b border-coffee-accent/20">
                    <span className="text-xs tracking-wide uppercase text-coffee-muted font-semibold">
                      Status
                    </span>
                    <span className="text-sm text-coffee-dark font-heading">{project.status}</span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h3 className="font-heading text-2xl text-coffee-dark mb-4 font-bold uppercase tracking-wide">
                Design Approach
              </h3>
              <p className="text-sm text-coffee-dark/70 leading-relaxed font-heading">
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-beige-light">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group flex items-center gap-4"
            >
              <ArrowLeft size={20} className="text-coffee-accent transition-transform duration-300 group-hover:-translate-x-1" />
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-coffee-muted mb-1 font-semibold">
                  Previous
                </p>
                <p className="font-heading text-xl text-coffee-dark group-hover:text-coffee-accent transition-colors font-bold uppercase">
                  {prevProject.title}
                </p>
              </div>
            </Link>

            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex items-center gap-4 md:flex-row-reverse"
            >
              <ArrowRight size={20} className="text-coffee-accent transition-transform duration-300 group-hover:translate-x-1" />
              <div className="text-right">
                <p className="text-[10px] tracking-[0.2em] uppercase text-coffee-muted mb-1 font-semibold">
                  Next
                </p>
                <p className="font-heading text-xl text-coffee-dark group-hover:text-coffee-accent transition-colors font-bold uppercase">
                  {nextProject.title}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
