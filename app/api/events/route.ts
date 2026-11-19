export const runtime = 'edge';

import { NextRequest, NextResponse } from "next/server";
import { isAdmin, isSameOrigin } from "@/lib/admin-auth";
import { parseEventInput } from "@/lib/event-input";
import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  const { data, error } = await supabase.from("events").select("*").order("event_date", { ascending: true });
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
  const { data, error } = await supabaseAdmin.from("events").insert(event).select().single();
  if (error) {
    console.error("Errore nella creazione dell'evento:", error);
    return NextResponse.json({ error: "Impossibile creare l'evento." }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}
