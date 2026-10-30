import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { solutionCards, problems } from "@/content/home";
import { products } from "@/content/products";
import { solutionBySlug, solutions } from "@/content/solutions";
import { Reveal } from "@/components/motion/Reveal";
import { MethodSection } from "@/components/sections/HomeSections";
import { PageHero } from "@/components/sections/PageHero";
import { SolutionVisual } from "@/components/sections/SolutionVisual";
import { CtaBand } from "@/components/ui/CtaBand";
import { Icon } from "@/components/ui/icons";
import { Container, Section } from "@/components/ui/primitives";
import { pageMetadata } from "@/lib/seo";
import styles from "@/components/sections/inner.module.css";

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

/** Solution page: the idea in one picture, what we do, the problem it answers, the method, one closing action. */
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

      <Section tone="white" labelledBy="solucion-titulo" className={styles.pageSection}>
        <Container>
          <Reveal className={styles.intro}>
            <h2 id="solucion-titulo">{solution.sectionTitle}</h2>
            <p>{solution.sectionText}</p>
          </Reveal>
          <SolutionVisual visual={solution.visual} />
        </Container>
      </Section>

      <Section tone="paper" labelledBy="solucion-hacemos" className={styles.pageSection}>
        <Container>
          <div className={styles.doSolve}>
            {cards.length > 0 ? (
              <Reveal className={styles.doColumn}>
                <h2 id="solucion-hacemos">Qué hacemos</h2>
                <ul>
                  {cards.map((card) => (
                    <li key={card.title}>
                      <span className={styles.node}>
                        <Icon name={card.icon} size={21} />
                      </span>
                      <div>
                        <h3>{card.title}</h3>
                        <p>{card.text}</p>
                        <ul className={styles.checks}>
                          {card.bullets.map((bullet) => (
                            <li key={bullet}>
                              <Icon name="check" size={15} /> {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}
            {solved.length > 0 ? (
              <Reveal className={styles.solveColumn} delay={80}>
                <h2>El problema que resuelve</h2>
                <ul>
                  {solved.map((problem) => (
                    <li key={problem.title}>
                      <span className={styles.nodeDark}>
                        <Icon name={problem.icon} size={21} />
                      </span>
                      <div>
                        <h3>{problem.title}</h3>
                        <p>{problem.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}
          </div>
        </Container>
      </Section>

      {solution.showProducts ? (
        <Section tone="white" labelledBy="solucion-productos" className={styles.pageSection}>
          <Container>
            <Reveal className={styles.intro}>
              <h2 id="solucion-productos">La inteligencia operacional ya está en nuestros productos</h2>
            </Reveal>
            <Reveal as="ul" stagger className={styles.proofs}>
              {products.map((product) => (
                <li key={product.slug}>
                  <div className={styles.logoStage}>
                    <Image
                      src={product.logo.src}
                      alt={`Logo de ${product.name}`}
                      width={product.logo.width}
                      height={product.logo.height}
                      sizes="200px"
                    />
                  </div>
                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.proof}</p>
                    <Link className={styles.textLink} href={`/productos/${product.slug}`}>
                      Ver {product.name} <Icon name="arrowRight" size={16} />
                    </Link>
                  </div>
                </li>
              ))}
            </Reveal>
          </Container>
        </Section>
      ) : null}

      <MethodSection compact />

      <Section tone="white" className={styles.ctaSection}>
        <Container>
          <CtaBand title={solution.sectionTitle} href="/contacto" label={solution.ctaLabel} />
        </Container>
      </Section>
    </>
  );
}
