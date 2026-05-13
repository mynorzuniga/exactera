import type { CSSProperties } from "react";

import { BRAND_MINT, NEUTRAL_GREY } from "@/lib/design-system-color-tokens";

export function prototypeHeroPreviewCardShadow(hover: boolean): CSSProperties {
  return {
    boxShadow: hover
      ? `0 8px 40px 0 ${BRAND_MINT[300]}, 0 0 0 1px ${BRAND_MINT[200]}`
      : `0 2px 14px 0 rgba(0, 0, 0, 0.07), 0 0 0 1px ${NEUTRAL_GREY[200]}`,
  };
}
