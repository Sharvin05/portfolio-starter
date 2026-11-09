import Image from "next/image";
import type { Photo as PhotoData } from "@content";
import { cx } from "@/lib/cx";
import styles from "./styles.module.scss";

interface PhotoProps {
  photo: PhotoData;
  /** The width the photo is shown at, for picking the file size, e.g. "(min-width: 1280px) 33vw, 100vw". */
  sizes: string;
  className?: string;
}

/** A content photo that fills its frame, cropped around `photo.focus`. */
export function Photo({ photo, sizes, className }: PhotoProps) {
  return (
    <Image
      className={cx(styles.root, className)}
      src={photo.image}
      alt={photo.alt}
      sizes={sizes}
      placeholder={photo.image.blurDataURL ? "blur" : "empty"}
      style={photo.focus ? { objectPosition: photo.focus } : undefined}
    />
  );
}
