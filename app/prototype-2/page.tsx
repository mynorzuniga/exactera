import type { Metadata } from "next";

import { HeaderV1 } from "@/components/design-system-header-footer";
import { PrototypeHeroBand2ResourceCards } from "@/components/prototype-hero-band2-resource-cards";
import { PrototypeHeroCtaCluster } from "@/components/prototype-hero-cta-cluster";
import { NEUTRAL_GREY } from "@/lib/design-system-color-tokens";

export const metadata: Metadata = {
  title: "Exactera · Prototype 2",
  description: "Interactive prototype 2 for Exactera.",
};

/** Base white (`system.md` foundations). */
const BASE_WHITE = "#ffffff";

export default function Prototype2Page() {
  return (
    <div className="flex min-h-[100dvh] flex-1 flex-col [font-family:var(--font-plus-jakarta),system-ui,sans-serif]">
      <main className="flex min-h-0 flex-1 flex-col">
        <section
          className="relative flex min-h-[100dvh] flex-col overflow-x-hidden overflow-y-visible"
          aria-labelledby="prototype-2-hero-heading"
        >
          <video
            className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden
          >
            <source src="/video1.mp4" type="video/mp4" />
          </video>
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-black/50"
            aria-hidden
          />
          <div className="relative z-10 flex min-h-0 flex-1 flex-col">
            <HeaderV1
              headerChrome="glass-clear"
              speakToExpertCtaVariant="tertiary"
              speakToExpertLabel="Let's Talk"
            />
            <div className="relative z-[2] flex min-h-0 flex-1 flex-col">
              <div className="mx-auto w-full max-w-[1320px] px-6 pb-8 pt-16 sm:pb-10 sm:pt-20 lg:pb-12 lg:pt-24">
                <div className="w-full max-w-full lg:max-w-[60%]">
                  <h1
                    id="prototype-2-hero-heading"
                    className="prototype-hero-reveal text-[3rem] leading-[1.15] font-semibold tracking-[-0.02em]"
                    style={{ color: BASE_WHITE }}
                  >
                    Transform Your Tax Strategy.
                    Inform Growth.
                  </h1>
                  <p
                    className="prototype-hero-reveal prototype-hero-reveal-delay-1 mt-6 text-[1rem] leading-[1.6] font-normal"
                    style={{ color: NEUTRAL_GREY[200] }}
                  >
                    Combine AI-powered tax services with expert guidance to manage risk, unlock
                    incentives, and turn tax into a strategic asset across your corporate tax
                    lifecycle.
                  </p>

                  <div className="prototype-hero-reveal prototype-hero-reveal-delay-2">
                    <PrototypeHeroCtaCluster primaryNoGlow />
                  </div>
                </div>
              </div>

              <div className="relative mt-12 shrink-0 pb-14 sm:mt-14 sm:pb-16 lg:mt-16">
                <PrototypeHeroBand2ResourceCards />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
