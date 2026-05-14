"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";

import { BRAND_MINT, BRAND_NAVY, NEUTRAL_GREY } from "@/lib/design-system-color-tokens";
import { prototypeHeroPreviewCardShadow } from "@/lib/prototype-hero-preview-card-surface";
import { DS_CTA_HOVER_TRANSITION_CLASS } from "@/lib/ds-cta-interaction";

export type PrototypeHeroYoutubePreviewCardProps = {
  previewSrc: string;
  /** Shown under the thumbnail on the card */
  label: string;
  /** Dialog title + iframe title */
  modalTitle: string;
  /** Base embed URL, e.g. `https://www.youtube.com/embed/VIDEO_ID` (no query) */
  youtubeEmbedBaseUrl: string;
};

/** Hero-sized preview card; opens YouTube embed in modal (matches See How It Works styling, smaller). */
export function PrototypeHeroYoutubePreviewCard({
  previewSrc,
  label,
  modalTitle,
  youtubeEmbedBaseUrl,
}: PrototypeHeroYoutubePreviewCardProps) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const modalTitleId = useId();
  const dialogId = useId();

  const iframeSrc = open
    ? `${youtubeEmbedBaseUrl}${youtubeEmbedBaseUrl.includes("?") ? "&" : "?"}autoplay=1`
    : undefined;

  useEffect(() => {
    if (!open) {
      return;
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
          <div className="relative aspect-video w-full">
            <iframe
              className="absolute inset-0 h-full w-full border-0"
              src={iframeSrc}
              title={modalTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <div className="w-full max-w-[15.5rem] lg:max-w-[17.5rem]">
        <button
          type="button"
          className={`w-full cursor-pointer rounded-[0.5rem] border border-solid bg-white p-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 lg:p-3 ${DS_CTA_HOVER_TRANSITION_CLASS}`}
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
            <Image
              src={previewSrc}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1023px) 15.5rem, 17.5rem"
            />
          </div>
          <p
            className="mt-2 line-clamp-3 text-center text-[0.875rem] leading-[1.55] font-semibold lg:mt-3 lg:text-[1rem] lg:leading-[1.6]"
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
