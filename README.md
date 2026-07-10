# Website Builder Template

A Next.js template for building simple, professional client websites fast. Almost everything — colors, fonts, layout, copy — is controlled from two JSON files. You should rarely need to touch component code.

```
config/config.json    → visual identity, section variants, SEO
config/content.json   → all text, images, and copy
```

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Visual config editor (dev only)

Run `npm run dev` and click the slider button in the bottom-right corner. The sidebar edits `config/config.json` live — colors, fonts, radius, section variants, and section visibility all save automatically and hot-reload in the page, so you can click through variants and watch the site change.

**Presets** at the top of the sidebar replace both JSON files with a ready-made starter — Plumber, Salon, Café, Electrician, Dentist, Law Office, Auto Repair, Fitness, Restaurant, Photographer, Cleaning, or Accounting — each with realistic copy, a matching palette, font, and variant choices. Start a new client site by applying the closest preset, then randomize and edit from there. Presets live in `config/presets/<name>/` — add your own folder with a `config.json` + `content.json` and list it in `PRESETS` in `src/components/ConfigSidebar.tsx`. Validate a preset with `npm run validate -- config/presets/<name>`.

**Randomize** shuffles every section variant plus the color palette, font, and border radius — palettes come from a curated list so the result is always presentable, and unreadable combinations (transparent navbar over a light hero) are automatically avoided. Click it a few times to explore looks, then fine-tune.

**Copy JSON** / **Download** export the current config to paste into another client project. The editor and its save endpoint only exist in development; production builds ship neither.

## Inline text editing (dev only)

With the dev server running, **right-click any text on the page** for an Edit / Delete menu, or **double-click** to edit directly (right-click is the safe option on buttons and links, where double-clicking also follows the link). Enter or clicking away saves straight into `config/content.json`; Escape cancels. **Delete** empties the field — the element disappears since sections skip empty values — and removes list items like badges entirely. The dark pill in the bottom-left corner shows save status and has Copy/Download buttons for exporting the whole `content.json`.

How it works: the double-clicked element's text is matched against the string values in `content.json`, so only text that actually comes from the content file is editable (labels like the © year prefix aren't). If the identical string appears twice in the file, editing updates the first occurrence — give items distinct text or edit the JSON directly for those. None of this affects SEO: it's development tooling only, and production builds prerender static HTML from the JSON exactly as before.

## How it works

- `config.json` sets **how the site looks**: theme colors, font, border radius, which layout variant each section uses, and which sections are visible.
- `content.json` sets **what the site says**: every heading, paragraph, button label, image path, and contact detail.
- Theme values become CSS variables on `<html>`, and every Tailwind utility in the components (`bg-main`, `text-muted`, `rounded-brand`, …) reads from them. Change one hex value, the whole site follows.
- Missing content fields never crash the page — sections with no content simply don't render, and missing images render a quiet placeholder.

## Changing colors

Edit `config/config.json` → `theme`:

```json
"theme": {
  "mainColor": "#0F766E",        // primary brand color (buttons, links, icons)
  "secondaryColor": "#F97316",   // accents (stars, secondary buttons)
  "accentColor": "#111827",      // dark bands (About v5, CTA v3, Footer v3)
  "backgroundColor": "#FFFFFF",  // page background
  "textColor": "#111827",        // headings and body text
  "mutedTextColor": "#6B7280",   // secondary text
  "borderRadius": "16px",        // roundness of cards and buttons ("0px" = sharp)
  "containerWidth": "1200px"     // max content width
}
```

Light tints (`main-soft`) and hover shades (`main-strong`) are derived automatically with `color-mix` — you only pick the base colors.

## Changing fonts

Set `theme.fontFamily` to one of: `Inter`, `Manrope`, `Sora`, `Work Sans`, `DM Sans`.

