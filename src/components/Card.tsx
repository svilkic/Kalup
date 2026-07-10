import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  /** "raised" = shadow, "outline" = border only, "soft" = tinted background, "flat" = none */
  look?: "raised" | "outline" | "soft" | "flat";
  children: React.ReactNode;
}

const looks = {
  raised: "bg-white shadow-md shadow-body/5 border border-body/5",
  outline: "bg-white border border-body/10",
  soft: "bg-main-soft",
  flat: "bg-white",
};

export function Card({ className, look = "outline", children }: CardProps) {
  return <div className={cn("rounded-brand p-6", looks[look], className)}>{children}</div>;
}
