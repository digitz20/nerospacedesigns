import { NextResponse } from "next/server";
import { getSql, ensureSchema } from "@/lib/database";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

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

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

async function ensureUploadDir() {
  try {
    await mkdir(UPLOAD_DIR, { recursive: true });
  } catch {
    // dir may already exist
  }
}

export async function POST(request: Request) {
  try {
    await ensureUploadDir();

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

    const isVideo = file.type.startsWith("video/");
    const folder = isVideo ? "videos" : "images";
    const targetDir = path.join(UPLOAD_DIR, folder);

    try {
      await mkdir(targetDir, { recursive: true });
    } catch {
      // dir may already exist
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const ext = path.extname(file.name) || (isVideo ? ".mp4" : ".jpg");
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}${ext}`;
    const relativePath = `/uploads/${folder}/${filename}`;
    const absolutePath = path.join(process.cwd(), "public", "uploads", folder, filename);

    await writeFile(absolutePath, bytes);

    return NextResponse.json({ url: relativePath, filename: file.name });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
