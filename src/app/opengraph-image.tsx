import { ImageResponse } from "next/og";
import { profile, site } from "@content";
import { SHARE_CARD_SIZE, ShareCard } from "@/components/ShareCard";

/** Link preview for the home page (and any page without its own). */
export const alt = site.title;
export const size = SHARE_CARD_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<ShareCard kicker={`${profile.name} · ${profile.role}`} title={profile.headline} footer={site.domain} />, size);
}