To add another Google font, edit `src/lib/fonts.ts` — import it and add one entry to the map. (next/font requires build-time imports, so fonts can't be fully dynamic.)

## Changing the logo

1. Drop your logo into `/public` (SVG recommended).
2. Point `brand.logo` at it and set `brand.logoText` in `config.json`.
3. Replace `/public/favicon.ico` with the client's favicon.

If `brand.logo` is empty, only the text logo renders.

## Choosing section variants

Each section has predefined layouts. Pick one by number in `config.json` → `layout`:

```json
"layout": {
  "navbarVariant": 2,
  "heroVariant": 6,
  "servicesVariant": 1
}
```

| Section | Variants | Options |
|---|---|---|
| Navbar | 14 | 1 centered · 2 classic left/right + CTA · 3 transparent overlay · 4 floating boxed · 5 minimal (menu button always) · 6 split links around centered logo · 7 solid dark bar · 8 uppercase underline links · 9 two-tier with brand strip · 10 left cluster + CTA right · 11 centered links + text CTA · 12 full-screen overlay menu · 13 CTA visible on mobile · 14 scrollable pill tabs, no hamburger · 15 slide-in drawer on mobile |
| Hero | 15 | 1 text+image · 2 centered · 3 full-bg image · 4 split card on tinted band · 5 minimal SaaS · 6 local business w/ trust badges · 7 with highlight cards · 8 with contact card · 9 editorial oversized heading · 10 split-screen brand panel + image · 11 tinted band w/ framed image below · 12 solid brand band, centered light text · 13 wide image w/ overlapping card · 14 text + stacked highlight cards · 15 mirrored image left |
| Services | 15 | 1 cards · 2 icon grid · 3 alternating rows · 4 image cards · 5 compact list · 6 premium hover cards · 7 numbered list · 8 bento grid w/ featured service · 9 tinted tiles w/ accent rule · 10 tinted panel icon grid · 11 centered cards w/ icon circles · 12 heading left + divider list · 13 dark band cards · 14 checkerboard tiles · 15 big-type rows |
| About | 15 | 1 image left · 2 image right + stats · 3 centered · 4 tinted band · 5 dark band + stats · 6 pull quote + round portrait · 7 full-bleed image w/ overlay · 8 editorial split heading/body · 9 framed image w/ offset backdrop · 10 magazine two-column body · 11 brand stats rail + text · 12 banner image + centered text · 13 tinted panel · 14 text + brand stat band · 15 editorial drop cap |
| Features | 15 | 1 icon grid · 2 checklist · 3 icon rows · 4 numbered steps · 5 bordered tiles · 6 tinted cards · 7 dark band icon grid · 8 checkerboard tiles · 9 vertical timeline · 10 large centered checklist · 11 brand band inline rows · 12 tinted heading panel + grid · 13 raised cards · 14 dense single-line rows · 15 text columns w/ dividers |
| Gallery | 15 | 1 grid · 2 masonry · 3 large w/ captions · 4 horizontal scroll · 5 captioned cards · 6 featured + small grid · 7 full-bleed tight grid · 8 wide tiles w/ hover zoom · 9 polaroid prints · 10 heading left + compact grid · 11 mosaic w/ double tiles · 12 single-column editorial · 13 diptych wide/narrow rows · 14 caption overlay on gradient · 15 staggered columns |
| Testimonials | 15 | 1 card grid · 2 large quote · 3 cards w/ stars · 4 minimal list · 5 tinted band · 6 cards w/ initial avatars · 7 dark band panels · 8 featured + compact list · 9 tinted cards w/ big quote marks · 10 brand band large quote · 11 masonry alternating tints · 12 zigzag alignment · 13 speech bubbles · 14 dark band w/ stars · 15 wide quote rows |
| Pricing | 15 | 1 cards · 2 featured highlight · 3 price list · 4 minimal columns · 5 tinted band · 6 single featured plan · 7 dark band cards · 8 horizontal rows · 9 brand-header cards · 10 menu w/ dotted leaders · 11 split panel w/ brand intro · 12 tinted two-column menu · 13 featured card + compact list · 14 numbered steps · 15 dark strip w/ one CTA |
| FAQ | 15 | 1 divider list · 2 two-column boxes · 3 boxed · 4 split title/list · 5 tinted boxed · 6 numbered open list · 7 two-column open grid · 8 tinted-row accordion cards · 9 single boxed group · 10 tinted panel accordion · 11 numbered accordion · 12 dark band accordion · 13 open Q-left/A-right rows · 14 centered large open list · 15 boxed w/ brand highlight on open |
| CTA | 15 | 1 brand band · 2 boxed card · 3 dark band · 4 minimal · 5 tinted box · 6 split card text/buttons · 7 gradient band · 8 brand band title/buttons row · 9 outlined card · 10 editorial row w/ heavy rules · 11 dark accent card · 12 tinted band split · 13 oversized title w/ accent rule · 14 two-tone split panels · 15 editorial text link |
| Contact | 15 | 1 info + form · 2 form card · 3 info cards only · 4 centered form · 5 tinted split · 6 dark band + form card · 7 minimal big phone/email · 8 brand info panel + form · 9 all-in-one raised card · 10 business-card info only · 11 mirrored form + tinted info · 12 split-screen brand half + form · 13 centered tinted form · 14 dark inline strip · 15 form + big phone card |
| Footer | 15 | 1 centered · 2 three columns · 3 dark columns · 4 minimal row · 5 brand-color · 6 large name + link row · 7 two bordered rows · 8 dark centered · 9 oversized watermark name · 10 slim brand strip · 11 double deck · 12 four columns w/ phone button · 13 dark watermark · 14 tinted centered · 15 split brand block |

An out-of-range number safely falls back to variant 1.

Notes:
- Navbar variant 3 (transparent overlay) pairs best with hero variant 3 (background image) — the hero automatically adds top padding when it's selected.
- Hero variant 7 uses `hero.highlights`; variant 8 uses `hero.contactCard`; variants 3/6 look best with `hero.badges` filled in.

## Editing website text

Everything is in `config/content.json`. Every field is optional — delete what you don't need and the section adapts. Images are paths into `/public`; until you add the actual files, placeholders render instead of broken images.

Icon names (`"icon": "Wrench"`) come from [lucide.dev](https://lucide.dev/icons). The available set is the curated map in `src/lib/icons.tsx` — add more there if needed (unknown names fall back to a default icon). In dev you don't need to know the names: **right-click any icon → Change icon** opens a visual picker of the whole set.

## Enabling / disabling sections

`config.json` → `sections`:

```json
"sections": {
  "showPricing": false,
  "showGallery": true
}
```

A section that's off renders nothing at all. Navbar, hero, contact anchors still work as long as the linked sections exist.

## SEO

`config.json` → `seo` drives title, meta description, keywords, canonical URL, Open Graph, and Twitter tags. Set `siteUrl` to the real domain before deploying — the sitemap, robots.txt, and canonical URL are generated from it (`/sitemap.xml`, `/robots.txt` come for free).

`seo.language` sets `<html lang>` (`"en"`, `"sr"`, `"de"`, …) — set it to match the language of your content. `seo.businessType` sets the schema.org type in the LocalBusiness JSON-LD (e.g. `"Plumber"`, `"HairSalon"`, `"Dentist"`, or plain `"LocalBusiness"`). Phone, email, and address in the JSON-LD come from `content.json` → `footer` / `contact`.

**Social share image:** a branded card (brand color + business name + title) is generated automatically at build time. To use a custom photo instead, add the file to `/public` and point `seo.ogImage` at it — the custom image wins only if the file actually exists, so a stale path can't ship a broken tag.

## Contact form

Set `contact.formAction` in `content.json` to a form endpoint URL (e.g. [Formspree](https://formspree.io) or Web3Forms — free tiers work fine) and submissions arrive by email with no backend of your own. When unset, the form falls back to `mailto:`, which depends on the visitor having a configured mail app — fine for previewing, not recommended for live client sites.

## Adding images (dev only)

With the dev server running, **right-click any image** (or placeholder) → **Replace image** → pick a file → crop it. The crop frame is locked to the aspect ratio of the slot you clicked, so what you frame is exactly what renders. On save the image is:

1. Resized (max 1600px wide) and converted to **WebP** in the browser — no image libraries needed
2. Saved into `/public/uploads/`
3. Its path written into `content.json` automatically

**Remove image** clears the path (the slot shows a placeholder again). Notes: WebP encoding needs Chrome/Edge/Firefox (Safari falls back to JPEG); replaced files stay in `/public/uploads` — prune old ones before deploying if you care about repo size; the navbar logo comes from `config.json`, so replace that one by hand.

## Legal / text pages

Add simple text pages (privacy policy, impressum, terms) in `content.json`:

```json
"pages": [
  { "slug": "privacy", "title": "Privacy Policy", "body": "First paragraph.\n\nSecond paragraph." }
]
```

Each page is statically generated at `/<slug>`, linked automatically next to the copyright in every footer variant, and included in the sitemap. Blank lines in `body` split paragraphs.

## Analytics

Set one of these in `config.json` → `seo` and the tracking script loads (nothing loads when unset):

```json
"plausibleDomain": "example.com"   // Plausible (cookie-free)
"gaId": "G-XXXXXXX"                // Google Analytics 4
```

## Mobile call button

`config.json` → `sections.showCallButton: true` shows a floating call button on phones (hidden on desktop), dialing `contact.phone`. For local service businesses this is usually the highest-converting element on the page.

## Map

Set `contact.mapEmbed` in `content.json` to a Google Maps embed URL (Share → Embed a map → copy the `src` of the iframe). The map renders below the contact section in every variant. Leave unset for no map.

## Validation

```bash
npm run validate
```

Checks both JSON files for unknown keys (typos are otherwise silently ignored), out-of-range variant numbers, icon names missing from the icon map, and image paths that don't exist in `/public`. Run it before deploying — exit code 1 on unknown keys makes it CI-friendly.

## Troubleshooting

The dev server console warns about config mistakes instead of failing silently: an unknown icon name in `content.json` (falls back to Sparkles) or an out-of-range variant number (falls back to variant 1). If something looks wrong, check the terminal first.

## Going live — checklist

1. **Content**: finish `config.json` + `content.json`; set `seo.siteUrl` to the real domain (canonical, sitemap, robots, and OG URLs derive from it), plus real title/description and `seo.language`.
2. **Assets**: real photos in `/public` for every image path in `content.json`; a real favicon (`brand.favicon`).
3. **Form**: set `contact.formAction` to a Formspree/Web3Forms endpoint — don't ship the `mailto:` fallback to clients.
4. **Rehearse**: `npm run build && npm start`, click through everything; check the dev terminal for `[wbuild]` warnings first.
5. **After deploy**: open `/sitemap.xml` and `/robots.txt` on the live domain, submit the sitemap in Google Search Console, paste the URL into a share-preview checker, and send one real test message through the form.

The dev tools (sidebar, inline editor, presets) exclude themselves from production automatically — nothing to strip.

## Showcasing the configurator (/demo)

Production builds normally strip the visual editor — client sites ship as plain static pages. To deploy a **public playground** of the tool itself, set the environment variable `NEXT_PUBLIC_DEMO=1` at build time (Netlify/Vercel → environment variables). The build then includes `/demo`: the full configurator — presets, variants, theme controls, randomize, right-click editing of text/images/icons, and JSON export — running entirely in the visitor's browser. Nothing is written to the server; changes live in browser state and reset on reload, and visitors export their result with the Download buttons. Image replacement works too (as session-only previews).

Without the variable, `/demo` is a 404 — so client deployments from the same repo stay clean. With it, the root URL also redirects straight to `/demo`, so the deployed domain *is* the playground. Test locally with `npm run build && npm start` after putting `NEXT_PUBLIC_DEMO=1` in `.env.local`.

## Deploying

The site is a standard Next.js app — any Next-compatible host works.

**Vercel (easiest):** push the repo to GitHub, import it at vercel.com, done. Every push deploys.

**Any Node server:**

```bash
npm run build
npm start        # serves on port 3000
```

Before going live: set `seo.siteUrl`, replace the favicon and logo, and add real images to `/public`.

## Project structure

```
config/               config.json + content.json — edit these
src/app/              layout (metadata, theme, JSON-LD), page, sitemap, robots
src/components/       Button, Card, Container, Section, SmartImage
src/sections/         one file per section, all variants inside
src/lib/              types, config loader with fallbacks, theme, fonts, icons
public/               logo, favicon, images referenced from content.json
```

To add a new variant to a section: open the section file, add a new `if (v === N)` branch, and bump the `clampVariant(variant, N)` max.
