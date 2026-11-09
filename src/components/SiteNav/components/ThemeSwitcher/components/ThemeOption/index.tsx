"use client";

import { forwardRef, type KeyboardEvent, type MouseEvent } from "react";
import { motion } from "motion/react";
import { Icon } from "@/components/Icon";
import type { Theme } from "@/lib/theme/themes";
import { ThemeSwatch } from "../ThemeSwatch";
import styles from "./styles.module.scss";

interface ThemeOptionProps {
  theme: Theme;
  selected: boolean;
  onSelect: (e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => void;
}

export const optionVariants = {
  hidden: { opacity: 0, x: 8 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 380, damping: 30 } },
} as const;

export const ThemeOption = forwardRef<HTMLButtonElement, ThemeOptionProps>(function ThemeOption({ theme, selected, onSelect, onKeyDown }, ref) {
  return (
    <motion.button
      ref={ref}
      type="button"
      role="menuitemradio"
      aria-checked={selected}
      tabIndex={selected ? 0 : -1}
      className={styles.root}
      onClick={onSelect}
      onKeyDown={onKeyDown}
      variants={optionVariants}
      whileTap={{ scale: 0.97 }}
    >
      {selected ? (
        <motion.span layoutId="theme-option-indicator" className={styles.indicator} transition={{ type: "spring", stiffness: 500, damping: 38 }} />
      ) : null}
      <ThemeSwatch bg={theme.swatch.bg} accent={theme.swatch.accent} />
      <span className={styles.text}>
        <span className={styles.label}>{theme.label}</span>
        <span className={styles.mode}>{theme.mode}</span>
      </span>
      {selected ? (
        <motion.span className={styles.check} initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 500, damping: 22 }}>
          <Icon name="check" size={16} />
        </motion.span>
      ) : null}
    </motion.button>
  );
});
