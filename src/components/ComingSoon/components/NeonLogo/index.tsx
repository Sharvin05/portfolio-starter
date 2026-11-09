"use client";

import { profile, ui } from "@content";
import { useEffect, useState } from "react";
import { motion, useReducedMotion, useSpring } from "motion/react";
import { BrandMark } from "@/components/BrandMark";
import styles from "./styles.module.scss";

const MAX_TILT_Y = 14; // degrees
const MAX_TILT_X = 9;
const spring = { stiffness: 90, damping: 18, mass: 0.8 };

/** Large logo mark that leans slightly toward the cursor. Click (or Enter) fires the trail again. */
export function NeonLogo() {
  const reduce = useReducedMotion() ?? false;
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);
  const [fireSignal, setFireSignal] = useState(0);

  useEffect(() => {
    if (reduce || !matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      rotateY.set((e.clientX / innerWidth - 0.5) * 2 * MAX_TILT_Y);
      rotateX.set(-(e.clientY / innerHeight - 0.5) * 2 * MAX_TILT_X);
    };
    addEventListener("pointermove", onMove);
    return () => removeEventListener("pointermove", onMove);
  }, [reduce, rotateX, rotateY]);

  const fire = () => setFireSignal((n) => n + 1);

  return (
    <motion.button
      type="button"
      className={styles.root}
      aria-label={ui.comingSoon.logoLabel(profile.name)}
      onClick={fire}
      whileHover={reduce ? undefined : { scale: 1.03 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      <motion.div className={styles.tilt} style={{ rotateX, rotateY }}>
        <BrandMark size="xl" glow fireSignal={fireSignal} />
      </motion.div>
    </motion.button>
  );
}
