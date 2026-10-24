import { serializeJsonLd } from "@/lib/seo";

/** Server-rendered JSON-LD block. `data` is built by helpers in lib/seo.ts (never from user input). */
export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}
