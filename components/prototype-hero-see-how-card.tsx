"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import type { CSSProperties } from "react";
import { useEffect, useId, useRef, useState } from "react";

import { BRAND_MINT, BRAND_NAVY, NEUTRAL_GREY } from "@/lib/design-system-color-tokens";
import { prototypeHeroPreviewCardShadow } from "@/lib/prototype-hero-preview-card-surface";
import { DS_CTA_HOVER_TRANSITION_CLASS } from "@/lib/ds-cta-interaction";

const VIDEO_SRC = "/Exactera-Overview-1.mp4";

/** Prototype 1 — small “See How It Works” hero card + modal video (mint hover glow). */
export function PrototypeHeroSeeHowCard() {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const cardTitleId = useId();
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

  return (
    <>
      <div className="w-full max-w-[17.5rem]">
        <button
          type="button"
          className={`w-full cursor-pointer rounded-[0.5rem] border border-solid bg-white p-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 ${DS_CTA_HOVER_TRANSITION_CLASS}`}
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
            className="overflow-hidden rounded-[0.375rem] border border-solid"
            style={{ borderColor: NEUTRAL_GREY[200] }}
          >
            <video
              ref={previewVideoRef}
              className="aspect-video w-full object-cover"
              src={VIDEO_SRC}
              muted
              playsInline
              loop
              autoPlay
              preload="metadata"
              aria-hidden
            />
          </div>
          <p
            id={cardTitleId}
            className="mt-3 text-center text-[1rem] leading-[1.6] font-semibold"
            style={{ color: BRAND_NAVY[900] }}
          >
            See How It Works
          </p>
        </button>
      </div>

      {open ? (
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
                See How It Works
              </p>
              <button
                type="button"
                className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-[color:var(--close)] transition-colors hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
                style={
                  {
                    ["--close" as string]: BRAND_NAVY[700],
                  } as CSSProperties
                }
                aria-label="Close"
                onClick={() => setOpen(false)}
              >
                <XMarkIcon className="h-6 w-6" aria-hidden />
              </button>
            </div>
            <video
              ref={modalVideoRef}
              className="aspect-video w-full rounded-[0.375rem] object-contain"
              style={{ backgroundColor: NEUTRAL_GREY[900] }}
              src={VIDEO_SRC}
              controls
              playsInline
              preload="metadata"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
