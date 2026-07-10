/** True when the visual editor may be present: dev, or a showcase build with NEXT_PUBLIC_DEMO=1. */
export const editorEnabled = process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_DEMO === "1";

/** Join class names, skipping falsy values. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Clamp a variant number to the available range so an out-of-range
 * value in config.json falls back to variant 1 instead of rendering nothing.
 */
export function clampVariant(variant: number | undefined, max: number): number {
  const v = Math.trunc(variant ?? 1);
  if (v >= 1 && v <= max) return v;
  if (process.env.NODE_ENV === "development" && variant !== undefined) {
    console.warn(`[wbuild] Variant ${variant} is out of range 1–${max} — falling back to variant 1.`);
  }
  return 1;
}
