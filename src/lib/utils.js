import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * @param {(string | boolean | undefined)[]} inputs
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
