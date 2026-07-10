import { ChevronDown } from "lucide-react";
import { Section, SectionHeading } from "@/components/Section";
import { cn, clampVariant } from "@/lib/utils";
import type { SiteContent } from "@/lib/types";

interface FAQProps {
  variant?: number;
  content?: SiteContent["faq"];
}

type Item = { question?: string; answer?: string };

/* Native <details>/<summary> — accessible, keyboard-friendly, zero JS. */
function FaqItem({ item, boxed }: { item: Item; boxed?: boolean }) {
  return (
    <details className={cn(boxed ? "rounded-brand border border-body/10 bg-white px-6 py-4" : "py-5")}>
      <summary className="flex items-center justify-between gap-4 font-semibold text-body">
        {item.question}
        <ChevronDown className="faq-chevron h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
      </summary>
      {item.answer && <p className="mt-3 leading-relaxed text-muted">{item.answer}</p>}
    </details>
  );
}

/**
 * Variants:
 * 1 — Single column, divider list
 * 2 — Two-column grid of boxed items
 * 3 — Boxed cards, single column
 * 4 — Title left, questions right
 * 5 — Tinted band, boxed items
 * 6 — Numbered list, all answers visible (no accordion)
 * 7 — Two-column open Q&A grid
 * 8 — Accordion cards with tinted question row
 * 9 — Single boxed accordion group
 * 10 — Tinted panel accordion
 * 11 — Numbered accordion
 * 12 — Dark band accordion
 * 13 — Open rows: question left, answer right
 * 14 — Centered large open list
 * 15 — Boxed accordion, open item highlights in brand color
 */
