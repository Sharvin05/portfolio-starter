"use client";

import { ui } from "@content";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import type { NavItem, SocialLink } from "@content";
import { BrandLogo } from "@/components/BrandLogo";
import { cx } from "@/lib/cx";
import { ease } from "@/lib/motion";
import { IconButton } from "./components/IconButton";
import { MobileMenu } from "./components/MobileMenu";
import { NavPills } from "./components/NavPills";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { useActiveSection } from "./hooks/useActiveSection";
import { useNavVisibility } from "./hooks/useNavVisibility";
import styles from "./styles.module.scss";

interface SiteNavProps {
  name: string;
  items: readonly NavItem[];
  socials: readonly SocialLink[];
}

const MENU_ID = "mobile-menu";

export function SiteNav({ name, items, socials }: SiteNavProps) {
  const reduce = useReducedMotion() ?? false;
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrolled, hidden } = useNavVisibility(menuOpen);
  const pathname = usePathname();
  const onHome = pathname === "/";
  // Home page: highlight the section in view. Other pages: highlight the page itself.
  const sectionIds = useMemo(
    // "/#" is the hero (id "top"); "/#name" is the section with that id
    () => (onHome ? items.filter((i) => i.href.startsWith("/#")).map((i) => i.href.slice(2) || "top") : []),
    [items, onHome],
  );
  const activeId = useActiveSection(sectionIds);
  const activeHref: NavItem["href"] | undefined = onHome ? (activeId ? (activeId === "top" ? "/#" : `/#${activeId}`) : undefined) : (pathname as NavItem["href"]);

  return (
    <>
      <motion.header
        className={styles.root}
        initial={reduce ? false : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: hidden ? -110 : 0 }}
        transition={{ duration: hidden ? 0.3 : 0.5, ease }}
      >
        <nav className={cx(styles.bar, scrolled || menuOpen ? styles.barScrolled : styles.barTop)} aria-label={ui.nav.label}>
          <a href="/#" className={styles.logo} aria-label={ui.nav.homeLabel(name)} onClick={() => setMenuOpen(false)}>
            <BrandLogo name={name} />
          </a>
          <NavPills items={items} activeHref={activeHref} />
          <div className={styles.actions}>
            <ThemeSwitcher />
            <span className={styles.menuToggle}>
              <IconButton
                icon={menuOpen ? "close" : "menu"}
                label={menuOpen ? ui.nav.closeMenu : ui.nav.openMenu}
                variant="glass"
                wide
                onClick={() => setMenuOpen((open) => !open)}
                expanded={menuOpen}
                controls={MENU_ID}
              />
            </span>
          </div>
        </nav>
      </motion.header>
      <MobileMenu
        id={MENU_ID}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={items}
        activeHref={activeHref}
        socials={socials}
      />
    </>
  );
}
