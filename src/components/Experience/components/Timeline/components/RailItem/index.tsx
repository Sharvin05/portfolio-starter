import { cx } from "@/lib/cx";
import styles from "./styles.module.scss";

interface RailItemProps {
  company: string;
  year: string;
  active: boolean;
  onSelect: () => void;
}

export function RailItem({ company, year, active, onSelect }: RailItemProps) {
  return (
    <li>
      <button type="button" tabIndex={-1} onClick={onSelect} className={cx(styles.button, active ? styles.buttonActive : styles.buttonIdle)}>
        <span className={cx(styles.pip, active ? styles.pipActive : styles.pipIdle)} />
        {company}
        <small className={styles.year}>{year}</small>
      </button>
    </li>
  );
}
