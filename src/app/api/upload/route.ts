import { NextResponse } from "next/server";
import { getSql, ensureSchema } from "@/lib/database";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
  "video/webm",
  "video/quicktime",
];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: jpg, png, webp, mp4, webm, mov." },
        { status: 400 }
      );
    }

    await ensureSchema();

    const db = getSql();
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const mimeType = file.type || "application/octet-stream";

    await db`
      INSERT INTO admin_images (id, filename, mime_type, data)
      VALUES (${id}, ${file.name}, ${mimeType}, ${buffer})
    `;

    const publicUrl = `/api/images/${id}`;

    return NextResponse.json({ url: publicUrl, filename: file.name });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
