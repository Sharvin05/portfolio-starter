"use client";

import { ui } from "@content";
import { motion, useReducedMotion } from "motion/react";
import type { HeadlinePart } from "@content";
import { AnimatedHeadline } from "@/components/AnimatedHeadline";
import { fadeUp } from "@/lib/motion";
import { Button } from "@/components/Button";
import styles from "./styles.module.scss";

interface HeroIntroProps {
  name: string;
  role: string;
  headline: readonly HeadlinePart[];
  lede: string;
  cta: { label: string; href: string };
}

export function HeroIntro({ name, role, headline, lede, cta }: HeroIntroProps) {
  const reduce = useReducedMotion();
  const initial = reduce ? false : "hidden";
  return (
    <div className={styles.root}>
      <motion.div className={styles.eyebrow} variants={fadeUp} initial={initial} animate="show" custom={0.5}>
        <span className={styles.dot} />
        {ui.hero.greeting(name, role)}
      </motion.div>
      <AnimatedHeadline parts={headline} className={styles.title} />
      <div className={styles.row}>
        <motion.p className={styles.lede} variants={fadeUp} initial={initial} animate="show" custom={0.6}>
          {lede}
        </motion.p>
        <motion.div className={styles.ctas} variants={fadeUp} initial={initial} animate="show" custom={0.7}>
          <Button href={cta.href} variant="primary">
            {cta.label}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
