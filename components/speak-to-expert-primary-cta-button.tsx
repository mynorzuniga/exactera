"use client";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import {
  DS_CTA_HOVER_TRANSITION_CLASS,
  DS_PRIMARY_CTA_TRAILING_ICON_WRAP_CLASS,
  primaryCtaSurfaceStyle,
  secondaryCtaSurfaceStyle,
  tertiaryHeaderCtaSurfaceStyle,
} from "@/lib/ds-cta-interaction";

const BASE_CLASS_SHARED =
  `group inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[0.5rem] border-0 font-bold text-white focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 ${DS_CTA_HOVER_TRANSITION_CLASS}`.trim();

/** Default height / type scale per header + hero specimens. */
const SIZE_DEFAULT = `h-[3.25rem] px-6 text-[1.125rem] leading-[1.6]`;

/** Narrower footprint for stacked marketing bands (still primary mint + trailing arrow). */
const SIZE_COMPACT = `h-10 px-5 text-[1rem] leading-[1.55]`;

const SECONDARY_BASE_CLASS =
  `group inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[0.5rem] border border-solid font-bold focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 ${DS_CTA_HOVER_TRANSITION_CLASS}`.trim();

/** Primary DS CTA with optional label (default Speak to an Expert). Matches `design-system-cta-buttons` primary + hover. */
export function SpeakToExpertPrimaryCtaButton({
  className = "",
  label = "Speak to an Expert",
  compact = false,
  noGlow = false,
}: {
  className?: string;
  /** e.g. `Let's Talk` in marketing footers */
  label?: string;
  /** Shorter hit target and Body default type — use on denser bands. */
  compact?: boolean;
  /** Drops mint halo (`primaryCtaSurfaceStyle` glow) — same surface + hover gradient. */
  noGlow?: boolean;
}) {
  const [hover, setHover] = useState(false);
  const sizeClass = compact ? SIZE_COMPACT : SIZE_DEFAULT;

  return (
    <button
      type="button"
      className={`${BASE_CLASS_SHARED} ${sizeClass} ${className}`.trim()}
      style={{
        ...primaryCtaSurfaceStyle(hover),
        ...(noGlow ? { boxShadow: "none" } : {}),
      }}
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

/** Secondary DS CTA — navy fill + border — same layout as primary (Body Big + trailing arrow). */
export function SpeakToExpertSecondaryCtaButton({
  className = "",
  label = "Speak to an Expert",
  compact = false,
}: {
  className?: string;
  label?: string;
  compact?: boolean;
}) {
  const [hover, setHover] = useState(false);
  const sizeClass = compact ? SIZE_COMPACT : SIZE_DEFAULT;

  return (
    <button
      type="button"
      className={`${SECONDARY_BASE_CLASS} ${sizeClass} ${className}`.trim()}
      style={secondaryCtaSurfaceStyle(hover)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {label}
      <span className={DS_PRIMARY_CTA_TRAILING_ICON_WRAP_CLASS}>
        <ArrowRightIcon aria-hidden />
      </span>
    </button>
  );
}

/** Tertiary-style header CTA — DS tertiary fill (`rgba` white 10%); border + label + arrow **brand navy 200**. */
export function SpeakToExpertTertiaryCtaButton({
  className = "",
  label = "Speak to an Expert",
  compact = false,
}: {
  className?: string;
  label?: string;
  compact?: boolean;
}) {
  const [hover, setHover] = useState(false);
  const sizeClass = compact ? SIZE_COMPACT : SIZE_DEFAULT;

  return (
    <button
      type="button"
      className={`${SECONDARY_BASE_CLASS} ${sizeClass} ${className}`.trim()}
      style={tertiaryHeaderCtaSurfaceStyle(hover)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {label}
      <span className={DS_PRIMARY_CTA_TRAILING_ICON_WRAP_CLASS}>
        <ArrowRightIcon aria-hidden />
      </span>
    </button>
  );
}
