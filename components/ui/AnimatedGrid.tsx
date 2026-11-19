"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function AnimatedGrid({ page, children }: { page: number; children: ReactNode }) {
  const previousPage = useRef(page);

  useEffect(() => {
    if (previousPage.current !== page) {
      previousPage.current = page;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.getElementById("griglia-spettacoli")?.scrollIntoView({
        behavior: reducedMotion ? "instant" : "smooth",
      });
    }
  }, [page]);

  return <div id="griglia-spettacoli" className="scroll-mt-24">{children}</div>;
}
