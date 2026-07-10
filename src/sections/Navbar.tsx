"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { cn, clampVariant } from "@/lib/utils";
import type { SiteContent } from "@/lib/types";

interface NavbarProps {
  variant?: number;
  content?: SiteContent["navbar"];
  logo?: string;
  logoText?: string;
}

function Logo({ logo, logoText, light }: { logo?: string; logoText?: string; light?: boolean }) {
  return (
    <Link href="#home" className="flex items-center gap-2.5" aria-label={logoText || "Home"}>
      {/* Plain <img>: logos are tiny SVGs, next/image adds nothing here. */}
      {logo && <img src={logo} alt="" width={32} height={32} className="h-8 w-8" />}
      <span className={cn("text-lg font-bold tracking-tight", light ? "text-white" : "text-body")}>
        {logoText}
      </span>
    </Link>
  );
}

/**
 * Variants:
 * 1 — Centered: logo on top, links centered underneath
 * 2 — Classic: left logo, right links, CTA button
 * 3 — Transparent overlay on the hero (light text)
 * 4 — Boxed: floating rounded bar with shadow
 * 5 — Minimal: logo + menu button at every breakpoint
 * 6 — Centered logo with links split left and right
 * 7 — Solid dark bar
 * 8 — Uppercase links with underline accent
 * 9 — Two-tier: slim brand strip above a classic bar
 * 10 — Left cluster: logo and links together, CTA far right
 * 11 — Centered links, text CTA on the right
 * 12 — Full-screen overlay menu at every breakpoint
 * 13 — CTA-forward: button stays visible on mobile next to the menu
 * 14 — Scrollable pill tabs, no hamburger at all
 * 15 — Classic desktop bar, slide-in drawer on mobile
 */
