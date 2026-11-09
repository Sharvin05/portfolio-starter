import styles from "./styles.module.scss";

interface TagListProps {
  tags: readonly string[];
}

export function TagList({ tags }: TagListProps) {
  return (
    <div className={styles.root}>
      {tags.map((tag) => (
        <span key={tag} className={styles.tag} translate="no">
          {tag}
        </span>
      ))}
    </div>
  );
}
