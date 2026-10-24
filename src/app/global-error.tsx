"use client";

import "./globals.css";

/**
 * Last-resort boundary (errors thrown by the root layout itself). It replaces the whole document, so it
 * brings its own <html>, and avoids anything that depends on the layout (fonts, header, footer).
 */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="es-CL">
      <body style={{ margin: 0, background: "#071425", color: "#f4f1ea", fontFamily: "system-ui, sans-serif" }}>
        <main
          style={{
            minHeight: "100dvh",
            display: "grid",
            placeItems: "center",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "30rem" }}>
            <p style={{ color: "#e6b450", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" }}>
              Mundaca&apos;s Solutions
            </p>
            <h1 style={{ fontSize: "2rem", margin: "0.5rem 0 1rem" }}>Algo no salió como esperábamos.</h1>
            <p style={{ color: "#b9c6d8", lineHeight: 1.6 }}>
              Ya estamos al tanto. Vuelve a intentarlo en unos segundos; si sigue igual, escríbenos por WhatsApp.
            </p>
            <button
              type="button"
              onClick={reset}
              style={{
                marginTop: "1.5rem",
                padding: "0.85rem 1.6rem",
                borderRadius: "999px",
                border: 0,
                background: "#e6b450",
                color: "#071425",
                fontWeight: 800,
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Reintentar
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
