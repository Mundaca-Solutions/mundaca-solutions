import { expect, type Page, type TestInfo } from "@playwright/test";

/** Every public route of the site (the 11 in the sitemap). */
export const ROUTES = [
  "/",
  "/productos",
  "/productos/foodies",
  "/productos/carbono-zero",
  "/soluciones/software-a-medida",
  "/soluciones/automatizacion-procesos",
  "/soluciones/inteligencia-operacional",
  "/conocimiento",
  "/contacto",
  "/privacidad",
  "/terminos",
] as const;

export const isDesktop = (info: TestInfo) => info.project.name === "desktop";

/** Collects console errors and failed requests so a test can assert the page is clean. */
export function trackProblems(page: Page, baseURL: string | undefined) {
  const problems: string[] = [];
  const siteOrigin = new URL(baseURL ?? "http://localhost:3200").origin;
  page.on("console", (message) => {
    if (message.type() === "error") problems.push(`console: ${message.text()}`);
  });
  page.on("pageerror", (error) => problems.push(`pageerror: ${error.message}`));
  page.on("requestfailed", (request) => problems.push(`requestfailed: ${request.url()}`));
  page.on("response", (response) => {
    if (response.status() >= 400 && new URL(response.url()).origin === siteOrigin) {
      problems.push(`http ${response.status()}: ${response.url()}`);
    }
  });
  return problems;
}

/**
 * No horizontal scroll AND nothing cut off. Checking scrollWidth alone is not enough: a page can hide an
 * overflow (clipped containers) and still look broken, so every element must also end inside the viewport
 * unless an ancestor deliberately clips it (the ticker).
 */
export async function expectNoHorizontalScroll(page: Page) {
  const { scrollWidth, clientWidth, cutOff } = await page.evaluate(() => {
    const width = document.documentElement.clientWidth;
    const clippedByAncestor = (element: Element) => {
      for (let node = element.parentElement; node && node !== document.body; node = node.parentElement) {
        const { overflowX } = getComputedStyle(node);
        if (overflowX === "hidden" || overflowX === "clip") return true;
      }
      return false;
    };
    const cut: string[] = [];
    for (const element of document.querySelectorAll("body *")) {
      const style = getComputedStyle(element);
      if (style.position === "fixed" || style.display === "none" || style.visibility === "hidden") continue;
      const rect = element.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      if (rect.right > width + 1 && !clippedByAncestor(element)) {
        cut.push(`${element.tagName.toLowerCase()}.${String(element.className).slice(0, 40)} right=${Math.round(rect.right)}`);
      }
    }
    return { scrollWidth: document.documentElement.scrollWidth, clientWidth: width, cutOff: cut.slice(0, 5) };
  });
  expect(scrollWidth, `scrollWidth ${scrollWidth} > clientWidth ${clientWidth}`).toBeLessThanOrEqual(clientWidth);
  expect(cutOff, `elements cut off at the right edge:\n${cutOff.join("\n")}`).toEqual([]);
}

export type Box = { top: number; bottom: number; left: number; right: number; width: number; height: number };

export async function boxes(page: Page, selector: string): Promise<Box[]> {
  return page.locator(selector).evaluateAll((nodes) =>
    nodes.map((node) => {
      const rect = node.getBoundingClientRect();
      return {
        top: rect.top + window.scrollY,
        bottom: rect.bottom + window.scrollY,
        left: rect.left,
        right: rect.right,
        width: rect.width,
        height: rect.height,
      };
    }),
  );
}

/** Groups boxes into visual rows (same top within `tolerance` px) and returns each row's boxes. */
export function toRows(items: Box[], tolerance = 2): Box[][] {
  const rows: Box[][] = [];
  for (const item of [...items].sort((a, b) => a.top - b.top || a.left - b.left)) {
    const row = rows.find((candidate) => Math.abs((candidate[0]?.top ?? 0) - item.top) <= tolerance);
    if (row) row.push(item);
    else rows.push([item]);
  }
  return rows;
}

export const rowSizes = (items: Box[]) => toRows(items).map((row) => row.length);

/** Cards that share a row must have the same height (±1px). */
export function expectEqualHeightsPerRow(items: Box[]) {
  for (const row of toRows(items)) {
    const heights = row.map((box) => box.height);
    expect(Math.max(...heights) - Math.min(...heights), `row heights ${heights.join(", ")}`).toBeLessThanOrEqual(1);
  }
}
