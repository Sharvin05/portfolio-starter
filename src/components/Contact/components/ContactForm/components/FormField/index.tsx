import { cx } from "@/lib/cx";
import styles from "./styles.module.scss";

interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "email";
  multiline?: boolean;
  autoComplete?: string;
  inputMode?: "text" | "email";
  spellCheck?: boolean;
  maxLength?: number;
  error?: string;
}

export function FormField({ id, label, value, onChange, placeholder, type = "text", multiline = false, autoComplete, inputMode, spellCheck, maxLength, error }: FormFieldProps) {
  const errorId = `${id}-error`;
  const shared = {
    id,
    name: id,
    value,
    placeholder,
    maxLength,
    autoComplete,
    spellCheck,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    className: cx(styles.control, multiline ? styles.textarea : styles.input, error ? styles.invalid : styles.idle),
  };
  return (
    <div className={styles.root}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      {multiline ? (
        <textarea {...shared} rows={6} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input {...shared} type={type} inputMode={inputMode} onChange={(e) => onChange(e.target.value)} />
      )}
      {error ? (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