export function Navbar({ variant, content, logo, logoText }: NavbarProps) {
  const v = clampVariant(variant, 15);
  const [open, setOpen] = useState(false);
  const links = content?.links ?? [];
  const cta = content?.ctaLabel;
  const light = v === 3 || v === 7;

  const navLinks = (className?: string, subset = links) => (
    <ul className={cn("flex items-center gap-6", className)}>
      {subset.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={cn(
              "text-sm font-medium transition-colors",
              light ? "text-white/85 hover:text-white" : "text-body/70 hover:text-body",
            )}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );

  const menuButton = (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      aria-expanded={open}
      aria-controls="mobile-menu"
      aria-label={open ? "Close menu" : "Open menu"}
      className={cn(
        "rounded-brand p-2 focus-visible:outline-2 focus-visible:outline-main",
        light ? "text-white" : "text-body",
        v !== 5 && v !== 12 && "md:hidden",
      )}
    >
      {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
    </button>
  );

  // Mobile dropdown panel (all variants; variant 5 uses it on desktop too).
  const mobilePanel = open && (
    <div id="mobile-menu" className="border-t border-body/10 bg-white shadow-lg">
      <Container className="flex flex-col gap-1 py-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className="rounded-brand px-3 py-2.5 text-base font-medium text-body/80 hover:bg-main-soft hover:text-body"
          >
            {link.label}
          </Link>
        ))}
        {cta && (
          <div className="mt-2 px-3 pb-2">
            <Button href="#contact" className="w-full">{cta}</Button>
          </div>
        )}
      </Container>
    </div>
  );

  if (v === 1) {
    return (
      <header className="sticky top-0 z-50 border-b border-body/10 bg-white/90 backdrop-blur">
        <Container>
          <div className="flex items-center justify-between py-3 md:justify-center md:py-4">
            <Logo logo={logo} logoText={logoText} />
            {menuButton}
          </div>
          <nav aria-label="Main" className="hidden justify-center pb-3 md:flex">
            {navLinks()}
          </nav>
        </Container>
        {mobilePanel}
      </header>
    );
  }

  if (v === 3) {
    return (
      <header className="absolute inset-x-0 top-0 z-50">
        <Container>
          <div className="flex items-center justify-between py-5">
            <Logo logo={logo} logoText={logoText} light />
            <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
              {navLinks()}
              {cta && <Button href="#contact" variant="inverted" size="sm">{cta}</Button>}
            </nav>
            {menuButton}
          </div>
        </Container>
        {mobilePanel}
      </header>
    );
  }

  if (v === 4) {
    return (
      <header className="sticky top-3 z-50">
        <Container>
          <div className="flex items-center justify-between rounded-full border border-body/5 bg-white px-5 py-2.5 shadow-lg shadow-body/5">
            <Logo logo={logo} logoText={logoText} />
            <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
              {navLinks()}
              {cta && <Button href="#contact" size="sm" className="rounded-full">{cta}</Button>}
            </nav>
            {menuButton}
          </div>
        </Container>
        {mobilePanel}
      </header>
    );
  }

  if (v === 5) {
    return (
      <header className="sticky top-0 z-50 border-b border-body/10 bg-white">
        <Container className="flex items-center justify-between py-3">
          <Logo logo={logo} logoText={logoText} />
          {menuButton}
        </Container>
        {mobilePanel}
      </header>
    );
  }

  if (v === 6) {
    const mid = Math.ceil(links.length / 2);
    return (
      <header className="sticky top-0 z-50 border-b border-body/10 bg-white/90 backdrop-blur">
        <Container className="flex items-center justify-between py-3.5 md:grid md:grid-cols-[1fr_auto_1fr]">
          <nav aria-label="Primary" className="hidden md:block">{navLinks(undefined, links.slice(0, mid))}</nav>
          <Logo logo={logo} logoText={logoText} />
          <nav aria-label="Secondary" className="hidden items-center justify-end gap-8 md:flex">
            {navLinks(undefined, links.slice(mid))}
            {cta && <Button href="#contact" size="sm">{cta}</Button>}
          </nav>
          {menuButton}
        </Container>
        {mobilePanel}
      </header>
    );
  }

  if (v === 7) {
    return (
      <header className="sticky top-0 z-50 bg-accent">
        <Container className="flex items-center justify-between py-3.5">
          <Logo logo={logo} logoText={logoText} light />
          <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
            {navLinks()}
            {cta && <Button href="#contact" variant="inverted" size="sm">{cta}</Button>}
          </nav>
          {menuButton}
        </Container>
        {mobilePanel}
      </header>
    );
  }

  if (v === 8) {
    return (
      <header className="sticky top-0 z-50 border-b-2 border-body/10 bg-white/90 backdrop-blur">
        <Container className="flex items-center justify-between py-4">
          <Logo logo={logo} logoText={logoText} />
          <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
            <ul className="flex items-center gap-8">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs font-semibold uppercase tracking-widest text-body/70 decoration-main decoration-2 underline-offset-8 hover:text-body hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            {cta && <Button href="#contact" size="sm">{cta}</Button>}
          </nav>
          {menuButton}
        </Container>
        {mobilePanel}
      </header>
    );
  }

  if (v === 9) {
    return (
      <header className="sticky top-0 z-50">
        <div className="bg-main">
          <Container className="flex items-center justify-end py-1.5">
            {cta && (
              <Link href="#contact" className="text-xs font-semibold text-white hover:underline">
                {cta}
              </Link>
            )}
          </Container>
        </div>
        <div className="border-b border-body/10 bg-white/90 backdrop-blur">
          <Container className="flex items-center justify-between py-3">
            <Logo logo={logo} logoText={logoText} />
            <nav aria-label="Main" className="hidden md:flex">{navLinks()}</nav>
            {menuButton}
          </Container>
        </div>
        {mobilePanel}
      </header>
    );
  }

  if (v === 10) {
    return (
      <header className="sticky top-0 z-50 border-b border-body/10 bg-white/90 backdrop-blur">
        <Container className="flex items-center justify-between py-3.5">
          <div className="flex items-center gap-10">
            <Logo logo={logo} logoText={logoText} />
            <nav aria-label="Main" className="hidden md:block">{navLinks()}</nav>
          </div>
          {cta && (
            <div className="hidden md:block">
              <Button href="#contact" size="sm">{cta}</Button>
            </div>
          )}
          {menuButton}
        </Container>
        {mobilePanel}
      </header>
    );
  }

  if (v === 11) {
    return (
      <header className="sticky top-0 z-50 border-b border-body/10 bg-white/90 backdrop-blur">
        <Container className="flex items-center justify-between py-3.5 md:grid md:grid-cols-[1fr_auto_1fr]">
          <div>
            <Logo logo={logo} logoText={logoText} />
          </div>
          <nav aria-label="Main" className="hidden md:block">{navLinks()}</nav>
          {cta && (
            <div className="hidden justify-end md:flex">
              <Link href="#contact" className="text-sm font-semibold text-main hover:underline">
                {cta}
              </Link>
            </div>
          )}
          {menuButton}
        </Container>
        {mobilePanel}
      </header>
    );
  }

  if (v === 12) {
    /*
     * The overlay must be a SIBLING of the header: backdrop-blur creates a
     * containing block, which would trap a fixed-position overlay inside the
     * header strip instead of covering the viewport.
     */
    return (
      <>
        <header className="sticky top-0 z-50 border-b border-body/10 bg-white/90 backdrop-blur">
          <Container className="flex items-center justify-between py-3.5">
            <Logo logo={logo} logoText={logoText} />
            {menuButton}
          </Container>
        </header>
        {open && (
          <div className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-white">
            <Container className="flex shrink-0 items-center justify-between py-3.5">
              <Logo logo={logo} logoText={logoText} />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="rounded-brand p-2 text-body focus-visible:outline-2 focus-visible:outline-main"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </Container>
            <nav aria-label="Main" className="flex flex-1 flex-col items-center justify-center gap-6 py-10">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-3xl font-bold tracking-tight text-body hover:text-main"
                >
                  {link.label}
                </Link>
              ))}
              {cta && (
                <Button href="#contact" size="lg" className="mt-4">
                  {cta}
                </Button>
              )}
            </nav>
          </div>
        )}
      </>
    );
  }

  if (v === 13) {
    return (
      <header className="sticky top-0 z-50 border-b border-body/10 bg-white/90 backdrop-blur">
        <Container className="flex items-center justify-between gap-3 py-3">
          <Logo logo={logo} logoText={logoText} />
          <div className="flex items-center gap-2 sm:gap-4">
            <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
              {navLinks()}
            </nav>
            {cta && (
              <Button href="#contact" size="sm">
                {cta}
              </Button>
            )}
            {menuButton}
          </div>
        </Container>
        {mobilePanel}
      </header>
    );
  }

  if (v === 14) {
    return (
      <header className="sticky top-0 z-50 border-b border-body/10 bg-white/95 backdrop-blur">
        <Container className="flex items-center justify-between pt-3">
          <Logo logo={logo} logoText={logoText} />
          {cta && (
            <Button href="#contact" size="sm" className="hidden sm:inline-flex">
              {cta}
            </Button>
          )}
        </Container>
        <nav aria-label="Main" className="mx-auto w-full max-w-[var(--container)] px-4 sm:px-6 lg:px-8">
          <ul className="snap-gallery flex gap-2 overflow-x-auto py-2.5">
            {links.map((link) => (
              <li key={link.href} className="shrink-0">
                <Link
                  href={link.href}
                  className="inline-block rounded-full bg-main-soft px-4 py-1.5 text-sm font-medium text-body/80 transition-colors hover:bg-main hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    );
  }

  if (v === 15) {
    // Drawer is a sibling of the header — same backdrop-blur containing-block trap as v12.
    return (
      <>
        <header className="sticky top-0 z-50 border-b border-body/10 bg-white/90 backdrop-blur">
          <Container className="flex items-center justify-between py-3.5">
            <Logo logo={logo} logoText={logoText} />
            <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
              {navLinks()}
              {cta && <Button href="#contact" size="sm">{cta}</Button>}
            </nav>
            {menuButton}
          </Container>
        </header>
        {open && (
          <div className="fixed inset-0 z-[60] md:hidden">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-body/40"
            />
            <div className="absolute inset-y-0 right-0 flex w-72 max-w-[85vw] flex-col bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-body/10 px-5 py-3.5">
                <span className="font-bold text-body">{logoText}</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="rounded-brand p-2 text-body focus-visible:outline-2 focus-visible:outline-main"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <nav aria-label="Main" className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-brand px-3 py-2.5 text-base font-medium text-body/80 hover:bg-main-soft hover:text-body"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              {cta && (
                <div className="border-t border-body/10 p-4" onClick={() => setOpen(false)}>
                  <Button href="#contact" className="w-full">{cta}</Button>
                </div>
              )}
            </div>
          </div>
        )}
      </>
    );
  }

  // Variant 2 (default): left logo, right links, CTA.
  return (
    <header className="sticky top-0 z-50 border-b border-body/10 bg-white/90 backdrop-blur">
      <Container className="flex items-center justify-between py-3.5">
        <Logo logo={logo} logoText={logoText} />
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {navLinks()}
          {cta && <Button href="#contact" size="sm">{cta}</Button>}
        </nav>
        {menuButton}
      </Container>
      {mobilePanel}
    </header>
  );
}
