import { expect, test } from "@playwright/test";
import {
  boxes,
  expectEqualHeightsPerRow,
  expectNoHorizontalScroll,
  isDesktop,
  ROUTES,
  rowSizes,
  trackProblems,
} from "./helpers";

for (const route of ROUTES) {
  test(`${route}: no horizontal scroll and a clean console`, async ({ page, baseURL }) => {
    const problems = trackProblems(page, baseURL);
    await page.goto(route);
    await page.waitForLoadState("networkidle");
    await expectNoHorizontalScroll(page);
    expect(problems, problems.join("\n")).toEqual([]);
  });
}

test.describe("home grids are paired and equal-height", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("productos propios: two cards per row, same height, same top", async ({ page }, info) => {
    const cards = await boxes(page, "#productos > div > ul > li");
    expect(cards).toHaveLength(2);
    expect(rowSizes(cards)).toEqual(isDesktop(info) ? [2] : [1, 1]);
    expectEqualHeightsPerRow(cards);
    if (isDesktop(info)) expect(Math.abs(cards[0]!.top - cards[1]!.top)).toBeLessThanOrEqual(1);
  });

  test("principio: eight steps in one row on desktop, a vertical journey on phones", async ({ page }, info) => {
    const steps = await boxes(page, "#principio ol > li");
    expect(steps).toHaveLength(8);
    expect(rowSizes(steps)).toEqual(isDesktop(info) ? [8] : [1, 1, 1, 1, 1, 1, 1, 1]);
    // Every step is an icon node joined to the next one by a line.
    await expect(page.locator("#principio ol > li svg")).toHaveCount(8);
  });

  test("problemas: four cards in one row on desktop, stacked on phones, equal heights", async ({ page }, info) => {
    const cards = await boxes(page, "#problemas > div > ul > li");
    expect(cards).toHaveLength(4);
    expect(rowSizes(cards)).toEqual(isDesktop(info) ? [4] : [1, 1, 1, 1]);
    expectEqualHeightsPerRow(cards);
  });

  test("soluciones: 2 + 2 on desktop, equal heights", async ({ page }, info) => {
    const cards = await boxes(page, "#soluciones > div > ul > li");
    expect(cards).toHaveLength(4);
    expect(rowSizes(cards)).toEqual(isDesktop(info) ? [2, 2] : [1, 1, 1, 1]);
    expectEqualHeightsPerRow(cards);
  });

  test("foodies en acción: the four real modules in one row on desktop, stacked on phones", async ({ page }, info) => {
    const modules = await boxes(page, "#foodies ol > li");
    expect(modules).toHaveLength(4);
    expect(rowSizes(modules)).toEqual(isDesktop(info) ? [4] : [1, 1, 1, 1]);
  });

  test("the header is the same solid navy as the hero and touches it: no strip in between", async ({ page }) => {
    const gap = await page.evaluate(() => {
      const header = document.querySelector("header")!.getBoundingClientRect();
      const hero = document.querySelector("#inicio")!.getBoundingClientRect();
      return Math.abs(hero.top - header.bottom);
    });
    expect(gap).toBeLessThanOrEqual(1);
  });

  test("hero: both calls to action share a row on desktop", async ({ page }, info) => {
    test.skip(!isDesktop(info), "side by side on desktop");
    const buttons = await boxes(page, "#inicio a[class*='button']");
    expect(buttons.length).toBeGreaterThanOrEqual(2);
    expect(Math.abs(buttons[0]!.top - buttons[1]!.top)).toBeLessThanOrEqual(1);
  });

  test("cards share the container's left and right edges", async ({ page }, info) => {
    test.skip(!isDesktop(info), "edge alignment is a desktop concern");
    const container = (await boxes(page, "#productos > div"))[0]!;
    const cards = await boxes(page, "#productos > div > ul > li");
    const inner = 40; // --gutter at 1440 is clamp(1.25rem, 4vw, 2.5rem) = 40px
    expect(Math.abs(cards[0]!.left - (container.left + inner))).toBeLessThanOrEqual(1);
    expect(Math.abs(cards[1]!.right - (container.right - inner))).toBeLessThanOrEqual(1);
  });

  test("every image on the page loads", async ({ page }) => {
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 60));
      }
    });
    await page.waitForLoadState("networkidle");
    const broken = await page.locator("img").evaluateAll((images) =>
      (images as HTMLImageElement[]).filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.src),
    );
    expect(broken).toEqual([]);
  });

  test("under the hero there are three static value propositions (no ticker, no moving clone)", async ({ page }) => {
    const band = page.locator("section[aria-label='Cómo trabajamos contigo']");
    await expect(band.locator("li")).toHaveCount(3);
    await expect(page.locator("[data-clone]")).toHaveCount(0);
  });
});

