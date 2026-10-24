import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { HashScroll } from "@/components/layout/HashScroll";
import { Header } from "@/components/layout/Header";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { JsonLd } from "@/components/seo/JsonLd";
import { site, siteUrl } from "@/content/site";
import { body, display } from "@/lib/fonts";
import { defaultDescription, graph, ogImage, organizationSchema, websiteSchema } from "@/lib/seo";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#071425",
  colorScheme: "light",
};

const defaultTitle = "Mundaca's Solutions | Software, datos e inteligencia operacional";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | Mundaca's Solutions",
  },
  description: defaultDescription,
  applicationName: site.name,
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  category: "technology",
  keywords: [
    "desarrollo de software Chile",
    "software a medida",
    "automatización de procesos",
    "sistemas de gestión empresarial",
    "plataformas digitales",
    "inteligencia operacional",
    "business intelligence",
    "Mundaca's Solutions",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    siteName: site.name,
    locale: site.locale,
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: defaultDescription,
    images: [ogImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es-CL" data-theme="light" className={`${display.variable} ${body.variable}`}>
      <body>
        {/* One Organization + WebSite graph for the whole site; pages add their own nodes. */}
        <JsonLd data={graph(organizationSchema(), websiteSchema())} />
        <a className="skip-link" href="#contenido">
          Saltar al contenido principal
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <WhatsAppFab />
        <HashScroll />
      </body>
    </html>
  );
}
