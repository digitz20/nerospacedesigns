import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Receiver: EMAIL_TO from .env, falling back to the sending account (typical
// single-Gmail setup), then the site's public address.
const receiverEmail =
  process.env.EMAIL_TO || process.env.EMAIL_SERVER_USER || "nerospacedesigns@gmail.com";

const port = parseInt(process.env.EMAIL_SERVER_PORT || "587", 10);

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST || "smtp.gmail.com",
  port,
  secure: port === 465,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value: string): string {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:8px 16px 8px 0;font-size:13px;color:#7a6a5b;text-transform:uppercase;letter-spacing:0.1em;white-space:nowrap;vertical-align:top;">${label}</td>
      <td style="padding:8px 0;font-size:15px;color:#2b1f16;">${escapeHtml(value)}</td>
    </tr>`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const projectType = String(body.projectType ?? "").trim();
    const location = String(body.location ?? "").trim();
    const budget = String(body.budget ?? "").trim();
    const timeline = String(body.timeline ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    if (name.length > 200 || email.length > 200 || message.length > 10000) {
      return NextResponse.json({ error: "Payload too large" }, { status: 400 });
    }

    const mailSubject = `New project enquiry from ${name} (Nerospace Designs website)`;

    const text = [
      "New project enquiry from the Nerospace Designs website:",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : "",
      projectType ? `Project type: ${projectType}` : "",
      location ? `Location: ${location}` : "",
      budget ? `Estimated budget: ${budget}` : "",
      timeline ? `Project timeline: ${timeline}` : "",
      "",
      "Message:",
      message,
      "",
      `Submitted: ${new Date().toISOString()}`,
    ]
      .filter(Boolean)
      .join("\n");

    const html = `
      <div style="font-family:Georgia,serif;color:#2b1f16;">
        <h2 style="margin:0 0 4px;font-size:20px;">New project enquiry</h2>
        <p style="margin:0 0 16px;font-size:13px;color:#7a6a5b;">Nerospace Designs website contact form</p>
        <table style="border-collapse:collapse;">
          ${row("Name", name)}
          ${row("Email", email)}
          ${row("Phone", phone)}
          ${row("Project type", projectType)}
          ${row("Location", location)}
          ${row("Estimated budget", budget)}
          ${row("Project timeline", timeline)}
        </table>
        <p style="margin:20px 0 6px;font-size:13px;color:#7a6a5b;text-transform:uppercase;letter-spacing:0.1em;">Message</p>
        <p style="margin:0;white-space:pre-wrap;font-size:15px;line-height:1.6;">${escapeHtml(message)}</p>
      </div>`;

    if (!process.env.EMAIL_SERVER_USER) {
      console.log("Contact form submission (no email configured):", {
        name,
        email,
        phone,
        projectType,
        location,
        budget,
        timeline,
        message,
      });
      return NextResponse.json({
        success: true,
        message: "Thank you for your message. We will get back to you shortly.",
      });
    }

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_SERVER_USER,
      to: receiverEmail,
      replyTo: email,
      subject: mailSubject,
      text,
      html,
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for your message. We will get back to you shortly.",
    });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
