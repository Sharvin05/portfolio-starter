import type { PolicySection as PolicySectionData } from "@content";
import { linkProps } from "@/lib/links";
import styles from "./styles.module.scss";

export function PolicySection({ id, title, body, items, links }: PolicySectionData) {
  return (
    <section className={styles.root} aria-labelledby={id}>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {body.map((text) => (
        <p key={text} className={styles.text}>
          {text}
        </p>
      ))}
      {items && (
        <ul className={styles.list}>
          {items.map((item) =>
            typeof item === "string" ? (
              <li key={item}>{item}</li>
            ) : (
              <li key={item.term}>
                <strong className={styles.term}>{item.term}</strong> {item.text}
              </li>
            ),
          )}
        </ul>
      )}
      {links && (
        <ul className={styles.links}>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={styles.link} {...linkProps(link.href)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
