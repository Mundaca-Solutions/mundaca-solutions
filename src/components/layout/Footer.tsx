import Image from "next/image";
import Link from "next/link";
import { contactEmail, isExternalHref, legalLinks, site } from "@/content/site";
import { solutions } from "@/content/solutions";
import { products } from "@/content/products";
import { Container } from "@/components/ui/primitives";
import styles from "./layout.module.css";

export function Footer() {
  return (
    <footer className={styles.footer} data-surface="dark">
      <Container>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <Link href="/" aria-label="Mundaca's Solutions, inicio" className={styles.footerLogo}>
              <Image src={site.logoOnDark} alt="Mundaca's Solutions" width={1381} height={364} sizes="220px" />
            </Link>
            <p>{site.tagline}</p>
          </div>

          <nav aria-labelledby="footer-products">
            <h2 id="footer-products" className={styles.footerTitle}>
              Productos
            </h2>
            <ul className={styles.footerList}>
              <li>
                <Link href="/productos">Todos los productos</Link>
              </li>
              {products.map((product) => (
                <li key={product.slug}>
                  <Link href={`/productos/${product.slug}`}>{product.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-solutions">
            <h2 id="footer-solutions" className={styles.footerTitle}>
              Soluciones
            </h2>
            <ul className={styles.footerList}>
              {solutions.map((solution) => (
                <li key={solution.slug}>
                  <Link href={`/soluciones/${solution.slug}`}>{solution.navLabel}</Link>
                </li>
              ))}
              <li>
                <Link href="/#metodo">Cómo trabajamos</Link>
              </li>
              <li>
                <Link href="/conocimiento">Conocimiento</Link>
              </li>
            </ul>
          </nav>

          <nav aria-labelledby="footer-contact">
            <h2 id="footer-contact" className={styles.footerTitle}>
              Contacto
            </h2>
            <ul className={styles.footerList}>
              {isExternalHref(site.bookingUrl) ? (
                <li>
                  <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
                    Agendar conversación
                  </a>
                </li>
              ) : null}
              <li>
                <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              </li>
              <li>
                <Link href="/contacto">Página de contacto</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.footerBottom}>
          <p>
            &copy; {new Date().getFullYear()} {site.legalName}. {site.city}.
          </p>
          <ul className={styles.footerLegal} aria-label="Legales">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
