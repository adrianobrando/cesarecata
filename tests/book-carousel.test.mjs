import assert from "node:assert/strict";
import test from "node:test";
import { getBookCarouselPageCount } from "../lib/book-carousel.ts";

test("calcola le pagine del carosello in base alle colonne visibili", () => {
  assert.equal(getBookCarouselPageCount(6, 2), 2);
  assert.equal(getBookCarouselPageCount(6, 1), 3);
  assert.equal(getBookCarouselPageCount(4, 2), 1);
  assert.equal(getBookCarouselPageCount(0, 2), 1);
});
