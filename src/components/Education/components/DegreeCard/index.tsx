"use client";

import { ui } from "@content";
import { motion, useReducedMotion } from "motion/react";
import type { Degree } from "@content";
import { Icon } from "@/components/Icon";
import { linkProps } from "@/lib/links";
import { ease } from "@/lib/motion";
import styles from "./styles.module.scss";

interface DegreeCardProps {
  degree: Degree;
  subjectCount: number;
}

export function DegreeCard({ degree, subjectCount }: DegreeCardProps) {
  const reduce = useReducedMotion() ?? false;

  return (
    <motion.div
      className={styles.root}
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
