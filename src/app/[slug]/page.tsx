import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getConfig, getContent } from "@/lib/site";
import { Container } from "@/components/Container";

/*
 * Simple text pages (privacy policy, impressum, …) from content.json → pages.
 * Statically generated; unknown slugs 404.
 */
const pages = (getContent().pages ?? []).filter((p) => p.slug && p.title);
const config = getConfig();

export const dynamicParams = false;

export function generateStaticParams() {
  return pages.map((p) => ({ slug: p.slug! }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = pages.find((p) => p.slug === slug);
  return {
    title: `${page?.title} — ${config.brand.logoText}`,
    alternates: { canonical: `/${slug}` },
  };
}

export default async function TextPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pages.find((p) => p.slug === slug);
  if (!page) notFound();

  return (
    <>
      <header className="border-b border-body/10">
        <Container className="py-4">
          <Link href="/" className="text-lg font-bold tracking-tight text-body">
            {config.brand.logoText}
          </Link>
        </Container>
      </header>
      <main>
        <Container className="max-w-3xl py-16">
          <h1 className="text-3xl font-bold tracking-tight text-body sm:text-4xl">{page.title}</h1>
          <div className="mt-8 flex flex-col gap-4">
            {(page.body ?? "").split(/\n\s*\n/).map((paragraph, i) => (
              <p key={i} className="leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </main>
    </>
  );
}
