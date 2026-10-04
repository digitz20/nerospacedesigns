import { NextResponse } from "next/server";
import { getSql, ensureSchema } from "@/lib/database";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface ProjectRow {
  id: string;
  title: string;
  location: string;
  category: string;
  year: string;
  description: string;
  images: string[];
  aspect_ratio: string;
  client_name: string;
  project_size: string;
  budget_range: string;
  timeline: string;
  status: string;
  featured: boolean;
}

interface Project {
  id: string;
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

function toProject(row: ProjectRow): Project {
  return {
    id: row.id,
    title: row.title,
    location: row.location,
    category: row.category,
    year: row.year,
    description: row.description,
    images: Array.isArray(row.images) ? row.images : [],
    aspectRatio: row.aspect_ratio,
    clientName: row.client_name || undefined,
    projectSize: row.project_size || undefined,
    budgetRange: row.budget_range || undefined,
    timeline: row.timeline || undefined,
    status: row.status || undefined,
    featured: Boolean(row.featured),
  };
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ensureSchema();
    const { id } = await params;

    const db = getSql();
    const rows = (await db`
      SELECT
        id,
        title,
        location,
        category,
        year,
        description,
        images,
        aspect_ratio
      FROM projects
      WHERE id = ${id}
      LIMIT 1
    `) as ProjectRow[];

    const row = rows[0];
    if (!row) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const project = toProject(row);

    return NextResponse.json({ project });
  } catch (error) {
    console.error("GET /api/projects/[id] error:", error);
    return NextResponse.json({ error: "Failed to load project" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { project } = body;

    if (!project) {
      return NextResponse.json({ error: "Project data required" }, { status: 400 });
    }

    await ensureSchema();

    const db = getSql();
    const rows = (await db`
      UPDATE projects
      SET
        title = ${project.title ?? ""},
        location = ${project.location ?? ""},
        category = ${project.category ?? "Residential"},
        year = ${project.year ?? ""},
        description = ${project.description ?? ""},
        images = ${Array.isArray(project.images) ? project.images : []},
        aspect_ratio = ${project.aspectRatio ?? "aspect-[4/5]"},
        client_name = ${project.clientName ?? ""},
        project_size = ${project.projectSize ?? ""},
        budget_range = ${project.budgetRange ?? ""},
        timeline = ${project.timeline ?? ""},
        status = ${project.status ?? "Planning"},
        featured = ${Boolean(project.featured)},
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `) as ProjectRow[];

    const updated = rows[0];

    if (!updated) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      project: toProject(updated),
    });
  } catch (error) {
    console.error("PUT /api/projects/[id] error:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ensureSchema();
    const { id } = await params;

    const db = getSql();
    const rows = (await db`
      DELETE FROM projects
      WHERE id = ${id}
      RETURNING id
    `) as { id: string }[];

    if (rows.length === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/projects/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
