/** Shape of config/config.json — visual identity and layout choices. */
export interface SiteConfig {
  brand: {
    logo?: string;
    logoText: string;
    favicon?: string;
  };
  theme: {
    mainColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
    mutedTextColor: string;
    borderRadius: string;
    fontFamily: string;
    containerWidth: string;
  };
  layout: {
    navbarVariant: number;
    heroVariant: number;
    servicesVariant: number;
    aboutVariant: number;
    featuresVariant: number;
    galleryVariant: number;
    testimonialsVariant: number;
    pricingVariant: number;
    faqVariant: number;
    ctaVariant: number;
    contactVariant: number;
    footerVariant: number;
  };
  sections: {
    showServices: boolean;
    showAbout: boolean;
    showFeatures: boolean;
    showGallery: boolean;
    showTestimonials: boolean;
    showPricing: boolean;
    showFAQ: boolean;
    showCTA: boolean;
    showContact: boolean;
    /** Floating call button on mobile, using the contact/footer phone number. */
    showCallButton: boolean;
  };
  seo: {
    siteUrl: string;
    defaultTitle: string;
    defaultDescription: string;
    keywords: string[];
    ogImage?: string;
    /** Schema.org type for JSON-LD, e.g. "Plumber", "Electrician", "LocalBusiness". */
    businessType?: string;
    /** BCP 47 language tag for <html lang>, e.g. "en", "sr", "de". */
    language?: string;
    /** Set to the site's domain to load Plausible analytics, e.g. "example.com". */
    plausibleDomain?: string;
    /** Google Analytics 4 measurement ID, e.g. "G-XXXXXXX". */
    gaId?: string;
  };
}

export interface NavLink {
  label: string;
  href: string;
}

/** Shape of config/content.json — all copy and media. Everything optional so missing fields never crash rendering. */
export interface SiteContent {
  navbar?: {
    links?: NavLink[];
    ctaLabel?: string;
    /** Accessible "skip to content" link text; defaults to English. */
    skipLabel?: string;
  };
  hero?: {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    primaryButton?: string;
    secondaryButton?: string;
    image?: string;
    imageAlt?: string;
    badges?: string[];
    highlights?: { title?: string; description?: string }[];
    contactCard?: { title?: string; subtitle?: string; button?: string };
  };
  services?: {
    title?: string;
    subtitle?: string;
    items?: { title?: string; description?: string; icon?: string; image?: string }[];
  };
  about?: {
    title?: string;
    subtitle?: string;
    body?: string;
    image?: string;
    imageAlt?: string;
    stats?: { value?: string; label?: string }[];
  };
  features?: {
    title?: string;
    subtitle?: string;
    items?: { title?: string; description?: string; icon?: string }[];
  };
  gallery?: {
    title?: string;
    subtitle?: string;
    items?: { image?: string; alt?: string; caption?: string }[];
  };
  testimonials?: {
    title?: string;
    subtitle?: string;
    items?: { name?: string; role?: string; text?: string }[];
  };
  pricing?: {
    title?: string;
    subtitle?: string;
    /** Badge text on the featured plan (pricing variant 2), e.g. "Most popular". */
    featuredLabel?: string;
    plans?: {
      name?: string;
      price?: string;
      period?: string;
      description?: string;
      features?: string[];
      button?: string;
      featured?: boolean;
    }[];
  };
  faq?: {
    title?: string;
    subtitle?: string;
    items?: { question?: string; answer?: string }[];
  };
  cta?: {
    title?: string;
    subtitle?: string;
    button?: string;
    secondaryButton?: string;
  };
  contact?: {
    title?: string;
    subtitle?: string;
    phone?: string;
    email?: string;
    address?: string;
    hours?: string;
    /** Form POST endpoint (e.g. a Formspree URL). Falls back to mailto: when unset. */
    formAction?: string;
    /** Google Maps embed URL — rendered as a map below the contact section. */
    mapEmbed?: string;
    form?: {
      nameLabel?: string;
      emailLabel?: string;
      phoneLabel?: string;
      messageLabel?: string;
      submitLabel?: string;
    };
  };
  footer?: {
    businessName?: string;
    description?: string;
    phone?: string;
    email?: string;
    address?: string;
    copyright?: string;
  };
  /** Simple text pages (privacy policy, impressum, …) served at /<slug> and linked from the footer. */
  pages?: {
    slug?: string;
    title?: string;
    /** Plain text; blank lines split paragraphs. */
    body?: string;
  }[];
}
