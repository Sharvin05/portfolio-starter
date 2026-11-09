"use client";

import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";
import { useMotionPaused } from "@/lib/motionPause";
import { GlassPlane } from "./components/GlassPlane";
import styles from "./styles.module.scss";

export function RibbedGlass() {
  const reduce = useReducedMotion() ?? false;
  const [paused] = useMotionPaused();
  // Still frame when the visitor prefers reduced motion or paused it
  const still = reduce || paused;
  return (
    <Canvas
      className={styles.canvas}
      aria-hidden="true"
      dpr={[1, 1.75]}
      gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
      frameloop={still ? "demand" : "always"}
    >
      <GlassPlane animate={!still} />
    </Canvas>
  );
}
