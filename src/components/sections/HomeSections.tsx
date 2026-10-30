import Image from "next/image";
import Link from "next/link";
import {
  aiLayers,
  foodiesDemo,
  methodSection,
  methodSteps,
  partner,
  principle,
  problems,
  problemsSection,
  productsSection,
  solutionCards,
  solutionsSection,
} from "@/content/home";
import { productBySlug, products } from "@/content/products";
import { resultColumns, resultsSection, visibleResults } from "@/content/results";
import { solutions } from "@/content/solutions";
import clsx from "@/lib/clsx";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/ui/CtaBand";
import { Flow } from "@/components/ui/Flow";
import { Icon } from "@/components/ui/icons";
import { LinkButton } from "@/components/ui/LinkButton";
import { ProductBoard } from "@/components/ui/ProductBoard";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import styles from "./sections.module.css";

/** Productos propios: two equal-height product cards, one primary action each. */
export function ProductsSection() {
  return (
    <Section id="productos" tone="paper" labelledBy="productos-title">
      <Container>
        <SectionHeading
          id="productos-title"
          eyebrow={productsSection.eyebrow}
          title={productsSection.title}
          text={productsSection.text}
        />
        <Reveal as="ul" stagger className={styles.productGrid}>
          {products.map((product) => (
            <li key={product.slug} className={styles.productCard} data-product={product.tone}>
              <small className={styles.productCategory}>{product.category}</small>
              {/* The logo already says the name: it is the card's heading (its alt text is the heading's name). */}
              <h3 className={styles.productLogo}>
                <Link href={`/productos/${product.slug}`}>
                  <Image
                    src={product.logo.src}
                    alt={product.name}
                    width={product.logo.width}
                    height={product.logo.height}
                    sizes="(max-width: 52rem) 70vw, 280px"
                  />
                </Link>
              </h3>
              <p className={styles.productText}>{product.text}</p>
              <p className={styles.productImpact}>{product.impact}</p>
              <div className={styles.productActions}>
                <LinkButton href={`/productos/${product.slug}`} icon="arrowRight">
                  {product.ctaLabel}
                </LinkButton>
              </div>
            </li>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}

/**
 * Foodies en acción: the product's real modules (content/products.ts) drawn as one connected operation. No
 * client, figure or screenshot is invented: it shows what the product declares it does and how the parts connect.
 */
export function FoodiesDemoSection() {
  const foodies = productBySlug("foodies");
  if (!foodies) throw new Error("content/products.ts: falta el producto Foodies");

  return (
    <Section id="foodies" tone="white" labelledBy="foodies-title">
      <Container>
        <SectionHeading
          id="foodies-title"
          eyebrow={foodiesDemo.eyebrow}
          title={foodiesDemo.title}
          text={foodiesDemo.text}
        />
        <ProductBoard product={foodies} showHead forLabel={foodiesDemo.forLabel} forItems={foodiesDemo.forItems} />
      </Container>
    </Section>
  );
}

/** Principio: eight steps with icons, joined by arrows (a vertical journey on phones). */
export function PrincipleSection() {
  return (
    <Section id="principio" tone="dark" labelledBy="principio-title">
      <Container>
        <SectionHeading id="principio-title" eyebrow={principle.eyebrow} title={principle.title} onDark />
        <Reveal>
          <Flow steps={principle.steps} cols={8} tone="dark" numbered align="center" label="Nuestro principio, paso a paso" />
        </Reveal>
        <Reveal className={styles.principleNote} delay={100}>
          <p>{principle.note}</p>
        </Reveal>
      </Container>
    </Section>
  );
}

/** Inteligencia artificial: processes, information, context and decisions first; AI as the enabling technology. */
export function AiLayersSection() {
  return (
    <Section id="ia" tone="white" labelledBy="ia-title">
      <Container>
        <div className={styles.aiHead}>
          <Reveal className={styles.aiCopy}>
            <span className={styles.aiEyebrow}>{aiLayers.eyebrow}</span>
            <h2 id="ia-title">{aiLayers.title}</h2>
          </Reveal>
          <Reveal className={styles.aiText} delay={80}>
            <p>{aiLayers.text}</p>
          </Reveal>
        </div>
        <Reveal>
          <Flow steps={aiLayers.chain} cols={4} label="De los procesos a las decisiones" className={styles.aiChain} />
        </Reveal>
        <Reveal className={styles.enabler} delay={80}>
          <span className={styles.enablerIcon}>
            <Icon name="sparkles" size={22} />
          </span>
          <div>
            <small>{aiLayers.enabler.label}</small>
            <strong>{aiLayers.enabler.title}</strong>
          </div>
          <p>{aiLayers.enabler.text}</p>
        </Reveal>
      </Container>
    </Section>
  );
}

/**
 * Problems: one connected system. The four frictions are equal rows inside ONE container that ends in the outcome;
 * the intro (title, text, call to action) stays in view (sticky) while the rows scroll by.
 */
export function ProblemsSection() {
  return (
    <Section id="problemas" tone="paper" labelledBy="problemas-title">
      <Container>
        <div className={styles.methodLayout}>
          <Reveal className={styles.methodIntro}>
            <span className={styles.aiEyebrow}>{problemsSection.eyebrow}</span>
            <h2 id="problemas-title">{problemsSection.title}</h2>
            <p>{problemsSection.text}</p>
            <div className={styles.quietCta}>
              <p>
                <small>{problemsSection.cta.kicker}</small>
                <strong>{problemsSection.cta.title}</strong>
              </p>
              <LinkButton href="/#contacto" variant="secondary" icon="arrowRight">
                {problemsSection.cta.label}
              </LinkButton>
            </div>
          </Reveal>
          <Reveal className={styles.problemSystem} delay={80}>
            <ul className={styles.problemRows}>
              {problems.map((problem) => (
                <li key={problem.title} className={styles.problemRow}>
                  <span className={styles.node}>
                    <Icon name={problem.icon} size={22} />
                  </span>
                  <div>
                    <h3>{problem.title}</h3>
                    <p>{problem.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className={styles.converge}>
              <span className={styles.convergeIcon}>
                <Icon name="link" size={22} />
              </span>
              <p>
                <strong>{problemsSection.outcome.title}</strong>
                <span>{problemsSection.outcome.text}</span>
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/** Soluciones (dark): one connected board of four capabilities + links to the three solution pages. */
export function SolutionsSection() {
  return (
    <Section id="soluciones" tone="dark" labelledBy="soluciones-title">
      <Container>
        <SectionHeading
          id="soluciones-title"
          eyebrow={solutionsSection.eyebrow}
          title={solutionsSection.title}
          text={solutionsSection.text}
          onDark
        />
        <Reveal as="ul" stagger className={styles.solutionBoard}>
          {solutionCards.map((card) => (
            <li key={card.title} className={styles.solutionCell}>
              <span className={styles.nodeDark}>
                <Icon name={card.icon} size={22} />
              </span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <ul className={styles.bullets}>
                {card.bullets.map((bullet) => (
                  <li key={bullet}>
                    <Icon name="check" size={15} /> {bullet}
                  </li>
                ))}
              </ul>
              <Link className={styles.cardLink} href={`/soluciones/${card.slug}`}>
                Ver más <Icon name="arrowRight" size={16} />
              </Link>
            </li>
          ))}
        </Reveal>

        <Reveal className={styles.solutionPages}>
          <p>{solutionsSection.pagesLabel}</p>
          <ul>
            {solutions.map((solution) => (
              <li key={solution.slug}>
                <Link href={`/soluciones/${solution.slug}`}>
                  {solution.navLabel} <Icon name="arrowRight" size={16} />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className={styles.solutionCta}>
          <CtaBand
            kicker={solutionsSection.cta.kicker}
            title={solutionsSection.cta.title}
            href="/#contacto"
            label={solutionsSection.cta.label}
          />
        </div>
      </Container>
    </Section>
  );
}

/** Método: four stages on a vertical rail. Also reused by the solution pages. */
export function MethodSection({ compact = false }: { compact?: boolean }) {
  return (
    <Section id="metodo" tone={compact ? "paper" : "white"} labelledBy="metodo-title">
      <Container>
        <div className={styles.methodLayout}>
          <Reveal className={styles.methodIntro}>
            <span className={styles.aiEyebrow}>{methodSection.eyebrow}</span>
            <h2 id="metodo-title">{methodSection.title}</h2>
            <p>{methodSection.text}</p>
            <div className={styles.promise}>
              <Icon name="shield" size={24} />
              <span>
                <strong>{methodSection.promise.title}</strong>
                <small>{methodSection.promise.text}</small>
              </span>
            </div>
          </Reveal>
          <Reveal className={styles.methodRail} delay={80}>
            <Flow
              steps={methodSteps.map((step) => ({
                icon: step.icon,
                title: step.title,
                text: step.text,
                meta: step.deliverable,
              }))}
              variant="rail"
              numbered
              label="Etapas del trabajo"
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/** Socio tecnológico: compact attribute list on the left, the problem-to-result path on the right. */
export function PartnerSection() {
  return (
    <Section id="socio" tone="paper" labelledBy="socio-title">
      <Container>
        <div className={styles.partnerLayout}>
          <Reveal className={styles.partnerCopy}>
            <span className={styles.aiEyebrow}>{partner.eyebrow}</span>
            <h2 id="socio-title">{partner.title}</h2>
            <p>{partner.text}</p>
            <ul className={styles.values}>
              {partner.values.map((value) => (
                <li key={value.title}>
                  <span className={styles.nodeSm}>
                    <Icon name={value.icon} size={19} />
                  </span>
                  <div>
                    <strong>{value.title}</strong>
                    <span>{value.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className={styles.partnerCard} delay={100}>
            <div data-surface="dark" className={styles.partnerCardInner}>
              <small>{partner.card.kicker}</small>
              <strong>{partner.card.title}</strong>
              <Flow steps={partner.card.flow} variant="rail" tone="dark" label="De problema a resultado" />
              <div className={styles.partnerResult}>
                <small>{partner.card.resultKicker}</small>
                <strong>{partner.card.resultTitle}</strong>
                <ul>
                  {partner.card.resultChips.map((chip) => (
                    <li key={chip}>
                      <Icon name="check" size={13} /> {chip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/**
 * Resultados: systems delivered to clients. It only draws sites that are live AND authorized by the owner
 * (content/results.ts); while there are none the whole section is omitted instead of showing an empty or invented one.
 */
export function ResultsSection() {
  if (visibleResults.length === 0) return null;
  const columns = resultColumns(visibleResults.length);

  return (
    <Section id="resultados" tone="white" labelledBy="resultados-title">
      <Container>
        <SectionHeading
          id="resultados-title"
          eyebrow={resultsSection.eyebrow}
          title={resultsSection.title}
          emphasis={resultsSection.emphasis}
          text={resultsSection.text}
        />
        <Reveal
          as="ul"
          stagger
          className={clsx(styles.resultGrid, styles[`resultDesktop${columns.desktop}`], columns.tablet === 2 && styles.resultTablet2)}
        >
          {visibleResults.map((card) => (
            <li key={card.slug} className={styles.resultCard} data-result={card.slug}>
              {card.image ? (
                <div className={styles.resultShot}>
                  <Image src={card.image.src} alt={card.image.alt} width={card.image.width} height={card.image.height} sizes="(max-width: 48rem) 90vw, 380px" />
                </div>
              ) : null}
              <h3>{card.name}</h3>
              <p className={styles.resultRubro}>{card.rubro}</p>
              <p className={styles.resultSolved}>{card.solved}</p>
              <div className={styles.resultAction}>
                <LinkButton href={card.url} icon="external" aria-label={`${resultsSection.visitLabel}: ${card.name}`}>
                  {resultsSection.visitLabel}
                </LinkButton>
              </div>
            </li>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
