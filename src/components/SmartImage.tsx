import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SmartImageProps {
  src?: string;
  alt?: string;
  /** Wrapper classes — set the aspect ratio / size here (e.g. "aspect-[4/3]"). */
  className?: string;
  /** Responsive sizes hint for next/image. */
  sizes?: string;
  priority?: boolean;
}

/**
 * next/image in a sized wrapper. If the file referenced in content.json
 * doesn't exist in /public yet, renders a quiet placeholder instead of a
 * broken image — so a half-filled content file still builds and looks fine.
 * Server component (uses fs), so use it from sections, not client components.
 */
export function SmartImage({ src, alt = "", className, sizes = "(min-width: 1024px) 50vw, 100vw", priority }: SmartImageProps) {
  const exists = src && fs.existsSync(path.join(process.cwd(), "public", src.replace(/^\//, "")));

  return (
    <div
      className={cn("relative overflow-hidden rounded-brand bg-main-soft", className)}
      // Lets the dev content editor map this image back to its content.json field.
      {...(process.env.NODE_ENV === "development" && src ? { "data-src": src } : {})}
    >
      {exists ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center" role="img" aria-label={alt || "Image placeholder"}>
          <ImageIcon className="h-10 w-10 text-main/30" aria-hidden="true" />
        </div>
      )}
    </div>
  );
}
