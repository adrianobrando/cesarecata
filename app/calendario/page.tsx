export const runtime = 'edge';

import Image from "next/image";
import { connection } from "next/server";
import { Suspense } from "react";
import Button from "@/components/ui/Button";
import Hero from "@/components/ui/Hero";
import { supabase } from "@/lib/supabase";
import { formatDate } from "@/lib/utils";
import type { Event } from "@/types/database";

type CalendarEvent = Pick<
  Event,
  "id" | "event_date" | "title" | "subtitle" | "image_url" | "performers" | "entry_type" | "ticket_link"
>;

async function EventList() {
  await connection();

  const { data: events, error } = await supabase
    .from("events")
    .select("id, event_date, title, subtitle, image_url, performers, entry_type, ticket_link")
    .gte("event_date", new Date().toISOString())
    .order("event_date", { ascending: true })
    .overrideTypes<CalendarEvent[], { merge: false }>();

  if (error) {
    console.error("Errore nel recupero del calendario:", error);
    return <p role="alert">Impossibile caricare gli eventi. Riprova più tardi.</p>;
  }

  if (!events.length) {
    return (
      <p className="rounded-2xl border border-light-blue bg-white px-6 py-10 text-center text-lg text-dark-blue">
        Nessun evento in programma al momento. Torna a trovarci presto!
      </p>
    );
  }

  return (
    <ul className="space-y-6">
      {events.map((event) => (
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
              <time dateTime={event.event_date} className="text-sm font-semibold text-primary-blue">
                {formatDate(event.event_date)}
              </time>
              <h2 className="mt-3 font-display text-3xl font-semibold text-dark-blue">
                {event.title}
              </h2>
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
  );
}

export default function CalendarioPage() {
  return (
    <main>
      <Hero
        title="Calendario spettacoli"
        subtitle="Scopri i prossimi appuntamenti e vieni a trovarci a teatro."
      />
      <section aria-label="Prossimi spettacoli" className="mx-auto max-w-5xl px-5 py-10 sm:py-14">
        <Suspense fallback={<p>Caricamento degli eventi...</p>}>
          <EventList />
        </Suspense>
      </section>
    </main>
  );
}
