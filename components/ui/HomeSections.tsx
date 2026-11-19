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
        className="mx-auto grid max-w-screen-2xl items-center gap-8 px-5 py-14 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-14"
      >
        <div>
          <h2 id="home-bio-title" className="font-display text-3xl font-semibold text-dark-blue sm:text-4xl">
            Bio
          </h2>
          <p className="mt-4 text-xl font-medium leading-relaxed text-dark-blue">
            Cesare Catà è filosofo e performer teatrale, un narratore di storie tra letteratura,
            filosofia e palcoscenico.
          </p>
          <p className="mt-4 leading-relaxed text-slate-700">
            Come un trovatore contemporaneo, intreccia teatro di narrazione, divulgazione
            filosofico-letteraria, psicologia archetipica e ironia per riscoprire il valore delle
            storie antiche nel presente.
          </p>
          <Button href="/biografia" variant="secondary" className="mt-6">
            Scopri la biografia
          </Button>
        </div>
        <ImagePlaceholder className="aspect-[4/3] rounded-2xl border border-light-blue" />
      </section>

      <section aria-labelledby="home-shows-title" className="px-5 py-4 sm:px-6 sm:py-6">
        <div className="relative mx-auto min-h-[26rem] max-w-screen-2xl overflow-hidden rounded-2xl bg-dark-blue sm:min-h-[30rem]">
          <Image
            src="/images/spettacolo-placeholder.svg"
            alt=""
            fill
            sizes="(min-width: 1536px) 1536px, 100vw"
            className="object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-dark-blue/90 via-dark-blue/60 to-dark-blue/25" />
          <div className="relative mx-auto flex min-h-[26rem] max-w-4xl flex-col items-center justify-center px-6 py-16 text-center text-white sm:min-h-[30rem]">
            <h2 id="home-shows-title" className="font-display text-3xl font-semibold sm:text-5xl">
              Lezioni-Spettacolo
            </h2>
            <p className="mt-4 text-lg leading-relaxed sm:text-xl">
              Come un trovatore contemporaneo, Cesare Catà intreccia filosofia, letture teatrali,
              psicologia archetipica e stand-up comedy per raccontare antiche storie sempre nuove,
              tra incanto e ironia.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/lezioni-spettacolo">Tutti gli eventi</Button>
              <Button
                href="/calendario"
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
        className="mx-auto grid max-w-screen-2xl gap-6 px-5 py-10 sm:px-6 sm:py-14 lg:grid-cols-2"
      >
        {programs.map(({ title, description }) => (
          <article
            key={title}
            className="relative flex min-h-[26rem] items-end overflow-hidden rounded-2xl bg-dark-blue shadow-sm sm:min-h-[30rem]"
          >
            <ImagePlaceholder className="absolute inset-0" />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-dark-blue/90 via-dark-blue/60 to-dark-blue/25"
            />
            <div className="relative p-6 text-white sm:p-8">
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">
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
