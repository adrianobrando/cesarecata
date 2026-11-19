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

export function getShowPage(value: string | string[] | undefined, showCount: number) {
  const totalPages = Math.max(1, Math.ceil(showCount / 4));
  const requested = typeof value === "string" && /^[1-9]\d*$/.test(value) ? Number(value) : 1;
  const page = Number.isSafeInteger(requested) ? Math.min(requested, totalPages) : 1;
  return { page, totalPages, start: (page - 1) * 4 };
}
