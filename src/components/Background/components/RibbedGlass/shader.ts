export const vertexShader = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}`;

/** Soft light blobs behind a sheet of vertical glass ribs. */
export const fragmentShader = /* glsl */ `
precision highp float;
uniform float uTime;
uniform vec2 uRes;
uniform vec2 uMouse;
uniform float uDpr;
uniform float uScroll;
uniform float uEnd;      // 0..1 as the page bottom (Contact) comes into view
varying vec2 vUv;

// Theme colours, read from CSS variables and blended when the theme changes
uniform vec3 uCanvas;
uniform vec3 uSurface;
uniform vec3 uMist;
uniform vec3 uFg;
uniform vec3 uAccent;
uniform float uAccentStrength;
uniform float uRib;              // 1 = full rib shading (dark themes), lower on light

float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
float blob(vec2 p, vec2 c, float r) { vec2 d = p - c; return exp(-dot(d, d) / (r * r)); }

void main() {
  vec2 frag = gl_FragCoord.xy / uDpr;
  float f = fract(frag.x / 16.0);            // position inside a 16px rib

  // Each rib refracts what's behind it
  vec2 uv = vUv;
  uv.x += ((f - 0.5) * 0.06 + sin(f * 3.14159) * 0.004) * uRib; // no ribs when uRib is 0

  float aspect = uRes.x / uRes.y;
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  vec2 m = (uMouse - 0.5) * vec2(aspect, 1.0);
  float t = uTime * 0.12;
  float portrait = step(aspect, 1.0);
  float sc = clamp(uScroll, 0.0, 1.0) * (1.0 - uEnd);

  vec3 col = mix(uCanvas, uSurface, smoothstep(-0.6, 0.6, p.y) * 0.9);

  float g1 = blob(p, vec2(-0.33 * aspect + sin(t) * 0.08, 0.22 + cos(t * 0.8) * 0.05), 0.42);
  float g2 = blob(p, vec2(0.05 + m.x * 0.18 + sin(t * 1.3) * 0.06 - sc * 0.55 * (1.0 - portrait),
                          0.02 - portrait * 0.34 + m.y * 0.12 + sc * 0.08 - uEnd * 0.45), 0.36 + sc * 0.06 + uEnd * 0.12);
  float g3 = blob(p, vec2(0.34 * aspect + cos(t * 0.7) * 0.07, 0.34), 0.30);
  float g4 = blob(p, vec2(-0.1 + sin(t * 0.6) * 0.1, -0.55), 0.35);

  col = mix(col, uMist, g1 * 0.55);
  col = mix(col, uMist * 0.9 + uSurface * 0.1, g3 * 0.45);
  col = mix(col, uAccent, g2 * uAccentStrength * (1.0 - uEnd * 0.32));
  col = mix(col, uAccent * 0.55 + uSurface * 0.5, g4 * 0.25 * uAccentStrength);
  col = mix(col, uFg, g2 * g2 * 0.18 * uAccentStrength);
  col = mix(col, uCanvas, sc * 0.28);

  // Rib shading: cylinder highlight and a thin dark seam
  col *= mix(1.0, 0.86 + 0.2 * sin(f * 3.14159), uRib);
  col += 0.05 * uRib * pow(f, 10.0);
  col -= 0.05 * uRib * (1.0 - smoothstep(0.0, 0.06, f));

  col = mix(col, uCanvas, smoothstep(0.25, -0.5, p.y) * 0.55);
  col += (hash(frag + uTime) - 0.5) * 0.025;

  gl_FragColor = vec4(col, 1.0);
}`;
