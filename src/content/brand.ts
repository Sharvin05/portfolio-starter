/**
 * Your logo mark, drawn in a 120×120 box: two strokes (drawn as pen lines) and a filled bar.
 * Used for the nav logo, the favicon and the app icons.
 * The strokes take the theme's text colour; the bar keeps `trailColour` on every theme.
 */
export const brandMark = {
  viewBox: "0 0 120 120",
  transform: "translate(0 0)",
  leftLeg: "M28 96 L60 24",
  rightLeg: "M60 24 L92 96",
  bar: "M36 66 L104 66 A3 3 0 0 1 104 72 L36 72 A3 3 0 0 1 36 66 Z",
  stroke: 8,
  trailColour: "#FF6B5B",
} as const;
