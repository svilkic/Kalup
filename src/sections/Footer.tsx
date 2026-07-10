import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { cn, clampVariant } from "@/lib/utils";
import { getContent } from "@/lib/site";
import type { SiteContent } from "@/lib/types";

/* Text pages (privacy etc.) get linked next to the copyright in every footer variant. */
const legalPages = (getContent().pages ?? []).filter((p) => p.slug && p.title);

interface FooterProps {
  variant?: number;
  content?: SiteContent["footer"];
  logoText?: string;
}

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

function ContactLines({ content, dark, row }: { content: NonNullable<SiteContent["footer"]>; dark?: boolean; row?: boolean }) {
  const cls = cn("text-sm", dark ? "text-white/70" : "text-muted");
  const linkCls = cn("hover:underline", cls);
  return (
    <address className={cn("flex not-italic", row ? "flex-wrap items-center gap-x-6 gap-y-1.5" : "flex-col gap-1.5")}>
      {content.phone && <a href={`tel:${content.phone.replace(/\s/g, "")}`} className={linkCls}>{content.phone}</a>}
      {content.email && <a href={`mailto:${content.email}`} className={linkCls}>{content.email}</a>}
      {content.address && <span className={cls}>{content.address}</span>}
    </address>
  );
}

function Copyright({ content, name, dark }: { content: NonNullable<SiteContent["footer"]>; name?: string; dark?: boolean }) {
  return (
    <p className={cn("text-sm", dark ? "text-white/60" : "text-muted")}>
      {/* Fallback is just the name — no hardcoded English on non-English sites. */}
      © {new Date().getFullYear()} {content.copyright || content.businessName || name}
      {legalPages.map((p) => (
        <span key={p.slug}>
          {" · "}
          <Link href={`/${p.slug}`} className="hover:underline">
            {p.title}
          </Link>
        </span>
      ))}
    </p>
  );
}

/**
 * Variants:
 * 1 — Simple centered
 * 2 — Three columns: brand, links, contact
 * 3 — Dark accent, three columns
 * 4 — Minimal single row
 * 5 — Brand-color band with contact emphasis
 * 6 — Large business name with links and contact row
 * 7 — Two bordered rows: brand + links, contact + copyright
 * 8 — Dark centered
 * 9 — Oversized watermark name above a minimal row
 * 10 — Slim brand-color strip
 * 11 — Double deck: tinted info panel over a plain link row
 * 12 — Four columns with a phone button
 * 13 — Dark watermark name
 * 14 — Tinted centered with inline rows
 * 15 — Split: brand-color block beside links and contact
 */
