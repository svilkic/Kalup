"use client";

import { useEffect, useRef, useState } from "react";
import { SlidersHorizontal, X, Copy, Download, Check, Dices } from "lucide-react";
import type { SiteConfig } from "@/lib/types";

/** Max variant count per section — keep in sync with clampVariant() calls in src/sections. */
const VARIANTS: Record<keyof SiteConfig["layout"], number> = {
  navbarVariant: 15,
  heroVariant: 15,
  servicesVariant: 15,
  aboutVariant: 15,
  featuresVariant: 15,
  galleryVariant: 15,
  testimonialsVariant: 15,
  pricingVariant: 15,
  faqVariant: 15,
  ctaVariant: 15,
  contactVariant: 15,
  footerVariant: 15,
};

const FONTS = ["Inter", "Manrope", "Sora", "Work Sans", "DM Sans"];

/** Curated palettes for Randomize — random combos of raw hex values look bad; these don't. */
const PALETTES = [
  { mainColor: "#0F766E", secondaryColor: "#F97316", accentColor: "#111827" },
  { mainColor: "#1D4ED8", secondaryColor: "#F59E0B", accentColor: "#0F172A" },
  { mainColor: "#4F46E5", secondaryColor: "#EC4899", accentColor: "#1E1B4B" },
  { mainColor: "#166534", secondaryColor: "#CA8A04", accentColor: "#14532D" },
  { mainColor: "#9F1239", secondaryColor: "#0D9488", accentColor: "#1C1917" },
  { mainColor: "#C2410C", secondaryColor: "#0369A1", accentColor: "#1C1917" },
  { mainColor: "#0369A1", secondaryColor: "#EA580C", accentColor: "#082F49" },
  { mainColor: "#7C3AED", secondaryColor: "#10B981", accentColor: "#2E1065" },
];

const RADII = ["0px", "8px", "12px", "16px", "24px"];

/** Folder names under config/presets/ — keep in sync when adding presets. */
const PRESETS = [
  { id: "plumber", label: "Plumber" },
  { id: "salon", label: "Salon" },
  { id: "cafe", label: "Café" },
  { id: "electrician", label: "Electrician" },
  { id: "dentist", label: "Dentist" },
  { id: "law", label: "Law Office" },
  { id: "auto", label: "Auto Repair" },
  { id: "fitness", label: "Fitness" },
  { id: "restaurant", label: "Restaurant" },
  { id: "photographer", label: "Photographer" },
  { id: "cleaning", label: "Cleaning" },
  { id: "accounting", label: "Accounting" },
];

const COLORS: { key: keyof SiteConfig["theme"]; label: string }[] = [
  { key: "mainColor", label: "Main" },
  { key: "secondaryColor", label: "Secondary" },
  { key: "accentColor", label: "Accent" },
  { key: "backgroundColor", label: "Background" },
  { key: "textColor", label: "Text" },
  { key: "mutedTextColor", label: "Muted text" },
];

/** Strips "px" for the number inputs; parse back on save. */
const px = (v: string) => parseInt(v, 10) || 0;

/**
 * Dev-only config editor. Every change is debounced and written to
 * config/config.json through /api/config — the dev server hot-reloads,
 * so theme and variant changes preview live. Export = copy or download
 * the same JSON to ship to a client project.
 */
