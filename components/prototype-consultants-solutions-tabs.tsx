"use client";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useMemo, useState } from "react";

import {
  PROTOTYPE_PRODUCT_NAME_CLASS,
  PrototypeExplorePrimaryCta,
} from "@/components/prototype-explore-primary-cta";
import {
  DS_CTA_HOVER_TRANSITION_CLASS,
  DS_PRIMARY_CTA_TRAILING_ICON_WRAP_CLASS,
  primaryCtaSurfaceStyle,
} from "@/lib/ds-cta-interaction";
import { BRAND_MINT, BRAND_NAVY, NEUTRAL_GREY } from "@/lib/design-system-color-tokens";

type TabKey = "software" | "data" | "services";

type TabMeta = ReadonlyArray<{
  key: TabKey;
  label: string;
  headline: string;
  headingId: string;
  triggerId: string;
  backgroundColor: string;
}>;

const MAIN_TAB_PANEL_ID = "consultant-tab-panel-main";

function SoftwareTabPanelContent() {
  const [ctaHover, setCtaHover] = useState(false);
  const ctaClass =
    `group mt-10 inline-flex h-[3.25rem] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[0.5rem] border-0 px-6 text-[1.125rem] leading-[1.6] font-bold text-white focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${DS_CTA_HOVER_TRANSITION_CLASS}`.trim();

  return (
    <>
      <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
        <Image
          src="/logo.svg"
          alt="Exactera"
          width={146}
          height={27}
          className="h-7 w-auto brightness-0 invert sm:h-8"
        />
        <span
          className="text-[1.5rem] leading-[1.3] font-semibold tracking-[-0.01em] sm:text-[1.875rem] sm:leading-[1.22] sm:tracking-[-0.015em]"
          style={{ color: BRAND_MINT[400] }}
        >
          Transfer Pricing
        </span>
      </div>

      <p
        className="mt-6 max-w-2xl text-[1rem] leading-[1.6] font-normal"
        style={{ color: NEUTRAL_GREY[200] }}
      >
        An automated solution for generating localized transfer pricing reports at scale for every
        jurisdiction.
      </p>

      <button
        type="button"
        className={ctaClass}
        style={{
          ...primaryCtaSurfaceStyle(ctaHover),
          boxShadow: "none",
        }}
        onMouseEnter={() => {
          setCtaHover(true);
        }}
        onMouseLeave={() => {
          setCtaHover(false);
        }}
      >
        Explore Transfer Pricing
        <span className={DS_PRIMARY_CTA_TRAILING_ICON_WRAP_CLASS}>
          <ArrowRightIcon aria-hidden />
        </span>
      </button>
    </>
  );
}

function DataTabPanelContent() {
  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-10">
      <article
        className="flex flex-col rounded-[0.5rem] border border-solid bg-white p-6 sm:p-8"
        style={{ borderColor: NEUTRAL_GREY[200] }}
        aria-labelledby="consultant-tab-data-exactmatch"
      >
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <Image
            src="/logo.svg"
            alt="Exactera"
            width={146}
            height={27}
            className="h-7 w-auto sm:h-8"
          />
          <span
            id="consultant-tab-data-exactmatch"
            className={PROTOTYPE_PRODUCT_NAME_CLASS}
            style={{ color: BRAND_MINT[600] }}
          >
            ExactMatch
          </span>
        </div>
        <p
          className="mt-6 flex-1 text-[1rem] leading-[1.6] font-normal"
          style={{ color: NEUTRAL_GREY[700] }}
        >
          An AI-powered transfer pricing comp-search tool, enabling service providers to deliver
          instant, reliable, local benchmarks.
        </p>
        <PrototypeExplorePrimaryCta label="Explore ExactMatch" />
      </article>

      <article
        className="flex flex-col rounded-[0.5rem] border border-solid bg-white p-6 sm:p-8"
        style={{ borderColor: NEUTRAL_GREY[200] }}
        aria-labelledby="consultant-tab-data-royaltystat"
      >
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <Image
            src="/logo.svg"
            alt="Exactera"
            width={146}
            height={27}
            className="h-7 w-auto sm:h-8"
          />
          <span
            id="consultant-tab-data-royaltystat"
            className={PROTOTYPE_PRODUCT_NAME_CLASS}
            style={{ color: BRAND_MINT[600] }}
          >
            RoyaltyStat
          </span>
        </div>
        <p
          className="mt-6 flex-1 text-[1rem] leading-[1.6] font-normal"
          style={{ color: NEUTRAL_GREY[700] }}
        >
          {`A comprehensive database of license and service agreements enabling firms to establish arm's length royalty rates.`}
        </p>
        <PrototypeExplorePrimaryCta label="Explore RoyaltyStat" />
      </article>
    </div>
  );
}

