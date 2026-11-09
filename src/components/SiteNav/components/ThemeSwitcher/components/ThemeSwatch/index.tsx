import { cx } from "@/lib/cx";
import styles from "./styles.module.scss";

interface ThemeSwatchProps {
  bg: string;
  accent: string;
  size?: "sm" | "md";
}

/** Theme preview: its background with the accent as a dot. Colours are data, so they're inline. */
export function ThemeSwatch({ bg, accent, size = "md" }: ThemeSwatchProps) {
  return (
    <span className={cx(styles.base, styles[size])} style={{ backgroundColor: bg }} aria-hidden="true">
      <span className={styles.dot} style={{ backgroundColor: accent }} />
    </span>
  );
}
