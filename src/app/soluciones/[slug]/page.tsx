import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { solutionCards, problems } from "@/content/home";
import { products } from "@/content/products";
import { solutionBySlug, solutions } from "@/content/solutions";
import { Reveal } from "@/components/motion/Reveal";
import { MethodSection } from "@/components/sections/HomeSections";
import { PageHero } from "@/components/sections/PageHero";
import { Icon } from "@/components/ui/icons";
import { LinkButton } from "@/components/ui/LinkButton";
import { Container } from "@/components/ui/primitives";
import { pageMetadata } from "@/lib/seo";
import styles from "@/components/sections/pages.module.css";

type Params = { slug: string };

/** Only the three slugs in content/solutions.ts exist; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const solution = solutionBySlug(slug);
  if (!solution) return {};
  return pageMetadata({
    title: solution.metaTitle,
    description: solution.metaDescription,
    path: `/soluciones/${solution.slug}`,
  });
}

export default async function SolutionPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const solution = solutionBySlug(slug);
  if (!solution) notFound();

  const cards = solutionCards.filter((card) => card.slug === solution.slug);
  // A broken reference in content/solutions.ts must fail the build, not silently drop a section.
  const solved = solution.problemIndexes.map((index) => {
    const problem = problems[index];
    if (!problem) throw new Error(`content/solutions.ts: ${solution.slug} apunta al problema ${index}, que no existe`);
    return problem;
  });

  return (
    <>
      <PageHero
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Soluciones" }, { label: solution.breadcrumb }]}
        eyebrow={solution.eyebrow}
        title={solution.h1}
        lead={solution.lead}
      />

      <div className={styles.page}>
        <Container>
          <section className={styles.block}>
            <h2>{solution.sectionTitle}</h2>
            <p>{solution.sectionText}</p>
            <div className={styles.ctaRow}>
              <LinkButton href="/contacto" size="lg" icon="arrowRight">
                {solution.ctaLabel}
              </LinkButton>
            </div>
          </section>

          {cards.length > 0 ? (
            <>
              <h2 className={styles.subHeading}>Qué hacemos</h2>
              <Reveal as="ul" stagger className={`${styles.cardGrid} ${styles.two}`}>
                {cards.map((card) => (
                  <li key={card.title} className={styles.card}>
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                    <ul className={styles.list}>
                      {card.bullets.map((bullet) => (
                        <li key={bullet}>
                          <Icon name="check" size={17} /> {bullet}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </Reveal>
            </>
          ) : null}

          {solved.length > 0 ? (
            <>
              <h2 className={styles.subHeading}>El problema que resuelve</h2>
              <Reveal as="ul" stagger className={`${styles.cardGrid} ${styles.two}`}>
                {solved.map((problem) => (
                  <li key={problem.title} className={styles.card}>
                    <h3>{problem.title}</h3>
                    <p>{problem.text}</p>
                  </li>
                ))}
              </Reveal>
            </>
          ) : null}

          {solution.showProducts ? (
            <>
              <h2 className={styles.subHeading}>La inteligencia operacional ya está en nuestros productos</h2>
              <Reveal as="ul" stagger className={`${styles.cardGrid} ${styles.two}`}>
                {products.map((product) => (
                  <li key={product.slug} className={styles.card}>
                    <h3>{product.name}</h3>
                    <p>{product.proof}</p>
                    <div className={styles.cardActions}>
                      <Link className={styles.textLink} href={`/productos/${product.slug}`}>
                        Ver {product.name} <Icon name="arrowRight" size={16} />
                      </Link>
                    </div>
                  </li>
                ))}
              </Reveal>
            </>
          ) : null}
        </Container>
      </div>

      <MethodSection compact />
    </>
  );
}
