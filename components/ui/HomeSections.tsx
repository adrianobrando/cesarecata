import Image from "next/image";
import { libri } from "@/data/libri";
import Button from "./Button";

const programs = [
  {
    title: "I Corsi",
    image: "/images/pic-bg-corsi.png",
    href: "/corsi",
    description:
      "Percorsi formativi per scoprire l’arte di parlare in pubblico, raccontare storie e pensare. Per adulti e ragazzi.",
  },
  {
    title: "Viaggi Letterari",
    image: "/images/pic-bg-viaggiletterari.png",
    href: "/viaggi-letterari",
    description:
      "Dall’Irlanda di Yeats alla Grecia di Omero, viaggi sulle tracce dei grandi scrittori e dei loro mondi.",
  },
];

export default function HomeSections() {
  return (
    <>
      <section
        id="bio"
        aria-labelledby="home-bio-title"
        className="site-container grid items-center gap-10 py-20 sm:py-28 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20"
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

      <section aria-labelledby="home-shows-title" className="site-container py-4 sm:py-6">
        <div className="relative min-h-[32rem] overflow-hidden rounded-2xl bg-dark-blue sm:min-h-[36rem]">
          <Image
            src="/images/pic-shakespeareonthebeach_1.jpg"
            alt=""
            fill
            sizes="(min-width: 1536px) 1536px, 100vw"
            className="object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-dark-blue via-dark-blue/85 to-transparent" />
          <div className="relative mx-auto flex min-h-[32rem] max-w-4xl flex-col items-center justify-end px-6 pb-12 pt-16 text-center text-white sm:min-h-[36rem]">
            <h2 id="home-shows-title" className="font-display text-4xl font-normal sm:text-5xl">
              Lezioni-Spettacolo
            </h2>
            <p className="mt-4 text-lg leading-relaxed sm:text-xl">
              Come un trobadore contemporaneo, Cesare Catà intreccia filosofia, letture teatrali,
              psicologia archetipica e stand-up comedy per raccontare antiche storie sempre nuove,
              tra incanto e ironia.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/lezioni-spettacolo">Repertorio spettacoli</Button>
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
        className="site-container grid gap-8 pb-4 pt-8 sm:pb-6 sm:pt-10 lg:grid-cols-2"
      >
        {programs.map(({ title, image, href, description }) => (
          <article
            key={title}
            className="relative flex min-h-[26rem] items-end overflow-hidden rounded-2xl bg-dark-blue sm:min-h-[30rem]"
          >
            <Image
              src={image}
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-dark-blue via-dark-blue/85 to-transparent"
            />
            <div className="relative p-6 text-white sm:p-8">
              <h2 className="font-display text-3xl font-normal sm:text-4xl">
                {title}
              </h2>
              <p className="mt-3 leading-relaxed">{description}</p>
              <Button
                href={href}
                variant="secondary"
                className="mt-6 border-white bg-white text-dark-blue hover:bg-light-blue"
              >
                Scopri di più<span className="sr-only">: {title}</span>
              </Button>
            </div>
          </article>
        ))}
      </section>

      <section aria-labelledby="home-books-title" className="site-container pb-20 pt-4 sm:pb-28 sm:pt-6">
        <div className="relative min-h-[32rem] overflow-hidden rounded-2xl bg-dark-blue sm:min-h-[36rem]">
          <div aria-hidden="true" className="absolute inset-0 grid grid-cols-3 sm:grid-cols-5">
            {libri.slice(0, 5).map((libro, index) => (
              <div key={libro.id} className={`relative ${index >= 3 ? "hidden sm:block" : ""}`}>
                <Image
                  src={libro.image}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 20vw, 33vw"
                  className="rounded-none object-cover"
                />
              </div>
            ))}
          </div>
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-dark-blue via-dark-blue/90 to-dark-blue/50" />
          <div className="relative mx-auto flex min-h-[32rem] max-w-4xl flex-col items-center justify-end px-6 pb-12 pt-16 text-center text-white sm:min-h-[36rem]">
            <h2 id="home-books-title" className="font-display text-4xl font-normal sm:text-5xl">
              Libri e Scritti
            </h2>
            <p className="mt-4 text-lg leading-relaxed sm:text-xl">
              Tra filosofia, letteratura e miti, libri e scritti diventano un invito a esplorare
              storie, idee e mondi incantati.
            </p>
            <Button href="/libri-e-scritti" className="mt-8">
              Scopri libri e scritti
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
