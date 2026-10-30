import { describe, expect, it } from "vitest";
import { resultCards, resultColumns, resultsSection, visibleResults } from "@/content/results";

describe("Resultados: what is allowed on the page", () => {
  it("lists only client systems: the own products already have their section and their pages", () => {
    expect(resultCards.map((card) => card.slug)).toEqual(["clinica-dib", "bahamonde", "delanoe-motos", "consultora-juridica"]);
  });

  it("draws nothing until the owner authorizes a client (the whole section is then omitted)", () => {
    expect(visibleResults).toEqual([]);
    for (const card of resultCards) {
      expect(card.authorized, card.slug + " must stay hidden until the owner says so").toBe(false);
    }
  });

  it("never draws a card without a confirmed URL, even if it were authorized", () => {
    for (const card of visibleResults) expect(card.url).toMatch(/^https:\/\/[a-z0-9.-]+\/?$/);
    const authorizedWithoutUrl = resultCards.filter((card) => card.authorized && card.url === null);
    expect(authorizedWithoutUrl.map((card) => card.slug)).toEqual([]);
  });

  it("publishes no metric and no screenshot until a client provides one", () => {
    for (const card of resultCards) {
      expect(card.metric, card.slug).toBeNull();
      expect(card.image, card.slug).toBeNull();
    }
    const text = JSON.stringify(resultCards.map((card) => [card.rubro, card.solved]));
    expect(text).not.toMatch(/\d/);
    expect(text).not.toMatch(/%/);
  });

  it("describes each site with one short sentence", () => {
    for (const card of resultCards) {
      expect(card.solved.length, card.slug).toBeGreaterThan(30);
      expect(card.solved.length, card.slug).toBeLessThanOrEqual(170);
      expect(card.solved.match(/[.!?]/g)?.length, card.slug + " must be one sentence").toBe(1);
    }
  });

  it("keeps the headline and the visit label", () => {
    expect(resultsSection.title + " " + resultsSection.emphasis).toBe("No vendemos promesas. Entregamos resultados.");
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
