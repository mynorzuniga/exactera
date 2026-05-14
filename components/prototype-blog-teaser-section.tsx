"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { DS_CTA_HOVER_TRANSITION_CLASS, secondaryCtaSurfaceStyle } from "@/lib/ds-cta-interaction";
import { BRAND_NAVY, NEUTRAL_GREY } from "@/lib/design-system-color-tokens";

const ENTRIES = [
  {
    slug: "/blog/documentation-trends",
    imageSrc: "/blog/1.jpeg",
    topic: "Transfer pricing",
    title: "Closing the documentation gap before year-end close",
    excerpt:
      "What tax teams are tightening in intercompany policies, local files, and benchmarking cycles as regulators raise the bar on contemporaneous evidence and audit trails across major jurisdictions.",
  },
  {
    slug: "/blog/rd-credits-outlook",
    imageSrc: "/blog/2.jpg",
    topic: "R&D tax credits",
    title: "US, Puerto Rico, and Canada: aligning claims with substance",
    excerpt:
      "Why documentation, project coding, and credit stacking strategies are shifting as agencies clarify qualified research, contracting rules, and what “development” means in practice for multinational R&D footprints.",
  },
  {
    slug: "/blog/implementation-playbook",
    imageSrc: "/blog/3.webp",
    topic: "Digital tax",
    title: "From spreadsheet sprawl to a governed tax tech stack",
    excerpt:
      "How corporate tax leads are sequencing data clean-up, workflow ownership, and controlled rollouts when moving planning, provisioning, and reporting into a single system of record without freezing the close calendar.",
  },
] as const;

/** Three-up blog teaser + secondary CTA — prototype 1, below webinar. */
export function PrototypeBlogTeaserSection() {
  const [ctaHover, setCtaHover] = useState(false);

  const seeMoreClass =
    `inline-flex h-[3.25rem] shrink-0 cursor-pointer items-center justify-center rounded-[0.5rem] border border-solid px-6 text-[1.125rem] leading-[1.6] font-bold focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 ${DS_CTA_HOVER_TRANSITION_CLASS}`.trim();

  return (
    <section
      aria-labelledby="prototype-blog-teaser-heading"
      className="border-t [font-family:var(--font-plus-jakarta),system-ui,sans-serif]"
      style={{
        backgroundColor: NEUTRAL_GREY[50],
        borderTopColor: NEUTRAL_GREY[200],
      }}
    >
      <div className="mx-auto max-w-[1320px] px-6 py-12 sm:py-16 lg:py-20">
        <h2
          id="prototype-blog-teaser-heading"
          className="text-center text-[2.25rem] leading-[1.2] font-semibold tracking-[-0.02em] lg:text-left"
          style={{ color: BRAND_NAVY[900] }}
        >
          Insights from our team
        </h2>

        <div className="mx-auto mt-10 grid gap-10 sm:mx-0 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-8">
          {ENTRIES.map((entry, i) => (
            <article
              key={entry.slug}
              className="flex flex-col overflow-hidden rounded-[0.5rem] border border-solid bg-white"
              style={{ borderColor: NEUTRAL_GREY[200] }}
              aria-labelledby={`prototype-blog-teaser-${i}-title`}
            >
              <div
                className="relative aspect-[16/10] w-full shrink-0"
                style={{ backgroundColor: NEUTRAL_GREY[100] }}
              >
                <Image
                  src={entry.imageSrc}
                  alt={`Featured image for: ${entry.title}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, calc(1320px / 3)"
                />
              </div>
              <div className="flex flex-col p-6 sm:p-7">
                <p
                  className="text-[0.875rem] font-semibold tracking-wide uppercase"
                  style={{ color: BRAND_NAVY[600] }}
                >
                  {entry.topic}
                </p>
                <h3
                  id={`prototype-blog-teaser-${i}-title`}
                  className="mt-3 text-[1.25rem] leading-[1.35] font-semibold tracking-[-0.005em]"
                  style={{ color: BRAND_NAVY[900] }}
                >
                  {entry.title}
                </h3>
                <p
                  className="mt-4 line-clamp-3 text-[1rem] leading-[1.6] font-normal"
                  style={{ color: NEUTRAL_GREY[700] }}
                >
                  {entry.excerpt}
                </p>
                <p className="mt-6">
                  <Link
                    href={entry.slug}
                    className="text-[1rem] leading-[1.6] font-semibold underline decoration-solid underline-offset-[3px] outline-none transition-opacity hover:opacity-90 focus-visible:rounded-[2px] focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
                    style={{
                      color: BRAND_NAVY[900],
                      textDecorationColor: BRAND_NAVY[900],
                    }}
                  >
                    Read More
                  </Link>
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center lg:mt-14">
          <Link
            href="/blog"
            className={seeMoreClass}
            style={secondaryCtaSurfaceStyle(ctaHover)}
            onMouseEnter={() => {
              setCtaHover(true);
            }}
            onMouseLeave={() => {
              setCtaHover(false);
            }}
          >
            See More Entries
          </Link>
        </div>
      </div>
    </section>
  );
}
