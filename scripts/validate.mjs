// Validates config/config.json and config/content.json against the known
// schema: unknown keys (typos), out-of-range variants, unknown icon names,
// and image paths that don't exist in /public. Run with `npm run validate`.
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
// Optionally validate a preset: `npm run validate -- config/presets/salon`
const dir = process.argv[2] ?? "config";
const config = read(`${dir}/config.json`);
const content = read(`${dir}/content.json`);

// Keep in sync with clampVariant() maxes in src/sections and the sidebar.
const VARIANT_MAX = {
  navbarVariant: 15, heroVariant: 15, servicesVariant: 15, aboutVariant: 15,
  featuresVariant: 15, galleryVariant: 15, testimonialsVariant: 15, pricingVariant: 15,
  faqVariant: 15, ctaVariant: 15, contactVariant: 15, footerVariant: 15,
};

// "1" = string leaf, {...} = object, [spec] = array of spec, ["string"] = array of strings.
const CONFIG_SPEC = {
  brand: { logo: 1, logoText: 1, favicon: 1 },
  theme: {
    mainColor: 1, secondaryColor: 1, accentColor: 1, backgroundColor: 1,
    textColor: 1, mutedTextColor: 1, borderRadius: 1, fontFamily: 1, containerWidth: 1,
  },
  layout: Object.fromEntries(Object.keys(VARIANT_MAX).map((k) => [k, 1])),
  sections: {
    showServices: 1, showAbout: 1, showFeatures: 1, showGallery: 1, showTestimonials: 1,
    showPricing: 1, showFAQ: 1, showCTA: 1, showContact: 1, showCallButton: 1,
  },
  seo: {
    siteUrl: 1, defaultTitle: 1, defaultDescription: 1, keywords: ["string"],
    ogImage: 1, businessType: 1, language: 1, plausibleDomain: 1, gaId: 1,
  },
};

const CONTENT_SPEC = {
  navbar: { links: [{ label: 1, href: 1 }], ctaLabel: 1, skipLabel: 1 },
  hero: {
    eyebrow: 1, title: 1, subtitle: 1, primaryButton: 1, secondaryButton: 1,
    image: 1, imageAlt: 1, badges: ["string"],
    highlights: [{ title: 1, description: 1 }],
    contactCard: { title: 1, subtitle: 1, button: 1 },
  },
  services: { title: 1, subtitle: 1, items: [{ title: 1, description: 1, icon: 1, image: 1 }] },
  about: {
    title: 1, subtitle: 1, body: 1, image: 1, imageAlt: 1,
    stats: [{ value: 1, label: 1 }],
  },
  features: { title: 1, subtitle: 1, items: [{ title: 1, description: 1, icon: 1 }] },
  gallery: { title: 1, subtitle: 1, items: [{ image: 1, alt: 1, caption: 1 }] },
  testimonials: { title: 1, subtitle: 1, items: [{ name: 1, role: 1, text: 1 }] },
  pricing: {
    title: 1, subtitle: 1, featuredLabel: 1,
    plans: [{ name: 1, price: 1, period: 1, description: 1, features: ["string"], button: 1, featured: 1 }],
  },
  faq: { title: 1, subtitle: 1, items: [{ question: 1, answer: 1 }] },
  cta: { title: 1, subtitle: 1, button: 1, secondaryButton: 1 },
  contact: {
    title: 1, subtitle: 1, phone: 1, email: 1, address: 1, hours: 1, formAction: 1, mapEmbed: 1,
    form: { nameLabel: 1, emailLabel: 1, phoneLabel: 1, messageLabel: 1, submitLabel: 1 },
  },
  footer: { businessName: 1, description: 1, phone: 1, email: 1, address: 1, copyright: 1 },
  pages: [{ slug: 1, title: 1, body: 1 }],
};

const unknownKeys = [];
const warnings = [];

function check(node, spec, at) {
  if (node === null || node === undefined) return;
  if (Array.isArray(spec)) {
    if (!Array.isArray(node)) return unknownKeys.push(`${at} should be an array`);
    if (spec[0] === "string") return;
    node.forEach((item, i) => check(item, spec[0], `${at}[${i}]`));
  } else if (typeof spec === "object") {
    if (typeof node !== "object" || Array.isArray(node)) return unknownKeys.push(`${at} should be an object`);
    for (const key of Object.keys(node)) {
      if (!(key in spec)) unknownKeys.push(`${at}.${key}`);
      else if (typeof spec[key] === "object") check(node[key], spec[key], `${at}.${key}`);
    }
  }
}

check(config, CONFIG_SPEC, "config");
check(content, CONTENT_SPEC, "content");

// Variant ranges.
for (const [key, max] of Object.entries(VARIANT_MAX)) {
  const v = config.layout?.[key];
  if (v !== undefined && (typeof v !== "number" || v < 1 || v > max)) {
    warnings.push(`config.layout.${key} = ${v} is out of range 1–${max} (falls back to 1)`);
  }
}

// Icon names — read the real map from icons.tsx so this never drifts.
const iconsSource = fs.readFileSync(path.join(root, "src/lib/icons.tsx"), "utf8");
const mapMatch = iconsSource.match(/const icons[^=]*=\s*\{([\s\S]*?)\};/);
const knownIcons = new Set((mapMatch?.[1] ?? "").split(/[\s,]+/).filter((w) => /^[A-Z]\w*$/.test(w)));
const usedIcons = [];
(function collect(node, at) {
  if (Array.isArray(node)) node.forEach((v, i) => collect(v, `${at}[${i}]`));
  else if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) {
      if (k === "icon" && typeof v === "string") usedIcons.push([at, v]);
      else collect(v, `${at}.${k}`);
    }
  }
})(content, "content");
for (const [at, icon] of usedIcons) {
  if (!knownIcons.has(icon)) warnings.push(`${at}.icon = "${icon}" is not in src/lib/icons.tsx (falls back to Sparkles)`);
}

// Image paths.
(function collectImages(node, at) {
  if (Array.isArray(node)) node.forEach((v, i) => collectImages(v, `${at}[${i}]`));
  else if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) {
      if (["image", "logo", "favicon", "ogImage"].includes(k) && typeof v === "string" && v.startsWith("/")) {
        if (!fs.existsSync(path.join(root, "public", v.slice(1)))) {
          warnings.push(`${at}.${k} = "${v}" does not exist in /public (renders a placeholder)`);
        }
      } else collectImages(v, `${at}.${k}`);
    }
  }
})({ config, content }, "");

if (unknownKeys.length) {
  console.error("Unknown keys (typos? these are silently ignored by the site):");
  for (const k of unknownKeys) console.error(`  ✗ ${k}`);
}
if (warnings.length) {
  console.warn("Warnings:");
  for (const w of warnings) console.warn(`  ! ${w}`);
}
if (!unknownKeys.length && !warnings.length) console.log("config.json and content.json look good.");
process.exit(unknownKeys.length ? 1 : 0);
