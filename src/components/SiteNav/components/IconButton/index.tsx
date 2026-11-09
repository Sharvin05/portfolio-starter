import { Icon, type IconName } from "@/components/Icon";
import { cx } from "@/lib/cx";
import styles from "./styles.module.scss";
import { linkProps } from "@/lib/links";

interface BaseProps {
  icon: IconName;
  label: string;
  variant: "solid" | "glass";
  wide?: boolean;
}

interface LinkProps extends BaseProps {
  href: string;
  download?: boolean;
  onClick?: never;
  expanded?: never;
  controls?: never;
}

interface ButtonProps extends BaseProps {
  href?: never;
  download?: never;
  onClick: () => void;
  /** For toggles: whether the controlled element is open. */
  expanded?: boolean;
  /** For toggles: id of the controlled element. */
  controls?: string;
}

/** Renders a link when `href` is given, otherwise a button. */
export type IconButtonProps = LinkProps | ButtonProps;

export function IconButton(props: IconButtonProps) {
  const { icon, label, variant, wide = false } = props;
  const className = cx(styles.base, wide ? styles.wide : styles.round, styles[variant]);
  if (props.href !== undefined) {
    return (
      <a href={props.href} download={props.download} {...linkProps(props.href)} className={className} aria-label={label}>
        <Icon name={icon} />
      </a>
    );
  }
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={className}
      aria-label={label}
      aria-expanded={props.expanded}
      aria-controls={props.controls}
    >
      <Icon name={icon} />
    </button>
  );
}
