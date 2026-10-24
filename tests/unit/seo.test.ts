import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { productBySlug } from "@/content/products";
import { siteUrl } from "@/content/site";
import {
  breadcrumbSchema,
  organizationSchema,
  pageMetadata,
  professionalServiceSchema,
  serializeJsonLd,
  softwareApplicationSchema,
  websiteSchema,
} from "@/lib/seo";

describe("seo helpers", () => {
  it("builds absolute canonical and Open Graph URLs per page", () => {
    const metadata = pageMetadata({ title: "Contacto", description: "d", path: "/contacto" });
    expect(metadata.alternates?.canonical).toBe(`${siteUrl}/contacto`);
    expect(metadata.openGraph?.url).toBe(`${siteUrl}/contacto`);
    expect(metadata.openGraph?.images).toBeDefined();
  });

  it("points the Organization logo at a file that exists in /public (the old one had a typo)", () => {
    const logo = organizationSchema().logo;
    expect(logo.startsWith(siteUrl)).toBe(true);
    const file = logo.slice(siteUrl.length);
    expect(file).toContain("logo-mundacas-solutions");
    expect(existsSync(join(process.cwd(), "public", file))).toBe(true);
  });

  it("ties WebSite and ProfessionalService to the one Organization node", () => {
    const id = organizationSchema()["@id"];
    expect(websiteSchema().publisher["@id"]).toBe(id);
    expect(professionalServiceSchema().provider["@id"]).toBe(id);
  });

  it("describes each product as a SoftwareApplication on its own subdomain", () => {
    const foodies = productBySlug("foodies");
    expect(foodies).toBeDefined();
    if (!foodies) return;
    const schema = softwareApplicationSchema(foodies);
    expect(schema["@type"]).toBe("SoftwareApplication");
    expect(schema.url).toBe("https://foodies.mundacasolutions.com");
    expect(schema.provider["@id"]).toBe(organizationSchema()["@id"]);
  });

  describe("breadcrumbSchema", () => {
    it("numbers crumbs and keeps the last one without a URL", () => {
      const list = breadcrumbSchema([{ label: "Inicio", href: "/" }, { label: "Productos", href: "/productos" }, { label: "Foodies" }]);
      expect(list.itemListElement.map((item) => item.position)).toEqual([1, 2, 3]);
      expect(list.itemListElement[0]?.item).toBe(siteUrl);
      expect(list.itemListElement[1]?.item).toBe(`${siteUrl}/productos`);
      expect(list.itemListElement[2]).not.toHaveProperty("item");
    });

    it("drops middle crumbs that have no page of their own", () => {
      const list = breadcrumbSchema([{ label: "Inicio", href: "/" }, { label: "Soluciones" }, { label: "Software a medida" }]);
      expect(list.itemListElement.map((item) => item.name)).toEqual(["Inicio", "Software a medida"]);
      expect(list.itemListElement.map((item) => item.position)).toEqual([1, 2]);
    });
  });

  it("escapes < in JSON-LD so a script block can never be closed early", () => {
    const out = serializeJsonLd({ name: "</script><script>alert(1)</script>" });
    expect(out).not.toContain("</script>");
    expect(JSON.parse(out).name).toBe("</script><script>alert(1)</script>");
  });
});
