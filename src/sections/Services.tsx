import { Section, SectionHeading } from "@/components/Section";
import { Card } from "@/components/Card";
import { SmartImage } from "@/components/SmartImage";
import { Icon } from "@/lib/icons";
import { cn, clampVariant } from "@/lib/utils";
import type { SiteContent } from "@/lib/types";

interface ServicesProps {
  variant?: number;
  content?: SiteContent["services"];
}

/**
 * Variants:
 * 1 — Simple 3-column cards with icons
 * 2 — Icon grid, borderless
 * 3 — Alternating image/text rows
 * 4 — Cards with image on top
 * 5 — Compact two-column list
 * 6 — Premium cards with hover lift
 * 7 — Numbered two-column list
 * 8 — Bento grid: first service featured wide with image
 * 9 — Tinted tiles with short accent rule
 * 10 — Tinted panel containing an icon grid
 * 11 — Centered cards with solid icon circles
 * 12 — Heading left, divider list right
 * 13 — Dark band with translucent cards
 * 14 — Checkerboard tiles
 * 15 — Big-type rows: large title left, description right
 */
export function Services({ variant, content = {} }: ServicesProps) {
  const v = clampVariant(variant, 15);
  const items = content.items ?? [];
  if (!items.length && !content.title) return null;

  if (v === 2) {
    return (
      <Section id="services">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={item.title ?? i} className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-brand bg-main-soft">
                <Icon name={item.icon} className="h-5 w-5 text-main" />
              </div>
              <div>
                <h3 className="font-semibold text-body">{item.title}</h3>
                {item.description && <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.description}</p>}
              </div>
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  if (v === 3) {
    return (
      <Section id="services">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <div className="flex flex-col gap-14 sm:gap-20">
          {items.map((item, i) => (
            <div
              key={item.title ?? i}
              className={cn("grid items-center gap-8 lg:grid-cols-2 lg:gap-14", i % 2 === 1 && "lg:[&>*:first-child]:order-2")}
            >
              <SmartImage src={item.image} alt={item.title} className="aspect-[3/2]" />
              <div>
                <h3 className="text-2xl font-bold text-body">{item.title}</h3>
                {item.description && <p className="mt-3 leading-relaxed text-muted">{item.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </Section>
    );
  }

  if (v === 4) {
    return (
      <Section id="services">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={item.title ?? i}>
              <Card look="outline" className="h-full overflow-hidden p-0">
                <SmartImage src={item.image} alt={item.title} className="aspect-[3/2] rounded-none!" />
                <div className="p-6">
                  <h3 className="font-semibold text-body">{item.title}</h3>
                  {item.description && <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>}
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  if (v === 5) {
    return (
      <Section id="services" className="bg-main-soft">
        <SectionHeading title={content.title} subtitle={content.subtitle} align="left" />
        <ul className="grid gap-x-12 gap-y-6 sm:grid-cols-2">
          {items.map((item, i) => (
            <li key={item.title ?? i} className="flex gap-3 border-b border-body/10 pb-6">
              <Icon name={item.icon} className="mt-0.5 h-5 w-5 shrink-0 text-main" />
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

  if (v === 6) {
    return (
      <Section id="services">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={item.title ?? i}>
              <Card
                look="raised"
                className="group h-full p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-body/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-brand bg-main text-white transition-colors group-hover:bg-main-strong">
                  <Icon name={item.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-body">{item.title}</h3>
                {item.description && <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>}
              </Card>
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  if (v === 7) {
    return (
      <Section id="services">
        <SectionHeading title={content.title} subtitle={content.subtitle} align="left" />
        <ol className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {items.map((item, i) => (
            <li key={item.title ?? i} className="flex gap-5">
              <span className="text-4xl font-bold tracking-tight text-main/25" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
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

  if (v === 8) {
    const [first, ...rest] = items;
    return (
      <Section id="services">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {first && (
            <Card look="soft" className="flex flex-col gap-6 p-8 sm:col-span-2 lg:flex-row lg:items-center">
              <div className="lg:flex-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-brand bg-main text-white">
                  <Icon name={first.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-2xl font-bold text-body">{first.title}</h3>
                {first.description && <p className="mt-2 leading-relaxed text-muted">{first.description}</p>}
              </div>
              <SmartImage src={first.image} alt={first.title} className="aspect-[3/2] w-full lg:max-w-72" sizes="18rem" />
            </Card>
          )}
          {rest.map((item, i) => (
            <Card key={item.title ?? i} look="outline" className="h-full">
              <div className="flex h-11 w-11 items-center justify-center rounded-brand bg-main-soft">
                <Icon name={item.icon} className="h-5 w-5 text-main" />
              </div>
              <h3 className="mt-4 font-semibold text-body">{item.title}</h3>
              {item.description && <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>}
            </Card>
          ))}
        </div>
      </Section>
    );
  }

  if (v === 9) {
    return (
      <Section id="services">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={item.title ?? i} className="h-full rounded-brand bg-main-soft p-6">
              <div className="flex items-center gap-3">
                <Icon name={item.icon} className="h-5 w-5 shrink-0 text-main" />
                <h3 className="font-semibold text-body">{item.title}</h3>
              </div>
              <div className="mt-4 h-0.5 w-8 bg-main" aria-hidden="true" />
              {item.description && <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>}
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  if (v === 10) {
    return (
      <Section id="services">
        <div className="rounded-brand bg-main-soft p-8 sm:p-12">
          <SectionHeading title={content.title} subtitle={content.subtitle} align="left" />
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <li key={item.title ?? i} className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-brand bg-white shadow-sm">
                  <Icon name={item.icon} className="h-5 w-5 text-main" />
                </div>
                <div>
                  <h3 className="font-semibold text-body">{item.title}</h3>
                  {item.description && <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.description}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    );
  }

  if (v === 11) {
    return (
      <Section id="services">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={item.title ?? i}>
              <Card look="outline" className="h-full text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-main text-white">
                  <Icon name={item.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-semibold text-body">{item.title}</h3>
                {item.description && <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>}
              </Card>
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  if (v === 12) {
    return (
      <Section id="services">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading title={content.title} subtitle={content.subtitle} align="left" />
          <ul className="divide-y divide-body/10">
            {items.map((item, i) => (
              <li key={item.title ?? i} className="flex gap-5 py-6 first:pt-0 last:pb-0">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-brand bg-main-soft">
                  <Icon name={item.icon} className="h-5 w-5 text-main" />
                </div>
                <div>
                  <h3 className="font-semibold text-body">{item.title}</h3>
                  {item.description && <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.description}</p>}
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
      <Section id="services" className="bg-accent">
        <SectionHeading title={content.title} subtitle={content.subtitle} dark />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={item.title ?? i} className="h-full rounded-brand border border-white/10 bg-white/5 p-6">
              <Icon name={item.icon} className="h-6 w-6 text-white" />
              <h3 className="mt-4 font-semibold text-white">{item.title}</h3>
              {item.description && <p className="mt-2 text-sm leading-relaxed text-white/70">{item.description}</p>}
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  if (v === 14) {
    return (
      <Section id="services">
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

  if (v === 15) {
    return (
      <Section id="services">
        <SectionHeading title={content.title} subtitle={content.subtitle} align="left" />
        <ul className="divide-y divide-body/10 border-y border-body/10">
          {items.map((item, i) => (
            <li key={item.title ?? i} className="grid gap-2 py-8 sm:grid-cols-[1fr_1.4fr] sm:gap-10">
              <h3 className="text-2xl font-bold tracking-tight text-body">{item.title}</h3>
              {item.description && <p className="leading-relaxed text-muted">{item.description}</p>}
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  // Variant 1 (default): simple 3-column cards.
  return (
    <Section id="services">
      <SectionHeading title={content.title} subtitle={content.subtitle} />
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <li key={item.title ?? i}>
            <Card look="outline" className="h-full">
              <div className="flex h-11 w-11 items-center justify-center rounded-brand bg-main-soft">
                <Icon name={item.icon} className="h-5 w-5 text-main" />
              </div>
              <h3 className="mt-4 font-semibold text-body">{item.title}</h3>
              {item.description && <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>}
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
