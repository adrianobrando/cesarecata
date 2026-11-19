export const runtime = 'edge';

import { NextRequest, NextResponse } from "next/server";
import { isAdmin, isSameOrigin } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const imageTypes: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Origine non consentita." }, { status: 403 });
  if (!(await isAdmin(request))) return NextResponse.json({ error: "Accesso non autorizzato." }, { status: 401 });
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "File non valido." }, { status: 400 });
  }
  const file = form.get("image");
  if (!(file instanceof File) || !imageTypes[file.type] || !file.size || file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "Usa un'immagine JPEG, PNG, WebP o GIF di massimo 5 MB." }, { status: 400 });
  }
  const path = `${crypto.randomUUID()}.${imageTypes[file.type]}`;
  const bucket = getSupabaseAdmin().storage.from("event-images");
  const { error } = await bucket.upload(path, file, { contentType: file.type });
  if (error) {
    console.error("Errore nel caricamento dell'immagine:", error);
    return NextResponse.json({ error: "Impossibile caricare l'immagine." }, { status: 500 });
  }
  const { data } = bucket.getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl }, { status: 201 });
}
