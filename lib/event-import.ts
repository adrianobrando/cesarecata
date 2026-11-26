import { spettacoli } from "../data/spettacoli.ts";
import { parseEventInput, type EventInput } from "./event-input.ts";
import { splitShowDescription } from "./show-description.ts";
import { slugify } from "./utils.ts";
import type { Event } from "../types/database";

export type ShowOption = { reference: string; title: string; subtitle: string };
type Cell = string | number | boolean | Date | null | undefined;

const columns = ["titolo", "sottotitolo", "data", "ora", "luogo", "attori", "ingresso", "link_prevendita"];
const normalizedTitle = (title: string) => title.trim().toLocaleLowerCase("it-IT");

export function showOptions(events: Event[]): ShowOption[] {
  const shows: ShowOption[] = spettacoli.map((show) => ({
    reference: show.id,
    title: show.title,
    subtitle: splitShowDescription(show.description).subtitle ?? "",
  }));
  const references = new Set(spettacoli.flatMap((show) => [show.id, ...(show.legacy_ref ? [show.legacy_ref] : [])]));
  for (const event of events) {
    if (!references.has(event.show_reference)) {
      shows.push({ reference: event.show_reference, title: event.title, subtitle: event.subtitle });
      references.add(event.show_reference);
    }
  }
  return shows.sort((a, b) => a.title.localeCompare(b.title, "it"));
}

function text(value: Cell): string {
  return value == null ? "" : String(value).trim();
}

function dateText(value: Cell): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value.toISOString().slice(0, 10);
  return text(value);
}

function timeText(value: Cell): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    const minutes = value.getUTCHours() * 60 + value.getUTCMinutes() + Math.round((value.getUTCSeconds() * 1000 + value.getUTCMilliseconds()) / 60000);
    if (minutes >= 1440) return "";
    return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
  }
  if (typeof value === "number" && value >= 0 && value < 1) {
    const minutes = Math.round(value * 1440);
    if (minutes >= 1440) return "";
    return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
  }
  return text(value);
}

export function parseEventRows(rows: Cell[][], shows: ShowOption[]): EventInput[] {
  const header = rows[0]?.map((cell) => text(cell).replace(/^\uFEFF/, "").toLowerCase()) ?? [];
  if (new Set(header).size !== header.length || header.some((name) => !columns.includes(name)) ||
      !["titolo", "data", "ora"].every((name) => header.includes(name))) {
    throw new Error("Intestazioni non valide: usa quelle del modello CSV (titolo, data e ora sono obbligatori).");
  }
  const dataRows = rows.slice(1).map((cells, index) => ({ cells, line: index + 2 }))
    .filter(({ cells }) => cells.some((cell) => text(cell)));
  if (!dataRows.length || dataRows.length > 500) throw new Error("Il file deve contenere da 1 a 500 date.");

  const available = [...shows];
  return dataRows.map(({ cells, line }) => {
    const fail = (message: string): never => { throw new Error(`Riga ${line}: ${message}`); };
    if (cells.length > header.length && cells.slice(header.length).some((cell) => text(cell))) fail("ci sono colonne senza intestazione.");
    const get = (name: string) => cells[header.indexOf(name)];
    const title = text(get("titolo"));
    if (!title) return fail("il titolo è obbligatorio.");
    const matches = available.filter((show) => normalizedTitle(show.title) === normalizedTitle(title));
    if (matches.length > 1) return fail("il titolo corrisponde a più spettacoli: usa titoli distinti.");
    const reference = matches[0]?.reference ?? slugify(title);
    if (!reference || reference.length > 120) return fail("il titolo non produce un riferimento valido.");
    if (!matches.length && available.some((show) => show.reference === reference)) return fail("il titolo ha lo stesso riferimento di un altro spettacolo.");
    const subtitle = text(get("sottotitolo")) || matches[0]?.subtitle || "";
    if (!subtitle) return fail("il sottotitolo è obbligatorio.");
    const date = dateText(get("data"));
    const time = timeText(get("ora"));
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) return fail("usa data AAAA-MM-GG e ora HH:MM.");
    const localDate = new Date(`${date}T${time}:00`);
    if (Number.isNaN(localDate.getTime()) ||
        localDate.getFullYear() !== Number(date.slice(0, 4)) || localDate.getMonth() + 1 !== Number(date.slice(5, 7)) ||
        localDate.getDate() !== Number(date.slice(8, 10)) || localDate.getHours() !== Number(time.slice(0, 2)) ||
        localDate.getMinutes() !== Number(time.slice(3, 5))) return fail("data o ora non valida nel fuso del dispositivo.");
    const entry = text(get("ingresso")).toLowerCase() || "libero";
    const event = parseEventInput({
      event_date: localDate.toISOString(),
      title: matches[0]?.title ?? title,
      subtitle,
      location: text(get("luogo")) || null,
      performers: text(get("attori")) || null,
      entry_type: entry,
      ticket_link: text(get("link_prevendita")) || null,
      image_url: null,
      show_reference: reference,
    });
    if (!event) return fail("dati non validi: verifica ingresso (libero o pagamento) e link http/https.");
    if (!matches.length) available.push({ reference, title, subtitle });
    return event;
  });
}
