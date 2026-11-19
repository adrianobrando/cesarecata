export const runtime = 'edge';

import { NextRequest, NextResponse } from "next/server";
import { createAdminToken, isAdmin, isSameOrigin, passwordMatches, SESSION_SECONDS } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  return NextResponse.json({ authenticated: await isAdmin(request) }, {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Origine non consentita." }, { status: 403 });
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) {
    console.error("ADMIN_PASSWORD non configurata.");
    return NextResponse.json({ error: "Accesso amministratore non configurato." }, { status: 500 });
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 });
  }
  if (!body || typeof body !== "object" || !("password" in body) || typeof body.password !== "string" || !(await passwordMatches(body.password, secret))) {
    return NextResponse.json({ error: "Password non corretta." }, { status: 401 });
  }
  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_token", await createAdminToken(secret), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_SECONDS,
  });
  return response;
}
