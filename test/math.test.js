import { test } from "node:test";
import assert from "node:assert/strict";
import { addNear, subNear } from "../src/math.js";

test("addNear adds amounts without floating-point error", () => {
  assert.equal(addNear("0.1", "0.2"), "0.3");
  assert.equal(addNear("0.2", "0.2", "0.5"), "0.9");
  assert.equal(addNear("1"), "1");
});

test("addNear needs at least one amount", () => {
  assert.throws(() => addNear(), /at least one amount/);
});

test("subNear subtracts exactly", () => {
  assert.equal(subNear("5", "1.6"), "3.4");
  assert.equal(subNear("0.3", "0.1"), "0.2");
  assert.equal(subNear("1", "1"), "0");
});

test("subNear refuses a negative result", () => {
  assert.throws(() => subNear("0.1", "0.2"), /cannot subtract/);
});
