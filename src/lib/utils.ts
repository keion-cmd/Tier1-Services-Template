import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** True if the string is an unfilled `[BRACKET_TOKEN]` placeholder rather than real content. */
export function isPlaceholderToken(value: string): boolean {
  return /^\[.*\]$/.test(value);
}

/**
 * True if at least one item has real (non-placeholder) content, so a data-backed nav item or
 * dropdown isn't shown for an array that's still all unfilled demo placeholders.
 */
export function hasRealEntries<T>(items: T[], getLabel: (item: T) => string): boolean {
  return items.some((item) => !isPlaceholderToken(getLabel(item)));
}
