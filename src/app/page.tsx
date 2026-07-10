import { getConfig, getContent } from "@/lib/site";
import { Navbar } from "@/sections/Navbar";
import { Hero } from "@/sections/Hero";
import { Services } from "@/sections/Services";
import { About } from "@/sections/About";
import { Features } from "@/sections/Features";
import { Gallery } from "@/sections/Gallery";
import { Testimonials } from "@/sections/Testimonials";
import { Pricing } from "@/sections/Pricing";
import { FAQ } from "@/sections/FAQ";
import { CTA } from "@/sections/CTA";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";
import { CallButton } from "@/components/CallButton";

export default function HomePage() {
  const config = getConfig();
  const content = getContent();
  const { layout, sections, brand } = config;

  return (
    <>
      <Navbar
        variant={layout.navbarVariant}
        content={content.navbar}
        logo={brand.logo}
        logoText={brand.logoText}
      />
      <main id="home">
        <Hero variant={layout.heroVariant} content={content.hero} overlaidNav={layout.navbarVariant === 3} />
        {sections.showServices && <Services variant={layout.servicesVariant} content={content.services} />}
        {sections.showAbout && <About variant={layout.aboutVariant} content={content.about} />}
        {sections.showFeatures && <Features variant={layout.featuresVariant} content={content.features} />}
        {sections.showGallery && <Gallery variant={layout.galleryVariant} content={content.gallery} />}
        {sections.showTestimonials && (
          <Testimonials variant={layout.testimonialsVariant} content={content.testimonials} />
        )}
        {sections.showPricing && <Pricing variant={layout.pricingVariant} content={content.pricing} />}
        {sections.showFAQ && <FAQ variant={layout.faqVariant} content={content.faq} />}
        {sections.showCTA && <CTA variant={layout.ctaVariant} content={content.cta} />}
        {sections.showContact && <Contact variant={layout.contactVariant} content={content.contact} />}
      </main>
      <Footer variant={layout.footerVariant} content={content.footer} logoText={brand.logoText} />
      {sections.showCallButton && <CallButton phone={content.contact?.phone || content.footer?.phone} />}
    </>
  );
}
