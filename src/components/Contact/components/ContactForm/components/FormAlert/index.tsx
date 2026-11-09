import styles from "./styles.module.scss";

interface FormAlertProps {
  message: string;
}

export function FormAlert({ message }: FormAlertProps) {
  return (
    <p role="alert" className={styles.root}>
      {message}
    </p>
  );
}
