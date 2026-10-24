import { expect, test } from "@playwright/test";
import { isDesktop, ROUTES } from "./helpers";

test("the home links all three solutions", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("#soluciones");
  for (const [slug, label] of [
    ["software-a-medida", "Software a medida"],
    ["automatizacion-procesos", "Automatización de procesos"],
    ["inteligencia-operacional", "Inteligencia operacional"],
  ] as const) {
    await expect(section.getByRole("link", { name: label }), slug).toHaveAttribute("href", `/soluciones/${slug}`);
  }
});

test("the three solution pages are reachable from the home and answer 200", async ({ page }) => {
  for (const slug of ["software-a-medida", "automatizacion-procesos", "inteligencia-operacional"]) {
    await page.goto("/");
    await page.locator("#soluciones").locator(`a[href="/soluciones/${slug}"]`).first().click();
    await expect(page).toHaveURL(new RegExp(`/soluciones/${slug}$`));
    await expect(page.locator("h1")).toBeVisible();
  }
});

test("anchors work from inner pages: Caso Cafetal and Cómo trabajamos return to the home section", async ({ page }, info) => {
  test.skip(!isDesktop(info), "header nav is desktop; the footer covers mobile");
  await page.goto("/contacto");
  await page.locator("header nav").getByRole("link", { name: "Caso Cafetal" }).click();
  await expect(page).toHaveURL(/\/#cafetal$/);
  await expect(page.locator("#cafetal")).toBeInViewport();

  await page.goto("/conocimiento");
  await page.locator("header nav").getByRole("link", { name: "Cómo trabajamos" }).click();
  await expect(page).toHaveURL(/\/#metodo$/);
  await expect(page.locator("#metodo")).toBeInViewport();
});

test("the booking button never points to a bare #contacto (it would fail on inner pages)", async ({ page }) => {
  await page.goto("/productos");
  const hrefs = await page.locator("a").evaluateAll((links) => links.map((link) => link.getAttribute("href") ?? ""));
  expect(hrefs.filter((href) => href.startsWith("#") && href !== "#contenido")).toEqual([]);
});

test("every internal link on every page resolves, and external ones open safely in a new tab", async ({ page, request }, info) => {
  test.skip(!isDesktop(info), "link crawl runs once");
  const internal = new Set<string>();
  const external: { href: string; target: string | null; rel: string | null }[] = [];

  for (const route of ROUTES) {
    await page.goto(route);
    const links = await page.locator("a[href]").evaluateAll((anchors) =>
      anchors.map((anchor) => ({
        href: anchor.getAttribute("href") ?? "",
        target: anchor.getAttribute("target"),
        rel: anchor.getAttribute("rel"),
      })),
    );
    for (const link of links) {
      if (link.href.startsWith("http")) external.push(link);
      else if (link.href.startsWith("/")) internal.add(link.href.split("#")[0] || "/");
    }
  }

  for (const path of internal) {
    const response = await request.get(path);
    expect(response.status(), path).toBeLessThan(400);
  }

  for (const link of external) {
    if (!/^https:\/\/(foodies|carbonozero)\.mundacasolutions\.com\/?$/.test(link.href)) continue;
    expect(link.target, link.href).toBe("_blank");
    expect(link.rel, link.href).toContain("noopener");
  }
  expect(external.some((link) => link.href.includes("foodies.mundacasolutions.com"))).toBe(true);
  expect(external.some((link) => link.href.includes("carbonozero.mundacasolutions.com"))).toBe(true);
});

test("product pages link out to their subdomain and back to the index", async ({ page }) => {
  await page.goto("/productos/foodies");
  await expect(page.getByRole("link", { name: /Conocer Foodies, software de gestión operacional/ })).toHaveAttribute(
    "href",
    "https://foodies.mundacasolutions.com",
  );
  await expect(page.getByRole("link", { name: "Ver el caso Cafetal" })).toHaveAttribute("href", "/#cafetal");
  await page.getByRole("link", { name: "Volver a productos" }).click();
  await expect(page).toHaveURL(/\/productos$/);
});

test("the legal pages render every section and the visible email is one place", async ({ page }) => {
  await page.goto("/privacidad");
  await expect(page.locator("article section")).toHaveCount(7);
  await page.goto("/terminos");
  await expect(page.locator("article section")).toHaveCount(6);
  const mailto = await page.locator('article a[href^="mailto:"]').first().getAttribute("href");
  const footerMail = await page.locator('footer a[href^="mailto:"]').first().getAttribute("href");
  expect(mailto).toBe(footerMail);
});
