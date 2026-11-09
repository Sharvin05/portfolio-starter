import { connect, contact } from "@content";
import { SectionHeader } from "@/components/SectionHeader";
import { ContactForm } from "./components/ContactForm";
import { SocialList } from "./components/SocialList";
import styles from "./styles.module.scss";

export function Contact() {
  return (
    <section className={styles.root} id="contact" aria-labelledby="contact-title">
      <SectionHeader id="contact-title" kicker={contact.kicker} title={contact.title} lede={contact.lede} />
      <div className={styles.grid}>
        <ContactForm copy={contact.form} turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} />
        <SocialList title={contact.socialsTitle} links={connect.links} />
      </div>
    </section>
  );
}
