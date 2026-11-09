"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { fragmentShader, vertexShader } from "../../shader";

/** 0 until the last ~1.2 screens of the page, then rises to 1 at the very bottom. */
function endProgress(): number {
  const span = innerHeight * 1.2;
  const max = document.documentElement.scrollHeight - innerHeight;
  return Math.min(1, Math.max(0, (scrollY - (max - span)) / span));
}

interface ThemeColors {
  canvas: THREE.Vector3;
  surface: THREE.Vector3;
  mist: THREE.Vector3;
  fg: THREE.Vector3;
  accent: THREE.Vector3;
  accentStrength: number;
  rib: number;
}

const createColors = (): ThemeColors => ({
  canvas: new THREE.Vector3(),
  surface: new THREE.Vector3(),
  mist: new THREE.Vector3(),
  fg: new THREE.Vector3(),
  accent: new THREE.Vector3(),
  accentStrength: 0.6,
  rib: 1,
});

/** "#RRGGBB" → 0..1 sRGB components (the shader works in sRGB directly). */
function hexToVec(hex: string, out: THREE.Vector3): void {
  const match = /^#([0-9a-f]{6})$/i.exec(hex.trim());
  if (!match?.[1]) return;
  const n = parseInt(match[1], 16);
  out.set(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
}

function readNumber(styles: CSSStyleDeclaration, name: string, fallback: number): number {
  const value = parseFloat(styles.getPropertyValue(name));
  return Number.isFinite(value) ? value : fallback;
}

/** Reads the active theme's colours from the CSS variables on <html>. */
function readTheme(into: ThemeColors): void {
  const styles = getComputedStyle(document.documentElement);
  hexToVec(styles.getPropertyValue("--canvas"), into.canvas);
  hexToVec(styles.getPropertyValue("--surface"), into.surface);
  hexToVec(styles.getPropertyValue("--gl-mist"), into.mist);
  hexToVec(styles.getPropertyValue("--fg"), into.fg);
  hexToVec(styles.getPropertyValue("--accent"), into.accent);
  into.accentStrength = readNumber(styles, "--gl-accent-strength", 0.6);
  into.rib = readNumber(styles, "--gl-rib", 1);
}

interface GlassPlaneProps {
  animate: boolean;
}

export function GlassPlane({ animate }: GlassPlaneProps) {
  const { size, gl, invalidate } = useThree();
  const target = useRef(new THREE.Vector2(0.5, 0.5));
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uDpr: { value: 1 },
      uScroll: { value: 0 },
      uEnd: { value: 0 },
      uCanvas: { value: new THREE.Vector3() },
      uSurface: { value: new THREE.Vector3() },
      uMist: { value: new THREE.Vector3() },
      uFg: { value: new THREE.Vector3() },
      uAccent: { value: new THREE.Vector3() },
      uAccentStrength: { value: 0.6 },
      uRib: { value: 1 },
    }),
    [],
  );
  // Own the material so the uniforms we update are the exact ones the GPU reads
  // (passing `uniforms` as a JSX prop gives the material a shallow copy, which freezes number values).
  const material = useMemo(
    () => new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms, depthWrite: false }),
    [uniforms],
  );
  useEffect(() => () => material.dispose(), [material]);
  const themeTarget = useRef<ThemeColors>(createColors());

  const applyTheme = useCallback(
    (blend: number) => {
      const t = themeTarget.current;
      uniforms.uCanvas.value.lerp(t.canvas, blend);
      uniforms.uSurface.value.lerp(t.surface, blend);
      uniforms.uMist.value.lerp(t.mist, blend);
      uniforms.uFg.value.lerp(t.fg, blend);
      uniforms.uAccent.value.lerp(t.accent, blend);
      uniforms.uAccentStrength.value += (t.accentStrength - uniforms.uAccentStrength.value) * blend;
      uniforms.uRib.value += (t.rib - uniforms.uRib.value) * blend;
    },
    [uniforms],
  );

  // Follow theme changes (the switcher sets data-theme on <html>)
  useEffect(() => {
    readTheme(themeTarget.current);
    applyTheme(1);
    invalidate();
    const observer = new MutationObserver(() => {
      readTheme(themeTarget.current);
      if (!animate) {
        applyTheme(1);
        invalidate();
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    // Styles can finish loading after this first read (notably in development),
    // so read the theme again once the page has fully loaded.
    const reread = () => {
      readTheme(themeTarget.current);
      applyTheme(1); // first paint: snap straight to the theme, no blend
      invalidate();
    };
    if (document.readyState !== "complete") addEventListener("load", reread, { once: true });
    const late = setTimeout(reread, 1500);
    return () => {
      observer.disconnect();
      removeEventListener("load", reread);
      clearTimeout(late);
    };
  }, [animate, applyTheme, invalidate]);

  useEffect(() => {
    uniforms.uRes.value.set(size.width, size.height);
    uniforms.uDpr.value = gl.getPixelRatio();
    invalidate();
  }, [size, gl, uniforms, invalidate]);

  useEffect(() => {
    // The canvas sits behind the page, so listen on window instead of the canvas.
    const onMove = (e: PointerEvent) => target.current.set(e.clientX / innerWidth, 1 - e.clientY / innerHeight);
    const onScroll = () => {
      if (animate) return;
      uniforms.uScroll.value = scrollY / innerHeight;
      uniforms.uEnd.value = endProgress();
      invalidate();
    };
    addEventListener("pointermove", onMove);
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      removeEventListener("pointermove", onMove);
      removeEventListener("scroll", onScroll);
    };
  }, [animate, uniforms, invalidate]);

  useFrame((state) => {
    if (!animate) return;
    uniforms.uTime.value = state.clock.getElapsedTime();
    uniforms.uMouse.value.lerp(target.current, 0.04);
    uniforms.uScroll.value += (scrollY / innerHeight - uniforms.uScroll.value) * 0.08;
    uniforms.uEnd.value += (endProgress() - uniforms.uEnd.value) * 0.06;
    applyTheme(0.06);
  });

  return (
    <mesh frustumCulled={false} material={material}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  );
}
