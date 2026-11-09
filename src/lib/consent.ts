/** Who has to opt in to analytics, and what they chose. */

/** Set by src/middleware.ts from the host's IP-country header. */
export const COUNTRY_COOKIE = "country";
export const CONSENT_STORAGE_KEY = "analytics-consent";
/** Window event that reopens the consent banner (from the footer's "Cookie Settings"). */
export const CONSENT_OPEN_EVENT = "consent:open";

export type Consent = "granted" | "denied";

// EU, EEA, UK and Switzerland: analytics cookies need opt-in consent there.
const CONSENT_COUNTRIES = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL",
  "PL", "PT", "RO", "SK", "SI", "ES", "SE", // EU
  "IS", "LI", "NO", // EEA
  "GB", "CH",
]);

/** True when the visitor must opt in first. An unknown country (no header, XX, Tor) counts as yes, to stay safe. */
export function needsConsent(country: string | undefined): boolean {
  if (!country || country === "XX" || country === "T1") return true;
  return CONSENT_COUNTRIES.has(country.toUpperCase());
}

/** Browser only. */
export function readCountry(): string | undefined {
  const match = document.cookie.match(new RegExp(`(?:^|; )${COUNTRY_COOKIE}=([^;]*)`));
  return match?.[1] ? decodeURIComponent(match[1]) : undefined;
}

export function getConsent(): Consent | undefined {
  try {
    const value = localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : undefined;
  } catch {
    return undefined;
  }
}

export function setConsent(value: Consent): void {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // Storage blocked: the choice lasts for this page view only.
  }
}

/** Browser only: may analytics run right now? */
export function analyticsAllowed(): boolean {
  return !needsConsent(readCountry()) || getConsent() === "granted";
}
