import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { Icon } from "@/components/ui/icons";
import { LinkButton } from "@/components/ui/LinkButton";
import { Container } from "@/components/ui/primitives";
import { productBySlug, products } from "@/content/products";
import { graph, pageMetadata, softwareApplicationSchema } from "@/lib/seo";
import homeStyles from "@/components/sections/sections.module.css";
import styles from "@/components/sections/pages.module.css";

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

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  return (
    <>
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

      <div className={styles.page}>
        <Container>
          <Reveal className={styles.productStrip}>
            <div className={homeStyles.logoWell}>
              <Image
                src={product.logo.src}
                alt={`Logo de ${product.name}`}
                width={product.logo.width}
                height={product.logo.height}
                sizes="180px"
              />
            </div>
            <div className={styles.productStripCopy}>
              <small>{product.category}</small>
              <strong>{product.impact}</strong>
              <ul className={homeStyles.tags}>
                {product.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </Reveal>

          {product.hub.sections.map((section) => (
            <section key={section.title}>
              <div className={styles.block}>
                <h2>{section.title}</h2>
                <p>{section.text}</p>
              </div>

              {section.cards ? (
                <Reveal as="ul" stagger className={`${styles.cardGrid} ${styles.two}`}>
                  {section.cards.map((card) => (
                    <li key={card.title} className={styles.card}>
                      <h3>{card.title}</h3>
                      {card.list ? (
                        <ul className={styles.list}>
                          {card.list.map((item) => (
                            <li key={item}>
                              <Icon name="check" size={17} /> {item}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      {card.text ? <p>{card.text}</p> : null}
                    </li>
                  ))}
                </Reveal>
              ) : null}

              {section.cta ? (
                <div className={`${styles.block} ${styles.ctaRow}`}>
                  <LinkButton href={product.externalUrl} size="lg" icon="external">
                    {section.cta.label}
                  </LinkButton>
                  {product.slug === "foodies" ? (
                    <Link className={styles.textLink} href="/#cafetal">
                      Ver el caso Cafetal <Icon name="arrowRight" size={16} />
                    </Link>
                  ) : null}
                  <Link className={styles.textLink} href="/productos">
                    <Icon name="arrowLeft" size={16} /> Volver a productos
                  </Link>
                </div>
              ) : null}
            </section>
          ))}
        </Container>
      </div>
    </>
  );
}
