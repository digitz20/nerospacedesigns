import { NextResponse } from "next/server";
import { getSql, ensureSchema, hasDatabase } from "@/lib/database";
import { readFile } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // No DATABASE_URL → no DB-backed images exist locally; 404 cleanly
    if (!hasDatabase()) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }
    await ensureSchema();
    const { id } = await params;

    const db = getSql();
    const rows = (await db`
      SELECT mime_type, data, length(data) as size FROM admin_images WHERE id = ${id} LIMIT 1
    `) as { mime_type: string; data: Buffer; size: number }[];

    const row = rows[0];
    if (!row) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }

    const buffer = Buffer.from(row.data as Buffer);
    const size = row.size || buffer.length;
    const contentType = row.mime_type || "application/octet-stream";

    const requestHeaders = new Headers();
    requestHeaders.set("Content-Type", contentType);
    requestHeaders.set("Accept-Ranges", "bytes");
    requestHeaders.set("Cache-Control", "public, max-age=31536000, immutable");

    const range = _request.headers.get("range");

    if (range) {
      const match = range.match(/bytes=(\d+)-(\d*)/);
      if (match) {
        const start = parseInt(match[1], 10);
        const end = match[2] ? parseInt(match[2], 10) : size - 1;
        const chunkSize = end - start + 1;

        requestHeaders.set("Content-Range", `bytes ${start}-${end}/${size}`);
        requestHeaders.set("Content-Length", String(chunkSize));

        return new NextResponse(buffer.subarray(start, end + 1), {
          status: 206,
          headers: requestHeaders,
        });
      }
    }

    requestHeaders.set("Content-Length", String(size));

    return new NextResponse(buffer, {
      headers: requestHeaders,
    });
  } catch (error) {
    console.error("GET /api/images/[id] error:", error);
    return NextResponse.json({ error: "Failed to load media" }, { status: 500 });
  }
}
