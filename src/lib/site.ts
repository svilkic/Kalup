import configJson from "@config/config.json";
import contentJson from "@config/content.json";
import type { SiteConfig, SiteContent } from "./types";

/** Every config key has a fallback, so a sparse config.json still produces a working site. */
const defaultConfig: SiteConfig = {
  brand: { logo: "", logoText: "Business Name", favicon: "/favicon.ico" },
  theme: {
    mainColor: "#0F766E",
    secondaryColor: "#F97316",
    accentColor: "#111827",
    backgroundColor: "#FFFFFF",
    textColor: "#111827",
    mutedTextColor: "#6B7280",
    borderRadius: "16px",
    fontFamily: "Inter",
    containerWidth: "1200px",
  },
  layout: {
    navbarVariant: 1,
    heroVariant: 1,
    servicesVariant: 1,
    aboutVariant: 1,
    featuresVariant: 1,
    galleryVariant: 1,
    testimonialsVariant: 1,
    pricingVariant: 1,
    faqVariant: 1,
    ctaVariant: 1,
    contactVariant: 1,
    footerVariant: 1,
  },
  sections: {
    showServices: true,
    showAbout: true,
    showFeatures: true,
    showGallery: true,
    showTestimonials: true,
    showPricing: false,
    showFAQ: true,
    showCTA: true,
    showContact: true,
    showCallButton: false,
  },
  seo: {
    siteUrl: "https://example.com",
    defaultTitle: "Professional Local Business",
    defaultDescription: "Professional services for local clients.",
    keywords: [],
    businessType: "LocalBusiness",
    language: "en",
  },
};

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/** Overlay user values on defaults; arrays and primitives replace, objects merge. */
function deepMerge<T>(base: T, override: unknown): T {
  if (!isObject(base) || !isObject(override)) {
    return (override === undefined || override === null ? base : override) as T;
  }
  const out: Record<string, unknown> = { ...base };
  for (const key of Object.keys(override)) {
    out[key] = deepMerge((base as Record<string, unknown>)[key], override[key]);
  }
  return out as T;
}

export function getConfig(): SiteConfig {
  return deepMerge(defaultConfig, configJson);
}

export function getContent(): SiteContent {
  return contentJson as SiteContent;
}
