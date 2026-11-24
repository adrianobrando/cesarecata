import Link from "next/link";

const columns = [
  {
    title: "Esplora",
    links: [
      { label: "Biografia", href: "/biografia" },
      { label: "Lezioni-Spettacolo", href: "/lezioni-spettacolo" },
      { label: "Calendario", href: "/calendario" },
    ],
  },
  {
    title: "Scopri",
    links: [
      { label: "Libri e Scritti", href: "/libri-e-scritti" },
      { label: "I Corsi", href: "/corsi" },
      { label: "Viaggi Letterari", href: "/viaggi-letterari" },
    ],
  },
  {
    title: "Risorse",
    links: [{ label: "Contatti", href: "/contatti" }],
  },
];

const socialIcons = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/cesare.cata",
    path: "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12Z",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/cesarecatacesare/?hl=it",
    path: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm10.5 1.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@magicalafternoon8519",
    path: "M21.58 7.19a2.76 2.76 0 0 0-1.94-1.95C17.93 4.78 12 4.78 12 4.78s-5.93 0-7.64.46a2.76 2.76 0 0 0-1.94 1.95A28.8 28.8 0 0 0 2 12a28.8 28.8 0 0 0 .42 4.81 2.76 2.76 0 0 0 1.94 1.95c1.71.46 7.64.46 7.64.46s5.93 0 7.64-.46a2.76 2.76 0 0 0 1.94-1.95A28.8 28.8 0 0 0 22 12a28.8 28.8 0 0 0-.42-4.81ZM10 15.5v-7l6 3.5-6 3.5Z",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/cesare-cat%C3%A0-b636864b/",
    path: "M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52C22 2.68 21.31 2 20.45 2ZM7.93 18.75H4.97V9.2h2.96v9.55ZM6.45 7.9a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44Zm12.3 10.85h-2.96V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.5V9.2h2.84v1.3h.04a3.11 3.11 0 0 1 2.8-1.54c3 0 3.57 1.98 3.57 4.55v5.24Z",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-light-blue bg-[#e8f3f8]">
      <div className="site-container grid gap-10 py-16 md:grid-cols-4">
        <div>
          <Link href="/" className="font-display text-3xl font-normal text-dark-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue">
            Cesare Catà
          </Link>
          <ul aria-label="Social" className="mt-6 flex gap-2 text-primary-blue">
            {socialIcons.map(({ name, href, path }) => (
              <li key={name}>
                <a href={href} aria-label={name} className="inline-flex h-11 w-11 items-center justify-center hover:text-dark-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                    <path d={path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
        {columns.map(({ title, links }) => (
          <nav key={title} aria-label={title}>
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-dark-blue">{title}</h2>
            <ul className="mt-5 space-y-3">
              {links.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-base text-slate-700 underline-offset-4 hover:text-primary-blue hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
    </footer>
  );
}
