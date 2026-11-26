import Button from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import type { Event } from "@/types/database";

type EventDetails = Pick<Event, "event_date" | "location" | "entry_type" | "ticket_link">;

function CalendarIcon({ compact }: { compact: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`${compact ? "h-4 w-4" : "h-5 w-5"} shrink-0`}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M7 3v4M17 3v4M3 10h18" />
    </svg>
  );
}

function LocationIcon({ compact }: { compact: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`${compact ? "h-4 w-4" : "h-5 w-5"} shrink-0`}>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function TicketIcon({ compact }: { compact: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`${compact ? "h-4 w-4" : "h-5 w-5"} shrink-0`}>
      <path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4V7Z" />
      <path d="M13 5v2m0 3v4m0 3v2" />
    </svg>
  );
}

export function EventDateLocation({
  event,
  compact = false,
}: {
  event: Pick<EventDetails, "event_date" | "location">;
  compact?: boolean;
}) {
  return (
    <div className={`flex flex-wrap gap-x-5 gap-y-2 ${compact ? "text-xs sm:text-sm lg:flex-col lg:items-start lg:gap-2" : "text-sm"} font-semibold text-primary-blue`}>
      <span className="inline-flex items-center gap-2">
        <CalendarIcon compact={compact} />
        <time dateTime={event.event_date}>{formatDate(event.event_date)}</time>
      </span>
      {event.location && (
        <span className="inline-flex items-center gap-2">
          <LocationIcon compact={compact} />
          {event.location}
        </span>
      )}
    </div>
  );
}

export function EventEntry({
  event,
  compact = false,
}: {
  event: Pick<EventDetails, "entry_type" | "ticket_link">;
  compact?: boolean;
}) {
  if (event.entry_type === "libero") {
    return (
      <span className={`inline-flex items-center gap-2 rounded-full bg-green-100 font-semibold text-green-800 ${compact ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"}`}>
        <TicketIcon compact={compact} /> Ingresso Libero
      </span>
    );
  }

  if (event.ticket_link) {
    return (
      <Button href={event.ticket_link} className={compact ? "gap-2 px-4 py-2 text-sm" : "gap-2"}>
        <TicketIcon compact={compact} /> Acquista Biglietti
      </Button>
    );
  }

  return (
    <span className={`inline-flex items-center gap-2 rounded-full bg-light-blue font-semibold text-primary-blue ${compact ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"}`}>
      <TicketIcon compact={compact} /> Ingresso a pagamento
    </span>
  );
}
