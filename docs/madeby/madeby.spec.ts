import { expect, test } from "@playwright/test";

/**
 * e2e template for the agency credit. Copy into the project's e2e/ folder, set EXPECTED_TEXT to
 * "Sitio web por" (client sites) or "Un producto de" (own products) and run on desktop AND mobile projects.
 */
const EXPECTED_TEXT = "Sitio web por";

test("the agency credit is in the footer, links to mundacasolutions.com and its logo loads", async ({ page }) => {
  await page.goto("/");
  const link = page.locator("footer a[data-madeby]");
  await expect(link).toHaveCount(1);

  // Link: exact destination, new tab, safe rel.
  await expect(link).toHaveAttribute("href", "https://mundacasolutions.com");
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(link).toHaveAttribute("rel", /noopener/);
  await expect(link).toHaveAttribute("rel", /noreferrer/);
  await expect(link).toContainText(EXPECTED_TEXT);

  // Logo: has alt text, is really loaded (naturalWidth > 0) and is 2.75rem tall with automatic width.
  const logo = link.locator("img");
  await expect(logo).toHaveAttribute("alt", "Mundaca's Solutions");
  await logo.scrollIntoViewIfNeeded();
  await expect.poll(() => logo.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
  const box = await logo.boundingBox();
  const rem = await page.evaluate(() => parseFloat(getComputedStyle(document.documentElement).fontSize));
  expect(Math.abs((box?.height ?? 0) - 2.75 * rem)).toBeLessThanOrEqual(1);

  // Accessible name = the whole phrase.
  await expect(link).toHaveAccessibleName(`${EXPECTED_TEXT} Mundaca's Solutions`);
});

test("the credit sits in the right column of the footer bottom bar on wide screens", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop", "column placement is a desktop concern");
  await page.goto("/");
  const link = page.locator("footer a[data-madeby]");
  const bar = link.locator("xpath=ancestor::div[last()]").first();
  void bar;
  const linkBox = await link.boundingBox();
  const footerBox = await page.locator("footer").boundingBox();
  expect(linkBox!.x + linkBox!.width).toBeGreaterThan(footerBox!.width * 0.6);
});
