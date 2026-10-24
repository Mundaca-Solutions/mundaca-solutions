import type { SolutionSlug } from "./solutions";
import type { IconName } from "./types";

/** Contenido de la home. Cada frase existía ya en el sitio anterior; aquí solo se reordena y se tipa. */

export const hero = {
  eyebrow: "SOFTWARE · DATOS · INTELIGENCIA OPERACIONAL",
  /** The H1 text must stay exactly "Convertimos operaciones complejas en sistemas para operar y decidir mejor." */
  titleStart: "Convertimos operaciones complejas en ",
  titleEmphasis: "sistemas para operar y decidir mejor.",
  lead: "Diseñamos productos y software a medida que conectan procesos, datos e inteligencia. Menos fricción operativa, más control y mejores decisiones.",
  primaryCta: "Conversemos sobre tu operación",
  secondaryCta: "Explorar nuestros productos",
  trust: [
    { icon: "searchCheck", label: "Diagnóstico antes de cotizar" },
    { icon: "boxes", label: "Desarrollo por etapas" },
    { icon: "message", label: "Acompañamiento directo" },
  ] satisfies { icon: IconName; label: string }[],
  panel: {
    label: "Productos propios",
    intro: "Una misma forma de construir software",
    flow: [{ label: "Operación" }, { label: "Datos" }, { label: "Inteligencia" }, { label: "Decisión" }],
  },
} as const;

/** Ticker: only messages that already existed on the site. */
export const tickerMessages = [
  "Diagnóstico antes de cotizar",
  "Desarrollo por etapas",
  "Acompañamiento directo",
  "Alcance claro",
  "Avances visibles",
  "Comunicación directa",
  "Menos fricción operativa",
  "Más control",
  "Mejores decisiones",
] as const;

export const productsSection = {
  eyebrow: "PRODUCTOS PROPIOS",
  title: "Dos productos. Un mismo estándar.",
  text: "Carbono Zero y Foodies nacen de la misma forma de entender el software: conectar la operación, ordenar los datos y convertirlos en contexto útil para decidir. Aplicamos ese principio a problemas distintos, sin perder profundidad en cada industria.",
} as const;

export const cafetal = {
  eyebrow: "CASO REAL · CAFETAL",
  title: "Una operación completa, conectada de principio a fin.",
  text: "Foodies se configuró alrededor del flujo real de Cafetal para reunir clientes, pedidos, preparación, despacho, cuentas, pagos, caja e información de gestión en una sola operación trazable.",
  tag: "IMPLEMENTACIÓN ESPECIALIZADA",
  product: "Construido sobre Foodies",
  stages: [
    { index: "01", title: "Solicitud", items: ["Cliente", "Pedido", "Menú"] },
    { index: "02", title: "Ejecución", items: ["Preparación", "Despacho"] },
    { index: "03", title: "Cierre y control", items: ["Pago / Cuenta", "Caja", "Reportes"] },
  ],
  impact: "Una sola operación trazable desde la solicitud hasta el cierre.",
  ctaLabel: "Conocer Foodies",
} as const;

export const principle = {
  eyebrow: "NUESTRO PRINCIPIO",
  title: "No empezamos por la tecnología. Empezamos por el problema.",
  /** Eight steps → a 4 + 4 grid. */
  steps: ["Problema", "Operación", "Datos", "Contexto", "Inteligencia", "Decisión", "Acción", "Resultado"],
  note: "Es el principio detrás de cada producto y cada solución que construimos: comprender primero, estructurar después y usar tecnología sólo donde realmente mejora la operación.",
} as const;

export const aiLayers = {
  eyebrow: "INTELIGENCIA ARTIFICIAL",
  title: "La inteligencia aporta cuando entiende el contexto.",
  text: "Primero estructuramos procesos, datos y reglas. Después usamos inteligencia artificial para explicar, relacionar y asistir decisiones sobre una realidad que el sistema ya comprende.",
  layers: [
    { index: "Capa 1", title: "Procesos", note: "Primero se estructuran" },
    { index: "Capa 2", title: "Datos", note: "Primero se estructuran" },
    { index: "Capa 3", title: "Reglas", note: "Primero se estructuran" },
    { index: "Capa 4", title: "Inteligencia artificial", note: "Después explica, relaciona y asiste decisiones" },
  ],
} as const;

