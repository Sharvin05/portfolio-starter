import type { HeadlinePart } from "./types";

/** The Contact section. Messages are emailed to CONTACT_TO_EMAIL (see .env.example); your address never appears on the site. */
export const contact = {
  kicker: "Contact",
  title: [{ text: "Have an Idea?" }, { text: "Let's Build It.", highlight: true }] satisfies HeadlinePart[],
  lede: "New projects, collaborations, or just a good idea worth talking through. Send a message and I'll get back to you.",
  socialsTitle: "Elsewhere",
  form: {
    nameLabel: "Name",
    namePlaceholder: "Alex Morgan",
    emailLabel: "Email",
    emailPlaceholder: "email@company.com",
    messageLabel: "Message",
    messagePlaceholder: "Tell me about your idea…",
    submit: "Send Message",
    sending: "Sending…",
    successTitle: "Message Sent",
    successBody: "Thanks for reaching out. I'll reply to the email you gave.",
    sendAnother: "Send Another Message",
    verifyPrompt: "Complete the check above to send.",
  },
} as const;

export const footer = {
  privacy: { label: "Privacy Policy", href: "/privacy" },
  note: "Built with Next.js.",
} as const;
