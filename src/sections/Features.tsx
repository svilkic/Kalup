import { Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/Section";
import { Card } from "@/components/Card";
import { Icon } from "@/lib/icons";
import { clampVariant } from "@/lib/utils";
import type { SiteContent } from "@/lib/types";

interface FeaturesProps {
  variant?: number;
  content?: SiteContent["features"];
}

/**
 * Variants:
 * 1 — 3-column icon grid
 * 2 — Two-column checklist
 * 3 — Icon rows, left-aligned heading
 * 4 — Numbered steps
 * 5 — Bordered tile grid
 * 6 — Tinted card grid
 * 7 — Dark band with icon grid
 * 8 — Checkerboard tiles
 * 9 — Vertical timeline
 * 10 — Large centered checklist
 * 11 — Brand-color band with inline icon rows
 * 12 — Tinted heading panel beside a feature grid
 * 13 — Raised cards
 * 14 — Dense single-line rows
 * 15 — Text-forward columns with dividers, no icons
 */
export function Features({ variant, content = {} }: FeaturesProps) {
  const v = clampVariant(variant, 15);
  const items = content.items ?? [];
  if (!items.length && !content.title) return null;

  if (v === 2) {
    return (
      <Section id="features" className="bg-main-soft">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <ul className="mx-auto grid max-w-4xl gap-x-12 gap-y-6 sm:grid-cols-2">
          {items.map((item, i) => (
            <li key={item.title ?? i} className="flex gap-3">
              <Check className="mt-1 h-5 w-5 shrink-0 text-main" aria-hidden="true" />
              <div>
                <h3 className="font-semibold text-body">{item.title}</h3>
                {item.description && <p className="mt-1 text-sm leading-relaxed text-muted">{item.description}</p>}
              </div>
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  if (v === 3) {
    return (
      <Section id="features">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading title={content.title} subtitle={content.subtitle} align="left" />
          <ul className="flex flex-col gap-8">
            {items.map((item, i) => (
              <li key={item.title ?? i} className="flex gap-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-brand bg-main-soft">
                  <Icon name={item.icon} className="h-5 w-5 text-main" />
                </div>
                <div>
                  <h3 className="font-semibold text-body">{item.title}</h3>
                  {item.description && <p className="mt-1 text-sm leading-relaxed text-muted">{item.description}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    );
  }

  if (v === 4) {
    return (
      <Section id="features">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={item.title ?? i}>
              <span className="text-sm font-bold text-main" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-semibold text-body">{item.title}</h3>
              {item.description && <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>}
            </li>
          ))}
        </ol>
      </Section>
    );
  }

  if (v === 5) {
    return (
      <Section id="features">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <ul className="grid overflow-hidden rounded-brand border border-body/10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={item.title ?? i} className="-mr-px -mb-px border-r border-b border-body/10 p-8">
              <Icon name={item.icon} className="h-6 w-6 text-main" />
              <h3 className="mt-4 font-semibold text-body">{item.title}</h3>
              {item.description && <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>}
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  if (v === 6) {
    return (
      <Section id="features">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={item.title ?? i} className="h-full rounded-brand bg-main-soft p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-brand bg-white shadow-sm">
                <Icon name={item.icon} className="h-5 w-5 text-main" />
              </div>
              <h3 className="mt-4 font-semibold text-body">{item.title}</h3>
              {item.description && <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>}
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  if (v === 7) {
    return (
      <Section id="features" className="bg-accent">
        <SectionHeading title={content.title} subtitle={content.subtitle} dark />
        <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={item.title ?? i}>
              <div className="flex h-11 w-11 items-center justify-center rounded-brand bg-white/10">
                <Icon name={item.icon} className="h-5 w-5 text-white" />
              </div>
              <h3 className="mt-4 font-semibold text-white">{item.title}</h3>
              {item.description && <p className="mt-2 text-sm leading-relaxed text-white/70">{item.description}</p>}
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  if (v === 8) {
    return (
      <Section id="features">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <ul className="grid overflow-hidden rounded-brand sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={item.title ?? i} className={i % 2 === 0 ? "bg-main-soft p-8" : "bg-white p-8"}>
              <Icon name={item.icon} className="h-6 w-6 text-main" />
              <h3 className="mt-4 font-semibold text-body">{item.title}</h3>
              {item.description && <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>}
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  if (v === 9) {
    return (
      <Section id="features" containerClassName="max-w-2xl">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <ol className="flex flex-col">
          {items.map((item, i) => (
            <li key={item.title ?? i} className="group relative flex gap-5 pb-10 last:pb-0">
              <div className="flex flex-col items-center">
                <span className="mt-1 h-4 w-4 shrink-0 rounded-full border-2 border-main bg-main-soft" aria-hidden="true" />
                <span className="w-px flex-1 bg-main/20 group-last:hidden" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-semibold text-body">{item.title}</h3>
                {item.description && <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.description}</p>}
              </div>
            </li>
          ))}
        </ol>
      </Section>
    );
  }

  if (v === 10) {
    return (
      <Section id="features" containerClassName="max-w-2xl">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <ul className="flex flex-col gap-8">
          {items.map((item, i) => (
            <li key={item.title ?? i} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-main text-white">
                <Check className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-body">{item.title}</h3>
                {item.description && <p className="mt-1 leading-relaxed text-muted">{item.description}</p>}
              </div>
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  if (v === 11) {
    return (
      <Section id="features" className="bg-main">
        <SectionHeading title={content.title} subtitle={content.subtitle} dark />
        <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={item.title ?? i}>
              <div className="flex items-center gap-3">
                <Icon name={item.icon} className="h-5 w-5 shrink-0 text-white" />
                <h3 className="font-semibold text-white">{item.title}</h3>
              </div>
              {item.description && <p className="mt-2 text-sm leading-relaxed text-white/75">{item.description}</p>}
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  if (v === 12) {
    return (
      <Section id="features">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <div className="rounded-brand bg-main-soft p-8">
            {content.title && <h2 className="text-2xl font-bold tracking-tight text-body sm:text-3xl">{content.title}</h2>}
            {content.subtitle && <p className="mt-3 leading-relaxed text-muted">{content.subtitle}</p>}
          </div>
          <ul className="grid content-center gap-x-8 gap-y-8 sm:grid-cols-2">
            {items.map((item, i) => (
              <li key={item.title ?? i} className="flex gap-4">
                <Icon name={item.icon} className="mt-0.5 h-5 w-5 shrink-0 text-main" />
                <div>
                  <h3 className="font-semibold text-body">{item.title}</h3>
                  {item.description && <p className="mt-1 text-sm leading-relaxed text-muted">{item.description}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    );
  }

  if (v === 13) {
    return (
      <Section id="features">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={item.title ?? i}>
              <Card look="raised" className="h-full">
                <Icon name={item.icon} className="h-6 w-6 text-main" />
                <h3 className="mt-4 font-semibold text-body">{item.title}</h3>
                {item.description && <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>}
              </Card>
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  if (v === 14) {
    return (
      <Section id="features" containerClassName="max-w-3xl">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <ul className="divide-y divide-body/10 border-y border-body/10">
          {items.map((item, i) => (
            <li key={item.title ?? i} className="flex items-start gap-4 py-4">
              <Icon name={item.icon} className="mt-0.5 h-5 w-5 shrink-0 text-main" />
              <p className="text-sm leading-relaxed">
                <span className="font-semibold text-body">{item.title}.</span>{" "}
                {item.description && <span className="text-muted">{item.description}</span>}
              </p>
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  if (v === 15) {
    return (
      <Section id="features">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-body/10">
          {items.map((item, i) => (
            <div key={item.title ?? i} className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
              <h3 className="text-xl font-bold tracking-tight text-body">{item.title}</h3>
              {item.description && <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>}
            </div>
          ))}
        </div>
      </Section>
    );
  }

  // Variant 1 (default): 3-column icon grid.
  return (
    <Section id="features">
      <SectionHeading title={content.title} subtitle={content.subtitle} />
      <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <li key={item.title ?? i} className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-main-soft">
              <Icon name={item.icon} className="h-6 w-6 text-main" />
            </div>
            <h3 className="mt-4 font-semibold text-body">{item.title}</h3>
            {item.description && <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>}
          </li>
        ))}
      </ul>
    </Section>
  );
}
