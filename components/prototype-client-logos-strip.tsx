import Image from "next/image";

import { NEUTRAL_GREY } from "@/lib/design-system-color-tokens";

/**
 * Prototype 1–2 + design system (Components → Header and Footer): client logo marquee
 * below hero. Centered H4/H5-scale headline; assets: `public/clients/`.
 * Greyscale + opacity on logos; infinite horizontal scroll (see `globals.css`).
 */

const CLIENT_LOGO_FILES = [
  "abg-logo-vector.svg",
  "alorica-logo-1024x286.webp",
  "BW-e1755199602647-1024x296.webp",
  "crossfitofficial_logo.webp",
  "download.svg",
  "dynonobel_logostacked-blue-1024x546.webp",
  "EPICOR-LOGO.webp",
  "Five-Guys-Emblem-1024x576.webp",
  "General-Dynamics-Emblem-1024x576.webp",
  "GE-1024x448.webp",
  "GOAT-Logo-Black-1.webp",
  "Jaggaer-Logo-Red.webp",
  "logo-feld_entertainment.png",
  "lush2-e1755199548204-300x81.webp",
  "penske_logo.webp",
  "PRINT-Driscolls-Logo-cmyk-under_1.webp",
  "R-1-1-1024x320.webp",
  "Untitled-design-11-1-e1754427886119.webp",
  "Untitled-design-8-1024x229.webp",
  "Untitled-design-9-1-14-08-2025-12-45-47.webp",
] as const;

const CLIENT_LOGOS = CLIENT_LOGO_FILES.map((file) => `/clients/${file}` as const);

function LogoRow({
  idSuffix,
  ariaHidden = false,
}: {
  idSuffix: string;
  ariaHidden?: boolean;
}) {
  return (
    <ul
      className="flex shrink-0 items-center gap-x-14 gap-y-6 px-8 sm:gap-x-16"
      aria-hidden={ariaHidden}
    >
      {CLIENT_LOGOS.map((src) => (
        <li
          key={`${idSuffix}-${src}`}
          className="relative flex h-12 w-[9.5rem] shrink-0 list-none sm:h-14 sm:w-[11rem]"
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="(max-width: 640px) 9.5rem, 11rem"
            className="object-contain object-center grayscale opacity-80 contrast-[0.92]"
          />
        </li>
      ))}
    </ul>
  );
}

export function PrototypeClientLogosStrip() {
  return (
    <section
      aria-labelledby="prototype-client-logos-heading"
      className="border-b border-solid [font-family:var(--font-plus-jakarta),system-ui,sans-serif]"
      style={{
        backgroundColor: NEUTRAL_GREY[50],
        borderBottomColor: NEUTRAL_GREY[200],
      }}
    >
      <div className="mx-auto max-w-[1320px] px-6 pt-8 text-center sm:pt-10">
        <h4
          id="prototype-client-logos-heading"
          className="text-[1.25rem] leading-[1.35] font-semibold tracking-[-0.005em] lg:text-[1.5rem] lg:leading-[1.3] lg:tracking-[-0.01em]"
          style={{ color: NEUTRAL_GREY[600] }}
        >
          Trusted by 700+ corporations and firms worldwide.
        </h4>
      </div>
      <div className="prototype-client-logos-mask pt-5 pb-7 sm:pt-6 sm:pb-9">
        <div className="prototype-client-logos-track">
          <LogoRow idSuffix="a" />
          <LogoRow idSuffix="b" ariaHidden />
        </div>
      </div>
    </section>
  );
}
