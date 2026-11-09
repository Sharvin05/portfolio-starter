import type { ContactErrors } from "./validate";

/** Body the form sends to /api/contact. */
export interface ContactRequest {
  name: string;
  email: string;
  message: string;
  /** Cloudflare Turnstile token. */
  token: string;
  /** Honeypot: hidden from people, bots tend to fill it in. */
  company: string;
}

export type ContactResponse =
  | { ok: true }
  | { ok: false; error: string; fields?: ContactErrors };
