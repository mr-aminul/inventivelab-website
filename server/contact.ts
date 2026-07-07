import nodemailer from "nodemailer";

export type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  honeypot?: string;
};

export type ContactError = {
  ok: false;
  error: string;
  status: number;
};

export type ContactSuccess = {
  ok: true;
};

export type ContactResult = ContactSuccess | ContactError;

const DEFAULT_TO = "info@inventivelab.bd";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  const port = Number(process.env.SMTP_PORT ?? "587");
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  return {
    host,
    port,
    secure,
    auth: { user, pass },
    from: process.env.SMTP_FROM ?? user,
    to: process.env.CONTACT_TO ?? DEFAULT_TO,
  };
}

export function validateContact(payload: ContactPayload): ContactResult | ContactSuccess {
  if (payload.honeypot?.trim()) {
    return { ok: false, error: "Invalid submission.", status: 400 };
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const message = payload.message?.trim() ?? "";

  if (!name) {
    return { ok: false, error: "Please enter your name.", status: 400 };
  }

  if (!email) {
    return { ok: false, error: "Please enter your email address.", status: 400 };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "Please enter a valid email address.", status: 400 };
  }

  if (!message) {
    return { ok: false, error: "Please describe what we can help with.", status: 400 };
  }

  if (message.length > 5000) {
    return { ok: false, error: "Message is too long. Please keep it under 5,000 characters.", status: 400 };
  }

  return { ok: true };
}

export async function sendContactEmail(payload: ContactPayload): Promise<ContactResult> {
  const validation = validateContact(payload);
  if (!validation.ok) {
    return validation;
  }

  const smtp = getSmtpConfig();
  if (!smtp) {
    return {
      ok: false,
      error: "Contact form is not configured yet. Please set SMTP environment variables.",
      status: 503,
    };
  }

  const name = payload.name!.trim();
  const email = payload.email!.trim();
  const message = payload.message!.trim();

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: smtp.auth,
  });

  const subject = "New project enquiry — Inventive Lab website";
  const text = [`Name: ${name}`, `Email: ${email}`, "", message].join("\n");
  const html = [
    "<p><strong>Name:</strong> " + escapeHtml(name) + "</p>",
    '<p><strong>Email:</strong> <a href="mailto:' + escapeHtml(email) + '">' + escapeHtml(email) + "</a></p>",
    "<p><strong>Message:</strong></p>",
    "<pre style=\"font-family:inherit;white-space:pre-wrap;margin:0\">" + escapeHtml(message) + "</pre>",
  ].join("\n");

  try {
    await transporter.sendMail({
      from: smtp.from,
      to: smtp.to,
      replyTo: email,
      subject,
      text,
      html,
    });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return {
      ok: false,
      error: "Could not send your message. Please try again or email us directly.",
      status: 502,
    };
  }

  return { ok: true };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
