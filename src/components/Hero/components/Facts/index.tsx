"use client";

import { ui } from "@content";
import { useState, type CSSProperties } from "react";
import type { Fact } from "@content";
import { FactItem } from "./components/FactItem";
import styles from "./styles.module.scss";

interface FactsProps {
  facts: readonly Fact[];
}

type BarStyle = CSSProperties & { "--bar": string };

export function Facts({ facts }: FactsProps) {
  // The accent bar grows to the hovered fact
  const [active, setActive] = useState(0);
  const barStyle: BarStyle = { "--bar": String((active + 1) / facts.length) };

  return (
    <section className={styles.root} aria-label={ui.hero.factsLabel} style={barStyle} onMouseLeave={() => setActive(0)}>
      {facts.map((fact, i) => (
        <FactItem key={fact.title} fact={fact} index={i} active={i === active} onHover={() => setActive(i)} />
      ))}
    </section>
  );
}
