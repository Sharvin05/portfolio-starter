import type { Variants } from "motion/react";

export const ease = [0.2, 0.7, 0.2, 1] as const;

/** Fade up; pass the delay in seconds through `custom`. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (delay: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay, ease } }),
};

export const wordsContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

export const word: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease } },
};