function ServicesTabPanelContent() {
  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-10">
      <article
        className="flex flex-col rounded-[0.5rem] border border-solid bg-white p-6 sm:p-8"
        style={{ borderColor: NEUTRAL_GREY[200] }}
        aria-labelledby="consultant-tab-services-transfer-pricing"
      >
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <Image
            src="/logo.svg"
            alt="Exactera"
            width={146}
            height={27}
            className="h-7 w-auto sm:h-8"
          />
          <span
            id="consultant-tab-services-transfer-pricing"
            className={PROTOTYPE_PRODUCT_NAME_CLASS}
            style={{ color: BRAND_MINT[600] }}
          >
            Transfer Pricing
          </span>
        </div>
        <p
          className="mt-6 flex-1 text-[1rem] leading-[1.6] font-normal"
          style={{ color: NEUTRAL_GREY[700] }}
        >
          Expert-driven, technology-powered service for preparing localized transfer pricing
          documentation across jurisdictions.
        </p>
        <PrototypeExplorePrimaryCta label="Explore Transfer Pricing" />
      </article>

      <article
        className="flex flex-col rounded-[0.5rem] border border-solid bg-white p-6 sm:p-8"
        style={{ borderColor: NEUTRAL_GREY[200] }}
        aria-labelledby="consultant-tab-services-rd-tax-credit"
      >
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <Image
            src="/logo.svg"
            alt="Exactera"
            width={146}
            height={27}
            className="h-7 w-auto sm:h-8"
          />
          <span
            id="consultant-tab-services-rd-tax-credit"
            className={PROTOTYPE_PRODUCT_NAME_CLASS}
            style={{ color: BRAND_MINT[600] }}
          >
            R&D Tax Credit
          </span>
        </div>
        <p
          className="mt-6 flex-1 text-[1rem] leading-[1.6] font-normal"
          style={{ color: NEUTRAL_GREY[700] }}
        >
          Expert-led, technology-enabled services to maximize R&D tax credits in the US, Puerto
          Rico, and Canada.
        </p>
        <PrototypeExplorePrimaryCta label="Explore R&D Tax Credit" />
      </article>
    </div>
  );
}

/** Single band: tabbed Software · Data · Services (`app/prototype-1/page.tsx`). */
export function PrototypeConsultantsSolutionsTabs() {
  const tabs = useMemo(
    (): TabMeta => [
      {
        key: "software",
        label: "Software",
        headline: "Software for Consultants",
        headingId: "consultant-heading-software",
        triggerId: "consultant-tab-trigger-software",
        backgroundColor: BRAND_NAVY[900],
      },
      {
        key: "data",
        label: "Data",
        headline: "Data for Consultants",
        headingId: "consultant-heading-data",
        triggerId: "consultant-tab-trigger-data",
        backgroundColor: BRAND_MINT[900],
      },
      {
        key: "services",
        label: "Services",
        headline: "Services for Corporates",
        headingId: "consultant-heading-services",
        triggerId: "consultant-tab-trigger-services",
        backgroundColor: BRAND_NAVY[900],
      },
    ],
    [],
  );

  const [selected, setSelected] = useState<TabKey>("software");

  const active = tabs.find((t) => t.key === selected) ?? tabs[0];
  const activeBg = active.backgroundColor;

  return (
    <section
      id="consultant-solutions"
      aria-label="Solutions for consultants and corporates"
      className="relative border-t transition-[background-color] duration-300 ease-out [font-family:var(--font-plus-jakarta),system-ui,sans-serif]"
      style={{ backgroundColor: activeBg, borderColor: NEUTRAL_GREY[200] }}
    >
      <div className="relative mx-auto max-w-[1320px] px-6 py-12 sm:py-16 lg:py-20">
        <div
          role="tablist"
          aria-label="Browse by offering type"
          className="flex flex-wrap justify-center gap-2 border-b border-white/25 sm:gap-4"
        >
          {tabs.map((tab, index) => {
            const isSel = selected === tab.key;
            return (
              <button
                key={tab.key}
                role="tab"
                type="button"
                id={tab.triggerId}
                aria-selected={isSel}
                aria-controls={MAIN_TAB_PANEL_ID}
                tabIndex={isSel ? 0 : -1}
                className={`relative min-h-[48px] -mb-px border-b-[3px] px-5 py-3.5 text-[1.125rem] leading-[1.6] sm:min-h-[52px] sm:px-6 sm:py-4 sm:text-[1.25rem] sm:leading-[1.35] outline-none transition-colors focus-visible:z-[1] focus-visible:rounded-[2px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  isSel ? "" : "cursor-pointer opacity-95 hover:opacity-100"
                }`}
                style={{
                  color: isSel ? "#ffffff" : "rgba(255, 255, 255, 0.74)",
                  borderBottomColor: isSel ? BRAND_MINT[500] : "transparent",
                  fontWeight: isSel ? 600 : 400,
                }}
                onClick={() => {
                  setSelected(tab.key);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                    e.preventDefault();
                    const d = e.key === "ArrowRight" ? 1 : -1;
                    const ni = (index + d + tabs.length) % tabs.length;
                    const next = tabs[ni];
                    setSelected(next.key);
                    document.getElementById(next.triggerId)?.focus();
                  }
                  if ((e.key === "Home" || e.key === "End") && tabs.length > 0) {
                    e.preventDefault();
                    const ti = e.key === "Home" ? 0 : tabs.length - 1;
                    const next = tabs[ti];
                    setSelected(next.key);
                    document.getElementById(next.triggerId)?.focus();
                  }
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={MAIN_TAB_PANEL_ID}
          aria-labelledby={active.triggerId}
          className="min-h-[12rem]"
        >
          <h2
            id={active.headingId}
            className="pt-10 text-[2.25rem] leading-[1.2] font-semibold tracking-[-0.02em]"
            style={{ color: "#ffffff" }}
          >
            {active.headline}
          </h2>

          {selected === "software" ? (
            <SoftwareTabPanelContent />
          ) : selected === "data" ? (
            <DataTabPanelContent />
          ) : (
            <ServicesTabPanelContent />
          )}
        </div>
      </div>
    </section>
  );
}
