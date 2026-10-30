import clsx from "@/lib/clsx";
import type { FlowStepData } from "@/content/types";
import { Icon } from "./icons";
import styles from "./flow.module.css";

/**
 * A connected diagram: icon nodes joined by lines and arrows, left to right on desktop and top to bottom on
 * phones (it is an ordered list, so the order is also what assistive technology reads).
 *
 *  - `cols`: nodes per row on desktop (defaults to the step count, max 5; eight steps run in one row from 72rem and as 4 + 4 below it).
 *  - `variant="rail"`: always vertical, one continuous rail (used for processes with deliverables).
 *  - `variant="compact"`: small nodes with the title only (used inside portfolio visuals).
 *  - `tone="dark"`: for dark sections.
 *  - `numbered`: a small step number on each node (kept subtle: the icon leads, the number only orders).
 */
export function Flow({
  steps,
  cols,
  tone = "light",
  variant = "row",
  numbered = false,
  label,
  className,
}: {
  steps: readonly FlowStepData[];
  cols?: 2 | 3 | 4 | 5 | 8;
  tone?: "light" | "dark";
  variant?: "row" | "rail" | "compact";
  numbered?: boolean;
  label?: string;
  className?: string;
}) {
  const columns = cols ?? (steps.length >= 8 ? 8 : (Math.min(Math.max(steps.length, 2), 5) as 2 | 3 | 4 | 5));

  return (
    <ol
      aria-label={label}
      className={clsx(
        styles.flow,
        styles[`cols${columns}`],
        variant === "rail" && styles.rail,
        variant === "compact" && styles.compact,
        tone === "dark" && styles.dark,
        className,
      )}
    >
      {steps.map((step, index) => (
        <li key={step.title} className={styles.step}>
          <span className={styles.node}>
            <Icon name={step.icon} size={variant === "compact" ? 19 : 22} />
            {numbered ? (
              <b className={styles.index} aria-hidden="true">
                {index + 1}
              </b>
            ) : null}
          </span>
          <div className={styles.body}>
            <strong>{step.title}</strong>
            {step.text ? <span>{step.text}</span> : null}
            {step.meta ? (
              <small>
                <Icon name="check" size={13} /> {step.meta}
              </small>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
