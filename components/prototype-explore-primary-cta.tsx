"use client";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import {
  DS_CTA_HOVER_TRANSITION_CLASS,
  DS_PRIMARY_CTA_TRAILING_ICON_WRAP_CLASS,
  primaryCtaSurfaceStyle,
} from "@/lib/ds-cta-interaction";

export const PROTOTYPE_PRODUCT_NAME_CLASS =
  "text-[1.5rem] leading-[1.3] font-semibold tracking-[-0.01em] sm:text-[1.875rem] sm:leading-[1.22] sm:tracking-[-0.015em]";

const CTA_BUTTON_CLASS =
  `group mt-8 inline-flex h-[3.25rem] w-fit shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[0.5rem] border-0 px-6 text-[1.125rem] leading-[1.6] font-bold text-white focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 ${DS_CTA_HOVER_TRANSITION_CLASS}`.trim();

/** Primary explore CTA with trailing arrow — card footers on prototype consultant/corporate sections. */
export function PrototypeExplorePrimaryCta({ label }: { label: string }) {
  const [hover, setHover] = useState(false);

  return (
    <button
      type="button"
      className={CTA_BUTTON_CLASS}
      style={primaryCtaSurfaceStyle(hover)}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      {label}
      <span className={DS_PRIMARY_CTA_TRAILING_ICON_WRAP_CLASS}>
        <ArrowRightIcon aria-hidden />
      </span>
    </button>
  );
}
