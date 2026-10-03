import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST || "smtp.gmail.com",
  port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    if (!process.env.EMAIL_SERVER_USER) {
      console.log("Contact form submission (no email configured):", {
        name, email, phone, subject, message
      });
      return NextResponse.json({
        success: true,
        message: "Thank you for your message. We will get back to you shortly.",
      });
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_SERVER_USER,
      to: "nerospacedesigns@gmail.com",
      subject: subject || `New Contact Form Submission from ${name}`,
      text: `
New contact form submission from Nerospace Designs website:

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Subject: ${subject || "No subject"}

Message:
${message}

---
Sent from: ${request.headers.get("x-forwarded-for") || "Unknown IP"}
      `,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);

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
