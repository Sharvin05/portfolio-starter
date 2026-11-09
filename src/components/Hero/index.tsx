import { connect, facts, profile } from "@content";
import { ConnectCard } from "./components/ConnectCard";
import { Facts } from "./components/Facts";
import { HeroIntro } from "./components/HeroIntro";
import styles from "./styles.module.scss";

export function Hero() {
  return (
    <div className={styles.root} id="top">
      <div className={styles.main}>
        <ConnectCard title={connect.title} subtitle={connect.subtitle} links={connect.links} />
        <HeroIntro
          cta={profile.cta}
          name={profile.name}
          role={profile.role}
          headline={profile.headline}
          lede={profile.lede}
        />
      </div>
      <Facts facts={facts} />
    </div>
  );
}
