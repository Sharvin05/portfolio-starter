import { ease } from "@/lib/motion";

interface Point {
  x: number;
  y: number;
}

/**
 * Applies a theme change as a circle that grows from `origin` across the screen.
 * Falls back to an instant switch (the page's colour transitions still soften it)
 * when the browser lacks View Transitions or the visitor prefers reduced motion.
 */
export function revealThemeChange(apply: () => void, origin: Point): void {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || typeof document.startViewTransition !== "function") {
    apply();
    return;
  }
  const radius = Math.hypot(Math.max(origin.x, innerWidth - origin.x), Math.max(origin.y, innerHeight - origin.y));
  const transition = document.startViewTransition(apply);
  transition.ready
    .then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${origin.x}px ${origin.y}px)`, `circle(${radius}px at ${origin.x}px ${origin.y}px)`] },
        { duration: 700, easing: `cubic-bezier(${ease.join(",")})`, pseudoElement: "::view-transition-new(root)" },
      );
    })
    .catch(() => {
      // Transition skipped (e.g. tab hidden); the theme is already applied
    });
}
