export const runtime = 'edge';

import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import Button from "@/components/ui/Button";
import Hero from "@/components/ui/Hero";
import ShowCarousel from "@/components/ui/ShowCarousel";
import { spettacoli } from "@/data/spettacoli";
import { monthKey } from "@/lib/calendar-months";
import { countShowDates, formatShowDates, getFirstShowDate, getShowDateCount } from "@/lib/show-dates";
import { splitShowDescription } from "@/lib/show-description";
import { getSupabase } from "@/lib/supabase";
import type { Event } from "@/types/database";

type ShowDate = Pick<Event, "id" | "event_date" | "show_reference">;

async function ShowGrid() {
  await connection();
  const { data: events, error, count } = await getSupabase()
    .from("events")
    .select("id, event_date, show_reference", { count: "exact" })
    .gte("event_date", new Date().toISOString())
    .overrideTypes<ShowDate[], { merge: false }>();

  const incomplete = !error && (count === null || count !== events.length);
  if (error || incomplete) {
    console.error("Errore nel recupero delle date degli spettacoli:", error ?? "Risultati incompleti");
  }
  const showDates = error || incomplete ? [] : events;
  const counts = countShowDates(showDates);

  return (
    <>
      {(error || incomplete) && (
        <p role="alert" className="mb-6 text-slate-700">
          Impossibile caricare le nuove date. Consulta il calendario o riprova più tardi.
        </p>
      )}
      <ShowCarousel>
        <ul className="flex items-stretch gap-6">
          {spettacoli.map((show) => {
            const { subtitle } = splitShowDescription(show.description);
            const dateCount = getShowDateCount(counts, show);
            const firstDate = getFirstShowDate(showDates, show);
            return (
              <li key={show.id} className="flex w-[85%] shrink-0 snap-start sm:w-[calc((100%_-_1.5rem)_/_2)] lg:w-[calc((100%_-_3rem)_/_3)] xl:w-[calc((100%_-_7.5rem)_/_6)]">
                <article className="group relative isolate flex min-h-[360px] w-full flex-col overflow-hidden rounded-[21px] bg-dark-blue p-4 text-white shadow-lg transition-transform duration-200 hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none">
                  <Image src={show.image} alt="" fill sizes="(min-width: 1280px) 220px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw" className="-z-20 object-cover" />
                  <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  {firstDate && (
                    <Link
                      href={`/calendario?mese=${monthKey(new Date(firstDate.event_date))}#evento-${encodeURIComponent(firstDate.id)}`}
                      aria-label={`${formatShowDates(dateCount)} per ${show.title}: vai alla prima data nel calendario`}
                      className="relative z-20 inline-flex min-h-11 items-center self-start rounded-md bg-primary-blue px-3 text-sm font-semibold text-white hover:bg-dark-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      {formatShowDates(dateCount)}
                    </Link>
                  )}
                  <div className="mt-auto flex flex-col justify-end pt-6">
                    <h2 className="break-words font-display text-2xl font-semibold leading-tight">{show.title}</h2>
                    {subtitle && <p className="mt-2 text-sm font-medium leading-snug">{subtitle}</p>}
                  </div>
                  <Link
                    href={`/lezioni-spettacolo/${show.id}`}
                    className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white motion-reduce:transition-none"
                  >
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-10 w-10 text-white">
                      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                      <path d="m16 16 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span className="sr-only">Scopri di più: {show.title}</span>
                  </Link>
                </article>
              </li>
            );
          })}
        </ul>
      </ShowCarousel>
    </>
  );
}

export default function LezioniSpettacoloPage() {
  return (
    <main>
      <Hero title="Lezioni-Spettacolo" />
      <section aria-label="Lezioni-Spettacolo" className="site-container pb-20 sm:pb-28">
        <Suspense fallback={<p>Caricamento degli spettacoli...</p>}>
          <ShowGrid />
        </Suspense>
        <div className="mt-10 flex justify-center">
          <Button href="/calendario" className="rounded-full px-8 py-4">
            Vai al Calendario eventi
          </Button>
        </div>
      </section>
    </main>
  );
}
