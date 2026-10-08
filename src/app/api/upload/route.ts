import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

    const isVideo = file.type.startsWith("video/");
    const folder = isVideo ? "nerospacedesigns/videos" : "nerospacedesigns/images";
    const bytes = Buffer.from(await file.arrayBuffer());
    const base64 = bytes.toString("base64");
    const dataUri = `data:${file.type};base64,${base64}`;

    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload(
        dataUri,
        {
          folder,
          resource_type: "auto",
          public_id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
    });

    return NextResponse.json({
      url: result.secure_url,
      filename: file.name,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
