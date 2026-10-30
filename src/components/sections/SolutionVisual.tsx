import type { SolutionVisual as Visual } from "@/content/solutions";
import { Reveal } from "@/components/motion/Reveal";
import { Flow } from "@/components/ui/Flow";
import { Icon } from "@/components/ui/icons";
import styles from "./inner.module.css";

/** The picture of each solution page: need → solution, three stages, or the data-to-decision chain. */
export function SolutionVisual({ visual }: { visual: Visual }) {
  if (visual.kind === "need-to-solution") {
    return (
      <Reveal className={styles.n2s}>
        <div className={styles.needPanel}>
          <h3>{visual.need.title}</h3>
          <ul>
            {visual.need.items.map((item) => (
              <li key={item.label}>
                <span className={styles.node}>
                  <Icon name={item.icon} size={20} />
                </span>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.bridge} aria-hidden="true">
          <span>{visual.bridge}</span>
          <Icon name="arrowRight" size={22} />
        </div>
        <div className={styles.solutionPanel} data-surface="dark">
          <h3>{visual.solution.title}</h3>
          <ul>
            {visual.solution.items.map((item) => (
              <li key={item}>
                <Icon name="checkCircle" size={20} /> {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    );
  }

  if (visual.kind === "stages") {
    return (
      <Reveal as="ol" stagger className={styles.stages} aria-label="De proceso manual a operación controlada">
        {visual.stages.map((stage, index) => (
          <li key={stage.title} className={index === visual.stages.length - 1 ? styles.stageLast : styles.stage}>
            <span className={styles.stageKicker}>{stage.kicker}</span>
            <span className={styles.node}>
              <Icon name={stage.icon} size={22} />
            </span>
            <h3>{stage.title}</h3>
            <ul>
              {stage.items.map((item) => (
                <li key={item}>
                  <Icon name="check" size={15} /> {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </Reveal>
    );
  }

  return (
    <Reveal className={styles.chain}>
      <Flow steps={visual.steps} cols={4} numbered label="De los datos a las decisiones" />
      <div className={styles.chainEnabler}>
        <span className={styles.node}>
          <Icon name="sparkles" size={20} />
        </span>
        <p>
          <strong>{visual.enabler.title}</strong>
          <span>{visual.enabler.text}</span>
        </p>
      </div>
    </Reveal>
  );
}