test.describe("header", () => {
  test("desktop: the Soluciones menu opens by click, lists three solutions and closes with Escape", async ({ page }, info) => {
    test.skip(!isDesktop(info), "desktop navigation");
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Soluciones" });
    await expect(trigger).toHaveAttribute("aria-expanded", "false");

    // Hovering must NOT open it: it opens by click only.
    await trigger.hover();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");

    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    const menu = page.locator("header ul[id]").filter({ hasText: "Software a medida" });
    await expect(menu.getByRole("link")).toHaveCount(3);

    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).toBeFocused();
  });

  test("desktop: clicking outside closes the menu; choosing an option navigates", async ({ page }, info) => {
    test.skip(!isDesktop(info), "desktop navigation");
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Soluciones" });
    await trigger.click();
    await page.mouse.click(700, 500);
    await expect(trigger).toHaveAttribute("aria-expanded", "false");

    await trigger.click();
    await page.getByRole("link", { name: /Automatización de procesos/ }).first().click();
    await expect(page).toHaveURL(/\/soluciones\/automatizacion-procesos$/);
    await expect(page.locator("h1")).toContainText("Automatización de procesos");
  });

  test("mobile: the drawer opens, locks scroll, lists everything and closes", async ({ page }, info) => {
    test.skip(isDesktop(info), "mobile navigation");
    await page.goto("/");
    await expect(page.getByRole("navigation", { name: "Principal" })).toBeHidden();
    await page.getByRole("button", { name: "Abrir menú" }).click();
    const sheet = page.locator("#mobile-nav");
    await expect(sheet).toBeVisible();
    for (const label of ["Productos", "Software a medida", "Automatización de procesos", "Inteligencia operacional", "Cómo trabajamos", "Contacto"]) {
      await expect(sheet.getByRole("link", { name: label, exact: true })).toBeVisible();
    }
    expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden");
    await expectNoHorizontalScroll(page);

    await page.keyboard.press("Escape");
    await expect(sheet).toBeHidden();
    expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
  });

  test("the logo is the white wordmark and links home", async ({ page }) => {
    await page.goto("/contacto");
    const logo = page.locator("header").getByRole("link", { name: "Mundaca's Solutions, inicio" });
    await expect(logo.locator("img")).toHaveAttribute("src", /logo-mundacas-solutions/);
    await logo.click();
    await expect(page).toHaveURL(/\/$/);
  });
});

test.describe("WhatsApp button and skip link", () => {
  test("the floating button is AA green, opens WhatsApp in a new tab and is hidden on /contacto", async ({ page }) => {
    await page.goto("/");
    const fab = page.getByRole("link", { name: "Conversemos por WhatsApp" });
    await expect(fab).toBeVisible();
    await expect(fab).toHaveAttribute("href", /^https:\/\/wa\.me\//);
    await expect(fab).toHaveAttribute("target", "_blank");
    await expect(fab).toHaveAttribute("rel", /noopener/);
    await expect(fab).toHaveCSS("background-color", "rgb(15, 122, 59)");

    await page.goto("/contacto");
    await expect(page.getByRole("link", { name: "Conversemos por WhatsApp" })).toHaveCount(0);
  });

  test("the skip link is the first tab stop and jumps to the content", async ({ page }, info) => {
    test.skip(!isDesktop(info), "keyboard navigation");
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Saltar al contenido principal" });
    await expect(skip).toBeFocused();
    expect((await boxes(page, ".skip-link"))[0]!.top).toBeGreaterThanOrEqual(0);
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#contenido$/);
  });
});

test.describe("footer", () => {
  test("lists the three solutions, the products and the legal pages", async ({ page }) => {
    await page.goto("/productos");
    const footer = page.locator("footer");
    for (const href of [
      "/soluciones/software-a-medida",
      "/soluciones/automatizacion-procesos",
      "/soluciones/inteligencia-operacional",
      "/productos/foodies",
      "/productos/carbono-zero",
      "/privacidad",
      "/terminos",
    ]) {
      await expect(footer.locator(`a[href="${href}"]`), href).toHaveCount(1);
    }
  });
});

test("page entrance: every route is wrapped in the template animation", async ({ page }) => {
  await page.goto("/conocimiento");
  await expect(page.locator("main > .page-enter")).toHaveCount(1);
});
