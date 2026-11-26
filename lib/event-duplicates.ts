import type { Event } from "../types/database";
import { formatDate } from "./utils.ts";

type EventIdentity = Pick<Event, "event_date" | "show_reference">;

export function eventDuplicateKey(event: EventIdentity): string {
  return `${event.show_reference}\u0000${new Date(event.event_date).toISOString()}`;
}

export function splitDuplicateEvents<T extends EventIdentity>(events: T[]): { unique: T[]; duplicates: T[] } {
  const seen = new Set<string>();
  const unique: T[] = [];
  const duplicates: T[] = [];

  for (const event of events) {
    const key = eventDuplicateKey(event);
    if (seen.has(key)) {
      duplicates.push(event);
    } else {
      seen.add(key);
      unique.push(event);
    }
  }

  return { unique, duplicates };
}

export function filterDuplicateEvents<T extends EventIdentity>(
  events: T[],
  existing: EventIdentity[],
): { unique: T[]; duplicates: T[] } {
  const seen = new Set(existing.map(eventDuplicateKey));
  const unique: T[] = [];
  const duplicates: T[] = [];

  for (const event of events) {
    const key = eventDuplicateKey(event);
    if (seen.has(key)) {
      duplicates.push(event);
    } else {
      seen.add(key);
      unique.push(event);
    }
  }

  return { unique, duplicates };
}

export function duplicateEventMessage(event: Pick<Event, "event_date" | "title">): string {
  return `La data ${formatDate(event.event_date)} per "${event.title}" è già inserita. Se devi modificarla, modifica l'evento già inserito.`;
}
