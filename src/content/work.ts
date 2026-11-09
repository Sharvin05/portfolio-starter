import type { HeadlinePart, Project } from "./types";

export const workIntro = {
  kicker: "Work",
  title: [{ text: "Things I've" }, { text: "Shipped.", highlight: true }] satisfies HeadlinePart[],
  lede: "Products I built end to end, a team project I'm proud of, and a few experiments of my own.",
} as const;

/**
 * Project cards, in order. For a screenshot, put the image next to this file and import it:
 *   import shot from "./assets/work/my-app.jpg";
 *   preview: { type: "image", image: shot, alt: "My App home page" }
 */
export const projects: Project[] = [
  {
    id: "northwind",
    title: "Northwind Bookings",
    kind: "End to end",
    summary: "A booking platform for small studios: schedules, payments and reminders in one place.",
    url: "https://example.com",
    links: [{ label: "Visit Site", href: "https://example.com" }],
  },
  {
    id: "lumen",
    title: "Lumen Analytics",
    kind: "Collaborated",
    summary: "A dashboard that turns product events into a weekly report the whole team reads.",
    url: "https://example.org",
    links: [{ label: "Visit Site", href: "https://example.org" }],
  },
  {
    id: "pocket-chess",
    title: "Pocket Chess",
    kind: "Side project",
    summary: "A two-player chess game that runs entirely in the browser, with no accounts and no server.",
    url: "https://example.net",
    note: "Open to collaborators",
    links: [
      { label: "Play Now", href: "https://example.net" },
      { label: "Let's Collaborate", href: "/#contact", icon: "send" },
    ],
  },
  {
    id: "portfolio-starter",
    title: "Portfolio Starter",
    kind: "Open source",
    summary: "This website as a free template. Add your details in one folder and have your own site running in minutes.",
    url: "https://github.com/Sharvin05/portfolio-starter",
    preview: {
      type: "terminal",
      title: "Terminal",
      lines: ["git clone https://github.com/Sharvin05/portfolio-starter.git", "cd portfolio-starter", "pnpm install", "pnpm dev"],
      result: "✓ Ready on http://localhost:3000",
    },
    links: [{ label: "View on GitHub", href: "https://github.com/Sharvin05/portfolio-starter", icon: "github" }],
  },
];
