"use client";

import { forwardRef, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Role } from "@content";
import { cx } from "@/lib/cx";
import { HOVER_GROUP } from "@/lib/hoverGroup";
import { BulletList } from "./components/BulletList";
import { EraDivider } from "./components/EraDivider";
import { RoleHeader } from "./components/RoleHeader";
import { TagList } from "@/components/TagList";
import styles from "./styles.module.scss";

interface RoleCardProps {
  role: Role;
  index: number;
  active: boolean;
  now: Date | null;
  onHover: () => void;
}

export const RoleCard = forwardRef<HTMLElement, RoleCardProps>(function RoleCard({ role, index, active, now, onHover }, ref) {
  const reduce = useReducedMotion() ?? false;
  const local = useRef<HTMLElement | null>(null);

  // Card tips forward in 3D as it scrolls into view
  const { scrollYProgress } = useScroll({ target: local, offset: ["start end", "start 0.62"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.15, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  const setRefs = (el: HTMLElement | null) => {
    local.current = el;
    if (typeof ref === "function") ref(el);
    else if (ref) ref.current = el;
  };

  return (
    <>
      {role.era ? <EraDivider label={role.era} /> : null}
      <motion.article
        ref={setRefs}
        id={`role-${role.id}`}
        data-index={index}
        className={cx(styles.root, HOVER_GROUP, active ? styles.active : styles.idle)}
        style={reduce ? undefined : { rotateX, y, opacity, scale }}
        onMouseEnter={onHover}
      >
        <RoleHeader role={role} now={now} />
        <BulletList items={role.bullets} />
        <TagList tags={role.tags} />
      </motion.article>
    </>
  );
});
