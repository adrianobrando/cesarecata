export const runtime = 'edge';

import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import Button from "@/components/ui/Button";
import Hero from "@/components/ui/Hero";
import { spettacoli, type Spettacolo } from "@/data/spettacoli";
import { getSupabase } from "@/lib/supabase";
import { formatDate } from "@/lib/utils";
import type { Event } from "@/types/database";

type ShowEvent = Pick<Event, "id" | "event_date" | "location" | "entry_type" | "ticket_link">;


async function UpcomingDates({ show }: { show: Spettacolo }) {
  await connection();
  const query = getSupabase()
    .from("events")
    .select("id, event_date, location, entry_type, ticket_link", { count: "exact" });

  const filtered = show.legacy_ref && show.legacy_ref !== show.id
    ? query.or(`show_reference.eq.${show.id},show_reference.eq.${show.legacy_ref}`)
    : query.eq("show_reference", show.id);

  const { data: events, error, count } = await filtered
    .gte("event_date", new Date().toISOString())
    .order("event_date", { ascending: true })
    .overrideTypes<ShowEvent[], { merge: false }>();

  if (error || count === null || count !== events.length) {
    console.error("Errore nel recupero delle date dello spettacolo:", error ?? "Risultati incompleti");
    return <p role="alert">Impossibile caricare le prossime date. Riprova più tardi.</p>;
  }

  if (!events.length) return null;

  return (
    <section aria-labelledby="upcoming-dates" className="mt-12">
      <h2 id="upcoming-dates" className="font-display text-3xl font-semibold text-dark-blue">Prossime Date</h2>
      <ul className="mt-5 space-y-4">
        {events.map((event) => (
          <li key={event.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-light-blue bg-white p-5">
            <p className="font-semibold text-dark-blue">
              <time dateTime={event.event_date}>{formatDate(event.event_date)}</time>
              {event.location && <> - {event.location}</>}
            </p>
            {event.entry_type === "libero" ? (
              <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-800">Ingresso Libero</span>
            ) : event.ticket_link ? (
              <Button href={event.ticket_link}>Acquista Biglietti</Button>
            ) : (
              <span className="rounded-full bg-light-blue px-4 py-2 text-sm font-semibold text-primary-blue">Ingresso a pagamento</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function SpettacoloPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const show = spettacoli.find((item) => item.id === slug);
  if (!show) notFound();

  return (
    <main>
      <Hero
        title={show.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Lezioni-Spettacolo", href: "/lezioni-spettacolo" },
          { label: show.title },
        ]}
      />
      <section className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
        <div className="whitespace-pre-line text-lg leading-relaxed text-slate-700">{show.description}</div>
        <Suspense fallback={<p className="mt-12">Caricamento delle date...</p>}>
          <UpcomingDates show={show} />
        </Suspense>
      </section>
    </main>
  );
}
