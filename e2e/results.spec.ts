import { expect, test } from "@playwright/test";
import { boxes, expectEqualHeightsPerRow, expectNoHorizontalScroll, isDesktop, rowSizes } from "./helpers";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Resultados is the last section of the home, right above the footer", async ({ page }) => {
  const sections = page.locator("#contenido section");
  await expect(sections.last()).toHaveAttribute("id", "resultados");
  await expect(page.locator("#resultados h2")).toHaveText("No vendemos promesas. Entregamos resultados.");
});

test("one card per authorized site, in the agreed order, each with the same four parts", async ({ page }) => {
  const cards = page.locator("#resultados [data-result]");
  await expect(cards).toHaveCount(2);
  expect(await cards.evaluateAll((nodes) => nodes.map((node) => node.getAttribute("data-result")))).toEqual(["foodies", "carbono-zero"]);

  for (const slug of ["foodies", "carbono-zero"]) {
    const card = page.locator(`#resultados [data-result="${slug}"]`);
    await expect(card.getByRole("heading", { level: 3 })).toBeVisible();
    await expect(card.locator("small")).toBeVisible();
    await expect(card.getByRole("link", { name: /Visitar sitio/ })).toBeVisible();
    expect((await card.locator("p").allInnerTexts()).filter(Boolean)).toHaveLength(2);
  }
});

test("no client is named or linked before the owner authorizes it", async ({ page }) => {
  const section = page.locator("#resultados");
  for (const name of ["Clínica Dib", "Bahamonde", "Delanoe", "Consultora jurídica", "clinicadib.cl"]) {
    await expect(section.getByText(name)).toHaveCount(0);
  }
  await expect(section.locator('a[href*="clinicadib"]')).toHaveCount(0);
});

test("each Visitar sitio button points at the real site, in a new tab, safely", async ({ page }) => {
  const expected: Record<string, string> = {
    foodies: "https://foodies.mundacasolutions.com",
    "carbono-zero": "https://carbonozero.mundacasolutions.com",
  };
  for (const [slug, url] of Object.entries(expected)) {
    const link = page.locator(`#resultados [data-result="${slug}"]`).getByRole("link", { name: /Visitar sitio/ });
    await expect(link).toHaveAttribute("href", url);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /noopener/);
    await expect(link).toHaveAttribute("rel", /noreferrer/);
  }
});

test("cards share a row and have the same height; stacked on phones", async ({ page }, info) => {
  const cards = await boxes(page, "#resultados [data-result]");
  expect(cards).toHaveLength(2);
  expect(rowSizes(cards)).toEqual(isDesktop(info) ? [2] : [1, 1]);
  expectEqualHeightsPerRow(cards);
});

test("the buttons sit at the bottom of equal-height cards", async ({ page }, info) => {
  test.skip(!isDesktop(info), "side by side on desktop");
  const buttons = await boxes(page, "#resultados [data-result] a");
  expect(Math.abs(buttons[0]!.bottom - buttons[1]!.bottom)).toBeLessThanOrEqual(1);
});

test("the page has no horizontal scroll with the new section", async ({ page }) => {
  await page.locator("#resultados").scrollIntoViewIfNeeded();
  await expectNoHorizontalScroll(page);
});
