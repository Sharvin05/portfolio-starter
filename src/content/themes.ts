/**
 * Colour themes. Every colour on the site comes from these tokens
 * (the web app turns them into CSS variables), so add, remove or recolour themes here.
 */

export interface ThemeTokens {
  /** Page background. */
  canvas: string;
  /** Slightly lifted background (background gradient, tags). */
  surface: string;
  /** Main text. */
  fg: string;
  /** Secondary text. */
  fgSoft: string;
  /** Brand accent: buttons, highlights, active states. */
  accent: string;
  accentHover: string;
  /** Text on top of the accent colour. */
  onAccent: string;
  /** Positive states (status dot, "message sent"). */
  success: string;
  /** Frosted card fills and borders. */
  glass: string;
  glassStrong: string;
  glassBorder: string;
  /** Hairline dividers. */
  line: string;
  /** 3D background: soft secondary light colour (hex). */
  glMist: string;
  /** 3D background: strength of the accent glow, 0..1. */
  glAccentStrength: number;
  /** 3D background: ribbed-glass effect, 0 (smooth) to 1 (full). */
  glRib: number;
}

export interface ThemeDefinition {
  id: string;
  label: string;
  /** Shown under the label in the theme menu. */
  mode: "Dark" | "Light";
  colorScheme: "dark" | "light";
  /** Preview dot in the theme menu. */
  swatch: { bg: string; accent: string };
  tokens: ThemeTokens;
}

export const themes = [
  {
    id: "coral",
    label: "Navy and Coral",
    mode: "Dark",
    colorScheme: "dark",
    swatch: { bg: "#14213D", accent: "#FF6B5B" },
    tokens: {
      canvas: "#0B1426",
      surface: "#14213D",
      fg: "#F4EDE0",
      fgSoft: "rgb(244 237 224 / 0.72)",
      accent: "#FF6B5B",
      accentHover: "#FF8577",
      onAccent: "#0B1426",
      success: "#5BE49B",
      glass: "rgb(244 237 224 / 0.08)",
      glassStrong: "rgb(244 237 224 / 0.13)",
      glassBorder: "rgb(244 237 224 / 0.16)",
      line: "rgb(244 237 224 / 0.18)",
      glMist: "#808CA8",
      glAccentStrength: 0.78,
      glRib: 1,
    },
  },
  {
    id: "lime",
    label: "Midnight and Lime",
    mode: "Dark",
    colorScheme: "dark",
    swatch: { bg: "#102C40", accent: "#DBFF00" },
    tokens: {
      canvas: "#08192A",
      surface: "#102C40",
      fg: "#F7FAFC",
      fgSoft: "rgb(247 250 252 / 0.72)",
      accent: "#DBFF00",
      accentHover: "#E5FF4D",
      onAccent: "#102C40",
      success: "#5BE49B",
      glass: "rgb(247 250 252 / 0.07)",
      glassStrong: "rgb(247 250 252 / 0.12)",
      glassBorder: "rgb(247 250 252 / 0.15)",
      line: "rgb(247 250 252 / 0.17)",
      glMist: "#5E7A8F",
      glAccentStrength: 0.42,
      glRib: 1,
    },
  },
  {
    id: "paper",
    label: "Paper and Cornflower",
    mode: "Light",
    colorScheme: "light",
    swatch: { bg: "#FFFFFF", accent: "#548CFF" },
    tokens: {
      canvas: "#FFFFFF",
      surface: "#EEF3FB",
      fg: "#050505",
      fgSoft: "rgb(5 5 5 / 0.66)",
      accent: "#548CFF",
      accentHover: "#3F7BFF",
      onAccent: "#050505",
      success: "#15803D",
      glass: "rgb(255 255 255 / 0.55)",
      glassStrong: "rgb(255 255 255 / 0.8)",
      glassBorder: "rgb(5 5 5 / 0.1)",
      line: "rgb(5 5 5 / 0.12)",
      glMist: "#C9D7F2",
      glAccentStrength: 0.4,
      glRib: 0,
    },
  },
] as const satisfies readonly ThemeDefinition[];

export type Theme = (typeof themes)[number];
export type ThemeId = Theme["id"];

/** Theme a first-time visitor sees. */
export const defaultThemeId: ThemeId = "coral";
