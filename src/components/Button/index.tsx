import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/Icon";
import { cx } from "@/lib/cx";
import { linkProps } from "@/lib/links";
import styles from "./styles.module.scss";

interface CommonProps {
  variant: "primary" | "ghost";
  /** Icon after the label; defaults to an up-right arrow. */
  icon?: IconName;
  children: ReactNode;
}

interface LinkButtonProps extends CommonProps {
  href: string;
  download?: boolean;
  type?: never;
  busy?: never;
  onClick?: never;
}

interface ActionButtonProps extends CommonProps {
  href?: never;
  download?: never;
  type?: "button" | "submit";
  /** While true, shows a spinner instead of the icon (the button stays enabled). */
  busy?: boolean;
  onClick?: () => void;
}

export type ButtonProps = LinkButtonProps | ActionButtonProps;

/** The site's one button style. Renders a link when `href` is given, otherwise a <button>. */
export function Button(props: ButtonProps) {
  const { variant, icon = "arrow-up-right", children } = props;
  const className = cx(styles.base, styles[variant]);

  if (props.href !== undefined) {
    return (
      <a href={props.href} download={props.download} {...linkProps(props.href)} className={className}>
        {children} <Icon name={icon} size={16} />
      </a>
    );
  }

  return (
    <button type={props.type ?? "button"} onClick={props.onClick} className={className} aria-busy={props.busy || undefined}>
      {children}
      {props.busy ? <span className={styles.spinner} aria-hidden="true" /> : <Icon name={icon} size={16} />}
    </button>
  );
}
