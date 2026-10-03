import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, subject, message, from } = body;

    if (!to || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const recipients = Array.isArray(to) ? to : [to];

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST || "smtp.gmail.com",
      port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    const emailPromises = recipients.map((recipient: string) =>
      transporter.sendMail({
        from: from || process.env.EMAIL_FROM || process.env.EMAIL_SERVER_USER,
        to: recipient,
        subject,
        html: `
          <div style="font-family: 'Cormorant Garamond', Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px; background-color: #F5F0E8;">
            <div style="text-align: center; margin-bottom: 40px;">
              <h1 style="color: #3C2415; font-size: 28px; font-weight: bold; letter-spacing: 0.1em; margin: 0;">NEROSPACE DESIGNS</h1>
              <div style="width: 60px; height: 2px; background-color: #6D4C41; margin: 20px auto;"></div>
            </div>
            <div style="background-color: #FFFFFF; padding: 40px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
              <p style="color: #3C2415; font-size: 16px; line-height: 1.8; white-space: pre-wrap;">${message.replace(/\n/g, "<br>")}</p>
            </div>
            <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #E0D5C5;">
              <p style="color: #6D4C41; font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; margin: 0;">Interior Design Studio</p>
              <p style="color: #A1887F; font-size: 11px; margin-top: 8px;">The Carpenter, 6th Ave, Gwarinpa, Abuja</p>
            </div>
          </div>
        `,
        text: message,
      })
    );

    const results = await Promise.allSettled(emailPromises);
    const successful = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected").length;

    return NextResponse.json({
      success: true,
      message: `Sent ${successful} emails successfully${failed > 0 ? `, ${failed} failed` : ""}`,
      successful,
      failed,
    });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ error: "Failed to send emails" }, { status: 500 });
  }
}
