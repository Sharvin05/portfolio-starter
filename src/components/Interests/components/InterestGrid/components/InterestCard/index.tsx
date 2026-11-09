import type { InterestCard as Card } from "@content";
import { Photo } from "@/components/Photo";
import styles from "./styles.module.scss";

interface InterestCardProps {
  card: Card;
  /** Spans two grid columns, so the photo is loaded larger. */
  wide?: boolean;
}

export function InterestCard({ card, wide = false }: InterestCardProps) {
  return (
    <article className={styles.root} aria-labelledby={`${card.id}-title`}>
      {card.photo && (
        <div className={styles.frame}>
          <Photo photo={card.photo} sizes={wide ? "(min-width: 981px) 66vw, 100vw" : "(min-width: 981px) 33vw, (min-width: 561px) 50vw, 100vw"} />
        </div>
      )}
      <div className={styles.body}>
        <h3 id={`${card.id}-title`} className={styles.title}>
          {card.title}
        </h3>
        <p className={styles.detail}>{card.detail}</p>
      </div>
    </article>
  );
}
