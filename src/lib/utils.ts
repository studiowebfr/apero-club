type ClassValue = string | false | null | undefined;

/** Concatène des classes Tailwind en ignorant les valeurs falsy. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
