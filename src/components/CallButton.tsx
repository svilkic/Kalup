import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Floating call button, mobile only — the highest-converting element for
 * local service businesses. Enabled via config.sections.showCallButton.
 */
export function CallButton({ phone }: { phone?: string }) {
  if (!phone) return null;
  return (
    <a
      href={`tel:${phone.replace(/\s/g, "")}`}
      aria-label={`Call ${phone}`}
      className={cn(
        "fixed right-4 bottom-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-main text-white shadow-lg shadow-body/25 md:hidden",
        // In dev the config-sidebar toggle occupies the same corner.
        process.env.NODE_ENV === "development" && "bottom-20",
      )}
    >
      <Phone className="h-6 w-6" aria-hidden="true" />
    </a>
  );
}