export function ConfigSidebar({ initial }: { initial: SiteConfig }) {
  const [config, setConfig] = useState(initial);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Saving triggers a dev reload; keep the panel open across it.
  useEffect(() => {
    if (localStorage.getItem("config-sidebar-open") === "1") setOpen(true);
  }, []);
  const toggle = (next: boolean) => {
    setOpen(next);
    localStorage.setItem("config-sidebar-open", next ? "1" : "0");
  };

  const save = (next: SiteConfig) => {
    setConfig(next);
    setStatus("saving");
    clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      try {
        const res = await fetch("/api/config", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(next),
        });
        setStatus(res.ok ? "saved" : "error");
      } catch {
        setStatus("error");
      }
    }, 400);
  };

  const set = <S extends keyof SiteConfig>(section: S, key: keyof SiteConfig[S], value: unknown) =>
    save({ ...config, [section]: { ...config[section], [key]: value } });

  const randomize = () => {
    const pick = <T,>(arr: readonly T[]) => arr[Math.floor(Math.random() * arr.length)];
    const layout = { ...config.layout };
    for (const key of Object.keys(VARIANTS) as (keyof SiteConfig["layout"])[]) {
      layout[key] = 1 + Math.floor(Math.random() * VARIANTS[key]);
    }
    // Transparent navbar (3) is unreadable unless the hero has a dark top (3, 10, or 12).
    if (layout.navbarVariant === 3 && ![3, 10, 12].includes(layout.heroVariant)) layout.navbarVariant = 2;
    save({
      ...config,
      layout,
      theme: { ...config.theme, ...pick(PALETTES), fontFamily: pick(FONTS), borderRadius: pick(RADII) },
    });
  };

  const json = JSON.stringify(config, null, 2);

  const copyJson = async () => {
    await navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const downloadJson = () => {
    const url = URL.createObjectURL(new Blob([json], { type: "application/json" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "config.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!open) {
    return (
      <button
        type="button"
        data-dev-ui
        onClick={() => toggle(true)}
        aria-label="Open config editor"
        className="fixed right-4 bottom-4 z-[100] flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-white shadow-lg hover:bg-gray-700"
      >
        <SlidersHorizontal className="h-5 w-5" aria-hidden="true" />
      </button>
    );
  }

  const label = "block text-xs font-medium text-gray-500";
  const input = "mt-1 w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm text-gray-900";

  return (
    <aside
      data-dev-ui
      aria-label="Config editor"
      className="fixed top-0 right-0 bottom-0 z-[100] flex w-80 flex-col border-l border-gray-200 bg-white text-gray-900 shadow-2xl"
    >
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <h2 className="text-sm font-bold">Site config</h2>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400" role="status">
            {status === "saving" && "Saving…"}
            {status === "saved" && "Saved ✓"}
            {status === "error" && <span className="text-red-500">Save failed</span>}
          </span>
          <button type="button" onClick={() => toggle(false)} aria-label="Close config editor" className="text-gray-400 hover:text-gray-900">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 text-sm">
        <h3 className="mb-2 text-xs font-bold tracking-wide text-gray-400 uppercase">Preset</h3>
        <div className="grid grid-cols-2 gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={async () => {
                if (!confirm(`Replace the current config AND content with the "${p.label}" preset?`)) return;
                const res = await fetch("/api/preset", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ name: p.id }),
                });
                // Full reload so the sidebar and inline editor pick up the new files.
                if (res.ok) window.location.reload();
                else setStatus("error");
              }}
              className="rounded-md border border-gray-300 py-1.5 text-xs font-medium hover:bg-gray-50"
            >
              {p.label}
            </button>
          ))}
        </div>

        <h3 className="mt-6 mb-2 text-xs font-bold tracking-wide text-gray-400 uppercase">Brand</h3>
        <label className={label}>
          Business name
          <input
            type="text"
            value={config.brand.logoText}
            onChange={(e) => set("brand", "logoText", e.target.value)}
            className={input}
          />
        </label>

        <h3 className="mt-6 mb-2 text-xs font-bold tracking-wide text-gray-400 uppercase">Theme</h3>
        <div className="grid grid-cols-2 gap-3">
          {COLORS.map(({ key, label: name }) => (
            <label key={key} className={label}>
              {name}
              <span className="mt-1 flex items-center gap-2">
                <input
                  type="color"
                  value={config.theme[key]}
                  onChange={(e) => set("theme", key, e.target.value)}
                  className="h-8 w-8 shrink-0 cursor-pointer rounded border border-gray-300"
                />
                <code className="text-xs text-gray-600">{config.theme[key]}</code>
              </span>
            </label>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <label className={label}>
            Radius (px)
            <input
              type="number"
              min={0}
              max={40}
              value={px(config.theme.borderRadius)}
              onChange={(e) => set("theme", "borderRadius", `${e.target.value}px`)}
              className={input}
            />
          </label>
          <label className={label}>
            Container (px)
            <input
              type="number"
              min={800}
              max={1600}
              step={40}
              value={px(config.theme.containerWidth)}
              onChange={(e) => set("theme", "containerWidth", `${e.target.value}px`)}
              className={input}
            />
          </label>
        </div>
        <label className={`${label} mt-3`}>
          Font
          <select
            value={config.theme.fontFamily}
            onChange={(e) => set("theme", "fontFamily", e.target.value)}
            className={input}
          >
            {FONTS.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </label>

        <h3 className="mt-6 mb-2 text-xs font-bold tracking-wide text-gray-400 uppercase">Layout variants</h3>
        <div className="grid grid-cols-2 gap-3">
          {(Object.keys(VARIANTS) as (keyof SiteConfig["layout"])[]).map((key) => (
            <label key={key} className={label}>
              {key.replace("Variant", "")}
              <select
                value={config.layout[key]}
                onChange={(e) => set("layout", key, Number(e.target.value))}
                className={input}
              >
                {Array.from({ length: VARIANTS[key] }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>

        <h3 className="mt-6 mb-2 text-xs font-bold tracking-wide text-gray-400 uppercase">Sections</h3>
        <div className="flex flex-col gap-2">
          {(Object.keys(config.sections) as (keyof SiteConfig["sections"])[]).map((key) => (
            <label key={key} className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={config.sections[key]}
                onChange={(e) => set("sections", key, e.target.checked)}
                className="h-4 w-4 accent-gray-900"
              />
              {key.replace("show", "")}
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-gray-200 px-4 py-3">
        <button
          type="button"
          onClick={randomize}
          className="flex items-center justify-center gap-2 rounded-md border border-dashed border-gray-400 py-2 text-sm font-medium hover:bg-gray-50"
        >
          <Dices className="h-4 w-4" aria-hidden="true" />
          Randomize
        </button>
        <div className="flex gap-2">
        <button
          type="button"
          onClick={copyJson}
          className="flex flex-1 items-center justify-center gap-2 rounded-md border border-gray-300 py-2 text-sm font-medium hover:bg-gray-50"
        >
          {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
          {copied ? "Copied" : "Copy JSON"}
        </button>
        <button
          type="button"
          onClick={downloadJson}
          className="flex flex-1 items-center justify-center gap-2 rounded-md bg-gray-900 py-2 text-sm font-medium text-white hover:bg-gray-700"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Download
        </button>
        </div>
      </div>
    </aside>
  );
}
