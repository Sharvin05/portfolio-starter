import posthog from "posthog-js";

// Each tool is off unless its env var is set.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;

let started = false;

/** Starts Google Analytics and PostHog. Call only once the visitor is allowed to be tracked. */
export function startAnalytics(): void {
  if (started) return;
  started = true;

  if (POSTHOG_KEY) {
    posthog.init(POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
      // Pageviews on client-side navigation, plus PostHog's other current defaults.
      defaults: "2025-05-24",
    });
  }

  if (GA_ID) {
    window.dataLayer = window.dataLayer ?? [];
    // gtag.js reads the `arguments` object itself, so this can't be an arrow function or use rest params.
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID);
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
    document.head.append(script);
  }
}

/** Removes the cookies and storage GA and PostHog left behind, after a visitor withdraws consent. */
export function clearAnalytics(): void {
  // GA sets its cookies on the widest domain it can, so try every parent of this host.
  const parts = location.hostname.split(".");
  const domains = parts.map((_, i) => parts.slice(i).join("."));
  for (const cookie of document.cookie.split("; ")) {
    const name = cookie.split("=")[0] ?? "";
    if (!/^(_ga|_gid|ph_)/.test(name)) continue;
    document.cookie = `${name}=; Max-Age=0; path=/`;
    for (const domain of domains) document.cookie = `${name}=; Max-Age=0; path=/; domain=.${domain}`;
  }
  try {
    for (const key of Object.keys(localStorage)) if (key.startsWith("ph_")) localStorage.removeItem(key);
  } catch {
    // Storage blocked: nothing was stored there.
  }
}
