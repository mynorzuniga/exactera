"use client";

import { useEffect, useRef } from "react";

const DEFAULT_LEAD_SEC = 1.05;
const DEFAULT_TRAIL_SEC = 0.95;

/** Ken Perlin “smootherstep”: flat ends vs linear fades; multiplier eases softly toward 0 and 1. */
function smootherstep01(x: number): number {
  const t = Math.max(0, Math.min(1, x));
  return t * t * t * (t * (t * 6 - 15) + 10);
}

/** Base black (`system.md`): solid fill — **`opacity`** scales strength (no **`backdrop-filter`**). */
const SPLICE_DIM_OVERLAY_CLASSES =
  "pointer-events-none absolute inset-0 z-[1] bg-black";

export type PrototypeHeroLoopGlassBridgeProps = {
  src: string;
  mp4Type?: string;
  /** Seconds before **`duration`** where dim ramps **0 → max** (before loop splice). */
  fadeLeadSeconds?: number;
  /** Seconds after loop start where dim ramps **max → 0**. */
  fadeTrailSeconds?: number;
  /** Peak dim strength **`0…1`** (multiplies **`opacity`** of **`bg-black`**). Default ~**`0.5`** (= ~**50%** at crest). */
  peakDimStrength?: number;
};

/**
 * Looped hero video plus a **lightweight dark splice veil** only (**`backdrop-filter`** removed for
 * performance). **`peakDimStrength`** × **`smootherstep`** ramps **`opacity`** on a **`bg-black`** layer —
 * hides the seam without glass blur workload.
 *
 * **`requestAnimationFrame`** updates **`opacity`** on the overlay **ref** (no **`setState`**).
 * **`prefers-reduced-motion: reduce`**: overlay stays **`0`** (**`loop`** kept).
 */
export function PrototypeHeroLoopGlassBridge({
  src,
  mp4Type = "video/mp4",
  fadeLeadSeconds = DEFAULT_LEAD_SEC,
  fadeTrailSeconds = DEFAULT_TRAIL_SEC,
  peakDimStrength = 0.5,
}: PrototypeHeroLoopGlassBridgeProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tick = () => {
      const v = videoRef.current;
      const el = dimRef.current;

      if (el && !reduceMotion && v && document.visibilityState === "visible") {
        const d = v.duration;
        const t = v.currentTime;

        let curve = 0;

        if (typeof d === "number" && Number.isFinite(d) && d > 0.06) {
          const halfBudget = Math.max(0.04, (d / 2) * 0.92);
          const lead = Math.min(fadeLeadSeconds, halfBudget);
          const trail = Math.min(fadeTrailSeconds, halfBudget);

          if (t >= d - lead) {
            const u = (t - (d - lead)) / Math.max(lead, 1e-6);
            curve = smootherstep01(u);
          } else if (t <= trail) {
            const u = t / Math.max(trail, 1e-6);
            curve = 1 - smootherstep01(u);
          }

          curve = Math.max(0, Math.min(1, curve));
        }

        el.style.opacity = `${curve * peakDimStrength}`;
      } else if (el) {
        el.style.opacity = "0";
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [fadeLeadSeconds, fadeTrailSeconds, peakDimStrength]);

  return (
    <>
      <video
        ref={videoRef}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden
      >
        <source src={src} type={mp4Type} />
      </video>
      <div
        ref={dimRef}
        className={SPLICE_DIM_OVERLAY_CLASSES}
        style={{ opacity: 0 }}
        aria-hidden
      />
    </>
  );
}
