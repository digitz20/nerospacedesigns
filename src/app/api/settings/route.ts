import { NextResponse } from "next/server";
import { readDataFile, writeDataFile } from "@/lib/server";

interface Settings {
  contact: { email: string; phone: string; location: string };
  social: {
    instagram: string;
    pinterest: string;
    whatsapp: string;
    tiktok: string;
    twitter: string;
    linkedin: string;
    youtube: string;
    facebook: string;
  };
  siteName: string;
  tagline: string;
}

export async function GET() {
  const settings = readDataFile<Settings>("settings.json", {
    contact: { email: "", phone: "", location: "" },
    social: {
      instagram: "",
      pinterest: "",
      whatsapp: "",
      tiktok: "",
      twitter: "",
      linkedin: "",
      youtube: "",
      facebook: "",
    },
    siteName: "",
    tagline: "",
  });
  return NextResponse.json({ settings });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { settings } = body;

    if (!settings) {
      return NextResponse.json({ error: "Settings required" }, { status: 400 });
    }

    writeDataFile("settings.json", settings);
    return NextResponse.json({ success: true, settings });
  } catch {
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
  }
}
