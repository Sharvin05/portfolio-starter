import { Icon } from "@/components/Icon";
import styles from "./styles.module.scss";

interface SuccessMessageProps {
  title: string;
  body: string;
  actionLabel: string;
  onAction: () => void;
}

export function SuccessMessage({ title, body, actionLabel, onAction }: SuccessMessageProps) {
  return (
    <div className={styles.root} role="status">
      <span className={styles.badge}>
        <Icon name="check" size={22} />
      </span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.body}>{body}</p>
      <button type="button" className={styles.action} onClick={onAction}>
        {actionLabel}
      </button>
    </div>
  );
}
