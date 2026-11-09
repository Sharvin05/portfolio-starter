import { ui } from "@content";
import { Icon } from "@/components/Icon";
import { BrandLogo } from "@/components/BrandLogo";
import styles from "./styles.module.scss";

interface FooterProps {
  name: string;
  note: string;
}

export function Footer({ name, note }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.root}>
      <div className={styles.brand}>
        <BrandLogo name={name} showWordmark={false} drawIn={false} />
        <div className={styles.note}>
          <span>© {year} {name}</span>
          <span>{note}</span>
        </div>
      </div>
      <a href="#" className={styles.top}>
        {ui.backToTop} <Icon name="arrow-up" size={16} />
      </a>
    </footer>
  );
}
