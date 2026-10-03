import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
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

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mb-16 md:mb-24">
            <div className="md:col-span-8 aspect-[16/9] overflow-hidden">
              <Image
                src={project.images[0]}
                alt={project.title}
                width={1200}
                height={675}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="md:col-span-4 aspect-[3/4] md:aspect-auto overflow-hidden">
              <Image
                src={project.images[1]}
                alt={`${project.title} detail`}
                width={600}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:col-span-4 aspect-[4/3] overflow-hidden">
              <Image
                src={project.images[2]}
                alt={`${project.title} detail`}
                width={600}
                height={450}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:col-span-8 aspect-[16/9] overflow-hidden">
              <Image
                src={project.images[0]}
                alt={`${project.title} wide`}
                width={1200}
                height={675}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16 md:mb-24">
            <div>
              <h3 className="font-heading text-2xl text-primary-dark mb-4">
                Project Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between py-3 border-b border-earthen-brown/20">
                  <span className="text-xs tracking-wide uppercase text-muted-taupe">
                    Location
                  </span>
                  <span className="text-sm text-primary-dark">{project.location}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-earthen-brown/20">
                  <span className="text-xs tracking-wide uppercase text-muted-taupe">
                    Category
                  </span>
                  <span className="text-sm text-primary-dark">{project.category}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-earthen-brown/20">
                  <span className="text-xs tracking-wide uppercase text-muted-taupe">
                    Year
                  </span>
                  <span className="text-sm text-primary-dark">{project.year}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-heading text-2xl text-primary-dark mb-4">
                Design Approach
              </h3>
              <p className="text-sm text-primary-dark/70 leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>
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
