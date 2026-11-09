"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { InterestsPage } from "@content";
import { Photo } from "@/components/Photo";
import { SectionHeader } from "@/components/SectionHeader";
import styles from "./styles.module.scss";

type DrivingMomentProps = InterestsPage["driving"] & { id: string };

/** The page's moment: the road photo opens out to full width as it scrolls into view. */
export function DrivingMoment({ id, kicker, title, lede, photo, columns }: DrivingMomentProps) {
  const frame = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start end", "center center"] });
  const frameScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.86, 1]);
  const photoScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.18, 1]);
  const titleId = `${id}-title`;

  return (
    <section className={styles.root} id={id} aria-labelledby={titleId}>
      <SectionHeader id={titleId} kicker={kicker} title={title} lede={lede} />
      {photo && (
        <motion.div ref={frame} className={styles.frame} style={{ scale: frameScale }}>
          <motion.div className={styles.photo} style={{ scale: photoScale }}>
            <Photo photo={photo} sizes="100vw" />
          </motion.div>
        </motion.div>
      )}
      <div className={styles.columns}>
        {columns.map((column) => (
          <div key={column.label}>
            <h3 className={styles.label}>{column.label}</h3>
            <ul className={styles.list}>
              {column.items.map((item) => (
                <li key={item} className={styles.item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
