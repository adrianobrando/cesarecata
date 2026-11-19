import Hero from "@/components/ui/Hero";

export default function ContattiPage() {
  return (
    <main>
      <Hero title="Contatti" />
      <section aria-label="Indirizzi email" className="mx-auto grid max-w-screen-2xl gap-6 px-5 py-12 sm:grid-cols-2 sm:px-6 sm:py-16">
        {[
          { title: "Scrivimi", email: "cesarecatacesare@gmail.com" },
          { title: "Info & Spettacoli", email: "info@lagruproduzioni.com" },
        ].map(({ title, email }) => (
          <div key={email} className="rounded-2xl border border-light-blue bg-white p-8 shadow-sm">
            <h2 className="font-display text-2xl font-semibold text-dark-blue">{title}</h2>
            <a href={`mailto:${email}`} className="mt-4 inline-block break-all rounded text-primary-blue underline hover:text-dark-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue">{email}</a>
          </div>
        ))}
      </section>
      <section className="bg-[#25D366] px-5 py-16 text-center text-[#123123] sm:px-6">
        <h2 className="font-display text-3xl font-semibold">Resta in contatto</h2>
        <p className="mt-4">Iscriviti al Canale WhatsApp per seguire le novità e gli spettacoli.</p>
        <a href="https://www.whatsapp.com/channel/0029VbB3zeKEQIaujAzFwa1y" className="mt-8 inline-flex rounded-lg bg-white px-8 py-4 text-lg font-semibold text-[#123123] shadow-sm hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123123]">
          Segui il Canale WhatsApp
        </a>
      </section>
    </main>
  );
}
