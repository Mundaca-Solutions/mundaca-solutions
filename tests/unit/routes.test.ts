import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { siteUrl } from "@/content/site";
import { products } from "@/content/products";
import { solutions } from "@/content/solutions";

/** Every public URL of the site. The SEO closure fixed this list at 11 routes: do not grow it silently. */
export const publicPaths = [
  "",
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
];

describe("sitemap", () => {
  it("lists exactly the 11 published routes", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toHaveLength(11);
    expect(urls.sort()).toEqual(publicPaths.map((path) => `${siteUrl}${path}`).sort());
  });

  it("covers every generated product and solution page", () => {
    const urls = sitemap().map((entry) => entry.url);
    for (const product of products) expect(urls).toContain(`${siteUrl}/productos/${product.slug}`);
    for (const solution of solutions) expect(urls).toContain(`${siteUrl}/soluciones/${solution.slug}`);
  });
});

describe("robots", () => {
  it("allows the site, blocks only the API and points to the sitemap", () => {
    const result = robots();
    const rules = Array.isArray(result.rules) ? result.rules[0] : result.rules;
    expect(rules?.allow).toBe("/");
    expect(rules?.disallow).toEqual(["/api/"]);
    expect(result.sitemap).toBe(`${siteUrl}/sitemap.xml`);
  });
});
