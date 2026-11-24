import Image from "next/image";
import Button from "@/components/ui/Button";
import Hero from "@/components/ui/Hero";

export default function CorsiPage() {
  return (
    <main>
      <Hero
        title="I Corsi"
        subtitle="Parole, storie e idee da esplorare insieme."
      />
      <section className="site-container pb-20 sm:pb-28">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Image
            src="/images/pic-bg-corsi.png"
            alt=""
            width={1200}
            height={800}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[3/2] w-full object-cover"
          />
          <div>
            <h2 className="font-display text-3xl text-dark-blue sm:text-4xl">
              Percorsi per raccontare e comunicare
            </h2>
            <p className="mt-5 leading-relaxed text-slate-700">
              Dallo storytelling al public speaking, i corsi intrecciano letteratura, filosofia
              e narrazione per scoprire nuovi modi di dare forma alle proprie idee.
            </p>
            <p className="mt-4 leading-relaxed text-slate-700">
              Questa pagina presenta esempi di possibili percorsi. Per informazioni su programmi,
              disponibilità e modalità di partecipazione, contattaci.
            </p>
            <Button href="/contatti" className="mt-6">Richiedi informazioni</Button>
          </div>
        </div>
        <section aria-labelledby="corsi-esempi" className="mt-16">
          <h2 id="corsi-esempi" className="font-display text-3xl text-dark-blue">Esempi di percorsi</h2>
          <ul className="mt-6 grid gap-6 md:grid-cols-2">
            <li className="rounded-2xl bg-white p-6 sm:p-8">
              <h3 className="font-display text-2xl text-dark-blue">L’arte di raccontare</h3>
              <p className="mt-3 leading-relaxed text-slate-700">
                Un percorso tra storie e immaginazione per esplorare gli strumenti della narrazione.
              </p>
            </li>
            <li className="rounded-2xl bg-white p-6 sm:p-8">
              <h3 className="font-display text-2xl text-dark-blue">Parlare in pubblico</h3>
              <p className="mt-3 leading-relaxed text-slate-700">
                Un laboratorio dedicato alla voce, alla presenza e alla comunicazione delle idee.
              </p>
            </li>
          </ul>
        </section>
      </section>
    </main>
  );
}
