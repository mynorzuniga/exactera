"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { BRAND_MINT, BRAND_NAVY, NEUTRAL_GREY } from "@/lib/design-system-color-tokens";
import { prototypeHeroPreviewCardShadow } from "@/lib/prototype-hero-preview-card-surface";
import { DS_CTA_HOVER_TRANSITION_CLASS } from "@/lib/ds-cta-interaction";

/** `/public/videoplayback 2.mp4` — URL-safe for spaces. */
export const PROTOTYPE_HERO_EXACTMATCH_VIDEO = `/${encodeURIComponent("videoplayback 2.mp4")}`;

/** `/public/videoplayback 3.mp4` */
export const PROTOTYPE_HERO_TRANSFER_PRICING_VIDEO = `/${encodeURIComponent("videoplayback 3.mp4")}`;

export type PrototypeHeroVideoPreviewCardProps = {
  videoSrc: string;
  label: string;
  modalTitle: string;
  className?: string;
  uniformTile?: boolean;
  size?: "default" | "large";
  /**
   * Smaller tile **`max-width`** + gentler **`lg` scale** (Prototype 1 side cards). Does **not** alter
   * parent layout nudges — only the card’s own box / paint scale.
   */
  compact?: boolean;
};

/**
 * Hero preview tile — muted looping preview **`<video>`** + modal player with controls (same interaction
 * model as **`PrototypeHeroSeeHowCard`**, shell aligned with **`PrototypeHeroYoutubePreviewCard`**).
 */
export function PrototypeHeroVideoPreviewCard({
  videoSrc,
  label,
  modalTitle,
  className = "",
  uniformTile = false,
  size = "default",
  compact = false,
}: PrototypeHeroVideoPreviewCardProps) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const modalTitleId = useId();
  const dialogId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }
    const el = modalVideoRef.current;
    if (el) {
      el.currentTime = 0;
      void el.play().catch(() => {});
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      previewVideoRef.current?.pause();
    } else {
      void previewVideoRef.current?.play().catch(() => {});
    }
  }, [open]);

  const maxWidthClass = compact
    ? "max-w-[13rem] lg:max-w-[14.5rem]"
    : "max-w-[15.5rem] lg:max-w-[17.5rem]";

  const desktopLargeVisual =
    size === "large"
      ? compact
        ? "motion-reduce:lg:scale-100 lg:origin-center lg:scale-[1.06] will-change-transform"
        : "motion-reduce:lg:scale-100 lg:origin-center lg:scale-[1.22] will-change-transform"
      : "";

  const modal = open ? (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label="Close video"
        onClick={() => setOpen(false)}
      />
      <div
        id={dialogId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={modalTitleId}
        className="relative z-10 w-full max-w-[min(56rem,calc(100vw-2rem))] rounded-[0.5rem] border border-solid bg-white p-4 shadow-xl sm:p-6"
        style={{ borderColor: NEUTRAL_GREY[200] }}
      >
        <div className="mb-3 flex items-start justify-between gap-4">
          <p
            id={modalTitleId}
            className="text-[1.125rem] leading-[1.6] font-semibold sm:text-[1.25rem]"
            style={{ color: BRAND_NAVY[900] }}
          >
            {modalTitle}
          </p>
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
            style={{ color: BRAND_NAVY[700] }}
            aria-label="Close"
            onClick={() => setOpen(false)}
          >
            <XMarkIcon className="h-6 w-6" aria-hidden />
          </button>
        </div>
        <div
          className="overflow-hidden rounded-[0.375rem]"
          style={{ backgroundColor: NEUTRAL_GREY[900] }}
        >
          <video
            ref={modalVideoRef}
            className="aspect-video w-full object-contain"
            src={videoSrc}
            controls
            playsInline
            preload="metadata"
          />
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <div className={`w-full ${maxWidthClass} ${desktopLargeVisual} ${className}`.trim()}>
        <button
          type="button"
          className={`w-full cursor-pointer rounded-[0.5rem] border border-solid bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 ${DS_CTA_HOVER_TRANSITION_CLASS} ${uniformTile ? "p-3" : "p-2 lg:p-3"}`.trim()}
          style={{
            ...prototypeHeroPreviewCardShadow(hover),
            borderColor: hover ? BRAND_MINT[200] : NEUTRAL_GREY[200],
          }}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={dialogId}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => setOpen(true)}
        >
          <div
            className="relative aspect-video w-full overflow-hidden rounded-[0.375rem] border border-solid"
            style={{ borderColor: NEUTRAL_GREY[200] }}
          >
            <video
              ref={previewVideoRef}
              className="h-full w-full object-cover"
              src={videoSrc}
              muted
              playsInline
              loop
              autoPlay
              preload="metadata"
              aria-hidden
            />
          </div>
          <p
            className={
              uniformTile
                ? "mt-3 line-clamp-3 text-center text-[1rem] leading-[1.6] font-semibold"
                : "mt-2 line-clamp-3 text-center text-[0.875rem] leading-[1.55] font-semibold lg:mt-3 lg:text-[1rem] lg:leading-[1.6]"
            }
            style={{ color: BRAND_NAVY[900] }}
          >
            {label}
          </p>
        </button>
      </div>

      {modal ? createPortal(modal, document.body) : null}
    </>
  );
}
