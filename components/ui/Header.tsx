"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";

const navigation = [
  { label: "Biografia", href: "/biografia" },
  { label: "Lezioni-Spettacolo", href: "/lezioni-spettacolo" },
  { label: "Libri e Scritti", href: "/libri-e-scritti" },
  { label: "I Corsi", href: "/corsi" },
  { label: "Viaggi Letterari", href: "/viaggi-letterari" },
  { label: "Contatti", href: "/contatti" },
];

function NavigationLinks({ scrolled = false }: { scrolled?: boolean }) {
  return navigation.map(({ label, href }) => (
    <li key={href}>
      <Link
        href={href}
        className={`block px-3 py-2 text-sm font-medium transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue ${
          scrolled
            ? "text-dark-blue hover:text-primary-blue"
            : "text-white hover:text-white/75 focus-visible:outline-white"
        }`}
      >
        {label}
      </Link>
    </li>
  ));
}

function WhatsAppButton() {
  return (
    <a
      href="https://www.whatsapp.com/channel/0029VbB3zeKEQIaujAzFwa1y"
      className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#25D366] px-3 py-2 text-sm font-medium text-white outline-none transition-colors hover:bg-[#1EBE5B] hover:text-white motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M20.52 3.48A11.9 11.9 0 0 0 12.04 0C5.45 0 .09 5.36.09 11.95c0 2.1.55 4.16 1.59 5.97L0 24l6.24-1.64a11.94 11.94 0 0 0 5.8 1.48h.01c6.59 0 11.95-5.36 11.95-11.95 0-3.19-1.24-6.19-3.48-8.41ZM12.05 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.7.97.99-3.6-.23-.37a9.88 9.88 0 0 1-1.52-5.26c0-5.46 4.45-9.91 9.92-9.91a9.86 9.86 0 0 1 7.02 2.91 9.86 9.86 0 0 1 2.9 7.02c0 5.47-4.45 9.92-9.97 9.92Zm5.44-7.43c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.96 1.17-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.53.07-.81.38-.28.3-1.06 1.04-1.06 2.52s1.08 2.92 1.23 3.12c.15.2 2.12 3.23 5.13 4.53.72.31 1.28.5 1.72.64.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.08-.12-.28-.2-.58-.35Z" />
      </svg>
      Canale WhatsApp
    </a>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  const lightText = pathname === "/" && !scrolled;

  useEffect(() => {
    if (menuRef.current) menuRef.current.open = false;
  }, [pathname]);

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 24);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 border-b transition-colors duration-300 motion-reduce:transition-none ${
          scrolled
            ? "border-light-blue bg-white"
            : "border-transparent bg-transparent"
        }`}
      />
      <div className="site-container relative flex h-20 items-center justify-between gap-1 sm:gap-3">
        <Link
          href="/"
          className={`shrink-0 font-display text-[clamp(1rem,5vw,1.5rem)] font-normal transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 ${
            lightText ? "text-white focus-visible:outline-white" : "text-dark-blue focus-visible:outline-primary-blue"
          }`}
        >
          Cesare Catà
        </Link>

        <nav aria-label="Navigazione principale" className="hidden 2xl:block">
          <ul className="flex items-center gap-2">
            <NavigationLinks scrolled={!lightText} />
          </ul>
        </nav>
        <div className="ml-auto flex shrink-0 items-center gap-2 2xl:ml-0">
          <SearchBar scrolled={!lightText} />
          <div className="hidden 2xl:block">
            <WhatsAppButton />
          </div>
        </div>

        <details ref={menuRef} className="shrink-0 2xl:hidden">
          <summary
            aria-label="Menu di navigazione"
            className={`flex h-11 w-11 cursor-pointer list-none items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 [&::-webkit-details-marker]:hidden ${
              lightText ? "text-white focus-visible:outline-white" : "text-dark-blue focus-visible:outline-primary-blue"
            }`}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </summary>
          <nav
            aria-label="Navigazione principale"
            className="absolute inset-x-0 top-full max-h-[calc(100vh-5rem)] overflow-y-auto border-b border-light-blue bg-[#f3f8fb] p-4"
            onClick={(event) => {
              if (event.target instanceof Element && event.target.closest("a")) {
                if (menuRef.current) menuRef.current.open = false;
              }
            }}
          >
            <ul className="space-y-2">
              <NavigationLinks scrolled />
            </ul>
            <div className="mt-4">
              <WhatsAppButton />
            </div>
          </nav>
        </details>
      </div>
    </header>
  );
}