export function Footer({ variant, content = {}, logoText }: FooterProps) {
  const v = clampVariant(variant, 15);
  const name = content.businessName || logoText;

  const linkList = (dark?: boolean, inline?: boolean) => (
    <ul className={cn("flex", inline ? "flex-wrap items-center gap-6" : "flex-col gap-2")}>
      {footerLinks.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className={cn("text-sm hover:underline", dark ? "text-white/70 hover:text-white" : "text-muted hover:text-body")}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );

  if (v === 3 || v === 5) {
    const bg = v === 3 ? "bg-accent" : "bg-main";
    return (
      <footer className={bg}>
        <Container className="py-14">
          <div className="grid gap-10 sm:grid-cols-3">
            <div>
              <p className="text-lg font-bold text-white">{name}</p>
              {content.description && <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/70">{content.description}</p>}
            </div>
            <nav aria-label="Footer">{linkList(true)}</nav>
            <ContactLines content={content} dark />
          </div>
          <div className="mt-10 border-t border-white/15 pt-6">
            <Copyright content={content} name={name} dark />
          </div>
        </Container>
      </footer>
    );
  }

  if (v === 4) {
    return (
      <footer className="border-t border-body/10">
        <Container className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
          <p className="font-semibold text-body">{name}</p>
          <Copyright content={content} name={name} />
        </Container>
      </footer>
    );
  }

  if (v === 2) {
    return (
      <footer className="border-t border-body/10 bg-main-soft">
        <Container className="py-14">
          <div className="grid gap-10 sm:grid-cols-3">
            <div>
              <p className="text-lg font-bold text-body">{name}</p>
              {content.description && <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">{content.description}</p>}
            </div>
            <nav aria-label="Footer">{linkList()}</nav>
            <ContactLines content={content} />
          </div>
          <div className="mt-10 border-t border-body/10 pt-6">
            <Copyright content={content} name={name} />
          </div>
        </Container>
      </footer>
    );
  }

  if (v === 6) {
    return (
      <footer className="border-t border-body/10">
        <Container className="py-16">
          <p className="text-3xl font-bold tracking-tight text-body sm:text-4xl">{name}</p>
          {content.description && <p className="mt-3 max-w-md text-muted">{content.description}</p>}
          <div className="mt-10 flex flex-wrap items-start justify-between gap-8">
            <nav aria-label="Footer">{linkList(false, true)}</nav>
            <ContactLines content={content} row />
          </div>
          <div className="mt-10 border-t border-body/10 pt-6">
            <Copyright content={content} name={name} />
          </div>
        </Container>
      </footer>
    );
  }

  if (v === 7) {
    return (
      <footer className="border-t border-body/10">
        <Container className="flex flex-col gap-6 py-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-semibold text-body">{name}</p>
            <nav aria-label="Footer">{linkList(false, true)}</nav>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-body/10 pt-6">
            <ContactLines content={content} row />
            <Copyright content={content} name={name} />
          </div>
        </Container>
      </footer>
    );
  }

  if (v === 8) {
    return (
      <footer className="bg-accent">
        <Container className="flex flex-col items-center gap-6 py-14 text-center">
          <p className="text-lg font-bold text-white">{name}</p>
          <nav aria-label="Footer">{linkList(true, true)}</nav>
          <ContactLines content={content} dark row />
          <Copyright content={content} name={name} dark />
        </Container>
      </footer>
    );
  }

  if (v === 9) {
    return (
      <footer className="overflow-hidden border-t border-body/10">
        <Container className="py-12">
          <p
            aria-hidden="true"
            className="pointer-events-none text-[clamp(3rem,12vw,9rem)] font-bold leading-none tracking-tight text-body/5 select-none"
          >
            {name}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <nav aria-label="Footer">{linkList(false, true)}</nav>
            <Copyright content={content} name={name} />
          </div>
        </Container>
      </footer>
    );
  }

  if (v === 10) {
    return (
      <footer className="bg-main">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="font-bold text-white">{name}</p>
          <nav aria-label="Footer">{linkList(true, true)}</nav>
          <Copyright content={content} name={name} dark />
        </Container>
      </footer>
    );
  }

  if (v === 11) {
    return (
      <footer>
        <div className="bg-main-soft">
          <Container className="grid gap-10 py-12 sm:grid-cols-2">
            <div>
              <p className="text-lg font-bold text-body">{name}</p>
              {content.description && <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">{content.description}</p>}
            </div>
            <ContactLines content={content} />
          </Container>
        </div>
        <Container className="flex flex-wrap items-center justify-between gap-4 py-5">
          <nav aria-label="Footer">{linkList(false, true)}</nav>
          <Copyright content={content} name={name} />
        </Container>
      </footer>
    );
  }

  if (v === 12) {
    return (
      <footer className="border-t border-body/10">
        <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-bold text-body">{name}</p>
            {content.description && <p className="mt-2 text-sm leading-relaxed text-muted">{content.description}</p>}
          </div>
          <nav aria-label="Footer">{linkList()}</nav>
          <ContactLines content={content} />
          {content.phone && (
            <div>
              <Button href={`tel:${content.phone.replace(/\s/g, "")}`} variant="outline" size="sm">
                {content.phone}
              </Button>
            </div>
          )}
        </Container>
        <Container className="border-t border-body/10 py-6">
          <Copyright content={content} name={name} />
        </Container>
      </footer>
    );
  }

  if (v === 13) {
    return (
      <footer className="overflow-hidden bg-accent">
        <Container className="py-12">
          <p
            aria-hidden="true"
            className="pointer-events-none text-[clamp(3rem,12vw,9rem)] font-bold leading-none tracking-tight text-white/5 select-none"
          >
            {name}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <nav aria-label="Footer">{linkList(true, true)}</nav>
            <Copyright content={content} name={name} dark />
          </div>
        </Container>
      </footer>
    );
  }

  if (v === 14) {
    return (
      <footer className="bg-main-soft">
        <Container className="flex flex-col items-center gap-5 py-12 text-center">
          <p className="text-lg font-bold text-body">{name}</p>
          <nav aria-label="Footer">{linkList(false, true)}</nav>
          <ContactLines content={content} row />
          <Copyright content={content} name={name} />
        </Container>
      </footer>
    );
  }

  if (v === 15) {
    return (
      <footer className="grid border-t border-body/10 lg:grid-cols-2 lg:border-t-0">
        <div className="bg-main px-4 py-12 sm:px-10 lg:px-16">
          <p className="text-2xl font-bold tracking-tight text-white">{name}</p>
          {content.description && <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">{content.description}</p>}
        </div>
        <div className="flex flex-col justify-center gap-6 px-4 py-12 sm:px-10 lg:px-16">
          <nav aria-label="Footer">{linkList(false, true)}</nav>
          <ContactLines content={content} row />
          <Copyright content={content} name={name} />
        </div>
      </footer>
    );
  }

  // Variant 1 (default): simple centered.
  return (
    <footer className="border-t border-body/10">
      <Container className="flex flex-col items-center gap-4 py-10 text-center">
        <p className="text-lg font-bold text-body">{name}</p>
        {content.description && <p className="max-w-md text-sm text-muted">{content.description}</p>}
        <ContactLines content={content} />
        <Copyright content={content} name={name} />
      </Container>
    </footer>
  );
}
