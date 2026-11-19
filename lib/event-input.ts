import type { Event } from "@/types/database";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type EventInput = Pick<Event, "event_date" | "location" | "title" | "subtitle" | "image_url" | "performers" | "entry_type" | "ticket_link" | "show_reference">;

export function parseEventInput(value: unknown): EventInput | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const input = value as Record<string, unknown>;
  if (
    typeof input.event_date !== "string" ||
    !/[Tt].*(?:[zZ]|[+-]\d{2}:\d{2})$/.test(input.event_date) ||
    Number.isNaN(Date.parse(input.event_date)) ||
    typeof input.title !== "string" || !input.title.trim() ||
    typeof input.subtitle !== "string" || !input.subtitle.trim() ||
    (input.location != null && typeof input.location !== "string") ||
    (input.entry_type !== "libero" && input.entry_type !== "pagamento") ||
    typeof input.show_reference !== "string" || input.show_reference.length > 120 || !slugPattern.test(input.show_reference) ||
    (input.performers !== null && typeof input.performers !== "string") ||
    (input.image_url !== null && typeof input.image_url !== "string") ||
    (input.ticket_link !== null && typeof input.ticket_link !== "string")
  ) return null;

  for (const url of [input.image_url, input.ticket_link]) {
    if (url) {
      try {
        if (!["http:", "https:"].includes(new URL(url).protocol)) return null;
      } catch {
        return null;
      }
    }
  }
  return {
    event_date: new Date(input.event_date).toISOString(),
    ...(input.location !== undefined && { location: input.location?.trim() || null }),
    title: input.title.trim(),
    subtitle: input.subtitle.trim(),
    performers: input.performers?.trim() || null,
    image_url: input.image_url || null,
    entry_type: input.entry_type,
    ticket_link: input.entry_type === "pagamento" ? input.ticket_link?.trim() || null : null,
    show_reference: input.show_reference,
  };
}
