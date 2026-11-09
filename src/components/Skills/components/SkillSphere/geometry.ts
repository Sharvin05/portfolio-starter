export interface Point3 {
  x: number;
  y: number;
  z: number;
}

/** Spreads `count` points evenly over a unit sphere (Fibonacci lattice). */
export function fibonacciSphere(count: number): Point3[] {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: count }, (_, i) => {
    const y = count === 1 ? 0 : 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = i * golden;
    return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
  });
}

/** Rotates a point around the Y axis, then the X axis. */
export function rotate(p: Point3, rx: number, ry: number): Point3 {
  const cosY = Math.cos(ry), sinY = Math.sin(ry);
  const x1 = p.x * cosY + p.z * sinY;
  const z1 = -p.x * sinY + p.z * cosY;
  const cosX = Math.cos(rx), sinX = Math.sin(rx);
  return { x: x1, y: p.y * cosX - z1 * sinX, z: p.y * sinX + z1 * cosX };
}

/** The `rotate` angles that turn point `p` to face the viewer (straight ahead on +z). */
export function facingAngles(p: Point3): { rx: number; ry: number } {
  const ry = Math.atan2(-p.x, p.z);
  return { rx: Math.atan2(p.y, Math.hypot(p.x, p.z)), ry };
}
