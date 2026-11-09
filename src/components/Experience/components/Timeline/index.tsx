"use client";

import type { CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Role } from "@content";
import { ease } from "@/lib/motion";
import { RailItem } from "./components/RailItem";
import styles from "./styles.module.scss";

interface TimelineProps {
  roles: readonly Role[];
  active: number;
  onSelect: (index: number) => void;
}

type RailStyle = CSSProperties & { "--fill": string };

const pad = (n: number) => String(n).padStart(2, "0");

export function Timeline({ roles, active, onSelect }: TimelineProps) {
  const current = roles[active] ?? roles[0];
  if (!current) return null;
  const railStyle: RailStyle = { "--fill": String(active / Math.max(roles.length - 1, 1)) };

  return (
    <aside className={styles.root} aria-hidden="true">
      <div className={styles.count}>
        <b className={styles.countActive}>{pad(active + 1)}</b> / {pad(roles.length)}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease }}
        >
          <div className={styles.years}>{current.yearsLabel}</div>
          <div className={styles.company}>{current.company}</div>
          <div className={styles.role}>{current.title}</div>
        </motion.div>
      </AnimatePresence>
      <ul className={styles.rail} style={railStyle}>
        {roles.map((role, i) => (
          <RailItem key={role.id} company={role.company} year={role.start.slice(0, 4)} active={i === active} onSelect={() => onSelect(i)} />
        ))}
      </ul>
    </aside>
  );
}
