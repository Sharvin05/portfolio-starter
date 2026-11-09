"use client";

import { motion } from "motion/react";
import { BrandMark } from "@/components/BrandMark";
import styles from "./styles.module.scss";

interface BrandLogoProps {
  name: string;
  size?: "sm" | "md";
  showWordmark?: boolean;
  drawIn?: boolean;
}

/** Logo mark plus the name as a wordmark. Hovering replays the light trail. */
export function BrandLogo({ name, size = "sm", showWordmark = true, drawIn = true }: BrandLogoProps) {
  return (
    <motion.span className={styles.root} whileHover="hover">
      <BrandMark size={size} drawIn={drawIn} />
      {showWordmark ? <span className={styles.wordmark} translate="no">{name}</span> : null}
    </motion.span>
  );
}
