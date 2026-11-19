"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";

export default function SearchBar({ scrolled = false }: { scrolled?: boolean }) {
  const router = useRouter();
  const inputId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const searchQuery = query.trim();
    setIsOpen(false);
    router.push(searchQuery ? `/cerca?${new URLSearchParams({ q: searchQuery })}` : "/cerca");
  }

  function closeSearch() {
    setIsOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeSearch();
      } else if (event.key === "Tab") {
        const focusable = document.querySelectorAll<HTMLElement>(
          '[data-search-dialog] button, [data-search-dialog] input',
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label="Apri la ricerca"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue ${
          scrolled
            ? "text-dark-blue hover:bg-light-blue"
            : "text-white hover:bg-white/15 focus-visible:outline-white"
        }`}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
          <circle cx="11" cy="11" r="7" />
          <path d="m16 16 4 4" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-slate-950/75 px-5 pt-[18vh] backdrop-blur-md"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeSearch();
          }}
        >
          <section
            data-search-dialog
            role="dialog"
            aria-modal="true"
            aria-label="Cerca nel sito"
            className="w-full max-w-3xl rounded-2xl bg-slate-900/65 p-5 shadow-2xl sm:p-8"
          >
            <form role="search" onSubmit={handleSubmit} className="flex items-center gap-4">
              <label htmlFor={inputId} className="sr-only">Cerca nel sito</label>
              <input
                ref={inputRef}
                id={inputId}
                name="q"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Cerca spettacoli, libri, corsi..."
                className="min-w-0 flex-1 bg-transparent py-3 text-lg text-white outline-none placeholder:text-white/70 sm:text-2xl"
              />
              <button
                type="submit"
                aria-label="Avvia ricerca"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m16 16 4 4" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Chiudi la ricerca"
                onClick={closeSearch}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white/75 hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path d="m6 6 12 12M18 6 6 18" />
                </svg>
              </button>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
