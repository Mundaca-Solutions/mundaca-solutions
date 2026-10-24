"use client";

import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/icons";
import styles from "./layout.module.css";

/** Floating WhatsApp shortcut. Hidden on /contacto, which already lists every contact channel. */
export function WhatsAppFab() {
  const pathname = usePathname();
  if (pathname === "/contacto") return null;

  return (
    <a
      className={styles.fab}
      href={site.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversemos por WhatsApp"
    >
      <Icon name="whatsapp" size={26} />
      <span className={styles.fabLabel}>Conversemos</span>
    </a>
  );
}
