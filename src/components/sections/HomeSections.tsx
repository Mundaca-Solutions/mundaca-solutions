import Image from "next/image";
import Link from "next/link";
import {
  aiLayers,
  cafetal,
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
import { products } from "@/content/products";
import { resultColumns, resultsSection, visibleResults } from "@/content/results";
import { solutions } from "@/content/solutions";
import clsx from "@/lib/clsx";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/icons";
import { LinkButton } from "@/components/ui/LinkButton";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import styles from "./sections.module.css";

/** Productos propios: two equal-height cards (Foodies, Carbono Zero). */
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
          {products.map((product, index) => (
            <li key={product.slug} className={`${styles.productCard} ${styles[`tone_${product.tone}`]}`}>
              <Link
                className={styles.productLogoLink}
                href={`/productos/${product.slug}`}
                aria-label={`Ver la página de ${product.name}`}
              >
                <Image
                  src={product.logo.src}
                  alt={`Logo de ${product.name}`}
                  width={product.logo.width}
                  height={product.logo.height}
                  sizes="(max-width: 52rem) 80vw, 360px"
                />
              </Link>
              <div className={styles.productBody}>
                <div className={styles.productTop}>
                  <small className={styles.productCategory}>{product.category}</small>
                  <span className={styles.productIndex}>0{index + 1}</span>
                </div>
                <h3>{product.name}</h3>
                <p>{product.text}</p>
                <strong className={styles.productImpact}>
                  <Icon name="sparkles" size={16} /> {product.impact}
                </strong>
                <ul className={styles.tags}>
                  {product.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.productActions}>
                <LinkButton href={product.externalUrl} icon="external">
                  {product.ctaLabel}
                </LinkButton>
                <Link className={styles.productTextLink} href={`/productos/${product.slug}`}>
                  Ver la página de {product.name} <Icon name="arrowRight" size={16} />
                </Link>
              </div>
            </li>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}

/** Caso real Cafetal: three stages of one connected operation. */
export function CafetalSection() {
  return (
    <Section id="cafetal" tone="deep" labelledBy="cafetal-title">
      <Container>
        <SectionHeading id="cafetal-title" eyebrow={cafetal.eyebrow} title={cafetal.title} text={cafetal.text} />
        <Reveal className={styles.caseCard}>
          <div className={styles.caseMeta}>
            <span className={styles.caseTag}>{cafetal.tag}</span>
            <span className={styles.caseProduct}>
              <Icon name="sparkles" size={14} /> {cafetal.product}
            </span>
          </div>
          <ol className={styles.caseStages}>
            {cafetal.stages.map((stage) => (
              <li key={stage.title} className={styles.caseStage}>
                <span className={styles.caseStageIndex}>{stage.index}</span>
                <h3>{stage.title}</h3>
                <ul>
                  {stage.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <p className={styles.caseImpact}>
            <Icon name="check" size={17} /> {cafetal.impact}
          </p>
          <div className={styles.caseAction}>
            <LinkButton href={products[0].externalUrl} icon="external">
              {cafetal.ctaLabel}
            </LinkButton>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/** Principio: eight steps as a paired 4 + 4 grid. */
export function PrincipleSection() {
  return (
    <Section id="principio" tone="dark" labelledBy="principio-title">
      <Container>
        <SectionHeading id="principio-title" eyebrow={principle.eyebrow} title={principle.title} onDark />
        <Reveal as="ol" stagger className={styles.principleGrid}>
          {principle.steps.map((step, index) => (
            <li key={step} className={styles.principleStep}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step}</strong>
            </li>
          ))}
        </Reveal>
        <Reveal className={styles.principleNote} delay={100}>
          <p>{principle.note}</p>
        </Reveal>
      </Container>
    </Section>
  );
}

/** Inteligencia artificial en capas: structure first, intelligence after. */
export function AiLayersSection() {
  return (
    <Section id="ia" tone="white" labelledBy="ia-title">
      <Container>
        <div className={styles.aiLayout}>
          <Reveal className={styles.aiCopy}>
            <span className={styles.aiEyebrow}>{aiLayers.eyebrow}</span>
            <h2 id="ia-title">{aiLayers.title}</h2>
            <p>{aiLayers.text}</p>
          </Reveal>
          <Reveal as="ol" stagger className={styles.aiStack} delay={80}>
            {[...aiLayers.layers].reverse().map((layer) => (
              <li key={layer.title} className={layer.index === "Capa 4" ? styles.aiTop : undefined}>
                <small>{layer.index}</small>
                <strong>{layer.title}</strong>
                <span>{layer.note}</span>
              </li>
            ))}
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/** Problems: a paired grid of four. */
export function ProblemsSection() {
  return (
    <Section id="problemas" tone="paper" labelledBy="problemas-title">
      <Container>
        <SectionHeading
          id="problemas-title"
          eyebrow={problemsSection.eyebrow}
          title={problemsSection.title}
          text={problemsSection.text}
        />
        <Reveal as="ul" stagger className={styles.problemGrid}>
          {problems.map((problem, index) => (
            <li key={problem.title} className={styles.problemCard}>
              <div className={styles.cardHead}>
                <span className={styles.iconTile}>
                  <Icon name={problem.icon} size={22} />
                </span>
                <small>0{index + 1}</small>
              </div>
              <h3>{problem.title}</h3>
              <p>{problem.text}</p>
            </li>
          ))}
        </Reveal>
        <Reveal className={styles.inlineCta}>
          <div>
            <small>{problemsSection.cta.kicker}</small>
            <strong>{problemsSection.cta.title}</strong>
          </div>
          <LinkButton href="/#contacto" icon="arrowRight">
            {problemsSection.cta.label}
          </LinkButton>
        </Reveal>
      </Container>
    </Section>
  );
}

/** Soluciones (dark): four cards in a 2 × 2 grid + links to the three solution pages. */
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
        <Reveal as="ul" stagger className={styles.solutionGrid}>
          {solutionCards.map((card, index) => (
            <li key={card.title} className={styles.solutionCard}>
              <div className={styles.cardHead}>
                <span className={styles.iconTileDark}>
                  <Icon name={card.icon} size={22} />
                </span>
                <small>0{index + 1}</small>
              </div>
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

        <Reveal className={styles.solutionCta}>
          <div>
            <span>{solutionsSection.cta.kicker}</span>
            <strong>{solutionsSection.cta.title}</strong>
          </div>
          <LinkButton href="/#contacto" variant="lightOnDark" icon="arrowRight">
            {solutionsSection.cta.label}
          </LinkButton>
        </Reveal>
      </Container>
    </Section>
  );
}

/** Método: four steps. Also reused by the solution pages. */
export function MethodSection({ compact = false }: { compact?: boolean }) {
  return (
    <Section id="metodo" tone={compact ? "white" : "paper"} labelledBy="metodo-title">
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
          <Reveal as="ol" stagger className={styles.methodSteps}>
            {methodSteps.map((step, index) => (
              <li key={step.title} className={styles.methodStep}>
                <span className={styles.stepNumber}>0{index + 1}</span>
                <span className={styles.iconTile}>
                  <Icon name={step.icon} size={21} />
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                  <small>
                    <Icon name="check" size={14} /> {step.deliverable}
                  </small>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/** Socio tecnológico (dark): four values + the problem-to-result path. */
export function PartnerSection() {
  return (
    <Section id="socio" tone="dark" labelledBy="socio-title">
      <Container>
        <div className={styles.partnerLayout}>
          <Reveal className={styles.partnerCopy}>
            <span className={styles.partnerEyebrow}>{partner.eyebrow}</span>
            <h2 id="socio-title">{partner.title}</h2>
            <p>{partner.text}</p>
            <ul className={styles.values}>
              {partner.values.map((value) => (
                <li key={value.title}>
                  <Icon name={value.icon} size={20} />
                  <div>
                    <strong>{value.title}</strong>
                    <span>{value.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className={styles.partnerCard} delay={100}>
            <small>{partner.card.kicker}</small>
            <strong>{partner.card.title}</strong>
            <ol className={styles.partnerFlow}>
              {partner.card.flow.map((step) => (
                <li key={step.label}>
                  <Icon name={step.icon} size={21} />
                  {step.label}
                </li>
              ))}
            </ol>
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
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/**
 * Resultados: the last section of the home. One equal-height card per site that is live AND authorized
 * (content/results.ts); each "Visitar sitio" button goes to the real site in a new tab.
 */
export function ResultsSection() {
  const columns = resultColumns(visibleResults.length);
  return (
    <Section id="resultados" tone="paper" labelledBy="resultados-title">
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
              <div className={styles.resultTop}>
                <small className={styles.resultKind}>{resultsSection.kindLabel[card.kind]}</small>
              </div>
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
