export const BOOKS_PER_COLUMN = 2;

export function getBookCarouselPageCount(bookCount: number, visibleColumns: number) {
  const columnCount = Math.ceil(bookCount / BOOKS_PER_COLUMN);
  return Math.max(1, columnCount - Math.max(1, visibleColumns) + 1);
}
