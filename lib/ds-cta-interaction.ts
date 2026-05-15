import type { CSSProperties } from "react";

import { BRAND_MINT, BRAND_NAVY } from "@/lib/design-system-color-tokens";

/** Use on primary / secondary CTAs for hover color transitions (see `design-system-cta-buttons.tsx`). */
export const DS_CTA_HOVER_TRANSITION_CLASS =
  "transition-[background-color,background-image,box-shadow,border-color] duration-200 ease-out";

/** Wrapper for primary trailing Heroicon: nudge right + stroke 1.5 → 2.5 on hover/focus-within. */
export const DS_PRIMARY_CTA_TRAILING_ICON_WRAP_CLASS =
  "inline-flex shrink-0 text-current transition-transform duration-300 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1 [&_svg]:h-[1.125em] [&_svg]:w-[1.125em] [&_svg]:stroke-[1.5] [&_svg]:transition-[stroke-width] [&_svg]:duration-200 [&_svg]:ease-out group-hover:[&_svg]:stroke-[2.5] group-focus-visible:[&_svg]:stroke-[2.5]";

const PRIMARY_CTA_GLOW_SHADOW = `0 2px 10px 0 ${BRAND_MINT[300]}`;

/**
 * Primary CTA surface: **idle** = solid **mint 600** + tight mint glow; **hover** = same glow plus
 * vertical gradient **mint 500** (top) → **mint 600** (bottom). Arrow motion is CSS (`group`).
 */
export function primaryCtaSurfaceStyle(hover: boolean): CSSProperties {
  return {
    backgroundColor: BRAND_MINT[600],
    backgroundImage: hover
      ? `linear-gradient(180deg, ${BRAND_MINT[500]} 0%, ${BRAND_MINT[600]} 100%)`
      : "none",
    boxShadow: PRIMARY_CTA_GLOW_SHADOW,
  };
}

export function secondaryCtaSurfaceStyle(hover: boolean): CSSProperties {
  return {
    backgroundColor: hover ? BRAND_NAVY[100] : BRAND_NAVY[50],
    borderColor: hover ? BRAND_NAVY[800] : BRAND_NAVY[900],
    color: BRAND_NAVY[900],
  };
}

/** DS tertiary idle fill — white `#ffffff` at 10% (`design-system-cta-buttons.tsx`). */
const TERTIARY_CTA_FILL_IDLE = "rgba(255, 255, 255, 0.1)";
/** Slightly stronger fill on hover. */
const TERTIARY_CTA_FILL_HOVER = "rgba(255, 255, 255, 0.14)";

/**
 * Header tertiary on glass / dark imagery: tertiary-style translucent fill + **brand navy 200**
 * border and label (full-opacity hex from ramp).
 */
export function tertiaryHeaderCtaSurfaceStyle(hover: boolean): CSSProperties {
  return {
    backgroundColor: hover ? TERTIARY_CTA_FILL_HOVER : TERTIARY_CTA_FILL_IDLE,
    borderColor: BRAND_NAVY[200],
    color: BRAND_NAVY[200],
  };
}
