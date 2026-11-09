import { NextResponse, type NextRequest } from "next/server";
import { ui } from "@content";
import type { ContactResponse } from "@/lib/contact/api";
import { validateContact } from "@/lib/contact/validate";
import { rateLimit } from "@/lib/server/rateLimit";
import { sendContactEmail } from "@/lib/server/resend";
import { verifyTurnstile } from "@/lib/server/turnstile";

export const runtime = "nodejs";

const api = ui.contactForm.api;

const reply = (body: ContactResponse, status = 200, headers?: HeadersInit) => NextResponse.json(body, { status, headers });

function clientIp(req: NextRequest): string {
  // Only trust headers the host sets itself (Vercel sets x-forwarded-for); cf-connecting-ip is client-spoofable off Cloudflare
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function readField(body: unknown, key: string): string {
  if (typeof body !== "object" || body === null) return "";
  const value = (body as Record<string, unknown>)[key];
  return typeof value === "string" ? value : "";
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return reply({ ok: false, error: api.badRequest }, 400);
  }

  // 1. Honeypot: pretend it worked so bots don't learn anything
  if (readField(body, "company")) return reply({ ok: true });

  // 2. Validate fields
  const result = validateContact(body);
  if (!result.ok) return reply({ ok: false, error: api.checkFields, fields: result.errors }, 400);

  // 3. Rate limit per visitor
  const ip = clientIp(req);
  const limit = rateLimit(ip);
  if (!limit.allowed) {
    return reply(
      { ok: false, error: api.rateLimited },
      429,
      { "Retry-After": String(limit.retryAfterSeconds) },
    );
  }

  // 4. Bot check
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("[contact] TURNSTILE_SECRET_KEY is not set");
    return reply({ ok: false, error: api.notConfigured }, 500);
  }
  const human = await verifyTurnstile(readField(body, "token"), secret, ip === "unknown" ? undefined : ip);
  if (!human) return reply({ ok: false, error: api.botCheckFailed }, 403);

  // 5. Send to your inbox
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    if (process.env.NODE_ENV !== "production") {
      // Local development without Resend: log instead of sending
      console.info("[contact] Email not configured; message would be sent:", result.data);
      return reply({ ok: true });
    }
    console.error("[contact] RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL is not set");
    return reply({ ok: false, error: api.notConfigured }, 500);
  }

  const sent = await sendContactEmail(result.data, { apiKey, from, to });
  if (!sent) return reply({ ok: false, error: api.sendFailed }, 502);

  return reply({ ok: true });
}
