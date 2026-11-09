"use client";

import { useCallback, useEffect, useState } from "react";
import { MOTION_STORAGE_KEY } from "./motionPauseScript";

const isPaused = () => document.documentElement.dataset.motion === "paused";

/**
 * Whether the visitor paused ongoing background motion (the 3D background, the skill sphere's spin).
 * Every component using it stays in sync with <html data-motion>.
 */
export function useMotionPaused(): [boolean, (paused: boolean) => void] {
  const [paused, setPausedState] = useState(false);

  useEffect(() => {
    setPausedState(isPaused());
    const observer = new MutationObserver(() => setPausedState(isPaused()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion"] });
    return () => observer.disconnect();
  }, []);

  const setPaused = useCallback((next: boolean) => {
    if (next) document.documentElement.dataset.motion = "paused";
    else delete document.documentElement.dataset.motion;
    try {
      if (next) localStorage.setItem(MOTION_STORAGE_KEY, "paused");
      else localStorage.removeItem(MOTION_STORAGE_KEY);
    } catch {
      // Storage can be blocked; the choice still applies for this visit
    }
  }, []);

  return [paused, setPaused];
}
