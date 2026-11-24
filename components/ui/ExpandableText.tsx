"use client";

import { useId, useState } from "react";

type ExpandableTextProps = {
  text: string;
  maxLength?: number;
};

export default function ExpandableText({ text, maxLength = 200 }: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);
  const textId = useId();
  const characters = Array.from(text);
  const isLong = characters.length > maxLength;

  return (
    <div>
      <p
        id={textId}
        title={text}
        className={`whitespace-pre-line text-sm text-slate-600 ${expanded ? "" : "line-clamp-2"}`}
      >
        {isLong && !expanded ? `${characters.slice(0, maxLength).join("")}...` : text}
      </p>
      {isLong && (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={textId}
          onClick={() => setExpanded(!expanded)}
          className="mt-2 min-h-11 rounded font-semibold text-primary-blue hover:text-dark-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
        >
          {expanded ? "Mostra meno" : "Leggi di più"}
        </button>
      )}
    </div>
  );
}
