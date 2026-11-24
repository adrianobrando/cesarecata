import Image from "next/image";
import Button from "@/components/ui/Button";
import Hero from "@/components/ui/Hero";

const publications = [
  { id: "una-zattera-per-itaca", text: "Una zattera per Itaca. L’Odissea come guida spirituale per naufraghi contemporanei (Ponte alle Grazie)" },
  { id: "chiedilo-a-shakespeare", text: "Chiedilo a Shakespeare. Il teatro del Bardo come antidoto al mare delle nostre pene (Ponte alle Grazie, 2021)" },
  { id: "tra-i-pub-e-le-fate", text: "Tra i Pub e le Fate. Viaggio magico e letterario in Irlanda (Il Melangolo, 2024)" },
  { id: "addio-cavaliere", text: "Addio, Cavaliere! Filosofia e destino dell’arte del corteggiamento (Liberilibri)" },
  { id: "contro-il-morire-della-luce", text: "Contro il morire della luce. Dylan Thomas (Ares)" },
];

export default function BiografiaPage() {
  return (
    <main>
      <Hero title="Biografia" />
      <section className="mx-auto max-w-screen-xl px-5 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.5fr)_minmax(18rem,0.8fr)]">
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
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="mt-8 h-auto w-full rounded-2xl"
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

          <aside className="space-y-10">
            <section aria-labelledby="pubblicazioni-title" className="rounded-2xl bg-light-blue/50 p-6 sm:p-8">
              <h2 id="pubblicazioni-title" className="font-display text-2xl font-semibold text-dark-blue">
                Tra le ultime pubblicazioni
              </h2>
              <ul className="mt-5 space-y-4 text-slate-700">
                {publications.map(({ id, text }) => (
                  <li key={id} className="border-l-2 border-primary-blue pl-4 leading-relaxed">
                    <p>{text}</p>
                    <Button href={`/libri-e-scritti#${id}`} variant="secondary" className="mt-3 px-4 py-2 text-sm">
                      Scopri il libro<span className="sr-only">: {text}</span>
                    </Button>
                  </li>
                ))}
              </ul>
            </section>

            <Image
              src="/images/pic-cesare_3.jpg"
              alt="Cesare Catà legge sul palco durante uno spettacolo"
              width={641}
              height={960}
              sizes="(min-width: 1024px) 35vw, 100vw"
              className="h-auto w-full rounded-2xl"
            />

            <section aria-labelledby="articoli-title">
              <h2 id="articoli-title" className="font-display text-2xl font-semibold text-dark-blue">
                Articoli scientifici
              </h2>
              <p className="mt-4 leading-relaxed text-slate-700">
                Ha pubblicato numerosi articoli su riviste scientifiche negli ambiti della
                filosofia rinascimentale, dell’ermeneutica, della psicologia analitica e
                dell’estetica.
              </p>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}
