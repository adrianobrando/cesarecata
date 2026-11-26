export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { isAdmin, isSameOrigin } from "@/lib/admin-auth";
import { eventDuplicateKey, filterDuplicateEvents, splitDuplicateEvents } from "@/lib/event-duplicates";
import { parseEventInput } from "@/lib/event-input";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Origine non consentita." }, { status: 403 });
  if (!(await isAdmin(request))) return NextResponse.json({ error: "Accesso non autorizzato." }, { status: 401 });
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 });
  }
  if (!Array.isArray(body) || body.length < 1 || body.length > 500) {
    return NextResponse.json({ error: "Sono ammesse da 1 a 500 date." }, { status: 400 });
  }
  const events = [];
  for (const [index, value] of body.entries()) {
    const event = parseEventInput(value);
    if (!event) return NextResponse.json({ error: `Dati non validi per l'evento ${index + 1}.` }, { status: 400 });
    events.push(event);
  }
  const { unique: candidates } = splitDuplicateEvents(events);
  const supabase = getSupabaseAdmin();
  const existingEvents: { show_reference: string; event_date: string }[] = [];

  for (let offset = 0; offset < candidates.length; offset += 25) {
    const batch = candidates.slice(offset, offset + 25);
    const filters = batch.map((event) =>
      `and(show_reference.eq.${event.show_reference},event_date.eq.${event.event_date})`,
    );
    const { data, error } = await supabase
      .from("events")
      .select("show_reference,event_date,title")
      .or(filters.join(","));
    if (error) {
      console.error("Errore nel controllo dei duplicati durante l'importazione:", error);
      return NextResponse.json({ error: "Impossibile verificare se alcune date sono già inserite." }, { status: 500 });
    }
    existingEvents.push(...data);
  }

  const { unique: toInsert, duplicates: skipped } = filterDuplicateEvents(events, existingEvents);
  const duplicates = new Map(skipped.map((event) => [
    eventDuplicateKey(event),
    { title: event.title, event_date: event.event_date },
  ]));
  if (toInsert.length) {
    const { error } = await supabase.from("events").insert(toInsert);
    if (error) {
      console.error("Errore nell'importazione degli eventi:", error);
      return NextResponse.json({ error: "Impossibile importare le date." }, { status: 500 });
    }
  }
  return NextResponse.json({ count: toInsert.length, duplicates: [...duplicates.values()] }, { status: 201 });
}
