import { projects, workIntro } from "@content";
import { SectionHeader } from "@/components/SectionHeader";
import { ProjectCard } from "./components/ProjectCard";
import styles from "./styles.module.scss";

export function Work() {
  return (
    <section className={styles.root} id="work" aria-labelledby="work-title">
      <SectionHeader id="work-title" kicker={workIntro.kicker} title={workIntro.title} lede={workIntro.lede} />
      <ul className={styles.grid}>
        {projects.map((project) => (
          <li key={project.id} className={styles.item}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
