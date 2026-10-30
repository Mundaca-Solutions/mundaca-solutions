import { solutionNav } from "./solutions";
import type { Link, NavItem } from "./types";

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mundacasolutions.com";

/** Canonical origin without a trailing slash (an env value without protocol gets https://). */
export const siteUrl = (rawSiteUrl.startsWith("http") ? rawSiteUrl : `https://${rawSiteUrl}`).replace(/\/$/, "");

/**
 * Visible contact email. POR CONFIRMAR con el dueño: el valor de producción hoy sale de
 * NEXT_PUBLIC_CONTACT_EMAIL (un gmail) y el valor por defecto del código es contacto@mundacasolutions.com.
 * Un único lugar decide cuál se muestra (header, footer, contacto y páginas legales).
 */
export const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contacto@mundacasolutions.com";

export const site = {
  name: "Mundaca's Solutions",
  legalName: "Mundaca's Solutions SpA",
  locale: "es_CL",
  city: "Los Ángeles, Chile",
  phoneDisplay: "+56 9 6663 5509",
  phoneE164: "+56 9 6663 5509",
  /** Default points at the home contact section; `/#contacto` works from inner pages too. */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "/#contacto",
  whatsappUrl:
    process.env.NEXT_PUBLIC_WHATSAPP_URL ||
    "https://wa.me/56966635509?text=Hola%2C%20quiero%20conversar%20con%20Mundaca%27s%20Solutions%20sobre%20una%20necesidad%20de%20mi%20empresa.",
  tagline:
    "Productos y software a medida para empresas que necesitan operar con más control, conectar mejor su información y tomar decisiones con contexto.",
  /** White-outlined wordmark: use on dark backgrounds. */
  logoOnDark: "/logos/mundaca-solutions/logo-mundacas-solutions.png",
  /** Color wordmark (same file used as the agency credit in client sites): use on light backgrounds. */
  logoOnLight: "/logos/mundaca-solutions/logo-mundacas-solutions-color.png",
} as const;

export const navItems: NavItem[] = [
  { label: "Productos", href: "/productos" },
  { label: "Soluciones", href: "/soluciones/software-a-medida", children: solutionNav },
  { label: "Cómo trabajamos", href: "/#metodo" },
  { label: "Contacto", href: "/contacto" },
];

export const legalLinks: Link[] = [
  { label: "Privacidad", href: "/privacidad" },
  { label: "Términos", href: "/terminos" },
];

export const isExternalHref = (href: string) => /^https?:\/\//.test(href);
