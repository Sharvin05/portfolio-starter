import type { NavItem } from "@content";
import { NavPill } from "./components/NavPill";
import styles from "./styles.module.scss";

interface NavPillsProps {
  items: readonly NavItem[];
  activeHref?: NavItem["href"];
}

export function NavPills({ items, activeHref }: NavPillsProps) {
  return (
    <div className={styles.root}>
      {items.map((item) => (
        <NavPill key={item.href} item={item} active={item.href === activeHref} />
      ))}
    </div>
  );
}
