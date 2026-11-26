"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Papa from "papaparse";
import readXlsxFile from "read-excel-file";
import Button from "@/components/ui/Button";
import Hero from "@/components/ui/Hero";
import { parseEventRows, showOptions } from "@/lib/event-import";
import { formatDate, slugify } from "@/lib/utils";
import type { Event } from "@/types/database";

type EventForm = {
  event_date: string;
  location: string;
  title: string;
  subtitle: string;
  performers: string;
  entry_type: "libero" | "pagamento";
  ticket_link: string;
  show_reference: string;
  image_url: string | null;
};

const emptyForm: EventForm = {
  event_date: "",
  location: "",
  title: "",
  subtitle: "",
  performers: "",
  entry_type: "libero",
  ticket_link: "",
  show_reference: "",
  image_url: null,
};

const inputClass = "w-full rounded-lg border border-slate-400 bg-white px-3 py-2 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue";

class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, { cache: "no-store", ...init });
  const body = await response.json();
  if (!response.ok) {
    const message = typeof body === "object" && body !== null && "error" in body && typeof body.error === "string"
      ? body.error
      : "Si è verificato un errore.";
    throw new ApiError(message, response.status);
  }
  return body as T;
}

function localDateTime(value: string): string {
  const date = new Date(value);
  const pad = (part: number) => String(part).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export default function InserimentoSpettacoli() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [events, setEvents] = useState<Event[] | null>(null);
  const [form, setForm] = useState<EventForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [importOpen, setImportOpen] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const importInput = useRef<HTMLInputElement>(null);
  const shows = showOptions(events ?? []);

  async function loadEvents() {
    setEvents(await api<Event[]>("/api/events"));
  }

  useEffect(() => {
    const controller = new AbortController();
    async function checkSession() {
      try {
        const session = await api<{ authenticated: boolean }>("/api/login", { signal: controller.signal });
        if (controller.signal.aborted) return;
        setAuthenticated(session.authenticated);
        if (session.authenticated) {
          const result = await api<Event[]>("/api/events", { signal: controller.signal });
          if (!controller.signal.aborted) setEvents(result);
        }
      } catch (caught) {
        if (!controller.signal.aborted) {
          setError(caught instanceof Error ? caught.message : "Impossibile verificare la sessione.");
          setAuthenticated((current) => current ?? false);
        }
      }
    }
    void checkSession();
    return () => controller.abort();
  }, []);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      setPassword("");
      setAuthenticated(true);
      await loadEvents();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Accesso non riuscito.");
    } finally {
      setBusy(false);
    }
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setImage(null);
    if (fileInput.current) fileInput.current.value = "";
  }

  async function saveEvent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");
    try {
      let imageUrl = form.image_url;
      if (image) {
        const data = new FormData();
        data.set("image", image);
        const uploaded = await api<{ url: string }>("/api/events/image", { method: "POST", body: data });
        imageUrl = uploaded.url;
        setForm((current) => ({ ...current, image_url: uploaded.url }));
        setImage(null);
        if (fileInput.current) fileInput.current.value = "";
      }
      const isNew = form.show_reference === "new";
      const showReference = isNew ? slugify(form.title) : form.show_reference;
      if (!showReference) throw new Error("Il titolo del nuovo spettacolo non è valido.");
      if (isNew && shows.some((show) => show.reference === showReference || show.title.trim().toLocaleLowerCase("it-IT") === form.title.trim().toLocaleLowerCase("it-IT"))) {
        throw new Error("Questo spettacolo è già in archivio o ha lo stesso riferimento di uno spettacolo esistente: selezionalo dall'elenco.");
      }
      const payload = {
        ...form,
        show_reference: showReference,
        event_date: new Date(form.event_date).toISOString(),
        location: form.location.trim() || null,
        image_url: imageUrl,
        performers: form.performers.trim() || null,
        ticket_link: form.entry_type === "pagamento" ? form.ticket_link.trim() || null : null,
      };
      await api(editingId ? `/api/events/${encodeURIComponent(editingId)}` : "/api/events", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      resetForm();
      setNotice("Evento salvato.");
      await loadEvents();
    } catch (caught) {
      if (caught instanceof ApiError && caught.status === 401) setAuthenticated(false);
      setError(caught instanceof Error ? caught.message : "Impossibile salvare l'evento.");
    } finally {
      setBusy(false);
    }
  }

  function editEvent(event: Event) {
    setForm({
      event_date: localDateTime(event.event_date),
      location: event.location ?? "",
      title: event.title,
      subtitle: event.subtitle,
      performers: event.performers ?? "",
      entry_type: event.entry_type,
      ticket_link: event.ticket_link ?? "",
      show_reference: event.show_reference,
      image_url: event.image_url,
    });
    setEditingId(event.id);
    setImage(null);
    if (fileInput.current) fileInput.current.value = "";
    setError("");
    setNotice("");
    document.getElementById("event-form")?.scrollIntoView({ behavior: "smooth" });
  }

  async function deleteEvent(event: Event) {
    if (!window.confirm(`Eliminare "${event.title}"?`)) return;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await api(`/api/events/${encodeURIComponent(event.id)}`, { method: "DELETE" });
      if (editingId === event.id) resetForm();
      setNotice("Evento eliminato.");
      await loadEvents();
    } catch (caught) {
      if (caught instanceof ApiError && caught.status === 401) setAuthenticated(false);
      setError(caught instanceof Error ? caught.message : "Impossibile eliminare l'evento.");
    } finally {
      setBusy(false);
    }
  }

  async function importEvents(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!importFile) {
      setError("Seleziona un file CSV o Excel.");
      return;
    }
    setBusy(true);
    setError("");
    setNotice("");
    try {
      if (importFile.size > 2 * 1024 * 1024) throw new Error("Il file non può superare 2 MB.");
      let rows: (string | number | boolean | Date | null)[][];
      if (/\.csv$/i.test(importFile.name)) {
        const result = Papa.parse<string[]>(await importFile.text(), { skipEmptyLines: false });
        if (result.errors.length) throw new Error(`CSV non valido: ${result.errors[0].message}`);
        rows = result.data;
      } else if (/\.xlsx$/i.test(importFile.name)) {
        const excelRows = await readXlsxFile(importFile);
        rows = excelRows.map((row) => row.map((cell) => {
          if (cell === null || typeof cell === "string" || typeof cell === "number" || typeof cell === "boolean" || cell instanceof Date) return cell;
          throw new Error("Il file Excel contiene un tipo di cella non supportato.");
        }));
      } else {
        throw new Error("Usa un file CSV o Excel .xlsx.");
      }
      const imported = parseEventRows(rows, shows);
      const result = await api<{ count: number }>("/api/events/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(imported),
      });
      setImportFile(null);
      if (importInput.current) importInput.current.value = "";
      setNotice(`${result.count} date importate.`);
      await loadEvents();
    } catch (caught) {
      if (caught instanceof ApiError && caught.status === 401) setAuthenticated(false);
      setError(caught instanceof Error ? caught.message : "Impossibile importare le date.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main>
      <Hero title="Gestione spettacoli" />
      <div className="site-container py-12">
      {error && <p role="alert" className="mb-5 rounded-lg bg-red-50 p-4 text-red-800">{error}</p>}
      {notice && <p role="status" className="mb-5 rounded-lg bg-green-50 p-4 text-green-800">{notice}</p>}
      {authenticated === null ? (
        <p>Verifica della sessione...</p>
      ) : !authenticated ? (
        <form onSubmit={login} className="max-w-md space-y-4">
          <label className="block font-medium" htmlFor="password">Password amministratore</label>
          <input className={inputClass} id="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" disabled={busy}>{busy ? "Accesso in corso..." : "Accedi"}</Button>
        </form>
      ) : (
        <>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl text-dark-blue">{editingId ? "Modifica evento" : "Nuovo evento"}</h2>
            <Button variant="secondary" disabled={busy} aria-expanded={importOpen} aria-controls="import-date" onClick={() => {
              setImportOpen(!importOpen);
              setImportFile(null);
            }}>Carica nuove date</Button>
          </div>
          {importOpen && (
            <form id="import-date" onSubmit={importEvents} className="mb-6 space-y-4 rounded-xl border border-slate-200 p-6">
              <h3 className="text-xl text-dark-blue">Carica nuove date</h3>
              <p>Carica un CSV o un file Excel .xlsx (massimo 2 MB e 500 date). L&apos;orario usa il fuso del dispositivo. Sostituisci le righe di esempio prima di importare.</p>
              <a className="text-primary-blue underline" href="/modello-date.csv" download>Scarica il modello CSV</a>
              <div>
                <label className="mb-1 block font-medium" htmlFor="import-file">File CSV o Excel</label>
                <input className={inputClass} id="import-file" type="file" accept=".csv,.xlsx" required ref={importInput} disabled={busy} onChange={(e) => setImportFile(e.target.files?.[0] ?? null)} />
              </div>
              <Button type="submit" disabled={busy}>{busy ? "Importazione..." : "Importa date"}</Button>
            </form>
          )}
          <form id="event-form" onSubmit={saveEvent} className="rounded-xl border border-slate-200 p-6">
            <fieldset disabled={busy} className="space-y-5">
            <div>
              <label className="mb-1 block font-medium" htmlFor="image">Immagine (opzionale)</label>
              <input className={inputClass} id="image" type="file" accept="image/jpeg,image/png,image/webp,image/gif" ref={fileInput} onChange={(e) => setImage(e.target.files?.[0] ?? null)} />
              {form.image_url && <p className="mt-1 text-sm">Immagine già presente. Scegli un file per sostituirla.</p>}
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1 block font-medium" htmlFor="event-date">Data e ora</label>
                <input className={inputClass} id="event-date" type="datetime-local" required value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} />
                <p className="mt-1 text-sm">L&apos;orario usa il fuso orario del tuo dispositivo.</p>
              </div>
              <div>
                <label className="mb-1 block font-medium" htmlFor="location">Luogo (opzionale)</label>
                <input className={inputClass} id="location" type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="mb-1 block font-medium" htmlFor="title">Titolo</label>
              <div className="flex flex-wrap items-start gap-3">
                <div className="min-w-0 flex-1 basis-64">
                  {form.show_reference === "new" ? (
                    <input className={inputClass} id="title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                  ) : (
                    <select className={inputClass} id="title" required value={form.show_reference} onChange={(e) => {
                      const show = shows.find((item) => item.reference === e.target.value);
                      setForm({ ...form, show_reference: e.target.value, title: show?.title ?? "", subtitle: show?.subtitle ?? "" });
                    }}>
                      <option value="">Seleziona uno spettacolo</option>
                      {shows.map((show) => <option key={show.reference} value={show.reference}>{show.title}</option>)}
                      {form.show_reference && !shows.some((show) => show.reference === form.show_reference) && (
                        <option value={form.show_reference}>{form.title} (riferimento precedente)</option>
                      )}
                    </select>
                  )}
                </div>
                <Button variant="secondary" onClick={() => setForm({ ...form, show_reference: form.show_reference === "new" ? "" : "new", title: "", subtitle: "" })}>
                  {form.show_reference === "new" ? "Scegli dall'archivio" : "Aggiungi nuovo spettacolo"}
                </Button>
              </div>
              {form.show_reference === "new" && <p className="mt-1 text-sm">Il nuovo titolo sarà disponibile per le date successive. Per pubblicare una scheda dedicata occorre aggiungerlo all&apos;archivio statico.</p>}
            </div>
            <div>
              <label className="mb-1 block font-medium" htmlFor="subtitle">Sottotitolo</label>
              <input className={inputClass} id="subtitle" required value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
            </div>
            <div>
              <label className="mb-1 block font-medium" htmlFor="performers">Attori / Musicisti (opzionale)</label>
              <input className={inputClass} id="performers" value={form.performers} onChange={(e) => setForm({ ...form, performers: e.target.value })} />
            </div>
            <div>
              <label className="mb-1 block font-medium" htmlFor="entry-type">Tipo di ingresso</label>
              <select className={inputClass} id="entry-type" value={form.entry_type} onChange={(e) => setForm({ ...form, entry_type: e.target.value === "pagamento" ? "pagamento" : "libero" })}>
                <option value="libero">Libero</option>
                <option value="pagamento">A pagamento</option>
              </select>
            </div>
            {form.entry_type === "pagamento" && (
              <div>
                <label className="mb-1 block font-medium" htmlFor="ticket-link">Link prevendita</label>
                <input className={inputClass} id="ticket-link" type="url" value={form.ticket_link} onChange={(e) => setForm({ ...form, ticket_link: e.target.value })} />
              </div>
            )}
            <div className="flex flex-wrap gap-3">
              <Button type="submit" disabled={busy}>{busy ? "Salvataggio..." : editingId ? "Salva modifiche" : "Inserisci evento"}</Button>
              {editingId && <Button variant="secondary" disabled={busy} onClick={resetForm}>Annulla modifica</Button>}
            </div>
            </fieldset>
          </form>
          <section className="mt-12" aria-labelledby="events-title">
            <h2 id="events-title" className="mb-4 text-2xl text-dark-blue">Eventi esistenti</h2>
            {events === null ? <p>Eventi non disponibili. Ricarica la pagina per riprovare.</p> : events.length === 0 ? <p>Nessun evento presente.</p> : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead><tr className="border-b border-slate-300"><th className="p-3" scope="col">Data</th><th className="p-3" scope="col">Titolo</th><th className="p-3" scope="col">Azioni</th></tr></thead>
                  <tbody>{events.map((event) => (
                    <tr className="border-b border-slate-200" key={event.id}>
                      <td className="p-3">{formatDate(event.event_date)}</td>
                      <td className="p-3">{event.title}</td>
                      <td className="p-3"><div className="flex gap-2">
                        <Button variant="secondary" className="px-3 py-2 text-sm" disabled={busy} onClick={() => editEvent(event)} aria-label={`Modifica ${event.title}`}>Modifica</Button>
                        <Button variant="secondary" className="px-3 py-2 text-sm" disabled={busy} onClick={() => void deleteEvent(event)} aria-label={`Elimina ${event.title}`}>Elimina</Button>
                      </div></td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}
      </div>
    </main>
  );
}
