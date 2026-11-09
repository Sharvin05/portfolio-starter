import { profile } from "./profile";

/** Site-wide settings: domain, language and per-page metadata. */
export const site = {
  /** Your domain, without https:// (canonical URLs, the contact email subject). */
  domain: "example.com",
  /** Language and region for link previews (Open Graph), e.g. "en_GB". */
  locale: "en_US",
  /** Page language (the <html lang> attribute). */
  language: "en",
  /** Short name for the home-screen app icon. */
  shortName: "Alex",
  title: `${profile.name} — ${profile.role}`,
  description: `${profile.name}, ${profile.role} building web and mobile apps.`,
} as const;
