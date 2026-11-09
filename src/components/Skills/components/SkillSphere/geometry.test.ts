import assert from "node:assert/strict";
import { test } from "node:test";
import { facingAngles, rotate } from "./geometry";

test("facingAngles turns a point to the front of the sphere", () => {
  for (const p of [{ x: 0.3, y: -0.5, z: -0.8 }, { x: -1, y: 0, z: 0 }, { x: 0, y: 0.9, z: 0.1 }]) {
    const { rx, ry } = facingAngles(p);
    const q = rotate(p, rx, ry);
    assert.ok(Math.abs(q.x) < 1e-9 && Math.abs(q.y) < 1e-9, `off-centre: ${JSON.stringify(q)}`);
    assert.ok(q.z > 0, "should face the viewer");
  }
});
