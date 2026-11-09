"use client";

import { motion, useReducedMotion } from "motion/react";
import type { SubjectGroup } from "@content";
import { Icon } from "@/components/Icon";
import { TagList } from "@/components/TagList";
import { cx } from "@/lib/cx";
import { HOVER_GROUP } from "@/lib/hoverGroup";
import { ease } from "@/lib/motion";
import styles from "./styles.module.scss";

interface SubjectGroupCardProps {
  group: SubjectGroup;
  index: number;
}

export function SubjectGroupCard({ group, index }: SubjectGroupCardProps) {
  const reduce = useReducedMotion() ?? false;
  return (
    <motion.article
      className={cx(styles.root, HOVER_GROUP)}
      initial={reduce ? false : { opacity: 0, y: 40, rotateX: 12 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: (index % 2) * 0.1, ease }}
      style={{ transformPerspective: 1000 }}
    >
      <div className={styles.head}>
        <span className={styles.icon}>
          <Icon name={group.icon} />
        </span>
        <h3 className={styles.title}>{group.title}</h3>
        <span className={styles.count}>{group.subjects.length}</span>
      </div>
      <TagList tags={group.subjects} />
    </motion.article>
  );
}
