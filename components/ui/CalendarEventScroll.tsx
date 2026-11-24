"use client";

import { useEffect } from "react";

export default function CalendarEventScroll() {
  useEffect(() => {
    function scrollToEvent() {
      const hash = window.location.hash.slice(1);
      if (!hash.startsWith("evento-")) return;
      const target = Array.from(document.querySelectorAll<HTMLElement>("[id^='evento-']"))
        .find((element) => encodeURIComponent(element.id) === hash);
      target?.scrollIntoView();
    }

    scrollToEvent();
    window.addEventListener("hashchange", scrollToEvent);
    return () => window.removeEventListener("hashchange", scrollToEvent);
  }, []);

  return null;
}
