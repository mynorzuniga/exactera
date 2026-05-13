"use client";

import { ArrowsRightLeftIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import type { ReactNode } from "react";
import { useState } from "react";

import {
  DS_CTA_HOVER_TRANSITION_CLASS,
  secondaryCtaSurfaceStyle,
} from "@/lib/ds-cta-interaction";
import { SpeakToExpertPrimaryCtaButton } from "@/components/speak-to-expert-primary-cta-button";

function HeroSecondarySmallCta({
  children,
  leadingIcon,
}: {
  children: ReactNode;
  leadingIcon: ReactNode;
}) {
  const [hover, setHover] = useState(false);

  return (
    <button
      type="button"
      className={`inline-flex h-[2rem] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[0.5rem] border border-solid px-4 text-[1rem] leading-[1.6] font-bold focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 ${DS_CTA_HOVER_TRANSITION_CLASS}`}
      style={secondaryCtaSurfaceStyle(hover)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span className="inline-flex shrink-0 text-current [&_svg]:h-[1.125em] [&_svg]:w-[1.125em]">
        {leadingIcon}
      </span>
      {children}
    </button>
  );
}

/** Prototype 1 hero CTAs — same tokens and hover as design-system specimens. */
export function PrototypeHeroCtaCluster() {
  return (
    <div className="mt-8 flex max-w-full flex-col items-start gap-10">
      <SpeakToExpertPrimaryCtaButton />

      <div className="flex flex-wrap gap-3">
        <HeroSecondarySmallCta leadingIcon={<ArrowsRightLeftIcon aria-hidden />}>
          Transfer Pricing
        </HeroSecondarySmallCta>
        <HeroSecondarySmallCta leadingIcon={<GlobeAltIcon aria-hidden />}>
          R&D Tax Credits
        </HeroSecondarySmallCta>
      </div>
    </div>
  );
}
