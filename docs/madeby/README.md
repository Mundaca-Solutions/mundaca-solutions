# MadeBy · crédito de agencia (regla obligatoria)

Todo sitio de Mundaca's Solutions lleva el crédito de la agencia en la **barra inferior del footer, columna
derecha**. Un único componente, copiado a cada proyecto.

| Pieza | Texto | Variante |
| --- | --- | --- |
| Sitios de **cliente** (Clínica Dib, Bahamonde, Delanoe, consultora…) | "Sitio web por" + logo | `variant="client"` |
| Productos **propios** (Foodies, Carbono Zero) | "Un producto de" + logo | `variant="product"` |
| mundacasolutions.com | _no lleva_ (es la agencia) | — |

## Reglas

1. El **logo siempre se muestra** (no solo texto). `alt="Mundaca's Solutions"`, alto **2.75rem**, ancho automático
   (997 × 322).
2. Todo el bloque (texto + logo) enlaza a `https://mundacasolutions.com` con `target="_blank"` y
   `rel="noopener noreferrer"`.
3. Logo según el fondo del footer:
   - claro → `mundaca.png` (color; copia en `assets/mundaca.png`);
   - oscuro → blanco con contorno (`logo-mundacas-solutions.png` del repo mundaca-solutions; copia en
     `assets/mundaca-white.png`).
4. Ubicación fija: `FooterBar` (rejilla `1fr auto 1fr` desde 52rem; centrado y apilado en móvil). El crédito va
   en la columna derecha; la central es opcional (p. ej. "Pagos seguros con Transbank").
5. Misma altura y mismo aire en todos los sitios: no tocar `madeby.module.css` por proyecto.

## Cómo copiarlo a un proyecto

1. Copiar `MadeBy.tsx` y `madeby.module.css` a `src/components/layout/` y `assets/*.png` a `public/img/`.
2. En el footer, reemplazar la barra inferior por:

   ```tsx
   <FooterBar left={<p>© {year} Nombre del sitio. Todos los derechos reservados.</p>}>
     <MadeBy variant="client" tone="light" />
   </FooterBar>
   ```

3. Copiar `madeby.spec.ts` a `e2e/`, ajustar `EXPECTED_TEXT` y correrlo en escritorio y móvil.

## Qué verifica la prueba e2e

- el enlace existe dentro de `footer`, apunta a `https://mundacasolutions.com`, abre en pestaña nueva y tiene
  `noopener noreferrer`;
- la imagen carga (`naturalWidth > 0`), tiene `alt` y mide 2.75rem de alto;
- el nombre accesible es la frase completa ("Sitio web por Mundaca's Solutions");
- en escritorio el crédito queda en la columna derecha.
