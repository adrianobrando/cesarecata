import assert from "node:assert/strict";
import test from "node:test";
import { countShowDates, formatShowDates, getShowDateCount, getShowPage } from "../lib/show-dates.ts";

test("countShowDates raggruppa le date per riferimento senza confondere le chiavi", () => {
  const counts = countShowDates([
    { show_reference: "rien-de-rien" },
    { show_reference: "labirinto" },
    { show_reference: "rien-de-rien" },
    { show_reference: "__proto__" },
  ]);
  assert.equal(counts.get("rien-de-rien"), 2);
  assert.equal(counts.get("labirinto"), 1);
  assert.equal(counts.get("__proto__"), 1);
  assert.equal(counts.has("fate-caprine"), false);
  assert.equal(countShowDates([]).size, 0);
});

test("formatShowDates distingue singolare e plurale", () => {
  assert.equal(formatShowDates(1), "1 nuova data");
  assert.equal(formatShowDates(2), "2 nuove date");
});

test("il badge somma i riferimenti attuali e precedenti senza duplicare quelli identici", () => {
  const counts = countShowDates([
    { show_reference: "l-urlo-della-farfalla" },
    { show_reference: "urlo-farfalla" },
    { show_reference: "rien-de-rien" },
  ]);
  assert.equal(getShowDateCount(counts, { id: "l-urlo-della-farfalla", legacy_ref: "urlo-farfalla" }), 2);
  assert.equal(getShowDateCount(counts, { id: "rien-de-rien", legacy_ref: "rien-de-rien" }), 1);
  assert.equal(getShowDateCount(counts, { id: "altro" }), 0);
});

test("getShowPage pagina quattro spettacoli e gestisce parametri non validi", () => {
  assert.deepEqual(getShowPage("1", 5), { page: 1, totalPages: 2, start: 0 });
  assert.deepEqual(getShowPage("2", 5), { page: 2, totalPages: 2, start: 4 });
  assert.deepEqual(getShowPage("99", 5), { page: 2, totalPages: 2, start: 4 });
  for (const value of [undefined, "0", "-1", "1.5", "2abc", ["2"], "999999999999999999999"]) {
    assert.deepEqual(getShowPage(value, 5), { page: 1, totalPages: 2, start: 0 });
  }
  assert.deepEqual(getShowPage(undefined, 0), { page: 1, totalPages: 1, start: 0 });
});
