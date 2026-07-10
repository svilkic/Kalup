import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getConfig, getContent } from "@/lib/site";
import { themeToCssVars } from "@/lib/theme";
import { getFontClass } from "@/lib/fonts";
import { ConfigSidebar } from "@/components/ConfigSidebar";
import { ContentEditor } from "@/components/ContentEditor";
import "@/styles/globals.css";

const config = getConfig();
const content = getContent();

/*
 * Only reference seo.ogImage when the file actually exists in /public;
 * otherwise the generated opengraph-image.tsx serves the social card.
 */
const ogImage =
  config.seo.ogImage && fs.existsSync(path.join(process.cwd(), "public", config.seo.ogImage.replace(/^\//, "")))
    ? config.seo.ogImage
    : undefined;

export const metadata: Metadata = {
  metadataBase: new URL(config.seo.siteUrl),
  title: config.seo.defaultTitle,
  description: config.seo.defaultDescription,
  keywords: config.seo.keywords,
  alternates: { canonical: "/" },
  icons: config.brand.favicon ? { icon: config.brand.favicon } : undefined,
  openGraph: {
    type: "website",
    url: config.seo.siteUrl,
    siteName: config.brand.logoText,
    title: config.seo.defaultTitle,
    description: config.seo.defaultDescription,
    ...(ogImage ? { images: [{ url: ogImage }] } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: config.seo.defaultTitle,
    description: config.seo.defaultDescription,
    ...(ogImage ? { images: [ogImage] } : {}),
  },
  robots: { index: true, follow: true },
};

/** Schema.org LocalBusiness structured data, built from config + content. */
function jsonLd() {
  const footer = content.footer ?? {};
  const contact = content.contact ?? {};
  return {
    "@context": "https://schema.org",
    "@type": config.seo.businessType || "LocalBusiness",
    name: footer.businessName || config.brand.logoText,
    description: config.seo.defaultDescription,
    url: config.seo.siteUrl,
    ...(footer.phone || contact.phone ? { telephone: footer.phone || contact.phone } : {}),
    ...(footer.email || contact.email ? { email: footer.email || contact.email } : {}),
    ...(footer.address || contact.address
      ? { address: { "@type": "PostalAddress", streetAddress: footer.address || contact.address } }
      : {}),
    ...(config.brand.logo ? { image: config.seo.siteUrl + config.brand.logo } : {}),
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={config.seo.language || "en"} style={themeToCssVars(config.theme)} className={getFontClass(config.theme.fontFamily)}>
      {/* suppressHydrationWarning: browser extensions (ColorZilla etc.) inject attributes into <body> before hydration; this scopes only to this element's attributes. */}
      <body className="bg-page text-body" suppressHydrationWarning>
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-brand focus:bg-main focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          {content.navbar?.skipLabel ?? "Skip to content"}
        </a>
        {children}
        {process.env.NODE_ENV === "development" && (
          <>
            <ConfigSidebar initial={config} />
            <ContentEditor initial={content} />
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
        />
        {config.seo.plausibleDomain && (
          <script defer data-domain={config.seo.plausibleDomain} src="https://plausible.io/js/script.js" />
        )}
        {config.seo.gaId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${config.seo.gaId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config',${JSON.stringify(config.seo.gaId)});`,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
