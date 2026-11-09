import { privacyPage } from "@content";
import { SectionHeader } from "@/components/SectionHeader";
import { PolicySection } from "./components/PolicySection";
import styles from "./styles.module.scss";

export function PrivacyPolicy() {
  const { intro, updated, contentsLabel, sections } = privacyPage;
  return (
    <>
      <header className={styles.intro}>
        <SectionHeader id="privacy-title" level={1} kicker={intro.kicker} title={intro.title} lede={intro.lede} />
        <time className={styles.updated} dateTime={updated.date}>
          {updated.label}
        </time>
      </header>
      <div className={styles.body}>
        <nav aria-label={contentsLabel}>
          <ol className={styles.contents}>
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className={styles.contentsLink}>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className={styles.sections}>
          {sections.map((s) => (
            <PolicySection key={s.id} {...s} />
          ))}
        </div>
      </div>
    </>
  );
}
