import { Quote, Star } from "lucide-react";
import { Section, SectionHeading } from "@/components/Section";
import { Card } from "@/components/Card";
import { clampVariant } from "@/lib/utils";
import type { SiteContent } from "@/lib/types";

interface TestimonialsProps {
  variant?: number;
  content?: SiteContent["testimonials"];
}

type Item = { name?: string; role?: string; text?: string };

function Attribution({ item }: { item: Item }) {
  return (
    <footer className="mt-4">
      <p className="font-semibold text-body">{item.name}</p>
      {item.role && <p className="text-sm text-muted">{item.role}</p>}
    </footer>
  );
}

/**
 * Variants:
 * 1 — 3-card grid
 * 2 — One large centered quote per item, stacked
 * 3 — Two-column cards with stars
 * 4 — Minimal list with left border accent
 * 5 — Tinted band with white cards
 * 6 — Horizontal scroll cards (CSS scroll snap)
 * 7 — Dark band with quote panels
 * 8 — Featured quote left, compact list right
 * 9 — Tinted cards with oversized quote marks
 * 10 — Brand-color band with one large quote, rest below
 * 11 — Masonry columns with alternating card tints
 * 12 — Zigzag: quotes alternate left and right alignment
 * 13 — Speech bubbles with initial avatars below
 * 14 — Dark band with star ratings
 * 15 — Wide rows: quote left, attribution right
 */
