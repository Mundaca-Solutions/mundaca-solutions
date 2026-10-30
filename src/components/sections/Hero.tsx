import Image from "next/image";
import Link from "next/link";
import { hero } from "@/content/home";
import { products } from "@/content/products";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/icons";
import { LinkButton } from "@/components/ui/LinkButton";
import { Container } from "@/components/ui/primitives";
import styles from "./sections.module.css";

/**
 * Dark hero: copy on the left, the "productos propios" panel on the right. It is the only H1 of the home. The
 * header above is the same solid navy, so there is no seam between the two.
 */
export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title" data-surface="dark" id="inicio">
      <Container>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <span className={styles.heroEyebrow}>
              <Icon name="sparkles" size={15} /> {hero.eyebrow}
            </span>
            <h1 id="hero-title" className={styles.heroTitle}>
              {hero.titleStart}
              <em>{hero.titleEmphasis}</em>
            </h1>
            <p className={styles.heroLead}>{hero.lead}</p>
            <div className={styles.heroActions}>
              <LinkButton href={site.bookingUrl} icon="arrowRight">
                {hero.primaryCta}
              </LinkButton>
              <LinkButton href="/#productos" variant="ghostDark" icon="chevronRight">
                {hero.secondaryCta}
              </LinkButton>
            </div>
          </div>

          <aside className={styles.panel} aria-label="Productos propios">
            <div className={styles.panelTop}>
              <span>{hero.panel.label}</span>
              <p>{hero.panel.intro}</p>
            </div>
            <ul className={styles.panelProducts}>
              {products.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/productos/${product.slug}`}
                    className={styles.panelItem}
                  >
                    <span className={styles.logoWell}>
                      <Image
                        src={product.logo.src}
                        alt=""
                        width={product.logo.width}
                        height={product.logo.height}
                        sizes="180px"
                      />
                    </span>
                    <span className={styles.panelMeta}>
                      <strong>{product.name}</strong>
                      <span>{product.category}</span>
                      <small>{product.panelTagline}</small>
                    </span>
                    <Icon name="arrowRight" size={18} className={styles.panelArrow} />
                  </Link>
                </li>
              ))}
            </ul>
            <ol className={styles.panelFlow} aria-label="Cómo conectamos la operación">
              {hero.panel.flow.map((step) => (
                <li key={step.label}>{step.label}</li>
              ))}
            </ol>
          </aside>
        </div>
      </Container>
    </section>
  );
}
