import { expect, test } from "@playwright/test";
import { isDesktop } from "./helpers";

/**
 * Every other spec runs with reducedMotion: "reduce" so measurements never race an animation. These
 * ones run WITH motion, to exercise what reduced motion switches off: Reveal, the page entrance and
 * the hash scroll, plus the mobile sheet closing when the viewport grows or the user goes back.
 */
test.use({ reducedMotion: "no-preference" });

test("Reveal: content below the fold starts hidden and appears when scrolled into view", async ({ page }) => {
  await page.goto("/");
  const heading = page.locator("#productos .reveal").first();
  await expect(heading).toHaveAttribute("data-visible", "false");
  await heading.scrollIntoViewIfNeeded();
  await expect(heading).toHaveAttribute("data-visible", "true");
  await expect(heading).toHaveCSS("opacity", "1");
});

test("Reveal: staggered cards settle and hand back their own hover styles", async ({ page }) => {
  await page.goto("/");
  const grid = page.locator("#productos ul.reveal-stagger");
  await grid.scrollIntoViewIfNeeded();
  await expect(grid).toHaveAttribute("data-visible", "true");
  await expect(grid).toHaveAttribute("data-settled", "true", { timeout: 4000 });
});

test("page entrance: a client navigation plays the template animation again", async ({ page }) => {
  await page.goto("/");
  await page.locator("footer").getByRole("link", { name: "Conocimiento" }).click();
  await expect(page).toHaveURL(/\/conocimiento$/);
  const name = await page.locator("main > .page-enter").evaluate((node) => getComputedStyle(node).animationName);
  expect(name).toContain("page-enter");
});

test("/#metodo from another page lands on the section with animations on", async ({ page }, info) => {
  test.skip(!isDesktop(info), "header nav is desktop");
  await page.goto("/contacto");
  await page.locator("header nav").getByRole("link", { name: "Cómo trabajamos" }).click();
  await expect(page).toHaveURL(/\/#metodo$/);
  await expect(page.locator("#metodo")).toBeInViewport({ timeout: 8000 });
});

test("a malformed hash does not crash the page", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/#%E0%A4%A");
  await page.waitForTimeout(500);
  await expect(page.locator("h1")).toBeVisible();
  expect(errors).toEqual([]);
});

test("mobile sheet: closes when the viewport grows to desktop and unlocks the page", async ({ page }, info) => {
  test.skip(isDesktop(info), "starts from a phone viewport");
  await page.goto("/");
  await page.getByRole("button", { name: "Abrir menú" }).click();
  await expect(page.locator("#mobile-nav")).toBeVisible();
  await expect(page.locator("#contenido")).toHaveAttribute("inert", "");

  await page.setViewportSize({ width: 1280, height: 800 });
  await expect(page.locator("#mobile-nav")).toBeHidden();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
  await expect(page.locator("#contenido")).not.toHaveAttribute("inert", "");
});

test("mobile sheet: back navigation closes it, and Escape returns focus to the menu button", async ({ page }, info) => {
  test.skip(isDesktop(info), "mobile navigation");
  await page.goto("/");
  const button = page.getByRole("button", { name: "Abrir menú" });
  await button.click();
  await expect(page.locator("#mobile-nav")).toBeVisible();
  // Focus moved inside the sheet.
  await expect(page.locator("#mobile-nav a").first()).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(page.locator("#mobile-nav")).toBeHidden();
  await expect(button).toBeFocused();

  await button.click();
  await page.locator("#mobile-nav").getByRole("link", { name: "Productos", exact: true }).click();
  await expect(page).toHaveURL(/\/productos$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator("#mobile-nav")).toBeHidden();
});
