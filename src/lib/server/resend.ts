import { site, ui } from "@content";
import type { ContactInput } from "@/lib/contact/validate";

interface SendConfig {
  apiKey: string;
  from: string;
  to: string;
}

const escapeHtml = (text: string) =>
  text.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c);

/** Sends the contact message to your inbox. Replying goes straight to the visitor. */
export async function sendContactEmail(input: ContactInput, config: SendConfig): Promise<boolean> {
  const html = `
    <p><strong>From:</strong> ${escapeHtml(input.name)} &lt;${escapeHtml(input.email)}&gt;</p>
    <p style="white-space:pre-wrap">${escapeHtml(input.message)}</p>`;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        reply_to: input.email,
        subject: ui.contactForm.emailSubject(input.name, site.domain),
        text: `From: ${input.name} <${input.email}>\n\n${input.message}`,
        html,
      }),
    });
    return res.ok;
  } catch (error) {
    console.error("[contact] Resend request failed:", error);
    return false;
  }
}
