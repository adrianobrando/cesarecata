import assert from "node:assert/strict";
import test from "node:test";
import { searchItems } from "../lib/search.ts";
import { libri } from "../data/libri.ts";
import { spettacoli } from "../data/spettacoli.ts";

const items = [
  { title: "Odissea Juke-Box", description: "Un viaggio nel poema omerico" },
  { title: "Shakespeare", description: "Il TEATRO e i suoi personaggi" },
];

test("cerca senza distinzione tra maiuscole e minuscole nel titolo e nella descrizione", () => {
  assert.deepEqual(searchItems(items, " oDISSEA "), [items[0]]);
  assert.deepEqual(searchItems(items, "teatro"), [items[1]]);
});

test("una ricerca vuota o senza corrispondenze non restituisce risultati", () => {
  assert.deepEqual(searchItems(items, "   "), []);
  assert.deepEqual(searchItems(items, "inesistente"), []);
});

test("cerca nei titoli e nelle descrizioni dei libri e degli spettacoli", () => {
  assert.ok(searchItems(libri, "ZATTERA PER ITACA").some((book) => book.id === "una-zattera-per-itaca"));
  assert.ok(searchItems(libri, "palcoscenico").some((book) => book.id === "chiedilo-a-shakespeare"));
  assert.ok(searchItems(spettacoli, "ODISSEA").some((show) => show.id === "odissea-juke-box"));
  assert.ok(searchItems(spettacoli, "poema omerico").some((show) => show.id === "odissea-juke-box"));
});
