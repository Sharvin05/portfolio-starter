import { connect, contact, type HeadlinePart } from "@content";
import { SectionHeader } from "@/components/SectionHeader";
import { ContactForm } from "./components/ContactForm";
import { SocialList } from "./components/SocialList";
import styles from "./styles.module.scss";

interface ContactProps {
  /** Heading above the form; defaults to the Contact section's own. */
  intro?: { kicker: string; title: readonly HeadlinePart[]; lede: string };
}

export function Contact({ intro = contact }: ContactProps) {
  return (
    <section className={styles.root} id="contact" aria-labelledby="contact-title">
      <SectionHeader id="contact-title" kicker={intro.kicker} title={intro.title} lede={intro.lede} />
      <div className={styles.grid}>
        <ContactForm copy={contact.form} turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} />
        <SocialList title={contact.socialsTitle} links={connect.links} />
      </div>
    </section>
  );
}
