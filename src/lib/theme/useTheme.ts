"use client";

import { useCallback, useEffect, useState } from "react";
import { DEFAULT_THEME, isThemeId, THEME_STORAGE_KEY, type ThemeId } from "./themes";

function currentTheme(): ThemeId {
  const value = document.documentElement.dataset.theme;
  return isThemeId(value) ? value : DEFAULT_THEME;
}

/** Active theme plus a setter. Every component using it stays in sync with <html data-theme>. */
export function useTheme(): [ThemeId, (theme: ThemeId) => void] {
  const [theme, setThemeState] = useState<ThemeId>(DEFAULT_THEME);

  useEffect(() => {
    setThemeState(currentTheme());
    const observer = new MutationObserver(() => setThemeState(currentTheme()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const setTheme = useCallback((next: ThemeId) => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be blocked (private mode); the theme still applies for this visit
    }
    const canvas = getComputedStyle(document.documentElement).getPropertyValue("--canvas").trim();
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", canvas);
  }, []);

  return [theme, setTheme];
}
