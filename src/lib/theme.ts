import type { SiteConfig } from "./types";

/**
 * Turns config.theme into CSS custom properties applied on <html>.
 * Tailwind utilities (bg-main, text-muted, rounded-brand, …) map to these
 * in globals.css, so a single JSON edit re-themes the whole site.
 */
export function themeToCssVars(theme: SiteConfig["theme"]): Record<string, string> {
  return {
    "--main": theme.mainColor,
    "--secondary": theme.secondaryColor,
    "--accent": theme.accentColor,
    "--bg": theme.backgroundColor,
    "--text": theme.textColor,
    "--muted": theme.mutedTextColor,
    "--radius": theme.borderRadius,
    "--container": theme.containerWidth,
  };
}
