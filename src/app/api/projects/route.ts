import { NextResponse } from "next/server";
import { readDataFile, writeDataFile, generateId, generateSlug } from "@/lib/server";

interface Project {
  id: string;
  slug: string;
  title: string;
  location: string;
  category: string;
  year: string;
  description: string;
  images: string[];
  aspectRatio: string;
  clientName?: string;
  projectSize?: string;
  budgetRange?: string;
  timeline?: string;
  status?: string;
  featured?: boolean;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
  const limit = 20;
  const data = readDataFile<{ projects: Project[] }>("projects.json", { projects: [] });
  const total = data.projects.length;
  const start = (page - 1) * limit;
  const paginated = data.projects.slice(start, start + limit);
  return NextResponse.json({
    projects: paginated,
    page,
    limit,
    total,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { project } = body;

    if (!project || !project.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    try {
      const data = readDataFile<{ projects: Project[] }>("projects.json", { projects: [] });
      const baseSlug = generateSlug(project.title || generateId());
      let slug = baseSlug;
      const existingSlugs = new Set(data.projects.map((p) => p.slug));
      let counter = 1;
      while (existingSlugs.has(slug)) {
        slug = `${baseSlug}-${counter++}`;
      }
      const newProject: Project = {
        id: generateId(),
        slug,
        ...project,
        images: project.images || [],
        aspectRatio: project.aspectRatio || "aspect-[4/5]",
      };

      data.projects.push(newProject);
      writeDataFile("projects.json", data);

      return NextResponse.json({ success: true, project: newProject });
    } catch (fsError) {
      console.error("Project save filesystem error:", fsError);
      return NextResponse.json(
        {
          error: "Failed to save project. In production, you must use a database instead of local files because Vercel serverless functions have a read-only filesystem.",
        },
        { status: 500 }
      );
    }
  } catch {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
