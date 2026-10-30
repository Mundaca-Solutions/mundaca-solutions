import { expect, test } from "@playwright/test";
import { expectNoHorizontalScroll, ROUTES } from "./helpers";

test("Resultados is omitted while no client is authorized: the home ends with the contact section", async ({ page }) => {
  await page.goto("/");
  const sections = page.locator("#contenido section");
  await expect(sections.last()).toHaveAttribute("id", "contacto");
  await expect(page.locator("#resultados")).toHaveCount(0);
});

test("the own products are not repeated as results", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("[data-result]")).toHaveCount(0);
  await expect(page.getByText("Entregamos resultados")).toHaveCount(0);
});

test("no client is named or linked before the owner authorizes it", async ({ page }) => {
  await page.goto("/");
  const main = page.locator("#contenido");
  for (const name of ["Clínica Dib", "Bahamonde", "Delanoe", "Consultora jurídica", "clinicadib.cl"]) {
    await expect(main.getByText(name)).toHaveCount(0);
  }
  await expect(main.locator('a[href*="clinicadib"]')).toHaveCount(0);
});

test("Cafetal is mentioned nowhere on the site (no closed contract)", async ({ page }) => {
  for (const route of ROUTES) {
    await page.goto(route);
    const html = await page.content();
    expect(html, route).not.toMatch(/cafetal/i);
  }
});

test("the home has no horizontal scroll", async ({ page }) => {
  await page.goto("/");
  await expectNoHorizontalScroll(page);
});
