import { ImageResponse } from "next/og";
import { BrandIcon } from "@/components/BrandIcon";

/** Favicons and app icons, drawn from the content's logo (brand.ts) and default theme. */
export const contentType = "image/png";

const SIZES = [32, 192, 512] as const;

export function generateImageMetadata() {
  return SIZES.map((size) => ({ id: String(size), size: { width: size, height: size }, contentType }));
}

export default async function Icon({ id }: { id: Promise<string> | string }) {
  const size = Number(await id) || 32;
  return new ImageResponse(<BrandIcon size={size} />, { width: size, height: size });
}
