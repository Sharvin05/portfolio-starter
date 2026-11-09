"use client";

import { useMemo, useState } from "react";
import { skillCategories, skillsIntro, ui } from "@content";
import { SectionHeader } from "@/components/SectionHeader";
import { CategoryTabs } from "./components/CategoryTabs";
import { SkillPanel } from "./components/SkillPanel";
import { SkillSphere, type SphereSkill } from "./components/SkillSphere";
import styles from "./styles.module.scss";
import type { ActiveCategory } from "./types";

export function Skills() {
  const [active, setActive] = useState<ActiveCategory>(null);

  const sphereSkills = useMemo<SphereSkill[]>(
    () => skillCategories.flatMap((c) => c.skills.map((name) => ({ name, categoryId: c.id }))),
    [],
  );
  const allSkills = useMemo(() => sphereSkills.map((s) => s.name), [sphereSkills]);
  const current = skillCategories.find((c) => c.id === active);

  return (
    <section className={styles.root} id="skills" aria-labelledby="skills-title">
      <SectionHeader id="skills-title" kicker={skillsIntro.kicker} title={skillsIntro.title} lede={skillsIntro.lede} />
      <div className={styles.grid}>
        <div className={styles.controls}>
          <CategoryTabs categories={skillCategories} active={active} onChange={setActive} total={allSkills.length} />
          <SkillPanel
            panelKey={active ?? "all"}
            title={current?.label ?? ui.skills.allTitle}
            blurb={current?.blurb ?? ui.skills.allBlurb}
            skills={current?.skills ?? allSkills}
          />
        </div>
        <div className={styles.sphere}>
          <SkillSphere skills={sphereSkills} activeCategory={active} />
        </div>
      </div>
    </section>
  );
}
