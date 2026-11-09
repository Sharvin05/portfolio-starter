import styles from "./styles.module.scss";

interface EraDividerProps {
  label: string;
}

export function EraDivider({ label }: EraDividerProps) {
  return <div className={styles.root}>{label}</div>;
}
