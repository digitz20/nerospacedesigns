import { NextResponse } from "next/server";
import { readDataFile, writeDataFile } from "@/lib/server";

interface Project {
  id: string;
  title: string;
  location: string;
  category: string;
  year: string;
  description: string;
  images: string[];
  aspectRatio: string;
  details?: Record<string, unknown>;
}

function getProjectData(id: string): { projects: Project[]; project: Project | null } {
  const data = readDataFile<{ projects: Project[] }>("projects.json", { projects: [] });
  const project = data.projects.find((p) => p.id === id) || null;
  return { project, projects: data.projects };
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { project } = getProjectData(id);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json({ project });
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

    const data = readDataFile<{ projects: Project[] }>("projects.json", { projects: [] });
    const index = data.projects.findIndex((p) => p.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    data.projects[index] = { ...data.projects[index], ...project };
    writeDataFile("projects.json", data);

    return NextResponse.json({ success: true, project: data.projects[index] });
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = readDataFile<{ projects: Project[] }>("projects.json", { projects: [] });
    const project = data.projects.find((p) => p.id === id);

    data.projects = data.projects.filter((p) => p.id !== id);
    writeDataFile("projects.json", data);

    return NextResponse.json({ success: true, projects: data.projects });
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
