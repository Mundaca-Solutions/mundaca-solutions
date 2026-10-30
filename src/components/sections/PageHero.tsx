import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Container } from "@/components/ui/primitives";
import type { Crumb } from "@/lib/seo";
import styles from "./pages.module.css";

/** Compact dark band that opens every inner page: breadcrumbs, eyebrow, the page's single H1 and a lead. */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  lead,
}: {
  crumbs: readonly Crumb[];
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <header className={styles.hero} data-surface="dark">
      <Container>
        <Breadcrumbs crumbs={crumbs} onDark />
        <div className={styles.heroBody}>
          <span className={styles.heroEyebrow}>{eyebrow}</span>
          <h1>{title}</h1>
          <p>{lead}</p>
        </div>
      </Container>
    </header>
  );
}
