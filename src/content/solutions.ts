import type { FlowStepData, IconName, NavChild } from "./types";

/**
 * Páginas de solución. Los textos principales existían ya; las páginas se enriquecen reutilizando
 * (sin inventar) las tarjetas, problemas y método de la home, referenciados por índice/slug. Cada solución
 * lleva su propia representación visual (`visual`), con vocabulario que ya usa el sitio.
 */

export type SolutionSlug = "software-a-medida" | "automatizacion-procesos" | "inteligencia-operacional";

export type SolutionVisual =
  | {
      kind: "need-to-solution";
      need: { title: string; items: readonly { icon: IconName; label: string }[] };
      bridge: string;
      solution: { title: string; items: readonly string[] };
    }
  | {
      kind: "stages";
      stages: readonly { icon: IconName; kicker: string; title: string; items: readonly string[] }[];
    }
  | {
      kind: "chain";
      steps: readonly FlowStepData[];
      enabler: { title: string; text: string };
    };

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
  visual: SolutionVisual;
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
    visual: {
      kind: "need-to-solution",
      need: {
        title: "Una necesidad operacional",
        items: [
          { icon: "workflow", label: "Procesos y reglas" },
          { icon: "users", label: "Usuarios y roles" },
          { icon: "database", label: "Datos" },
          { icon: "plug", label: "Integraciones" },
        ],
      },
      bridge: "Diseñamos y construimos por etapas verificables",
      solution: {
        title: "Una solución funcional",
        items: ["Procesos conectados", "Información centralizada", "Control operacional", "Evolución por etapas"],
      },
    },
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
    visual: {
      kind: "stages",
      stages: [
        {
          icon: "clipboard",
          kicker: "Hoy",
          title: "Proceso manual",
          items: ["Tareas repetitivas", "Traspasos innecesarios", "Errores que se multiplican"],
        },
        {
          icon: "plug",
          kicker: "Lo que construimos",
          title: "Automatización e integración",
          items: ["Flujos automatizados", "Alertas relevantes", "Integraciones"],
        },
        {
          icon: "shield",
          kicker: "Resultado",
          title: "Operación controlada",
          items: ["Responsables definidos", "Excepciones visibles", "Trazabilidad"],
        },
      ],
    },
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
    visual: {
      kind: "chain",
      steps: [
        { icon: "database", title: "Fuentes de datos", text: "Información que hoy vive entre planillas, mensajes y herramientas." },
        { icon: "workflow", title: "Procesos", text: "Datos ordenados según cómo opera realmente la empresa." },
        { icon: "gauge", title: "Indicadores", text: "KPIs accionables y visibilidad ejecutiva." },
        { icon: "compass", title: "Decisiones", text: "Contexto para detectar desviaciones y priorizar dónde actuar." },
      ],
      enabler: {
        title: "La inteligencia artificial complementa",
        text: "Explica y relaciona sobre datos que el sistema ya estructuró; no reemplaza la base ni es el producto.",
      },
    },
  },
];

export const solutionBySlug = (slug: string): Solution | undefined => solutions.find((solution) => solution.slug === slug);

export const solutionNav: NavChild[] = solutions.map((solution) => ({
  label: solution.navLabel,
  href: `/soluciones/${solution.slug}`,
  description: solution.navDescription,
}));