export function FAQ({ variant, content = {} }: FAQProps) {
  const v = clampVariant(variant, 15);
  const items = content.items ?? [];
  if (!items.length) return null;

  if (v === 2) {
    return (
      <Section id="faq">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <div className="grid items-start gap-4 lg:grid-cols-2">
          {items.map((item, i) => (
            <FaqItem key={item.question ?? i} item={item} boxed />
          ))}
        </div>
      </Section>
    );
  }

  if (v === 3) {
    return (
      <Section id="faq" containerClassName="max-w-3xl">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <div className="flex flex-col gap-4">
          {items.map((item, i) => (
            <FaqItem key={item.question ?? i} item={item} boxed />
          ))}
        </div>
      </Section>
    );
  }

  if (v === 4) {
    return (
      <Section id="faq">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading title={content.title} subtitle={content.subtitle} align="left" />
          <div className="divide-y divide-body/10 border-y border-body/10">
            {items.map((item, i) => (
              <FaqItem key={item.question ?? i} item={item} />
            ))}
          </div>
        </div>
      </Section>
    );
  }

  if (v === 5) {
    return (
      <Section id="faq" className="bg-main-soft" containerClassName="max-w-3xl">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <div className="flex flex-col gap-4">
          {items.map((item, i) => (
            <FaqItem key={item.question ?? i} item={item} boxed />
          ))}
        </div>
      </Section>
    );
  }

  if (v === 6) {
    return (
      <Section id="faq" containerClassName="max-w-3xl">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <ol className="flex flex-col gap-8">
          {items.map((item, i) => (
            <li key={item.question ?? i} className="flex gap-4">
              <span className="text-sm font-bold text-main" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-semibold text-body">{item.question}</h3>
                {item.answer && <p className="mt-2 leading-relaxed text-muted">{item.answer}</p>}
              </div>
            </li>
          ))}
        </ol>
      </Section>
    );
  }

  if (v === 7) {
    return (
      <Section id="faq">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <ul className="grid gap-x-12 gap-y-10 lg:grid-cols-2">
          {items.map((item, i) => (
            <li key={item.question ?? i}>
              <h3 className="font-semibold text-body">{item.question}</h3>
              {item.answer && <p className="mt-2 text-sm leading-relaxed text-muted">{item.answer}</p>}
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  if (v === 8) {
    return (
      <Section id="faq" containerClassName="max-w-3xl">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <div className="flex flex-col gap-4">
          {items.map((item, i) => (
            <details key={item.question ?? i} className="overflow-hidden rounded-brand border border-body/10">
              <summary className="flex items-center justify-between gap-4 bg-main-soft px-6 py-4 font-semibold text-body">
                {item.question}
                <ChevronDown className="faq-chevron h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
              </summary>
              {item.answer && <p className="px-6 py-4 leading-relaxed text-muted">{item.answer}</p>}
            </details>
          ))}
        </div>
      </Section>
    );
  }

  if (v === 9) {
    return (
      <Section id="faq" containerClassName="max-w-3xl">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <div className="divide-y divide-body/10 rounded-brand border border-body/10 px-6">
          {items.map((item, i) => (
            <FaqItem key={item.question ?? i} item={item} />
          ))}
        </div>
      </Section>
    );
  }

  if (v === 10) {
    return (
      <Section id="faq" containerClassName="max-w-3xl">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <div className="divide-y divide-body/10 rounded-brand bg-main-soft px-6 sm:px-8">
          {items.map((item, i) => (
            <FaqItem key={item.question ?? i} item={item} />
          ))}
        </div>
      </Section>
    );
  }

  if (v === 11) {
    return (
      <Section id="faq" containerClassName="max-w-3xl">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <div className="divide-y divide-body/10 border-y border-body/10">
          {items.map((item, i) => (
            <details key={item.question ?? i} className="py-5">
              <summary className="flex items-center gap-4 font-semibold text-body">
                <span className="text-sm font-bold text-main" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">{item.question}</span>
                <ChevronDown className="faq-chevron h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
              </summary>
              {item.answer && <p className="mt-3 pl-10 leading-relaxed text-muted">{item.answer}</p>}
            </details>
          ))}
        </div>
      </Section>
    );
  }

  if (v === 12) {
    return (
      <Section id="faq" className="bg-accent" containerClassName="max-w-3xl">
        <SectionHeading title={content.title} subtitle={content.subtitle} dark />
        <div className="divide-y divide-white/10 border-y border-white/10">
          {items.map((item, i) => (
            <details key={item.question ?? i} className="py-5">
              <summary className="flex items-center justify-between gap-4 font-semibold text-white">
                {item.question}
                <ChevronDown className="faq-chevron h-5 w-5 shrink-0 text-white/60" aria-hidden="true" />
              </summary>
              {item.answer && <p className="mt-3 leading-relaxed text-white/75">{item.answer}</p>}
            </details>
          ))}
        </div>
      </Section>
    );
  }

  if (v === 13) {
    return (
      <Section id="faq">
        <SectionHeading title={content.title} subtitle={content.subtitle} align="left" />
        <ul className="divide-y divide-body/10 border-y border-body/10">
          {items.map((item, i) => (
            <li key={item.question ?? i} className="grid gap-2 py-6 lg:grid-cols-[1fr_1.6fr] lg:gap-12">
              <h3 className="font-semibold text-body">{item.question}</h3>
              {item.answer && <p className="leading-relaxed text-muted">{item.answer}</p>}
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  if (v === 14) {
    return (
      <Section id="faq" containerClassName="max-w-2xl text-center">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <ul className="flex flex-col gap-10">
          {items.map((item, i) => (
            <li key={item.question ?? i}>
              <h3 className="text-xl font-semibold text-body">{item.question}</h3>
              {item.answer && <p className="mt-3 leading-relaxed text-muted">{item.answer}</p>}
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  if (v === 15) {
    return (
      <Section id="faq" containerClassName="max-w-3xl">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <div className="flex flex-col gap-4">
          {items.map((item, i) => (
            <details
              key={item.question ?? i}
              className="rounded-brand border border-body/10 px-6 py-4 open:border-main open:bg-main-soft"
            >
              <summary className="flex items-center justify-between gap-4 font-semibold text-body">
                {item.question}
                <ChevronDown className="faq-chevron h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
              </summary>
              {item.answer && <p className="mt-3 leading-relaxed text-muted">{item.answer}</p>}
            </details>
          ))}
        </div>
      </Section>
    );
  }

  // Variant 1 (default): single-column divider list.
  return (
    <Section id="faq" containerClassName="max-w-3xl">
      <SectionHeading title={content.title} subtitle={content.subtitle} />
      <div className="divide-y divide-body/10 border-y border-body/10">
        {items.map((item, i) => (
          <FaqItem key={item.question ?? i} item={item} />
        ))}
      </div>
    </Section>
  );
}
