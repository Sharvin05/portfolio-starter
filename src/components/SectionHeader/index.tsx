"use client";

import { motion, useReducedMotion } from "motion/react";
import type { HeadlinePart } from "@content";
import { AnimatedHeadline } from "@/components/AnimatedHeadline";
import { cx } from "@/lib/cx";
import { fadeUp } from "@/lib/motion";
import styles from "./styles.module.scss";

interface SectionHeaderProps {
  id: string;
  kicker: string;
  title: readonly HeadlinePart[];
  lede: string;
  /** 1 = page headline (h1, plays on load), 2 = section headline (h2, plays on scroll). */
  level?: 1 | 2;
}

export function SectionHeader({ id, kicker, title, lede, level = 2 }: SectionHeaderProps) {
  const reduce = useReducedMotion();
  const initial = reduce ? false : "hidden";
  const page = level === 1;
  // Page headers play on load; section headers when scrolled into view
  const play = page ? { animate: "show" } : { whileInView: "show", viewport: { once: true } };
  return (
    <div className={cx(styles.root, page && styles.page)}>
      <motion.span className={styles.kicker} variants={fadeUp} initial={initial} {...play}>
        {kicker}
      </motion.span>
      <AnimatedHeadline
        as={page ? "h1" : "h2"}
        id={id}
        className={cx(styles.title, page && styles.pageTitle)}
        parts={title}
        trigger={page ? "mount" : "inView"}
      />
      <motion.p className={styles.lede} variants={fadeUp} initial={initial} {...play} custom={page ? 0.5 : 0.3}>
        {lede}
      </motion.p>
    </div>
  );
}
