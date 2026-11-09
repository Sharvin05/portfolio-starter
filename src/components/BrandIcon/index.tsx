import { brandMark } from "@content";
import { DEFAULT_THEME, getTheme } from "@/lib/theme/themes";

interface BrandIconProps {
  size: number;
  /** Corner rounding as a share of the size (0.23 ≈ app-icon squircle). */
  radius?: number;
}

/**
 * The logo mark on a rounded square, for favicons and app icons.
 * Rendered to PNG by next/og, so it uses inline styles (no CSS modules there).
 */
export function BrandIcon({ size, radius = 0.23 }: BrandIconProps) {
  const { surface, fg } = getTheme(DEFAULT_THEME).tokens;
  // Small icons get a slightly heavier stroke so the mark stays readable
  const stroke = size <= 48 ? brandMark.stroke * 1.3 : brandMark.stroke;
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: surface,
        borderRadius: size * radius,
      }}
    >
      <svg width={size} height={size} viewBox={brandMark.viewBox}>
        <g transform={brandMark.transform}>
          <path d={brandMark.rightLeg} fill="none" stroke={fg} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
          <path d={brandMark.bar} fill={brandMark.trailColour} />
          <path d={brandMark.leftLeg} fill="none" stroke={fg} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}
