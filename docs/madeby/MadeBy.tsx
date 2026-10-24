import Image from "next/image";
import type { ReactNode } from "react";
import styles from "./madeby.module.css";

/**
 * Agency credit — ONE component copied into every Mundaca's Solutions project (see README.md here).
 *
 *  - variant "client"  → "Sitio web por"  + logo   (client sites)
 *  - variant "product" → "Un producto de" + logo   (own products: Foodies, Carbono Zero)
 *  - tone "light"      → colour logo (mundaca.png, 997×322) on light footers
 *  - tone "dark"       → white logo with outline (logo-mundacas-solutions.png) on dark footers
 *
 * The logo is ALWAYS shown (never text alone), 2.75rem tall, width auto, and the whole block links to
 * https://mundacasolutions.com in a new tab.
 */
export type MadeByProps = {
  variant?: "client" | "product";
  tone?: "light" | "dark";
  /** Public path of each logo in the host project. */
  logoLight?: string;
  logoDark?: string;
};

export function MadeBy({
  variant = "client",
  tone = "light",
  logoLight = "/img/mundaca.png",
  logoDark = "/img/mundaca-white.png",
}: MadeByProps) {
  return (
    <p className={styles.madeBy}>
      <a
        className={styles.link}
        href="https://mundacasolutions.com"
        target="_blank"
        rel="noopener noreferrer"
        data-madeby={variant}
      >
        <span>{variant === "product" ? "Un producto de" : "Sitio web por"}</span>
        <Image
          src={tone === "dark" ? logoDark : logoLight}
          alt="Mundaca's Solutions"
          width={997}
          height={322}
        />
      </a>
    </p>
  );
}

/**
 * Bottom bar of every footer: copyright on the left, an optional middle slot (payment badge, etc.) and
 * the agency credit in the right column. Grid 1fr auto 1fr from 52rem; centred and stacked on phones.
 */
export function FooterBar({ left, center, children }: { left: ReactNode; center?: ReactNode; children: ReactNode }) {
  return (
    <div className={styles.bar}>
      <div className={styles.barLeft}>{left}</div>
      <div className={styles.barCenter}>{center}</div>
      <div className={styles.barRight}>{children}</div>
    </div>
  );
}
