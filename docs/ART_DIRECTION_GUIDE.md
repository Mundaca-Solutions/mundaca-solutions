# Guía de dirección de arte · mundacasolutions.com

Se redactó ANTES de reconstruir el sitio (rama `remodelacion-estandar-premium`) y se mantiene al día.
Referencia de calidad: Clínica Dib y Bahamonde Electrodomésticos. Misma vara, marca distinta.

## Personalidad de marca

Una compañía de software seria, directa y cercana. No grita ni promete: explica cómo piensa y muestra lo
que ya está funcionando. Tono de "tú", frases cortas, verbos concretos ("Cuéntanos", "Revisa", "Entra").

## Audiencia y la creencia que el sitio debe cambiar

- **Quién llega:** dueños y gerentes de empresas con operación real (ventas, caja, obras, procesos) que hoy
  trabajan con planillas, mensajes y herramientas que no conversan.
- **Creencia a cambiar:** "el software a medida es caro, lento y opaco". El sitio muestra un camino claro
  (problema → operación → datos → decisión) y productos propios en línea que se pueden visitar.

## Referencias

- Clínica Dib: hero con onda, serif con cursiva, píldoras, ticker, reveal al scroll, footer con crédito.
- Bahamonde: paneles, rejillas pareadas (4+4), disciplina de medidas con JavaScript.

## Tipografía

| Rol | Familia | Notas |
| --- | --- | --- |
| Display | Fraunces (variable, normal + cursiva) | Titulares, cifras, citas; la palabra clave va en cursiva y color de acento |
| Cuerpo / interfaz | Figtree (variable) | Texto, botones, formularios |

Autoalojadas con `@fontsource-variable/fraunces` y `@fontsource-variable/figtree` cargadas con
`next/font/local` (sin peticiones a Google). Escala fluida con `clamp()`, interlineado de titulares ≈ 1.05–1.1.
Etiquetas pequeñas: mayúsculas, `letter-spacing` 0.14em, peso 800.

## Paleta "Azul noche y latón"

| Rol | Valor | Uso |
| --- | --- | --- |
| Azul noche (dominante) | `#071425` | Header, hero, secciones oscuras, footer |
| Azul noche 2 / 3 | `#0c2038` / `#14304f` | Degradados y superficies sobre oscuro |
| Latón (acento único) | `#e6b450` | Acción principal, cursivas sobre oscuro, detalles |
| Latón tinta | `#8a5a00` | Texto de acento sobre fondos claros (contraste ≥ 5:1) |
| Latón suave | `#fbf0d6` | Píldoras y avisos sobre claro |
| Papel | `#f7f4ee` / `#efe9dc` | Fondo de página y secciones alternas |
| Línea | `#ddd5c4` | Bordes finos sobre claro |
| Tinta | `#0b1b30` | Texto principal |
| Tinta suave | `#44566b` | Texto secundario sobre claro |
| WhatsApp | `#0f7a3b` | Botón flotante (blanco sobre este verde ≥ 4.5:1) |
| Rojo / verde estados | `#c81f3a` / `#137a4b` | Errores y éxito |

Reglas:

- **Un solo acento cálido** (latón). Nada de un segundo acento competidor.
- Texto de acento sobre claro SIEMPRE `#8a5a00`, nunca `#e6b450` (no llega a 3:1).
- Sobre oscuro el latón `#e6b450` supera 9:1 con `#071425`.
- Cada par texto/fondo se vigila con axe (WCAG A/AA) en e2e.
- Nada de cian/violeta (paleta anterior): se retiró por parecer SaaS genérico.

## Lenguaje de imagen

Sin fotos de stock ni ilustraciones inventadas. Se usan los logos reales de Foodies y Carbono Zero sobre
"pozos" blancos (sus fondos son claros) y diagramas hechos con CSS/SVG propios a partir del contenido que ya
existía (flujo real de Foodies, cadena procesos → decisiones, principio en ocho pasos).

## Densidad y forma

Aire amplio entre secciones (`clamp(4.5rem, 9vw, 8rem)`); tarjetas con radio 1.25–1.5 rem, borde fino y
sombra suave; botones y píldoras con radio 999 px; íconos propios de trazo uniforme
(`src/components/ui/icons.tsx`, 1.8 px).

## Movimiento

Entrada de página con `app/template.tsx` (≈ 480 ms, fundido + 14 px), `Reveal` al hacer scroll con
IntersectionObserver, hover con elevación de 2–4 px. Todo
respeta `prefers-reduced-motion`. Sin framer-motion y sin transiciones con blur por ruta.

## Composición de la home (orden fijo)

1. Hero oscuro sin onda, unido al header (mismo azul sólido), con panel de productos propios.
2. Franja de tres propuestas de valor (estática; ya no hay ticker).
3. Productos propios (Carbono Zero, Foodies) en tarjetas de igual altura.
4. Foodies en acción: los módulos reales del producto como una operación conectada (sin clientes ni cifras inventadas).
5. Principio: ocho pasos con íconos unidos por flechas (una fila en escritorio, recorrido vertical en móvil).
6. Inteligencia artificial como tecnología habilitadora (procesos → información → contexto → decisiones).
7. Problemas: cuatro nodos que convergen en una operación conectada.
8. Soluciones (sección oscura, rejilla 2 × 2) con enlace a las tres páginas de solución.
9. Método.
10. Socio tecnológico.
11. Resultados: solo clientes autorizados; la sección se omite mientras no haya ninguno.
12. Contacto con formulario.
13. Footer con las tres soluciones y los legales.

## Crédito de agencia

mundacasolutions.com ES la agencia, por lo que no lleva el bloque `MadeBy`. Los sitios de cliente usan
"Sitio web por" + logo; los productos propios (Foodies, Carbono Zero) "Un producto de" + logo. El componente
de referencia vive en `docs/madeby/`.

## Estado

- Fase 1 (rama `remodelacion-estandar-premium`): reconstrucción completa. Ver `docs/MACROFASE_ESTANDAR.md`.
- Pendiente de decisión del dueño: correo visible (ver `docs/MACROFASE_ESTANDAR.md`).

## Refinación premium (octubre 2026)

- Superficies claras en blanco y neutros fríos (`--ms-paper #f4f7fb`); se retiró el crema/beige. Azul profundo y latón se mantienen.
- Lenguaje común: nodos con ícono unidos por líneas y flechas (`components/ui/Flow.tsx`), hairlines en vez de tarjetas apiladas.
- Cada producto conserva su identidad (`data-product` en `brand.css`: Foodies naranja/grafito, Carbono Zero verde); no usa el latón corporativo.
- El caso Cafetal se retiró del sitio (contrato no cerrado). Resultados solo muestra clientes autorizados por el dueño.
