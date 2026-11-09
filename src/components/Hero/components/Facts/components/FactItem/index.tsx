"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Fact } from "@content";
import { Icon } from "@/components/Icon";
import { cx } from "@/lib/cx";
import { fadeUp } from "@/lib/motion";
import styles from "./styles.module.scss";

interface FactItemProps {
  fact: Fact;
  index: number;
  active: boolean;
  onHover: () => void;
}

export function FactItem({ fact, index, active, onHover }: FactItemProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cx(styles.root, active ? styles.active : styles.idle)}
      onMouseEnter={onHover}
      variants={fadeUp}
      initial={reduce ? false : "hidden"}
      animate="show"
      custom={0.9 + index * 0.06}
    >
      <Icon name={fact.icon} />
      <span className={cx(styles.title, active ? styles.titleActive : styles.titleIdle)}>{fact.title}</span>
      <span className={styles.detail} translate="no">{fact.detail}</span>
    </motion.div>
  );
}
