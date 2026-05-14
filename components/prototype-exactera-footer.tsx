import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { BRAND_NAVY, NEUTRAL_GREY } from "@/lib/design-system-color-tokens";

const SOCIAL = {
  linkedin: "https://www.linkedin.com/company/exactera",
  youtube: "https://www.youtube.com/",
} as const;

/** Certification and review assets in `public/badges/` — numeric order 1…6. */
const BADGE_CERTS = [
  { src: "/badges/1.webp", alt: "SOC 2 Type II certification badge" },
  { src: "/badges/2.webp", alt: "CCPA certification badge" },
  { src: "/badges/3.webp", alt: "GDPR certification badge" },
  { src: "/badges/4.webp", alt: "ISO 27001 certification badge (A-LIGN)" },
] as const;

const BADGE_REVIEWS = [
  { src: "/badges/5.svg", alt: "Capterra badge" },
  { src: "/badges/6.webp", alt: "Software Advice badge" },
] as const;

const linkBaseClass =
  "text-[1rem] leading-[1.6] font-normal underline decoration-solid underline-offset-[3px] outline-none transition-opacity hover:opacity-90 focus-visible:rounded-[2px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900";

/** H6 scale per `system.md`. */
function RegionHeading({ children }: { children: ReactNode }) {
  return (
    <p className="text-[1.125rem] leading-[1.4] font-semibold tracking-[0]" style={{ color: BRAND_NAVY[900] }}>
      {children}
    </p>
  );
}

function FooterTextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className={linkBaseClass}
      style={{ color: BRAND_NAVY[900], textDecorationColor: BRAND_NAVY[900] }}
    >
      {children}
    </Link>
  );
}

/** White marketing footer — contact, certifications, review badges, legal. Pair with `PrototypeSmarterTaxCtaStrip` above when used on prototypes. */
export function PrototypeExacteraFooter() {
  return (
    <footer
      className="border-t bg-white [font-family:var(--font-plus-jakarta),system-ui,sans-serif]"
      style={{ borderTopColor: NEUTRAL_GREY[200] }}
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-[1320px] px-6 py-12 sm:py-14 lg:py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-4">
            <Link
              href="/"
              className="inline-block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
            >
              <Image
                src="/logo.svg"
                alt="Exactera"
                width={182}
                height={34}
                className="h-8 w-auto sm:h-9"
              />
            </Link>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
              <FooterTextLink href={SOCIAL.linkedin}>LinkedIn</FooterTextLink>
              <FooterTextLink href={SOCIAL.youtube}>YouTube</FooterTextLink>
            </div>
          </div>

          <div className="lg:col-span-4">
            <RegionHeading>North America</RegionHeading>
            <p className="mt-3">
              <a
                href="tel:+16467677342"
                className={linkBaseClass}
                style={{ color: NEUTRAL_GREY[700], textDecorationColor: NEUTRAL_GREY[700] }}
              >
                +1.646.767.7342
              </a>
            </p>
            <p className="mt-2">
              <a
                href="mailto:info@exactera.com"
                className={linkBaseClass}
                style={{ color: BRAND_NAVY[900], textDecorationColor: BRAND_NAVY[900] }}
              >
                info@exactera.com
              </a>
            </p>
          </div>

          <div className="lg:col-span-4">
            <RegionHeading>Europe</RegionHeading>
            <p className="mt-3">
              <a
                href="tel:+442034236341"
                className={linkBaseClass}
                style={{ color: NEUTRAL_GREY[700], textDecorationColor: NEUTRAL_GREY[700] }}
              >
                +44 (20) 3423.6341
              </a>
            </p>
            <p className="mt-2">
              <a
                href="mailto:eusales@exactera.com"
                className={linkBaseClass}
                style={{ color: BRAND_NAVY[900], textDecorationColor: BRAND_NAVY[900] }}
              >
                eusales@exactera.com
              </a>
            </p>
          </div>
        </div>

        <div className="mt-12 border-t pt-12" style={{ borderTopColor: NEUTRAL_GREY[200] }}>
          <p className="text-[0.875rem] font-semibold uppercase tracking-wide" style={{ color: BRAND_NAVY[600] }}>
            Certifications
          </p>
          <div className="mt-8 flex flex-nowrap items-center justify-center gap-x-4 overflow-x-auto pb-1 sm:gap-x-6 md:justify-start md:overflow-visible md:pb-0 lg:gap-x-8 xl:gap-x-10">
            {BADGE_CERTS.map((badge) => (
              <div
                key={badge.src}
                className="relative h-14 w-28 shrink-0 sm:h-16 sm:w-36 md:w-[7.75rem] lg:w-[8.75rem]"
              >
                <Image
                  src={badge.src}
                  alt={badge.alt}
                  fill
                  className="object-contain object-center md:object-left"
                  sizes="(max-width: 767px) 7rem, 9rem"
                />
              </div>
            ))}
            {BADGE_REVIEWS.map((badge) => (
              <div
                key={badge.src}
                className="relative h-12 w-24 shrink-0 sm:h-14 sm:w-28 md:w-[6.75rem] lg:w-36"
              >
                <Image
                  src={badge.src}
                  alt={badge.alt}
                  fill
                  className="object-contain object-center md:object-left"
                  sizes="(max-width: 767px) 6rem, 8rem"
                />
              </div>
            ))}
          </div>
        </div>

        <p className="mt-10">
          <FooterTextLink href="/security">Learn More About Security At Exactera</FooterTextLink>
        </p>

        <div
          className="mt-12 flex flex-col gap-6 border-t pt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between"
          style={{ borderTopColor: NEUTRAL_GREY[200] }}
        >
          <p className="text-center text-[0.875rem] leading-[1.55] font-normal sm:text-left" style={{ color: NEUTRAL_GREY[600] }}>
            © Exactera 2026 All Rights Reserved.
          </p>
          <nav
            aria-label="Legal and policies"
            className="flex flex-wrap justify-center gap-x-6 gap-y-2 sm:justify-end"
          >
            <FooterTextLink href="/privacy-policy">Privacy Policy</FooterTextLink>
            <FooterTextLink href="/cookie-policy">Cookie Policy</FooterTextLink>
            <FooterTextLink href="/service-terms">Service Terms &amp; Conditions</FooterTextLink>
            <FooterTextLink href="/saas-terms">SaaS Terms &amp; Conditions</FooterTextLink>
          </nav>
        </div>
      </div>
    </footer>
  );
}
