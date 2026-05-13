"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  BRAND_MINT,
  BRAND_NAVY,
  GREEN,
  NEUTRAL_GREY,
  RED,
  SHADE_STEPS,
  YELLOW,
} from "@/lib/design-system-color-tokens";

export {
  BRAND_MINT,
  BRAND_NAVY,
  GREEN,
  NEUTRAL_GREY,
  RED,
  SHADE_STEPS,
} from "@/lib/design-system-color-tokens";

type ShadeStep = (typeof SHADE_STEPS)[number];

type PaletteRow = {
  name: string;
  colors: Record<ShadeStep, string>;
  /** Brand palettes: step that matches the seed hex used to build the ramp. */
  anchorStep?: ShadeStep;
};

function AnchorStarBadge() {
  return (
    <span
      className="pointer-events-none absolute top-1 right-1 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 shadow-sm ring-1 ring-zinc-900/15"
      title="Brand base"
    >
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-amber-500" aria-hidden>
        <path
          fillRule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.082 3.06 1.43 5.052c.303 1.065-1.12 1.857-2.006 1.147L12 18.527l-4.967 3.167c-.886.71-2.308-.082-2.006-1.147l1.43-5.052-4.082-3.06c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
}

const PALETTES: PaletteRow[] = [
  { name: "Grey", colors: NEUTRAL_GREY },
  { name: "Green", colors: GREEN },
  { name: "Yellow", colors: YELLOW },
  { name: "Red", colors: RED },
  { name: "Brand mint", colors: BRAND_MINT, anchorStep: 500 },
  { name: "Brand navy", colors: BRAND_NAVY, anchorStep: 900 },
];

const BASE_SWATCHES: { label: string; hex: string }[] = [
  { label: "White", hex: "#ffffff" },
  { label: "Black", hex: "#000000" },
];

type SwatchKey = `${string}:${string}`;

function swatchNeedsRing(hex: string): boolean {
  const n = hex.replace("#", "").toLowerCase();
  if (n === "ffffff" || n === "fafafa" || n === "f5f5f5") return true;
  if (n === "fffbeb" || n === "fef2f2" || n === "ecfdf5") return true;
  if (
    n === "f2fcf9" ||
    n === "dcf8ee" ||
    n === "b8f0dc" ||
    n === "f5f6fc" ||
    n === "ebedf8" ||
    n === "d8dbf0"
  )
    return true;
  return false;
}

export function DesignSystemColors() {
  const [copiedKey, setCopiedKey] = useState<SwatchKey | null>(null);
  const clearTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (clearTimer.current) clearTimeout(clearTimer.current);
    };
  }, []);

  const copyHex = useCallback(
    (key: SwatchKey, hex: string) => {
      void (async () => {
        try {
          await navigator.clipboard.writeText(hex);
        } catch {
          /* ignore */
        }
        if (clearTimer.current) clearTimeout(clearTimer.current);
        setCopiedKey(key);
        clearTimer.current = setTimeout(() => {
          setCopiedKey(null);
          clearTimer.current = null;
        }, 1500);
      })();
    },
    [],
  );

  return (
    <div className="space-y-12">
      <p className="sr-only" aria-live="polite">
        {copiedKey ? "Color copied to clipboard" : ""}
      </p>

      {PALETTES.map((palette) => (
        <section key={palette.name} aria-labelledby={`palette-${palette.name}`}>
          <h3
            id={`palette-${palette.name}`}
            className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500"
          >
            {palette.name}
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11">
            {SHADE_STEPS.map((step) => {
              const hex = palette.colors[step];
              const key: SwatchKey = `${palette.name}:${step}`;
              const showCopied = copiedKey === key;
              const isAnchor = palette.anchorStep === step;
              return (
                <button
                  key={step}
                  type="button"
                  onClick={() => copyHex(key, hex)}
                  className="group relative flex flex-col items-stretch gap-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50"
                  aria-label={
                    isAnchor ? `Copy ${hex}, brand base color` : `Copy ${hex}`
                  }
                >
                  {showCopied ? (
                    <span
                      className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 -translate-x-1/2 rounded-md bg-zinc-900 px-2 py-1 text-xs font-medium text-white shadow-md"
                      role="tooltip"
                    >
                      copied
                    </span>
                  ) : null}
                  <div
                    className={`relative aspect-square w-full rounded-lg ${
                      swatchNeedsRing(hex)
                        ? "ring-1 ring-inset ring-zinc-300"
                        : ""
                    }`}
                    style={{ backgroundColor: hex }}
                  >
                    {isAnchor ? <AnchorStarBadge /> : null}
                  </div>
                  <span className="font-mono text-[0.6875rem] font-medium uppercase text-zinc-600 tabular-nums">
                    {hex}
                  </span>
                  <span className="text-[0.625rem] font-medium text-zinc-400">
                    {step}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      ))}

      <section aria-labelledby="palette-base">
        <h3
          id="palette-base"
          className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500"
        >
          Base
        </h3>
        <div className="grid max-w-md grid-cols-2 gap-4 sm:max-w-lg">
          {BASE_SWATCHES.map(({ label, hex }) => {
            const key: SwatchKey = `base:${label}`;
            const showCopied = copiedKey === key;
            return (
              <button
                key={label}
                type="button"
                onClick={() => copyHex(key, hex)}
                className="group relative flex flex-col items-stretch gap-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50"
                aria-label={`Copy ${hex}`}
              >
                {showCopied ? (
                  <span
                    className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 -translate-x-1/2 rounded-md bg-zinc-900 px-2 py-1 text-xs font-medium text-white shadow-md"
                    role="tooltip"
                  >
                    copied
                  </span>
                ) : null}
                <div
                  className={`relative aspect-square w-full rounded-lg ${
                    swatchNeedsRing(hex) || hex === "#000000"
                      ? hex === "#000000"
                        ? "ring-1 ring-inset ring-zinc-700"
                        : "ring-1 ring-inset ring-zinc-300"
                      : ""
                  }`}
                  style={{ backgroundColor: hex }}
                />
                <span className="text-sm font-medium text-zinc-700">
                  {label}
                </span>
                <span className="font-mono text-[0.6875rem] font-medium uppercase text-zinc-600 tabular-nums">
                  {hex}
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
