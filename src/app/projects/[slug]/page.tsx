import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProjectImageGrid from "./ProjectImageGrid";
import { projects } from "@/lib/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} | Nerospace Designs`,
    description: project.description,
  };
}

export default async function ProjectDetail({ params }: PageProps) {
  const { slug } = await params;
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
          <div className="flex items-center justify-between py-6 border-b border-earthen-brown/20 mb-8 md:mb-12">
            <Link
              href="/projects"
              className="group flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-muted-taupe hover:text-earthen-brown transition-colors"
            >
              <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Projects
            </Link>
            <div className="text-[11px] tracking-[0.2em] uppercase text-muted-taupe">
              {project.category} — {project.year}
            </div>
          </div>

          <div className="mb-8 md:mb-12">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-primary-dark leading-[1.1] mb-4">
              {project.title}
            </h1>
            <p className="text-sm md:text-base text-primary-dark/70 max-w-2xl">
              {project.description}
            </p>
          </div>

          <ProjectImageGrid images={project.images} title={project.title} />
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary-cream">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group flex items-center gap-4"
            >
              <ArrowLeft size={20} className="text-earthen-brown transition-transform duration-300 group-hover:-translate-x-1" />
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-taupe mb-1">
                  Previous
                </p>
                <p className="font-heading text-xl text-primary-dark group-hover:text-earthen-brown transition-colors">
                  {prevProject.title}
                </p>
              </div>
            </Link>

            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex items-center gap-4 md:flex-row-reverse"
            >
              <ArrowRight size={20} className="text-earthen-brown transition-transform duration-300 group-hover:translate-x-1" />
              <div className="text-right">
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-taupe mb-1">
                  Next
                </p>
                <p className="font-heading text-xl text-primary-dark group-hover:text-earthen-brown transition-colors">
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
