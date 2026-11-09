/**
 * Interface text: buttons, menus, screen-reader labels and messages.
 * Personal content lives in the other files; this is the wording of the site itself.
 */
export const ui = {
  skipLink: "Skip to Content",
  backToTop: "Back to Top",

  nav: {
    label: "Main",
    homeLabel: (name: string) => `${name}, back to top`,
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menuLabel: "Menu",
  },

  theme: {
    menuLabel: "Colour theme",
    heading: "Theme",
    triggerLabel: (themeLabel: string) => `Colour theme: ${themeLabel}`,
    pauseMotion: "Pause Background Motion",
  },

  hero: {
    greeting: (name: string, role: string) => `Hi, I'm ${name} — ${role}`,
    connectLabel: "Social links",
    factsLabel: "Quick facts",
  },

  experience: {
    /** Separator between company and location on a job card. */
    metaSeparator: "·",
    present: "Present",
  },

  skills: {
    allTab: "All",
    allTitle: "Everything",
    allBlurb: "Everything I work with, from interface to infrastructure.",
    filterLabel: "Filter skills by category",
    sphereHint: "Drag to spin",
  },

  education: {
    yearsLabel: "years of engineering",
    subjectsLabel: "featured subjects",
    affiliatedTo: "Affiliated to",
  },

  comingSoon: {
    logoLabel: (name: string) => `${name} logo. Activate to fire the light trail.`,
  },

  contactForm: {
    honeypotLabel: "Company",
    turnstileMissing: "Bot check isn't configured (missing NEXT_PUBLIC_TURNSTILE_SITE_KEY).",
    sendFailed: "Your message couldn't be sent. Try again.",
    offline: "You seem to be offline. Check your connection and try again.",
    validation: {
      nameMissing: "Enter your name.",
      nameTooLong: (max: number) => `Keep your name under ${max} characters.`,
      emailMissing: "Enter your email so I can reply.",
      emailInvalid: "That email doesn't look right.",
      messageMissing: "Write a short message.",
      messageTooShort: (min: number) => `Add a little more detail (at least ${min} characters).`,
      messageTooLong: (max: number) => `Keep it under ${max} characters.`,
    },
    api: {
      badRequest: "Something went wrong with that request. Try again.",
      checkFields: "Check the highlighted fields.",
      rateLimited: "You've sent a few messages already. Try again in a few minutes.",
      notConfigured: "The contact form isn't set up yet. Try again later.",
      botCheckFailed: "The bot check didn't pass. Refresh the check and try again.",
      sendFailed: "Your message couldn't be sent right now. Try again in a moment.",
    },
    /** Subject of the email you receive. */
    emailSubject: (senderName: string, domain: string) => `New message from ${senderName} via ${domain}`,
  },
} as const;
