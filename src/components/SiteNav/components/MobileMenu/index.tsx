"use client";

import { ui } from "@content";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { NavItem, SocialLink as SocialLinkData } from "@content";
import { SocialLink } from "@/components/SocialLink";
import { ease } from "@/lib/motion";
import { MobileMenuLink } from "./components/MobileMenuLink";
import styles from "./styles.module.scss";

interface MobileMenuProps {
  id: string;
  open: boolean;
  onClose: () => void;
  items: readonly NavItem[];
  activeHref?: NavItem["href"];
  socials: readonly SocialLinkData[];
}

export function MobileMenu({ id, open, onClose, items, activeHref, socials }: MobileMenuProps) {
  const listRef = useRef<HTMLUListElement>(null);

  // While open: lock page scroll, close on Escape, move focus into the menu
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    addEventListener("keydown", onKey);
    listRef.current?.querySelector("a")?.focus();
    // Close if the window grows to xl width, where the menu is hidden
    const desktop = matchMedia("(min-width: 80rem)");
    const onResize = () => desktop.matches && onClose();
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = overflow;
      removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id={id}
          className={styles.root}
          role="dialog"
          aria-modal="true"
          aria-label={ui.nav.menuLabel}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease }}
        >
          <ul ref={listRef} className={styles.list}>
            {items.map((item, i) => (
              <MobileMenuLink key={item.href} item={item} index={i} active={item.href === activeHref} onNavigate={onClose} />
            ))}
          </ul>
          <motion.div
            className={styles.footer}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease }}
          >
            <div className={styles.socials}>
              {socials.map((link) => (
                <SocialLink key={link.href} link={link} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
