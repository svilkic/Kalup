import { cn } from "@/lib/utils";

/** Centered content wrapper; max width comes from config.theme.containerWidth. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[var(--container)] px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
