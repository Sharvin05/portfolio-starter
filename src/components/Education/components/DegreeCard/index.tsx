"use client";

import { ui } from "@content";
import type { PointerEvent } from "react";
import { motion, useReducedMotion, useSpring } from "motion/react";
import type { Degree } from "@content";
import { Icon } from "@/components/Icon";
import { linkProps } from "@/lib/links";
import { ease } from "@/lib/motion";
import styles from "./styles.module.scss";

interface DegreeCardProps {
  degree: Degree;
  subjectCount: number;
}

const SPRING = { stiffness: 120, damping: 18 };

export function DegreeCard({ degree, subjectCount }: DegreeCardProps) {
  const reduce = useReducedMotion() ?? false;
  const rotateX = useSpring(0, SPRING);
  const rotateY = useSpring(0, SPRING);

  // Leans toward the cursor while hovered
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const box = e.currentTarget.getBoundingClientRect();
    rotateY.set(((e.clientX - box.left) / box.width - 0.5) * 8);
    rotateX.set(-((e.clientY - box.top) / box.height - 0.5) * 8);
  };
  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      className={styles.root}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease }}
    >
      <span className={styles.badge}>
        <Icon name="graduation" size={22} />
      </span>
      <div className={styles.years}>
        {degree.startYear} <span className={styles.dash}>—</span> {degree.endYear}
      </div>
      <div>
        <h3 className={styles.title}>{degree.title}</h3>
        <a className={styles.college} href={degree.college.url} {...linkProps(degree.college.url)}>
          {degree.college.name}
          <Icon name="arrow-up-right" size={14} className={styles.collegeIcon} />
        </a>
        <p className={styles.institution}>
          {degree.location} {ui.experience.metaSeparator} {ui.education.affiliatedTo} {degree.institution}
        </p>
      </div>
      <div className={styles.stats}>
        <div>
          <div className={styles.statValue}>{degree.endYear - degree.startYear}</div>
          <div className={styles.statLabel}>{ui.education.yearsLabel}</div>
        </div>
        <div>
          <div className={styles.statValue}>
            {degree.grade.value}
            <span className={styles.statScale}> / {degree.grade.scale}</span>
          </div>
          <div className={styles.statLabel}>{degree.grade.label}</div>
        </div>
        <div>
          <div className={styles.statValue}>{subjectCount}</div>
          <div className={styles.statLabel}>{ui.education.subjectsLabel}</div>
        </div>
      </div>
    </motion.div>
  );
}
