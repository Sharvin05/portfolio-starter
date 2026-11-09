import { ui } from "@content";
import styles from "./styles.module.scss";

interface MotionToggleProps {
  paused: boolean;
  onChange: (paused: boolean) => void;
}

/** Switch that pauses the site's ongoing background motion. */
export function MotionToggle({ paused, onChange }: MotionToggleProps) {
  return (
    <button type="button" role="switch" aria-checked={paused} className={styles.root} onClick={() => onChange(!paused)}>
      {ui.theme.pauseMotion}
      <span className={styles.track} aria-hidden="true">
        <span className={styles.knob} />
      </span>
    </button>
  );
}
