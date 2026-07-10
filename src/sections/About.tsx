import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { SmartImage } from "@/components/SmartImage";
import { cn, clampVariant } from "@/lib/utils";
import type { SiteContent } from "@/lib/types";

interface AboutProps {
  variant?: number;
  content?: SiteContent["about"];
}

function Stats({ stats, dark }: { stats?: { value?: string; label?: string }[]; dark?: boolean }) {
  if (!stats?.length) return null;
  return (
    <dl className="mt-10 grid grid-cols-3 gap-6">
      {stats.map((stat, i) => (
        <div key={stat.label ?? i}>
          <dd className={cn("text-3xl font-bold tracking-tight", dark ? "text-white" : "text-main")}>{stat.value}</dd>
          <dt className={cn("mt-1 text-sm", dark ? "text-white/70" : "text-muted")}>{stat.label}</dt>
        </div>
      ))}
    </dl>
  );
}

/**
 * Variants:
 * 1 — Image left, text right
 * 2 — Text left, image right, stats under text
 * 3 — Centered narrative with stats row
 * 4 — Full-width tinted band, text only
 * 5 — Dark accent band with stats
 * 6 — Pull-quote style with round portrait image
 * 7 — Full-bleed background image with overlay
 * 8 — Editorial split: heading left, body and stats right
 * 9 — Framed image with offset tinted backdrop
 * 10 — Magazine style: centered heading, body in two text columns
 * 11 — Brand-color stats rail beside the text
 * 12 — Banner image on top, centered text below
 * 13 — Everything inside one tinted panel
 * 14 — Centered text with a brand-color stat band below
 * 15 — Editorial drop cap, no image
 */
