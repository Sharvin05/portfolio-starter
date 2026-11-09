import type { SocialLink as SocialLinkData } from "@content";
import { Icon } from "@/components/Icon";
import styles from "./styles.module.scss";
import { linkProps } from "@/lib/links";

interface SocialLinkProps {
  link: SocialLinkData;
}

export function SocialLink({ link }: SocialLinkProps) {
  return (
    <a className={styles.root} href={link.href} {...linkProps(link.href)}>
      <span className={styles.icon}>
        <Icon name={link.icon} />
      </span>
      <span className={styles.text}>
        <b className={styles.label}>{link.label}</b>
        <small className={styles.display}>{link.display}</small>
      </span>
      <span className={styles.arrow}>
        <Icon name="arrow-up-right" size={16} />
      </span>
    </a>
  );
}
