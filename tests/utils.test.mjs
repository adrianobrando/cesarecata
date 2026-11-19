import assert from "node:assert/strict";
import test from "node:test";
import { formatDate } from "../lib/utils.ts";

test("formatDate converte un timestamp UTC nell'ora legale italiana", () => {
  assert.equal(formatDate("2024-10-12T19:00:00Z"), "Sabato 12 Ottobre 2024 - ore 21:00");
});

test("formatDate converte l'ora solare e gli offset espliciti", () => {
  assert.equal(formatDate("2024-01-12T20:00:00+00:00"), "Venerdì 12 Gennaio 2024 - ore 21:00");
  assert.equal(formatDate("2024-01-12T21:00:00+01:00"), "Venerdì 12 Gennaio 2024 - ore 21:00");
});

test("formatDate gestisce il passaggio all'ora legale", () => {
  assert.equal(formatDate("2024-03-31T00:59:00Z"), "Domenica 31 Marzo 2024 - ore 01:59");
  assert.equal(formatDate("2024-03-31T01:00:00Z"), "Domenica 31 Marzo 2024 - ore 03:00");
});

test("formatDate rifiuta timestamp non validi o privi di fuso orario", () => {
  assert.throws(() => formatDate("non valida"), RangeError);
  assert.throws(() => formatDate("2024-10-12T19:00:00"), RangeError);
  assert.throws(() => formatDate("2024-99-12T19:00:00Z"), RangeError);
});