export function About({ variant, content = {} }: AboutProps) {
  const v = clampVariant(variant, 15);
  if (!content.title && !content.body) return null;

  const text = (dark?: boolean) => (
    <div>
      {content.title && (
        <h2 className={cn("text-3xl font-bold tracking-tight sm:text-4xl", dark ? "text-white" : "text-body")}>
          {content.title}
        </h2>
      )}
      {content.subtitle && (
        <p className={cn("mt-3 text-lg font-medium", dark ? "text-white/85" : "text-main")}>{content.subtitle}</p>
      )}
      {content.body && (
        <p className={cn("mt-5 leading-relaxed", dark ? "text-white/75" : "text-muted")}>{content.body}</p>
      )}
    </div>
  );

  if (v === 2) {
    return (
      <Section id="about">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            {text()}
            <Stats stats={content.stats} />
          </div>
          <SmartImage src={content.image} alt={content.imageAlt} className="aspect-[4/3]" />
        </div>
      </Section>
    );
  }

  if (v === 3) {
    return (
      <Section id="about" containerClassName="max-w-3xl text-center">
        {text()}
        <div className="[&>dl]:mx-auto [&>dl]:max-w-xl">
          <Stats stats={content.stats} />
        </div>
      </Section>
    );
  }

  if (v === 4) {
    return (
      <Section id="about" className="bg-main-soft" containerClassName="max-w-3xl">
        {text()}
        <Stats stats={content.stats} />
      </Section>
    );
  }

  if (v === 5) {
    return (
      <Section id="about" className="bg-accent">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {text(true)}
          <Stats stats={content.stats} dark />
        </div>
      </Section>
    );
  }

  if (v === 6) {
    return (
      <Section id="about">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SmartImage src={content.image} alt={content.imageAlt} className="mx-auto aspect-square w-full max-w-xs rounded-full" sizes="20rem" />
          <div>
            {content.title && (
              <h2 className="text-sm font-semibold uppercase tracking-widest text-main">{content.title}</h2>
            )}
            {content.subtitle && (
              <p className="mt-4 text-2xl font-medium leading-snug text-body sm:text-3xl">“{content.subtitle}”</p>
            )}
            {content.body && <p className="mt-5 leading-relaxed text-muted">{content.body}</p>}
            <Stats stats={content.stats} />
          </div>
        </div>
      </Section>
    );
  }

  if (v === 7) {
    return (
      <section id="about" className="relative scroll-mt-24">
        <SmartImage src={content.image} alt="" className="absolute inset-0 rounded-none!" sizes="100vw" />
        <div className="absolute inset-0 bg-accent/80" aria-hidden="true" />
        <Container className="relative py-20 sm:py-28">
          <div className="max-w-2xl">
            {text(true)}
            <Stats stats={content.stats} dark />
          </div>
        </Container>
      </section>
    );
  }

  if (v === 8) {
    return (
      <Section id="about">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <div>
            {content.title && (
              <h2 className="text-3xl font-bold tracking-tight text-body sm:text-4xl">{content.title}</h2>
            )}
            {content.subtitle && <p className="mt-3 text-lg font-medium text-main">{content.subtitle}</p>}
          </div>
          <div>
            {content.body && <p className="leading-relaxed text-muted">{content.body}</p>}
            <Stats stats={content.stats} />
          </div>
        </div>
      </Section>
    );
  }

  if (v === 9) {
    return (
      <Section id="about">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-brand bg-main-soft" aria-hidden="true" />
            <SmartImage src={content.image} alt={content.imageAlt} className="relative aspect-[4/3]" />
          </div>
          <div>
            {text()}
            <Stats stats={content.stats} />
          </div>
        </div>
      </Section>
    );
  }

  if (v === 10) {
    return (
      <Section id="about" containerClassName="max-w-4xl">
        <div className="text-center">
          {content.title && <h2 className="text-3xl font-bold tracking-tight text-body sm:text-4xl">{content.title}</h2>}
          {content.subtitle && <p className="mt-3 text-lg font-medium text-main">{content.subtitle}</p>}
        </div>
        {content.body && <p className="mt-10 leading-relaxed text-muted sm:columns-2 sm:gap-10">{content.body}</p>}
        <div className="mx-auto max-w-xl">
          <Stats stats={content.stats} />
        </div>
      </Section>
    );
  }

  if (v === 11) {
    return (
      <Section id="about">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.8fr]">
          {content.stats && content.stats.length > 0 && (
            <dl className="flex flex-col gap-8 rounded-brand bg-main p-8">
              {content.stats.map((stat, i) => (
                <div key={stat.label ?? i}>
                  <dd className="text-4xl font-bold tracking-tight text-white">{stat.value}</dd>
                  <dt className="mt-1 text-sm text-white/70">{stat.label}</dt>
                </div>
              ))}
            </dl>
          )}
          <div>{text()}</div>
        </div>
      </Section>
    );
  }

  if (v === 12) {
    return (
      <Section id="about">
        <SmartImage src={content.image} alt={content.imageAlt} className="aspect-[21/9]" sizes="100vw" />
        <div className="mx-auto mt-12 max-w-3xl text-center">
          {text()}
          <div className="mx-auto max-w-xl">
            <Stats stats={content.stats} />
          </div>
        </div>
      </Section>
    );
  }

  if (v === 13) {
    return (
      <Section id="about">
        <div className="grid items-center gap-10 rounded-brand bg-main-soft p-8 sm:p-12 lg:grid-cols-2">
          <SmartImage src={content.image} alt={content.imageAlt} className="aspect-[4/3]" />
          <div>
            {text()}
            <Stats stats={content.stats} />
          </div>
        </div>
      </Section>
    );
  }

  if (v === 14) {
    return (
      <Section id="about">
        <div className="mx-auto max-w-3xl text-center">{text()}</div>
        {content.stats && content.stats.length > 0 && (
          <dl className="mt-12 grid gap-8 rounded-brand bg-main p-10 text-center sm:grid-cols-3">
            {content.stats.map((stat, i) => (
              <div key={stat.label ?? i}>
                <dd className="text-4xl font-bold tracking-tight text-white">{stat.value}</dd>
                <dt className="mt-1 text-sm text-white/70">{stat.label}</dt>
              </div>
            ))}
          </dl>
        )}
      </Section>
    );
  }

  if (v === 15) {
    return (
      <Section id="about" containerClassName="max-w-3xl">
        {content.title && (
          <h2 className="text-3xl font-bold tracking-tight text-body sm:text-4xl">{content.title}</h2>
        )}
        {content.subtitle && <p className="mt-3 text-lg font-medium text-main">{content.subtitle}</p>}
        {content.body && (
          <p className="mt-8 leading-relaxed text-muted first-letter:float-left first-letter:mr-3 first-letter:text-6xl first-letter:font-bold first-letter:leading-none first-letter:text-main">
            {content.body}
          </p>
        )}
        <Stats stats={content.stats} />
      </Section>
    );
  }

  // Variant 1 (default): image left, text right.
  return (
    <Section id="about">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <SmartImage src={content.image} alt={content.imageAlt} className="aspect-[4/3]" />
        <div>
          {text()}
          <Stats stats={content.stats} />
        </div>
      </div>
    </Section>
  );
}
