import type { ReactNode } from "react";
import styles from "./styles.module.scss";

interface WindowFrameProps {
  /** Shown in the title bar: a web address or a window name. */
  label: string;
  children: ReactNode;
}

/** A small app window: three dots, a title bar and the content below. */
export function WindowFrame({ label, children }: WindowFrameProps) {
  return (
    <div className={styles.root}>
      <div className={styles.bar} aria-hidden="true">
        <span className={styles.dots}>
          <span />
          <span />
          <span />
        </span>
        <span className={styles.label} translate="no">
          {label}
        </span>
      </div>
      <div className={styles.view}>{children}</div>
    </div>
  );
}
