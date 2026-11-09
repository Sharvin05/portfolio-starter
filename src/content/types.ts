/** Year and month, e.g. "2022-09". */
export type YearMonth = `${number}-${number}`;

export type EmploymentType = "Full-time" | "Internship";

export interface Role {
  id: string;
  title: string;
  company: string;
  url?: string;
  location: string;
  type: EmploymentType;
  start: YearMonth;
  end: YearMonth | "present";
  /** Big label in the sticky timeline, e.g. "2022 — Now". */
  yearsLabel: string;
  bullets: string[];
  tags: string[];
  /** Optional divider shown above this card, e.g. "Before software". */
  era?: string;
}

export type SocialIcon = "linkedin" | "github" | "instagram";

export interface SocialLink {
  label: string;
  href: string;
  display: string;
  icon: SocialIcon;
}

export type FactIcon = "route" | "code" | "plug" | "server" | "database" | "chart";

/** One capability in the hero row: a short title and the tools behind it. */
export interface Fact {
  icon: FactIcon;
  title: string;
  detail: string;
}

/** Headline split into parts so single words can be highlighted. */
export interface HeadlinePart {
  text: string;
  highlight?: boolean;
}

export interface NavItem {
  label: string;
  /** "/#section" for a section on the home page, "/page" for another page. */
  href: `/${string}`;
}

/** An imported image (`import shot from "./shot.jpg"`), so Next.js knows its size and can optimise it. */
export interface ContentImage {
  src: string;
  width: number;
  height: number;
  blurDataURL?: string;
}

/** What the card's window shows: a screenshot, or terminal commands that type themselves in. */
export type ProjectPreview =
  | { type: "image"; image: ContentImage; alt: string }
  | { type: "terminal"; title: string; lines: string[]; /** Shown once the commands finish, e.g. "Ready on http://localhost:3000". */ result?: string };

export interface ProjectLink {
  label: string;
  href: string;
  /** Icon after the label; defaults to an up-right arrow. */
  icon?: "github" | "send";
}

export interface Project {
  id: string;
  title: string;
  /** Small label above the title, e.g. "End to end" or "Side project". */
  kind: string;
  summary: string;
  /** Shown in the window's address bar. */
  url: string;
  /** Without one, the window shows the project's address. */
  preview?: ProjectPreview;
  /** Highlighted note next to the kind, e.g. "Open to collaborators". */
  note?: string;
  /** The first link is the main button. */
  links: [ProjectLink, ...ProjectLink[]];
}

export interface SkillCategory {
  id: string;
  label: string;
  blurb: string;
  skills: string[];
}

export type SubjectIcon = "cpu" | "bot" | "sigma" | "cog";

export interface SubjectGroup {
  id: string;
  title: string;
  icon: SubjectIcon;
  subjects: string[];
}

export interface Degree {
  title: string;
  college: { name: string; url: string };
  /** Awarding university. */
  institution: string;
  location: string;
  /** e.g. { value: "7.0", scale: "10", label: "CGPA" } */
  grade: { value: string; scale: string; label: string };
  startYear: number;
  endYear: number;
}

/** Who took a photo and under which licence, listed under "Photo Credits" in the footer. */
export interface PhotoCredit {
  author: string;
  /** e.g. "CC BY-SA 4.0" or "Public domain". */
  licence: string;
  /** The photo's own page, e.g. on Wikimedia Commons. */
  source: string;
  licenceUrl?: string;
}

/** A photograph with its alt text and, for licensed photos, its credit. */
export interface Photo {
  image: ContentImage;
  alt: string;
  credit?: PhotoCredit;
  /** The part to keep in view when the frame crops the photo (CSS object-position), e.g. "center top". */
  focus?: string;
}

/** Kicker, headline and intro line at the top of a section. */
export interface SectionIntro {
  kicker: string;
  title: HeadlinePart[];
  lede: string;
}

export interface InterestCard {
  id: string;
  title: string;
  detail: string;
  photo?: Photo;
}

export interface Game {
  title: string;
  /** Short label above the title, e.g. "Racing". */
  genre: string;
}

/** The /interests page. */
export interface InterestsPage {
  meta: { title: string; description: string };
  intro: SectionIntro;
  /** The driving section: one big photo and two short lists (e.g. "In the sim" and "On the road"). */
  driving: SectionIntro & { photo?: Photo; columns: { label: string; items: string[] }[] };
  sports: SectionIntro & { items: InterestCard[] };
  games: SectionIntro & { items: Game[] };
  /** The first card is shown wide. */
  loves: SectionIntro & { items: InterestCard[] };
  /** Heading above the contact form at the bottom of the page. */
  close: SectionIntro;
}

/** The card on the home page that links to the /interests page. */
export interface InterestsTeaser extends SectionIntro {
  tags: string[];
  cta: { label: string; href: `/${string}` };
  photo?: Photo;
}
