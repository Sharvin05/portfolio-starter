import Image from "next/image";
import type { ProjectPreview as Preview } from "@content";
import { TerminalLines } from "./components/TerminalLines";
import styles from "./styles.module.scss";

interface ProjectPreviewProps {
  preview?: Preview;
  /** Shown big when there is no preview. */
  address: string;
}

export function ProjectPreview({ preview, address }: ProjectPreviewProps) {
  if (preview?.type === "image") {
    return (
      <Image
        className={styles.image}
        src={preview.image}
        alt={preview.alt}
        placeholder={preview.image.blurDataURL ? "blur" : "empty"}
        sizes="(min-width: 981px) 50vw, 100vw"
      />
    );
  }
  if (preview?.type === "terminal") return <TerminalLines lines={preview.lines} result={preview.result} />;
  return (
    <div className={styles.placeholder}>
      <span className={styles.address} translate="no">
        {address}
      </span>
    </div>
  );
}
