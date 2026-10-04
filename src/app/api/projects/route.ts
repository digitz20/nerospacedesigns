import { NextResponse } from "next/server";
import { generateId, generateSlug } from "@/lib/server";
import { getSql, ensureSchema } from "@/lib/database";

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
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
    const limit = 20;
    const offset = (page - 1) * limit;

    await ensureSchema();

    const db = getSql();
    const countRow = (await db`
      SELECT COUNT(*) AS count FROM projects
    `) as { count: string }[];
    const total = Number(countRow[0]?.count || 0);

    const rows = (await db`
      SELECT
        id,
        slug,
        title,
        location,
        category,
        year,
        description,
        images,
        aspect_ratio AS aspectRatio,
        client_name AS clientName,
        project_size AS projectSize,
        budget_range AS budgetRange,
        timeline,
        status,
        featured
      FROM projects
      ORDER BY created_at DESC
      LIMIT ${limit}
      OFFSET ${offset}
    `) as Project[];

    const projects: Project[] = rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      location: row.location,
      category: row.category,
      year: row.year,
      description: row.description,
      images: Array.isArray(row.images) ? row.images : [],
      aspectRatio: row.aspectRatio,
      clientName: row.clientName || undefined,
      projectSize: row.projectSize || undefined,
      budgetRange: row.budgetRange || undefined,
      timeline: row.timeline || undefined,
      status: row.status || undefined,
      featured: Boolean(row.featured),
    }));

    return NextResponse.json({
      projects,
      page,
      limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    });
  } catch (error) {
    console.error("GET /api/projects error:", error);
    return NextResponse.json({ error: "Failed to load projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { project } = body;

    if (!project || !project.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    await ensureSchema();

    const db = getSql();
    const id = generateId();
    const baseSlug = generateSlug(project.title || id);
    let slug = baseSlug;

    const existingSlugs = (await db`SELECT slug FROM projects`) as { slug: string }[];
    const takenSlugs = new Set(existingSlugs.map((r) => r.slug));
    let counter = 1;
    while (takenSlugs.has(slug)) {
      slug = `${baseSlug}-${counter++}`;
    }

    await db`
      INSERT INTO projects (
        id,
        slug,
        title,
        location,
        category,
        year,
        description,
        images,
        aspect_ratio,
        client_name,
        project_size,
        budget_range,
        timeline,
        status,
        featured
      )
      VALUES (
        ${id},
        ${slug},
        ${project.title},
        ${project.location || ""},
        ${project.category || "Residential"},
        ${project.year || ""},
        ${project.description || ""},
        ${Array.isArray(project.images) ? project.images : []},
        ${project.aspectRatio || "aspect-[4/5]"},
        ${project.clientName || ""},
        ${project.projectSize || ""},
        ${project.budgetRange || ""},
        ${project.timeline || ""},
        ${project.status || "Planning"},
        ${Boolean(project.featured)}
      )
    `;

    const newProject: Project = {
      id,
      slug,
      title: project.title,
      location: project.location || "",
      category: project.category || "Residential",
      year: project.year || "",
      description: project.description || "",
      images: Array.isArray(project.images) ? project.images : [],
      aspectRatio: project.aspectRatio || "aspect-[4/5]",
      clientName: project.clientName || undefined,
      projectSize: project.projectSize || undefined,
      budgetRange: project.budgetRange || undefined,
      timeline: project.timeline || undefined,
      status: project.status || "Planning",
      featured: Boolean(project.featured),
    };

    return NextResponse.json({ success: true, project: newProject });
  } catch (error) {
    console.error("POST /api/projects error:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
