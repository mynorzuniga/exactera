"use client";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { useId, useState } from "react";

import {
  DS_CTA_HOVER_TRANSITION_CLASS,
  primaryCtaSurfaceStyle,
  secondaryCtaSurfaceStyle,
} from "@/lib/ds-cta-interaction";

/**
 * CTA button specimens for the design system (Components → CTA tab).
 *
 * Element: `<button type="button">`.
 * Font: Plus Jakarta Sans — `font-family: var(--font-plus-jakarta)` (same as other DS specimens).
 *
 * Shared:
 * - Corner radius: `0.5rem`
 * - Font weight: bold (700)
 * - Line height: `1.6` (matches Body scale in `system.md`)
 * - Horizontal padding: **Standard** `1.5rem` (`px-6`); **Small** `1rem` (`px-4`)
 * - Heights: **Standard** `3.25rem`; **Small** `2rem`
 * - Typography: **Standard** = Body Big (`1.125rem`); **Small** = Body Standard (`1rem`)
 * - Optional **trailing icon** after the label (`gap-0.5rem`): pass any `ReactNode` (e.g. `@heroicons/react`).
 *   Specimens use **CtaTrailingIconArrowRight** as placeholder; swap the node to replace.
 * - Focus: `focus-visible` outline (2px, offset 2), zinc-900 outline color
 *
 * Variants (colors from `BRAND_MINT` / `BRAND_NAVY` in `lib/design-system-color-tokens.ts` except tertiary):
 *
 * | Variant   | Background           | Border                           | Text           | Other |
 * |-----------|----------------------|----------------------------------|----------------|-------|
 * | Primary   | Brand mint **600** idle; **700** + stronger glow (**mint 400**) on **hover** | None | White `#fff` | Idle glow `0 4px 28px` **mint 300** |
 * | Secondary | Brand navy **50** idle; **100** on **hover** | **900** idle; **800** hover | Brand navy 900 | **Hover** via `lib/ds-cta-interaction.ts` |
 * | Tertiary  | White `#fff` **10%** opacity | 1px solid black 70% opacity | Same as border | Black = base `#000000`; use on mid–light backgrounds |
 *
 * Hex values for brand ramps resolve through the exported constants; do not substitute ad hoc colors.
 */

/** Tertiary CTA border and label: black `#000000` at 70% opacity. */
export const CTA_TERTIARY_BORDER_TEXT = "rgba(0, 0, 0, 0.7)";

/** Tertiary CTA fill: white `#ffffff` at 10% opacity. */
export const CTA_TERTIARY_FILL = "rgba(255, 255, 255, 0.1)";

const LABEL = "Get started";

/** Default trailing icon for specimens; replace by passing a different node to `trailingIcon`. */
export function CtaTrailingIconArrowRight(
  props: Omit<ComponentProps<typeof ArrowRightIcon>, "ref">,
) {
  return <ArrowRightIcon aria-hidden {...props} />;
}

type CtaVariant = "primary" | "secondary" | "tertiary";

type CtaSize = "standard" | "small";

function CtaSpecimenButton({
  variant,
  size,
  trailingIcon,
}: {
  variant: CtaVariant;
  size: CtaSize;
  /** Right of label; typically a Heroicon (`h-[1.125em] w-[1.125em]`). Omit or `null` for text-only. */
  trailingIcon?: ReactNode;
}) {
  const [hover, setHover] = useState(false);
  const sizeClasses =
    size === "standard"
      ? "h-[3.25rem] px-6 text-[1.125rem]"
      : "h-[2rem] px-4 text-[1rem]";

  let borderClass = "border";
  let style: CSSProperties;
  let textClass = "";

  if (variant === "primary") {
    borderClass = "border-0";
    textClass = "text-white";
    style = primaryCtaSurfaceStyle(hover);
  } else if (variant === "secondary") {
    style = secondaryCtaSurfaceStyle(hover);
  } else {
    style = {
      backgroundColor: CTA_TERTIARY_FILL,
      borderColor: CTA_TERTIARY_BORDER_TEXT,
      color: CTA_TERTIARY_BORDER_TEXT,
    };
  }

  const content =
    trailingIcon != null ? (
      <span className="inline-flex items-center justify-center gap-2">
        {LABEL}
        <span className="inline-flex shrink-0 text-current [&_svg]:h-[1.125em] [&_svg]:w-[1.125em]">
          {trailingIcon}
        </span>
      </span>
    ) : (
      LABEL
    );

  const transitionClass =
    variant === "primary" || variant === "secondary"
      ? DS_CTA_HOVER_TRANSITION_CLASS
      : "";

  return (
    <button
      type="button"
      className={`inline-flex shrink-0 cursor-pointer items-center justify-center rounded-[0.5rem] leading-[1.6] font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 ${borderClass} ${sizeClasses} ${textClass} ${transitionClass}`.trim()}
      style={style}
      onMouseEnter={() => {
        if (variant === "primary" || variant === "secondary") {
          setHover(true);
        }
      }}
      onMouseLeave={() => {
        if (variant === "primary" || variant === "secondary") {
          setHover(false);
        }
      }}
    >
      {content}
    </button>
  );
}

const VARIANTS: CtaVariant[] = ["primary", "secondary", "tertiary"];

export function DesignSystemCtaButtons() {
  const [showIcon, setShowIcon] = useState(false);
  const iconToggleId = useId();

  const trailingIcon = showIcon ? (
    <CtaTrailingIconArrowRight />
  ) : null;

  return (
    <section
      className="space-y-6 [font-family:var(--font-plus-jakarta),system-ui,sans-serif]"
      aria-labelledby="cta-buttons-heading"
    >
      <div>
        <h3
          id="cta-buttons-heading"
          className="text-sm font-semibold tracking-wide text-zinc-500 uppercase"
        >
          Buttons
        </h3>
        <p className="mt-1 text-sm leading-6 text-zinc-600">
          Primary, secondary, and tertiary CTAs. Standard size is 3.25rem tall with Body
          Big and `px-6`; small is 2rem tall with Body Standard and tighter `px-4`. Bold labels, 0.5rem radius. Tertiary
          uses a white 10% fill with a black 70% border and label. Optional trailing icon
          (Heroicons placeholder); use the control below to preview.
        </p>

        <div className="mt-4 flex items-center gap-2">
          <input
            id={iconToggleId}
            type="checkbox"
            checked={showIcon}
            onChange={(e) => setShowIcon(e.target.checked)}
            className="h-4 w-4 cursor-pointer rounded border border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
          />
          <label
            htmlFor={iconToggleId}
            className="cursor-pointer text-sm font-medium text-zinc-800"
          >
            Icon
          </label>
        </div>
      </div>

      <div className="space-y-8">
        <div className="space-y-3">
          <p className="text-xs font-semibold tracking-wide text-zinc-500 uppercase">
            Standard — 3.25rem, Body Big
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {VARIANTS.map((v) => (
              <CtaSpecimenButton
                key={v}
                variant={v}
                size="standard"
                trailingIcon={trailingIcon}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold tracking-wide text-zinc-500 uppercase">
            Small — 2rem, Body Standard
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {VARIANTS.map((v) => (
              <CtaSpecimenButton
                key={v}
                variant={v}
                size="small"
                trailingIcon={trailingIcon}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
