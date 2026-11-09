import { cx } from "@/lib/cx";
import styles from "./styles.module.scss";

interface CategoryTabProps {
  label: string;
  count: number;
  selected: boolean;
  onSelect: () => void;
}

export function CategoryTab({ label, count, selected, onSelect }: CategoryTabProps) {
  return (
    <button type="button" aria-pressed={selected} onClick={onSelect} className={cx(styles.base, selected ? styles.selected : styles.idle)}>
      {label}
      <span className={styles.count}>{count}</span>
    </button>
  );
}
