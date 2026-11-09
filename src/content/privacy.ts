import { profile } from "./profile";
import { site } from "./site";
import type { PrivacyPage } from "./types";

/**
 * The /privacy page. Keep it in step with what the site does:
 * the contact form (Resend, Cloudflare Turnstile), hosting logs, and the optional
 * Google Analytics and PostHog tools set in .env. Change `updated` whenever you edit it.
 */
export const privacyPage: PrivacyPage = {
  meta: {
    title: `Privacy Policy — ${profile.name}`,
    description: `What ${site.domain} collects, why, who handles it and how to ask for it to be deleted.`,
  },
  intro: {
    kicker: "Privacy",
    title: [{ text: "Your Data," }, { text: "Kept Simple.", highlight: true }],
    lede: "This is a personal portfolio. It collects as little as it can, and this page explains all of it in plain words.",
  },
  updated: { date: "2026-11-10", label: "Last updated November 10, 2026" },
  contentsLabel: "On this page",
  sections: [
    {
      id: "short-version",
      title: "The Short Version",
      body: [],
      items: [
        "If you send a message, I get your name, email and message by email so I can reply.",
        "A spam check from Cloudflare runs when you send the form.",
        "Analytics run only where the law allows, and in the EU, EEA, UK and Switzerland only after you accept them.",
        "I don't sell your data, show ads or build profiles about you.",
        "You can ask me to show, correct or delete your data at any time.",
      ],
    },
    {
      id: "who",
      title: "Who Runs This Site",
      body: [
        `${site.domain} is run by ${profile.name} as a personal portfolio. I decide how the data described here is used, which makes me the "controller" under data protection laws such as the GDPR.`,
        "For any privacy question or request, send me a message through the contact form. My email address isn't published on the site to keep spam away, but I reply from it.",
      ],
      links: [{ label: "Open the contact form", href: "/#contact" }],
    },
    {
      id: "what",
      title: "What I Collect",
      body: ["The site has no accounts, no logins and no database of visitors. Here is everything it handles:"],
      items: [
        { term: "Messages you send.", text: "Your name, email address and message from the contact form. They're sent straight to my inbox by email and aren't stored on the site." },
        { term: "Spam check.", text: "When you send the form, Cloudflare Turnstile checks that you're a person using signals from your browser and your IP address." },
        { term: "Abuse protection.", text: "Your IP address is held in the server's memory for up to 10 minutes to limit how many messages can be sent from one place." },
        { term: "Server logs.", text: "Like any website, the hosting service logs basic request details (IP address, browser, page requested, time) to keep the site running and secure." },
        { term: "Analytics, if allowed.", text: "Pages you view, clicks, the site that sent you, your device and browser type, and your rough location (country or city, worked out from your IP address)." },
        { term: "Session recordings, if allowed.", text: "PostHog can record how you move through a page (scrolling, clicks, mouse movement) so I can spot what's confusing. Text you type into form fields is masked and not recorded." },
      ],
    },
    {
      id: "why",
      title: "Why I Use It",
      body: ["Each use has a legal basis under the GDPR and similar laws:"],
      items: [
        { term: "Replying to your message", text: "because you asked me to (legitimate interest, or steps you requested before any agreement)." },
        { term: "Spam checks, abuse limits and server logs", text: "to keep the site and my inbox safe (legitimate interest)." },
        { term: "Analytics and session recordings", text: "to learn which parts of the site are useful and fix what isn't. In the EU, EEA, UK and Switzerland this is based on your consent; elsewhere on my legitimate interest in improving the site." },
      ],
    },
    {
      id: "cookies",
      title: "Cookies and Local Storage",
      body: [
        "Visitors from the EU, EEA, UK and Switzerland (or anyone whose country can't be detected) are asked before any analytics cookie is set. You can change your answer any time with Cookie Settings in the footer.",
        "You can also block or delete cookies in your browser settings. The site still works without them.",
      ],
      items: [
        { term: "country (cookie):", text: "your country code, worked out from your IP address, so the site knows whether to ask for consent. Deleted when you close your browser." },
        { term: "analytics-consent (local storage):", text: "whether you accepted or rejected analytics. Kept until you clear your browser data." },
        { term: "theme (local storage):", text: "the colour theme you picked. Kept until you clear your browser data." },
        { term: "_ga, _ga_* (cookies):", text: "Google Analytics, to tell visits apart. Kept for up to 2 years, only where analytics are allowed." },
        { term: "ph_* (cookie and local storage):", text: "PostHog, to tell visits apart and link session recordings. Kept for up to 1 year, only where analytics are allowed." },
      ],
      links: [{ label: "Google Analytics opt-out add-on", href: "https://tools.google.com/dlpage/gaoptout" }],
    },
    {
      id: "sharing",
      title: "Who Else Handles It",
      body: [
        "I don't sell or rent your data, and I don't share it for advertising. A few services process it on my behalf, each under its own privacy policy:",
      ],
      items: [
        { term: "Vercel", text: "hosts the site and keeps its server logs." },
        { term: "Cloudflare", text: "runs the Turnstile spam check on the contact form." },
        { term: "Resend", text: "delivers contact form messages to my inbox." },
        { term: "Google Analytics", text: "measures visits, where analytics are allowed." },
        { term: "PostHog", text: "measures visits and records sessions, where analytics are allowed." },
      ],
      links: [
        { label: "Vercel privacy policy", href: "https://vercel.com/legal/privacy-policy" },
        { label: "Cloudflare privacy policy", href: "https://www.cloudflare.com/privacypolicy/" },
        { label: "Resend privacy policy", href: "https://resend.com/legal/privacy-policy" },
        { label: "Google privacy policy", href: "https://policies.google.com/privacy" },
        { label: "PostHog privacy policy", href: "https://posthog.com/privacy" },
      ],
    },
    {
      id: "transfers",
      title: "Data Sent Abroad",
      body: [
        "Most of these services are based in the United States, so your data may be processed there. They rely on the EU-US Data Privacy Framework or the European Commission's Standard Contractual Clauses to protect data sent from the EU, EEA, UK and Switzerland.",
      ],
    },
    {
      id: "retention",
      title: "How Long I Keep It",
      body: [],
      items: [
        { term: "Messages:", text: "as long as we're talking, then deleted within 2 years of your last message, or sooner if you ask." },
        { term: "IP addresses for abuse limits:", text: "up to 10 minutes." },
        { term: "Server logs:", text: "a few days, as set by the hosting service." },
        { term: "Analytics and session recordings:", text: "up to 14 months, then deleted or made anonymous." },
      ],
    },
    {
      id: "rights",
      title: "Your Rights",
      body: [
        "Wherever you live, you can ask me to show you the data I have about you, correct it, delete it, or stop using it. Depending on where you live, you may also have the right to get a copy in a portable format, to object to how it's used, and to withdraw consent at any time without affecting what happened before.",
        "Send your request through the contact form. I'll reply within one month and may ask you to confirm it's really you. If you're unhappy with my answer, you can complain to your local data protection authority.",
        "If you live in California: I don't sell or share personal information as the CCPA defines it, and you won't be treated differently for using your rights.",
      ],
    },
    {
      id: "security",
      title: "Security",
      body: [
        "The site is served only over HTTPS, and the keys for the email and spam-check services stay on the server, never in your browser. No system is perfectly secure, but I keep what's collected small so there's little to lose.",
      ],
    },
    {
      id: "children",
      title: "Children",
      body: [
        "This site isn't meant for children under 16, and I don't knowingly collect their data. If you think a child has sent me a message, let me know and I'll delete it.",
      ],
    },
    {
      id: "links",
      title: "Links to Other Sites",
      body: ["Links to other websites, such as my social profiles or projects, open sites with their own privacy policies. This policy doesn't cover them."],
    },
    {
      id: "changes",
      title: "Changes to This Policy",
      body: ["If what the site collects changes, I'll update this page and the date at the top. Big changes will be noted here before they take effect."],
    },
  ],
};
