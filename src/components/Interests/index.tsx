import { interestsPage } from "@content";
import { Contact } from "@/components/Contact";
import { SectionHeader } from "@/components/SectionHeader";
import { DrivingMoment } from "./components/DrivingMoment";
import { GameShelf } from "./components/GameShelf";
import { InterestGrid } from "./components/InterestGrid";
import styles from "./styles.module.scss";

export function Interests() {
  const { intro, driving, sports, games, loves, close } = interestsPage;
  return (
    <>
      <section className={styles.intro} aria-labelledby="interests-title">
        <SectionHeader id="interests-title" level={1} kicker={intro.kicker} title={intro.title} lede={intro.lede} />
      </section>
      <DrivingMoment id="driving" {...driving} />
      <InterestGrid id="sports" {...sports} layout="row" />
      <GameShelf id="games" {...games} />
      <InterestGrid id="loves" {...loves} layout="feature" />
      <Contact intro={close} />
    </>
  );
}