export function Testimonials({ variant, content = {} }: TestimonialsProps) {
  const v = clampVariant(variant, 15);
  const items = content.items ?? [];
  if (!items.length) return null;

  if (v === 2) {
    const item = items[0];
    return (
      <Section id="testimonials" containerClassName="max-w-3xl text-center">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <blockquote>
          <Quote className="mx-auto h-8 w-8 text-main/30" aria-hidden="true" />
          <p className="mt-5 text-xl font-medium leading-relaxed text-body sm:text-2xl">“{item.text}”</p>
          <Attribution item={item} />
        </blockquote>
        {items.length > 1 && (
          <ul className="mt-14 grid gap-8 text-left sm:grid-cols-2">
            {items.slice(1).map((t, i) => (
              <li key={t.name ?? i}>
                <blockquote className="border-l-2 border-main/30 pl-4">
                  <p className="text-sm leading-relaxed text-muted">“{t.text}”</p>
                  <Attribution item={t} />
                </blockquote>
              </li>
            ))}
          </ul>
        )}
      </Section>
    );
  }

  if (v === 3) {
    return (
      <Section id="testimonials">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <ul className="grid gap-8 sm:grid-cols-2">
          {items.map((item, i) => (
            <li key={item.name ?? i}>
              <Card look="outline" className="h-full">
                <div className="flex gap-1" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-secondary text-secondary" aria-hidden="true" />
                  ))}
                </div>
                <blockquote>
                  <p className="mt-4 leading-relaxed text-body">“{item.text}”</p>
                  <Attribution item={item} />
                </blockquote>
              </Card>
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  if (v === 4) {
    return (
      <Section id="testimonials" containerClassName="max-w-3xl">
        <SectionHeading title={content.title} subtitle={content.subtitle} align="left" />
        <ul className="flex flex-col gap-10">
          {items.map((item, i) => (
            <li key={item.name ?? i}>
              <blockquote className="border-l-2 border-main pl-6">
                <p className="leading-relaxed text-body">“{item.text}”</p>
                <Attribution item={item} />
              </blockquote>
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  if (v === 5) {
    return (
      <Section id="testimonials" className="bg-main-soft">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <ul className="grid gap-8 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={item.name ?? i}>
              <Card look="raised" className="h-full">
                <Quote className="h-6 w-6 text-main/40" aria-hidden="true" />
                <blockquote>
                  <p className="mt-3 text-sm leading-relaxed text-body">“{item.text}”</p>
                  <Attribution item={item} />
                </blockquote>
              </Card>
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  if (v === 6) {
    return (
      <Section id="testimonials">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={item.name ?? i}>
              <Card look="outline" className="flex h-full flex-col">
                <blockquote className="flex-1">
                  <p className="text-sm leading-relaxed text-body">“{item.text}”</p>
                </blockquote>
                <div className="mt-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-main-soft text-sm font-bold text-main">
                    {(item.name ?? "?").trim().charAt(0).toUpperCase()}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-body">{item.name}</p>
                    {item.role && <p className="text-xs text-muted">{item.role}</p>}
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  if (v === 7) {
    return (
      <Section id="testimonials" className="bg-accent">
        <SectionHeading title={content.title} subtitle={content.subtitle} dark />
        <ul className="grid gap-6 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={item.name ?? i}>
              <blockquote className="h-full rounded-brand border border-white/10 bg-white/5 p-6">
                <p className="text-sm leading-relaxed text-white/90">“{item.text}”</p>
                <footer className="mt-4">
                  <p className="font-semibold text-white">{item.name}</p>
                  {item.role && <p className="text-sm text-white/60">{item.role}</p>}
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  if (v === 8) {
    const [first, ...rest] = items;
    return (
      <Section id="testimonials">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <Card look="soft" className="p-8 sm:p-10">
            <Quote className="h-7 w-7 text-main/40" aria-hidden="true" />
            <blockquote>
              <p className="mt-4 text-xl font-medium leading-relaxed text-body">“{first.text}”</p>
              <Attribution item={first} />
            </blockquote>
          </Card>
          <ul className="flex flex-col justify-center gap-6">
            {rest.map((item, i) => (
              <li key={item.name ?? i} className="border-b border-body/10 pb-6 last:border-0 last:pb-0">
                <blockquote>
                  <p className="text-sm leading-relaxed text-body">“{item.text}”</p>
                  <Attribution item={item} />
                </blockquote>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    );
  }

  if (v === 9) {
    return (
      <Section id="testimonials">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <ul className="grid gap-8 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={item.name ?? i}>
              <div className="relative h-full rounded-brand bg-main-soft p-6 pt-12">
                <span className="absolute top-4 left-6 font-serif text-6xl leading-none text-main/25" aria-hidden="true">
                  “
                </span>
                <blockquote>
                  <p className="text-sm leading-relaxed text-body">{item.text}</p>
                  <Attribution item={item} />
                </blockquote>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  if (v === 10) {
    const [first, ...rest] = items;
    return (
      <Section id="testimonials" className="bg-main">
        <div className="mx-auto max-w-3xl text-center">
          <Quote className="mx-auto h-8 w-8 text-white/40" aria-hidden="true" />
          <blockquote>
            <p className="mt-5 text-xl font-medium leading-relaxed text-white sm:text-2xl">“{first.text}”</p>
            <footer className="mt-5">
              <p className="font-semibold text-white">{first.name}</p>
              {first.role && <p className="text-sm text-white/70">{first.role}</p>}
            </footer>
          </blockquote>
        </div>
        {rest.length > 0 && (
          <ul className="mt-12 grid gap-8 sm:grid-cols-2">
            {rest.map((item, i) => (
              <li key={item.name ?? i}>
                <blockquote className="border-l-2 border-white/30 pl-4">
                  <p className="text-sm leading-relaxed text-white/85">“{item.text}”</p>
                  <footer className="mt-3">
                    <p className="text-sm font-semibold text-white">{item.name}</p>
                    {item.role && <p className="text-xs text-white/60">{item.role}</p>}
                  </footer>
                </blockquote>
              </li>
            ))}
          </ul>
        )}
      </Section>
    );
  }

  if (v === 11) {
    return (
      <Section id="testimonials">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <div className="gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
          {items.map((item, i) => (
            <div key={item.name ?? i} className={i % 2 === 0 ? "rounded-brand bg-main-soft p-6" : "rounded-brand border border-body/10 bg-white p-6"}>
              <blockquote>
                <p className="text-sm leading-relaxed text-body">“{item.text}”</p>
                <Attribution item={item} />
              </blockquote>
            </div>
          ))}
        </div>
      </Section>
    );
  }

  if (v === 12) {
    return (
      <Section id="testimonials" containerClassName="max-w-3xl">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <div className="flex flex-col gap-12">
          {items.map((item, i) => (
            <blockquote key={item.name ?? i} className={i % 2 === 1 ? "max-w-md self-end text-right" : "max-w-md self-start"}>
              <p className="text-lg leading-relaxed text-body">“{item.text}”</p>
              <Attribution item={item} />
            </blockquote>
          ))}
        </div>
      </Section>
    );
  }

  if (v === 13) {
    return (
      <Section id="testimonials">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={item.name ?? i}>
              <div className="rounded-brand rounded-bl-none bg-main-soft p-6">
                <p className="text-sm leading-relaxed text-body">“{item.text}”</p>
              </div>
              <div className="mt-3 flex items-center gap-3 pl-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-main text-sm font-bold text-white">
                  {(item.name ?? "?").trim().charAt(0).toUpperCase()}
                </span>
                <div>
                  <p className="text-sm font-semibold text-body">{item.name}</p>
                  {item.role && <p className="text-xs text-muted">{item.role}</p>}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  if (v === 14) {
    return (
      <Section id="testimonials" className="bg-accent">
        <SectionHeading title={content.title} subtitle={content.subtitle} dark />
        <ul className="grid gap-10 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={item.name ?? i}>
              <div className="flex gap-1" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-secondary text-secondary" aria-hidden="true" />
                ))}
              </div>
              <blockquote>
                <p className="mt-4 text-sm leading-relaxed text-white/90">“{item.text}”</p>
                <footer className="mt-4">
                  <p className="font-semibold text-white">{item.name}</p>
                  {item.role && <p className="text-sm text-white/60">{item.role}</p>}
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  if (v === 15) {
    return (
      <Section id="testimonials">
        <SectionHeading title={content.title} subtitle={content.subtitle} align="left" />
        <ul className="divide-y divide-body/10 border-y border-body/10">
          {items.map((item, i) => (
            <li key={item.name ?? i} className="grid gap-4 py-8 lg:grid-cols-[2fr_1fr] lg:gap-12">
              <blockquote>
                <p className="text-lg leading-relaxed text-body">“{item.text}”</p>
              </blockquote>
              <div>
                <p className="font-semibold text-body">{item.name}</p>
                {item.role && <p className="mt-0.5 text-sm text-muted">{item.role}</p>}
              </div>
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  // Variant 1 (default): 3-card grid.
  return (
    <Section id="testimonials">
      <SectionHeading title={content.title} subtitle={content.subtitle} />
      <ul className="grid gap-8 lg:grid-cols-3">
        {items.map((item, i) => (
          <li key={item.name ?? i}>
            <Card look="outline" className="h-full">
              <blockquote>
                <p className="leading-relaxed text-body">“{item.text}”</p>
                <Attribution item={item} />
              </blockquote>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
