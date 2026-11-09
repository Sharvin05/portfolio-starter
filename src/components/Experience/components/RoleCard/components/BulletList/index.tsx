import styles from "./styles.module.scss";

interface BulletListProps {
  items: readonly string[];
}

export function BulletList({ items }: BulletListProps) {
  return (
    <ul className={styles.root}>
      {items.map((item) => (
        <li key={item} className={styles.item}>
          {item}
        </li>
      ))}
    </ul>
  );
}
