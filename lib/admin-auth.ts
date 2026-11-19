import type { NextRequest } from "next/server";

export const SESSION_SECONDS = 60 * 60 * 8;

const encoder = new TextEncoder();

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer), (b) => b.toString(16).padStart(2, "0")).join("");
}

async function sign(secret: string, value: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return toHex(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function passwordMatches(password: string, secret: string): Promise<boolean> {
  const [a, b] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(password)),
    crypto.subtle.digest("SHA-256", encoder.encode(secret)),
  ]);
  return constantTimeEqual(toHex(a), toHex(b));
}

export async function createAdminToken(secret: string, now = Date.now()): Promise<string> {
  const expires = String(Math.floor(now / 1000) + SESSION_SECONDS);
  return `${expires}.${await sign(secret, expires)}`;
}

export async function verifyAdminToken(token: string | undefined, secret: string, now = Date.now()): Promise<boolean> {
  if (!token || !secret) return false;
  const parts = token.split(".");
  if (parts.length !== 2 || !/^\d{1,12}$/.test(parts[0]) || !/^[a-f0-9]{64}$/.test(parts[1])) {
    return false;
  }
  const expires = Number(parts[0]);
  if (expires <= Math.floor(now / 1000) || expires > Math.floor(now / 1000) + SESSION_SECONDS) return false;
  return constantTimeEqual(parts[1], await sign(secret, parts[0]));
}

export async function isAdmin(request: NextRequest): Promise<boolean> {
  const secret = process.env.ADMIN_PASSWORD;
  return !!secret && verifyAdminToken(request.cookies.get("admin_token")?.value, secret);
}

export function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  return !origin || origin === request.nextUrl.origin;
}
