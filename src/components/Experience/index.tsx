"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { experienceIntro, roles } from "@content";
import { RoleCard } from "./components/RoleCard";
import { SectionHeader } from "@/components/SectionHeader";
import { Timeline } from "./components/Timeline";
import styles from "./styles.module.scss";

export function Experience() {
  const [active, setActive] = useState(0);
  // Ongoing roles show their length only after mount, so server and client markup match.
  const [now, setNow] = useState<Date | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => setNow(new Date()), []);

  // The card crossing the middle of the screen becomes active
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || !(entry.target instanceof HTMLElement)) continue;
          setActive(Number(entry.target.dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    cardRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const hoverTo = useCallback((i: number) => {
    if (matchMedia("(pointer: fine)").matches) setActive(i);
  }, []);

  const jumpTo = useCallback((i: number) => {
    cardRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  return (
    <section className={styles.root} id="experience" aria-labelledby="xp-title">
      <SectionHeader id="xp-title" kicker={experienceIntro.kicker} title={experienceIntro.title} lede={experienceIntro.lede} />
      <div className={styles.grid}>
        <Timeline roles={roles} active={active} onSelect={jumpTo} />
        <div className={styles.cards}>
          {roles.map((role, i) => (
            <RoleCard
              key={role.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              role={role}
              index={i}
              active={i === active}
              now={now}
              onHover={() => hoverTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
