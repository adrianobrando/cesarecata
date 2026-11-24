export function splitShowDescription(description: string) {
  const [first, ...rest] = description.split(/\n\s*\n/);
  return rest.length > 0
    ? { subtitle: first, body: rest.join("\n\n") }
    : { subtitle: null, body: first };
}
