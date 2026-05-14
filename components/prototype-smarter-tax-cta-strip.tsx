import { SpeakToExpertPrimaryCtaButton } from "@/components/speak-to-expert-primary-cta-button";
import { BRAND_NAVY } from "@/lib/design-system-color-tokens";

/** Navy (**`BRAND_NAVY[900]`**) band placed above `PrototypeExacteraFooter`: Heading 3 headline + compact primary CTA (no mint glow). */
export function PrototypeSmarterTaxCtaStrip() {
  return (
    <section
      className="w-full py-8 sm:py-10 [font-family:var(--font-plus-jakarta),system-ui,sans-serif]"
      style={{ backgroundColor: BRAND_NAVY[900] }}
      aria-labelledby="prototype-smarter-tax-heading"
    >
      <div className="mx-auto flex max-w-[1320px] flex-col items-stretch gap-5 px-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <h3
          id="prototype-smarter-tax-heading"
          className="m-0 max-w-xl text-center text-[1.875rem] leading-[1.22] font-semibold tracking-[-0.015em] sm:text-left"
          style={{ color: BRAND_NAVY[50] }}
        >
          Discover a smarter tax approach
        </h3>
        <div className="flex shrink-0 justify-center sm:justify-end">
          <SpeakToExpertPrimaryCtaButton label="Let's Talk" compact noGlow />
        </div>
      </div>
    </section>
  );
}
