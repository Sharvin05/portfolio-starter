"use client";

import { useEffect, useState } from "react";
import { ui } from "@content";
import { CONSENT_OPEN_EVENT, needsConsent, readCountry } from "@/lib/consent";
import styles from "./styles.module.scss";

/** Reopens the consent banner so visitors who were asked can change their choice. */
export function CookieSettings() {
  const [shown, setShown] = useState(false);

  // The country is only known in the browser, so decide after mount.
  useEffect(() => setShown(needsConsent(readCountry())), []);

  if (!shown) return null;

  return (
    <button type="button" className={styles.root} onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}>
      {ui.consent.settings}
    </button>
  );
}
