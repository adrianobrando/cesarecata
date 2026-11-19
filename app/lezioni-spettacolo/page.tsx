export const runtime = 'edge';

import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import Button from "@/components/ui/Button";
import Hero from "@/components/ui/Hero";
import { spettacoli } from "@/data/spettacoli";
import { countShowDates, formatShowDates, getShowDateCount, getShowPage } from "@/lib/show-dates";
import { supabase } from "@/lib/supabase";
import type { Event } from "@/types/database";


async function ShowGrid({ start }: { start: number }) {
  await connection();

  const { data: events, error, count } = await supabase
    .from("events")
    .select("show_reference", { count: "exact" })
    .gte("event_date", new Date().toISOString())
    .overrideTypes<Pick<Event, "show_reference">[], { merge: false }>();

  const incomplete = !error && (count === null || count !== events.length);
  if (error || incomplete) {
    console.error("Errore nel recupero delle date degli spettacoli:", error ?? "Risultati incompleti");
  }
  const counts = countShowDates(error || incomplete ? [] : events);

  return (
    <>
      {(error || incomplete) && (
        <p role="alert" className="mb-6 text-slate-700">
          Impossibile caricare le nuove date. Consulta il calendario o riprova più tardi.
        </p>
      )}
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {spettacoli.slice(start, start + 4).map((show) => {
          const dateCount = getShowDateCount(counts, show);
          const [subtitle, ...descriptionParts] = show.description.split(/\n\s*\n/);
          const description = descriptionParts.join("\n\n").trim();
          return (
            <li key={show.id}>
              <article className="relative h-full overflow-hidden rounded-2xl border border-light-blue bg-white shadow-sm">
                <div className="relative aspect-[3/2] bg-light-blue">
                  <Image src={show.image} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                </div>
                {dateCount > 0 && (
                  <Link href="/calendario" aria-label={`${formatShowDates(dateCount)} per ${show.title}: vai al calendario`} className="absolute right-3 top-3 rounded-full bg-primary-blue px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-dark-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue">
                    {formatShowDates(dateCount)}
                  </Link>
                )}
                <div className="p-6">
                  <h2 className="font-display text-2xl font-semibold text-dark-blue">{show.title}</h2>
                  <p className="mt-3 font-semibold text-dark-blue">{subtitle}</p>
                  <p className="mt-4 line-clamp-4 text-slate-700">{description}</p>
                  <Link href={`/lezioni-spettacolo/${show.id}`} className="mt-4 inline-block rounded font-semibold text-primary-blue hover:text-dark-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue">
                    Scopri lo spettacolo<span className="sr-only">: {show.title}</span>
                  </Link>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default async function LezioniSpettacoloPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[] }>;
}) {
  const { page, totalPages, start } = getShowPage((await searchParams).page, spettacoli.length);
  return (
    <main>
      <Hero title="Lezioni-Spettacolo" />
      <section aria-label="Lezioni-Spettacolo" className="mx-auto max-w-screen-2xl px-5 py-12 sm:px-6 sm:py-16">
        <Suspense fallback={<p>Caricamento degli spettacoli...</p>}>
          <ShowGrid start={start} />
        </Suspense>
        <nav aria-label="Paginazione spettacoli" className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {page > 1 && <Button variant="secondary" href={`/lezioni-spettacolo?page=${page - 1}`}>Pagina Precedente</Button>}
          <span>Pagina {page} di {totalPages}</span>
          {page < totalPages && <Button variant="secondary" href={`/lezioni-spettacolo?page=${page + 1}`}>Pagina Successiva</Button>}
        </nav>
      </section>
    </main>
  );
}
