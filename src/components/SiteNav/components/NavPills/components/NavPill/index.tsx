"use client";

import { motion } from "motion/react";
import type { NavItem } from "@content";
import { cx } from "@/lib/cx";
import styles from "./styles.module.scss";

interface NavPillProps {
  item: NavItem;
  active: boolean;
}

export function NavPill({ item, active }: NavPillProps) {
  return (
    <a href={item.href} className={cx(styles.root, active ? styles.active : styles.idle)} aria-current={active ? "location" : undefined}>
      {active ? (
        <motion.span layoutId="nav-indicator" className={styles.indicator} transition={{ type: "spring", stiffness: 420, damping: 36 }} />
      ) : null}
      {active ? <span className={styles.dot} /> : null}
      {item.label}
    </a>
  );
}
