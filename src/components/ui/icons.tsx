import type { SVGProps } from "react";
import type { IconName } from "@/content/types";

/**
 * One small inline icon set (always decorative: aria-hidden). Stroke icons inherit currentColor with a
 * uniform 1.8 stroke; WhatsApp is the only filled glyph.
 */

const strokes: Record<Exclude<IconName, "whatsapp">, string> = {
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  arrowLeft: "M19 12H5M11 6l-6 6 6 6",
  chevronRight: "M9 6l6 6-6 6",
  chevronDown: "M6 9l6 6 6-6",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6L6 18",
  check: "M5 12.5l4.5 4.5L19 7.5",
  checkCircle: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zM8 12.5l2.7 2.7L16 9.5",
  alert: "M12 4.2L21 19.5H3zM12 10v4.2M12 17v.01",
  sparkles:
    "M11 3l1.9 5.1L18 10l-5.1 1.9L11 17l-1.9-5.1L4 10l5.1-1.9zM18.5 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z",
  workflow: "M4 4h6v6H4zM14 14h6v6h-6zM10 7h3a3 3 0 0 1 3 3v4",
  barChart: "M5 20v-9M12 20V4M19 20v-6",
  layers: "M12 3l9 5-9 5-9-5zM3 13l9 5 9-5",
  boxes: "M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12v9M12 12L4 7.5",
  briefcase: "M4 8h16v11H4zM9 8V5.5h6V8M4 13h16",
  message: "M4 5h16v11H10l-6 4z",
  rocket: "M14.5 4c3.5-.3 5.5 1.7 5.5 5.5-2.5 5-6 8.5-10 9.5l-4.5-4.5C6.5 10.5 10 7 14.5 4zM9 15l-4.5 4.5M15 9.5h.01",
  searchCheck: "M10.5 17a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13zM20.5 20.5L15.2 15.2M8 10.5l2 2 3.5-3.5",
  shield: "M12 3l7.5 3v5.5c0 4.7-3.2 8-7.5 9.5-4.3-1.5-7.5-4.8-7.5-9.5V6zM9 12l2.2 2.2L15 10.4",
  target: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zM16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 12h.01",
  zap: "M13 3L5 13.5h6L10 21l8-10.5h-6z",
  loader: "M12 3a9 9 0 1 0 9 9",
  external: "M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5",
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  rotate: "M4.5 12a7.5 7.5 0 1 0 2.4-5.5M4 4v4.5h4.5",
};

const whatsappPath =
  "M12.04 2a9.9 9.9 0 0 0-8.47 15l-1.5 5.5 5.64-1.48A9.9 9.9 0 1 0 12.04 2Zm0 1.8a8.1 8.1 0 0 1 0 16.2 8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.34.88.9-3.25-.2-.33A8.1 8.1 0 0 1 12.04 3.8Zm-3.2 3.6c-.17 0-.45.06-.69.32s-.9.88-.9 2.15.92 2.5 1.05 2.67c.13.17 1.8 2.88 4.42 3.92 2.19.86 2.63.69 3.1.65.48-.04 1.53-.63 1.75-1.23.21-.6.21-1.12.15-1.23-.07-.1-.24-.17-.5-.3s-1.53-.76-1.77-.84c-.23-.09-.4-.13-.58.13-.17.26-.67.84-.82 1.01-.15.17-.3.2-.56.07-.26-.13-1.1-.4-2.09-1.29-.77-.69-1.3-1.54-1.45-1.8-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.46.13-.15.17-.26.26-.43.09-.17.04-.33-.02-.46-.07-.13-.58-1.4-.8-1.92-.2-.5-.42-.43-.58-.44h-.5Z";

type IconProps = { name: IconName; size?: number } & Omit<SVGProps<SVGSVGElement>, "name" | "children">;

export function Icon({ name, size = 20, ...props }: IconProps) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", "aria-hidden": true, focusable: false } as const;

  if (name === "whatsapp") {
    return (
      <svg {...common} fill="currentColor" {...props}>
        <path d={whatsappPath} />
      </svg>
    );
  }

  return (
    <svg
      {...common}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d={strokes[name]} />
    </svg>
  );
}
