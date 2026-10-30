import type { FlowStepData } from "./types";

/**
 * Productos propios. Todo el texto existía ya en el sitio (home y páginas /productos/*); los diagramas
 * (`flow`) solo ordenan las capacidades que el producto ya declara, sin inventar funciones ni cifras.
 * Las páginas /productos/[slug] se generan desde estos datos.
 */

export type ProductSlug = "foodies" | "carbono-zero";

export type HubSection = {
  title: string;
  text: string;
  cards?: { title: string; list?: readonly string[]; text?: string }[];
  cta?: { label: string };
};

export type ProductFlow = {
  /** Heading of the diagram on the product page. */
  title: string;
  intro: string;
  steps: readonly FlowStepData[];
  /** Optional lanes under the diagram: who works on which nodes (span = number of nodes). */
  lanes?: readonly { title: string; text: string; span: number }[];
  /** The line that ties the diagram together. */
  truth: { title: string; text: string };
};

export type Product = {
  slug: ProductSlug;
  name: string;
  category: string;
  text: string;
  impact: string;
  tags: readonly string[];
  /** Short line shown under the name in compact panels. */
  panelTagline: string;
  logo: { src: string; width: number; height: number };
  /** Production site of the product (opens in a new tab). */
  externalUrl: string;
  ctaLabel: string;
  tone: "carbon" | "foodies";
  /** Card on the /productos index. */
  indexCard: { eyebrow: string; text: string; forWho: string; visitLabel: string; hubLabel: string };
  /** One-line proof used by the "inteligencia operacional" solution page (existing copy). */
  proof: string;
  /** Capabilities the product already declares, drawn as a connected diagram. */
  flow: ProductFlow;
  /** Landing hub inside mundacasolutions.com. */
  hub: {
    metaTitle: string;
    metaDescription: string;
    breadcrumb: string;
    eyebrow: string;
    h1: string;
    lead: string;
    schemaDescription: string;
    sections: readonly HubSection[];
  };
};

