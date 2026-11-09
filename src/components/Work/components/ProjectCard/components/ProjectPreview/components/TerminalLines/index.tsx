"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { ui } from "@content";
import { cx } from "@/lib/cx";
import styles from "./styles.module.scss";

interface TerminalLinesProps {
  lines: string[];
  result?: string;
}

const CHAR_MS = 24;
const LINE_PAUSE_MS = 420;

/** Commands that type themselves in once scrolled into view. All text is in the page from the start, so screen readers and copy-paste get it whole. */
export function TerminalLines({ lines, result }: TerminalLinesProps) {
  const ref = useRef<HTMLPreElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion() ?? false;
  const total = lines.reduce((n, line) => n + line.length, 0);
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    // Character positions where a line ends, to pause there like someone pressing Enter
    const ends = new Set(lines.reduce<number[]>((acc, line) => [...acc, (acc.at(-1) ?? 0) + line.length], []));
    let count = 0;
    let timer = 0;
    const step = () => {
      count += 1;
      setTyped(count);
      if (count < total) timer = window.setTimeout(step, ends.has(count) ? LINE_PAUSE_MS : CHAR_MS);
    };
    timer = window.setTimeout(step, LINE_PAUSE_MS);
    return () => window.clearTimeout(timer);
  }, [inView, reduce, lines, total]);

  const shown = reduce ? total : typed;
  let start = 0;

  return (
    <pre ref={ref} className={styles.root} translate="no">
      {lines.map((line, i) => {
        const lineStart = start;
        start += line.length;
        const visible = Math.max(0, Math.min(line.length, shown - lineStart));
        // The cursor sits on the line being typed, and stays on the last one when finished
        const cursor = (shown >= lineStart && shown < start) || (i === lines.length - 1 && shown >= total);
        return (
          <code key={line} className={styles.line}>
            <span className={cx(styles.prompt, shown < lineStart && styles.pending)} aria-hidden="true">
              {ui.work.prompt}
            </span>
            {line.slice(0, visible)}
            {cursor && <span className={styles.cursor} aria-hidden="true" />}
            <span className={styles.pending}>{line.slice(visible)}</span>
          </code>
        );
      })}
      {result && <samp className={cx(styles.result, shown < total && styles.pending)}>{result}</samp>}
    </pre>
  );
}
