import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "inverted";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  type?: "button" | "submit";
  children: React.ReactNode;
}

const variants: Record<Variant, string> = {
  primary: "bg-main text-white hover:bg-main-strong shadow-sm",
  secondary: "bg-secondary text-white hover:brightness-95 shadow-sm",
  outline: "border border-main/30 text-main hover:bg-main-soft",
  ghost: "text-body hover:bg-body/5",
  inverted: "bg-white text-body hover:bg-white/90 shadow-sm",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

/** Renders a <Link> when href is given, a <button> otherwise. */
export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  children,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-brand font-semibold transition-colors",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main",
    variants[variant],
    sizes[size],
    className,
  );
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
}
