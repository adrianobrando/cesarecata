import Image from "next/image";
import Hero from "@/components/ui/Hero";

export default function ContattiPage() {
  return (
    <main>
      <Hero title="Contatti" />
      <section aria-label="Contatti" className="site-container grid gap-8 pb-20 sm:pb-28 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl sm:aspect-[2/1] lg:aspect-auto lg:min-h-[28rem]">
          <Image
            src="/images/pic-cesare_5.webp"
            alt="Cesare Catà legge un libro seduto a un tavolo"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          {[
            { title: "Scrivimi", email: "cesarecatacesare@gmail.com" },
            { title: "Info & Spettacoli", email: "info@lagruproduzioni.com" },
          ].map(({ title, email }) => (
            <div key={email} className="flex flex-col items-start justify-center bg-white p-8">
              <h2 className="font-display text-3xl font-normal text-dark-blue">{title}</h2>
              <a href={`mailto:${email}`} className="mt-4 inline-block break-all rounded text-primary-blue underline hover:text-dark-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue">{email}</a>
            </div>
          ))}
          <div className="relative flex flex-col justify-center overflow-hidden bg-[#075e46] p-8 text-white sm:col-span-2">
            <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className="pointer-events-none absolute -right-8 -bottom-12 w-56">
              <defs>
                <linearGradient id="whatsapp-fade" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="white" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="white" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              <path fill="url(#whatsapp-fade)" d="M20.52 3.48A11.87 11.87 0 0 0 12.06 0C5.46 0 .1 5.36.1 11.96c0 2.11.55 4.17 1.6 5.99L0 24l6.22-1.63a11.94 11.94 0 0 0 5.83 1.49h.01c6.59 0 11.95-5.36 11.95-11.96 0-3.19-1.24-6.19-3.49-8.42ZM12.06 21.84a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.69.97.98-3.6-.23-.37a9.88 9.88 0 0 1-1.52-5.29c0-5.44 4.42-9.86 9.87-9.86 2.63 0 5.11 1.03 6.97 2.89a9.8 9.8 0 0 1 2.88 6.97c0 5.45-4.42 9.88-9.86 9.88Zm5.41-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.39-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.11 3.22 5.12 4.52.72.31 1.27.49 1.7.63.72.23 1.37.2 1.89.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.18-1.42-.08-.12-.27-.2-.57-.35Z" />
            </svg>
            <div className="relative">
              <h2 className="font-display text-3xl font-normal">Resta in contatto</h2>
              <p className="mt-4">Iscriviti al Canale WhatsApp per seguire le novità e gli spettacoli.</p>
              <a href="https://www.whatsapp.com/channel/0029VbB3zeKEQIaujAzFwa1y" className="mt-8 inline-flex min-h-11 items-center bg-white px-7 py-3 text-base font-medium text-[#075e46] transition-colors hover:bg-[#e2f3eb] motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                Segui il Canale WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
