export const runtime = 'edge';

import { NextRequest, NextResponse } from "next/server";
import { isAdmin, isSameOrigin } from "@/lib/admin-auth";
import { parseEventInput } from "@/lib/event-input";
import { supabaseAdmin } from "@/lib/supabase-admin";

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
  const { data, error } = await supabaseAdmin.from("events").update(event).eq("id", id).select().maybeSingle();
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
  const { data, error } = await supabaseAdmin.from("events").delete().eq("id", id).select("id").maybeSingle();
  if (error) {
    console.error("Errore nell'eliminazione dell'evento:", error);
    return NextResponse.json({ error: "Impossibile eliminare l'evento." }, { status: 500 });
  }
  if (!data) return NextResponse.json({ error: "Evento non trovato." }, { status: 404 });
  return NextResponse.json({ success: true });
}
