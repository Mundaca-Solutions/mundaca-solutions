import { products } from "./products";

/**
 * Sección "Resultados" (final de la home). Solo hechos verificables: cada tarjeta nombra un sitio que ya está en
 * línea y lo enlaza; la frase de "problema resuelto" sale de la descripción pública de ese mismo sitio o de su repositorio.
 *
 * AUTORIZACIÓN: un cliente solo aparece cuando `authorized` es true, y eso lo decide el dueño (nombrar y enlazar a un
 * cliente es una decisión comercial). Mientras sea false la tarjeta NO se muestra. Los productos propios no la necesitan.
 *
 * MÉTRICAS: no se publica ninguna cifra de resultado. Cada cliente debe confirmar la suya (por confirmar): `metric`
 * queda en null y no se dibuja.
 */

export type ResultKind = "product" | "client";

export type ResultCard = {
  slug: string;
  name: string;
  kind: ResultKind;
  /** Industry, in the words the site already uses. */
  rubro: string;
  /** One sentence: what problem the site solves. */
  solved: string;
  /** Production URL (opens in a new tab). Verified to answer 200 before it is published. */
  url: string | null;
  authorized: boolean;
  /** Real, client-confirmed figure. Null until the client confirms one: nothing is invented. */
  metric: null;
};

export const resultsSection = {
  eyebrow: "RESULTADOS",
  title: "No vendemos promesas.",
  emphasis: "Entregamos resultados.",
  text: "Estos son los productos y sitios que ya están en línea. Cada tarjeta lleva al sitio real, para que lo recorras tú mismo.",
  visitLabel: "Visitar sitio",
  kindLabel: { product: "Producto propio", client: "Sitio de cliente" },
} as const;

const [foodies, carbono] = [
  products.find((product) => product.slug === "foodies"),
  products.find((product) => product.slug === "carbono-zero"),
];

if (!foodies || !carbono) throw new Error("results.ts expects the foodies and carbono-zero products to exist");

/**
 * Order is fixed: Foodies, Carbono Zero, then the clients (Clínica Dib, Bahamonde, Delanoe, consultora).
 * Client URLs other than Clínica Dib are POR CONFIRMAR (null) and need the owner's go-ahead.
 */
export const resultCards: readonly ResultCard[] = [
  {
    slug: "foodies",
    name: foodies.name,
    kind: "product",
    rubro: "Gestión operacional para restaurantes, cafeterías y minimarkets",
    solved: "Conecta ventas, caja, inventario, pedidos y gestión en una sola plataforma, configurada alrededor de cada negocio.",
    url: foodies.externalUrl,
    authorized: true,
    metric: null,
  },
  {
    slug: "carbono-zero",
    name: carbono.name,
    kind: "product",
    rubro: "Construcción · inteligencia ambiental",
    solved: "Conecta datos de obra, materiales, evidencia y desempeño ambiental para mejorar decisiones en proyectos de construcción.",
    url: carbono.externalUrl,
    authorized: true,
    metric: null,
  },
  {
    slug: "clinica-dib",
    name: "Clínica Dib",
    kind: "client",
    rubro: "Salud · clínica dental",
    solved: "Reúne especialidades, equipo y tienda con pago en línea, y la clínica administra su contenido desde su propio panel.",
    url: "https://clinicadib.cl",
    authorized: false,
    metric: null,
  },
  {
    slug: "bahamonde",
    name: "Bahamonde",
    kind: "client",
    rubro: "Comercio · artículos para el hogar",
    solved: "Ordena el catálogo por categorías con filtros y lleva cada consulta de producto a una cotización por WhatsApp.",
    url: null,
    authorized: false,
    metric: null,
  },
  {
    slug: "delanoe-motos",
    name: "Delanoe Motos",
    kind: "client",
    rubro: "Motos, indumentaria y accesorios",
    solved: "Muestra el catálogo de motos y equipamiento y permite agendar y consultar horas de mantención.",
    url: null,
    authorized: false,
    metric: null,
  },
  {
    slug: "consultora-juridica",
    name: "Consultora jurídica",
    kind: "client",
    rubro: "Servicios jurídicos",
    solved: "Presenta los servicios y proyectos de la consultora y recibe consultas por un formulario de contacto.",
    url: null,
    authorized: false,
    metric: null,
  },
];

/** What the page draws: own products, plus every client the owner authorized AND whose URL is confirmed. */
export const visibleResults: readonly (ResultCard & { url: string })[] = resultCards.filter(
  (card): card is ResultCard & { url: string } => card.url !== null && (card.kind === "product" || card.authorized),
);

/** Columns per breakpoint, so the grid is always paired (never one orphan card on a row). */
export function resultColumns(count: number) {
  const desktop = count <= 3 ? count : count % 3 === 0 ? 3 : 2;
  const tablet = count % 2 === 0 ? 2 : 1;
  return { desktop: Math.max(desktop, 1), tablet };
}
