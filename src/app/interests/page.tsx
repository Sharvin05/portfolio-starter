import type { Metadata } from "next";
import type { Photo } from "@content";
import { connect, footer, interestsPage, nav, profile, site } from "@content";
import { Background } from "@/components/Background";
import { Footer } from "@/components/Footer";
import { Interests } from "@/components/Interests";
import { JsonLd } from "@/components/JsonLd";
import { SiteNav } from "@/components/SiteNav";
import { creditsFor } from "@/lib/photoCredits";
import { interestsGraph } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: interestsPage.meta.title,
  description: interestsPage.meta.description,
  alternates: { canonical: "/interests" },
  openGraph: { title: interestsPage.meta.title, description: interestsPage.meta.description, url: "/interests", type: "website", siteName: profile.name, locale: site.locale },
  twitter: { card: "summary_large_image", title: interestsPage.meta.title, description: interestsPage.meta.description },
};

const { driving, sports, loves } = interestsPage;
const credits = creditsFor([[driving.kicker, driving.photo], ...[...sports.items, ...loves.items].map((i): [string, Photo | undefined] => [i.title, i.photo])]);

export default function InterestsRoute() {
  return (
    <>
      <JsonLd graph={interestsGraph()} />
      <Background />
      <SiteNav name={profile.name} items={nav} socials={connect.links} />
      <main id="main">
        <Interests />
      </main>
      <Footer name={profile.name} note={footer.note} credits={credits} />
    </>
  );
}
