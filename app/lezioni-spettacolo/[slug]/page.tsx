export const runtime = 'edge';

import { notFound } from "next/navigation";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { EventDateLocation, EventEntry } from "@/components/ui/EventDetails";
import Hero from "@/components/ui/Hero";
import { spettacoli, type Spettacolo } from "@/data/spettacoli";
import { monthKey } from "@/lib/calendar-months";
import { splitShowDescription } from "@/lib/show-description";
import { getSupabase } from "@/lib/supabase";
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
    <section aria-labelledby="upcoming-dates">
      <h2 id="upcoming-dates" className="font-display text-2xl font-semibold text-dark-blue">Prossime date</h2>
      <ul className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-1">
        {events.map((event) => (
          <li key={event.id} className="flex flex-col items-start gap-4 bg-white p-5">
            <EventDateLocation event={event} />
            <EventEntry event={event} />
            <Link
              href={`/calendario?mese=${monthKey(new Date(event.event_date))}#evento-${encodeURIComponent(event.id)}`}
              className="text-sm font-semibold text-primary-blue underline underline-offset-4 hover:text-dark-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
            >
              Vedi nel calendario
            </Link>
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
  const { subtitle, body } = splitShowDescription(show.description);

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
      <section className="site-container py-12 sm:py-16 lg:has-[#upcoming-dates]:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:grid-rows-[auto_1fr] lg:items-start lg:gap-x-12">
        {subtitle && <h3 className="font-display text-2xl font-semibold text-dark-blue sm:text-3xl lg:col-start-1 lg:row-start-1">{subtitle}</h3>}
        <div className="mt-8 empty:hidden lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0">
          <Suspense fallback={<p>Caricamento delle date...</p>}>
            <UpcomingDates show={show} />
          </Suspense>
        </div>
        <div className="mt-8 whitespace-pre-line text-lg leading-relaxed text-slate-700 lg:col-start-1 lg:row-start-2">{body}</div>
      </section>
    </main>
  );
}
