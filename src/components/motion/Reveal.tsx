"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import clsx from "@/lib/clsx";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Visual variant: the block rises (default) or scales in. */
  variant?: "up" | "scale";
  /** Delay in ms before the block starts appearing. */
  delay?: number;
  /** Animate the direct children one after another instead of the block as a whole. */
  stagger?: boolean;
  /** Tag to render; lists need ul/ol so their <li> stay direct children. */
  as?: "div" | "ul" | "ol";
};

/**
 * Reveal-on-scroll wrapper. Fully inert under prefers-reduced-motion and without JavaScript
 * (see styles/motion.css): content is never gated behind motion finishing.
 */
export function Reveal({ children, className, variant = "up", delay = 0, stagger = false, as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Once a staggered list has finished entering, hand its children back to their own hover styles.
  useEffect(() => {
    if (!visible || !stagger) return;
    const timer = window.setTimeout(() => setSettled(true), 1800);
    return () => window.clearTimeout(timer);
  }, [visible, stagger]);

  return (
    <Tag
      ref={ref as never}
      data-visible={visible}
      data-settled={settled || undefined}
      data-variant={variant}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={clsx(stagger ? "reveal-stagger" : "reveal", className)}
    >
      {children}
    </Tag>
  );
}
