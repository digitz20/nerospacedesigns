import { getSql, ensureSchema } from "@/lib/database";

export async function getProjects(): Promise<any[]> {
  try {
    await ensureSchema();
    const db = getSql();
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
    `) as any[];

    return rows.map((row) => ({
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
  } catch (error) {
    console.error("getProjects error:", error);
    return [];
  }
}
