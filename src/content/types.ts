/** Names of the inline icons available in components/ui/icons.tsx. Content files only reference names. */
export type IconName =
  | "arrowRight"
  | "arrowLeft"
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
  | "whatsapp";

export type NavChild = { label: string; href: string; description: string };

export type NavItem = { label: string; href: string; children?: NavChild[] };

export type Link = { label: string; href: string; external?: boolean };
