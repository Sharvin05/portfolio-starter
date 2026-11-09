import { forwardRef } from "react";
import { cx } from "@/lib/cx";
import styles from "./styles.module.scss";

interface SphereTagProps {
  label: string;
  highlighted: boolean;
}

/** Position, scale and opacity are set every frame by SkillSphere through the ref. */
export const SphereTag = forwardRef<HTMLSpanElement, SphereTagProps>(function SphereTag({ label, highlighted }, ref) {
  return (
    <span ref={ref} translate="no" className={cx(styles.base, highlighted ? styles.highlighted : styles.idle)}>
      {label}
    </span>
  );
});
