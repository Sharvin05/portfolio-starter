import type { HeadlinePart, SkillCategory } from "./types";

export const skillsIntro = {
  kicker: "Skills",
  title: [{ text: "The Stack Behind the" }, { text: "Work.", highlight: true }] satisfies HeadlinePart[],
  lede: "What I use day to day across web, mobile and backend. Drag the sphere to spin it.",
} as const;

/** Skill groups: the category buttons, the panel and the 3D sphere all read from here. */
export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    blurb: "Interfaces for the web, from component systems to state management.",
    skills: ["React", "Next.js", "TypeScript", "HTML", "CSS", "Redux"],
  },
  {
    id: "mobile",
    label: "Mobile",
    blurb: "Cross-platform iOS and Android apps.",
    skills: ["React Native", "Expo"],
  },
  {
    id: "backend",
    label: "Backend and Data",
    blurb: "APIs, databases and real-time features behind the apps.",
    skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "WebSockets"],
  },
  {
    id: "tools",
    label: "Tools",
    blurb: "Delivery, payments and the services around the code.",
    skills: ["Git", "CI/CD", "AWS", "Stripe", "Figma"],
  },
];
