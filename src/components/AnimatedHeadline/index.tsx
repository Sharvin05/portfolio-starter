"use client";

import { motion, useReducedMotion } from "motion/react";
import type { HeadlinePart } from "@content";
import { cx } from "@/lib/cx";
import { word, wordsContainer } from "@/lib/motion";
import styles from "./styles.module.scss";

interface AnimatedHeadlineProps {
  parts: readonly HeadlinePart[];
  as?: "h1" | "h2";
  className?: string;
  id?: string;
  /** Animate on mount (hero) or when scrolled into view (sections). */
  trigger?: "mount" | "inView";
}

export function AnimatedHeadline({ parts, as = "h1", className, id, trigger = "mount" }: AnimatedHeadlineProps) {
  const reduce = useReducedMotion();
  const Tag = as === "h1" ? motion.h1 : motion.h2;
  const words = parts.flatMap((part) => part.text.split(" ").map((text) => ({ text, highlight: part.highlight ?? false })));
  const play = trigger === "mount" ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount: 0.5 } };

  return (
    <Tag id={id} className={className} variants={wordsContainer} initial={reduce ? false : "hidden"} {...play}>
      {words.map((w, i) => (
        <span key={i}>
          <motion.span className={cx(styles.word, w.highlight && styles.highlight)} variants={word}>
            {w.text}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
