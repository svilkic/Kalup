import { Check, Phone } from "lucide-react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { SmartImage } from "@/components/SmartImage";
import { cn, clampVariant } from "@/lib/utils";
import type { SiteContent } from "@/lib/types";

interface HeroProps {
  variant?: number;
  content?: SiteContent["hero"];
  /** True when the navbar overlays the hero (navbar variant 3) — adds top padding. */
  overlaidNav?: boolean;
}

function HeroText({
  content,
  dark,
  center,
}: {
  content: NonNullable<SiteContent["hero"]>;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {content.eyebrow && (
        <p className={cn("mb-4 text-sm font-semibold uppercase tracking-widest", dark ? "text-white/80" : "text-main")}>
          {content.eyebrow}
        </p>
      )}
      {content.title && (
        <h1 className={cn("text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-[3.4rem]", dark ? "text-white" : "text-body")}>
          {content.title}
        </h1>
      )}
      {content.subtitle && (
        <p className={cn("mt-6 text-lg leading-relaxed", dark ? "text-white/80" : "text-muted")}>
          {content.subtitle}
        </p>
      )}
      {(content.primaryButton || content.secondaryButton) && (
        <div className={cn("mt-8 flex flex-wrap gap-4", center && "justify-center")}>
          {content.primaryButton && (
            <Button href="#contact" size="lg" variant={dark ? "inverted" : "primary"}>
              {content.primaryButton}
            </Button>
          )}
          {content.secondaryButton && (
            <Button href="#services" size="lg" variant={dark ? "ghost" : "outline"} className={cn(dark && "text-white hover:bg-white/10")}>
              {content.secondaryButton}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

function TrustBadges({ badges, dark }: { badges?: string[]; dark?: boolean }) {
  if (!badges?.length) return null;
  return (
    <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
      {badges.map((badge) => (
        <li key={badge} className={cn("flex items-center gap-2 text-sm font-medium", dark ? "text-white/85" : "text-body/80")}>
          <Check className={cn("h-4 w-4 shrink-0", dark ? "text-white" : "text-main")} aria-hidden="true" />
          {badge}
        </li>
      ))}
    </ul>
  );
}

/**
 * Variants:
 * 1 — Text left, image right
 * 2 — Centered text, no image
 * 3 — Full-width background image with dark overlay
 * 4 — Split hero: tinted band with content card over it
 * 5 — Minimal SaaS-style: centered, tight, single CTA emphasis
 * 6 — Local business: text + trust badges left, image right
 * 7 — Text + image with service highlight cards below
 * 8 — Text left, contact/callback card right
 * 9 — Editorial: oversized heading, meta row, wide image below
 * 10 — Split-screen: brand-color panel left, full-bleed image right
 * 11 — Tinted band, centered text with framed image below
 * 12 — Solid brand-color band, centered light text with badges
 * 13 — Wide image with an overlapping content card
 * 14 — Text left, stacked highlight cards right
 * 15 — Mirrored: image left, text right
 */
export function Hero({ variant, content = {}, overlaidNav }: HeroProps) {
  const v = clampVariant(variant, 15);
  const padTop = overlaidNav ? "pt-32 sm:pt-40" : "pt-16 sm:pt-24";

  if (v === 2) {
    return (
      <section className={cn("pb-16 sm:pb-24", padTop)}>
        <Container>
          <HeroText content={content} center />
          <div className="mx-auto mt-8 max-w-md">
            <TrustBadges badges={content.badges} />
          </div>
        </Container>
      </section>
    );
  }

  if (v === 3) {
    return (
      <section className="relative">
        <SmartImage
          src={content.image}
          alt={content.imageAlt}
          className="absolute inset-0 rounded-none!"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-accent/70" aria-hidden="true" />
        <Container className={cn("relative flex min-h-[560px] flex-col justify-center pb-20", padTop)}>
          <HeroText content={content} dark />
          <TrustBadges badges={content.badges} dark />
        </Container>
      </section>
    );
  }

  if (v === 4) {
    return (
      <section className={cn("bg-main-soft pb-16 sm:pb-24", padTop)}>
        <Container>
          <div className="grid items-center gap-10 rounded-brand bg-white p-8 shadow-lg shadow-body/5 sm:p-12 lg:grid-cols-2">
            <div>
              <HeroText content={content} />
              <TrustBadges badges={content.badges} />
            </div>
            <SmartImage src={content.image} alt={content.imageAlt} className="aspect-[4/3]" priority />
          </div>
        </Container>
      </section>
    );
  }

  if (v === 5) {
    return (
      <section className={cn("pb-16 sm:pb-20", padTop)}>
        <Container className="max-w-3xl">
          <div className="text-center">
            {content.eyebrow && (
              <p className="mb-5 inline-block rounded-full bg-main-soft px-4 py-1.5 text-sm font-medium text-main">
                {content.eyebrow}
              </p>
            )}
            {content.title && (
              <h1 className="text-4xl font-bold tracking-tight text-body sm:text-5xl">{content.title}</h1>
            )}
            {content.subtitle && <p className="mt-5 text-lg leading-relaxed text-muted">{content.subtitle}</p>}
            {content.primaryButton && (
              <div className="mt-8">
                <Button href="#contact" size="lg">{content.primaryButton}</Button>
              </div>
            )}
          </div>
        </Container>
      </section>
    );
  }

  if (v === 6) {
    return (
      <section className={cn("pb-16 sm:pb-24", padTop)}>
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <HeroText content={content} />
            <TrustBadges badges={content.badges} />
          </div>
          <SmartImage src={content.image} alt={content.imageAlt} className="aspect-[4/3] shadow-xl shadow-body/10" priority />
        </Container>
      </section>
    );
  }

  if (v === 7) {
    return (
      <section className={cn("pb-16 sm:pb-24", padTop)}>
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <HeroText content={content} />
            <SmartImage src={content.image} alt={content.imageAlt} className="aspect-[4/3]" priority />
          </div>
          {content.highlights && content.highlights.length > 0 && (
            <ul className="mt-14 grid gap-6 sm:grid-cols-3">
              {content.highlights.map((item, i) => (
                <li key={item.title ?? i}>
                  <Card look="soft" className="h-full">
                    <h2 className="text-base font-semibold text-body">{item.title}</h2>
                    {item.description && <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.description}</p>}
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    );
  }

  if (v === 8) {
    const card = content.contactCard;
    return (
      <section className={cn("pb-16 sm:pb-24", padTop)}>
        <Container className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <HeroText content={content} />
            <TrustBadges badges={content.badges} />
          </div>
          <Card look="raised" className="p-8">
            {card?.title && <h2 className="text-xl font-bold text-body">{card.title}</h2>}
            {card?.subtitle && <p className="mt-2 text-sm leading-relaxed text-muted">{card.subtitle}</p>}
            <div className="mt-6 flex flex-col gap-3">
              {card?.button && (
                <Button href="#contact" size="lg" className="w-full">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {card.button}
                </Button>
              )}
              {content.primaryButton && (
                <Button href="#contact" variant="outline" className="w-full">{content.primaryButton}</Button>
              )}
            </div>
          </Card>
        </Container>
      </section>
    );
  }

  if (v === 9) {
    return (
      <section className={cn("pb-16 sm:pb-24", padTop)}>
        <Container>
          {content.eyebrow && (
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-main">{content.eyebrow}</p>
          )}
          {content.title && (
            <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-body sm:text-6xl">
              {content.title}
            </h1>
          )}
          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            {content.subtitle && <p className="max-w-xl text-lg leading-relaxed text-muted">{content.subtitle}</p>}
            <div className="flex shrink-0 flex-wrap gap-4">
              {content.primaryButton && <Button href="#contact" size="lg">{content.primaryButton}</Button>}
              {content.secondaryButton && (
                <Button href="#services" size="lg" variant="outline">{content.secondaryButton}</Button>
              )}
            </div>
          </div>
          <SmartImage src={content.image} alt={content.imageAlt} className="mt-12 aspect-[21/9]" sizes="100vw" priority />
        </Container>
      </section>
    );
  }

  if (v === 10) {
    return (
      <section className="grid lg:grid-cols-2">
        <div className={cn("flex flex-col justify-center bg-main px-4 py-16 sm:px-10 lg:px-16 lg:py-24", overlaidNav && "pt-32")}>
          <HeroText content={content} dark />
          <TrustBadges badges={content.badges} dark />
        </div>
        <SmartImage src={content.image} alt={content.imageAlt} className="min-h-72 rounded-none! lg:min-h-full" sizes="(min-width: 1024px) 50vw, 100vw" priority />
      </section>
    );
  }

  if (v === 11) {
    return (
      <section className={cn("bg-main-soft pb-16 sm:pb-24", padTop)}>
        <Container>
          <HeroText content={content} center />
          <SmartImage
            src={content.image}
            alt={content.imageAlt}
            className="mx-auto mt-12 aspect-[16/9] max-w-4xl shadow-xl shadow-body/10"
            sizes="(min-width: 1024px) 56rem, 100vw"
            priority
          />
        </Container>
      </section>
    );
  }

  if (v === 12) {
    return (
      <section className={cn("bg-main pb-16 sm:pb-24", padTop)}>
        <Container className="flex flex-col items-center">
          <HeroText content={content} dark center />
          <TrustBadges badges={content.badges} dark />
        </Container>
      </section>
    );
  }

  if (v === 13) {
    return (
      <section className={cn("pb-16 sm:pb-24", padTop)}>
        <Container>
          <SmartImage src={content.image} alt={content.imageAlt} className="aspect-[21/10]" sizes="100vw" priority />
          <div className="relative z-10 -mt-16 max-w-xl rounded-brand bg-white p-8 shadow-xl shadow-body/10 sm:-mt-24 sm:ml-10 sm:p-10">
            {content.eyebrow && (
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-main">{content.eyebrow}</p>
            )}
            {content.title && (
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-body sm:text-4xl">{content.title}</h1>
            )}
            {content.subtitle && <p className="mt-4 leading-relaxed text-muted">{content.subtitle}</p>}
            <div className="mt-6 flex flex-wrap gap-4">
              {content.primaryButton && <Button href="#contact">{content.primaryButton}</Button>}
              {content.secondaryButton && (
                <Button href="#services" variant="outline">{content.secondaryButton}</Button>
              )}
            </div>
          </div>
        </Container>
      </section>
    );
  }

  if (v === 14) {
    return (
      <section className={cn("pb-16 sm:pb-24", padTop)}>
        <Container className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <HeroText content={content} />
            <TrustBadges badges={content.badges} />
          </div>
          {content.highlights && content.highlights.length > 0 && (
            <ul className="flex flex-col gap-4">
              {content.highlights.map((item, i) => (
                <li key={item.title ?? i}>
                  <Card look="soft">
                    <h2 className="font-semibold text-body">{item.title}</h2>
                    {item.description && <p className="mt-1 text-sm leading-relaxed text-muted">{item.description}</p>}
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    );
  }

  if (v === 15) {
    return (
      <section className={cn("pb-16 sm:pb-24", padTop)}>
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <SmartImage src={content.image} alt={content.imageAlt} className="aspect-[4/3]" priority />
          <div>
            <HeroText content={content} />
            <TrustBadges badges={content.badges} />
          </div>
        </Container>
      </section>
    );
  }

  // Variant 1 (default): text left, image right.
  return (
    <section className={cn("pb-16 sm:pb-24", padTop)}>
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <HeroText content={content} />
        <SmartImage src={content.image} alt={content.imageAlt} className="aspect-[4/3]" priority />
      </Container>
    </section>
  );
}
