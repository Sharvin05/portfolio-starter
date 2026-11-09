"use client";

import { ui } from "@content";
import { useEffect } from "react";
import { motion, useReducedMotion, useSpring } from "motion/react";
import type { SocialLink as SocialLinkData } from "@content";
import { ease } from "@/lib/motion";
import { SocialLink } from "@/components/SocialLink";
import styles from "./styles.module.scss";

interface ConnectCardProps {
  title: string;
  subtitle: string;
  links: readonly SocialLinkData[];
}

export function ConnectCard({ title, subtitle, links }: ConnectCardProps) {
  const reduce = useReducedMotion() ?? false;

  // Card leans toward the cursor
  const rotateX = useSpring(0, { stiffness: 80, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 80, damping: 20 });
  useEffect(() => {
    if (reduce || !matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      rotateY.set((e.clientX / innerWidth - 0.5) * 10);
      rotateX.set(-(e.clientY / innerHeight - 0.5) * 8);
    };
    addEventListener("pointermove", onMove);
    return () => removeEventListener("pointermove", onMove);
  }, [reduce, rotateX, rotateY]);

  return (
    <motion.aside
      className={styles.root}
      aria-label={ui.hero.connectLabel}
      initial={reduce ? false : { opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.6, ease }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
    >
      <div className={styles.grab} />
      <div className={styles.head}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      <div className={styles.list}>
        {links.map((link) => (
          <SocialLink key={link.href} link={link} />
        ))}
      </div>
    </motion.aside>
  );
}
