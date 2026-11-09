import { defaultThemeId, themes, type Theme, type ThemeId, type ThemeTokens } from "@content";

/** Themes are defined in packages/content/src/themes.ts; this file turns them into CSS and helpers. */
export const THEMES = themes;
export type { Theme, ThemeId };
export const DEFAULT_THEME: ThemeId = defaultThemeId;
export const THEME_STORAGE_KEY = "theme";

export function isThemeId(value: unknown): value is ThemeId {
  return THEMES.some((t) => t.id === value);
}

export function getTheme(id: ThemeId): Theme {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}

// Token name → CSS custom property (fgSoft → --fg-soft, glMist → --gl-mist)
const cssVar = (key: string) => `--${key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`;

function declarations(theme: Theme): string {
  const tokens: ThemeTokens = theme.tokens;
  const vars = Object.entries(tokens).map(([key, value]) => `${cssVar(key)}:${String(value)};`);
  return `color-scheme:${theme.colorScheme};${vars.join("")}`;
}

/** CSS for every theme; the default theme also applies to :root. */
export const themeCss = THEMES.map((theme) => {
  const selector = theme.id === DEFAULT_THEME ? `:root,[data-theme="${theme.id}"]` : `[data-theme="${theme.id}"]`;
  return `${selector}{${declarations(theme)}}`;
}).join("");

/**
 * Runs before the page paints so a returning visitor never sees the wrong theme flash.
 * Kept tiny and dependency-free because it's inlined into <head>.
 */
export const themeInitScript = `try{var c=${JSON.stringify(
  Object.fromEntries(THEMES.map((t) => [t.id, t.tokens.canvas])),
)},t=localStorage.getItem("${THEME_STORAGE_KEY}");if(c[t]){document.documentElement.dataset.theme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",c[t])}}catch(e){}`;
