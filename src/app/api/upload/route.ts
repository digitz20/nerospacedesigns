import { NextResponse } from "next/server";
import { writeDataFile, readDataFile, sanitizeFilename } from "@/lib/server";

const UPLOAD_DIR = path.join(process.cwd(), "public", "images", "admin-uploads");
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

import fs from "fs";
import path from "path";

function ensureUploadDir() {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only jpg, png, webp allowed." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Max size is 5MB." },
        { status: 400 }
      );
    }

    ensureUploadDir();
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const originalName = file.name;
    const safeName = sanitizeFilename(originalName);
    const finalName = `${Date.now()}-${safeName}`;
    const filePath = path.join(UPLOAD_DIR, finalName);

    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/images/admin-uploads/${finalName}`;

    return NextResponse.json({ url: publicUrl, filename: finalName });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
