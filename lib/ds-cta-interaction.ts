import type { CSSProperties } from "react";

import { BRAND_MINT, BRAND_NAVY } from "@/lib/design-system-color-tokens";

/** Use on primary / secondary CTAs for hover color transitions (see `design-system-cta-buttons.tsx`). */
export const DS_CTA_HOVER_TRANSITION_CLASS =
  "transition-[background-color,box-shadow,border-color] duration-200 ease-out";

export function primaryCtaSurfaceStyle(hover: boolean): CSSProperties {
  return {
    backgroundColor: hover ? BRAND_MINT[700] : BRAND_MINT[600],
    boxShadow: hover
      ? `0 6px 36px 0 ${BRAND_MINT[400]}`
      : `0 4px 28px 0 ${BRAND_MINT[300]}`,
  };
}

export function secondaryCtaSurfaceStyle(hover: boolean): CSSProperties {
  return {
    backgroundColor: hover ? BRAND_NAVY[100] : BRAND_NAVY[50],
    borderColor: hover ? BRAND_NAVY[800] : BRAND_NAVY[900],
    color: BRAND_NAVY[900],
  };
}
