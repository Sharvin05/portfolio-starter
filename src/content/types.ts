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

export interface ComingSoonCopy {
  kicker: string;
  title: HeadlinePart[];
  lede: string;
  hint: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
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
