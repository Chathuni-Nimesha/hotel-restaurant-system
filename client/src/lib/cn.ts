type ClassValue = string | false | null | undefined;

/**
 * Combines class names, filtering out falsy values.
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
