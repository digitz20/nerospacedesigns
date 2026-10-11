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

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { quote, author, role } = body;

    if (!id || !quote || !quote.trim()) {
      return NextResponse.json({ error: "ID and quote are required" }, { status: 400 });
    }

    // No DATABASE_URL (local dev) → update the file store
    if (!hasDatabase()) {
      const stored = readDataFile<{ testimonials: Testimonial[] }>(
        "testimonials.json",
        { testimonials: [] }
      ).testimonials;
      const idx = stored.findIndex((t) => t.id === id);
      if (idx === -1) {
        return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
      }
      stored[idx] = {
        id,
        quote: quote.trim(),
        author: (author || "").trim(),
        role: (role || "").trim(),
      };
      writeDataFile("testimonials.json", { testimonials: stored });
      return NextResponse.json({ success: true, testimonial: stored[idx] });
    }

    await ensureSchema();
    const db = getSql();

    await db`
      UPDATE testimonials
      SET quote = ${quote.trim()}, author = ${(author || "").trim()}, role = ${(role || "").trim()}
      WHERE id = ${id}
    `;

    const testimonial = { id, quote: quote.trim(), author: (author || "").trim(), role: (role || "").trim() };

    return NextResponse.json({ success: true, testimonial });
  } catch (error) {
    console.error("PUT /api/testimonials error:", error);
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

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
    console.error("DELETE /api/testimonials/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}
