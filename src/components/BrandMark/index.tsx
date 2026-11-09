"use client";

import { useId } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { brandMark } from "@content";
import { cx } from "@/lib/cx";
import styles from "./styles.module.scss";

interface BrandMarkProps {
  size?: "sm" | "md" | "xl";
  /** Draw the A in on first load, like the brand loader. */
  drawIn?: boolean;
  /** Soft neon glow around the trail (for large uses). */
  glow?: boolean;
  /** Increase to fire the trail again (e.g. on click). */
  fireSignal?: number;
}

const pen = [0.65, 0, 0.35, 1] as const;
const out = [0.2, 0.7, 0.2, 1] as const;
const TRAIL_DELAY = 1.05; // after both pen strokes

// Legs are written as two pen strokes
const leg: Variants = {
  hidden: { pathLength: 0 },
  shown: (delay: number) => ({ pathLength: 1, transition: { duration: 0.55, delay, ease: pen } }),
};

// The trail shoots out of the left leg
const bar: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  shown: (delay: number) => ({ scaleX: 1, opacity: 1, transition: { delay, type: "spring", stiffness: 260, damping: 18 } }),
  hover: { scaleX: [0.15, 1], opacity: [0.6, 1], transition: { duration: 0.5, ease: out } },
};

// Neon flicker as it fires, then it settles into a steady glow
const halo: Variants = {
  hidden: { opacity: 0, scaleX: 0 },
  shown: (delay: number) => ({
    opacity: [0, 0.9, 0.2, 0.85, 0.35, 0.75],
    scaleX: 1,
    transition: { delay, opacity: { delay, duration: 0.7, times: [0, 0.15, 0.3, 0.5, 0.7, 1] }, scaleX: { delay, type: "spring", stiffness: 260, damping: 18 } },
  }),
  hover: { opacity: [0.5, 1, 0.85], scaleX: [0.15, 1], transition: { duration: 0.55, ease: out } },
};

/**
 * The logo mark. The strokes use the current text colour (so it follows the theme);
 * the trail stays brand coral. Layer order matches the brand: right leg, trail, left leg.
 */
export function BrandMark({ size = "sm", drawIn = true, glow = false, fireSignal = 0 }: BrandMarkProps) {
  const reduce = useReducedMotion() ?? false;
  const filterId = useId();
  const animateIn = drawIn && !reduce;
  // First fire waits for the pen strokes; later fires (clicks) go straight away
  const trailDelay = fireSignal > 0 ? 0 : animateIn ? TRAIL_DELAY : 0;
  const trailInitial = (animateIn || fireSignal > 0) && !reduce ? "hidden" : false;

  const strokeProps = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: brandMark.stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  } as const;

  return (
    <svg viewBox={brandMark.viewBox} className={cx(styles.root, styles[size], glow && styles.aGlow)} aria-hidden="true">
      {glow ? (
        <defs>
          {/* Filter region is in user space and much larger than the trail, so the blur never gets clipped into a box */}
          <filter id={filterId} filterUnits="userSpaceOnUse" x="-40" y="20" width="220" height="100" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="wide" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="tight" />
            <feMerge>
              <feMergeNode in="wide" />
              <feMergeNode in="wide" />
              <feMergeNode in="tight" />
            </feMerge>
          </filter>
        </defs>
      ) : null}
      <g transform={brandMark.transform}>
        <motion.path d={brandMark.rightLeg} {...strokeProps} variants={leg} custom={0.5} initial={animateIn ? "hidden" : false} animate="shown" />
        {/* Re-keyed on each fire so the trail animation replays */}
        <g key={fireSignal}>
          {glow ? (
            <motion.path
              d={brandMark.bar}
              fill={brandMark.trailColour}
              filter={`url(#${filterId})`}
              variants={halo}
              custom={trailDelay}
              initial={trailInitial}
              animate="shown"
              style={{ originX: 0 }}
            />
          ) : null}
          <motion.path
            d={brandMark.bar}
            fill={brandMark.trailColour}
            variants={bar}
            custom={trailDelay}
            initial={trailInitial}
            animate="shown"
            style={{ originX: 0 }}
          />
        </g>
        <motion.path d={brandMark.leftLeg} {...strokeProps} variants={leg} custom={0} initial={animateIn ? "hidden" : false} animate="shown" />
      </g>
    </svg>
  );
}
