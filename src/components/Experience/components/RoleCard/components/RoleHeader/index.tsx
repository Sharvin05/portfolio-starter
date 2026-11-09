import { type Role, ui } from "@content";
import { formatDuration, formatRange } from "@/lib/dates";
import { Icon } from "@/components/Icon";
import styles from "./styles.module.scss";
import { linkProps } from "@/lib/links";

interface RoleHeaderProps {
  role: Role;
  now: Date | null;
}

export function RoleHeader({ role, now }: RoleHeaderProps) {
  return (
    <div className={styles.root}>
      <div>
        <h3 className={styles.title}>{role.title}</h3>
        <div className={styles.meta}>
          {role.url ? (
            <a className={styles.companyLink} href={role.url} {...linkProps(role.url)}>
              {role.company} <Icon name="arrow-up-right" size={14} />
            </a>
          ) : (
            <b className={styles.company}>{role.company}</b>
          )}
          <span aria-hidden="true">{ui.experience.metaSeparator}</span>
          <span>{role.location}</span>
          <span className={styles.type}>{role.type}</span>
        </div>
      </div>
      <div className={styles.when}>
        <b className={styles.range}>{formatRange(role)}</b>
        <span>{formatDuration(role, now ?? undefined)}</span>
      </div>
    </div>
  );
}
