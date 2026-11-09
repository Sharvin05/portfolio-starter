"use client";

import { motion } from "motion/react";
import type { NavItem } from "@content";
import { cx } from "@/lib/cx";
import { ease } from "@/lib/motion";
import styles from "./styles.module.scss";

interface MobileMenuLinkProps {
  item: NavItem;
  index: number;
  active: boolean;
  onNavigate: () => void;
}

export function MobileMenuLink({ item, index, active, onNavigate }: MobileMenuLinkProps) {
  return (
    <motion.li
      className={styles.item}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05 + index * 0.06, ease }}
    >
      <a
        href={item.href}
        onClick={onNavigate}
        className={cx(styles.link, active ? styles.active : styles.idle)}
        aria-current={active ? "location" : undefined}
      >
        {item.label}
        <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
      </a>
    </motion.li>
  );
}
