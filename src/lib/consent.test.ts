import { test } from "node:test";
import assert from "node:assert/strict";
import { needsConsent } from "./consent";

test("EU, EEA, UK and Swiss visitors need consent", () => {
  for (const country of ["DE", "fr", "GB", "NO", "CH"]) assert.equal(needsConsent(country), true, country);
});

test("other visitors don't", () => {
  for (const country of ["US", "IN", "AE", "AU"]) assert.equal(needsConsent(country), false, country);
});

test("unknown country is treated as needing consent", () => {
  for (const country of [undefined, "", "XX", "T1"]) assert.equal(needsConsent(country), true, String(country));
});
