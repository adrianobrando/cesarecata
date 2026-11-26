export const runtime = 'edge';

import { NextRequest, NextResponse } from "next/server";
import { isAdmin, isSameOrigin } from "@/lib/admin-auth";
import { duplicateEventMessage } from "@/lib/event-duplicates";
import { parseEventInput } from "@/lib/event-input";
import { getSupabase } from "@/lib/supabase";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  const { data, error } = await getSupabase().from("events").select("*").order("event_date", { ascending: true });
  if (error) {
    console.error("Errore nel recupero degli eventi:", error);
    return NextResponse.json({ error: "Impossibile caricare gli eventi." }, { status: 500 });
  }
  return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Origine non consentita." }, { status: 403 });
  if (!(await isAdmin(request))) return NextResponse.json({ error: "Accesso non autorizzato." }, { status: 401 });
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 });
  }
  const event = parseEventInput(body);
  if (!event) return NextResponse.json({ error: "Dati dell'evento non validi." }, { status: 400 });
  const supabase = getSupabaseAdmin();
  const { data: duplicate, error: duplicateError } = await supabase
    .from("events")
    .select("title,event_date")
    .eq("show_reference", event.show_reference)
    .eq("event_date", event.event_date)
    .limit(1)
    .maybeSingle();
  if (duplicateError) {
    console.error("Errore nel controllo dei duplicati:", duplicateError);
    return NextResponse.json({ error: "Impossibile verificare se la data è già inserita." }, { status: 500 });
  }
  if (duplicate) {
    return NextResponse.json({ error: duplicateEventMessage(duplicate) }, { status: 409 });
  }
  const { data, error } = await supabase.from("events").insert(event).select().single();
  if (error) {
    console.error("Errore nella creazione dell'evento:", error);
    return NextResponse.json({ error: "Impossibile creare l'evento." }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}
