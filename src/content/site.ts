import { profile } from "./profile";

/** Site-wide settings: domain, language and per-page metadata. */
export const site = {
  /** Your domain, without https:// (canonical URLs, the contact email subject). */
  domain: "example.com",
  /** Page language (the <html lang> attribute). */
  language: "en",
  /** Short name for the home-screen app icon. */
  shortName: "Alex",
  title: `${profile.name} — ${profile.role}`,
  description: `${profile.name}, ${profile.role} building web and mobile apps.`,
  pages: {
    work: {
      title: `Work, Coming Soon — ${profile.name}`,
      description: `Case studies of the apps ${profile.name} has built are on the way.`,
    },
  },
} as const;
