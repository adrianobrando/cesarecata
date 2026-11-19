export const runtime = 'edge';

import Image from "next/image";
import { connection } from "next/server";
import { Suspense } from "react";
import Button from "@/components/ui/Button";
import Hero from "@/components/ui/Hero";
import { formatMonth, isCalendarMonth, monthKey, monthStartUtc, shiftMonth } from "@/lib/calendar-months";
import { getSupabase } from "@/lib/supabase";
import { formatDate } from "@/lib/utils";
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
        <p className="rounded-2xl border border-light-blue bg-white px-6 py-6 text-center text-lg text-dark-blue">
          Nessun evento in questo periodo. Usa le frecce per cercare in altri mesi.
        </p>
      )}
      {Array.from(groupedEvents, ([month, monthEvents]) => (
        <section key={month} aria-labelledby={`mese-${month}`} className="mt-10">
          <h2 id={`mese-${month}`} className="mb-6 font-display text-3xl font-semibold text-dark-blue">
            {formatMonth(month)}
          </h2>
          {monthEvents.length === 0 ? (
            <p className="text-slate-500">Nessun evento in programma per questo mese</p>
          ) : (
            <ul className="space-y-6">
              {monthEvents.map((event) => (
                <li key={event.id}>
                  <article className="overflow-hidden rounded-2xl border border-light-blue bg-white shadow-sm sm:flex">
                    {event.image_url && (
                      <div className="relative aspect-[16/10] w-full shrink-0 bg-light-blue sm:aspect-auto sm:w-2/5">
                        <Image
                          src={event.image_url}
                          alt=""
                          fill
                          unoptimized
                          sizes="(min-width: 640px) 40vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col items-start p-6 sm:p-8">
                      <p className="text-sm font-semibold text-primary-blue">
                        <time dateTime={event.event_date}>{formatDate(event.event_date)}</time>
                        {event.location && <> | {event.location}</>}
                      </p>
                      <h3 className="mt-3 font-display text-3xl font-semibold text-dark-blue">
                        {event.title}
                      </h3>
                      <p className="mt-2 text-lg text-slate-700">{event.subtitle}</p>
                      {event.performers && (
                        <p className="mt-4 text-slate-600">{event.performers}</p>
                      )}
                      <div className="mt-6">
                        {event.entry_type === "libero" ? (
                          <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-800">
                            Ingresso Libero
                          </span>
                        ) : event.ticket_link ? (
                          <Button href={event.ticket_link}>Acquista Biglietti</Button>
                        ) : (
                          <span className="inline-flex rounded-full bg-light-blue px-4 py-2 text-sm font-semibold text-primary-blue">
                            Ingresso a pagamento
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                </li>
              ))}
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
      <nav aria-label="Navigazione del calendario" className="mb-10 flex flex-wrap items-center justify-between gap-4">
        {isCalendarMonth(previous) ? (
          <Button variant="secondary" href={`/calendario?mese=${previous}`}>← 3 Mesi Precedenti</Button>
        ) : (
          <Button variant="secondary" disabled>← 3 Mesi Precedenti</Button>
        )}
        <p className="font-display text-center text-xl font-semibold text-dark-blue">
          Da {formatMonth(months[0])} a {formatMonth(months[2])}
        </p>
        {isCalendarMonth(next) ? (
          <Button variant="secondary" href={`/calendario?mese=${next}`}>3 Mesi Successivi →</Button>
        ) : (
          <Button variant="secondary" disabled>3 Mesi Successivi →</Button>
        )}
      </nav>
      <EventList months={months} />
    </>
  );
}

export default function CalendarioPage({ searchParams }: { searchParams: Promise<{ mese?: string | string[] }> }) {
  return (
    <main>
      <Hero
        title="Calendario spettacoli"
        subtitle="Scopri i prossimi appuntamenti e vieni a trovarci a teatro."
      />
      <section aria-label="Prossimi spettacoli" className="mx-auto max-w-5xl px-5 py-10 sm:py-14">
        <Suspense fallback={<p>Caricamento degli eventi...</p>}>
          <CalendarContent searchParams={searchParams} />
        </Suspense>
      </section>
    </main>
  );
}
