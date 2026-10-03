import { NextResponse } from "next/server";
import { getAdminPassword, hashPassword, generateId } from "@/lib/server";

const SESSION_COOKIE = "nerospace_admin_session";
const SESSION_DURATION = 30 * 60 * 1000;

function sessions(): Map<string, { expires: number }> {
  const globalAny = globalThis as unknown as Record<string, unknown>;
  if (!globalAny.__adminSessions) {
    globalAny.__adminSessions = new Map<string, { expires: number }>();
  }
  return globalAny.__adminSessions as Map<string, { expires: number }>;
}

function getCookie(request: Request, name: string): string | null {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return null;
  const cookies = cookieHeader.split(";").map((c) => c.trim());
  const match = cookies.find((c) => c.startsWith(`${name}=`));
  if (!match) return null;
  return match.split("=").slice(1).join("=");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json({ error: "Password required" }, { status: 400 });
    }

    const adminPassword = getAdminPassword();
    if (password !== adminPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = generateId();
    const expires = Date.now() + SESSION_DURATION;
    sessions().set(token, { expires });

    const response = NextResponse.json({ success: true });
    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_DURATION / 1000,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  sessions().delete(getCookie(request, SESSION_COOKIE) || "");
  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  return response;
}

export async function GET(request: Request) {
  const token = getCookie(request, SESSION_COOKIE);
  if (!token) {
    return NextResponse.json({ authenticated: false });
  }

  const session = sessions().get(token);
  if (!session || session.expires < Date.now()) {
    sessions().delete(token);
    return NextResponse.json({ authenticated: false });
  }

  return NextResponse.json({ authenticated: true });
}
