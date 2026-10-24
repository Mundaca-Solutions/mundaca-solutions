import type { ReactNode } from "react";

/**
 * A template (unlike a layout) re-mounts on every navigation, so the entrance animation defined in
 * styles/motion.css (.page-enter) plays on each route change. Header, footer and the floating
 * WhatsApp button live in the layout and stay put. Server component: no client JavaScript.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
