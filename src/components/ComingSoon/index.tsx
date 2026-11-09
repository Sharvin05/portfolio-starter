"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ComingSoonCopy } from "@content";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/Button";
import { ease, fadeUp } from "@/lib/motion";
import { NeonLogo } from "./components/NeonLogo";
import styles from "./styles.module.scss";

interface ComingSoonProps {
  copy: ComingSoonCopy;
}

/** Placeholder page for sections that aren't ready yet, with the animated logo mark. */
export function ComingSoon({ copy }: ComingSoonProps) {
  const reduce = useReducedMotion();
  const initial = reduce ? false : "hidden";
  return (
    <section className={styles.root} id="top" aria-labelledby="coming-soon-title">
      <div className={styles.copy}>
        <SectionHeader level={1} id="coming-soon-title" kicker={copy.kicker} title={copy.title} lede={copy.lede} />
        <motion.div className={styles.actions} variants={fadeUp} initial={initial} animate="show" custom={0.6}>
          <Button href={copy.primary.href} variant="primary">{copy.primary.label}</Button>
          <Button href={copy.secondary.href} variant="ghost" icon="arrow-up">{copy.secondary.label}</Button>
        </motion.div>
      </div>
      <motion.div
        className={styles.visual}
        initial={reduce ? false : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.3, ease }}
      >
        <NeonLogo />
        <p className={styles.hint}>{copy.hint}</p>
      </motion.div>
    </section>
  );
}
