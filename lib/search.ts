type Searchable = {
  title: string;
  description: string;
};

export function searchItems<T extends Searchable>(items: T[], query: string): T[] {
  const term = query.trim().toLocaleLowerCase("it");
  if (!term) return [];

  return items.filter(({ title, description }) =>
    title.toLocaleLowerCase("it").includes(term) ||
    description.toLocaleLowerCase("it").includes(term),
  );
}
