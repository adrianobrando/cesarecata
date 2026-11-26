export const runtime = 'edge';

import { NextRequest, NextResponse } from "next/server";
import { isAdmin, isSameOrigin } from "@/lib/admin-auth";
import { duplicateEventMessage } from "@/lib/event-duplicates";
import { parseEventInput } from "@/lib/event-input";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

type Context = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Context) {
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
  const { id } = await params;
  const supabase = getSupabaseAdmin();
  const { data: duplicate, error: duplicateError } = await supabase
    .from("events")
    .select("title,event_date")
    .eq("show_reference", event.show_reference)
    .eq("event_date", event.event_date)
    .neq("id", id)
    .limit(1)
    .maybeSingle();
  if (duplicateError) {
    console.error("Errore nel controllo dei duplicati:", duplicateError);
    return NextResponse.json({ error: "Impossibile verificare se la data è già inserita." }, { status: 500 });
  }
  if (duplicate) {
    return NextResponse.json({ error: duplicateEventMessage(duplicate) }, { status: 409 });
  }
  const { data, error } = await supabase.from("events").update(event).eq("id", id).select().maybeSingle();
  if (error) {
    console.error("Errore nella modifica dell'evento:", error);
    return NextResponse.json({ error: "Impossibile modificare l'evento." }, { status: 500 });
  }
  if (!data) return NextResponse.json({ error: "Evento non trovato." }, { status: 404 });
  return NextResponse.json(data);
}

export async function DELETE(request: NextRequest, { params }: Context) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Origine non consentita." }, { status: 403 });
  if (!(await isAdmin(request))) return NextResponse.json({ error: "Accesso non autorizzato." }, { status: 401 });
  const { id } = await params;
  const { data, error } = await getSupabaseAdmin().from("events").delete().eq("id", id).select("id").maybeSingle();
  if (error) {
    console.error("Errore nell'eliminazione dell'evento:", error);
    return NextResponse.json({ error: "Impossibile eliminare l'evento." }, { status: 500 });
  }
  if (!data) return NextResponse.json({ error: "Evento non trovato." }, { status: 404 });
  return NextResponse.json({ success: true });
}
