import assert from "node:assert/strict";
import { test } from "node:test";
import { connect, roles } from "@content";
import { homeGraph, personNode } from "./structuredData";

test("the person node links profiles and the current job", () => {
  const person = personNode();
  assert.deepEqual(person.sameAs, connect.links.map((l) => l.href));
  const current = roles.find((r) => r.end === "present");
  assert.equal((person.worksFor as { name: string } | undefined)?.name, current?.company);
});

test("every node in the home graph has a type and survives JSON", () => {
  const graph = homeGraph();
  assert.ok(graph.every((node) => typeof node["@type"] === "string"));
  assert.deepEqual(JSON.parse(JSON.stringify(graph)), graph);
});
