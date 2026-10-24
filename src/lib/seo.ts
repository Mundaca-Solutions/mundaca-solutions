import type { Metadata } from "next";
import { contactEmail, site, siteUrl } from "@/content/site";
import type { Product } from "@/content/products";

export const ogImage = { url: "/og-image.png", width: 1200, height: 630, alt: "Mundaca's Solutions — Software, datos e inteligencia operacional" };

export const defaultDescription =
  "Mundaca's Solutions diseña productos y software a medida que conectan operación, datos e inteligencia para automatizar procesos, aumentar el control y mejorar decisiones.";

/**
 * Per-page metadata. Title/description/canonical are kept exactly as published before the remodel;
 * Open Graph is repeated per page because a nested `openGraph` replaces the root one entirely.
 */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type: "website",
      images: [ogImage],
    },
  };
}

/** Escapes `<` so a JSON-LD block can never close its own <script> tag. */
export const serializeJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");

export const organizationId = `${siteUrl}/#organization`;

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": organizationId,
    name: site.name,
    legalName: site.legalName,
    url: siteUrl,
    // The wordmark that actually exists in /public (note the "s": logo-mundacas-solutions).
    logo: `${siteUrl}${site.logoOnLight}`,
    email: contactEmail,
    description:
      "Compañía de software, datos e inteligencia operacional que construye productos propios y sistemas a medida para conectar procesos, datos e inteligencia.",
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: site.name,
    publisher: { "@id": organizationId },
  };
}

export function professionalServiceSchema() {
  return {
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#service`,
    name: site.name,
    legalName: site.legalName,
    url: siteUrl,
    email: contactEmail,
    telephone: site.phoneE164,
    areaServed: "Chile",
    description:
      "Diseño y desarrollo de productos y software a medida que conectan operación, datos e inteligencia para automatizar procesos, aumentar el control y mejorar decisiones.",
    provider: { "@id": organizationId },
  };
}

export function softwareApplicationSchema(product: Product) {
  return {
    "@type": "SoftwareApplication",
    "@id": `${product.externalUrl}/#software`,
    name: product.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: product.externalUrl,
    description: product.hub.schemaDescription,
    provider: { "@id": organizationId },
  };
}

export type Crumb = { label: string; href?: string };

/** BreadcrumbList: only crumbs that have a real URL are listed (the last one may omit it). */
export function breadcrumbSchema(crumbs: readonly Crumb[]) {
  const listed = crumbs.filter((crumb, index) => crumb.href || index === crumbs.length - 1);
  return {
    "@type": "BreadcrumbList",
    itemListElement: listed.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      ...(crumb.href ? { item: `${siteUrl}${crumb.href === "/" ? "" : crumb.href}` } : {}),
    })),
  };
}

export const graph = (...nodes: unknown[]) => ({ "@context": "https://schema.org", "@graph": nodes });
