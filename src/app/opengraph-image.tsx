import { ImageResponse } from "next/og";
import { getConfig } from "@/lib/site";

/*
 * Branded social share card generated at build time from config.json.
 * Used automatically unless seo.ogImage points at a real file in /public.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const config = getConfig();
export const alt = config.seo.defaultTitle;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: config.theme.mainColor,
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, opacity: 0.85, textTransform: "uppercase", letterSpacing: 6 }}>
          {config.brand.logoText}
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 68, fontWeight: 700, lineHeight: 1.15 }}>
          {config.seo.defaultTitle}
        </div>
      </div>
    ),
    size,
  );
}
