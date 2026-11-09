"use client";

import { AnimatePresence, motion } from "motion/react";
import { TagList } from "@/components/TagList";
import { ease } from "@/lib/motion";
import styles from "./styles.module.scss";

interface SkillPanelProps {
  /** Changes when the category changes, so the content animates in. */
  panelKey: string;
  title: string;
  blurb: string;
  skills: readonly string[];
}

export function SkillPanel({ panelKey, title, blurb, skills }: SkillPanelProps) {
  return (
    <div className={styles.root} aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={panelKey}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease }}
        >
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.blurb}>{blurb}</p>
          <TagList tags={skills} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
