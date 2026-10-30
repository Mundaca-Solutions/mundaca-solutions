"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const POLL_MS = 80;
const MAX_WAIT_MS = 6000;

/**
 * Makes links like /#metodo reliable when they come from another page. Next scrolls to the hash when
 * the navigation commits, but if the route's loading state commits first the target section does not
 * exist yet and the page stays at the top. This waits (briefly) for the element and scrolls to it.
 * It never fights the user: it stops at the first manual scroll, wheel or key press.
 */
export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // A malformed hash (/#%E0%A4%A) makes decodeURIComponent throw: ignore it instead of crashing the page.
    let id = "";
    try {
      id = decodeURIComponent(window.location.hash.slice(1));
    } catch {
      return;
    }
    if (!id) return;

    let stopped = false;
    const stop = () => {
      stopped = true;
    };
    const events = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
    for (const name of events) window.addEventListener(name, stop, { once: true, passive: true });

    const startedAt = performance.now();
    const timer = window.setInterval(() => {
      if (stopped || performance.now() - startedAt > MAX_WAIT_MS) {
        window.clearInterval(timer);
        return;
      }
      const target = document.getElementById(id);
      if (!target) return;
      window.clearInterval(timer);
      // Already there (Next did its job): leave it alone.
      const top = target.getBoundingClientRect().top;
      if (top >= 0 && top < window.innerHeight * 0.5) return;
      target.scrollIntoView({ block: "start" });
    }, POLL_MS);

    return () => {
      window.clearInterval(timer);
      for (const name of events) window.removeEventListener(name, stop);
    };
  }, [pathname]);

  return null;
}
