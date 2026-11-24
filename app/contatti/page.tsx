import Hero from "@/components/ui/Hero";

export default function ContattiPage() {
  return (
    <main>
      <Hero title="Contatti" />
      <section aria-label="Indirizzi email" className="site-container grid gap-8 pb-20 sm:grid-cols-2 sm:pb-28">
        {[
          { title: "Scrivimi", email: "cesarecatacesare@gmail.com" },
          { title: "Info & Spettacoli", email: "info@lagruproduzioni.com" },
        ].map(({ title, email }) => (
          <div key={email} className="bg-white p-8">
            <h2 className="font-display text-3xl font-normal text-dark-blue">{title}</h2>
            <a href={`mailto:${email}`} className="mt-4 inline-block break-all rounded text-primary-blue underline hover:text-dark-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue">{email}</a>
          </div>
        ))}
      </section>
      <section className="bg-[#e8f3f8] py-20 text-center text-dark-blue">
        <div className="site-container">
          <h2 className="font-display text-4xl font-normal">Resta in contatto</h2>
          <p className="mt-4">Iscriviti al Canale WhatsApp per seguire le novità e gli spettacoli.</p>
          <a href="https://www.whatsapp.com/channel/0029VbB3zeKEQIaujAzFwa1y" className="mt-8 inline-flex min-h-11 items-center bg-primary-blue px-7 py-3 text-base font-medium text-white transition-colors hover:bg-dark-blue motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue">
            Segui il Canale WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
