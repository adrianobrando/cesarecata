import Image from "next/image";
import Button from "@/components/ui/Button";
import Hero from "@/components/ui/Hero";
import { corsi } from "@/data/corsi";

export default function CorsiPage() {
  return (
    <main>
      <Hero
        title="I corsi"
      />

      <section className="site-container pb-20 pt-10 sm:pb-28 sm:pt-12">
        <div className="grid items-center gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <Image
            src="/images/pic-bg-corsi.png"
            alt="Una lezione con spiegazioni alla lavagna"
            width={1200}
            height={800}
            priority
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="aspect-[5/3] w-full rounded-none object-cover"
          />

          <div className="max-w-2xl">
            <p className="text-xl leading-relaxed text-slate-700 sm:text-2xl">
              Seminari dedicati alla riscoperta della grande tradizione umanistica e della sua
              bellezza, per ragazzi e per adulti.
            </p>
          </div>
        </div>

        <section aria-labelledby="corsi-title" className="mt-10 sm:mt-12">
          <h2 id="corsi-title" className="font-display text-2xl text-dark-blue sm:text-3xl">
            I percorsi proposti
          </h2>
          <div className="mt-6 space-y-3">
            {corsi.map((corso, index) => (
              <details
                key={corso.title}
                className="group scroll-mt-24 overflow-hidden rounded-xl border border-dark-blue/25 bg-white/70 transition-colors hover:border-dark-blue/50 open:bg-white motion-reduce:transition-none"
              >
                <summary className="grid min-h-14 cursor-pointer list-none grid-cols-[2rem_minmax(0,1fr)] items-center gap-x-4 gap-y-2 px-4 py-3 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-blue sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:gap-x-6 sm:px-6">
                  <span
                    aria-hidden="true"
                    className="font-display text-xl font-semibold tabular-nums text-dark-blue"
                  >
                    {index + 1}
                  </span>
                  <span
                    role="heading"
                    aria-level={3}
                    className="min-w-0 break-words font-display text-lg font-semibold leading-tight text-dark-blue sm:text-xl"
                  >
                    {corso.title}
                  </span>
                  <span className="col-start-2 font-sans text-sm font-semibold text-dark-blue sm:col-start-auto">
                    Leggi il percorso
                  </span>
                </summary>

                <div className="border-t border-dark-blue/10 px-5 py-6 sm:px-7 sm:py-8">
                  {(corso.subtitle || corso.audience) && (
                    <div className="mb-5">
                      {corso.subtitle && (
                        <p className="font-display text-xl text-dark-blue">{corso.subtitle}</p>
                      )}
                      {corso.audience && (
                        <p className="mt-1 font-sans text-sm font-medium text-primary-blue">
                          {corso.audience}
                        </p>
                      )}
                    </div>
                  )}
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
        </section>

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
