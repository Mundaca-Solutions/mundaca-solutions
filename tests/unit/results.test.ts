import { describe, expect, it } from "vitest";
import { products } from "@/content/products";
import { resultCards, resultColumns, resultsSection, visibleResults } from "@/content/results";

describe("Resultados: what is allowed on the page", () => {
  it("lists the six sites in the agreed order: Foodies, Carbono Zero, then the clients", () => {
    expect(resultCards.map((card) => card.slug)).toEqual([
      "foodies",
      "carbono-zero",
      "clinica-dib",
      "bahamonde",
      "delanoe-motos",
      "consultora-juridica",
    ]);
    expect(resultCards.map((card) => card.kind)).toEqual(["product", "product", "client", "client", "client", "client"]);
  });

  it("only draws the own products until the owner authorizes each client", () => {
    expect(visibleResults.map((card) => card.slug)).toEqual(["foodies", "carbono-zero"]);
    for (const card of resultCards.filter((candidate) => candidate.kind === "client")) {
      expect(card.authorized, `${card.slug} must stay hidden until the owner says so`).toBe(false);
    }
  });

  it("never draws a card without a confirmed URL, even if it were authorized", () => {
    for (const card of visibleResults) expect(card.url).toMatch(/^https:\/\/[a-z0-9.-]+\/?$/);
    const authorizedWithoutUrl = resultCards.filter((card) => card.authorized && card.url === null && card.kind === "client");
    expect(authorizedWithoutUrl.map((card) => card.slug)).toEqual([]);
  });

  it("points the own products at their production sites (the same URLs as the products catalogue)", () => {
    for (const slug of ["foodies", "carbono-zero"] as const) {
      const product = products.find((candidate) => candidate.slug === slug);
      expect(resultCards.find((card) => card.slug === slug)?.url).toBe(product?.externalUrl);
    }
    expect(resultCards.find((card) => card.slug === "foodies")?.url).toBe("https://foodies.mundacasolutions.com");
    expect(resultCards.find((card) => card.slug === "carbono-zero")?.url).toBe("https://carbonozero.mundacasolutions.com");
  });

  it("publishes no metric: a figure only appears once a client confirms it", () => {
    for (const card of resultCards) expect(card.metric).toBeNull();
    const text = JSON.stringify(resultCards.map((card) => [card.rubro, card.solved]));
    expect(text).not.toMatch(/\d/);
    expect(text).not.toMatch(/%/);
  });

  it("describes each site with one short sentence", () => {
    for (const card of resultCards) {
      expect(card.solved.length, card.slug).toBeGreaterThan(30);
      expect(card.solved.length, card.slug).toBeLessThanOrEqual(170);
      expect(card.solved.match(/[.!?]/g)?.length, `${card.slug} must be one sentence`).toBe(1);
    }
  });

  it("keeps the headline and the visit label", () => {
    expect(`${resultsSection.title} ${resultsSection.emphasis}`).toBe("No vendemos promesas. Entregamos resultados.");
    expect(resultsSection.visitLabel).toBe("Visitar sitio");
  });
});

describe("resultColumns keeps the grid paired", () => {
  it.each([
    [1, 1, 1],
    [2, 2, 2],
    [3, 3, 1],
    [4, 2, 2],
    [5, 2, 1],
    [6, 3, 2],
  ])("%i cards → %i columns on desktop, %i on tablets", (count, desktop, tablet) => {
    expect(resultColumns(count)).toEqual({ desktop, tablet });
  });
});
