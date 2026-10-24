/**
 * Textos legales tal como estaban publicados (sin cambios de fondo). `{email}` se reemplaza por el
 * correo visible definido en content/site.ts. Revisión legal pendiente por parte del dueño.
 */

export type LegalDoc = {
  path: "/privacidad" | "/terminos";
  metaTitle: string;
  metaDescription: string;
  breadcrumb: string;
  eyebrow: string;
  h1: string;
  updated: string;
  sections: readonly { title: string; text: string }[];
};

export const privacy: LegalDoc = {
  path: "/privacidad",
  metaTitle: "Política de Privacidad",
  metaDescription: "Cómo Mundaca's Solutions trata los datos enviados mediante su sitio web.",
  breadcrumb: "Privacidad",
  eyebrow: "INFORMACIÓN Y TRANSPARENCIA",
  h1: "Política de Privacidad",
  updated: "Última actualización: 22 de julio de 2026",
  sections: [
    {
      title: "1. Responsable",
      text: "Mundaca's Solutions SpA, con domicilio en Los Ángeles, Chile, es responsable del tratamiento de los datos que se envían mediante este sitio web.",
    },
    {
      title: "2. Datos que recopilamos",
      text: "El formulario puede solicitar nombre, empresa, correo electrónico, teléfono, servicio de interés, plazo estimado y una descripción del desafío. También podemos registrar información técnica mínima necesaria para proteger el formulario contra abuso.",
    },
    {
      title: "3. Para qué usamos la información",
      text: "Utilizamos los datos exclusivamente para responder solicitudes, coordinar reuniones, preparar una evaluación inicial y mantener trazabilidad comercial. No vendemos información personal ni la utilizamos para campañas ajenas a la solicitud sin autorización adicional.",
    },
    {
      title: "4. Proveedores tecnológicos",
      text: "Para operar el sitio podemos utilizar servicios de hosting, correo transaccional y almacenamiento seguro, como Vercel, Resend y Supabase. Solo se comparte la información necesaria para prestar esas funciones.",
    },
    {
      title: "5. Conservación y seguridad",
      text: "Conservamos los datos durante el tiempo razonablemente necesario para atender la solicitud y administrar la relación comercial. Aplicamos controles técnicos y organizativos orientados a prevenir acceso, modificación o divulgación no autorizada.",
    },
    {
      title: "6. Tus solicitudes",
      text: "Puedes pedir acceso, corrección o eliminación de la información enviada escribiendo a {email}. Atenderemos la solicitud después de validar razonablemente la identidad del solicitante.",
    },
    {
      title: "7. Cambios",
      text: "Esta política puede actualizarse cuando cambien el sitio, sus servicios o los proveedores utilizados. La fecha de la versión vigente siempre aparecerá al comienzo del documento.",
    },
  ],
};

export const terms: LegalDoc = {
  path: "/terminos",
  metaTitle: "Términos de Uso",
  metaDescription: "Condiciones generales de uso del sitio web de Mundaca's Solutions.",
  breadcrumb: "Términos",
  eyebrow: "CONDICIONES DEL SITIO",
  h1: "Términos de Uso",
  updated: "Última actualización: 22 de julio de 2026",
  sections: [
    {
      title: "1. Alcance",
      text: "Este sitio presenta los servicios, capacidades y proyectos de Mundaca's Solutions SpA. Su contenido es informativo y no constituye por sí solo una propuesta contractual definitiva.",
    },
    {
      title: "2. Solicitudes comerciales",
      text: "Enviar el formulario inicia una conversación y no obliga a ninguna de las partes a contratar. El alcance, precio, plazos, entregables, propiedad intelectual y soporte se definirán en una propuesta o contrato separado.",
    },
    {
      title: "3. Contenido y propiedad intelectual",
      text: "La identidad visual, textos, diseños, demostraciones y componentes propios del sitio pertenecen a Mundaca's Solutions o se utilizan con autorización. No se permite su reproducción comercial sin consentimiento previo.",
    },
    {
      title: "4. Disponibilidad",
      text: "Procuramos mantener el sitio disponible y actualizado, pero pueden existir interrupciones por mantenimiento, proveedores externos o situaciones fuera de nuestro control.",
    },
    {
      title: "5. Enlaces externos",
      text: "Algunos enlaces pueden dirigir a servicios externos. Mundaca's Solutions no controla sus contenidos, disponibilidad ni políticas, por lo que cada usuario debe revisarlas antes de utilizarlos.",
    },
    {
      title: "6. Contacto",
      text: "Las consultas relacionadas con estos términos pueden enviarse a {email}.",
    },
  ],
};
