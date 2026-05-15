import type { CSSProperties } from "react";

import { BRAND_MINT, BRAND_NAVY } from "@/lib/design-system-color-tokens";

/**
 * Prototype 2 — hero band 2. Cards alternate navy / mint tints (`color-mix` on tokens, low alpha
 * so video reads through); glass surface (`backdrop-blur-lg`). “Read more” matches **tertiary**
 * small geometry (`design-system-cta-buttons.tsx`: 2rem height, `px-4`, Body Standard, bold,
 * 0.5rem radius) with **white 70%** border + label and **white 10%** fill.
 */
const CARDS: { tone: "navy" | "mint"; text: string }[] = [
  {
    tone: "navy",
    text: "Reduce Exposure with a New Model of Transfer Pricing",
  },
  {
    tone: "mint",
    text: "Epicor Turns to Exactera for More Efficient, Audit-Ready Global Transfer Pricing",
  },
  {
    tone: "navy",
    text: "How George v. Commissioner Exposed Fatal Flaws in Retroactive Studies",
  },
];

function cardSurfaceStyle(tone: "navy" | "mint"): CSSProperties {
  const base = tone === "navy" ? BRAND_NAVY[900] : BRAND_MINT[700];
  return { backgroundColor: `color-mix(in srgb, ${base} 22%, transparent)` };
}

export function PrototypeHeroBand2ResourceCards() {
  return (
    <div className="mx-auto w-full max-w-[1320px] px-6">
      <h2 className="sr-only">Spotlight articles</h2>
      <div className="flex w-full flex-col gap-6 md:flex-row md:items-stretch">
        {CARDS.map((card) => (
          <article
            key={card.text}
            className="flex w-full min-w-0 flex-1 flex-col gap-6 rounded-[0.5rem] p-6 backdrop-blur-lg backdrop-saturate-100 md:basis-0 [font-family:var(--font-plus-jakarta),system-ui,sans-serif]"
            style={cardSurfaceStyle(card.tone)}
          >
            <p className="text-[1rem] leading-[1.6] font-normal text-white">{card.text}</p>
            <button
              type="button"
              className="inline-flex h-[2rem] shrink-0 cursor-pointer items-center justify-center self-start rounded-[0.5rem] border border-solid border-white/70 bg-white/10 px-4 text-[1rem] leading-[1.6] font-bold text-white/70 transition-colors hover:border-white/90 hover:text-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Read more
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
