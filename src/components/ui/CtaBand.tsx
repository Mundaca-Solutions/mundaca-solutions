import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { LinkButton } from "./LinkButton";
import styles from "./cta-band.module.css";

/** Closing call to action of a page or section: one sentence and ONE button that does what it says. */
export function CtaBand({
  kicker,
  title,
  href,
  label,
  icon = "arrowRight",
  children,
}: {
  kicker?: string;
  title: string;
  href: string;
  label: string;
  icon?: "arrowRight" | "external";
  children?: ReactNode;
}) {
  return (
    <Reveal>
      <div className={styles.band} data-surface="dark">
        <div className={styles.copy}>
          {kicker ? <small>{kicker}</small> : null}
          <strong>{title}</strong>
          {children}
        </div>
        <LinkButton href={href} variant="lightOnDark" size="lg" icon={icon}>
          {label}
        </LinkButton>
      </div>
    </Reveal>
  );
}
