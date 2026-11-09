import { degree, educationIntro, subjectGroups } from "@content";
import { SectionHeader } from "@/components/SectionHeader";
import { DegreeCard } from "./components/DegreeCard";
import { SubjectGroupCard } from "./components/SubjectGroupCard";
import styles from "./styles.module.scss";

export function Education() {
  const subjectCount = subjectGroups.reduce((n, g) => n + g.subjects.length, 0);
  return (
    <section className={styles.root} id="education" aria-labelledby="education-title">
      <SectionHeader id="education-title" kicker={educationIntro.kicker} title={educationIntro.title} lede={educationIntro.lede} />
      <div className={styles.grid}>
        <DegreeCard degree={degree} subjectCount={subjectCount} />
        <div className={styles.groups}>
          {subjectGroups.map((group, i) => (
            <SubjectGroupCard key={group.id} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
