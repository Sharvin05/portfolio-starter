import type { SocialLink as SocialLinkData } from "@content";
import { SocialLink } from "@/components/SocialLink";
import styles from "./styles.module.scss";

interface SocialListProps {
  title: string;
  links: readonly SocialLinkData[];
}

export function SocialList({ title, links }: SocialListProps) {
  return (
    <div className={styles.root}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.list}>
        {links.map((link) => (
          <SocialLink key={link.href} link={link} />
        ))}
      </div>
    </div>
  );
}
