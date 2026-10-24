import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  aiLayers,
  cafetal,
  hero,
  methodSteps,
  principle,
  problems,
  solutionCards,
  tickerMessages,
} from "@/content/home";
import { privacy, terms } from "@/content/legal";
import { productBySlug, products, productSlugs } from "@/content/products";
import { navItems } from "@/content/site";
import { solutionBySlug, solutionNav, solutions } from "@/content/solutions";

const publicFile = (src: string) => existsSync(join(process.cwd(), "public", src));

describe("content integrity", () => {
  it("keeps the home H1 text exactly as published", () => {
    expect(`${hero.titleStart}${hero.titleEmphasis}`).toBe(
      "Convertimos operaciones complejas en sistemas para operar y decidir mejor.",
    );
  });

  it("lists Foodies first and Carbono Zero second, with the production URLs", () => {
    expect(productSlugs).toEqual(["foodies", "carbono-zero"]);
    expect(productBySlug("foodies")?.externalUrl).toBe("https://foodies.mundacasolutions.com");
    expect(productBySlug("carbono-zero")?.externalUrl).toBe("https://carbonozero.mundacasolutions.com");
    expect(productBySlug("otro")).toBeUndefined();
  });

  it("points every product logo at a file that exists in /public", () => {
    for (const product of products) expect(publicFile(product.logo.src), product.logo.src).toBe(true);
  });

  it("links all three solutions from the navigation menu", () => {
    const menu = navItems.find((item) => item.children);
    expect(menu?.label).toBe("Soluciones");
    expect(solutionNav.map((child) => child.href)).toEqual(solutions.map((solution) => `/soluciones/${solution.slug}`));
    expect(menu?.children).toHaveLength(3);
  });

  it("uses root-relative anchors so they work from inner pages", () => {
    for (const item of navItems) expect(item.href.startsWith("/"), item.href).toBe(true);
  });

  it("maps every solution card and problem index to something that exists", () => {
    for (const card of solutionCards) expect(solutionBySlug(card.slug), card.slug).toBeDefined();
    for (const solution of solutions) {
      for (const index of solution.problemIndexes) expect(problems[index], `${solution.slug}:${index}`).toBeDefined();
    }
  });

  it("has an even number of principle steps so the grid is 4 + 4", () => {
    expect(principle.steps).toHaveLength(8);
  });

  it("has four AI layers, structure first and intelligence last", () => {
    expect(aiLayers.layers.map((layer) => layer.title)).toEqual(["Procesos", "Datos", "Reglas", "Inteligencia artificial"]);
  });

  it("has a paired set of problems (4), method steps (4) and cafetal stages (3)", () => {
    expect(problems).toHaveLength(4);
    expect(methodSteps).toHaveLength(4);
    expect(cafetal.stages).toHaveLength(3);
  });

  it("has ticker messages without duplicates", () => {
    expect(new Set(tickerMessages).size).toBe(tickerMessages.length);
  });

  it("keeps legal texts complete and routes unchanged", () => {
    expect(privacy.path).toBe("/privacidad");
    expect(terms.path).toBe("/terminos");
    expect(privacy.sections).toHaveLength(7);
    expect(terms.sections).toHaveLength(6);
  });

  it("never leaves a raw HTML entity in published copy (the old meta descriptions had &apos;)", () => {
    const texts = [
      ...products.flatMap((product) => [product.hub.metaDescription, product.hub.eyebrow, product.hub.lead]),
      ...solutions.flatMap((solution) => [solution.metaDescription, solution.lead]),
    ];
    for (const text of texts) expect(text).not.toMatch(/&\w+;/);
  });
});
