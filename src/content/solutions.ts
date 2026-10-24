import type { NavChild } from "./types";

/**
 * Páginas de solución. Los textos principales existían ya; las páginas se enriquecen reutilizando
 * (sin inventar) las tarjetas, problemas y método de la home, referenciados por índice/slug.
 */

export type SolutionSlug = "software-a-medida" | "automatizacion-procesos" | "inteligencia-operacional";

export type Solution = {
  slug: SolutionSlug;
  navLabel: string;
  navDescription: string;
  metaTitle: string;
  metaDescription: string;
  breadcrumb: string;
  eyebrow: string;
  h1: string;
  lead: string;
  sectionTitle: string;
  sectionText: string;
  /** Closing call to action (always goes to the contact page). */
  ctaLabel: string;
  /** Indexes into `problems` (content/home.ts) that this solution answers. */
  problemIndexes: readonly number[];
  /** Show the two products as proof (the page already linked them before). */
  showProducts: boolean;
};

export const solutions: readonly Solution[] = [
  {
    slug: "software-a-medida",
    navLabel: "Software a medida",
    navDescription: "Sistemas diseñados alrededor de tu operación real",
    metaTitle: "Software a medida para empresas",
    metaDescription:
      "Mundaca's Solutions diseña y desarrolla software a medida alrededor de la operación real de cada empresa.",
    breadcrumb: "Software a medida",
    eyebrow: "SOLUCIONES",
    h1: "Software a medida para empresas que necesitan operar mejor",
    lead: "Cuando una herramienta genérica no representa tu proceso, diseñamos una solución que conecta usuarios, reglas, datos e integraciones alrededor del resultado que quieres alcanzar.",
    sectionTitle: "Construir lo que la operación realmente necesita",
    sectionText:
      "Partimos por entender el problema, priorizamos el alcance y construimos por etapas verificables. El software debe reducir fricción y dar más visibilidad, no añadir otra capa desconectada.",
    ctaLabel: "Cuéntanos qué necesitas resolver",
    problemIndexes: [0, 3],
    showProducts: false,
  },
  {
    slug: "automatizacion-procesos",
    navLabel: "Automatización de procesos",
    navDescription: "Tareas repetitivas, traspasos y alertas con control",
    metaTitle: "Automatización de procesos empresariales",
    metaDescription:
      "Automatiza tareas repetitivas, traspasos y alertas con soluciones conectadas a tus procesos y datos.",
    breadcrumb: "Automatización de procesos",
    eyebrow: "SOLUCIONES",
    h1: "Automatización de procesos que deja la operación más clara",
    lead: "Identificamos tareas manuales, puntos de traspaso y decisiones repetitivas para construir flujos que ahorren tiempo sin perder control.",
    sectionTitle: "Automatizar con criterio operativo",
    sectionText:
      "Una automatización útil tiene responsables, excepciones y trazabilidad. Diseñamos integraciones, alertas y flujos que se puedan entender y mantener cuando la operación cambie.",
    ctaLabel: "Evaluar un proceso",
    problemIndexes: [1],
    showProducts: false,
  },
  {
    slug: "inteligencia-operacional",
    navLabel: "Inteligencia operacional",
    navDescription: "Datos conectados a decisiones reales",
    metaTitle: "Inteligencia operacional y business intelligence",
    metaDescription:
      "Conecta datos de la operación con indicadores y contexto para tomar decisiones más informadas.",
    breadcrumb: "Inteligencia operacional",
    eyebrow: "SOLUCIONES",
    h1: "Inteligencia operacional para decidir con contexto",
    lead: "Ordenamos datos y procesos para que los indicadores expliquen qué está ocurriendo, dónde actuar y qué resultado seguir.",
    sectionTitle: "Datos conectados a decisiones reales",
    sectionText:
      "La inteligencia empieza por una base confiable. Diseñamos modelos, reportes y señales que respetan la realidad de la operación y ayudan a priorizar acciones.",
    ctaLabel: "Conversemos sobre tu operación",
    problemIndexes: [2],
    showProducts: true,
  },
];

export const solutionBySlug = (slug: string): Solution | undefined => solutions.find((solution) => solution.slug === slug);

export const solutionNav: NavChild[] = solutions.map((solution) => ({
  label: solution.navLabel,
  href: `/soluciones/${solution.slug}`,
  description: solution.navDescription,
}));
