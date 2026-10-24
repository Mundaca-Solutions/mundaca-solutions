import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { LinkButton } from "@/components/ui/LinkButton";
import { Container } from "@/components/ui/primitives";
import { products, productsIndex } from "@/content/products";
import { pageMetadata } from "@/lib/seo";
import styles from "@/components/sections/pages.module.css";

export const metadata: Metadata = pageMetadata({
  title: productsIndex.metaTitle,
  description: productsIndex.metaDescription,
  path: "/productos",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Productos" }]}
        eyebrow={productsIndex.eyebrow}
        title={productsIndex.h1}
        lead={productsIndex.lead}
      />
      <div className={styles.page}>
        <Container>
          <Reveal as="ul" stagger className={`${styles.cardGrid} ${styles.two}`}>
            {products.map((product) => (
              <li key={product.slug} className={styles.card}>
                <span className={styles.cardEyebrow}>{product.indexCard.eyebrow}</span>
                <h2>{product.name}</h2>
                <p>{product.indexCard.text}</p>
                <p className={styles.forWho}>
                  <strong>Para quién:</strong> {product.indexCard.forWho}
                </p>
                <div className={styles.cardActions}>
                  <LinkButton href={`/productos/${product.slug}`} variant="secondary" icon="arrowRight">
                    {product.indexCard.hubLabel}
                  </LinkButton>
                  <LinkButton href={product.externalUrl} icon="external">
                    {product.indexCard.visitLabel}
                  </LinkButton>
                </div>
              </li>
            ))}
          </Reveal>
        </Container>
      </div>
    </>
  );
}
