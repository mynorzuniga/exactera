"use client";

import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";

import { BRAND_MINT, BRAND_NAVY } from "@/lib/design-system-color-tokens";

/**
 * Prototype 1 hero only: interactive “bar wave” backdrop (pointer-driven height +
 * mint/navy color-mix), adapted from vertical-bar wave reference; tokens only from
 * `BRAND_NAVY` / `BRAND_MINT`.
 */

const NUM_BARS = 50;
const WAVE_SPREAD_MOUSE = 0.15;
const WAVE_SPREAD_TOUCH = 0.2;

/** Baseline “hill”: left edge % height + curve to right; larger range = taller on the right at idle. */
const BASELINE_HEIGHT_LEFT_PCT = 8;
const BASELINE_HEIGHT_RIGHT_RANGE_PCT = 52;

/** Idle gradient: deep → light navy (300 → 50 ramp). */
const WAVE_NAVY_DEEP = BRAND_NAVY[300];
const WAVE_NAVY_LIGHT = BRAND_NAVY[50];

/** Wave peak mixes toward mint (300 / 200). */
const WAVE_MINT_DEEP = BRAND_MINT[300];
const WAVE_MINT_LIGHT = BRAND_MINT[200];

const IDLE_GRADIENT = `linear-gradient(to top, ${WAVE_NAVY_DEEP}, ${WAVE_NAVY_LIGHT})`;

function hexToRgb(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

const navyDeepRgb = hexToRgb(WAVE_NAVY_DEEP);
const mintDeepRgb = hexToRgb(WAVE_MINT_DEEP);

const IDLE_SHADOW = `0 0 15px rgba(${navyDeepRgb.r},${navyDeepRgb.g},${navyDeepRgb.b},0.4)`;

function mixGradient(mixPercent: number) {
  return `linear-gradient(to top, color-mix(in srgb, ${WAVE_MINT_DEEP} ${mixPercent}%, ${WAVE_NAVY_DEEP}), color-mix(in srgb, ${WAVE_MINT_LIGHT} ${mixPercent}%, ${WAVE_NAVY_LIGHT}))`;
}

function resetBars(
  bars: readonly (HTMLDivElement | null)[],
  baseHeights: readonly number[],
) {
  for (let i = 0; i < bars.length; i++) {
    const bar = bars[i];
    if (!bar) continue;
    bar.style.height = `${baseHeights[i]!}%`;
    bar.style.background = IDLE_GRADIENT;
    bar.style.boxShadow = IDLE_SHADOW;
  }
}

function paintWave(
  normalizedX: number,
  bars: readonly (HTMLDivElement | null)[],
  baseHeights: readonly number[],
  waveSpread: number,
) {
  const dynamicMaxHeight = 10 + normalizedX * 50;
  const numBars = bars.length;

  for (let index = 0; index < numBars; index++) {
    const bar = bars[index];
    if (!bar) continue;

    const barPosition = (index + 0.5) / numBars;
    const distance = Math.abs(normalizedX - barPosition);
    let newHeight = baseHeights[index]!;
    let mixIntensity = 0;

    if (distance < waveSpread) {
      const cosValue = Math.cos((distance / waveSpread) * (Math.PI / 2));
      const boost = cosValue * dynamicMaxHeight;
      newHeight += boost;
      mixIntensity = cosValue;
    }

    bar.style.height = `${newHeight}%`;
    const mixPercent = mixIntensity * 100;
    bar.style.background = mixGradient(mixPercent);

    if (mixIntensity > 0) {
      const glowStrength = mixIntensity * 0.8;
      bar.style.boxShadow = `0 0 ${15 + mixIntensity * 20}px rgba(${mintDeepRgb.r},${mintDeepRgb.g},${mintDeepRgb.b},${glowStrength})`;
    } else {
      bar.style.boxShadow = IDLE_SHADOW;
    }
  }
}

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
}

export function PrototypeHeroGrowthBackdrop() {
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  const baseHeights = useMemo(
    () =>
      Array.from({ length: NUM_BARS }, (_, i) => {
        const progress = i / (NUM_BARS - 1);
        return BASELINE_HEIGHT_LEFT_PCT + progress ** 1.5 * BASELINE_HEIGHT_RIGHT_RANGE_PCT;
      }),
    [],
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      const normalizedMouseX = e.clientX / window.innerWidth;
      paintWave(normalizedMouseX, barRefs.current, baseHeights, WAVE_SPREAD_MOUSE);
    };

    const onMouseLeave = () => {
      resetBars(barRefs.current, baseHeights);
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      const normalizedTouchX = touch.clientX / window.innerWidth;
      paintWave(normalizedTouchX, barRefs.current, baseHeights, WAVE_SPREAD_TOUCH);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("touchmove", onTouchMove);
    };
  }, [baseHeights, prefersReducedMotion]);

  const heightTransition = prefersReducedMotion ? "none" : "height 0.1s ease-out";

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-end justify-around overflow-hidden"
      aria-hidden
    >
      {baseHeights.map((baseHeight, i) => (
        <div
          key={i}
          ref={(el) => {
            barRefs.current[i] = el;
          }}
          className="[mask-image:linear-gradient(to_bottom,transparent_0%,black_50%,black_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_50%,black_100%)] w-[1.5%] origin-bottom"
          style={{
            height: `${baseHeight}%`,
            background: IDLE_GRADIENT,
            transition: heightTransition,
            boxShadow: IDLE_SHADOW,
            transformOrigin: "bottom center",
          }}
        />
      ))}
    </div>
  );
}
