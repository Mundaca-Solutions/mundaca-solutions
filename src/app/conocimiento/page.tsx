import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { Icon } from "@/components/ui/icons";
import { Container } from "@/components/ui/primitives";
import { conocimiento } from "@/content/home";
import { pageMetadata } from "@/lib/seo";
import styles from "@/components/sections/pages.module.css";

export const metadata: Metadata = pageMetadata({
  title: conocimiento.metaTitle,
  description: conocimiento.metaDescription,
  path: "/conocimiento",
});

export default function KnowledgePage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Conocimiento" }]}
        eyebrow={conocimiento.eyebrow}
        title={conocimiento.h1}
        lead={conocimiento.lead}
      />
      <div className={styles.page}>
        <Container>
          <Reveal as="ul" stagger className={`${styles.cardGrid} ${styles.two}`}>
            {conocimiento.cards.map((card) => (
              <li key={card.title} className={styles.card}>
                <h2>{card.title}</h2>
                <p>{card.text}</p>
                <div className={styles.cardActions}>
                  <Link className={styles.textLink} href={card.href}>
                    {card.linkLabel} <Icon name="arrowRight" size={16} />
                  </Link>
                </div>
              </li>
            ))}
          </Reveal>
        </Container>
      </div>
    </>
  );
}
