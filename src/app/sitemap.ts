import type { MetadataRoute } from "next";
import { productSlugs } from "@/content/products";
import { siteUrl } from "@/content/site";
import { solutions } from "@/content/solutions";

type Entry = MetadataRoute.Sitemap[number];

/** The 11 published routes: home, products index + hubs, three solutions, and the four support pages. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entry = (path: string, changeFrequency: Entry["changeFrequency"], priority: number): Entry => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    entry("", "monthly", 1),
    entry("/productos", "monthly", 0.9),
    ...productSlugs.map((slug) => entry(`/productos/${slug}`, "monthly", 0.8)),
    ...solutions.map((solution) => entry(`/soluciones/${solution.slug}`, "monthly", 0.7)),
    entry("/conocimiento", "monthly", 0.5),
    entry("/contacto", "yearly", 0.6),
    entry("/privacidad", "yearly", 0.2),
    entry("/terminos", "yearly", 0.2),
  ];
}