export const problemsSection = {
  eyebrow: "CUANDO LA OPERACIÓN CRECE",
  title: "La complejidad no debería convertirse en descontrol.",
  text: "Cuando la información queda repartida entre personas, planillas, mensajes y herramientas que no conversan, aumenta la fricción operativa y disminuye la capacidad de ver qué está ocurriendo.",
  cta: { kicker: "¿Te suena familiar?", title: "Cuéntanos dónde se está generando la fricción.", label: "Revisar mi caso" },
} as const;

export const problems: readonly { icon: IconName; title: string; text: string }[] = [
  {
    icon: "layers",
    title: "Información fragmentada",
    text: "Conectamos información que hoy vive entre planillas, mensajes y herramientas aisladas.",
  },
  {
    icon: "workflow",
    title: "Operación demasiado manual",
    text: "Automatizamos tareas repetitivas y puntos de traspaso que consumen tiempo y amplifican errores.",
  },
  {
    icon: "barChart",
    title: "Datos sin contexto",
    text: "Convertimos registros dispersos en información útil para detectar desviaciones y decidir dónde actuar.",
  },
  {
    icon: "boxes",
    title: "Herramientas que no encajan",
    text: "Diseñamos alrededor de tu operación cuando una solución genérica obliga a tu empresa a trabajar de una forma que no le corresponde.",
  },
];

export const solutionsSection = {
  eyebrow: "DESARROLLO A MEDIDA",
  title: "Cuando lo genérico no alcanza, diseñamos a medida.",
  text: "Construimos sistemas operacionales, automatizaciones, plataformas de datos e integraciones alrededor de la forma real de trabajar de tu empresa. El software se adapta a la operación, no al revés.",
  pagesLabel: "Conoce cada solución",
  cta: {
    kicker: "¿Tu problema no cabe en una solución estándar?",
    title: "Partimos por entenderlo. Después definimos qué conviene construir, integrar o automatizar.",
    label: "Evaluar mi caso",
  },
} as const;

/** Cada tarjeta enlaza a la página de solución que la desarrolla. */
export const solutionCards: readonly {
  icon: IconName;
  title: string;
  text: string;
  bullets: readonly string[];
  slug: SolutionSlug;
}[] = [
  {
    icon: "layers",
    title: "Centraliza la operación",
    text: "Conecta procesos, equipos e información en un sistema diseñado alrededor de cómo funciona realmente tu empresa.",
    bullets: ["Procesos conectados", "Información centralizada", "Control operacional"],
    slug: "software-a-medida",
  },
  {
    icon: "zap",
    title: "Automatiza lo repetitivo",
    text: "Reduce tareas manuales, traspasos innecesarios y puntos donde hoy se pierde tiempo o se multiplican errores.",
    bullets: ["Flujos automatizados", "Alertas relevantes", "Integraciones"],
    slug: "automatizacion-procesos",
  },
  {
    icon: "rocket",
    title: "Convierte una necesidad en producto",
    text: "Transformamos una idea, proceso o servicio en una plataforma sólida, usable y preparada para evolucionar.",
    bullets: ["Experiencia clara", "Roles y procesos", "Evolución por etapas"],
    slug: "software-a-medida",
  },
  {
    icon: "barChart",
    title: "Convierte datos en decisiones",
    text: "Estructura la información de la operación para detectar desviaciones, entender qué está ocurriendo y actuar con más contexto.",
    bullets: ["KPIs accionables", "Visibilidad ejecutiva", "Trazabilidad"],
    slug: "inteligencia-operacional",
  },
];

export const methodSection = {
  eyebrow: "CÓMO TRABAJAMOS",
  title: "Menos incertidumbre. Más visibilidad en cada etapa.",
  text: "Desde la primera conversación hasta la puesta en marcha, sabes qué estamos resolviendo, qué decisión se tomó y cuál es el siguiente paso.",
  promise: {
    title: "Un proceso pensado para darte seguridad",
    text: "Alcance claro, avances visibles y comunicación directa.",
  },
} as const;

