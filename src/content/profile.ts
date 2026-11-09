import type { Fact, HeadlinePart, NavItem, SocialLink } from "./types";

/** Who you are. Shown in the hero, the nav logo, the footer and page titles. */
export const profile = {
  name: "Alex Morgan",
  role: "Full Stack Software Engineer",
  /** Big hero headline. Mark one part with `highlight: true` to colour it. */
  headline: [
    { text: "I Build Apps That" },
    { text: "Feel", highlight: true },
    { text: "Effortless." },
  ] satisfies HeadlinePart[],
  lede: "Full Stack Software Engineer. I build web and mobile apps, from idea to launch. Yes, including the boring parts.",
  /** Main button in the hero. */
  cta: { label: "See My Work", href: "/#work" },
} as const;

/** The "Let's Connect" card in the hero, also reused in the phone menu and Contact. */
export const connect = {
  title: "Let's Connect",
  subtitle: "Have an idea? Let's build it, or just say hi.",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/your-handle", display: "linkedin.com/in/your-handle", icon: "linkedin" },
    { label: "GitHub", href: "https://github.com/your-handle", display: "github.com/your-handle", icon: "github" },
    { label: "Instagram", href: "https://www.instagram.com/your-handle", display: "instagram.com/your-handle", icon: "instagram" },
  ] satisfies SocialLink[],
} as const;

/** The capability row at the bottom of the hero. Icons: route, code, server, database, plug, chart. */
export const facts: Fact[] = [
  { icon: "route", title: "Planning and Architecture", detail: "System design, data models and roadmaps" },
  { icon: "code", title: "Frontends", detail: "React, Next.js, React Native" },
  { icon: "server", title: "Backend", detail: "Node.js, Express" },
  { icon: "database", title: "Databases", detail: "PostgreSQL, MongoDB" },
  { icon: "plug", title: "Integrations", detail: "AWS, Stripe, CI/CD" },
  { icon: "chart", title: "Analytics", detail: "Google Analytics, PostHog" },
];

/** Top navigation. "/#id" scrolls to a section on the home page; "/page" opens a page. */
export const nav: NavItem[] = [
  { label: "About", href: "/#" },
  { label: "Experience", href: "/#experience" },
  { label: "Work", href: "/#work" },
  { label: "Skills", href: "/#skills" },
  { label: "Education", href: "/#education" },
  { label: "Interests", href: "/interests" },
  { label: "Contact", href: "/#contact" },
];
