import { ui, type Project } from "@content";
import { Button } from "@/components/Button";
import { cx } from "@/lib/cx";
import { HOVER_GROUP } from "@/lib/hoverGroup";
import { ProjectPreview } from "./components/ProjectPreview";
import { WindowFrame } from "./components/WindowFrame";
import styles from "./styles.module.scss";

interface ProjectCardProps {
  project: Project;
}

const address = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

export function ProjectCard({ project }: ProjectCardProps) {
  const { preview } = project;
  const titleId = `${project.id}-title`;

  return (
    <article className={cx(styles.root, HOVER_GROUP)} aria-labelledby={titleId}>
      <WindowFrame label={preview?.type === "terminal" ? preview.title : address(project.url)}>
        <ProjectPreview preview={preview} address={address(project.url)} />
      </WindowFrame>
      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.kind}>{project.kind}</span>
          {project.note && <span className={styles.note}>{project.note}</span>}
        </div>
        <h3 id={titleId} className={styles.title} translate="no">
          {project.title}
        </h3>
        <p className={styles.summary}>{project.summary}</p>
        <div className={styles.actions} role="group" aria-label={ui.work.linksLabel(project.title)}>
          {project.links.map((link, i) => (
            <Button key={link.href} variant={i === 0 ? "primary" : "ghost"} href={link.href} icon={link.icon}>
              {link.label}
            </Button>
          ))}
        </div>
      </div>
    </article>
  );
}
