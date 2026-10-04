import { NextResponse } from "next/server";
import { getSql, ensureSchema } from "@/lib/database";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ensureSchema();
    const { id } = await params;

    const db = getSql();
    const rows = (await db`
      SELECT mime_type, data FROM admin_images WHERE id = ${id} LIMIT 1
    `) as { mime_type: string; data: Buffer }[];

    const row = rows[0];
    if (!row) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    const buffer = Buffer.from(row.data as Buffer);

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": row.mime_type || "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("GET /api/images/[id] error:", error);
    return NextResponse.json({ error: "Failed to load image" }, { status: 500 });
  }
}
