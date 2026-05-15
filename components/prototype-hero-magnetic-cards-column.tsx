"use client";

import { useEffect, useRef, useState } from "react";

import { PrototypeHeroSeeHowCard } from "@/components/prototype-hero-see-how-card";
import { PrototypeHeroYoutubePreviewCard } from "@/components/prototype-hero-youtube-preview-card";

/** Max drift toward cursor (px); scales direction vector before saturating softly with tanh. */
const MAX_PULL_PX = 7;
/**
 * Higher → reaches ~max pull at shorter cursor distances. Uses `tanh` so motion stays subtle and
 * **both axes keep responding** when the pointer sits far left (linear clamp pinned X while Y moved).
 */
const DIST_SENSITIVITY = 0.0045;

function magneticOffset(px: number, py: number, cx: number, cy: number): { x: number; y: number } {
  const dx = px - cx;
  const dy = py - cy;
  const dist = Math.hypot(dx, dy);
  if (dist < 0.5) {
    return { x: 0, y: 0 };
  }
  const nx = dx / dist;
  const ny = dy / dist;
  const mag = MAX_PULL_PX * Math.tanh(dist * DIST_SENSITIVITY);
  return { x: nx * mag, y: ny * mag };
}

const zeroOffsets = (): { x: number; y: number }[] => [
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
];

/**
 * Prototype 1 hero — desktop (`lg+`) column of three preview cards with a light magnetic drift
 * toward the viewport pointer (`pointermove` on `window`). Listener only attaches at `lg+`;
 * `prefers-reduced-motion`: disabled.
 *
 * Layout matches `app/prototype-1/page.tsx` before extraction (nudges: column **20px** up, See How **12px** left).
 */
export function PrototypeHeroMagneticCardsColumn() {
  const measureRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const [offsets, setOffsets] = useState<{ x: number; y: number }[]>(zeroOffsets);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      return;
    }

    const lg = window.matchMedia("(min-width: 1024px)");

    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = window.requestAnimationFrame(() => {
        const px = e.clientX;
        const py = e.clientY;
        const next = measureRefs.current.map((el) => {
          if (!el) {
            return { x: 0, y: 0 };
          }
          const r = el.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          return magneticOffset(px, py, cx, cy);
        });
        setOffsets(next);
      });
    };

    const syncPointerListener = () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(rafRef.current);
      if (lg.matches) {
        window.addEventListener("pointermove", onMove, { passive: true });
      } else {
        setOffsets(zeroOffsets());
      }
    };

    syncPointerListener();
    lg.addEventListener("change", syncPointerListener);

    return () => {
      lg.removeEventListener("change", syncPointerListener);
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const bindMeasure = (index: number) => (el: HTMLDivElement | null) => {
    measureRefs.current[index] = el;
  };

  return (
    <div className="relative mx-auto hidden w-full min-w-0 -translate-y-[40px] flex-col items-center overflow-visible lg:flex">
      {/* Main card centered; z-20 by default so it sits above side cards; hover/focus raises to z-40 */}
      <div
        ref={bindMeasure(0)}
        className="relative z-20 flex w-full -translate-x-[12px] justify-center opacity-70 transition-opacity duration-200 ease-out hover:z-40 hover:opacity-100 focus-within:z-40 focus-within:opacity-100"
      >
        <div
          className="will-change-transform"
          style={{
            transform: `translate3d(${offsets[0].x}px, ${offsets[0].y}px, 0)`,
          }}
        >
          <PrototypeHeroSeeHowCard />
        </div>
      </div>

      <div className="relative mt-8 flex w-full min-w-0 justify-center overflow-visible sm:mt-10">
        <div className="flex w-[min(21rem,calc(100%+1rem))] max-w-[calc(100vw-2.5rem)] justify-between gap-0 sm:w-[30rem]">
          <div
            ref={bindMeasure(1)}
            className="relative z-10 shrink-0 translate-y-4 opacity-70 transition-opacity duration-200 ease-out hover:z-40 hover:opacity-100 focus-within:z-40 focus-within:opacity-100 sm:translate-y-6"
          >
            <div
              className="will-change-transform"
              style={{
                transform: `translate3d(${offsets[1].x}px, ${offsets[1].y}px, 0)`,
              }}
            >
              <PrototypeHeroYoutubePreviewCard
                previewSrc="/preview1.png"
                label="Exactmatch is Here"
                modalTitle="Exactera's Exactmatch is Here"
                youtubeEmbedBaseUrl="https://www.youtube.com/embed/VRMaHcj7CL8"
                size="large"
              />
            </div>
          </div>

          <div
            ref={bindMeasure(2)}
            className="relative z-10 shrink-0 -mt-[50px] translate-x-[calc(3rem-20px)] self-start opacity-70 transition-opacity duration-200 ease-out hover:z-40 hover:opacity-100 focus-within:z-40 focus-within:opacity-100 sm:-mt-[66px] sm:translate-x-[calc(7rem-20px)]"
          >
            <div
              className="will-change-transform"
              style={{
                transform: `translate3d(${offsets[2].x}px, ${offsets[2].y}px, 0)`,
              }}
            >
              <PrototypeHeroYoutubePreviewCard
                previewSrc="/preview2.png"
                label="Transfer Pricing"
                modalTitle="Transfer Pricing Overview"
                youtubeEmbedBaseUrl="https://www.youtube.com/embed/eHfE4S9a14w"
                size="large"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
