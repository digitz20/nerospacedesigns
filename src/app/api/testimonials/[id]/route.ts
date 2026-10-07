import { NextRequest, NextResponse } from "next/server";
import { getSql, ensureSchema } from "@/lib/database";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
