/**
 * Sección "Resultados" (final de la home). Solo hechos verificables, y SIN repetir "Productos propios": los
 * productos ya tienen su sección y su página. Aquí van los sistemas entregados a clientes.
 *
 * AUTORIZACIÓN: un cliente solo aparece cuando `authorized` es true Y su URL está confirmada, y eso lo decide el
 * dueño (nombrar y enlazar a un cliente es una decisión comercial). Mientras tanto la sección NO se dibuja: es
 * preferible no mostrarla a mostrarla vacía o inventada.
 *
 * MÉTRICAS: no se publica ninguna cifra de resultado. Cada cliente debe confirmar la suya (por confirmar): `metric`
 * queda en null y no se dibuja. CAPTURAS: `image` queda en null hasta que el cliente entregue una real.
 */

export type ResultCard = {
  slug: string;
  name: string;
  /** Industry, in the words the site already uses. */
  rubro: string;
  /** One sentence: what problem the site solves. */
  solved: string;
  /** Production URL (opens in a new tab). Verified to answer 200 before it is published. */
  url: string | null;
  authorized: boolean;
  /** Real screenshot supplied by the client. Null until it exists: nothing is mocked up. */
  image: { src: string; alt: string; width: number; height: number } | null;
  /** Real, client-confirmed figure. Null until the client confirms one: nothing is invented. */
  metric: null;
};

export const resultsSection = {
  eyebrow: "RESULTADOS",
  title: "No vendemos promesas.",
  emphasis: "Entregamos resultados.",
  text: "Sistemas que ya están en línea para empresas reales. Cada tarjeta lleva al sitio, para que lo recorras tú mismo.",
  visitLabel: "Visitar sitio",
} as const;

/**
 * Client systems. Client URLs other than Clínica Dib are POR CONFIRMAR (null) and need the owner's go-ahead; the
 * Delanoe Motos and Bahamonde rebuilds are not published yet, so they do not appear until they are live.
 */
export const resultCards: readonly ResultCard[] = [
  {
    slug: "clinica-dib",
    name: "Clínica Dib",
    rubro: "Salud · clínica dental",
    solved: "Reúne especialidades, equipo y tienda con pago en línea, y la clínica administra su contenido desde su propio panel.",
    url: "https://clinicadib.cl",
    authorized: false,
    image: null,
    metric: null,
  },
  {
    slug: "bahamonde",
    name: "Bahamonde",
    rubro: "Comercio · artículos para el hogar",
    solved: "Ordena el catálogo por categorías con filtros y lleva cada consulta de producto a una cotización por WhatsApp.",
    url: null,
    authorized: false,
    image: null,
    metric: null,
  },
  {
    slug: "delanoe-motos",
    name: "Delanoe Motos",
    rubro: "Motos, indumentaria y accesorios",
    solved: "Muestra el catálogo de motos y equipamiento con su ficha técnica y lleva cada consulta a una cotización por WhatsApp.",
    url: null,
    authorized: false,
    image: null,
    metric: null,
  },
  {
    slug: "consultora-juridica",
    name: "Consultora jurídica",
    rubro: "Servicios jurídicos",
    solved: "Presenta los servicios y proyectos de la consultora y recibe consultas por un formulario de contacto.",
    url: null,
    authorized: false,
    image: null,
    metric: null,
  },
];

/** What the page draws: only clients the owner authorized AND whose URL is confirmed. Empty until then. */
export const visibleResults: readonly (ResultCard & { url: string })[] = resultCards.filter(
  (card): card is ResultCard & { url: string } => card.url !== null && card.authorized,
);

/** Columns per breakpoint, so the grid is always paired (never one orphan card on a row). */
export function resultColumns(count: number) {
  const desktop = count <= 3 ? count : count % 3 === 0 ? 3 : 2;
  const tablet = count % 2 === 0 ? 2 : 1;
  return { desktop: Math.max(desktop, 1), tablet };
}
