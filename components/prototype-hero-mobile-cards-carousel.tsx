"use client";

import { PrototypeHeroSeeHowCard } from "@/components/prototype-hero-see-how-card";
import {
  PrototypeHeroVideoPreviewCard,
  PROTOTYPE_HERO_EXACTMATCH_VIDEO,
  PROTOTYPE_HERO_TRANSFER_PRICING_VIDEO,
} from "@/components/prototype-hero-video-preview-card";

const SLIDE_WIDTH_CLASS =
  "w-[min(17.5rem,calc(100vw-3rem))] max-w-[min(17.5rem,calc(100vw-3rem))] shrink-0 snap-center snap-always";

/** Prototype 1 — viewports below `lg`: equal-width hero preview tiles in a horizontal snap carousel below CTAs. */
export function PrototypeHeroMobileCardsCarousel() {
  return (
    <div
      className="mt-10 lg:hidden"
      role="region"
      aria-label="Product videos and previews"
    >
      <div
        className="-mx-6 flex gap-4 overflow-x-auto scroll-smooth px-6 pb-2 snap-x snap-mandatory motion-reduce:scroll-auto [scrollbar-width:thin]"
      >
        <div className={SLIDE_WIDTH_CLASS}>
          <PrototypeHeroSeeHowCard className="max-w-none w-full" />
        </div>
        <div className={SLIDE_WIDTH_CLASS}>
          <PrototypeHeroVideoPreviewCard
            className="mx-auto w-full"
            uniformTile
            compact
            videoSrc={PROTOTYPE_HERO_EXACTMATCH_VIDEO}
            label="Exactmatch is Here"
            modalTitle="Exactera's Exactmatch is Here"
          />
        </div>
        <div className={SLIDE_WIDTH_CLASS}>
          <PrototypeHeroVideoPreviewCard
            className="mx-auto w-full"
            uniformTile
            compact
            videoSrc={PROTOTYPE_HERO_TRANSFER_PRICING_VIDEO}
            label="Transfer Pricing"
            modalTitle="Transfer Pricing Overview"
          />
        </div>
      </div>
    </div>
  );
}
