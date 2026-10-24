import Image from "next/image";
import { hero } from "@/content/home";
import { products } from "@/content/products";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/icons";
import { LinkButton } from "@/components/ui/LinkButton";
import { Container } from "@/components/ui/primitives";
import styles from "./sections.module.css";

/** Dark hero with a wave into the page and the "productos propios" panel. The only H1 of the home. */
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
              <LinkButton href={site.bookingUrl} size="lg" icon="arrowRight">
                {hero.primaryCta}
              </LinkButton>
              <LinkButton href="/#productos" variant="ghostDark" size="lg" icon="chevronRight">
                {hero.secondaryCta}
              </LinkButton>
            </div>
            <ul className={styles.heroTrust}>
              {hero.trust.map((item) => (
                <li key={item.label}>
                  <Icon name={item.icon} size={17} /> {item.label}
                </li>
              ))}
            </ul>
          </div>

          <aside className={styles.panel} aria-label="Productos propios">
            <div className={styles.panelTop}>
              <span>{hero.panel.label}</span>
            </div>
            <p className={styles.panelIntro}>{hero.panel.intro}</p>
            <ul className={styles.panelProducts}>
              {products.map((product) => (
                <li key={product.slug} className={styles.panelItem}>
                  <div className={styles.logoWell}>
                    <Image
                      src={product.logo.src}
                      alt=""
                      width={product.logo.width}
                      height={product.logo.height}
                      sizes="140px"
                    />
                  </div>
                  <div className={styles.panelMeta}>
                    <strong>{product.name}</strong>
                    <span>{product.category}</span>
                    <small>{product.panelTagline}</small>
                  </div>
                </li>
              ))}
            </ul>
            <div className={styles.panelFlow} aria-hidden="true">
              {hero.panel.flow.map((step, index) => (
                <span key={step.label} className={styles.panelFlowStep}>
                  {index > 0 ? <Icon name="chevronRight" size={13} /> : null}
                  <span>{step.label}</span>
                </span>
              ))}
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
