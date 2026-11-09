"use client";

import { ui } from "@content";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { useTheme } from "@/lib/theme/useTheme";
import styles from "./styles.module.scss";

interface TurnstileWidgetProps {
  siteKey?: string;
  /** Called with a fresh token, or null when it expires or fails. */
  onToken: (token: string | null) => void;
  /** Increase to ask for a new token (tokens are single-use). */
  resetSignal: number;
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

export function TurnstileWidget({ siteKey, onToken, resetSignal }: TurnstileWidgetProps) {
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  onTokenRef.current = onToken;
  const [ready, setReady] = useState(false);
  const [theme] = useTheme();

  useEffect(() => {
    if (window.turnstile) setReady(true);
  }, []);

  useEffect(() => {
    const api = window.turnstile;
    if (!ready || !siteKey || !container.current || !api) return;
    widgetId.current = api.render(container.current, {
      sitekey: siteKey,
      theme: theme === "paper" ? "light" : "dark",
      callback: (token) => onTokenRef.current(token),
      "expired-callback": () => onTokenRef.current(null),
      "error-callback": () => onTokenRef.current(null),
    });
    return () => {
      if (widgetId.current) api.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [ready, siteKey, theme]);

  useEffect(() => {
    if (resetSignal > 0 && widgetId.current) window.turnstile?.reset(widgetId.current);
  }, [resetSignal]);

  if (!siteKey) {
    return <p className={styles.missing}>{ui.contactForm.turnstileMissing}</p>;
  }

  return (
    <>
      <Script src={SCRIPT_SRC} strategy="afterInteractive" onReady={() => setReady(true)} />
      <div ref={container} className={styles.root} />
    </>
  );
}
