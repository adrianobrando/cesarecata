import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import { spettacoli } from "../data/spettacoli.ts";

test("l'archivio conserva tutti i testi, incluso lo spettacolo non numerato", async () => {
  const source = await readFile(new URL("../testi_spettacoli.txt", import.meta.url), "utf8");
  const entries = source.replace("\nLa vita invisibile. ", "\n20. La vita invisibile. ").split(/^\d+\. /m).slice(1);
  const normalize = (text) => text.replace(/\s+/g, " ").trim();
  const placeholder = "Descrizione in arrivo. Contattaci per maggiori informazioni su questo spettacolo.";
  const missing = new Set([13, 15, 25, 26, 27, 28]);
  assert.equal(spettacoli.length, 29);
  assert.equal(entries.length, spettacoli.length);
  assert.equal(new Set(spettacoli.map((show) => show.id)).size, spettacoli.length);
  spettacoli.forEach((show, index) => {
    assert.equal(show.description.includes(placeholder), missing.has(index), show.title);
    if (index === 25) {
      assert.equal(normalize(show.title), normalize(entries[index]));
      assert.equal(show.description, placeholder);
    } else {
      assert.equal(
        normalize(`${show.title}. ${show.description.replace(placeholder, "")}`),
        normalize(entries[index]),
        show.title,
      );
    }
    assert.match(show.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  });
});

test("le immagini disponibili sono associate agli spettacoli corretti", async () => {
  const images = {
    "odissea-juke-box": "ls_odisseajukebox.webp",
    "se-giasone-fosse-rimasto-single": "ls_giasonefosserimastosingle.webp",
    "shakespeare-juke-box": "ls_shakspearejukebox.webp",
    "ginevra-ne-vale-la-pena": "ls_ginevranevalelapena.webp",
    "orfeo-le-selkies-e-mi-nonnu": "ls_orfeo.webp",
    "fate-caprine-cavalieri-erranti": "ls_fatecaprineecavalierierranti.webp",
    "se-sei-perseo": "ls_seseiperseo.webp",
    "il-labirinto-e-l-abbandono": "ls_labirintoeabbandono.webp",
    "l-urlo-della-farfalla": "ls_urlodellafarfalla.webp",
    "la-vuota-corona": "ls_lavuotacorona.webp",
    "le-streghe-e-il-destino": "ls_stregheedestino.webp",
    "tue-so-le-laudi": "ls_tuesolelaudi.webp",
    "la-vita-invisibile": "ls_irlandaevitainvisibile.webp",
    "la-musa-nel-bicchiere": "ls_lamusanelbicchiere.webp",
    "rien-de-rien": "ls_rienderien.webp",
    "la-geniale-cortigiana": "ls_lagenialecortigiana.webp",
  };
  for (const show of spettacoli) {
    const expected = images[show.id] ?? "spettacolo-placeholder.svg";
    assert.equal(show.image, `/images/${expected}`, show.title);
    await access(new URL(`../public/images/${expected}`, import.meta.url));
  }
});

test("i quattro spettacoli originali conservano il loro riferimento precedente", () => {
  const refs = Object.fromEntries(spettacoli.filter((show) => show.legacy_ref).map((show) => [show.title, show.legacy_ref]));
  assert.deepEqual(refs, {
    "Fate Caprine & Cavalieri Erranti": "fate-caprine",
    "Il Labirinto e l'Abbandono": "labirinto",
    "L'Urlo della Farfalla": "urlo-farfalla",
    "Rien de Rien": "rien-de-rien",
  });
});
