import assert from "node:assert/strict";
import test from "node:test";
import { formatMonth, isCalendarMonth, monthKey, monthStartUtc, shiftMonth } from "../lib/calendar-months.ts";

test("i blocchi attraversano gli anni e i titoli sono in italiano", () => {
  assert.equal(shiftMonth("2026-12", -3), "2026-09");
  assert.equal(shiftMonth("2026-12", 2), "2027-02");
  assert.equal(shiftMonth("2026-12", 3), "2027-03");
  assert.equal(formatMonth("2026-12"), "Dicembre 2026");
  assert.equal(formatMonth("2027-02"), "Febbraio 2027");
});

test("i confini e il raggruppamento rispettano il fuso italiano e l'ora legale", () => {
  assert.equal(monthStartUtc("2026-12"), "2026-11-30T23:00:00.000Z");
  assert.equal(monthStartUtc("2027-03"), "2027-02-28T23:00:00.000Z");
  assert.equal(monthStartUtc("2026-04"), "2026-03-31T22:00:00.000Z");
  assert.equal(monthKey(new Date("2026-11-30T23:00:00Z")), "2026-12");
  assert.equal(monthKey(new Date("2026-03-31T21:59:59Z")), "2026-03");
  assert.equal(monthKey(new Date("2026-03-31T22:00:00Z")), "2026-04");
});

test("il parametro mese deve essere un mese valido e rappresentabile", () => {
  for (const value of ["2026-12", "1900-01", "9998-12"]) assert.equal(isCalendarMonth(value), true);
  for (const value of [undefined, ["2026-12"], "2026-00", "2026-13", "2026-1", "1899-12", "9999-01"]) {
    assert.equal(isCalendarMonth(value), false);
  }
});
