const romeMonthFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Rome",
  year: "numeric",
  month: "2-digit",
});

const romeOffsetFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/Rome",
  timeZoneName: "longOffset",
});

const monthTitleFormatter = new Intl.DateTimeFormat("it-IT", {
  timeZone: "UTC",
  month: "long",
  year: "numeric",
});

export function monthKey(date: Date): string {
  const parts = romeMonthFormatter.formatToParts(date);
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  if (!year || !month) throw new RangeError("Impossibile determinare il mese.");
  return `${year.padStart(4, "0")}-${month}`;
}

export function isCalendarMonth(value: unknown): value is string {
  return typeof value === "string" && /^(?:19\d{2}|[2-9]\d{3})-(?:0[1-9]|1[0-2])$/.test(value) && value <= "9998-12";
}

export function shiftMonth(month: string, offset: number): string {
  const [year, number] = month.split("-").map(Number);
  const shifted = new Date(Date.UTC(year, number - 1 + offset, 1));
  return `${shifted.getUTCFullYear().toString().padStart(4, "0")}-${(shifted.getUTCMonth() + 1).toString().padStart(2, "0")}`;
}

export function formatMonth(month: string): string {
  const [year, number] = month.split("-").map(Number);
  const title = monthTitleFormatter.format(new Date(Date.UTC(year, number - 1, 1)));
  return title.charAt(0).toLocaleUpperCase("it-IT") + title.slice(1);
}

export function monthStartUtc(month: string): string {
  const [year, number] = month.split("-").map(Number);
  const midnight = new Date(Date.UTC(year, number - 1, 1));
  const offset = romeOffsetFormatter.formatToParts(midnight).find((part) => part.type === "timeZoneName")?.value;
  const match = offset?.match(/^GMT([+-])(\d{2}):(\d{2})$/);
  if (!match) throw new RangeError("Impossibile determinare il fuso orario italiano.");
  const minutes = (Number(match[2]) * 60 + Number(match[3])) * (match[1] === "+" ? 1 : -1);
  return new Date(midnight.getTime() - minutes * 60_000).toISOString();
}
