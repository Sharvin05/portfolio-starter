import { connect, footer, interestsTeaser, nav, profile } from "@content";
import { Background } from "@/components/Background";
import { Hero } from "@/components/Hero";
import { InterestsTeaser } from "@/components/InterestsTeaser";
import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { SiteNav } from "@/components/SiteNav";
import { Skills } from "@/components/Skills";
import { Work } from "@/components/Work";
import { creditsFor } from "@/lib/photoCredits";

const teaserCredits = creditsFor([[interestsTeaser.kicker, interestsTeaser.photo]]);

export default function HomePage() {
  return (
    <>
      <Background />
      <SiteNav name={profile.name} items={nav} socials={connect.links} />
      <main id="main">
        <Hero />
        <Experience />
        <Work />
        <Skills />
        <Education />
        <InterestsTeaser />
        <Contact />
      </main>
      <Footer name={profile.name} note={footer.note} credits={teaserCredits} />
    </>
  );
}
