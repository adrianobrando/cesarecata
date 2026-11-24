import assert from "node:assert/strict";
import test from "node:test";
import { splitShowDescription } from "../lib/show-description.ts";

test("separa il sottotitolo conservando tutti i paragrafi della descrizione", () => {
  assert.deepEqual(splitShowDescription("Sottotitolo\n\nPrimo paragrafo\n\nSecondo paragrafo"), {
    subtitle: "Sottotitolo",
    body: "Primo paragrafo\n\nSecondo paragrafo",
  });
});

test("una descrizione senza sottotitolo rimane testo normale", () => {
  assert.deepEqual(splitShowDescription("Descrizione in arrivo."), {
    subtitle: null,
    body: "Descrizione in arrivo.",
  });
});
