"use client";

import { useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";

interface NavVisibility {
  /** Past the very top: the bar gets its glass background. */
  scrolled: boolean;
  /** Hidden while scrolling down, shown again on scroll up. */
  hidden: boolean;
}

export function useNavVisibility(locked: boolean): NavVisibility {
  const { scrollY } = useScroll();
  const [state, setState] = useState<NavVisibility>({ scrolled: false, hidden: false });

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    const goingDown = y > previous;
    setState({ scrolled: y > 24, hidden: !locked && goingDown && y > 160 });
  });

  return locked ? { ...state, hidden: false } : state;
}
