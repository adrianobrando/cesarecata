import Image from "next/image";
import Button from "./Button";

const programs = [
  {
    title: "I Corsi",
    description:
      "Percorsi formativi per scoprire l’arte di parlare in pubblico, raccontare storie e pensare. Per adulti e ragazzi.",
  },
  {
    title: "Viaggi Letterari",
    description:
      "Dall’Irlanda di Yeats alla Grecia di Omero, viaggi sulle tracce dei grandi scrittori e dei loro mondi.",
  },
];

function ImagePlaceholder({ className }: { className: string }) {
  return (
    <div className={`relative overflow-hidden bg-light-blue ${className}`}>
      <Image
        src="/images/spettacolo-placeholder.svg"
        alt=""
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 bg-dark-blue/70 px-4 py-2 text-center text-sm font-medium text-white"
      >
        Immagine in arrivo
      </span>
    </div>
  );
}

export default function HomeSections() {
  return (
    <>
      <section
        id="bio"
        aria-labelledby="home-bio-title"
        className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20"
      >
        <div className="lg:order-2">
          <h2 id="home-bio-title" className="font-display text-4xl font-normal text-dark-blue sm:text-5xl">
            Bio
          </h2>
          <p className="mt-4 leading-relaxed text-slate-700">
            Cesare Catà (Porto San Giorgio, 1981) è un filosofo e uno storyteller teatrale. Come
            una specie di trobadore del nuovo millennio, si esibisce in lezioni-spettacolo in cui
            racconta Shakespeare, gli antichi miti, le fiabe folkloriche, i grandi classici della
            letteratura. Porta le sue storie sia in teatro che in luoghi inusuali come spiagge,
            pub, boschi, montagne. Nei suoi racconti si intrecciano il teatro di narrazione, la
            psicologia archetipica e la stand-up comedy.
          </p>
          <p className="mt-4 leading-relaxed text-slate-700">
            Dottore di Ricerca (PhD) in Filosofia del Rinascimento presso l’Università di Macerata,
            ha avuto esperienze di formazione e collaborazione con università e centri di ricerca
            in USA, Francia, Germania, Irlanda. Vive nelle Marche, nella terra che tanto ama tra
            l’Adriatico e i Monti Sibillini.
          </p>
          <p className="mt-4 leading-relaxed text-slate-700">
            Tra le sue pubblicazioni: <em>Chiedilo a Shakespeare</em> (Ponte alle Grazie);{" "}
            <em>Una zattera per Itaca. L’Odissea come guida spirituale</em> (Ponte alle Grazie);{" "}
            <em>Tra i pub e le Fate. Viaggio magico e letterario in Irlanda</em> (Il Melangolo);{" "}
            <em>Addio, Cavaliere! Filosofia e destino del corteggiamento</em> (Liberilibri);{" "}
            <em>Contro il morire della luce. Dylan Thomas</em> (Ares).
          </p>
          <Button href="/biografia" variant="secondary" className="mt-6">
            Scopri la biografia
          </Button>
        </div>
        <Image
          src="/images/pic-cesare_1.jpg"
          alt="Cesare Catà legge accanto a un leggio"
          width={768}
          height={960}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="h-auto w-full lg:order-1"
        />
      </section>

      <section aria-labelledby="home-shows-title" className="px-5 py-4 sm:px-8 sm:py-6">
        <div className="relative mx-auto min-h-[26rem] max-w-[1200px] overflow-hidden bg-dark-blue sm:min-h-[30rem]">
          <Image
            src="/images/pic-shakespeareonthebeach_1.jpg"
            alt=""
            fill
            sizes="(min-width: 1536px) 1536px, 100vw"
            className="object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-dark-blue/75" />
          <div className="relative mx-auto flex min-h-[26rem] max-w-4xl flex-col items-center justify-center px-6 py-16 text-center text-white sm:min-h-[30rem]">
            <h2 id="home-shows-title" className="font-display text-4xl font-normal sm:text-5xl">
              Lezioni-Spettacolo
            </h2>
            <p className="mt-4 text-lg leading-relaxed sm:text-xl">
              Come un trobadore contemporaneo, Cesare Catà intreccia filosofia, letture teatrali,
              psicologia archetipica e stand-up comedy per raccontare antiche storie sempre nuove,
              tra incanto e ironia.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/lezioni-spettacolo">Tutti gli eventi</Button>
              <Button
                href="/calendario"
                variant="secondary"
                className="border-white bg-white text-dark-blue hover:bg-light-blue"
              >
                Scopri il calendario
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-label="Corsi e viaggi letterari"
        className="mx-auto grid max-w-[1200px] gap-8 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2"
      >
        {programs.map(({ title, description }) => (
          <article
            key={title}
            className="relative flex min-h-[26rem] items-end overflow-hidden bg-dark-blue sm:min-h-[30rem]"
          >
            <ImagePlaceholder className="absolute inset-0" />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-dark-blue/75"
            />
            <div className="relative p-6 text-white sm:p-8">
              <h2 className="font-display text-3xl font-normal sm:text-4xl">
                {title}
              </h2>
              <p className="mt-3 leading-relaxed">{description}</p>
              <Button
                href="/contatti"
                variant="secondary"
                className="mt-6 border-white bg-white text-dark-blue hover:bg-light-blue"
              >
                Richiedi informazioni<span className="sr-only">: {title}</span>
              </Button>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
