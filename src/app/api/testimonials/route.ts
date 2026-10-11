import { NextRequest, NextResponse } from "next/server";
import { getSql, ensureSchema, hasDatabase } from "@/lib/database";
import { readDataFile, writeDataFile } from "@/lib/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
}

export async function GET() {
  try {
    // No DATABASE_URL (local dev) → serve the file store instead of 500ing
    if (!hasDatabase()) {
      const testimonials = readDataFile<{ testimonials: Testimonial[] }>(
        "testimonials.json",
        { testimonials: [] }
      ).testimonials;
      return NextResponse.json({ testimonials });
    }
    await ensureSchema();
    const db = getSql();
    const rows = (await db`
      SELECT id, quote, author, role, created_at
      FROM testimonials
      ORDER BY created_at DESC
    `) as any[];

    return NextResponse.json({ testimonials: rows });
  } catch (error) {
    console.error("GET /api/testimonials error:", error);
    return NextResponse.json({ error: "Failed to load testimonials" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { quote, author, role } = body;

    if (!quote || !quote.trim()) {
      return NextResponse.json({ error: "Quote is required" }, { status: 400 });
    }

    // No DATABASE_URL (local dev) → persist to the file store
    if (!hasDatabase()) {
      const stored = readDataFile<{ testimonials: Testimonial[] }>(
        "testimonials.json",
        { testimonials: [] }
      ).testimonials;
      const testimonial: Testimonial = {
        id: Date.now().toString(),
        quote: quote.trim(),
        author: (author || "").trim(),
        role: (role || "").trim(),
      };
      stored.unshift(testimonial);
      writeDataFile("testimonials.json", { testimonials: stored });
      return NextResponse.json({ success: true, testimonial });
    }

    await ensureSchema();
    const db = getSql();
    const id = Date.now().toString();

    await db`
      INSERT INTO testimonials (id, quote, author, role)
      VALUES (${id}, ${quote.trim()}, ${(author || "").trim()}, ${(role || "").trim()})
    `;

    const testimonial = { id, quote: quote.trim(), author: (author || "").trim(), role: (role || "").trim() };

    return NextResponse.json({ success: true, testimonial });
  } catch (error) {
    console.error("POST /api/testimonials error:", error);
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // No DATABASE_URL (local dev) → delete from the file store
    if (!hasDatabase()) {
      const stored = readDataFile<{ testimonials: Testimonial[] }>(
        "testimonials.json",
        { testimonials: [] }
      ).testimonials;
      writeDataFile("testimonials.json", {
        testimonials: stored.filter((t) => t.id !== id),
      });
      return NextResponse.json({ success: true });
    }

    await ensureSchema();
    const db = getSql();

    await db`
      DELETE FROM testimonials WHERE id = ${id}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/testimonials error:", error);
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}
