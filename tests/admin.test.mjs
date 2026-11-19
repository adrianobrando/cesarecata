import assert from "node:assert/strict";
import test from "node:test";
import { createAdminToken, passwordMatches, SESSION_SECONDS, verifyAdminToken } from "../lib/admin-auth.ts";
import { parseEventInput } from "../lib/event-input.ts";
import { spettacoli } from "../data/spettacoli.ts";

test("admin sessions expire and reject tampering or password rotation", async () => {
  const now = 1_700_000_000_000;
  const token = await createAdminToken("strong-password", now);
  assert.equal(await verifyAdminToken(token, "strong-password", now), true);
  assert.equal(await verifyAdminToken(token, "other-password", now), false);
  assert.equal(await verifyAdminToken(`${token}0`, "strong-password", now), false);
  assert.equal(await verifyAdminToken(token, "strong-password", now + SESSION_SECONDS * 1000), false);
  assert.equal(await verifyAdminToken(undefined, "strong-password", now), false);
  assert.equal(await passwordMatches("wrong", "strong-password"), false);
  assert.equal(await passwordMatches("strong-password", "strong-password"), true);
});

test("event input validates fields and clears prevendita for free events", () => {
  const event = {
    event_date: "2026-12-01T20:30:00+01:00",
    title: " Titolo ",
    subtitle: "Sottotitolo",
    image_url: null,
    performers: "",
    entry_type: "libero",
    ticket_link: "https://example.com",
    show_reference: "labirinto",
  };
  assert.deepEqual(parseEventInput(event), {
    ...event,
    event_date: "2026-12-01T19:30:00.000Z",
    title: "Titolo",
    performers: null,
    ticket_link: null,
  });
  assert.equal(parseEventInput({ ...event, event_date: "2026-12-01T20:30" }), null);
  assert.equal(parseEventInput({ ...event, title: " " }), null);
  assert.equal(parseEventInput({ ...event, show_reference: "Altro Show!" }), null);
  for (const show of spettacoli) {
    assert.equal(parseEventInput({ ...event, show_reference: show.id })?.show_reference, show.id);
    if (show.legacy_ref) {
      assert.equal(parseEventInput({ ...event, show_reference: show.legacy_ref })?.show_reference, show.legacy_ref);
    }
  }
  assert.equal(parseEventInput({ ...event, image_url: "javascript:alert(1)" }), null);
});

test("event input accepts an optional nullable location and rejects other types", () => {
  const event = {
    event_date: "2026-12-01T20:30:00+01:00",
    title: "Titolo",
    subtitle: "Sottotitolo",
    image_url: null,
    performers: null,
    entry_type: "libero",
    ticket_link: null,
    show_reference: "labirinto",
  };
  assert.equal(Object.hasOwn(parseEventInput(event), "location"), false);
  assert.equal(parseEventInput({ ...event, location: null })?.location, null);
  assert.equal(parseEventInput({ ...event, location: "  Teatro comunale  " })?.location, "Teatro comunale");
  assert.equal(parseEventInput({ ...event, location: "  " })?.location, null);
  assert.equal(parseEventInput({ ...event, location: 42 }), null);
  assert.equal(parseEventInput({ ...event, location: {} }), null);
});
