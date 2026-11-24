import Image from "next/image";
import Button from "@/components/ui/Button";
import Hero from "@/components/ui/Hero";

export default function ViaggiLetterariPage() {
  return (
    <main>
      <Hero
        title="Viaggi Letterari"
        subtitle="In cammino nei luoghi delle storie."
      />
      <section className="site-container pb-20 sm:pb-28">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Image
            src="/images/pic-bg-viaggiletterari.png"
            alt=""
            width={1200}
            height={800}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[3/2] w-full object-cover"
          />
          <div>
            <h2 className="font-display text-3xl text-dark-blue sm:text-4xl">
              Viaggiare attraverso la letteratura
            </h2>
            <p className="mt-5 leading-relaxed text-slate-700">
              Paesaggi, miti e parole si incontrano in itinerari ispirati agli scrittori e alle
              storie che hanno dato voce ai luoghi.
            </p>
            <p className="mt-4 leading-relaxed text-slate-700">
              Gli itinerari qui sotto sono esempi. Per conoscere viaggi disponibili, date e
              modalità di partecipazione, contattaci.
            </p>
            <Button href="/contatti" className="mt-6">Richiedi informazioni</Button>
          </div>
        </div>
        <section aria-labelledby="viaggi-esempi" className="mt-16">
          <h2 id="viaggi-esempi" className="font-display text-3xl text-dark-blue">Esempi di itinerari</h2>
          <ul className="mt-6 grid gap-6 md:grid-cols-2">
            <li className="rounded-2xl bg-white p-6 sm:p-8">
              <h3 className="font-display text-2xl text-dark-blue">L’Irlanda di Yeats</h3>
              <p className="mt-3 leading-relaxed text-slate-700">
                Un viaggio immaginato tra paesaggi irlandesi, poesia e tradizioni popolari.
              </p>
            </li>
            <li className="rounded-2xl bg-white p-6 sm:p-8">
              <h3 className="font-display text-2xl text-dark-blue">La Grecia di Omero</h3>
              <p className="mt-3 leading-relaxed text-slate-700">
                Un itinerario ispirato ai miti e ai luoghi evocati dai racconti dell’antica Grecia.
              </p>
            </li>
          </ul>
        </section>
      </section>
    </main>
  );
}
