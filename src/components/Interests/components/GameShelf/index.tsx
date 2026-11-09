import type { InterestsPage } from "@content";
import { SectionHeader } from "@/components/SectionHeader";
import styles from "./styles.module.scss";

type GameShelfProps = InterestsPage["games"] & { id: string };

/** Games set in big type, numbered like a shelf. */
export function GameShelf({ id, kicker, title, lede, items }: GameShelfProps) {
  const titleId = `${id}-title`;
  return (
    <section className={styles.root} id={id} aria-labelledby={titleId}>
      <SectionHeader id={titleId} kicker={kicker} title={title} lede={lede} />
      <ol className={styles.grid}>
        {items.map((game, i) => (
          <li key={game.title} className={styles.tile}>
            <span className={styles.number} aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className={styles.genre}>{game.genre}</span>
            <span className={styles.title} translate="no">
              {game.title}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
