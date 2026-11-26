import Image from "next/image";
import Button from "@/components/ui/Button";
import Hero from "@/components/ui/Hero";
import { corsi } from "@/data/corsi";

export default function CorsiPage() {
  return (
    <main>
      <Hero
        title="Corsi"
        subtitle="Seminari dedicati alla riscoperta della grande tradizione umanistica e della sua bellezza, per ragazzi e per adulti."
      />

      <section className="site-container pb-20 sm:pb-28">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <Image
            src="/images/pic-bg-corsi.png"
            alt="Una lezione con spiegazioni alla lavagna"
            width={1200}
            height={800}
            priority
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="aspect-[3/2] w-full object-cover"
          />

          <div>
            <p className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-primary-blue">
              Percorsi di formazione
            </p>
            <h2 className="mt-2 font-display text-3xl text-dark-blue sm:text-4xl">
              I percorsi proposti
            </h2>
            <nav aria-label="Indice dei percorsi">
              <ol className="mt-6 grid gap-3 sm:grid-cols-2">
                {corsi.map((corso, index) => (
                  <li key={corso.title}>
                    <a
                      href={`#corso-${index + 1}`}
                      className="group flex min-h-14 items-center gap-3 rounded-xl border border-dark-blue/10 bg-white/70 px-4 py-3 transition-colors hover:border-primary-blue/40 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue motion-reduce:transition-none"
                    >
                      <span className="font-sans text-sm font-semibold tabular-nums text-primary-blue">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-lg leading-tight text-dark-blue group-hover:text-primary-blue">
                        {corso.title}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-5xl space-y-4 sm:mt-16">
          {corsi.map((corso, index) => (
            <details
              key={corso.title}
              className="group scroll-mt-24 overflow-hidden rounded-2xl border border-dark-blue/10 bg-white/80 shadow-sm transition-shadow open:shadow-md motion-reduce:transition-none"
            >
              <summary
                id={`corso-${index + 1}`}
                className="flex min-h-24 cursor-pointer list-none items-center gap-4 px-5 py-5 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-blue sm:gap-6 sm:px-7"
              >
                <span
                  aria-hidden="true"
                  className="font-display text-3xl text-primary-blue/70 sm:text-4xl"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    role="heading"
                    aria-level={3}
                    className="block break-words font-display text-2xl leading-tight text-dark-blue sm:text-3xl"
                  >
                    {corso.title}
                  </span>
                  {corso.subtitle && (
                    <span className="mt-1 block text-base leading-snug text-slate-700">
                      {corso.subtitle}
                    </span>
                  )}
                  {corso.audience && (
                    <span className="mt-1 block font-sans text-sm font-medium text-primary-blue">
                      {corso.audience}
                    </span>
                  )}
                </span>
                <span className="hidden shrink-0 font-sans text-sm text-slate-600 sm:block">
                  Leggi il percorso
                </span>
                <span
                  aria-hidden="true"
                  className="shrink-0 font-sans text-2xl text-primary-blue transition-transform group-open:rotate-45 motion-reduce:transition-none"
                >
                  +
                </span>
              </summary>

              <div className="border-t border-dark-blue/10 px-5 py-6 sm:px-7 sm:py-8">
                <div className="space-y-5 leading-relaxed text-slate-700">
                  {corso.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                {corso.sections?.map((section) => (
                  <section key={section.title} className="mt-8">
                    <h4 className="font-display text-xl text-dark-blue sm:text-2xl">
                      {section.title}
                    </h4>
                    {section.paragraphs && (
                      <div className="mt-3 space-y-4 leading-relaxed text-slate-700">
                        {section.paragraphs.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    )}
                    {section.items && (
                      <ul className="mt-3 space-y-2 pl-5 leading-relaxed text-slate-700 marker:text-primary-blue">
                        {section.items.map((item) => (
                          <li key={item} className="list-disc">
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>
            </details>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="max-w-2xl text-slate-700">
            Per informazioni su programmi, disponibilità e modalità di partecipazione, contattaci.
          </p>
          <Button href="/contatti">Richiedi informazioni</Button>
        </div>
      </section>
    </main>
  );
}
