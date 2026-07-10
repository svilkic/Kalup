import { cn } from "@/lib/utils";
import { Container } from "./Container";

interface SectionProps {
  id?: string;
  className?: string;
  containerClassName?: string;
  /** Render children without the Container wrapper (for full-bleed layouts). */
  bleed?: boolean;
  children: React.ReactNode;
}

/** Semantic <section> with consistent vertical rhythm and anchor id. */
export function Section({ id, className, containerClassName, bleed, children }: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-16 sm:py-24", className)}>
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}

/** Shared section heading: optional eyebrow-style subtitle under an h2. */
export function SectionHeading({
  title,
  subtitle,
  align = "center",
  dark,
}: {
  title?: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
}) {
  if (!title && !subtitle) return null;
  return (
    <div className={cn("mb-12 max-w-2xl", align === "center" && "mx-auto text-center")}>
      {title && (
        <h2 className={cn("text-3xl font-bold tracking-tight sm:text-4xl", dark ? "text-white" : "text-body")}>
          {title}
        </h2>
      )}
      {subtitle && (
        <p className={cn("mt-4 text-lg leading-relaxed", dark ? "text-white/75" : "text-muted")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
