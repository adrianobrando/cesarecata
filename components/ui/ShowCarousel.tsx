"use client";

import { useRef, type ReactNode } from "react";

export default function ShowCarousel({ children }: { children: ReactNode }) {
  const viewportRef = useRef<HTMLDivElement>(null);

  function scrollPage(direction: -1 | 1) {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const styles = window.getComputedStyle(viewport);
    const list = viewport.firstElementChild;
    const gap = list ? Number.parseFloat(window.getComputedStyle(list).columnGap) : 0;
    const width = viewport.clientWidth - Number.parseFloat(styles.paddingLeft) - Number.parseFloat(styles.paddingRight);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    viewport.scrollBy({
      left: direction * (width + gap),
      behavior: reducedMotion ? "instant" : "smooth",
    });
  }

  return (
    <div className="animated-grid">
      <nav aria-label="Navigazione spettacoli" className="hidden justify-end gap-3 lg:flex">
        <button
          type="button"
          aria-label="Spettacoli precedenti"
          aria-controls="carosello-spettacoli"
          onClick={() => scrollPage(-1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-blue bg-white text-2xl text-primary-blue hover:bg-light-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          aria-label="Spettacoli successivi"
          aria-controls="carosello-spettacoli"
          onClick={() => scrollPage(1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-blue bg-white text-2xl text-primary-blue hover:bg-light-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
        >
          <span aria-hidden="true">→</span>
        </button>
      </nav>
      <div
        id="carosello-spettacoli"
        ref={viewportRef}
        role="region"
        aria-label="Spettacoli, scorri orizzontalmente per consultare i titoli"
        tabIndex={0}
        className="snap-x snap-mandatory scroll-px-6 overflow-x-auto scroll-smooth px-6 py-8 motion-reduce:scroll-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
      >
        {children}
      </div>
    </div>
  );
}
