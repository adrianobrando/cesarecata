export const runtime = 'edge';

import Link from "next/link";
import { Suspense } from "react";
import Hero from "@/components/ui/Hero";
import { libri } from "@/data/libri";
import { spettacoli } from "@/data/spettacoli";
import { searchItems } from "@/lib/search";

type SearchParams = Promise<{ q?: string | string[] }>;

async function SearchResults({ searchParams }: { searchParams: SearchParams }) {
  const { q } = await searchParams;
  const query = (Array.isArray(q) ? q[0] : q)?.trim() ?? "";

  if (!query) {
    return <p className="mt-6 text-slate-700">Inserisci un termine per cercare tra spettacoli, libri e corsi.</p>;
  }

  const shows = searchItems(spettacoli, query);
  const books = searchItems(libri, query);

  if (shows.length === 0 && books.length === 0) {
    return <p className="mt-6 text-slate-700">Nessun risultato trovato per &apos;{query}&apos;. Prova con un&apos;altra parola chiave.</p>;
  }

  const showResults = shows.map((show) => {
    const [subtitle, ...descriptionParts] = show.description.split(/\n\s*\n/);
    return {
      ...show,
      subtitle,
      description: descriptionParts.join("\n\n").trim(),
      href: `/lezioni-spettacolo/${show.id}`,
    };
  });
  return (
    <div className="mt-8 space-y-10">
      {[
        { title: "Spettacoli", items: showResults },
        { title: "Libri", items: books.map((book) => ({ ...book, subtitle: "", href: `/libri-e-scritti#${book.id}` })) },
      ].filter(({ items }) => items.length > 0).map(({ title, items }) => (
        <section key={title}>
          <h2 className="font-display text-2xl font-semibold text-dark-blue">{title}</h2>
          <ul className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <li key={item.id}>
                <article className="flex h-full flex-col bg-white p-6">
                  <h3 className="font-display text-xl font-semibold text-dark-blue">{item.title}</h3>
                  {item.subtitle && <p className="mt-3 font-semibold text-dark-blue">{item.subtitle}</p>}
                  <p className={`${item.subtitle ? "mt-4" : "mt-3"} line-clamp-4 text-slate-700`}>{item.description}</p>
                  <Link href={item.href} className="mt-4 self-start rounded font-semibold text-primary-blue hover:text-dark-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue">
                    Leggi di più<span className="sr-only">: {item.title}</span>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export default function CercaPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <main>
      <Hero title="Cerca" />
      <section className="mx-auto min-h-[50vh] max-w-[1200px] px-5 pb-20 sm:px-8 sm:pb-28">
        <Suspense fallback={<p className="mt-6">Caricamento dei risultati...</p>}>
          <SearchResults searchParams={searchParams} />
        </Suspense>
      </section>
    </main>
  );
}
