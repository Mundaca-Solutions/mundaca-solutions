import styles from "@/components/sections/pages.module.css";

/** Route loading state: a quiet pulse that keeps header and footer in place. */
export default function Loading() {
  return (
    <div className={styles.status} role="status" aria-live="polite">
      <span className={styles.loadingDots} aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <p>Cargando…</p>
    </div>
  );
}
