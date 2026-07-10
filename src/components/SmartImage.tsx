"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn, editorEnabled } from "@/lib/utils";

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
 * next/image in a sized wrapper. If the image is missing or fails to load,
 * a quiet placeholder renders instead of a broken image — so a half-filled
 * content file still looks fine. Client component so it also works in the
 * state-driven /demo configurator; blob/data URLs (demo image uploads)
 * bypass the optimizer.
 */
export function SmartImage({ src, alt = "", className, sizes = "(min-width: 1024px) 50vw, 100vw", priority }: SmartImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const show = src && failedSrc !== src;

  return (
    <div
      className={cn("relative overflow-hidden rounded-brand bg-main-soft", className)}
      // Lets the content editor map this image back to its content.json field.
      {...(editorEnabled && src ? { "data-src": src } : {})}
    >
      {show ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          unoptimized={src.startsWith("blob:") || src.startsWith("data:")}
          className="object-cover"
          onError={() => setFailedSrc(src)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center" role="img" aria-label={alt || "Image placeholder"}>
          <ImageIcon className="h-10 w-10 text-main/30" aria-hidden="true" />
        </div>
      )}
    </div>
  );
}
