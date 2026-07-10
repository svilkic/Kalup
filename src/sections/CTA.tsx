import Link from "next/link";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { clampVariant } from "@/lib/utils";
import type { SiteContent } from "@/lib/types";

interface CTAProps {
  variant?: number;
  content?: SiteContent["cta"];
}

function Buttons({ content, dark }: { content: NonNullable<SiteContent["cta"]>; dark?: boolean }) {
  if (!content.button && !content.secondaryButton) return null;
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-4">
      {content.button && (
        <Button href="#contact" size="lg" variant={dark ? "inverted" : "primary"}>
          {content.button}
        </Button>
      )}
      {content.secondaryButton && (
        <Button
          href="#contact"
          size="lg"
          variant={dark ? "ghost" : "outline"}
          className={dark ? "text-white hover:bg-white/10" : undefined}
        >
          {content.secondaryButton}
        </Button>
      )}
    </div>
  );
}

/**
 * Variants:
 * 1 — Solid brand-color band
 * 2 — Boxed card on white
 * 3 — Dark accent band
 * 4 — Minimal centered, no background
 * 5 — Tinted band with border
 * 6 — Split card: text left, buttons right
 * 7 — Gradient band
 * 8 — Brand band, title left / buttons right
 * 9 — Outlined card with brand-color title
 * 10 — Editorial row between heavy rules
 * 11 — Dark accent card
 * 12 — Tinted band, title left / buttons right
 * 13 — Oversized centered title with accent rule
 * 14 — Two-tone split: dark panel + brand panel
 * 15 — Editorial text link instead of a button
 */
