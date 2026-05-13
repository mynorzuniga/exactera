"use client";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import {
  DS_CTA_HOVER_TRANSITION_CLASS,
  primaryCtaSurfaceStyle,
} from "@/lib/ds-cta-interaction";

const BASE_CLASS =
  "inline-flex h-[3.25rem] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[0.5rem] border-0 px-6 text-[1.125rem] leading-[1.6] font-bold text-white focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900";

/** Primary “Speak to an Expert” CTA — matches `design-system-cta-buttons` primary + hover. */
export function SpeakToExpertPrimaryCtaButton({ className = "" }: { className?: string }) {
  const [hover, setHover] = useState(false);

  return (
    <button
      type="button"
      className={`${BASE_CLASS} ${DS_CTA_HOVER_TRANSITION_CLASS} ${className}`.trim()}
      style={primaryCtaSurfaceStyle(hover)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      Speak to an Expert
      <span className="inline-flex shrink-0 text-current [&_svg]:h-[1.125em] [&_svg]:w-[1.125em]">
        <ArrowRightIcon aria-hidden />
      </span>
    </button>
  );
}
