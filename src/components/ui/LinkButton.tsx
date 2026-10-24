import Link from "next/link";
import type { ReactNode } from "react";
import clsx from "@/lib/clsx";
import { isExternalHref } from "@/content/site";
import type { IconName } from "@/content/types";
import { Icon } from "./icons";
import styles from "./ui.module.css";

export type ButtonVariant = "primary" | "secondary" | "ghostDark" | "lightOnDark" | "whatsapp";

/**
 * One link-styled-as-button. External URLs open in a new tab with rel="noopener noreferrer";
 * internal ones go through next/link. Variants: primary (brass, one per screen), secondary (outline on
 * light), ghostDark (outline on dark), lightOnDark (white on dark), whatsapp.
 */
export function LinkButton({
  href,
  variant = "primary",
  icon,
  size = "md",
  className,
  children,
  ...rest
}: {
  href: string;
  variant?: ButtonVariant;
  /** Trailing icon. External links default to the "external" glyph if none is given. */
  icon?: IconName | null;
  size?: "md" | "lg";
  className?: string;
  children: ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">) {
  const external = isExternalHref(href);
  const trailing = icon === null ? undefined : (icon ?? (external ? "external" : undefined));
  const classes = clsx(styles.button, styles[`btn_${variant}`], size === "lg" && styles.buttonLg, className);
  const content = (
    <>
      <span>{children}</span>
      {trailing ? <Icon name={trailing} size={size === "lg" ? 19 : 17} /> : null}
    </>
  );

  if (external) {
    return (
      <a className={classes} href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {content}
      </a>
    );
  }

  return (
    <Link className={classes} href={href} {...rest}>
      {content}
    </Link>
  );
}