export function CTA({ variant, content = {} }: CTAProps) {
  const v = clampVariant(variant, 15);
  if (!content.title) return null;

  const heading = (dark?: boolean) => (
    <>
      <h2 className={dark ? "text-3xl font-bold tracking-tight text-white sm:text-4xl" : "text-3xl font-bold tracking-tight text-body sm:text-4xl"}>
        {content.title}
      </h2>
      {content.subtitle && (
        <p className={dark ? "mx-auto mt-4 max-w-xl text-lg text-white/80" : "mx-auto mt-4 max-w-xl text-lg text-muted"}>
          {content.subtitle}
        </p>
      )}
    </>
  );

  if (v === 2) {
    return (
      <Section>
        <div className="rounded-brand bg-main px-8 py-14 text-center sm:px-14">
          {heading(true)}
          <Buttons content={content} dark />
        </div>
      </Section>
    );
  }

  if (v === 3) {
    return (
      <Section className="bg-accent" containerClassName="text-center">
        {heading(true)}
        <Buttons content={content} dark />
      </Section>
    );
  }

  if (v === 4) {
    return (
      <Section containerClassName="max-w-2xl text-center">
        {heading()}
        <Buttons content={content} />
      </Section>
    );
  }

  if (v === 5) {
    return (
      <Section>
        <div className="rounded-brand border border-main/20 bg-main-soft px-8 py-14 text-center sm:px-14">
          {heading()}
          <Buttons content={content} />
        </div>
      </Section>
    );
  }

  if (v === 6) {
    return (
      <Section>
        <div className="flex flex-col gap-8 rounded-brand border border-body/10 p-8 shadow-sm sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold tracking-tight text-body sm:text-3xl">{content.title}</h2>
            {content.subtitle && <p className="mt-3 text-muted">{content.subtitle}</p>}
          </div>
          <div className="flex shrink-0 flex-wrap gap-4">
            {content.button && <Button href="#contact" size="lg">{content.button}</Button>}
            {content.secondaryButton && (
              <Button href="#contact" size="lg" variant="outline">{content.secondaryButton}</Button>
            )}
          </div>
        </div>
      </Section>
    );
  }

  if (v === 7) {
    return (
      <Section className="bg-[linear-gradient(135deg,var(--main),var(--accent))]" containerClassName="text-center">
        {heading(true)}
        <Buttons content={content} dark />
      </Section>
    );
  }

  if (v === 8) {
    return (
      <Section className="bg-main">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{content.title}</h2>
            {content.subtitle && <p className="mt-3 text-lg text-white/80">{content.subtitle}</p>}
          </div>
          <div className="flex shrink-0 flex-wrap gap-4">
            {content.button && (
              <Button href="#contact" size="lg" variant="inverted">{content.button}</Button>
            )}
            {content.secondaryButton && (
              <Button href="#contact" size="lg" variant="ghost" className="text-white hover:bg-white/10">
                {content.secondaryButton}
              </Button>
            )}
          </div>
        </div>
      </Section>
    );
  }

  if (v === 9) {
    return (
      <Section>
        <div className="rounded-brand border-2 border-main px-8 py-14 text-center sm:px-14">
          <h2 className="text-3xl font-bold tracking-tight text-main sm:text-4xl">{content.title}</h2>
          {content.subtitle && <p className="mx-auto mt-4 max-w-xl text-lg text-muted">{content.subtitle}</p>}
          <Buttons content={content} />
        </div>
      </Section>
    );
  }

  if (v === 10) {
    return (
      <Section>
        <div className="flex flex-col gap-6 border-y-2 border-body py-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-body sm:text-4xl">{content.title}</h2>
            {content.subtitle && <p className="mt-3 text-muted">{content.subtitle}</p>}
          </div>
          <div className="flex shrink-0 flex-wrap gap-4">
            {content.button && <Button href="#contact" size="lg">{content.button}</Button>}
            {content.secondaryButton && (
              <Button href="#contact" size="lg" variant="outline">{content.secondaryButton}</Button>
            )}
          </div>
        </div>
      </Section>
    );
  }

  if (v === 11) {
    return (
      <Section>
        <div className="rounded-brand bg-accent px-8 py-14 text-center sm:px-14">
          {heading(true)}
          <Buttons content={content} dark />
        </div>
      </Section>
    );
  }

  if (v === 12) {
    return (
      <Section className="bg-main-soft">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-body sm:text-4xl">{content.title}</h2>
            {content.subtitle && <p className="mt-3 text-muted">{content.subtitle}</p>}
          </div>
          <div className="flex shrink-0 flex-wrap gap-4">
            {content.button && <Button href="#contact" size="lg">{content.button}</Button>}
            {content.secondaryButton && (
              <Button href="#contact" size="lg" variant="outline">{content.secondaryButton}</Button>
            )}
          </div>
        </div>
      </Section>
    );
  }

  if (v === 13) {
    return (
      <Section containerClassName="max-w-3xl text-center">
        <div className="mx-auto mb-8 h-1 w-16 rounded-full bg-main" aria-hidden="true" />
        <h2 className="text-4xl font-bold tracking-tight text-body sm:text-5xl">{content.title}</h2>
        {content.subtitle && <p className="mx-auto mt-5 max-w-xl text-lg text-muted">{content.subtitle}</p>}
        <Buttons content={content} />
      </Section>
    );
  }

  if (v === 14) {
    return (
      <Section>
        <div className="grid overflow-hidden rounded-brand lg:grid-cols-2">
          <div className="bg-accent p-10 sm:p-14">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{content.title}</h2>
            {content.subtitle && <p className="mt-4 leading-relaxed text-white/75">{content.subtitle}</p>}
          </div>
          <div className="flex flex-col items-start justify-center gap-4 bg-main p-10 sm:p-14">
            {content.button && <Button href="#contact" size="lg" variant="inverted">{content.button}</Button>}
            {content.secondaryButton && (
              <Button href="#contact" size="lg" variant="ghost" className="text-white hover:bg-white/10">
                {content.secondaryButton}
              </Button>
            )}
          </div>
        </div>
      </Section>
    );
  }

  if (v === 15) {
    return (
      <Section containerClassName="max-w-3xl">
        <h2 className="text-3xl font-bold tracking-tight text-body sm:text-4xl">{content.title}</h2>
        {content.subtitle && <p className="mt-4 text-lg text-muted">{content.subtitle}</p>}
        {content.button && (
          <Link
            href="#contact"
            className="mt-8 inline-block text-2xl font-bold text-main underline decoration-2 underline-offset-8 hover:decoration-4"
          >
            {content.button}
          </Link>
        )}
      </Section>
    );
  }

  // Variant 1 (default): solid brand-color band.
  return (
    <Section className="bg-main" containerClassName="text-center">
      {heading(true)}
      <Buttons content={content} dark />
    </Section>
  );
}
