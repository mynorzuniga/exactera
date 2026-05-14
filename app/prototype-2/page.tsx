import type { Metadata } from "next";

import { HeaderV1 } from "@/components/design-system-header-footer";
import { PrototypeHeroBand2ResourceCards } from "@/components/prototype-hero-band2-resource-cards";
import { PrototypeHeroCtaCluster } from "@/components/prototype-hero-cta-cluster";
import { PrototypeClientLogosStrip } from "@/components/prototype-client-logos-strip";
import { BRAND_NAVY, NEUTRAL_GREY } from "@/lib/design-system-color-tokens";

export const metadata: Metadata = {
  title: "Exactera · Prototype 2",
  description: "Interactive prototype 2 for Exactera.",
};

const heroBackgroundStyle = {
  backgroundImage: "url(/exacterabg.jpg)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
} as const;

export default function Prototype2Page() {
  return (
    <div className="flex min-h-full flex-1 flex-col [font-family:var(--font-plus-jakarta),system-ui,sans-serif]">
      <HeaderV1 headerChrome="glass-light" />

      <main className="flex min-h-0 flex-1 flex-col">
        {/* Hero: same background; two full-width bands stacked (not forced to viewport height). */}
        <section
          className="relative flex w-full flex-col bg-cover bg-center bg-no-repeat"
          style={heroBackgroundStyle}
          aria-labelledby="prototype-2-hero-heading"
        >
          {/* Band 1: full width — frosted copy (left) + video (right); row height from left; video fills cell on lg. */}
          <div className="relative z-10 grid w-full grid-cols-1 lg:grid-cols-2 lg:grid-rows-1">
            <div className="flex flex-col justify-center bg-white/22 py-12 pr-6 backdrop-blur-md backdrop-saturate-100 sm:py-16 lg:pr-12 lg:py-16 pl-[max(1.5rem,calc((100vw-1320px)/2+1.5rem))]">
              <h1
                id="prototype-2-hero-heading"
                className="max-w-xl text-[2.25rem] leading-[1.2] font-semibold tracking-[-0.02em]"
                style={{ color: BRAND_NAVY[900] }}
              >
                <span className="block sm:whitespace-nowrap">
                  Transform Your Tax Strategy.
                </span>
                <span className="block">Inform Growth.</span>
              </h1>
              <p
                className="mt-6 max-w-xl text-[1rem] leading-[1.6] font-normal"
                style={{ color: NEUTRAL_GREY[700] }}
              >
                Combine AI-powered tax services with expert guidance to manage risk, unlock
                incentives, and turn tax into a strategic asset across your corporate tax
                lifecycle.
              </p>

              <PrototypeHeroCtaCluster />
            </div>

            <div className="relative flex min-h-[14rem] w-full min-w-0 self-stretch lg:h-full lg:min-h-0">
              <video
                className="h-full w-full object-cover"
                controls
                playsInline
                preload="metadata"
                aria-label="Exactera overview video"
              >
                <source src="/Exactera-Overview-1.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Band 2: resource cards on exacterabg. */}
          <div className="relative z-10 w-full py-14 sm:py-16">
            <PrototypeHeroBand2ResourceCards />
          </div>
        </section>

        <PrototypeClientLogosStrip />
      </main>
    </div>
  );
}
