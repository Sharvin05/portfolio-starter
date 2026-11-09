import { ui } from "@content";

const v = ui.contactForm.validation;

/** Shared by the contact form (instant feedback) and the API route (the real check). */

export interface ContactInput {
  name: string;
  email: string;
  message: string;
}

export type ContactField = keyof ContactInput;
export type ContactErrors = Partial<Record<ContactField, string>>;

export type ValidationResult =
  | { ok: true; data: ContactInput }
  | { ok: false; errors: ContactErrors };

export const LIMITS = {
  name: { max: 100 },
  email: { max: 254 },
  message: { min: 10, max: 5000 },
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function readString(source: Record<string, unknown>, key: string): string {
  const value = source[key];
  return typeof value === "string" ? value.trim() : "";
}

export function validateContact(input: unknown): ValidationResult {
  const source = typeof input === "object" && input !== null ? (input as Record<string, unknown>) : {};
  const data: ContactInput = {
    name: readString(source, "name"),
    email: readString(source, "email"),
    message: readString(source, "message"),
  };
  const errors: ContactErrors = {};

  if (!data.name) errors.name = v.nameMissing;
  else if (data.name.length > LIMITS.name.max) errors.name = v.nameTooLong(LIMITS.name.max);

  if (!data.email) errors.email = v.emailMissing;
  else if (data.email.length > LIMITS.email.max || !EMAIL_PATTERN.test(data.email)) errors.email = v.emailInvalid;

  if (!data.message) errors.message = v.messageMissing;
  else if (data.message.length < LIMITS.message.min) errors.message = v.messageTooShort(LIMITS.message.min);
  else if (data.message.length > LIMITS.message.max) errors.message = v.messageTooLong(LIMITS.message.max);

  return Object.keys(errors).length > 0 ? { ok: false, errors } : { ok: true, data };
}
