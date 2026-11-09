"use client";

import { useEffect, useState } from "react";
import { ui } from "@content";
import { Button } from "@/components/Button";
import { clearAnalytics, startAnalytics } from "@/lib/analytics";
import { CONSENT_OPEN_EVENT, getConsent, needsConsent, readCountry, setConsent, type Consent } from "@/lib/consent";
import styles from "./styles.module.scss";

/** Asks visitors from the EU, EEA, UK and Switzerland to opt in to analytics. Nobody else sees it. */
export function ConsentBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (needsConsent(readCountry()) && !getConsent()) setOpen(true);
    const show = () => setOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, show);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, show);
  }, []);

  if (!open) return null;

  const choose = (choice: Consent) => {
    const previous = getConsent();
    setConsent(choice);
    setOpen(false);
    if (choice === "granted") startAnalytics();
    else if (previous === "granted") {
      // Already running: wipe what it stored and reload so it stops.
      clearAnalytics();
      location.reload();
    }
  };

  return (
    <section className={styles.root} aria-label={ui.consent.label}>
      <p className={styles.message}>{ui.consent.message}</p>
      <div className={styles.actions}>
        {/* Same style for both: rejecting must be as easy as accepting. */}
        <Button variant="ghost" icon="close" onClick={() => choose("denied")}>
          {ui.consent.reject}
        </Button>
        <Button variant="ghost" icon="check" onClick={() => choose("granted")}>
          {ui.consent.accept}
        </Button>
      </div>
    </section>
  );
}
