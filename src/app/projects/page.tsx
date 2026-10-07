"use client";

import { useEffect, useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";

interface Project {
  id: string;
  slug: string;
  title: string;
  location: string;
  category: string;
  year: string;
  description: string;
  images: string[];
  videos: string[];
  aspectRatio: string;
  secondaryImage?: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [lastKnownUpdate, setLastKnownUpdate] = useState<number>(0);

  const loadProjects = async (pageNum: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/projects?page=${pageNum}`);
      const data = await res.json();
      if (data.projects) {
        setProjects(data.projects);
        setPage(data.page);
        setTotalPages(data.totalPages);
      }
    } catch {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects(1);

    const interval = setInterval(() => {
      const stored = sessionStorage.getItem("lastProjectUpdate");
      const timestamp = stored ? Number(stored) : 0;
      if (timestamp > lastKnownUpdate) {
        setLastKnownUpdate(timestamp);
        loadProjects(page);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [lastKnownUpdate, page]);

  return (
    <div>
      <section className="pt-32 md:pt-40 pb-16 md:pb-24 bg-beige-light">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <SectionHeading
            eyebrow="Selected Work"
            title="Our Projects"
            subtitle="A curated selection of residential and commercial spaces that reflect our commitment to considered design."
            center
          />
        </div>
      </section>

      <section className="pb-24 md:pb-32 bg-beige-light">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          {loading ? (
            <div className="min-h-[40vh] flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 border-2 border-coffee-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-coffee-dark font-heading">Loading projects...</p>
              </div>
            </div>
          ) : projects.length === 0 ? (
            <div className="min-h-[40vh] flex items-center justify-center">
              <p className="text-coffee-dark font-heading text-lg">No projects yet. Check back soon.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {projects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    title={project.title}
                    location={project.location}
                    category={project.category}
                    year={project.year}
                    image={project.images[0]}
                    videos={project.videos}
                    aspectRatio="aspect-[3/4]"
                    slug={project.slug}
                    index={index}
                    secondaryImage={project.secondaryImage}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-12 md:mt-16">
                  <button
                    onClick={() => loadProjects(page - 1)}
                    disabled={page <= 1}
                    className="text-xs tracking-[0.2em] uppercase font-semibold text-coffee-accent hover:text-coffee-dark disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    ← Previous
                  </button>
                  <span className="text-sm text-coffee-dark font-heading">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => loadProjects(page + 1)}
                    disabled={page >= totalPages}
                    className="text-xs tracking-[0.2em] uppercase font-semibold text-coffee-accent hover:text-coffee-dark disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
