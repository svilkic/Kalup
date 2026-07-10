import { Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/Section";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { cn, clampVariant } from "@/lib/utils";
import type { SiteContent } from "@/lib/types";

interface PricingProps {
  variant?: number;
  content?: SiteContent["pricing"];
}

type Plan = NonNullable<NonNullable<SiteContent["pricing"]>["plans"]>[number];

function PlanFeatures({ features }: { features?: string[] }) {
  if (!features?.length) return null;
  return (
    <ul className="mt-6 flex flex-col gap-3">
      {features.map((f) => (
        <li key={f} className="flex gap-2.5 text-sm text-body/80">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-main" aria-hidden="true" />
          {f}
        </li>
      ))}
    </ul>
  );
}

function Price({ plan, dark }: { plan: Plan; dark?: boolean }) {
  return (
    <p className="mt-4 flex items-baseline gap-2">
      <span className={cn("text-3xl font-bold tracking-tight", dark ? "text-white" : "text-body")}>{plan.price}</span>
      {plan.period && <span className={cn("text-sm", dark ? "text-white/70" : "text-muted")}>{plan.period}</span>}
    </p>
  );
}

/**
 * Variants:
 * 1 — 3-column cards
 * 2 — Cards with a highlighted featured plan
 * 3 — Stacked rows (price list style)
 * 4 — Minimal side-by-side, no cards
 * 5 — Tinted band with white cards
 * 6 — Single featured plan, centered
 * 7 — Dark band with white cards
 * 8 — Horizontal plan rows
 * 9 — Cards with brand-color header band
 * 10 — Menu style with dotted leaders
 * 11 — Split panel: brand-color intro beside plan rows
 * 12 — Tinted panel with a two-column menu
 * 13 — Featured plan card beside a compact list
 * 14 — Numbered steps with big prices
 * 15 — Dark strip: plans inline with one CTA
 */
export function Pricing({ variant, content = {} }: PricingProps) {
  const v = clampVariant(variant, 15);
  const plans = content.plans ?? [];
  if (!plans.length) return null;

  if (v === 2) {
    return (
      <Section id="pricing">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <ul className="grid items-stretch gap-8 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <li key={plan.name ?? i}>
              <Card
                look={plan.featured ? "raised" : "outline"}
                className={cn("flex h-full flex-col p-8", plan.featured && "border-2 border-main")}
              >
                {plan.featured && (
                  <span className="mb-3 self-start rounded-full bg-main px-3 py-1 text-xs font-semibold text-white">
                    {content.featuredLabel ?? "Most popular"}
                  </span>
                )}
                <h3 className="text-lg font-semibold text-body">{plan.name}</h3>
                <Price plan={plan} />
                {plan.description && <p className="mt-3 text-sm leading-relaxed text-muted">{plan.description}</p>}
                <PlanFeatures features={plan.features} />
                {plan.button && (
                  <Button href="#contact" variant={plan.featured ? "primary" : "outline"} className="mt-8 w-full">
                    {plan.button}
                  </Button>
                )}
              </Card>
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  if (v === 3) {
    return (
      <Section id="pricing" containerClassName="max-w-3xl">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <ul className="divide-y divide-body/10 rounded-brand border border-body/10">
          {plans.map((plan, i) => (
            <li key={plan.name ?? i} className="flex flex-wrap items-center justify-between gap-4 p-6">
              <div className="min-w-0">
                <h3 className="font-semibold text-body">{plan.name}</h3>
                {plan.description && <p className="mt-1 text-sm text-muted">{plan.description}</p>}
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-body">{plan.price}</p>
                {plan.period && <p className="text-xs text-muted">{plan.period}</p>}
              </div>
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  if (v === 4) {
    return (
      <Section id="pricing">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <div className="grid gap-12 divide-body/10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-0 lg:divide-x">
          {plans.map((plan, i) => (
            <div key={plan.name ?? i} className="lg:px-10">
              <h3 className="font-semibold text-body">{plan.name}</h3>
              <Price plan={plan} />
              {plan.description && <p className="mt-3 text-sm leading-relaxed text-muted">{plan.description}</p>}
              <PlanFeatures features={plan.features} />
            </div>
          ))}
        </div>
      </Section>
    );
  }

  if (v === 5) {
    return (
      <Section id="pricing" className="bg-main-soft">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <ul className="grid items-stretch gap-8 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <li key={plan.name ?? i}>
              <Card look="flat" className="flex h-full flex-col p-8 shadow-sm">
                <h3 className="text-lg font-semibold text-body">{plan.name}</h3>
                <Price plan={plan} />
                {plan.description && <p className="mt-3 text-sm leading-relaxed text-muted">{plan.description}</p>}
                <PlanFeatures features={plan.features} />
                {plan.button && (
                  <Button href="#contact" variant="outline" className="mt-8 w-full">{plan.button}</Button>
                )}
              </Card>
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  if (v === 6) {
    const plan = plans.find((p) => p.featured) ?? plans[0];
    return (
      <Section id="pricing" containerClassName="max-w-lg">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <Card look="raised" className="border-2 border-main p-8 sm:p-10">
          <h3 className="text-lg font-semibold text-body">{plan.name}</h3>
          <Price plan={plan} />
          {plan.description && <p className="mt-3 text-sm leading-relaxed text-muted">{plan.description}</p>}
          <PlanFeatures features={plan.features} />
          {plan.button && <Button href="#contact" size="lg" className="mt-8 w-full">{plan.button}</Button>}
        </Card>
      </Section>
    );
  }

  if (v === 7) {
    return (
      <Section id="pricing" className="bg-accent">
        <SectionHeading title={content.title} subtitle={content.subtitle} dark />
        <ul className="grid items-stretch gap-8 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <li key={plan.name ?? i}>
              <Card look="flat" className="flex h-full flex-col p-8">
                <h3 className="text-lg font-semibold text-body">{plan.name}</h3>
                <Price plan={plan} />
                {plan.description && <p className="mt-3 text-sm leading-relaxed text-muted">{plan.description}</p>}
                <PlanFeatures features={plan.features} />
                {plan.button && (
                  <Button href="#contact" variant={plan.featured ? "primary" : "outline"} className="mt-8 w-full">
                    {plan.button}
                  </Button>
                )}
              </Card>
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  if (v === 8) {
    return (
      <Section id="pricing" containerClassName="max-w-4xl">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <ul className="flex flex-col gap-6">
          {plans.map((plan, i) => (
            <li key={plan.name ?? i}>
              <Card look="outline" className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center">
                <div className="shrink-0 lg:w-56">
                  <h3 className="font-semibold text-body">{plan.name}</h3>
                  <Price plan={plan} />
                </div>
                <div className="flex-1">
                  {plan.description && <p className="text-sm leading-relaxed text-muted">{plan.description}</p>}
                  {plan.features && plan.features.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-body/80">
                          <Check className="h-4 w-4 shrink-0 text-main" aria-hidden="true" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {plan.button && (
                  <Button href="#contact" variant={plan.featured ? "primary" : "outline"} className="shrink-0 self-start lg:self-center">
                    {plan.button}
                  </Button>
                )}
              </Card>
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  if (v === 9) {
    return (
      <Section id="pricing">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <ul className="grid items-stretch gap-8 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <li key={plan.name ?? i}>
              <div className="flex h-full flex-col overflow-hidden rounded-brand border border-body/10">
                <div className="bg-main px-6 py-5 text-white">
                  <h3 className="font-semibold">{plan.name}</h3>
                  <p className="mt-1 flex items-baseline gap-2">
                    <span className="text-2xl font-bold tracking-tight">{plan.price}</span>
                    {plan.period && <span className="text-sm text-white/70">{plan.period}</span>}
                  </p>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  {plan.description && <p className="text-sm leading-relaxed text-muted">{plan.description}</p>}
                  <PlanFeatures features={plan.features} />
                  {plan.button && (
                    <div className="mt-auto pt-8">
                      <Button href="#contact" variant="outline" className="w-full">{plan.button}</Button>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  if (v === 10) {
    return (
      <Section id="pricing" containerClassName="max-w-2xl">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <ul className="flex flex-col gap-6">
          {plans.map((plan, i) => (
            <li key={plan.name ?? i}>
              <div className="flex items-baseline gap-3">
                <h3 className="font-semibold text-body">{plan.name}</h3>
                <span className="flex-1 border-b border-dotted border-body/30" aria-hidden="true" />
                <span className="font-bold text-body">{plan.price}</span>
              </div>
              {(plan.description || plan.period) && (
                <p className="mt-1 text-sm text-muted">{[plan.description, plan.period].filter(Boolean).join(" · ")}</p>
              )}
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  if (v === 11) {
    const ctaLabel = plans.find((p) => p.button)?.button;
    return (
      <Section id="pricing">
        <div className="grid overflow-hidden rounded-brand border border-body/10 lg:grid-cols-[1fr_1.6fr]">
          <div className="bg-main p-8 sm:p-10">
            {content.title && <h2 className="text-3xl font-bold tracking-tight text-white">{content.title}</h2>}
            {content.subtitle && <p className="mt-4 leading-relaxed text-white/80">{content.subtitle}</p>}
            {ctaLabel && (
              <div className="mt-8">
                <Button href="#contact" variant="inverted">{ctaLabel}</Button>
              </div>
            )}
          </div>
          <ul className="divide-y divide-body/10 bg-white">
            {plans.map((plan, i) => (
              <li key={plan.name ?? i} className="flex items-center justify-between gap-6 p-6">
                <div className="min-w-0">
                  <h3 className="font-semibold text-body">{plan.name}</h3>
                  {plan.description && <p className="mt-1 text-sm leading-relaxed text-muted">{plan.description}</p>}
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-xl font-bold tracking-tight text-body">{plan.price}</p>
                  {plan.period && <p className="text-xs text-muted">{plan.period}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    );
  }

  if (v === 12) {
    return (
      <Section id="pricing">
        <div className="rounded-brand bg-main-soft p-8 sm:p-12">
          <SectionHeading title={content.title} subtitle={content.subtitle} align="left" />
          <ul className="grid gap-x-12 gap-y-6 md:grid-cols-2">
            {plans.map((plan, i) => (
              <li key={plan.name ?? i}>
                <div className="flex items-baseline gap-3">
                  <h3 className="font-semibold text-body">{plan.name}</h3>
                  <span className="flex-1 border-b border-dotted border-body/30" aria-hidden="true" />
                  <span className="font-bold text-body">{plan.price}</span>
                </div>
                {(plan.description || plan.period) && (
                  <p className="mt-1 text-sm text-muted">{[plan.description, plan.period].filter(Boolean).join(" · ")}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Section>
    );
  }

  if (v === 13) {
    const featured = plans.find((p) => p.featured) ?? plans[0];
    const rest = plans.filter((p) => p !== featured);
    return (
      <Section id="pricing">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_1fr]">
          <Card look="raised" className="border-2 border-main p-8">
            <h3 className="text-lg font-semibold text-body">{featured.name}</h3>
            <Price plan={featured} />
            {featured.description && <p className="mt-3 text-sm leading-relaxed text-muted">{featured.description}</p>}
            <PlanFeatures features={featured.features} />
            {featured.button && <Button href="#contact" size="lg" className="mt-8 w-full">{featured.button}</Button>}
          </Card>
          <ul className="divide-y divide-body/10">
            {rest.map((plan, i) => (
              <li key={plan.name ?? i} className="flex items-center justify-between gap-4 py-5 first:pt-0">
                <div className="min-w-0">
                  <h3 className="font-semibold text-body">{plan.name}</h3>
                  {plan.description && <p className="mt-1 text-sm text-muted">{plan.description}</p>}
                </div>
                <p className="shrink-0 font-bold text-body">{plan.price}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    );
  }

  if (v === 14) {
    return (
      <Section id="pricing">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <li key={plan.name ?? i}>
              <span className="text-sm font-bold text-main" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-semibold text-body">{plan.name}</h3>
              <Price plan={plan} />
              {plan.description && <p className="mt-2 text-sm leading-relaxed text-muted">{plan.description}</p>}
            </li>
          ))}
        </ol>
      </Section>
    );
  }

  if (v === 15) {
    const ctaLabel = plans.find((p) => p.button)?.button;
    return (
      <Section id="pricing" className="bg-accent">
        <SectionHeading title={content.title} subtitle={content.subtitle} dark />
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <ul className="grid flex-1 gap-8 sm:grid-cols-3">
            {plans.map((plan, i) => (
              <li key={plan.name ?? i}>
                <h3 className="text-sm font-medium text-white/70">{plan.name}</h3>
                <p className="mt-1 text-2xl font-bold tracking-tight text-white">{plan.price}</p>
                {plan.period && <p className="mt-0.5 text-xs text-white/50">{plan.period}</p>}
              </li>
            ))}
          </ul>
          {ctaLabel && (
            <Button href="#contact" size="lg" variant="inverted" className="shrink-0 self-start lg:self-center">
              {ctaLabel}
            </Button>
          )}
        </div>
      </Section>
    );
  }

  // Variant 1 (default): 3-column cards.
  return (
    <Section id="pricing">
      <SectionHeading title={content.title} subtitle={content.subtitle} />
      <ul className="grid items-stretch gap-8 lg:grid-cols-3">
        {plans.map((plan, i) => (
          <li key={plan.name ?? i}>
            <Card look="outline" className="flex h-full flex-col p-8">
              <h3 className="text-lg font-semibold text-body">{plan.name}</h3>
              <Price plan={plan} />
              {plan.description && <p className="mt-3 text-sm leading-relaxed text-muted">{plan.description}</p>}
              <PlanFeatures features={plan.features} />
              {plan.button && (
                <Button href="#contact" variant="outline" className="mt-8 w-full">{plan.button}</Button>
              )}
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
