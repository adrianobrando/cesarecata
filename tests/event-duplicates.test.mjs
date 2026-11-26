import assert from "node:assert/strict";
import test from "node:test";
import { filterDuplicateEvents, splitDuplicateEvents } from "../lib/event-duplicates.ts";

test("only the same show at the same instant is considered a duplicate", () => {
  const events = [
    { show_reference: "odissea", event_date: "2026-06-14T18:00:00.000Z", title: "Odissea" },
    { show_reference: "odissea", event_date: "2026-06-14T20:00:00+02:00", title: "Odissea" },
    { show_reference: "odissea", event_date: "2026-06-14T19:00:00.000Z", title: "Odissea" },
    { show_reference: "altro-spettacolo", event_date: "2026-06-14T18:00:00.000Z", title: "Altro" },
  ];

  const result = splitDuplicateEvents(events);

  assert.deepEqual(result.unique, [events[0], events[2], events[3]]);
  assert.deepEqual(result.duplicates, [events[1]]);
});

test("existing events and repeated CSV rows are skipped", () => {
  const existing = { show_reference: "odissea", event_date: "2026-06-14T18:00:00.000Z" };
  const rows = [
    { ...existing, title: "Odissea" },
    { show_reference: "altro", event_date: existing.event_date, title: "Altro" },
    { show_reference: "altro", event_date: existing.event_date, title: "Altro" },
  ];

  const result = filterDuplicateEvents(rows, [existing]);

  assert.deepEqual(result.unique, [rows[1]]);
  assert.deepEqual(result.duplicates, [rows[0], rows[2]]);
  assert.deepEqual(splitDuplicateEvents(rows).unique, [rows[0], rows[1]]);
});
