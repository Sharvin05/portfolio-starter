import type { Metadata } from "next";
import { connect, footer, nav, profile, site, workComingSoon } from "@content";
import { Background } from "@/components/Background";
import { ComingSoon } from "@/components/ComingSoon";
import { Footer } from "@/components/Footer";
import { SiteNav } from "@/components/SiteNav";

export const metadata: Metadata = {
  title: site.pages.work.title,
  description: site.pages.work.description,
};

export default function WorkPage() {
  return (
    <>
      <Background />
      <SiteNav name={profile.name} items={nav} socials={connect.links} />
      <main id="main">
        <ComingSoon copy={workComingSoon} />
      </main>
      <Footer name={profile.name} note={footer.note} />
    </>
  );
}
