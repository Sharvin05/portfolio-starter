import { ui } from "@content";
import type { SkillCategory } from "@content";
import type { ActiveCategory } from "../../types";
import { CategoryTab } from "./components/CategoryTab";
import styles from "./styles.module.scss";

interface CategoryTabsProps {
  categories: readonly SkillCategory[];
  active: ActiveCategory;
  total: number;
  onChange: (id: ActiveCategory) => void;
}

export function CategoryTabs({ categories, active, total, onChange }: CategoryTabsProps) {
  return (
    <div className={styles.root} role="group" aria-label={ui.skills.filterLabel}>
      <CategoryTab label={ui.skills.allTab} count={total} selected={active === null} onSelect={() => onChange(null)} />
      {categories.map((c) => (
        <CategoryTab
          key={c.id}
          label={c.label}
          count={c.skills.length}
          selected={active === c.id}
          onSelect={() => onChange(active === c.id ? null : c.id)}
        />
      ))}
    </div>
  );
}
