import type { HeadlinePart } from "@content";
import { BrandIcon } from "@/components/BrandIcon";
import { DEFAULT_THEME, getTheme } from "@/lib/theme/themes";

export const SHARE_CARD_SIZE = { width: 1200, height: 630 };

interface ShareCardProps {
  /** Small line above the headline, e.g. "Alex Morgan · Full Stack Software Engineer". */
  kicker: string;
  title: readonly HeadlinePart[];
  /** Bottom line, e.g. the site's domain. */
  footer: string;
}

/**
 * The link-preview image (Open Graph) for social apps and chat.
 * Rendered to PNG by next/og, so it uses inline styles (no CSS modules there).
 */
export function ShareCard({ kicker, title, footer }: ShareCardProps) {
  const { canvas, surface, fg, fgSoft, accent } = getTheme(DEFAULT_THEME).tokens;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        color: fg,
        backgroundColor: canvas,
        backgroundImage: `radial-gradient(circle at 85% 15%, ${accent}55, transparent 45%), radial-gradient(circle at 10% 110%, ${surface}, transparent 60%)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <BrandIcon size={88} />
        <div style={{ display: "flex", fontSize: 30, color: fgSoft }}>{kicker}</div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", fontSize: 88, lineHeight: 1.04, letterSpacing: -3, maxWidth: 1000 }}>
        {title.map((part, i) => (
          <span key={i} style={{ color: part.highlight ? accent : fg, marginRight: 22 }}>
            {part.text}
          </span>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, color: fgSoft }}>
        <div style={{ width: 40, height: 3, backgroundColor: accent }} />
        {footer}
      </div>
    </div>
  );
}
