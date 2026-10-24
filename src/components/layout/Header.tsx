"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "@/lib/clsx";
import { navItems, site } from "@/content/site";
import { Icon } from "@/components/ui/icons";
import { LinkButton } from "@/components/ui/LinkButton";
import styles from "./layout.module.css";

const isActive = (pathname: string, href: string) => {
  if (href.includes("#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
};

/** The desktop navigation takes over from this width (keep in sync with layout.module.css, 62rem). */
const DESKTOP_QUERY = "(min-width: 62rem)";

/** Elements hidden from keyboard and screen readers while the mobile sheet is open (it is modal). */
const BEHIND_SHEET = ["contenido"] as const;

export function Header() {
  const pathname = usePathname();
  // Each menu remembers WHERE it was opened: going back/forward (a new pathname) closes it without an effect.
  const [sheetAt, setSheetAt] = useState<string | null>(null);
  const [menuAt, setMenuAt] = useState<string | null>(null);
  const sheetOpen = sheetAt === pathname;
  const menuOpen = menuAt === pathname;
  const menuRef = useRef<HTMLLIElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLElement>(null);
  const menuId = useId();

  const closeAll = () => {
    setSheetAt(null);
    setMenuAt(null);
  };

  // The "Soluciones" menu opens by CLICK (a hover menu closes while the cursor travels to its options).
  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuAt(null);
    const onPointer = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) close();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        menuRef.current?.querySelector("button")?.focus();
      }
    };
    // Tabbing out of the menu closes it too (the panel would otherwise stay over the page).
    const onFocusOut = (event: FocusEvent) => {
      const next = event.relatedTarget as Node | null;
      if (next && !menuRef.current?.contains(next)) close();
    };
    const node = menuRef.current;
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    node?.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
      node?.removeEventListener("focusout", onFocusOut);
    };
  }, [menuOpen]);

  // Mobile sheet: modal. Locks scroll, hides the page behind it, moves focus in, and restores everything on close.
  useEffect(() => {
    if (!sheetOpen) return;
    const behind = BEHIND_SHEET.map((id) => document.getElementById(id)).filter((node): node is HTMLElement => !!node);
    for (const node of behind) node.setAttribute("inert", "");
    const footer = document.querySelector("footer");
    footer?.setAttribute("inert", "");
    document.body.style.overflow = "hidden";
    sheetRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSheetAt(null);
        menuButtonRef.current?.focus();
      }
    };
    // Rotating a tablet / resizing past the breakpoint swaps to the desktop nav: never leave the sheet open.
    const media = window.matchMedia(DESKTOP_QUERY);
    const onMedia = () => {
      if (media.matches) setSheetAt(null);
    };
    document.addEventListener("keydown", onKey);
    media.addEventListener("change", onMedia);
    return () => {
      document.removeEventListener("keydown", onKey);
      media.removeEventListener("change", onMedia);
      for (const node of behind) node.removeAttribute("inert");
      footer?.removeAttribute("inert");
      document.body.style.overflow = "";
    };
  }, [sheetOpen]);

  return (
    <header className={styles.header} data-surface="dark">
      <div className={styles.headerInner}>
        <Link href="/" className={styles.logo} aria-label="Mundaca's Solutions, inicio" onClick={closeAll}>
          <Image src={site.logoOnDark} alt="Mundaca's Solutions" width={1381} height={364} priority sizes="190px" />
        </Link>

        <nav className={styles.nav} aria-label="Principal">
          <ul className={styles.navList}>
            {navItems.map((item) =>
              item.children ? (
                <li key={item.label} ref={menuRef} className={styles.navMenu}>
                  <button
                    type="button"
                    className={clsx(styles.navLink, pathname.startsWith("/soluciones") && styles.navLinkActive)}
                    aria-expanded={menuOpen}
                    aria-controls={menuOpen ? menuId : undefined}
                    onClick={() => setMenuAt(menuOpen ? null : pathname)}
                  >
                    {item.label}
                    <Icon name="chevronDown" size={16} className={clsx(styles.chevron, menuOpen && styles.chevronOpen)} />
                  </button>
                  {menuOpen ? (
                    <ul id={menuId} className={styles.dropdown}>
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={styles.dropdownLink}
                            aria-current={pathname === child.href ? "page" : undefined}
                            onClick={closeAll}
                          >
                            <strong>{child.label}</strong>
                            <span>{child.description}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={clsx(styles.navLink, isActive(pathname, item.href) && styles.navLinkActive)}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    onClick={closeAll}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className={styles.actions}>
          <LinkButton href={site.bookingUrl} icon="arrowRight" className={styles.cta} onClick={closeAll}>
            Conversemos
          </LinkButton>
          <button
            ref={menuButtonRef}
            type="button"
            className={styles.menuButton}
            aria-expanded={sheetOpen}
            aria-controls={sheetOpen ? "mobile-nav" : undefined}
            aria-label={sheetOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setSheetAt(sheetOpen ? null : pathname)}
          >
            <Icon name={sheetOpen ? "close" : "menu"} size={22} />
          </button>
        </div>
      </div>

      {sheetOpen ? (
        <nav id="mobile-nav" ref={sheetRef} className={styles.sheet} aria-label="Móvil" data-surface="dark">
          <ul className={styles.sheetList}>
            {navItems.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <>
                    <span className={styles.sheetGroup}>{item.label}</span>
                    <ul className={styles.sheetSub}>
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link href={child.href} className={styles.sheetSubLink} onClick={closeAll}>
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={styles.sheetLink}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    onClick={closeAll}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div className={styles.sheetActions}>
            <LinkButton href={site.bookingUrl} size="lg" icon="arrowRight" onClick={closeAll}>
              Conversemos
            </LinkButton>
            <LinkButton href={site.whatsappUrl} variant="ghostDark" size="lg" icon="whatsapp">
              Escríbenos por WhatsApp
            </LinkButton>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
