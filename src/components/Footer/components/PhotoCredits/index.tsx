import { ui } from "@content";
import { Icon } from "@/components/Icon";
import { linkProps } from "@/lib/links";
import type { CreditEntry } from "@/lib/photoCredits";
import styles from "./styles.module.scss";

interface PhotoCreditsProps {
  credits: CreditEntry[];
}

/** A collapsed "Photo Credits" list: who took each photo, its source and its licence. */
export function PhotoCredits({ credits }: PhotoCreditsProps) {
  return (
    <details className={styles.root}>
      <summary className={styles.toggle}>
        {ui.photoCredits.toggle(credits.length)}
        <Icon name="arrow-up" size={14} className={styles.chevron} />
      </summary>
      <ul className={styles.list}>
        {credits.map((c) => (
          <li key={c.source} className={styles.item}>
            <span className={styles.subject}>{c.subject}</span>
            <span>
              <a href={c.source} {...linkProps(c.source)} className={styles.link} aria-label={`${ui.photoCredits.photoBy(c.subject)} ${c.author}`}>
                {c.author}
              </a>
              {", "}
              {c.licenceUrl ? (
                <a href={c.licenceUrl} {...linkProps(c.licenceUrl)} className={styles.link}>
                  {c.licence}
                </a>
              ) : (
                c.licence
              )}
            </span>
          </li>
        ))}
      </ul>
    </details>
  );
}
