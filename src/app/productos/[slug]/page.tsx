import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { Icon } from "@/components/ui/icons";
import { ProductBoard } from "@/components/ui/ProductBoard";
import { Container, Section } from "@/components/ui/primitives";
import { productBySlug, products } from "@/content/products";
import { graph, pageMetadata, softwareApplicationSchema } from "@/lib/seo";
import styles from "@/components/sections/inner.module.css";

type Params = { slug: string };

/** Only the slugs in content/products.ts exist; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) return {};
  return pageMetadata({
    title: product.hub.metaTitle,
    description: product.hub.metaDescription,
    path: `/productos/${product.slug}`,
  });
}

/**
 * Product page: identity strip, the product's own diagram (what it connects), what it helps order and who it is for,
 * and one closing action. Each product keeps its own accent color (Foodies orange, Carbono Zero green).
 */
export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const [overview, closing] = product.hub.sections;
  const capabilities = overview?.cards?.find((card) => card.list);
  const audience = overview?.cards?.find((card) => card.text);

  return (
    <div data-product={product.tone}>
      <JsonLd data={graph(softwareApplicationSchema(product))} />
      <PageHero
        crumbs={[
          { label: "Inicio", href: "/" },
          { label: "Productos", href: "/productos" },
          { label: product.hub.breadcrumb },
        ]}
        eyebrow={product.hub.eyebrow}
        title={product.hub.h1}
        lead={product.hub.lead}
      />

      <Section tone="white" labelledBy="producto-flujo" className={styles.pageSection}>
        <Container>
          <Reveal className={styles.identity}>
            <div className={styles.logoStage}>
              <Image
                src={product.logo.src}
                alt={`Logo de ${product.name}`}
                width={product.logo.width}
                height={product.logo.height}
                sizes="(max-width: 48rem) 70vw, 260px"
              />
            </div>
            <div className={styles.identityCopy}>
              <small>{product.category}</small>
              <strong>{product.impact}</strong>
              <ul className={styles.chips}>
                {product.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </Reveal>

          {overview ? (
            <Reveal className={styles.intro}>
              <h2 id="producto-flujo">{overview.title}</h2>
              <p>{overview.text}</p>
            </Reveal>
          ) : null}

          <ProductBoard product={product} intro={product.flow.intro} />
        </Container>
      </Section>

      {capabilities || audience ? (
        <Section tone="paper" labelledBy="producto-capacidades" className={styles.pageSection}>
          <Container>
            <div className={styles.caps}>
              {capabilities ? (
                <Reveal className={styles.capList}>
                  <h2 id="producto-capacidades">{capabilities.title}</h2>
                  <ul>
                    {capabilities.list?.map((item) => (
                      <li key={item}>
                        <Icon name="checkCircle" size={20} /> {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ) : null}
              {audience ? (
                <Reveal className={styles.capNote} delay={80}>
                  <h2>{audience.title}</h2>
                  <p>{audience.text}</p>
                </Reveal>
              ) : null}
            </div>
          </Container>
        </Section>
      ) : null}

      {closing?.cta ? (
        <Section tone="white" className={styles.ctaSection}>
          <Container>
            <CtaBand
              kicker={closing.title}
              title={closing.text}
              href={product.externalUrl}
              label={closing.cta.label}
              icon="external"
            />
            <p className={styles.backRow}>
              <Link href="/productos">
                <Icon name="arrowLeft" size={16} /> Volver a productos
              </Link>
            </p>
          </Container>
        </Section>
      ) : null}
    </div>
  );
}
