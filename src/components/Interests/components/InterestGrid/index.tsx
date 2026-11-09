import type { InterestCard as Card, SectionIntro } from "@content";
import { SectionHeader } from "@/components/SectionHeader";
import { cx } from "@/lib/cx";
import { InterestCard } from "./components/InterestCard";
import styles from "./styles.module.scss";

interface InterestGridProps extends SectionIntro {
  id: string;
  items: Card[];
  /** "row": equal cards. "feature": the first card spans two columns. */
  layout: "row" | "feature";
}

export function InterestGrid({ id, kicker, title, lede, items, layout }: InterestGridProps) {
  const titleId = `${id}-title`;
  return (
    <section className={styles.root} id={id} aria-labelledby={titleId}>
      <SectionHeader id={titleId} kicker={kicker} title={title} lede={lede} />
      <ul className={cx(styles.grid, layout === "feature" && styles.feature, layout === "row" && items.length === 2 && styles.pair)}>
        {items.map((item, i) => (
          <li key={item.id} className={styles.item}>
            <InterestCard card={item} wide={layout === "feature" && i === 0} />
          </li>
        ))}
      </ul>
    </section>
  );
}
