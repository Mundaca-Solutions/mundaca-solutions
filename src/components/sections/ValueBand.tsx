import { valueProps } from "@/content/home";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/icons";
import { Container } from "@/components/ui/primitives";
import styles from "./sections.module.css";

/** Three concrete value propositions straight under the hero (static: no ticker, no movement). */
export function ValueBand() {
  return (
    <section className={styles.valueBand} aria-label="Cómo trabajamos contigo" data-surface="dark">
      <Container>
        <Reveal as="ul" stagger className={styles.valueList}>
          {valueProps.map((item) => (
            <li key={item.title}>
              <span className={styles.valueIcon}>
                <Icon name={item.icon} size={20} />
              </span>
              <div>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </div>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
