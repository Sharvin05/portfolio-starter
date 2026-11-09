import assert from "node:assert/strict";
import { test } from "node:test";
import type { Role } from "@content";
import { formatDuration, formatRange } from "./dates";

const role = (start: Role["start"], end: Role["end"]): Role => ({
  id: "r",
  title: "Engineer",
  company: "Acme",
  location: "Remote",
  type: "Full-time",
  start,
  end,
  yearsLabel: "",
  bullets: [],
  tags: [],
});

test("counts months inclusively", () => {
  assert.equal(formatDuration(role("2022-01", "2022-01")), "1 mo");
  assert.equal(formatDuration(role("2022-01", "2022-12")), "1 yr");
  assert.equal(formatDuration(role("2022-09", "2024-11")), "2 yrs 3 mos");
  assert.equal(formatDuration(role("2022-11", "2023-02")), "4 mos");
});

test("ongoing roles need a date, so server and browser match", () => {
  assert.equal(formatDuration(role("2024-03", "present")), "");
  assert.equal(formatDuration(role("2024-03", "present"), new Date(2025, 2, 15)), "1 yr 1 mo");
});

test("formats ranges with short month names", () => {
  assert.equal(formatRange(role("2022-09", "2024-01")), "Sep 2022 – Jan 2024");
  assert.match(formatRange(role("2022-09", "present")), /^Sep 2022 – \S/);
});
