import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { isDesktop, ROUTES } from "./helpers";

/** WCAG A and AA (2.0, 2.1 and 2.2) — the contract of docs/ART_DIRECTION_GUIDE.md. */
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

async function scan(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();
  const summary = results.violations.map(
    (violation) => `${violation.id} (${violation.impact}): ${violation.nodes.map((node) => node.target.join(" ")).join(" | ")}`,
  );
  expect(summary, summary.join("\n")).toEqual([]);
}

for (const route of ROUTES) {
  test(`${route}: axe finds no WCAG A/AA violations`, async ({ page }) => {
    await page.goto(route);
    await page.waitForLoadState("networkidle");
    await scan(page);
  });
}

test("desktop: axe with the Soluciones menu open", async ({ page }, info) => {
  test.skip(!isDesktop(info), "desktop navigation");
  await page.goto("/");
  await page.getByRole("button", { name: "Soluciones" }).click();
  await scan(page);
});

test("mobile: axe with the drawer open", async ({ page }, info) => {
  test.skip(isDesktop(info), "mobile navigation");
  await page.goto("/");
  await page.getByRole("button", { name: "Abrir menú" }).click();
  await scan(page);
});

test("axe with the contact form showing its error and success states", async ({ page }) => {
  await page.route("**/api/contact", (route) => route.fulfill({ status: 200, json: { ok: true } }));
  await page.goto("/contacto");
  await page.getByRole("button", { name: "Solicitar evaluación" }).click();
  await expect(page.locator("form").getByRole("alert")).toBeVisible();
  await scan(page);
});

test("the 404 page is accessible too", async ({ page }) => {
  const response = await page.goto("/esta-ruta-no-existe");
  expect(response?.status()).toBe(404);
  await scan(page);
});
