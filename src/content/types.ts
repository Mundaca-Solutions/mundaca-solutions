/** Names of the inline icons available in components/ui/icons.tsx. Content files only reference names. */
export type IconName =
  | "arrowRight"
  | "arrowLeft"
  | "arrowDown"
  | "chevronRight"
  | "chevronDown"
  | "menu"
  | "close"
  | "check"
  | "checkCircle"
  | "alert"
  | "sparkles"
  | "workflow"
  | "barChart"
  | "layers"
  | "boxes"
  | "briefcase"
  | "message"
  | "rocket"
  | "searchCheck"
  | "shield"
  | "target"
  | "zap"
  | "loader"
  | "external"
  | "mail"
  | "rotate"
  | "whatsapp"
  | "database"
  | "cart"
  | "receipt"
  | "users"
  | "plug"
  | "compass"
  | "flag"
  | "file"
  | "gauge"
  | "link"
  | "leaf"
  | "clipboard";

export type NavChild = { label: string; href: string; description: string };

export type NavItem = { label: string; href: string; children?: NavChild[] };

export type Link = { label: string; href: string; external?: boolean };

/** One node of a connected diagram (see components/ui/Flow.tsx). */
export type FlowStepData = { icon: IconName; title: string; text?: string; meta?: string };
