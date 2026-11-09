import { connect, footer, nav, profile } from "@content";
import { Background } from "@/components/Background";
import { Hero } from "@/components/Hero";
import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { SiteNav } from "@/components/SiteNav";
import { Skills } from "@/components/Skills";

export default function HomePage() {
  return (
    <>
      <Background />
      <SiteNav name={profile.name} items={nav} socials={connect.links} />
      <main id="main">
        <Hero />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer name={profile.name} note={footer.note} />
    </>
  );
}