export const methodSteps: readonly { icon: IconName; title: string; text: string; deliverable: string }[] = [
  {
    icon: "searchCheck",
    title: "Entendemos la operación",
    text: "Levantamos el problema, los usuarios, los procesos y el resultado que la empresa necesita alcanzar.",
    deliverable: "Diagnóstico y prioridades",
  },
  {
    icon: "target",
    title: "Diseñamos la solución",
    text: "Definimos alcance, arquitectura y una ruta de implementación enfocada primero en lo que genera más valor.",
    deliverable: "Propuesta y plan de implementación",
  },
  {
    icon: "boxes",
    title: "Implementamos y validamos",
    text: "Construimos por etapas funcionales, validamos con la operación real y corregimos antes de aumentar complejidad.",
    deliverable: "Avances funcionales y verificables",
  },
  {
    icon: "rocket",
    title: "Ponemos en marcha y acompañamos",
    text: "Configuramos la solución, preparamos a los usuarios y acompañamos el arranque hasta estabilizar la operación.",
    deliverable: "Go-live y acompañamiento",
  },
];

export const partner = {
  eyebrow: "UN SOCIO TECNOLÓGICO",
  title: "Nos hacemos cargo del camino completo: del problema a la puesta en marcha.",
  text: "No necesitas llegar con una especificación técnica. Entendemos la operación, diseñamos la solución, tomamos las decisiones técnicas necesarias y acompañamos su implementación.",
  values: [
    { icon: "briefcase", title: "Visión de negocio", text: "La tecnología responde a un problema y un resultado concreto." },
    { icon: "message", title: "Comunicación directa", text: "Sabes qué estamos haciendo, por qué y qué sigue." },
    { icon: "shield", title: "Responsabilidad técnica", text: "Diseñamos pensando en seguridad, continuidad y evolución." },
    { icon: "rocket", title: "Acompañamiento", text: "La implementación no termina cuando entregamos el software." },
  ] satisfies { icon: IconName; title: string; text: string }[],
  card: {
    kicker: "DE PROBLEMA A RESULTADO",
    title: "Un camino claro para avanzar",
    flow: [
      { icon: "searchCheck", label: "Entender" },
      { icon: "target", label: "Priorizar" },
      { icon: "boxes", label: "Construir" },
      { icon: "rocket", label: "Resultado" },
    ] satisfies { icon: IconName; label: string }[],
    resultKicker: "RESULTADO",
    resultTitle: "Una operación más clara y preparada para crecer.",
    resultChips: ["Menos fricción", "Más control", "Mejor información"],
  },
} as const;

export const contactSection = {
  eyebrow: "PRIMER PASO · ENTENDER EL PROBLEMA",
  title: "Cuéntanos qué está frenando tu operación.",
  text: "Antes de hablar de tecnología o precio, revisamos el contexto, la prioridad y la viabilidad. Así la primera conversación empieza donde realmente importa.",
  points: ["Diagnóstico enfocado en tu operación", "Viabilidad y alcance honestos", "Un próximo paso concreto"],
  bookingLabel: "Agendar conversación",
  whatsapp: { kicker: "¿Prefieres escribirnos?", title: "Conversemos directamente por WhatsApp." },
  formHead: { index: "01", title: "Cuéntanos qué necesitas resolver", note: "Respuesta personal" },
} as const;

export const conocimiento = {
  metaTitle: "Conocimiento sobre software y operaciones",
  metaDescription: "Notas de Mundaca's Solutions sobre software, datos, automatización e inteligencia operacional.",
  eyebrow: "CONOCIMIENTO",
  h1: "Ideas para conectar mejor la operación con los datos",
  lead: "Un espacio para compartir cómo pensamos productos, automatización e inteligencia aplicada a problemas concretos.",
  cards: [
    {
      title: "Productos propios",
      text: "Conoce cómo Foodies y Carbono Zero convierten problemas específicos en productos de software.",
      linkLabel: "Explorar productos",
      href: "/productos",
    },
    {
      title: "Soluciones a medida",
      text: "Revisa nuestro enfoque para entender, diseñar, implementar y acompañar sistemas operacionales.",
      linkLabel: "Ver soluciones",
      href: "/soluciones/software-a-medida",
    },
  ],
} as const;

export const contactPage = {
  metaTitle: "Contacto",
  metaDescription:
    "Conversemos sobre el problema operativo, producto o sistema que necesitas resolver con Mundaca's Solutions.",
  eyebrow: "CONTACTO",
  h1: "Cuéntanos qué necesitas resolver",
  lead: "Una primera conversación sirve para entender el contexto, la prioridad y el siguiente paso más útil para tu empresa.",
  cardTitle: "Hablemos de tu operación",
  cardText:
    "Si buscas software a medida, automatización o quieres conocer nuestros productos, escríbenos con una breve descripción del problema.",
} as const;
