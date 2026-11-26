export const runtime = 'edge';

import Image from "next/image";
import { connection } from "next/server";
import { Suspense } from "react";
import Button from "@/components/ui/Button";
import CalendarEventScroll from "@/components/ui/CalendarEventScroll";
import { EventDateLocation, EventEntry } from "@/components/ui/EventDetails";
import Hero from "@/components/ui/Hero";
import { formatMonth, isCalendarMonth, monthKey, monthStartUtc, shiftMonth } from "@/lib/calendar-months";
import { getSupabase } from "@/lib/supabase";
import type { Event } from "@/types/database";

type CalendarEvent = Pick<
  Event,
  "id" | "event_date" | "location" | "title" | "subtitle" | "image_url" | "performers" | "entry_type" | "ticket_link"
>;

async function EventList({ months }: { months: string[] }) {
  const supabase = getSupabase();
  const events: CalendarEvent[] = [];
  let total: number;

  do {
    const { data, error, count } = await supabase
      .from("events")
      .select("id, event_date, location, title, subtitle, image_url, performers, entry_type, ticket_link", { count: "exact" })
      .gte("event_date", monthStartUtc(months[0]))
      .lt("event_date", monthStartUtc(shiftMonth(months[0], 3)))
      .order("event_date", { ascending: true })
      .order("id", { ascending: true })
      .range(events.length, events.length + 999)
      .overrideTypes<CalendarEvent[], { merge: false }>();

    if (error || count === null || (data.length === 0 && events.length < count)) {
      console.error("Errore nel recupero del calendario:", error ?? "Risultati incompleti");
      return <p role="alert">Impossibile caricare gli eventi. Riprova più tardi.</p>;
    }

    events.push(...data);
    total = count;
  } while (events.length < total);

  const groupedEvents = new Map(months.map((month) => [month, [] as CalendarEvent[]]));
  for (const event of events) {
    const group = groupedEvents.get(monthKey(new Date(event.event_date)));
    if (!group) {
      console.error("Evento fuori dall'intervallo del calendario:", event.id);
      return <p role="alert">Impossibile caricare gli eventi. Riprova più tardi.</p>;
    }
    group.push(event);
  }

  return (
    <>
      {events.length === 0 && (
        <p className="bg-white px-6 py-6 text-center text-lg text-dark-blue">
          Nessun evento in questo periodo. Usa le frecce per cercare in altri mesi.
        </p>
      )}
      {Array.from(groupedEvents, ([month, monthEvents]) => (
        <section key={month} aria-labelledby={`mese-${month}`} className="mt-10">
          <h2 id={`mese-${month}`} className="mb-6 font-display text-3xl font-semibold text-dark-blue">
            {formatMonth(month)}
          </h2>
          {monthEvents.length === 0 ? (
            <p className="text-slate-700">Nessun evento in programma per questo mese</p>
          ) : (
            <ul className="space-y-6">
              {monthEvents.map((event) => (
                <li key={event.id} id={`evento-${event.id}`} className="scroll-mt-24">
                  <article className="grid gap-4 overflow-hidden bg-white p-4 sm:p-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-6">
                    <div className="flex min-w-0 flex-col gap-3 lg:flex-row lg:items-center">
                      {event.image_url && (
                        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-lg bg-light-blue lg:aspect-square lg:w-24">
                          <Image
                            src={event.image_url}
                            alt=""
                            fill
                            unoptimized
                            sizes="(min-width: 1024px) 6rem, 100vw"
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="min-w-0">
                        <h3 className="font-display text-xl font-semibold leading-tight text-dark-blue sm:text-2xl lg:text-xl">
                          {event.title}
                        </h3>
                        <p className="mt-1 text-sm leading-snug text-slate-700 sm:text-base lg:text-sm">
                          {event.subtitle}
                        </p>
                        {event.performers && (
                          <p className="mt-2 text-xs leading-snug text-slate-600 sm:text-sm">{event.performers}</p>
                        )}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <EventDateLocation event={event} compact />
                    </div>
                    <div>
                      <EventEntry event={event} compact />
                    </div>
                  </article>
                </li>
              ))}
              <CalendarEventScroll key={months[0]} />
            </ul>
          )}
        </section>
      ))}
    </>
  );
}

async function CalendarContent({ searchParams }: { searchParams: Promise<{ mese?: string | string[] }> }) {
  await connection();
  const requestedMonth = (await searchParams).mese;
  const start = requestedMonth === undefined ? monthKey(new Date()) : requestedMonth;

  if (!isCalendarMonth(start)) {
    return (
      <div role="alert">
        <p>Il mese indicato non è valido. Usa il formato AAAA-MM.</p>
        <Button href="/calendario" className="mt-4">Torna al mese corrente</Button>
      </div>
    );
  }

  const months = [start, shiftMonth(start, 1), shiftMonth(start, 2)];
  const previous = shiftMonth(start, -3);
  const next = shiftMonth(start, 3);

  return (
    <>
      <EventList months={months} />
      <nav aria-label="Navigazione del calendario" className="mt-10 flex flex-wrap items-center justify-center gap-4">
        {isCalendarMonth(previous) ? (
          <Button variant="secondary" href={`/calendario?mese=${previous}`}>← 3 Mesi Precedenti</Button>
        ) : (
          <Button variant="secondary" disabled>← 3 Mesi Precedenti</Button>
        )}
        {isCalendarMonth(next) ? (
          <Button variant="secondary" href={`/calendario?mese=${next}`}>3 Mesi Successivi →</Button>
        ) : (
          <Button variant="secondary" disabled>3 Mesi Successivi →</Button>
        )}
      </nav>
    </>
  );
}

export default function CalendarioPage({ searchParams }: { searchParams: Promise<{ mese?: string | string[] }> }) {
  return (
    <main>
      <Hero
        title="Calendario spettacoli"
        subtitle="Scopri i prossimi appuntamenti"
      />
      <section aria-label="Prossimi spettacoli" className="site-container py-10 sm:py-14">
        <Suspense fallback={<p>Caricamento degli eventi...</p>}>
          <CalendarContent searchParams={searchParams} />
        </Suspense>
      </section>
    </main>
  );
}
