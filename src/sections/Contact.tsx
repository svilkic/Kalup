import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Section, SectionHeading } from "@/components/Section";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { cn, clampVariant } from "@/lib/utils";
import type { SiteContent } from "@/lib/types";

interface ContactProps {
  variant?: number;
  content?: SiteContent["contact"];
}

type Info = NonNullable<SiteContent["contact"]>;

function ContactList({ content, dark }: { content: Info; dark?: boolean }) {
  const rows = [
    { icon: Phone, value: content.phone, href: `tel:${content.phone?.replace(/\s/g, "")}` },
    { icon: Mail, value: content.email, href: `mailto:${content.email}` },
    { icon: MapPin, value: content.address },
    { icon: Clock, value: content.hours },
  ].filter((r) => r.value);
  if (!rows.length) return null;
  return (
    <ul className="flex flex-col gap-4">
      {rows.map(({ icon: Ico, value, href }) => (
        <li key={value} className="flex items-center gap-3">
          <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-brand", dark ? "bg-white/10" : "bg-main-soft")}>
            <Ico className={cn("h-4.5 w-4.5", dark ? "text-white" : "text-main")} aria-hidden="true" />
          </div>
          {href ? (
            <a href={href} className={cn("font-medium", dark ? "text-white hover:text-white/80" : "text-body hover:text-main")}>{value}</a>
          ) : (
            <span className={dark ? "text-white/75" : "text-body/80"}>{value}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

/*
 * Posts to contact.formAction (e.g. a Formspree/Web3Forms endpoint) when set.
 * ponytail: falls back to mailto: so the template works with zero backend —
 * set formAction for real client sites, mailto depends on the visitor's mail app.
 */
function ContactForm({ content }: { content: Info }) {
  const form = content.form ?? {};
  const field = "w-full rounded-brand border border-body/15 bg-white px-4 py-2.5 text-sm text-body placeholder:text-muted focus:border-main focus:outline-2 focus:outline-main/30";
  const action = content.formAction || (content.email ? `mailto:${content.email}` : undefined);
  return (
    <form action={action} method="post" {...(content.formAction ? {} : { encType: "text/plain" })} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-body">{form.nameLabel ?? "Name"}</span>
          <input type="text" name="name" required autoComplete="name" className={field} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-body">{form.emailLabel ?? "Email"}</span>
          <input type="email" name="email" required autoComplete="email" className={field} />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-body">{form.phoneLabel ?? "Phone"}</span>
        <input type="tel" name="phone" autoComplete="tel" className={field} />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-body">{form.messageLabel ?? "Message"}</span>
        <textarea name="message" rows={4} required className={field} />
      </label>
      <Button type="submit" size="lg" className="self-start">{form.submitLabel ?? "Send message"}</Button>
    </form>
  );
}

/**
 * Variants:
 * 1 — Info left, form right
 * 2 — Form in a raised card, info beside it
 * 3 — Info only, three cards (no form)
 * 4 — Centered form, info row above
 * 5 — Tinted band, info left / form card right
 * 6 — Dark band, info left / white form card right
 * 7 — Minimal centered: big phone and email links, no form
 * 8 — Brand-color info panel beside the form
 * 9 — Everything in one raised card
 * 10 — Business-card style: narrow raised card, info only
 * 11 — Mirrored: form left, tinted info panel right
 * 12 — Split-screen: brand-color info half, form half
 * 13 — Centered form in a tinted panel
 * 14 — Dark strip: heading left, contact details inline right
 * 15 — Form beside an outlined card with a big phone number
 *
 * When contact.mapEmbed is set, a map renders below the section in every variant.
 */
export function Contact({ variant, content = {} }: ContactProps) {
  return (
    <>
      <ContactInner variant={variant} content={content} />
      {content.mapEmbed && (
        <Section className="pt-0!" aria-label="Map">
          <iframe
            src={content.mapEmbed}
            title="Map"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="h-72 w-full rounded-brand border-0 sm:h-96"
          />
        </Section>
      )}
    </>
  );
}

function ContactInner({ variant, content = {} }: ContactProps) {
  const v = clampVariant(variant, 15);
  if (!content.title && !content.email && !content.phone) return null;

  if (v === 2) {
    return (
      <Section id="contact">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.4fr]">
          <ContactList content={content} />
          <Card look="raised" className="p-8">
            <ContactForm content={content} />
          </Card>
        </div>
      </Section>
    );
  }

  if (v === 3) {
    const cards = [
      { icon: Phone, label: "Call us", value: content.phone, href: `tel:${content.phone?.replace(/\s/g, "")}` },
      { icon: Mail, label: "Email us", value: content.email, href: `mailto:${content.email}` },
      { icon: MapPin, label: "Visit us", value: content.address },
    ].filter((c) => c.value);
    return (
      <Section id="contact">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <ul className="grid gap-8 sm:grid-cols-3">
          {cards.map(({ icon: Ico, label, value, href }) => (
            <li key={label}>
              <Card look="outline" className="h-full text-center">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-main-soft">
                  <Ico className="h-5 w-5 text-main" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-semibold text-body">{label}</h3>
                {href ? (
                  <a href={href} className="mt-1 block text-sm text-main hover:underline">{value}</a>
                ) : (
                  <p className="mt-1 text-sm text-muted">{value}</p>
                )}
              </Card>
            </li>
          ))}
        </ul>
        {content.hours && <p className="mt-8 text-center text-sm text-muted">{content.hours}</p>}
      </Section>
    );
  }

  if (v === 4) {
    return (
      <Section id="contact" containerClassName="max-w-2xl">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <div className="mb-10 flex justify-center">
          <ContactList content={content} />
        </div>
        <ContactForm content={content} />
      </Section>
    );
  }

  if (v === 5) {
    return (
      <Section id="contact" className="bg-main-soft">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHeading title={content.title} subtitle={content.subtitle} align="left" />
            <ContactList content={content} />
          </div>
          <Card look="flat" className="p-8 shadow-sm">
            <ContactForm content={content} />
          </Card>
        </div>
      </Section>
    );
  }

  if (v === 6) {
    return (
      <Section id="contact" className="bg-accent">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHeading title={content.title} subtitle={content.subtitle} align="left" dark />
            <ContactList content={content} dark />
          </div>
          <Card look="flat" className="p-8">
            <ContactForm content={content} />
          </Card>
        </div>
      </Section>
    );
  }

  if (v === 7) {
    return (
      <Section id="contact" containerClassName="max-w-2xl text-center">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <div className="flex flex-col items-center gap-3">
          {content.phone && (
            <a href={`tel:${content.phone.replace(/\s/g, "")}`} className="text-2xl font-bold tracking-tight text-body hover:text-main sm:text-3xl">
              {content.phone}
            </a>
          )}
          {content.email && (
            <a href={`mailto:${content.email}`} className="text-lg font-semibold text-main hover:underline">
              {content.email}
            </a>
          )}
        </div>
        {(content.address || content.hours) && (
          <p className="mt-6 text-sm text-muted">{[content.address, content.hours].filter(Boolean).join(" · ")}</p>
        )}
      </Section>
    );
  }

  if (v === 8) {
    return (
      <Section id="contact">
        <div className="grid items-stretch gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div className="rounded-brand bg-main p-8">
            {content.title && <h2 className="text-2xl font-bold text-white">{content.title}</h2>}
            {content.subtitle && <p className="mt-2 text-sm leading-relaxed text-white/80">{content.subtitle}</p>}
            <div className="mt-8">
              <ContactList content={content} dark />
            </div>
          </div>
          <ContactForm content={content} />
        </div>
      </Section>
    );
  }

  if (v === 9) {
    return (
      <Section id="contact">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <Card look="raised" className="grid gap-10 p-8 sm:p-10 lg:grid-cols-[1fr_1.4fr]">
          <ContactList content={content} />
          <ContactForm content={content} />
        </Card>
      </Section>
    );
  }

  if (v === 10) {
    return (
      <Section id="contact" containerClassName="max-w-md">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <Card look="raised" className="p-8">
          <ContactList content={content} />
        </Card>
      </Section>
    );
  }

  if (v === 11) {
    return (
      <Section id="contact">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <div className="grid items-start gap-10 lg:grid-cols-[1.4fr_1fr]">
          <ContactForm content={content} />
          <div className="rounded-brand bg-main-soft p-8">
            <ContactList content={content} />
          </div>
        </div>
      </Section>
    );
  }

  if (v === 12) {
    return (
      <section id="contact" className="grid scroll-mt-24 lg:grid-cols-2">
        <div className="bg-main px-4 py-16 sm:px-10 lg:px-16">
          {content.title && <h2 className="text-3xl font-bold tracking-tight text-white">{content.title}</h2>}
          {content.subtitle && <p className="mt-3 leading-relaxed text-white/80">{content.subtitle}</p>}
          <div className="mt-8">
            <ContactList content={content} dark />
          </div>
        </div>
        <div className="px-4 py-16 sm:px-10 lg:px-16">
          <ContactForm content={content} />
        </div>
      </section>
    );
  }

  if (v === 13) {
    return (
      <Section id="contact" containerClassName="max-w-xl">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <div className="rounded-brand bg-main-soft p-8">
          <ContactForm content={content} />
        </div>
        {(content.phone || content.email) && (
          <p className="mt-6 text-center text-sm text-muted">
            {[content.phone, content.email].filter(Boolean).join(" · ")}
          </p>
        )}
      </Section>
    );
  }

  if (v === 14) {
    return (
      <Section id="contact" className="bg-accent">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-md">
            {content.title && <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{content.title}</h2>}
            {content.subtitle && <p className="mt-2 text-sm leading-relaxed text-white/75">{content.subtitle}</p>}
          </div>
          <address className="flex flex-wrap items-center gap-x-8 gap-y-3 not-italic">
            {content.phone && (
              <a href={`tel:${content.phone.replace(/\s/g, "")}`} className="text-xl font-bold text-white hover:text-white/80">
                {content.phone}
              </a>
            )}
            {content.email && (
              <a href={`mailto:${content.email}`} className="font-medium text-white/85 hover:underline">
                {content.email}
              </a>
            )}
            {content.hours && <span className="text-sm text-white/60">{content.hours}</span>}
          </address>
        </div>
      </Section>
    );
  }

  if (v === 15) {
    return (
      <Section id="contact">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <div className="grid items-start gap-10 lg:grid-cols-[1.5fr_1fr]">
          <ContactForm content={content} />
          <div className="rounded-brand border border-body/10 p-8">
            {content.phone && (
              <a
                href={`tel:${content.phone.replace(/\s/g, "")}`}
                className="block text-2xl font-bold tracking-tight text-body hover:text-main"
              >
                {content.phone}
              </a>
            )}
            {content.email && (
              <a href={`mailto:${content.email}`} className="mt-2 block font-semibold text-main hover:underline">
                {content.email}
              </a>
            )}
            {(content.address || content.hours) && (
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {[content.address, content.hours].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>
        </div>
      </Section>
    );
  }

  // Variant 1 (default): info left, form right.
  return (
    <Section id="contact">
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <SectionHeading title={content.title} subtitle={content.subtitle} align="left" />
          <ContactList content={content} />
        </div>
        <ContactForm content={content} />
      </div>
    </Section>
  );
}
