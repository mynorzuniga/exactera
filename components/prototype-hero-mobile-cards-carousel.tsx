"use client";

import { PrototypeHeroSeeHowCard } from "@/components/prototype-hero-see-how-card";
import { PrototypeHeroYoutubePreviewCard } from "@/components/prototype-hero-youtube-preview-card";

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
          <PrototypeHeroYoutubePreviewCard
            className="max-w-none w-full"
            uniformTile
            previewSrc="/preview1.png"
            label="Exactmatch is Here"
            modalTitle="Exactera's Exactmatch is Here"
            youtubeEmbedBaseUrl="https://www.youtube.com/embed/VRMaHcj7CL8"
          />
        </div>
        <div className={SLIDE_WIDTH_CLASS}>
          <PrototypeHeroYoutubePreviewCard
            className="max-w-none w-full"
            uniformTile
            previewSrc="/preview2.png"
            label="Transfer Pricing"
            modalTitle="Transfer Pricing Overview"
            youtubeEmbedBaseUrl="https://www.youtube.com/embed/eHfE4S9a14w"
          />
        </div>
      </div>
    </div>
  );
}
