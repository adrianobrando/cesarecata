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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeSearch();
          }}
        >
          <section
            data-search-dialog
            role="dialog"
            aria-modal="true"
            aria-label="Cerca nel sito"
            className="relative flex w-full max-w-2xl items-center rounded-2xl border-0 bg-white px-5 py-4 shadow-2xl"
          >
            <button
              type="button"
              aria-label="Chiudi la ricerca"
              onClick={closeSearch}
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full text-slate-500 hover:text-dark-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
            <form role="search" onSubmit={handleSubmit} className="flex w-full items-center gap-3 pr-12">
              <label htmlFor={inputId} className="sr-only">Cerca nel sito</label>
              <button
                type="submit"
                aria-label="Avvia ricerca"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-slate-400 hover:text-dark-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m16 16 4 4" />
                </svg>
              </button>
              <input
                ref={inputRef}
                id={inputId}
                name="q"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Cerca spettacoli, libri, corsi..."
                className="min-w-0 w-full flex-1 border-none bg-transparent py-3 text-xl text-dark-blue outline-none placeholder:text-slate-400 focus:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
              />
            </form>
          </section>
        </div>
      )}
    </>
  );
}
