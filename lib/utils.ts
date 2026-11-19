const dateFormatter = new Intl.DateTimeFormat("it-IT", {
  timeZone: "Europe/Rome",
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("it-IT", {
  timeZone: "Europe/Rome",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export function formatDate(dateString: string): string {
  if (!/[Tt ].*(?:[zZ]|[+-]\d{2}:\d{2})$/.test(dateString)) {
    throw new RangeError("La data deve includere un fuso orario.");
  }

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    throw new RangeError("Data non valida.");
  }

  const formattedDate = dateFormatter.format(date).replace(/\p{L}+/gu, (word) =>
    word.charAt(0).toLocaleUpperCase("it-IT").concat(word.slice(1)),
  );

  return `${formattedDate} - ore ${timeFormatter.format(date)}`;
}

export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{M}+/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
