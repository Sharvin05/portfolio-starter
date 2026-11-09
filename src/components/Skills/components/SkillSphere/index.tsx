"use client";

import { ui } from "@content";
import { useEffect, useMemo, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { useMotionPaused } from "@/lib/motionPause";
import type { ActiveCategory } from "../../types";
import { SphereTag } from "./components/SphereTag";
import { facingAngles, fibonacciSphere, rotate } from "./geometry";
import styles from "./styles.module.scss";

export interface SphereSkill {
  name: string;
  categoryId: string;
}

interface SkillSphereProps {
  skills: readonly SphereSkill[];
  activeCategory: ActiveCategory;
}

const AUTO_SPIN = 0.0025; // radians per frame when idle
const DRAG_SPEED = 0.006;
const FRICTION = 0.94;
const FOCUS_EASE = 0.08; // share of the remaining turn covered per frame
const MAX_TILT = 1.2;

// Narrow screens get a slightly tighter sphere so pills stay inside the frame
const radiusFor = (width: number) => width * (width < 480 ? 0.34 : 0.4);

export function SkillSphere({ skills, activeCategory }: SkillSphereProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const [paused] = useMotionPaused();
  // No auto-spin under reduced motion or when paused; dragging still works
  const reduce = reduceMotion || paused;
  const rootRef = useRef<HTMLDivElement>(null);
  const tagRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const points = useMemo(() => fibonacciSphere(skills.length), [skills.length]);

  // Read inside the animation loop without restarting it
  const activeRef = useRef<ActiveCategory>(activeCategory);
  activeRef.current = activeCategory;
  // Angles the sphere turns to so the selected group faces the viewer; cleared once reached or dragged
  const focusRef = useRef<{ rx: number; ry: number } | null>(null);

  useEffect(() => {
    if (activeCategory === null) {
      focusRef.current = null;
      return;
    }
    const centre = points.reduce(
      (sum, p, i) => (skills[i]?.categoryId === activeCategory ? { x: sum.x + p.x, y: sum.y + p.y, z: sum.z + p.z } : sum),
      { x: 0, y: 0, z: 0 },
    );
    const { rx, ry } = facingAngles(centre);
    focusRef.current = { rx: Math.max(-MAX_TILT, Math.min(MAX_TILT, rx)), ry };
  }, [activeCategory, points, skills]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let rx = -0.25, ry = 0;          // current angles
    let vx = 0, vy = reduce ? 0 : AUTO_SPIN;
    let radius = radiusFor(root.clientWidth);
    let dragging = false, hovering = false, visible = true;
    let lastX = 0, lastY = 0, frame = 0;

    const draw = () => {
      const active = activeRef.current;
      points.forEach((p, i) => {
        const el = tagRefs.current[i];
        const skill = skills[i];
        if (!el || !skill) return;
        const q = rotate(p, rx, ry);
        const depth = (q.z + 1) / 2;    // 0 = back, 1 = front
        const dimmed = active !== null && skill.categoryId !== active;
        const scale = 0.6 + depth * 0.5;
        el.style.transform = `translate(-50%, -50%) translate3d(${q.x * radius}px, ${q.y * radius}px, 0) scale(${scale})`;
        el.style.opacity = String((0.2 + depth * 0.8) * (dimmed ? 0.25 : 1));
        el.style.zIndex = String(Math.round(depth * 100));
      });
    };

    const tick = () => {
      const focus = focusRef.current;
      if (focus && !dragging) {
        // Turn the short way round; jump straight there under reduced motion
        const k = reduce ? 1 : FOCUS_EASE;
        const dx = focus.rx - rx;
        const dy = Math.atan2(Math.sin(focus.ry - ry), Math.cos(focus.ry - ry));
        rx += dx * k;
        ry += dy * k;
        vx = vy = 0;
        if (Math.abs(dx) + Math.abs(dy) < 0.002) focusRef.current = null;
      } else if (!dragging) {
        // Hold still while a group is selected so it stays in front
        const target = reduce || hovering || activeRef.current !== null ? 0 : AUTO_SPIN;
        vx *= FRICTION;
        vy = vy * FRICTION + target * (1 - FRICTION);
      }
      rx = Math.max(-MAX_TILT, Math.min(MAX_TILT, rx + vx));
      ry += vy;
      draw();
      frame = visible ? requestAnimationFrame(tick) : 0;
    };

    const onDown = (e: PointerEvent) => {
      dragging = true;
      focusRef.current = null;
      lastX = e.clientX;
      lastY = e.clientY;
      root.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      vy = (e.clientX - lastX) * DRAG_SPEED;
      vx = -(e.clientY - lastY) * DRAG_SPEED;
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onUp = (e: PointerEvent) => {
      dragging = false;
      if (root.hasPointerCapture(e.pointerId)) root.releasePointerCapture(e.pointerId);
    };
    const onEnter = () => (hovering = true);
    const onLeave = () => (hovering = false);
    const onResize = () => {
      radius = radiusFor(root.clientWidth);
      draw();
    };

    // Only animate while the sphere is on screen
    const io = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      if (visible && !frame) frame = requestAnimationFrame(tick);
    });

    root.addEventListener("pointerdown", onDown);
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerup", onUp);
    root.addEventListener("pointercancel", onUp);
    root.addEventListener("pointerenter", onEnter);
    root.addEventListener("pointerleave", onLeave);
    addEventListener("resize", onResize);
    io.observe(root);
    draw();

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerup", onUp);
      root.removeEventListener("pointercancel", onUp);
      root.removeEventListener("pointerenter", onEnter);
      root.removeEventListener("pointerleave", onLeave);
      removeEventListener("resize", onResize);
    };
  }, [points, skills, reduce]);

  return (
    <div ref={rootRef} className={styles.root} aria-hidden="true">
      <div className={styles.core} />
      <div className={styles.ringA} />
      <div className={styles.ringB} />
      {skills.map((skill, i) => (
        <SphereTag
          key={`${skill.categoryId}-${skill.name}`}
          ref={(el) => {
            tagRefs.current[i] = el;
          }}
          label={skill.name}
          highlighted={activeCategory !== null && skill.categoryId === activeCategory}
        />
      ))}
      <span className={styles.hint}>{ui.skills.sphereHint}</span>
    </div>
  );
}
