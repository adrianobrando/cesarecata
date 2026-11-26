import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import Papa from "papaparse";
import { parseEventRows, showOptions } from "../lib/event-import.ts";

const shows = showOptions([]);
const header = ["titolo", "sottotitolo", "data", "ora", "luogo", "attori", "ingresso", "link_prevendita"];

test("the downloadable CSV imports archive titles and subtitles", () => {
  const parsed = Papa.parse(readFileSync(new URL("../public/modello-date.csv", import.meta.url), "utf8"));
  const events = parseEventRows(parsed.data, shows);
  assert.equal(events.length, 2);
  assert.equal(events[0].show_reference, "odissea-juke-box");
  assert.equal(events[0].subtitle, "Lezione-spettacolo interattiva sul poema omerico.");
  assert.equal(events[0].event_date, new Date("2027-05-10T20:30:00").toISOString());
  assert.equal(events[1].entry_type, "pagamento");
});

test("new shows can be reused in the same import and in subsequent events", () => {
  const rows = [header, ["Titolo nuovo", "Sottotitolo", "2027-05-01", "20:00"], ["Titolo nuovo", "", "2027-05-02", "20:30"]];
  const events = parseEventRows(rows, shows);
  assert.equal(events[1].show_reference, "titolo-nuovo");
  assert.equal(events[1].subtitle, "Sottotitolo");
  const catalog = showOptions([{ ...events[0], id: "1", created_at: "2027-01-01" }]);
  assert.equal(catalog.find((show) => show.reference === "titolo-nuovo").subtitle, "Sottotitolo");
});

test("Excel dates and times, quoted fields and invalid rows are handled", () => {
  const events = parseEventRows([header, ["Odissea Juke-Box", "", new Date("2027-05-10T00:00:00Z"), 0.5, "Teatro; Roma"]], shows);
  assert.equal(events[0].event_date, new Date("2027-05-10T12:00:00").toISOString());
  assert.equal(events[0].location, "Teatro; Roma");
  const rounded = parseEventRows([header, ["Odissea Juke-Box", "", "2027-05-10", new Date("1899-12-30T20:29:59.999Z")]], shows);
  assert.equal(rounded[0].event_date, new Date("2027-05-10T20:30:00").toISOString());
  assert.throws(() => parseEventRows([header, ["Nuovo", "", "2027-02-01", "20:30"]], shows), /Riga 2.*sottotitolo/);
  assert.throws(() => parseEventRows([header, ["Odissea Juke-Box", "", "2027-02-30", "20:30"]], shows), /Riga 2.*non valida/);
  assert.throws(() => parseEventRows([header, ["Odissea Juke-Box", "", "2027-05-10", "20:30", "", "", "pagamento", "javascript:alert(1)"]], shows), /Riga 2.*non validi/);
  assert.throws(() => parseEventRows([["titolo", "data", "orario"]], shows), /Intestazioni non valide/);
});
