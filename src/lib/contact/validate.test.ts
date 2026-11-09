import assert from "node:assert/strict";
import { test } from "node:test";
import { LIMITS, validateContact } from "./validate";

const valid = { name: "Sam Lee", email: "sam@example.com", message: "Hello, I have a project for you." };

test("accepts a valid message and trims it", () => {
  const result = validateContact({ ...valid, name: "  Sam Lee  " });
  assert.deepEqual(result, { ok: true, data: valid });
});

test("rejects missing, malformed and out-of-range fields", () => {
  const cases: [Record<string, unknown>, string][] = [
    [{ ...valid, name: "" }, "name"],
    [{ ...valid, name: "x".repeat(LIMITS.name.max + 1) }, "name"],
    [{ ...valid, name: "Sam\r\nBcc: someone" }, "name"],
    [{ ...valid, name: "Sam\tLee" }, "name"],
    [{ ...valid, email: "sam@example" }, "email"],
    [{ ...valid, email: "sam lee@example.com" }, "email"],
    [{ ...valid, message: "short" }, "message"],
    [{ ...valid, message: "x".repeat(LIMITS.message.max + 1) }, "message"],
  ];
  for (const [input, field] of cases) {
    const result = validateContact(input);
    assert.equal(result.ok, false, JSON.stringify(input));
    if (!result.ok) assert.deepEqual(Object.keys(result.errors), [field], JSON.stringify(input));
  }
});

test("treats non-objects and non-strings as empty", () => {
  for (const input of [null, "text", 42, { name: 1, email: [], message: {} }]) {
    const result = validateContact(input);
    assert.equal(result.ok, false);
    if (!result.ok) assert.deepEqual(Object.keys(result.errors).sort(), ["email", "message", "name"]);
  }
});
