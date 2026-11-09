import { interestsTeaser as teaser } from "@content";
import { Button } from "@/components/Button";
import { Photo } from "@/components/Photo";
import { SectionHeader } from "@/components/SectionHeader";
import { TagList } from "@/components/TagList";
import styles from "./styles.module.scss";

/** Home page card that leads to the /interests page. */
export function InterestsTeaser() {
  return (
    <section className={styles.root} id="interests" aria-labelledby="interests-teaser-title">
      <div className={styles.card}>
        <div className={styles.text}>
          <SectionHeader id="interests-teaser-title" kicker={teaser.kicker} title={teaser.title} lede={teaser.lede} />
          <TagList tags={teaser.tags} />
          <div className={styles.action}>
            <Button variant="primary" href={teaser.cta.href} icon="arrow-up-right">
              {teaser.cta.label}
            </Button>
          </div>
        </div>
        {teaser.photo && (
          <div className={styles.frame}>
            <Photo photo={teaser.photo} sizes="(min-width: 981px) 45vw, 100vw" />
          </div>
        )}
      </div>
    </section>
  );
}
