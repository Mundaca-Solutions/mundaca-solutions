import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { Flow } from "@/components/ui/Flow";
import { LinkButton } from "@/components/ui/LinkButton";
import { Container, Section } from "@/components/ui/primitives";
import { products, productsIndex } from "@/content/products";
import { pageMetadata } from "@/lib/seo";
import styles from "@/components/sections/inner.module.css";

export const metadata: Metadata = pageMetadata({
  title: productsIndex.metaTitle,
  description: productsIndex.metaDescription,
  path: "/productos",
});

/** Portfolio: one wide row per product (logo + how it connects on one side, copy and actions on the other). */
export default function ProductsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Productos" }]}
        eyebrow={productsIndex.eyebrow}
        title={productsIndex.h1}
        lead={productsIndex.lead}
      />
      <Section tone="paper" className={styles.pageSection}>
        <Container>
          <Reveal as="ul" stagger className={styles.portfolio}>
            {products.map((product) => (
              <li key={product.slug} className={styles.row} data-product={product.tone}>
                <div className={styles.rowMedia}>
                  <div className={styles.logoStage}>
                    <Image
                      src={product.logo.src}
                      alt={`Logo de ${product.name}`}
                      width={product.logo.width}
                      height={product.logo.height}
                      sizes="(max-width: 48rem) 70vw, 320px"
                    />
                  </div>
                  <Flow
                    steps={product.flow.steps}
                    variant="compact"
                    cols={product.flow.steps.length >= 5 ? 5 : 4}
                    label={`${product.name}: cómo se conecta`}
                    className={styles.miniFlow}
                  />
                </div>
                <div className={styles.rowCopy}>
                  <span className={styles.rowEyebrow}>{product.indexCard.eyebrow}</span>
                  <h2>{product.name}</h2>
                  <p>{product.indexCard.text}</p>
                  <p className={styles.forWho}>
                    <strong>Para quién:</strong> {product.indexCard.forWho}
                  </p>
                  <div className={styles.rowActions}>
                    <LinkButton href={`/productos/${product.slug}`} icon="arrowRight">
                      {product.indexCard.hubLabel}
                    </LinkButton>
                    <LinkButton href={product.externalUrl} variant="secondary" icon="external">
                      {product.indexCard.visitLabel}
                    </LinkButton>
                  </div>
                </div>
              </li>
            ))}
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
