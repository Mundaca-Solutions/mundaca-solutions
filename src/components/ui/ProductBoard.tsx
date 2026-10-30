import Image from "next/image";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/motion/Reveal";
import type { Product } from "@/content/products";
import { Flow } from "./Flow";
import { Icon } from "./icons";
import styles from "./product-board.module.css";

/**
 * A product's own diagram: its real modules joined by arrows, who works on which part (lanes, when the product
 * declares them) and the line that ties them together. Used on the home ("Foodies en acción") and on each product page.
 * Everything comes from content/products.ts: nothing here is invented or a mock-up of a screen.
 */
export function ProductBoard({
  product,
  showHead = false,
  intro,
  forLabel,
  forItems,
}: {
  product: Product;
  /** Header with the logo and the diagram's title. */
  showHead?: boolean;
  intro?: string;
  forLabel?: string;
  forItems?: readonly string[];
}) {
  const { flow } = product;

  return (
    <Reveal>
      <div className={styles.board} data-product={product.tone}>
        {showHead ? (
          <div className={styles.head}>
            <Image
              src={product.logo.src}
              alt={`Logo de ${product.name}`}
              width={product.logo.width}
              height={product.logo.height}
              sizes="120px"
            />
            <span>{flow.title}</span>
          </div>
        ) : null}
        <div className={styles.body}>
          {intro ? <p className={styles.intro}>{intro}</p> : null}
          <Flow
            steps={flow.steps}
            cols={flow.steps.length >= 5 ? 5 : 4}
            numbered
            label={flow.title}
            className={styles.flow}
          />
          {flow.lanes ? (
            <ul className={styles.lanes} aria-label="Quién trabaja en cada parte">
              {flow.lanes.map((lane) => (
                <li key={lane.title} style={{ "--span": lane.span } as CSSProperties}>
                  <strong>{lane.title}</strong>
                  <span>{lane.text}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className={styles.truth}>
          <Icon name="database" size={22} />
          <p>
            <strong>{flow.truth.title}</strong>
            <span>{flow.truth.text}</span>
          </p>
          {forItems && forItems.length > 0 ? (
            <div className={styles.truthFor}>
              {forLabel ? <small>{forLabel}</small> : null}
              <ul>
                {forItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </Reveal>
  );
}
