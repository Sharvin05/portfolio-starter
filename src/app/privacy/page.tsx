import type { Metadata } from "next";
import { connect, footer, nav, privacyPage, profile, site } from "@content";
import { Background } from "@/components/Background";
import { Footer } from "@/components/Footer";
import { PrivacyPolicy } from "@/components/PrivacyPolicy";
import { SiteNav } from "@/components/SiteNav";

const { title, description } = privacyPage.meta;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy" },
  openGraph: { title, description, url: "/privacy", type: "website", siteName: profile.name, locale: site.locale },
};

export default function PrivacyRoute() {
  return (
    <>
      <Background />
      <SiteNav name={profile.name} items={nav} socials={connect.links} />
      <main id="main">
        <PrivacyPolicy />
      </main>
      <Footer name={profile.name} note={footer.note} />
    </>
  );
}
