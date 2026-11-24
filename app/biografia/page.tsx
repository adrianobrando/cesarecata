import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Hero from "@/components/ui/Hero";
import { libri } from "@/data/libri";

const pubblicazioniRecenti = libri.filter(({ id }) =>
  ["tra-i-pub-e-le-fate", "addio-cavaliere", "contro-il-morire-della-luce"].includes(id),
);

export default function BiografiaPage() {
  return (
    <main>
      <Hero title="Biografia" />
      <section className="site-container pb-20 sm:pb-28">
        <div className="space-y-12">
          <section aria-labelledby="profilo-title">
            <h2 id="profilo-title" className="font-display text-3xl font-semibold text-dark-blue">
              Filosofo e performer teatrale
            </h2>
            <p className="mt-5 text-xl leading-relaxed text-slate-700">
              Cesare Catà è nato a Porto San Giorgio tra il 2 e il 3 agosto del 1981. Come una
              specie di trobadore del nuovo millennio, si esibisce regolarmente con monologhi e
              lezioni-spettacolo, in teatro e in luoghi inusuali come pub, boschi, ristoranti e
              spiagge. È un monologhista e storyteller che intreccia il teatro di narrazione con
              la divulgazione filosofico-letteraria, la psicologia archetipica e l’ironia della
              stand-up comedy.
            </p>
            <p className="mt-5 leading-relaxed text-slate-700">
              È Dottore di Ricerca (PhD) in Filosofia del Rinascimento e un appassionato
              insegnante. Tiene corsi di formazione per gruppi aziendali e per alunni di diverse
              età, dalle scuole elementari all’università.
            </p>
            <Image
              src="/images/pic-cesare-biografia.jpg"
              alt="Cesare Catà parla al microfono durante uno spettacolo"
              width={1152}
              height={768}
              sizes="(min-width: 1200px) 1136px, (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
              className="mt-8 h-auto w-full"
            />
          </section>

          <section aria-labelledby="formazione-title">
            <h2 id="formazione-title" className="font-display text-3xl font-semibold text-dark-blue">
              Formazione e ricerca
            </h2>
            <p className="mt-5 leading-relaxed text-slate-700">
              Dopo il Liceo Classico e l’università, si è formato nel Laboratorio di letteratura
              diretto da Antonio Santori e nei corsi di teatro dell’Associazione “La Camera
              Chiara” di Fermo. Ha conseguito il titolo di Dottore di Ricerca (PhD) in Filosofia
              del Rinascimento presso l’Università di Macerata.
            </p>
            <p className="mt-4 leading-relaxed text-slate-700">
              Durante il dottorato è stato visiting scholar presso la Facoltà di Filosofia della
              University of Hawaii di Honolulu, dove ha approfondito la filosofia e la letteratura
              comparate, e Gastforscher presso il Cusanus-Institut della Facoltà teologica di
              Trier, dedicandosi allo studio di testi platonici medievali e rinascimentali. Si è
              inoltre diplomato alla Scuola di Filosofia Orientale e Comparativa di Rimini con
              una ricerca sul Buddhismo Zen nella letteratura statunitense.
            </p>
            <p className="mt-4 leading-relaxed text-slate-700">
              Dopo il dottorato ha svolto un periodo di ricerca presso l’EPHE di Parigi, con un
              progetto incentrato sull’arte rinascimentale e sull’estetica filosofica del
              Neoplatonismo.
            </p>
          </section>

          <section aria-labelledby="irlanda-title">
            <h2 id="irlanda-title" className="font-display text-3xl font-semibold text-dark-blue">
              Irlanda e viaggi letterari
            </h2>
            <p className="mt-5 leading-relaxed text-slate-700">
              Dalla fine degli anni Novanta ha trascorso vari periodi nell’Isola d’Irlanda,
              dedicandosi allo studio della lingua e della letteratura anglo-irlandese. In seguito
              ha collaborato con l’Istituto Italiano di Cultura di Dublino e con lo Yeats Center
              di Sligo.
            </p>
            <p className="mt-4 leading-relaxed text-slate-700">
              Oggi cura in Irlanda e in altri luoghi peculiari d’Europa percorsi di viaggi
              letterari per turisti italiani.
            </p>
          </section>

          <section aria-labelledby="insegnamento-title">
            <h2 id="insegnamento-title" className="font-display text-3xl font-semibold text-dark-blue">
              Insegnamento e formazione
            </h2>
            <p className="mt-5 leading-relaxed text-slate-700">
              Ha tenuto corsi universitari come Professore a contratto presso la Facoltà di
              Scienze della Comunicazione e il Seminario LUCI dell’Università di Macerata, su
              temi legati al rapporto tra letteratura e comunicazione contemporanea. Propone
              seminari di formazione aziendale, specialmente sui temi dello storytelling e del
              public speaking, e percorsi didattici nelle scuole per alunni di varie età.
            </p>
            <p className="mt-4 leading-relaxed text-slate-700">
              Vive nelle Marche, nella terra tra il Mare Adriatico e i Monti Sibillini che
              visceralmente ama.
            </p>
          </section>
        </div>
      </section>
      <section aria-labelledby="pubblicazioni-title" className="bg-light-blue py-16 sm:py-20">
        <div className="site-container">
          <h2 id="pubblicazioni-title" className="font-display text-3xl font-semibold text-dark-blue sm:text-4xl">
            Ultime pubblicazioni
          </h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {pubblicazioniRecenti.map((libro) => (
              <li key={libro.id}>
                <Link
                  href="/libri-e-scritti"
                  className="flex h-full gap-4 bg-white p-5 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
                >
                  <Image
                    src={libro.image}
                    alt=""
                    width={100}
                    height={150}
                    className="h-auto w-20 shrink-0 self-start rounded-md"
                  />
                  <div>
                    <h3 className="font-display text-xl font-semibold leading-tight text-dark-blue">
                      {libro.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-700">{libro.editor} · {libro.year}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <Button href="/libri-e-scritti" className="mt-8 rounded-full px-8 py-4">
            Scopri tutte le pubblicazioni
          </Button>
        </div>
      </section>
    </main>
  );
}
