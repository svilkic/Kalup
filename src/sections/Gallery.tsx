import { Section, SectionHeading } from "@/components/Section";
import { Container } from "@/components/Container";
import { SmartImage } from "@/components/SmartImage";
import { cn, clampVariant } from "@/lib/utils";
import type { SiteContent } from "@/lib/types";

interface GalleryProps {
  variant?: number;
  content?: SiteContent["gallery"];
}

/**
 * Variants:
 * 1 — 3-column grid
 * 2 — Masonry-style columns
 * 3 — Two-column, large images with captions
 * 4 — Horizontal scroll strip (CSS scroll snap, no JS)
 * 5 — Grid with visible captions under each image
 * 6 — Featured: first image large, rest in a small grid
 * 7 — Full-bleed tight grid, edge to edge
 * 8 — Wide 16:9 tiles with hover zoom
 * 9 — Polaroid-style framed prints with captions
 * 10 — Heading left, compact grid right
 * 11 — Mosaic: every fifth image spans double
 * 12 — Single column, large editorial images with captions
 * 13 — Diptych rows: alternating wide/narrow pairs
 * 14 — Grid with caption overlaid on a bottom gradient
 * 15 — Two staggered columns
 */
export function Gallery({ variant, content = {} }: GalleryProps) {
  const v = clampVariant(variant, 15);
  // A gallery item is nothing without its image — drop empties so a removed
  // image leaves no placeholder behind (the editor's "Remove image" blanks it).
  const items = (content.items ?? []).filter((it) => it.image);
  if (!items.length) return null;

  if (v === 2) {
    return (
      <Section id="gallery">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <div className="columns-2 gap-4 lg:columns-3 [&>*]:mb-4 [&>*]:break-inside-avoid">
          {items.map((item, i) => (
            <SmartImage
              key={item.image ?? i}
              src={item.image}
              alt={item.alt || item.caption}
              className={i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"}
              sizes="(min-width: 1024px) 33vw, 50vw"
            />
          ))}
        </div>
      </Section>
    );
  }

  if (v === 3) {
    return (
      <Section id="gallery">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <ul className="grid gap-8 sm:grid-cols-2">
          {items.map((item, i) => (
            <li key={item.image ?? i}>
              <figure>
                <SmartImage src={item.image} alt={item.alt || item.caption} className="aspect-[3/2]" />
                {item.caption && <figcaption className="mt-3 text-sm text-muted">{item.caption}</figcaption>}
              </figure>
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  if (v === 4) {
    return (
      <Section id="gallery" bleed>
        <Container>
          <SectionHeading title={content.title} subtitle={content.subtitle} align="left" />
        </Container>
        <div className="snap-gallery flex gap-5 overflow-x-auto px-4 pb-4 sm:px-6 lg:px-8">
          {items.map((item, i) => (
            <figure key={item.image ?? i} className="w-72 shrink-0 sm:w-96">
              <SmartImage src={item.image} alt={item.alt || item.caption} className="aspect-[4/3]" sizes="24rem" />
              {item.caption && <figcaption className="mt-2 text-sm text-muted">{item.caption}</figcaption>}
            </figure>
          ))}
        </div>
      </Section>
    );
  }

  if (v === 5) {
    return (
      <Section id="gallery" className="bg-main-soft">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={item.image ?? i}>
              <figure className="overflow-hidden rounded-brand bg-white shadow-sm">
                <SmartImage src={item.image} alt={item.alt || item.caption} className="aspect-[4/3] rounded-none!" sizes="(min-width: 1024px) 33vw, 50vw" />
                {item.caption && <figcaption className="px-4 py-3 text-sm font-medium text-body">{item.caption}</figcaption>}
              </figure>
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  if (v === 6) {
    const [first, ...rest] = items;
    return (
      <Section id="gallery">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <div className="grid gap-4 lg:grid-cols-2">
          {first && (
            <SmartImage src={first.image} alt={first.alt || first.caption} className="aspect-square" sizes="(min-width: 1024px) 50vw, 100vw" />
          )}
          <ul className="grid grid-cols-2 gap-4">
            {rest.map((item, i) => (
              <li key={item.image ?? i}>
                <SmartImage src={item.image} alt={item.alt || item.caption} className="aspect-square" sizes="25vw" />
              </li>
            ))}
          </ul>
        </div>
      </Section>
    );
  }

  if (v === 7) {
    return (
      <Section id="gallery" bleed>
        <Container>
          <SectionHeading title={content.title} subtitle={content.subtitle} />
        </Container>
        <ul className="grid grid-cols-2 gap-1 md:grid-cols-3">
          {items.map((item, i) => (
            <li key={item.image ?? i}>
              <SmartImage src={item.image} alt={item.alt || item.caption} className="aspect-square rounded-none!" sizes="(min-width: 768px) 33vw, 50vw" />
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  if (v === 8) {
    return (
      <Section id="gallery">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={item.image ?? i} className="group overflow-hidden rounded-brand">
              <SmartImage
                src={item.image}
                alt={item.alt || item.caption}
                className="aspect-video transition-transform duration-300 group-hover:scale-105"
                sizes="(min-width: 1024px) 33vw, 50vw"
              />
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  if (v === 9) {
    return (
      <Section id="gallery" className="bg-main-soft">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <ul className="flex flex-wrap justify-center gap-8">
          {items.map((item, i) => (
            <li
              key={item.image ?? i}
              className={cn(
                "w-64 rounded-sm bg-white p-3 pb-4 shadow-lg shadow-body/10",
                i % 2 === 0 ? "rotate-1" : "-rotate-1",
              )}
            >
              <SmartImage src={item.image} alt={item.alt || item.caption} className="aspect-square rounded-none!" sizes="16rem" />
              {item.caption && <p className="mt-3 text-center text-sm text-muted">{item.caption}</p>}
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  if (v === 10) {
    return (
      <Section id="gallery">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <SectionHeading title={content.title} subtitle={content.subtitle} align="left" />
          <ul className="grid grid-cols-2 gap-4">
            {items.map((item, i) => (
              <li key={item.image ?? i}>
                <SmartImage src={item.image} alt={item.alt || item.caption} className="aspect-square" sizes="33vw" />
              </li>
            ))}
          </ul>
        </div>
      </Section>
    );
  }

  if (v === 11) {
    return (
      <Section id="gallery">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {items.map((item, i) => {
            /*
             * Only the first tile is featured, and only on md+ — square
             * siblings in its rows define the row height, so the stretched
             * tile can never land in an empty (zero-height) row.
             */
            const featured = i === 0 && items.length > 3;
            return (
              <li key={item.image ?? i} className={cn(featured && "md:col-span-2 md:row-span-2")}>
                <SmartImage
                  src={item.image}
                  alt={item.alt || item.caption}
                  className={featured ? "aspect-square md:aspect-auto md:h-full" : "aspect-square"}
                  sizes={featured ? "(min-width: 768px) 50vw, 100vw" : "25vw"}
                />
              </li>
            );
          })}
        </ul>
      </Section>
    );
  }

  if (v === 12) {
    return (
      <Section id="gallery" containerClassName="max-w-3xl">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <div className="flex flex-col gap-10">
          {items.map((item, i) => (
            <figure key={item.image ?? i}>
              <SmartImage src={item.image} alt={item.alt || item.caption} className="aspect-[3/2]" sizes="48rem" />
              {item.caption && <figcaption className="mt-3 text-center text-sm text-muted">{item.caption}</figcaption>}
            </figure>
          ))}
        </div>
      </Section>
    );
  }

  if (v === 13) {
    return (
      <Section id="gallery">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {items.map((item, i) => {
            const wide = i % 4 === 0 || i % 4 === 3;
            return (
              <li key={item.image ?? i} className={cn(wide && "sm:col-span-2")}>
                <SmartImage
                  src={item.image}
                  alt={item.alt || item.caption}
                  className={wide ? "aspect-[3/2]" : "aspect-[3/2] sm:aspect-auto sm:h-full"}
                  sizes={wide ? "66vw" : "33vw"}
                />
              </li>
            );
          })}
        </ul>
      </Section>
    );
  }

  if (v === 14) {
    return (
      <Section id="gallery">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={item.image ?? i} className="relative overflow-hidden rounded-brand">
              <SmartImage src={item.image} alt={item.alt || item.caption} className="aspect-[4/3]" sizes="(min-width: 1024px) 33vw, 50vw" />
              {item.caption && (
                <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-10 text-sm font-medium text-white">
                  {item.caption}
                </p>
              )}
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  if (v === 15) {
    const left = items.filter((_, i) => i % 2 === 0);
    const right = items.filter((_, i) => i % 2 === 1);
    return (
      <Section id="gallery">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <div className="grid gap-4 sm:grid-cols-2">
          <ul className="flex flex-col gap-4">
            {left.map((item, i) => (
              <li key={item.image ?? i}>
                <SmartImage src={item.image} alt={item.alt || item.caption} className="aspect-[4/5]" sizes="50vw" />
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-4 sm:mt-16">
            {right.map((item, i) => (
              <li key={item.image ?? i}>
                <SmartImage src={item.image} alt={item.alt || item.caption} className="aspect-[4/5]" sizes="50vw" />
              </li>
            ))}
          </ul>
        </div>
      </Section>
    );
  }

  // Variant 1 (default): 3-column grid.
  return (
    <Section id="gallery">
      <SectionHeading title={content.title} subtitle={content.subtitle} />
      <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {items.map((item, i) => (
          <li key={item.image ?? i}>
            <SmartImage src={item.image} alt={item.alt || item.caption} className="aspect-square" sizes="(min-width: 1024px) 33vw, 50vw" />
          </li>
        ))}
      </ul>
    </Section>
  );
}
