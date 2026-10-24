import { tickerMessages } from "@/content/home";
import styles from "./sections.module.css";

/**
 * Slow marquee under the hero with messages that already existed on the site. Paused on hover,
 * a static wrapped list under prefers-reduced-motion. The clone is hidden from assistive tech.
 */
export function Ticker() {
  const items = (hidden: boolean) =>
    tickerMessages.map((message) => (
      <li key={`${hidden ? "clone" : "item"}-${message}`} className={styles.tickerItem}>
        <span className={styles.tickerDot} aria-hidden="true" />
        {message}
      </li>
    ));

  return (
    <section className={styles.ticker} aria-label="Cómo trabajamos, en pocas palabras" data-surface="dark">
      <div className={styles.tickerTrack}>
        <ul className={styles.tickerList}>{items(false)}</ul>
        <ul className={styles.tickerList} aria-hidden="true" data-clone="true">
          {items(true)}
        </ul>
      </div>
    </section>
  );
}
