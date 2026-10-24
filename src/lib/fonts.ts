import localFont from "next/font/local";

/**
 * Self-hosted variable fonts (no requests to Google): the files ship in @fontsource-variable/*
 * and are served by Next from this origin. The latin subset covers every Spanish character.
 */

export const display = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource-variable/fraunces/files/fraunces-latin-wght-italic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-fraunces",
  display: "swap",
  fallback: ["Iowan Old Style", "Georgia", "serif"],
});

export const body = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource-variable/figtree/files/figtree-latin-wght-normal.woff2",
      weight: "300 900",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource-variable/figtree/files/figtree-latin-wght-italic.woff2",
      weight: "300 900",
      style: "italic",
    },
  ],
  variable: "--font-figtree",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});
