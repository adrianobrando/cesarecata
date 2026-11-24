import assert from "node:assert/strict";
import test from "node:test";
import { countShowDates, formatShowDates, getFirstShowDate, getShowDateCount } from "../lib/show-dates.ts";

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

test("la prima data considera riferimenti attuali e precedenti e confronta gli istanti", () => {
  const events = [
    { id: "c", show_reference: "attuale", event_date: "2027-05-01T10:00:00Z" },
    { id: "b", show_reference: "precedente", event_date: "2027-05-01T11:00:00+02:00" },
    { id: "a", show_reference: "attuale", event_date: "2027-05-01T09:00:00Z" },
    { id: "x", show_reference: "altro", event_date: "2027-01-01T00:00:00Z" },
  ];
  assert.equal(getFirstShowDate(events, { id: "attuale", legacy_ref: "precedente" })?.id, "a");
  assert.equal(getFirstShowDate(events, { id: "precedente", legacy_ref: "precedente" })?.id, "b");
  assert.equal(getFirstShowDate(events, { id: "mancante" }), undefined);
});
