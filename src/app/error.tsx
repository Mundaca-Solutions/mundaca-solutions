"use client";

import { site } from "@/content/site";
import { Icon } from "@/components/ui/icons";
import styles from "@/components/sections/pages.module.css";

/** Friendly error state (replaces the page content, keeps header/footer). Plain Spanish, one next step. */
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className={styles.status} role="alert">
      <span className={styles.statusIcon}>
        <Icon name="alert" size={30} />
      </span>
      <span className={styles.statusCode}>Error</span>
      <h1>Algo no salió como esperábamos.</h1>
      <p>Ya estamos al tanto. Puedes volver a intentarlo ahora; si sigue igual, escríbenos por WhatsApp.</p>
      <div className={styles.statusActions}>
        <button type="button" className={styles.statusPrimary} onClick={reset}>
          <Icon name="rotate" size={18} /> Reintentar
        </button>
        <a className={styles.statusSecondary} href={site.whatsappUrl} target="_blank" rel="noopener noreferrer">
          <Icon name="whatsapp" size={18} /> WhatsApp
        </a>
      </div>
    </div>
  );
}
