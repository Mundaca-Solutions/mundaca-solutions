import Link from "next/link";
import { breadcrumbSchema, graph, type Crumb } from "@/lib/seo";
import { JsonLd } from "./JsonLd";
import styles from "./breadcrumbs.module.css";

/**
 * Visible breadcrumb trail + BreadcrumbList JSON-LD. A crumb without `href` is plain text
 * (for example the "Soluciones" group, which has no page of its own).
 */
export function Breadcrumbs({ crumbs, onDark = false }: { crumbs: readonly Crumb[]; onDark?: boolean }) {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />
      <nav className={onDark ? `${styles.crumbs} ${styles.onDark}` : styles.crumbs} aria-label="Migas de pan">
        <ol>
          {crumbs.map((crumb, index) => {
            const last = index === crumbs.length - 1;
            return (
              <li key={crumb.label}>
                {crumb.href && !last ? (
                  <Link href={crumb.href}>{crumb.label}</Link>
                ) : (
                  <span aria-current={last ? "page" : undefined}>{crumb.label}</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
