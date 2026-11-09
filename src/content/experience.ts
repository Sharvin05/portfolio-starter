import type { HeadlinePart, Role } from "./types";

export const experienceIntro = {
  kicker: "Experience",
  title: [{ text: "Shipping Products for" }, { text: "Real", highlight: true }, { text: "People." }] satisfies HeadlinePart[],
  lede: "A few years building web and mobile products, from first commit to production.",
} as const;

/**
 * Jobs, current role first. Dates are "YYYY-MM"; use "present" for an ongoing role.
 * `era` adds a divider above a card (e.g. "Before Software").
 */
export const roles: Role[] = [
  {
    id: "northwind",
    title: "Senior Full Stack Engineer",
    company: "Northwind Labs",
    url: "https://example.com",
    location: "Remote",
    type: "Full-time",
    start: "2023-04",
    end: "present",
    yearsLabel: "2023 — Now",
    bullets: [
      "Lead development of the customer web app and its React Native companion.",
      "Designed the real-time sync layer used by every client.",
      "Mentor two engineers and run weekly code reviews.",
    ],
    tags: ["Next.js", "React Native", "TypeScript", "PostgreSQL"],
  },
  {
    id: "acme",
    title: "Full Stack Developer",
    company: "Acme Studio",
    location: "Lisbon, Portugal",
    type: "Full-time",
    start: "2021-02",
    end: "2023-03",
    yearsLabel: "2021 — 2023",
    bullets: [
      "Built client websites and dashboards end to end.",
      "Integrated payments and third-party APIs.",
    ],
    tags: ["React", "Node.js", "Stripe"],
  },
  {
    id: "contoso",
    title: "Junior Developer",
    company: "Contoso",
    location: "Lisbon, Portugal",
    type: "Internship",
    start: "2020-06",
    end: "2020-12",
    yearsLabel: "2020",
    bullets: ["Built reusable UI components and internal tools."],
    tags: ["JavaScript", "CSS"],
    era: "First Steps",
  },
];
