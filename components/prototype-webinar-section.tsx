"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { DS_CTA_HOVER_TRANSITION_CLASS, primaryCtaSurfaceStyle } from "@/lib/ds-cta-interaction";
import { BRAND_NAVY, NEUTRAL_GREY } from "@/lib/design-system-color-tokens";

/** Corporation tax webinar spotlight — below consultant tabs (`app/prototype-1/page.tsx`). */
export function PrototypeWebinarSection() {
  const [primaryHover, setPrimaryHover] = useState(false);

  const primaryClass =
    `inline-flex min-h-[3.25rem] w-full max-w-[18rem] shrink-0 cursor-pointer items-center justify-center rounded-[0.5rem] border-0 px-6 text-[1.125rem] leading-[1.6] font-bold text-white focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 ${DS_CTA_HOVER_TRANSITION_CLASS}`.trim();

  const webinarsLinkClass =
    "inline-flex border-0 bg-transparent px-1 py-1 text-[1rem] leading-[1.6] font-semibold underline decoration-solid underline-offset-[3px] outline-none transition-opacity hover:opacity-90 focus-visible:rounded-[2px] focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900";

  return (
    <section
      className="border-t bg-white [font-family:var(--font-plus-jakarta),system-ui,sans-serif]"
      style={{ borderColor: NEUTRAL_GREY[200] }}
      aria-labelledby="prototype-webinar-heading"
    >
      <div className="mx-auto max-w-[1320px] px-6 py-12 sm:py-16 lg:py-20">
        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative mx-auto aspect-video w-full max-w-[540px] overflow-hidden rounded-[0.5rem] border border-solid lg:mx-0 lg:max-w-none">
            <Image
              src="/webinar.jpg"
              alt="Corporation-focused tax webinar — promotional graphic."
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="min-w-0 text-center lg:text-left">
            <p
              className="text-[0.875rem] font-semibold tracking-wide uppercase"
              style={{ color: BRAND_NAVY[600] }}
            >
              Live webinar
            </p>

            <h2
              id="prototype-webinar-heading"
              className="mt-3 text-[2.25rem] leading-[1.2] font-semibold tracking-[-0.02em]"
              style={{ color: BRAND_NAVY[900] }}
            >
              A corporation-focused lens on strategic tax leadership
            </h2>

            <p
              className="mt-6 max-w-xl text-[1rem] leading-[1.6] font-normal lg:mx-0 lg:max-w-none"
              style={{ color: NEUTRAL_GREY[700] }}
            >
              Join specialists for an executive briefing on aligning global tax posture with growth,
              documenting cross-border positioning, and what corporate tax leaders are prioritizing
              next—all in one focused session.
            </p>

            <div className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-4 lg:mx-0 lg:max-w-none lg:items-start">
              <button
                type="button"
                className={primaryClass}
                style={primaryCtaSurfaceStyle(primaryHover)}
                onMouseEnter={() => {
                  setPrimaryHover(true);
                }}
                onMouseLeave={() => {
                  setPrimaryHover(false);
                }}
              >
                Sign Up
              </button>
              <Link
                href="/webinars"
                className={webinarsLinkClass}
                style={{ color: BRAND_NAVY[900], textDecorationColor: BRAND_NAVY[900] }}
              >
                Explore All Webinars
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
