import { expect, test, type Page } from "@playwright/test";
import { isDesktop, ROUTES } from "./helpers";

// SEO does not depend on the viewport: run it once.
test.beforeEach(({}, info) => {
  test.skip(!isDesktop(info), "SEO checks run once (desktop project)");
});

const SITE = "https://mundacasolutions.com";
const SUFFIX = " | Mundaca's Solutions";

/** Title / description / canonical as published before the remodel (SEO closure of September 2026). */
const EXPECTED: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Mundaca's Solutions | Software, datos e inteligencia operacional",
    description:
      "Mundaca's Solutions diseña productos y software a medida que conectan operación, datos e inteligencia para automatizar procesos, aumentar el control y mejorar decisiones.",
  },
  "/productos": {
    title: `Productos de software${SUFFIX}`,
    description:
      "Foodies y Carbono Zero: productos de software de Mundaca's Solutions para conectar operaciones, datos e inteligencia.",
  },
  "/productos/foodies": {
    title: `Foodies | Software de gestión para negocios${SUFFIX}`,
    description:
      "Foodies es el producto de Mundaca's Solutions que conecta ventas, caja, inventario, pedidos e inteligencia operacional para negocios que venden.",
  },
  "/productos/carbono-zero": {
    title: `Carbono Zero | Gestión ambiental para construcción${SUFFIX}`,
    description:
      "Carbono Zero es el producto de Mundaca's Solutions para ordenar datos, materiales, evidencia, huella y trazabilidad ambiental en proyectos de construcción.",
  },
  "/soluciones/software-a-medida": {
    title: `Software a medida para empresas${SUFFIX}`,
    description:
      "Mundaca's Solutions diseña y desarrolla software a medida alrededor de la operación real de cada empresa.",
  },
  "/soluciones/automatizacion-procesos": {
    title: `Automatización de procesos empresariales${SUFFIX}`,
    description: "Automatiza tareas repetitivas, traspasos y alertas con soluciones conectadas a tus procesos y datos.",
  },
  "/soluciones/inteligencia-operacional": {
    title: `Inteligencia operacional y business intelligence${SUFFIX}`,
    description:
      "Conecta datos de la operación con indicadores y contexto para tomar decisiones más informadas.",
  },
  "/conocimiento": {
    title: `Conocimiento sobre software y operaciones${SUFFIX}`,
    description: "Notas de Mundaca's Solutions sobre software, datos, automatización e inteligencia operacional.",
  },
  "/contacto": {
    title: `Contacto${SUFFIX}`,
    description:
      "Conversemos sobre el problema operativo, producto o sistema que necesitas resolver con Mundaca's Solutions.",
  },
  "/privacidad": {
    title: `Política de Privacidad${SUFFIX}`,
    description: "Cómo Mundaca's Solutions trata los datos enviados mediante su sitio web.",
  },
  "/terminos": {
    title: `Términos de Uso${SUFFIX}`,
    description: "Condiciones generales de uso del sitio web de Mundaca's Solutions.",
  },
};

const jsonLd = async (page: Page) => {
  const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
  return blocks.flatMap((block) => {
    const data = JSON.parse(block) as { "@graph"?: Record<string, unknown>[] };
    return data["@graph"] ?? [data as Record<string, unknown>];
  });
};

test("robots.txt blocks only the API and points to the sitemap", async ({ request }) => {
  const response = await request.get("/robots.txt");
  expect(response.status()).toBe(200);
  const text = await response.text();
  expect(text).toContain("Disallow: /api/");
  expect(text).toMatch(/Sitemap: https:\/\/mundacasolutions\.com\/sitemap\.xml/);
  expect(text).not.toMatch(/Disallow: \/\s*$/m);
});

test("sitemap.xml lists exactly the 11 published routes", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  const xml = await response.text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  expect(locs).toHaveLength(11);
  expect([...locs].sort()).toEqual(ROUTES.map((route) => (route === "/" ? SITE : `${SITE}${route}`)).sort());
});

for (const route of ROUTES) {
  test(`${route}: title, description, canonical and a single H1`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);

    const expected = EXPECTED[route];
    expect(expected, `no expectation for ${route}`).toBeDefined();
    await expect(page).toHaveTitle(expected!.title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", expected!.description);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", route === "/" ? SITE : `${SITE}${route}`);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /index, follow/);
    // The old meta descriptions leaked a raw "&apos;": never again.
    expect(expected!.description).not.toMatch(/&\w+;/);
  });
}

test("home keeps its exact H1", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText(
    "Convertimos operaciones complejas en sistemas para operar y decidir mejor.",
  );
});

test("home structured data: Organization, WebSite and ProfessionalService with a logo that exists", async ({ page, request }) => {
  await page.goto("/");
  const nodes = await jsonLd(page);
  const types = nodes.map((node) => node["@type"]);
  expect(types).toEqual(expect.arrayContaining(["Organization", "WebSite", "ProfessionalService"]));
  expect(nodes.filter((node) => node["@type"] === "Organization")).toHaveLength(1);

  const organization = nodes.find((node) => node["@type"] === "Organization");
  const logo = String(organization?.logo);
  expect(logo).toContain("logo-mundacas-solutions");
  const logoResponse = await request.get(new URL(logo).pathname);
  expect(logoResponse.status(), `logo ${logo}`).toBe(200);
});

for (const route of ROUTES.filter((route) => route !== "/")) {
  test(`${route}: BreadcrumbList structured data`, async ({ page }) => {
    await page.goto(route);
    const crumbs = (await jsonLd(page)).find((node) => node["@type"] === "BreadcrumbList");
    expect(crumbs, "missing BreadcrumbList").toBeDefined();
    const items = crumbs!.itemListElement as { position: number; name: string; item?: string }[];
    expect(items[0]).toMatchObject({ position: 1, name: "Inicio", item: SITE });
    expect(items.at(-1)?.item).toBeUndefined();
  });
}

for (const slug of ["foodies", "carbono-zero"]) {
  test(`/productos/${slug}: SoftwareApplication on the product subdomain`, async ({ page }) => {
    await page.goto(`/productos/${slug}`);
    const app = (await jsonLd(page)).find((node) => node["@type"] === "SoftwareApplication");
    expect(app?.url).toBe(`https://${slug === "foodies" ? "foodies" : "carbonozero"}.mundacasolutions.com`);
  });
}

test("unknown product and solution slugs are real 404s", async ({ request }) => {
  for (const path of ["/productos/nada", "/soluciones/nada"]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(404);
  }
});

test("fonts are self-hosted: no request ever goes to Google Fonts", async ({ page }) => {
  const external: string[] = [];
  page.on("request", (request) => {
    if (/fonts\.(googleapis|gstatic)\.com/.test(request.url())) external.push(request.url());
  });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  expect(external).toEqual([]);
});
