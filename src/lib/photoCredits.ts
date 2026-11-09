import type { Photo, PhotoCredit } from "@content";

export interface CreditEntry extends PhotoCredit {
  /** What the photo shows, e.g. "Football". */
  subject: string;
}

/** The credits for a page's photos, each listed once, skipping photos that need none. */
export function creditsFor(photos: [subject: string, photo: Photo | undefined][]): CreditEntry[] {
  const seen = new Set<string>();
  return photos.flatMap(([subject, photo]) => {
    if (!photo?.credit || seen.has(photo.credit.source)) return [];
    seen.add(photo.credit.source);
    return [{ subject, ...photo.credit }];
  });
}
