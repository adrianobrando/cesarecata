"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Libro } from "@/data/libri";
import { BOOKS_PER_COLUMN, getBookCarouselPageCount } from "@/lib/book-carousel";
import Button from "./Button";
import ExpandableText from "./ExpandableText";

export default function BooksCarousel({ books }: { books: Libro[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const bookRefs = useRef<Array<HTMLLIElement | null>>([]);
  const visibleColumnsRef = useRef(1);
  const [visibleColumns, setVisibleColumns] = useState(1);
  const [activePage, setActivePage] = useState(0);
  const pageCount = getBookCarouselPageCount(books.length, visibleColumns);

  useEffect(() => {
    const viewport = viewportRef.current;
    const firstBook = bookRefs.current[0];
    const grid = viewport?.firstElementChild;
    if (!viewport || !firstBook || !(grid instanceof HTMLElement)) return;

    const updateVisibleColumns = () => {
      const gap = Number.parseFloat(window.getComputedStyle(grid).columnGap) || 0;
      const columns = Math.max(
        1,
        Math.round((viewport.clientWidth + gap) / (firstBook.clientWidth + gap)),
      );

      if (columns !== visibleColumnsRef.current) {
        visibleColumnsRef.current = columns;
        setVisibleColumns(columns);
        setActivePage(0);
        viewport.scrollLeft = 0;
      }
    };

    const observer = new ResizeObserver(updateVisibleColumns);
    observer.observe(viewport);
    updateVisibleColumns();
    return () => observer.disconnect();
  }, [books.length]);

  function goToPage(pageIndex: number) {
    const viewport = viewportRef.current;
    const firstBookInColumn = bookRefs.current[pageIndex * BOOKS_PER_COLUMN];
    if (!viewport || !firstBookInColumn) return;

    const left =
      firstBookInColumn.getBoundingClientRect().left -
      viewport.getBoundingClientRect().left +
      viewport.scrollLeft;
    setActivePage(pageIndex);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    viewport.scrollTo({ left, behavior: reducedMotion ? "instant" : "smooth" });
  }

  function updateActivePage() {
    const viewport = viewportRef.current;
    const firstBook = bookRefs.current[0];
    const nextColumn = bookRefs.current[BOOKS_PER_COLUMN];
    const grid = viewport?.firstElementChild;
    if (!viewport || !firstBook || !(grid instanceof HTMLElement)) return;

    const gap = Number.parseFloat(window.getComputedStyle(grid).columnGap) || 0;
    const step = nextColumn
      ? nextColumn.getBoundingClientRect().left - firstBook.getBoundingClientRect().left
      : firstBook.clientWidth + gap;
    const pageIndex = Math.min(pageCount - 1, Math.round(viewport.scrollLeft / step));
    setActivePage((current) => (current === pageIndex ? current : pageIndex));
  }

  return (
    <section aria-label="Libri pubblicati">
      <div
        ref={viewportRef}
        role="region"
        aria-label="Griglia dei libri, scorri orizzontalmente per consultare i titoli"
        tabIndex={0}
        onScroll={updateActivePage}
        className="overflow-x-auto scroll-smooth motion-reduce:scroll-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <ul className="grid w-full auto-cols-[100%] grid-flow-col grid-rows-2 gap-6 md:auto-cols-[calc((100%_-_1.5rem)_/_2)]">
          {books.map((libro, index) => (
            <li
              key={libro.id}
              ref={(node) => {
                bookRefs.current[index] = node;
              }}
              id={libro.id}
              className="scroll-mt-24"
            >
              <article className="relative flex h-full flex-col items-center gap-3 overflow-hidden bg-white p-3 sm:gap-4 sm:p-4 md:flex-row md:items-stretch">
                <div className="relative aspect-[2/3] w-[44%] max-w-[190px] shrink-0 overflow-hidden rounded-md bg-light-blue md:w-[38%] md:max-w-none md:self-start">
                  <Image
                    src={libro.image}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 210px, (min-width: 768px) 19vw, (min-width: 640px) 38vw, 34vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex w-full min-w-0 flex-1 flex-col items-start justify-center md:w-auto">
                  <h2 className="font-display text-lg font-normal leading-tight text-dark-blue">
                    {libro.title}
                  </h2>
                  <p className="mt-2 text-sm font-medium text-slate-600">
                    {libro.editor} · {libro.year}
                  </p>
                  <div className="mt-2 w-full">
                    <ExpandableText text={libro.description} />
                  </div>
                  <Button
                    href={libro.href}
                    target={libro.href === "#" ? undefined : "_blank"}
                    rel={libro.href === "#" ? undefined : "noopener noreferrer"}
                    className="mt-2 px-4 py-2 text-sm"
                  >
                    Acquista<span className="sr-only">: {libro.title}</span>
                  </Button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
      {pageCount > 1 && (
        <nav aria-label="Paginazione libri" className="mt-8 flex justify-center">
          <ul className="flex flex-wrap items-center justify-center gap-2">
            {Array.from({ length: pageCount }, (_, index) => (
              <li key={index + 1}>
                <button
                  type="button"
                  aria-label={`Vai alla pagina ${index + 1}`}
                  aria-current={activePage === index ? "page" : undefined}
                  onClick={() => goToPage(index)}
                  className={`min-h-11 min-w-11 rounded-full border px-3 py-2 text-sm font-semibold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue ${
                    activePage === index
                      ? "border-primary-blue bg-primary-blue text-white"
                      : "border-light-blue bg-white text-dark-blue hover:bg-light-blue"
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </section>
  );
}
