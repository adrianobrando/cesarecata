import Image from "next/image";
import Button from "@/components/ui/Button";
import Hero from "@/components/ui/Hero";

const viaggi = [
  {
    title: "L’Irlanda di Yeats e delle Fate",
    image: "/images/viaggio-placeholder-irlanda.svg",
    imageAlt: "Immagine segnaposto: le verdi colline dell’Irlanda occidentale",
    description:
      "Da Sligo al Connemara, un percorso unico nell’Ovest irlandese, fuori dalle rotte più turistiche. Alla scoperta della terra più magica d’Europa attraverso l’opera di Yeats, dei grandi autori dell’Isola e delle sue antichissime leggende, fitte di Fate, Leprechaun e Banshee.",
  },
  {
    title: "La Grecia di Omero e degli Eroi",
    image: "/images/viaggio-placeholder-grecia.svg",
    imageAlt: "Immagine segnaposto: un’isola greca affacciata sul mare",
    description:
      "Partendo dall’isola di Lefkada, un viaggio nella bellezza della Grecia contemporanea per scoprire quella antica attraverso i versi omerici e le storie degli Eroi, narrate nei luoghi stessi che le ispirarono.",
  },
  {
    title: "Il Tirolo di Elisabetta e del Romanticismo",
    image: "/images/viaggio-placeholder-tirolo.svg",
    imageAlt: "Immagine segnaposto: le montagne e un villaggio del Tirolo",
    description:
      "Un tour speciale che, partendo da Merano e dalle sue meraviglie, esplora il senso del Romanticismo tedesco attraverso la vita di Elisabetta di Baviera. Un percorso letterario tra gli incanti del mondo della montagna tirolese.",
  },
  {
    title: "L’Inghilterra di Shakespeare e dei grandi scrittori",
    image: "/images/viaggio-placeholder-inghilterra.svg",
    imageAlt: "Immagine segnaposto: un villaggio tra le colline inglesi",
    description:
      "Partendo da Stratford-upon-Avon e spostandosi tra i Cotswolds e Oxford, il viaggio propone un percorso sulle orme di Shakespeare, Virginia Woolf, Jane Austen e Tolkien, tra le grandi pagine di autori memorabili e gli incanti della campagna inglese.",
  },
];

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
            alt="Cesare Catà accompagna un gruppo di viaggiatori in un bosco"
            width={1200}
            height={800}
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
            className="aspect-[3/2] w-full object-cover"
          />
          <div>
            <h2 className="font-display text-3xl text-dark-blue sm:text-4xl">
              La letteratura, chiave di un luogo
            </h2>
            <p className="mt-5 leading-relaxed text-slate-700">
              La letteratura è una chiave per conoscere lo spirito più autentico di un luogo,
              l’essenziale genius loci di una terra. I racconti di Cesare Catà partono dalle
              parole e dalle vite dei grandi scrittori per accompagnare i viaggiatori non solo
              nella visita geografica di un paese, ma nell’anima di un popolo: le sue tradizioni,
              i suoi miti, la sua identità. Un percorso unico ed emozionante.
            </p>
            <Button href="/contatti" className="mt-6">
              Richiedi informazioni
            </Button>
          </div>
        </div>

        <section aria-labelledby="itinerari-title" className="mt-16 sm:mt-20">
          <h2
            id="itinerari-title"
            className="font-display text-3xl text-dark-blue sm:text-4xl"
          >
            I percorsi proposti
          </h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {viaggi.map((viaggio) => (
              <li key={viaggio.title}>
                <article className="h-full overflow-hidden rounded-2xl bg-white shadow-sm">
                  <Image
                    src={viaggio.image}
                    alt={viaggio.imageAlt}
                    width={1200}
                    height={750}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="aspect-[8/5] w-full rounded-none object-cover"
                  />
                  <div className="p-6 sm:p-8">
                    <h3 className="font-display text-2xl text-dark-blue">
                      {viaggio.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-slate-700">
                      {viaggio.description}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}
