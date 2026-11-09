import assert from "node:assert/strict";
import { test } from "node:test";
import type { Photo } from "@content";
import { creditsFor } from "./photoCredits";

const image = { src: "/a.jpg", width: 10, height: 10 };
const credit = { author: "Jane Doe", licence: "CC BY 2.0", source: "https://example.com/a" };

test("lists each credited photo once and skips the rest", () => {
  const shared: Photo = { image, alt: "A road", credit };
  const result = creditsFor([
    ["Driving", shared],
    ["Teaser", shared],
    ["Uncredited", { image, alt: "Mine" }],
    ["Missing", undefined],
  ]);
  assert.deepEqual(result, [{ subject: "Driving", ...credit }]);
});
