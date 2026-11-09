"use client";

import { ui } from "@content";
import { useEffect, useId, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMotionPaused } from "@/lib/motionPause";
import { revealThemeChange } from "@/lib/theme/reveal";
import { THEMES, type ThemeId } from "@/lib/theme/themes";
import { useTheme } from "@/lib/theme/useTheme";
import { MotionToggle } from "./components/MotionToggle";
import { ThemeOption } from "./components/ThemeOption";
import { ThemeTrigger } from "./components/ThemeTrigger";
import styles from "./styles.module.scss";

const menuVariants = {
  hidden: { opacity: 0, scale: 0.9, y: -6, filter: "blur(4px)" },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 420, damping: 32, staggerChildren: 0.04, delayChildren: 0.04 },
  },
  exit: { opacity: 0, scale: 0.94, y: -4, filter: "blur(2px)", transition: { duration: 0.15 } },
} as const;

export function ThemeSwitcher() {
  const reduce = useReducedMotion() ?? false;
  const [themeId, setTheme] = useTheme();
  const [open, setOpen] = useState(false);
  const [motionPaused, setMotionPaused] = useMotionPaused();
  const menuId = useId();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const options = useRef<Array<HTMLButtonElement | null>>([]);
  const current = THEMES.find((t) => t.id === themeId) ?? THEMES[0];

  // Close on outside click or Escape; focus the selected option when opening
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (e.target instanceof Node && !root.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    const selected = THEMES.findIndex((t) => t.id === themeId);
    requestAnimationFrame(() => options.current[selected]?.focus());
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
    // Focus only when the menu opens, not on every theme change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const choose = (id: ThemeId, e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) => {
    if (id === themeId) {
      setOpen(false);
      return;
    }
    // Grow the new theme out from the clicked option (keyboard: from its centre)
    const box = e.currentTarget.getBoundingClientRect();
    const origin = "clientX" in e && e.clientX ? { x: e.clientX, y: e.clientY } : { x: box.left + box.width / 2, y: box.top + box.height / 2 };
    revealThemeChange(() => setTheme(id), origin);
    setTimeout(() => setOpen(false), reduce ? 0 : 260);
  };

  // Arrow keys move between options; Home and End jump to the ends
  const onOptionKey = (index: number) => (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = THEMES.length - 1;
    const next = e.key === "ArrowDown" ? (index === last ? 0 : index + 1) : e.key === "ArrowUp" ? (index === 0 ? last : index - 1) : e.key === "Home" ? 0 : e.key === "End" ? last : null;
    if (next === null) return;
    e.preventDefault();
    options.current[next]?.focus();
  };

  return (
    <div ref={root} className={styles.root}>
      <ThemeTrigger ref={trigger} theme={current} open={open} menuId={menuId} onToggle={() => setOpen((o) => !o)} />
      <AnimatePresence>
        {open ? (
          <motion.div
            id={menuId}
            role="menu"
            aria-label={ui.theme.menuLabel}
            className={styles.menu}
            variants={menuVariants}
            initial={reduce ? false : "hidden"}
            animate="show"
            exit={reduce ? undefined : "exit"}
          >
            <p className={styles.heading}>{ui.theme.heading}</p>
            <div className={styles.list}>
              {THEMES.map((t, i) => (
                <ThemeOption
                  key={t.id}
                  ref={(el) => {
                    options.current[i] = el;
                  }}
                  theme={t}
                  selected={t.id === themeId}
                  onSelect={(e) => choose(t.id, e)}
                  onKeyDown={onOptionKey(i)}
                />
              ))}
            </div>
            <div className={styles.divider} />
            <MotionToggle paused={motionPaused} onChange={setMotionPaused} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
