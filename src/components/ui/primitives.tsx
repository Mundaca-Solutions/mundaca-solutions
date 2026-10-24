import type { ElementType, ReactNode } from "react";
import clsx from "@/lib/clsx";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./ui.module.css";

export function Container({
  as: Tag = "div",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={clsx(styles.container, className)}>{children}</Tag>;
}

export type Tone = "paper" | "white" | "deep" | "dark";

/** A page band. `dark` flips text colors and the focus ring (see styles/a11y.css). */
export function Section({
  id,
  tone = "paper",
  labelledBy,
  className,
  children,
}: {
  id?: string;
  tone?: Tone;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-surface={tone === "dark" ? "dark" : undefined}
      className={clsx(styles.section, styles[`tone_${tone}`], className)}
    >
      {children}
    </section>
  );
}

export function Eyebrow({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return <span className={clsx(styles.eyebrow, onDark && styles.eyebrowDark)}>{children}</span>;
}

/** Section title block: eyebrow + serif title (with an optional italic emphasis) + lead text. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  emphasis,
  text,
  align = "center",
  onDark = false,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  /** Last words of the title shown in italic + accent color. */
  emphasis?: string;
  text?: string;
  align?: "center" | "left";
  onDark?: boolean;
}) {
  return (
    <Reveal className={clsx(styles.heading, align === "left" && styles.headingLeft)}>
      <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>
      <h2 id={id} className={styles.headingTitle}>
        {title}
        {emphasis ? (
          <>
            {" "}
            <em>{emphasis}</em>
          </>
        ) : null}
      </h2>
      {text ? <p className={styles.headingText}>{text}</p> : null}
    </Reveal>
  );
}
