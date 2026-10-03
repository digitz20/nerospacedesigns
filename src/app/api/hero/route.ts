import { NextResponse } from "next/server";
import { readDataFile, writeDataFile } from "@/lib/server";
import fs from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "images", "admin-uploads");

function getHeroImages() {
  return readDataFile<{ images: { id: string; url: string; filename: string; visible: boolean }[] }>(
    "hero.json",
    { images: [] }
  ).images;
}

function saveHeroImages(images: { id: string; url: string; filename: string; visible: boolean }[]) {
  writeDataFile("hero.json", { images });
}

export async function GET() {
  const images = getHeroImages();
  return NextResponse.json({ images });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { images } = body;

    if (!Array.isArray(images)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    saveHeroImages(images);
    return NextResponse.json({ success: true, images });
  } catch {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id, filename } = body;

    if (filename) {
      const filePath = path.join(UPLOAD_DIR, filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    const images = getHeroImages().filter((img) => img.id !== id);
    saveHeroImages(images);

    return NextResponse.json({ success: true, images });
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
