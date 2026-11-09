"use client";

import { ui } from "@content";
import { forwardRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Theme } from "@/lib/theme/themes";
import { ThemeSwatch } from "../ThemeSwatch";
import styles from "./styles.module.scss";

interface ThemeTriggerProps {
  theme: Theme;
  open: boolean;
  menuId: string;
  onToggle: () => void;
}

const spring = { type: "spring", stiffness: 420, damping: 26 } as const;

export const ThemeTrigger = forwardRef<HTMLButtonElement, ThemeTriggerProps>(function ThemeTrigger({ theme, open, menuId, onToggle }, ref) {
  return (
    <motion.button
      ref={ref}
      type="button"
      className={styles.root}
      aria-label={ui.theme.triggerLabel(theme.label)}
      aria-haspopup="menu"
      aria-expanded={open}
      aria-controls={menuId}
      onClick={onToggle}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.92 }}
      transition={spring}
    >
      {/* The swatch rolls in when the theme changes */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={theme.id}
          initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
          transition={spring}
        >
          <ThemeSwatch bg={theme.swatch.bg} accent={theme.swatch.accent} size="sm" />
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
});
