type ClassValue = string | number | false | null | undefined;

export default function clsx(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
