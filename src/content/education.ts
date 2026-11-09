import type { Degree, HeadlinePart, SubjectGroup } from "./types";

export const educationIntro = {
  kicker: "Education",
  title: [{ text: "Where It" }, { text: "Started.", highlight: true }] satisfies HeadlinePart[],
  lede: "A computer science degree, and the first projects that made it stick.",
} as const;

export const degree: Degree = {
  title: "B.Sc. Computer Science",
  college: { name: "Example University", url: "https://example.com" },
  institution: "Example University",
  location: "Lisbon, Portugal",
  grade: { value: "3.6", scale: "4", label: "GPA" },
  startYear: 2016,
  endYear: 2020,
};

/** Featured subjects, grouped by theme. Icons: cpu, bot, sigma, cog. */
export const subjectGroups: SubjectGroup[] = [
  { id: "programming", title: "Programming", icon: "cpu", subjects: ["Data Structures", "Algorithms", "Operating Systems"] },
  { id: "systems", title: "Systems", icon: "bot", subjects: ["Computer Networks", "Databases", "Distributed Systems"] },
  { id: "maths", title: "Mathematics", icon: "sigma", subjects: ["Discrete Mathematics", "Linear Algebra", "Statistics"] },
  { id: "product", title: "Product", icon: "cog", subjects: ["Software Engineering", "Human-Computer Interaction"] },
];
