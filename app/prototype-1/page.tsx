import type { Metadata } from "next";

import { BRAND_NAVY, NEUTRAL_GREY } from "@/lib/design-system-color-tokens";
import { HeaderV1, PromotionBarV2 } from "@/components/design-system-header-footer";
import { PrototypeHeroCtaCluster } from "@/components/prototype-hero-cta-cluster";
import { PrototypeHeroGrowthBackdrop } from "@/components/prototype-hero-growth-backdrop";
import { PrototypeHeroMagneticCardsColumn } from "@/components/prototype-hero-magnetic-cards-column";
import { PrototypeHeroMobileCardsCarousel } from "@/components/prototype-hero-mobile-cards-carousel";
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
    <div className="flex min-h-[100dvh] flex-1 flex-col bg-zinc-50 [font-family:var(--font-plus-jakarta),system-ui,sans-serif]">
      <div className="flex shrink-0 flex-col">
        <PromotionBarV2 />
        <HeaderV1 speakToExpertCtaVariant="secondary" speakToExpertLabel="Let's Talk" />
      </div>

      <section
        className="relative flex min-h-0 flex-1 flex-col overflow-visible"
        aria-labelledby="prototype-1-hero-heading"
        style={{
          ...prototypeHeroStippleStyle,
          borderBottom: `1px solid ${NEUTRAL_GREY[200]}`,
        }}
      >
        <PrototypeHeroGrowthBackdrop />
        <div className="relative z-10 mx-auto flex w-full max-w-[1320px] flex-1 flex-col justify-center px-6 py-12 sm:py-16 lg:py-20">
          <div className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="min-w-0">
              <div className="-translate-y-[32px]">
              <h1
                id="prototype-1-hero-heading"
                className="text-[3rem] leading-[1.15] font-semibold tracking-[-0.02em] lg:text-[3.75rem] lg:leading-[1.12]"
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
              </div>

              <PrototypeHeroMobileCardsCarousel />
            </div>
            <PrototypeHeroMagneticCardsColumn />
          </div>
        </div>
      </section>
    </div>
  );
}
