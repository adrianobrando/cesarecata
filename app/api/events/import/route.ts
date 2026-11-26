export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { isAdmin, isSameOrigin } from "@/lib/admin-auth";
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
  const { error } = await getSupabaseAdmin().from("events").insert(events);
  if (error) {
    console.error("Errore nell'importazione degli eventi:", error);
    return NextResponse.json({ error: "Impossibile importare le date." }, { status: 500 });
  }
  return NextResponse.json({ count: events.length }, { status: 201 });
}
