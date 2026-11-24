import type { Event } from "../types/database";
import type { Spettacolo } from "../data/spettacoli";

export function countShowDates(events: Pick<Event, "show_reference">[]) {
  const counts = new Map<string, number>();
  for (const { show_reference } of events) {
    counts.set(show_reference, (counts.get(show_reference) ?? 0) + 1);
  }
  return counts;
}

export function formatShowDates(count: number) {
  return count === 1 ? "1 nuova data" : `${count} nuove date`;
}

export function getShowDateCount(counts: Map<string, number>, show: Pick<Spettacolo, "id" | "legacy_ref">) {
  const current = counts.get(show.id) ?? 0;
  return current + (show.legacy_ref && show.legacy_ref !== show.id ? counts.get(show.legacy_ref) ?? 0 : 0);
}

export function getFirstShowDate(
  events: Pick<Event, "id" | "event_date" | "show_reference">[],
  show: Pick<Spettacolo, "id" | "legacy_ref">,
) {
  return events.reduce<(typeof events)[number] | undefined>((first, event) => {
    if (event.show_reference !== show.id && event.show_reference !== show.legacy_ref) return first;
    if (!first) return event;
    const difference = Date.parse(event.event_date) - Date.parse(first.event_date);
    return difference < 0 || (difference === 0 && event.id < first.id) ? event : first;
  }, undefined);
}
