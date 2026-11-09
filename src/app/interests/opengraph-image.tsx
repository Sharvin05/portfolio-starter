import { ImageResponse } from "next/og";
import { interestsPage, profile, site } from "@content";
import { SHARE_CARD_SIZE, ShareCard } from "@/components/ShareCard";

/** Link preview for the /interests page. */
export const alt = interestsPage.meta.title;
export const size = SHARE_CARD_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <ShareCard kicker={`${profile.name} · ${interestsPage.intro.kicker}`} title={interestsPage.intro.title} footer={`${site.domain}/interests`} />,
    size,
  );
}