const catalog: readonly Product[] = [
  {
    slug: "carbono-zero",
    name: "Carbono Zero",
    category: "Inteligencia para construcción",
    text: "Conecta diseño, planificación, materiales, ejecución y desempeño ambiental para entender el proyecto como un sistema y anticipar mejor sus consecuencias.",
    impact: "Del dato fragmentado a una visión conectada del proyecto.",
    tags: ["Diseño", "Planificación", "CO₂e", "Trazabilidad"],
    panelTagline: "Proyecto · Datos · Desempeño",
    logo: { src: "/logos/carbono-zero/logo-carbono-zero.png", width: 1241, height: 308 },
    externalUrl: "https://carbonozero.mundacasolutions.com",
    ctaLabel: "Conocer Carbono Zero",
    tone: "carbon",
    indexCard: {
      eyebrow: "INTELIGENCIA AMBIENTAL",
      text: "Plataforma de inteligencia ambiental para proyectos de construcción. Ordena materiales, evidencia, indicadores y trazabilidad para comprender el desempeño del proyecto.",
      forWho: "equipos de construcción, sostenibilidad, diseño y gestión de proyectos.",
      visitLabel: "Visitar Carbono Zero",
      hubLabel: "Conocer Carbono Zero",
    },
    proof: "Inteligencia ambiental para proyectos de construcción y trazabilidad.",
    flow: {
      title: "Del dato disperso a la trazabilidad ambiental",
      intro: "Cinco capacidades conectadas: lo que se diseña, se compra y se ejecuta queda relacionado con su evidencia y su desempeño.",
      steps: [
        { icon: "layers", title: "Diseño y planificación", text: "Decisiones de diseño y ejecución del proyecto." },
        { icon: "boxes", title: "Materiales", text: "Datos de materiales y su impacto." },
        { icon: "file", title: "Evidencia", text: "Evidencia y documentación ambiental." },
        { icon: "gauge", title: "Indicadores", text: "Indicadores de huella y desempeño (CO₂e)." },
        { icon: "leaf", title: "Trazabilidad", text: "Qué se registró, de dónde viene y cómo se relaciona." },
      ],
      truth: {
        title: "Un proyecto entendido como sistema",
        text: "Modelo, obra y trazabilidad relacionados en un mismo lugar.",
      },
    },
    hub: {
      metaTitle: "Carbono Zero | Gestión ambiental para construcción",
      metaDescription:
        "Carbono Zero es el producto de Mundaca's Solutions para ordenar datos, materiales, evidencia, huella y trazabilidad ambiental en proyectos de construcción.",
      breadcrumb: "Carbono Zero",
      eyebrow: "PRODUCTO DE MUNDACA'S SOLUTIONS",
      h1: "Carbono Zero: inteligencia ambiental para proyectos de construcción",
      lead: "Carbono Zero conecta datos del proyecto para que la gestión ambiental no dependa de información fragmentada, evidencia difícil de encontrar o indicadores aislados.",
      schemaDescription: "Software de gestión e inteligencia ambiental para proyectos de construcción.",
      sections: [
        {
          title: "Del dato disperso a la trazabilidad ambiental",
          text: "El producto reúne materiales, factores, emisiones, evidencia, indicadores y contexto del proyecto. Así los equipos pueden revisar qué se registró, de dónde viene y cómo se relaciona con las decisiones de diseño y ejecución.",
          cards: [
            {
              title: "Qué ayuda a ordenar",
              list: [
                "Datos de materiales y su impacto.",
                "Evidencia y documentación ambiental.",
                "Indicadores de huella y desempeño.",
                "Relaciones entre modelo, obra y trazabilidad.",
              ],
            },
            {
              title: "Para equipos de construcción",
              text: "Carbono Zero está pensado para equipos que necesitan convertir información ambiental en una base de trabajo útil para proyectar, comparar, reportar y mejorar.",
            },
          ],
        },
        {
          title: "Una plataforma de inteligencia ambiental",
          text: "Mundaca's Solutions desarrolla Carbono Zero como producto propio, separando la experiencia pública de la aplicación operativa para que cada superficie cumpla su función.",
          cta: { label: "Conocer Carbono Zero para construcción" },
        },
      ],
    },
  },
  {
    slug: "foodies",
    name: "Foodies",
    category: "Operación e inteligencia para negocios",
    text: "Conecta ventas, caja, inventario y operación para dar al negocio una fuente de verdad clara, detectar lo que requiere atención y decidir con más contexto.",
    impact: "De procesos separados a una operación conectada y visible.",
    tags: ["Ventas", "Caja", "Inventario", "Reportes"],
    panelTagline: "Ventas · Inventario · Gestión",
    logo: { src: "/logos/foodies/logo-foodies.png", width: 2172, height: 724 },
    externalUrl: "https://foodies.mundacasolutions.com",
    ctaLabel: "Conocer Foodies",
    tone: "foodies",
    indexCard: {
      eyebrow: "OPERACIÓN COMERCIAL",
      text: "Software de gestión operacional para negocios que venden. Conecta ventas, caja, inventario, pedidos y datos para que el equipo trabaje con una fuente de verdad común.",
      forWho: "restaurantes, cafeterías, minimarkets y negocios con operación de venta.",
      visitLabel: "Visitar Foodies",
      hubLabel: "Conocer Foodies",
    },
    proof: "Inteligencia para ventas, caja, inventario y operación comercial.",
    flow: {
      title: "Cómo se conectan ventas, caja, inventario y reportes",
      intro: "Cuatro módulos que comparten la misma información: lo que ocurre en la venta queda disponible para el cierre, el inventario y los reportes.",
      steps: [
        { icon: "cart", title: "Ventas y pedidos", text: "Ventas, pedidos y punto de atención." },
        { icon: "receipt", title: "Cobro y caja", text: "Caja y cierres con trazabilidad." },
        { icon: "boxes", title: "Productos e inventario", text: "Productos, stock e inventario." },
        { icon: "barChart", title: "Reportes", text: "Reportes e inteligencia operacional." },
      ],
      lanes: [
        { title: "Equipo", text: "Ejecuta pedidos y cobros", span: 2 },
        { title: "Administración", text: "Revisa inventario, cierres y tendencias", span: 2 },
      ],
      truth: { title: "Una fuente de verdad común", text: "Todo el equipo trabaja sobre la misma información." },
    },
    hub: {
      metaTitle: "Foodies | Software de gestión para negocios",
      metaDescription:
        "Foodies es el producto de Mundaca's Solutions que conecta ventas, caja, inventario, pedidos e inteligencia operacional para negocios que venden.",
      breadcrumb: "Foodies",
      eyebrow: "PRODUCTO DE MUNDACA'S SOLUTIONS",
      h1: "Foodies: operación, datos e inteligencia para negocios que venden",
      lead: "Foodies nace para reunir en una misma operación lo que suele estar separado: ventas, caja, inventario, pedidos, clientes y reportes.",
      schemaDescription: "Software de gestión operacional para negocios que venden.",
      sections: [
        {
          title: "Una operación conectada para trabajar con más contexto",
          text: "El producto ayuda a que cada venta alimente el control del negocio. El equipo puede ejecutar pedidos y cobros, mientras quienes administran revisan inventario, cierres y tendencias sin depender de planillas aisladas.",
          cards: [
            {
              title: "Capacidades centrales",
              list: [
                "Ventas, pedidos y punto de atención.",
                "Caja y cierres con trazabilidad.",
                "Productos, stock e inventario.",
                "Reportes e inteligencia operacional.",
              ],
            },
            {
              title: "Un producto para operaciones distintas",
              text: "Foodies puede configurarse alrededor de restaurantes, cafeterías, minimarkets y otras operaciones que necesitan vender, controlar y aprender de sus datos.",
            },
          ],
        },
        {
          title: "Desarrollado por Mundaca's Solutions SpA",
          text: "Foodies es un producto propio de una empresa de software que entiende la implementación como parte del resultado: primero se comprende la operación, luego se configura y se acompaña la adopción.",
          cta: { label: "Conocer Foodies, software de gestión operacional" },
        },
      ],
    },
  },
];

/** Display order everywhere (home, /productos, footer): Foodies first, then Carbono Zero. */
export const productSlugs: readonly ProductSlug[] = ["foodies", "carbono-zero"];

// Loud in both directions: a product in the catalog but not in `productSlugs` would silently vanish.
if (catalog.length !== productSlugs.length) {
  throw new Error("content/products.ts: `catalog` y `productSlugs` deben listar los mismos productos");
}

export const products: readonly Product[] = productSlugs.map((slug) => {
  const product = catalog.find((item) => item.slug === slug);
  if (!product) throw new Error(`Producto sin contenido: ${slug}`);
  return product;
});

export const productBySlug = (slug: string): Product | undefined => products.find((product) => product.slug === slug);

export const productsIndex = {
  metaTitle: "Productos de software",
  metaDescription:
    "Foodies y Carbono Zero: productos de software de Mundaca's Solutions para conectar operaciones, datos e inteligencia.",
  eyebrow: "PRODUCTOS PROPIOS",
  h1: "Software construido para operaciones reales",
  lead: "Mundaca's Solutions crea productos tecnológicos que convierten operaciones complejas en sistemas más claros, trazables y preparados para decidir.",
} as const;
