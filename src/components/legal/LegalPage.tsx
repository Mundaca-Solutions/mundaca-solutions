import type { ReactNode } from "react";
import type { LegalDoc } from "@/content/legal";
import { contactEmail } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/primitives";
import styles from "@/components/sections/pages.module.css";

/** Replaces the `{email}` marker in a legal paragraph by a mailto link. */
function withEmail(text: string): ReactNode {
  const [before, after] = text.split("{email}");
  if (after === undefined) return text;
  return (
    <>
      {before}
      <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
      {after}
    </>
  );
}

export function LegalPage({ doc, lead }: { doc: LegalDoc; lead: string }) {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Inicio", href: "/" }, { label: doc.breadcrumb }]}
        eyebrow={doc.eyebrow}
        title={doc.h1}
        lead={lead}
      />
      <div className={styles.page}>
        <Container>
          <article className={styles.legal}>
            <p className={styles.legalUpdated}>{doc.updated}</p>
            {doc.sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                <p>{withEmail(section.text)}</p>
              </section>
            ))}
          </article>
        </Container>
      </div>
    </>
  );
}
