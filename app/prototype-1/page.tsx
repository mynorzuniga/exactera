import type { Metadata } from "next";

import { BRAND_NAVY, NEUTRAL_GREY } from "@/lib/design-system-color-tokens";
import { HeaderV1, PromotionBarV2 } from "@/components/design-system-header-footer";
import { PrototypeClientLogosStrip } from "@/components/prototype-client-logos-strip";
import { PrototypeHeroCtaCluster } from "@/components/prototype-hero-cta-cluster";
import { PrototypeHeroGrowthBackdrop } from "@/components/prototype-hero-growth-backdrop";
import { PrototypeHeroMobileCardsCarousel } from "@/components/prototype-hero-mobile-cards-carousel";
import { PrototypeHeroSeeHowCard } from "@/components/prototype-hero-see-how-card";
import { PrototypeHeroYoutubePreviewCard } from "@/components/prototype-hero-youtube-preview-card";
import { PrototypeBlogTeaserSection } from "@/components/prototype-blog-teaser-section";
import { PrototypeConsultantsSolutionsTabs } from "@/components/prototype-consultants-solutions-tabs";
import { PrototypeExacteraFooter } from "@/components/prototype-exactera-footer";
import { PrototypeSmarterTaxCtaStrip } from "@/components/prototype-smarter-tax-cta-strip";
import { PrototypeWebinarSection } from "@/components/prototype-webinar-section";

/**
 * White hero; light grey dots (`NEUTRAL_GREY`). Step **50** on `#fff` is effectively
 * invisible; **200** is the lightest ramp step that still reads as a stipple.
 */
const prototypeHeroStippleStyle = {
  backgroundColor: "#ffffff",
  backgroundImage: `radial-gradient(circle at center, ${NEUTRAL_GREY[200]} 0.55px, transparent 0.6px)`,
  backgroundSize: "12px 12px",
} as const;

export const metadata: Metadata = {
  title: "Exactera · Prototype 1",
  description: "Interactive prototype 1 for Exactera.",
};

export default function Prototype1Page() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-zinc-50 [font-family:var(--font-plus-jakarta),system-ui,sans-serif]">
      <div className="flex flex-col">
        <PromotionBarV2 />
        <HeaderV1 />
      </div>

      <section
        className="relative min-h-[32rem] overflow-visible sm:min-h-[38rem] lg:min-h-[min(70vh,44rem)]"
        aria-labelledby="prototype-1-hero-heading"
        style={{
          ...prototypeHeroStippleStyle,
          borderBottom: `1px solid ${NEUTRAL_GREY[200]}`,
        }}
      >
        <PrototypeHeroGrowthBackdrop />
        <div className="relative z-10 mx-auto max-w-[1320px] px-6 py-12 sm:py-16 lg:py-20">
          <div className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="min-w-0">
              <h1
                id="prototype-1-hero-heading"
                className="text-[3rem] leading-[1.15] font-semibold tracking-[-0.02em]"
                style={{ color: BRAND_NAVY[900] }}
              >
                Transform Your Tax Strategy.
                Inform Growth.
              </h1>
              <p
                className="mt-6 text-[1rem] leading-[1.6] font-normal"
                style={{ color: NEUTRAL_GREY[700] }}
              >
                Combine AI-powered tax services with expert guidance to manage risk, unlock
                incentives, and turn tax into a strategic asset across your corporate tax
                lifecycle.
              </p>

              <PrototypeHeroCtaCluster />

              <PrototypeHeroMobileCardsCarousel />
            </div>
            <div className="relative mx-auto hidden w-full min-w-0 flex-col items-center overflow-visible lg:flex">
              {/* Main card centered; z-20 by default so it sits above side cards; hover/focus raises to z-40 */}
              <div className="relative z-20 flex w-full justify-center opacity-70 transition-opacity duration-200 ease-out hover:z-40 hover:opacity-100 focus-within:z-40 focus-within:opacity-100">
                <PrototypeHeroSeeHowCard />
              </div>
              <div className="relative mt-8 flex w-full min-w-0 justify-center overflow-visible sm:mt-10">
                <div className="flex w-[min(21rem,calc(100%+1rem))] max-w-[calc(100vw-2.5rem)] justify-between gap-0 sm:w-[30rem]">
                  <div className="relative z-10 shrink-0 translate-y-4 opacity-70 transition-opacity duration-200 ease-out hover:z-40 hover:opacity-100 focus-within:z-40 focus-within:opacity-100 sm:translate-y-6">
                    <PrototypeHeroYoutubePreviewCard
                      previewSrc="/preview1.png"
                      label="Exactmatch is Here"
                      modalTitle="Exactera's Exactmatch is Here"
                      youtubeEmbedBaseUrl="https://www.youtube.com/embed/VRMaHcj7CL8"
                    />
                  </div>
                  <div className="relative z-10 shrink-0 -mt-[50px] translate-x-[calc(3rem-20px)] self-start opacity-70 transition-opacity duration-200 ease-out hover:z-40 hover:opacity-100 focus-within:z-40 focus-within:opacity-100 sm:-mt-[66px] sm:translate-x-[calc(7rem-20px)]">
                    <PrototypeHeroYoutubePreviewCard
                      previewSrc="/preview2.png"
                      label="Transfer Pricing"
                      modalTitle="Transfer Pricing Overview"
                      youtubeEmbedBaseUrl="https://www.youtube.com/embed/eHfE4S9a14w"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PrototypeClientLogosStrip />

      <PrototypeConsultantsSolutionsTabs />

      <PrototypeWebinarSection />

      <PrototypeBlogTeaserSection />

      <PrototypeSmarterTaxCtaStrip />
      <PrototypeExacteraFooter />
    </div>
  );
}
