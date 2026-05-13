"use client";

import { Bars3Icon, ChevronDownIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/solid";
import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { createContext, useContext, useEffect, useId, useState } from "react";
import Image from "next/image";

import { BRAND_MINT, BRAND_NAVY, NEUTRAL_GREY } from "@/components/design-system-colors";
import { SpeakToExpertPrimaryCtaButton } from "@/components/speak-to-expert-primary-cta-button";
import { PrototypeClientLogosStrip } from "@/components/prototype-client-logos-strip";

/**
 * Header and footer specimens (Components → Header and Footer tab).
 *
 * ## Promotion bar V1
 *
 * - **Bar**: **2.5rem** tall, **`BRAND_MINT[600]`** fill, full width; inner row **`max-width: 1320px`**, horizontal padding **`px-6`**, centered.
 * - **Copy**: **Body Small** (`0.875rem` / `1.55`), **semibold** (600), **white** (`#ffffff`). **Mobile (`md` below)**: message is a **horizontal ticker** (duplicated string, **~24s** linear loop, `globals.css` **`.promotion-bar-message-track`**); **`prefers-reduced-motion`**: animation off, **horizontal scroll** (`.promotion-bar-message-scroll`) to read full copy. **`md` and up**: **truncate** single line in remaining width.
 * - **Action**: **Read More** — same **small** CTA geometry as `design-system-cta-buttons` (`2rem`, Body Standard label, **bold**, `0.5rem` radius, horizontal **`px-4`**); **no** fill (transparent); border and label **brand mint 100** (`BRAND_MINT[100]`, 100% opacity).
 * - **Dismiss**: trailing **X** (**Heroicons** 24 **outline** `XMarkIcon`) to the **right** of **Read More**; hides the bar for the **current page session** (React state; full page reload restores it). **`aria-label`**: “Dismiss announcement”.
 *
 * ## Promotion bar V2
 *
 * - **Bar**: same dimensions and layout as V1; **`BRAND_NAVY[900]`** fill.
 * - **Copy**: same as V1 (including **mobile** ticker / **`md`+** truncate).
 * - **Action**: **Read More** — same geometry as V1 (**`px-4`**); **no** fill; border and label **brand navy 200** (`BRAND_NAVY[200]`).
 * - **Dismiss**: same **X** pattern as V1.
 * - Exported **`PromotionBarV2`** for page shells stacked flush above **`HeaderV1`** (e.g. Prototype 1).
 *
 * Exported **`HeaderV1`** for full-page shells (e.g. prototypes); same markup as the
 * specimen below.
 *
 * ## Header V1
 *
 * - **Bar**: **4.5rem** tall, white background, **1px** bottom border neutral grey **200** (`NEUTRAL_GREY[200]`); no outer “card” wrapper.
 * - Inner content: horizontal padding + **`max-width: 1320px`**, centered (`margin-inline: auto`).
 * - Font: Plus Jakarta Sans (`--font-plus-jakarta`).
 * - **Logo** (`/logo.svg`): visual anchor left of nav.
 * - **Nav links** (not inputs): Body Standard (`1rem` / `1.6`) **semibold** (600), **brand navy 900**; **hover** text and chevrons **brand mint 600**.
 * - **Services** (desktop **`lg`+**): **hover** (and **focus-within**) opens a **flyout** under the trigger: two offerings — **Exactera Transfer Pricing** and **Exactera R&D Tax Credits** (titles are links **`href` `#`** until routes exist); **Body Standard** **`1rem` / `1.6`**, **normal** body copy in **`NEUTRAL_GREY[700]`**; **US**, **Puerto Rico**, **Canada** in the R&D blurb are **Body Standard semibold** links with **underline** / **`underline-offset-[3px]`**, **navy → mint** hover (**`HEADER_V1_LINK_VARS`**). **Mobile drawer**: **Services** block lists the same two offerings with copy and links before **Software**.
 * - **Software** (desktop **`lg`+**): **hover** flyout with three product rows — **Exactera Transfer Pricing** (distinct copy from **Services**), **ExactMatch**, **RoyaltyStat** (title links **`href` `#`**); body **Body Standard** **`1rem` / `1.6`**, **`NEUTRAL_GREY[700]`**. **Mobile drawer**: **Software** block lists the same three before **Pricing**.
 * - **About** (desktop **`lg`+**): **hover** flyout with links **Customers**, **Resources**, **News**, **Careers** (each **`href` `#`** until routes exist); compact list panel under the trigger (border **`NEUTRAL_GREY[200]`**, white card). **Mobile drawer**: **About** block lists the same four before **Pricing**.
 * - **Search** / **User**: icon buttons; **User** uses **Heroicons 24 solid** `UserIcon`. **Hover** opens `HeaderV1UserMenu`: **Client Portal**, **Account**, **Logout** (menu items are **`button`**s for now; wire routes or actions when available). Extra horizontal spacing separates this group from the primary CTA (no divider).
 * - **Primary CTA**: label **Speak to an Expert**; **Body Big** bold (**1.125rem**); **mint 600** with tight **mint 300** glow; **hover** keeps the same glow and adds vertical gradient **mint 500** (top) → **mint 600** (bottom); **white** text; trailing **ArrowRightIcon** **slides right** and **thickens** on hover. See `lib/ds-cta-interaction.ts` / `SpeakToExpertPrimaryCtaButton`. On **viewport &lt; `lg` (1024px)** the CTA moves into the **mobile drawer** footer; the top bar shows **Search**, **Account**, and **Menu** (hamburger) only.
 *
 * ## Header V1 — mobile (&lt; `lg`)
 *
 * - Same **4.5rem** bar height, **white** fill, **1px** bottom border **`NEUTRAL_GREY[200]`**.
 * - **Top row**: **`max-width` 1320px**, **`px-6`**, **`justify-between`**. **Logo** (left). **Right cluster** (**`gap-3`**): **Search** and **Account** icon buttons (same 24px icons + **HEADER_V1_ICON_BUTTON_CLASSES** as desktop), then **Menu** — **Heroicons** 24 outline **`Bars3Icon`**, **`aria-expanded` / `aria-controls`** tied to the drawer panel, **`aria-label`**: “Open menu” / “Close menu” on the drawer close control.
 * - **Drawer** (open state): **`fixed inset-0`**. **Scrim**: **`bg-black` / 40%** (`rgba(0,0,0,0.4)`), **click** closes. **Panel**: **`fixed` `inset-y-0` `right-0`**, **`w-full` `max-w-sm`**, **white**, **`border-left` `1px` `NEUTRAL_GREY[200]`**, **`shadow-xl`**, **`z-index`** above scrim. **Header strip** (**4.5rem**): title **“Menu”** — **Body Standard** (**`1rem` / `1.6`**), **semibold**, **`BRAND_NAVY[900]`**; **close** — **`XMarkIcon`**, **`aria-label`**: “Close menu”.
 * - **Scrollable nav**: **Services** … **Software** … **About** … **Pricing** … **Contact** (section blocks for Services, Software, About; plain rows for Pricing and Contact). **Borders** between rows: **`1px` `NEUTRAL_GREY[200]`**.
 * - **Footer**: **`border-top` `NEUTRAL_GREY[200]`**, **`p-6`**, **full-width** **`SpeakToExpertPrimaryCtaButton`** (`w-full`).
 * - **Escape** closes drawer; **open** locks **body scroll** (`overflow: hidden`). **Drawer motion**: panel **slides in from the right** (`translateX(100%)` → `0`), **~420ms** **`ease-out`**; scrim **`opacity`** fades in sync; **`motion-reduce:transition-none`** respects **`prefers-reduced-motion`**.
 * - **Design system specimen**: render **`HeaderV1`** with **`variant="mobile-specimen"`** inside a **`~390px`** preview — forces mobile chrome at any viewport so the strip documents correctly.
 * - **`headerChrome="glass-on-dark"`** (e.g. Prototype 2 video hero): bar is **`absolute` `top-0` `inset-x-0` `z-50`** over the hero; **frosted glass** (**`backdrop-blur-xl`**, **`bg-white/10`**, **`border-b`** **`white/15`**). **Logo** rendered **white** (CSS **`brightness-0 invert`**). **Bar** nav triggers, plain links, search, account, and menu icons use **white** idle / **brand mint 300** hover via **`HEADER_V1_LINK_VARS_OVERLAY`**. **Dropdown panels** and **mobile drawer** interior stay **white** with standard **navy → mint** links. **Primary CTA** unchanged (**mint** fill). Focus rings on bar: **white** ring; on light surfaces: **zinc-900** as default.
 *
 * **Tokens**: `BRAND_NAVY`, `BRAND_MINT`, `NEUTRAL_GREY` in `lib/design-system-color-tokens.ts` (specimen UI in `components/design-system-colors.tsx`).
 */

export type HeaderV1Chrome = "default" | "glass-on-dark";

const HeaderV1ChromeContext = createContext<HeaderV1Chrome>("default");

function useHeaderV1Chrome(): HeaderV1Chrome {
  return useContext(HeaderV1ChromeContext);
}

const HEADER_V1_LINK_VARS: CSSProperties = {
  ["--nav-idle" as string]: BRAND_NAVY[900],
  ["--nav-hover" as string]: BRAND_MINT[600],
  ["--chevron-idle" as string]: BRAND_NAVY[700],
};

/** Bar-on-dark: white links; hover mint 300 for contrast on video overlays. */
const HEADER_V1_LINK_VARS_OVERLAY: CSSProperties = {
  ["--nav-idle" as string]: "#ffffff",
  ["--nav-hover" as string]: BRAND_MINT[300],
  ["--chevron-idle" as string]: "rgba(255,255,255,0.85)",
};

const HEADER_V1_NAV_ITEM_CLASSES =
  "text-[1rem] leading-[1.6] font-semibold no-underline transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 text-[color:var(--nav-idle)] hover:text-[color:var(--nav-hover)]";

const HEADER_V1_NAV_ITEM_CLASSES_OVERLAY =
  "text-[1rem] leading-[1.6] font-semibold no-underline transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent text-[color:var(--nav-idle)] hover:text-[color:var(--nav-hover)]";

const HEADER_V1_ICON_BUTTON_CLASSES =
  "rounded-full p-2 text-[color:var(--nav-idle)] transition-colors hover:text-[color:var(--nav-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2";

const HEADER_V1_ICON_BUTTON_CLASSES_OVERLAY =
  "rounded-full p-2 text-[color:var(--nav-idle)] transition-colors hover:text-[color:var(--nav-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

function useHeaderV1BarTriggerChrome() {
  const chrome = useHeaderV1Chrome();
  const glass = chrome === "glass-on-dark";
  return {
    linkVars: glass ? HEADER_V1_LINK_VARS_OVERLAY : HEADER_V1_LINK_VARS,
    navItemClasses: glass ? HEADER_V1_NAV_ITEM_CLASSES_OVERLAY : HEADER_V1_NAV_ITEM_CLASSES,
  };
}

function HeaderV1NavLink({
  href,
  children,
  className = "",
  onClick,
  onLight = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  /** Use on white surfaces (drawer, flyout panels); ignores glass bar chrome. */
  onLight?: boolean;
}) {
  const chrome = useHeaderV1Chrome();
  const useOverlay = !onLight && chrome === "glass-on-dark";
  const itemClasses = useOverlay ? HEADER_V1_NAV_ITEM_CLASSES_OVERLAY : HEADER_V1_NAV_ITEM_CLASSES;
  const linkVars = useOverlay ? HEADER_V1_LINK_VARS_OVERLAY : HEADER_V1_LINK_VARS;

  return (
    <a
      href={href}
      className={`${itemClasses} ${className}`.trim()}
      style={linkVars}
      onClick={onClick}
    >
      {children}
    </a>
  );
}

const HEADER_V1_TEXT_LINK_IN_BODY_CLASSES =
  "font-semibold text-[color:var(--nav-idle)] underline underline-offset-[3px] transition-colors hover:text-[color:var(--nav-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-1 rounded-sm";

const SERVICES_TRANSFER_PRICING_TITLE = "Exactera Transfer Pricing";
const SERVICES_TRANSFER_PRICING_BODY =
  "Expert-driven, technology-powered service for preparing localized transfer pricing documentation across jurisdictions.";

const SERVICES_RD_TITLE = "Exactera R&D Tax Credits";
const SERVICES_RD_BODY_PREFIX =
  "Expert-led, technology-enabled services to maximize R&D tax credits in the ";

const SOFTWARE_OFFERINGS = [
  {
    title: "Exactera Transfer Pricing",
    body: "An automated solution for generating localized transfer pricing reports at scale for every jurisdiction.",
  },
  {
    title: "ExactMatch",
    body: "An AI-powered transfer pricing comp-search tool, enabling service providers to deliver instant, reliable, local benchmarks.",
  },
  {
    title: "RoyaltyStat",
    body: "A comprehensive database of license and service agreements enabling firms to establish arm's length royalty rates.",
  },
] as const;

const ABOUT_SUBLINKS = ["Customers", "Resources", "News", "Careers"] as const;

const USER_MENU_ITEMS = ["Client Portal", "Account", "Logout"] as const;

const HEADER_V1_MOBILE_NAV_ITEMS = [
  { href: "#", label: "Pricing" as const },
  { href: "#", label: "Contact" as const },
] as const;

function HeaderV1ServicesFlyoutDesktop() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonId = useId();
  const barChrome = useHeaderV1BarTriggerChrome();

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
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        id={buttonId}
        type="button"
        className={`group inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0 ${barChrome.navItemClasses}`}
        style={barChrome.linkVars}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={panelId}
      >
        Services
        <ChevronDownIcon
          aria-hidden
          className="h-4 w-4 shrink-0 text-[color:var(--chevron-idle)] transition-colors group-hover:text-[color:var(--nav-hover)]"
        />
      </button>
      {open ? (
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className="absolute left-0 top-full z-[60] pt-2"
        >
          <div
            className="flex w-[min(36rem,calc(100vw-4rem))] max-w-xl flex-col gap-6 rounded-[0.5rem] border border-solid bg-white p-6 shadow-lg"
            style={{ borderColor: NEUTRAL_GREY[200] }}
          >
            <div>
              <a
                href="#"
                className={`inline-flex ${HEADER_V1_NAV_ITEM_CLASSES}`}
                style={HEADER_V1_LINK_VARS}
              >
                {SERVICES_TRANSFER_PRICING_TITLE}
              </a>
              <p
                className="mt-2 text-[1rem] leading-[1.6] font-normal"
                style={{ color: NEUTRAL_GREY[700] }}
              >
                {SERVICES_TRANSFER_PRICING_BODY}
              </p>
            </div>
            <div
              className="border-t border-solid pt-6"
              style={{ borderTopColor: NEUTRAL_GREY[200] }}
            >
              <a
                href="#"
                className={`inline-flex ${HEADER_V1_NAV_ITEM_CLASSES}`}
                style={HEADER_V1_LINK_VARS}
              >
                {SERVICES_RD_TITLE}
              </a>
              <p
                className="mt-2 text-[1rem] leading-[1.6] font-normal"
                style={{ color: NEUTRAL_GREY[700] }}
              >
                {SERVICES_RD_BODY_PREFIX}
                <a
                  href="#"
                  className={HEADER_V1_TEXT_LINK_IN_BODY_CLASSES}
                  style={HEADER_V1_LINK_VARS}
                >
                  US
                </a>
                ,{" "}
                <a
                  href="#"
                  className={HEADER_V1_TEXT_LINK_IN_BODY_CLASSES}
                  style={HEADER_V1_LINK_VARS}
                >
                  Puerto Rico
                </a>
                , and{" "}
                <a
                  href="#"
                  className={HEADER_V1_TEXT_LINK_IN_BODY_CLASSES}
                  style={HEADER_V1_LINK_VARS}
                >
                  Canada
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function HeaderV1ServicesSectionMobile({ onClose }: { onClose: () => void }) {
  const linkTap = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div
      className="border-b border-solid py-4"
      style={{ borderBottomColor: NEUTRAL_GREY[200] }}
    >
      <p
        className="text-[1rem] leading-[1.6] font-semibold"
        style={{ color: BRAND_NAVY[900] }}
      >
        Services
      </p>
      <div className="mt-4 space-y-5">
        <div>
          <HeaderV1NavLink href="#" className="block w-full" onClick={linkTap} onLight>
            {SERVICES_TRANSFER_PRICING_TITLE}
          </HeaderV1NavLink>
          <p
            className="mt-1.5 text-[1rem] leading-[1.6] font-normal"
            style={{ color: NEUTRAL_GREY[700] }}
          >
            {SERVICES_TRANSFER_PRICING_BODY}
          </p>
        </div>
        <div>
          <HeaderV1NavLink href="#" className="block w-full" onClick={linkTap} onLight>
            {SERVICES_RD_TITLE}
          </HeaderV1NavLink>
          <p
            className="mt-1.5 text-[1rem] leading-[1.6] font-normal"
            style={{ color: NEUTRAL_GREY[700] }}
          >
            {SERVICES_RD_BODY_PREFIX}
            <a
              href="#"
              className={HEADER_V1_TEXT_LINK_IN_BODY_CLASSES}
              style={HEADER_V1_LINK_VARS}
              onClick={linkTap}
            >
              US
            </a>
            ,{" "}
            <a
              href="#"
              className={HEADER_V1_TEXT_LINK_IN_BODY_CLASSES}
              style={HEADER_V1_LINK_VARS}
              onClick={linkTap}
            >
              Puerto Rico
            </a>
            , and{" "}
            <a
              href="#"
              className={HEADER_V1_TEXT_LINK_IN_BODY_CLASSES}
              style={HEADER_V1_LINK_VARS}
              onClick={linkTap}
            >
              Canada
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

function HeaderV1SoftwareFlyoutDesktop() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonId = useId();
  const barChrome = useHeaderV1BarTriggerChrome();

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
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        id={buttonId}
        type="button"
        className={`group inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0 ${barChrome.navItemClasses}`}
        style={barChrome.linkVars}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={panelId}
      >
        Software
        <ChevronDownIcon
          aria-hidden
          className="h-4 w-4 shrink-0 text-[color:var(--chevron-idle)] transition-colors group-hover:text-[color:var(--nav-hover)]"
        />
      </button>
      {open ? (
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className="absolute left-0 top-full z-[60] pt-2"
        >
          <div
            className="flex w-[min(40rem,calc(100vw-4rem))] max-w-2xl flex-col gap-6 rounded-[0.5rem] border border-solid bg-white p-6 shadow-lg"
            style={{ borderColor: NEUTRAL_GREY[200] }}
          >
            {SOFTWARE_OFFERINGS.map((offering, i) => (
              <div
                key={offering.title}
                className={i > 0 ? "border-t border-solid pt-6" : ""}
                style={
                  i > 0 ? { borderTopColor: NEUTRAL_GREY[200] } : undefined
                }
              >
                <a
                  href="#"
                  className={`inline-flex ${HEADER_V1_NAV_ITEM_CLASSES}`}
                  style={HEADER_V1_LINK_VARS}
                >
                  {offering.title}
                </a>
                <p
                  className="mt-2 text-[1rem] leading-[1.6] font-normal"
                  style={{ color: NEUTRAL_GREY[700] }}
                >
                  {offering.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function HeaderV1SoftwareSectionMobile({ onClose }: { onClose: () => void }) {
  const linkTap = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div
      className="border-b border-solid py-4"
      style={{ borderBottomColor: NEUTRAL_GREY[200] }}
    >
      <p
        className="text-[1rem] leading-[1.6] font-semibold"
        style={{ color: BRAND_NAVY[900] }}
      >
        Software
      </p>
      <div className="mt-4 space-y-5">
        {SOFTWARE_OFFERINGS.map((offering) => (
          <div key={offering.title}>
            <HeaderV1NavLink href="#" className="block w-full" onClick={linkTap} onLight>
              {offering.title}
            </HeaderV1NavLink>
            <p
              className="mt-1.5 text-[1rem] leading-[1.6] font-normal"
              style={{ color: NEUTRAL_GREY[700] }}
            >
              {offering.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeaderV1AboutFlyoutDesktop() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonId = useId();
  const barChrome = useHeaderV1BarTriggerChrome();

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
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        id={buttonId}
        type="button"
        className={`group inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0 ${barChrome.navItemClasses}`}
        style={barChrome.linkVars}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={panelId}
      >
        About
        <ChevronDownIcon
          aria-hidden
          className="h-4 w-4 shrink-0 text-[color:var(--chevron-idle)] transition-colors group-hover:text-[color:var(--nav-hover)]"
        />
      </button>
      {open ? (
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className="absolute left-0 top-full z-[60] pt-2"
        >
          <div
            className="min-w-[14rem] rounded-[0.5rem] border border-solid bg-white py-1 shadow-lg"
            style={{ borderColor: NEUTRAL_GREY[200] }}
          >
            {ABOUT_SUBLINKS.map((label) => (
              <a
                key={label}
                href="#"
                className={`block px-4 py-2.5 ${HEADER_V1_NAV_ITEM_CLASSES}`}
                style={HEADER_V1_LINK_VARS}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function HeaderV1AboutSectionMobile({ onClose }: { onClose: () => void }) {
  const linkTap = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div
      className="border-b border-solid py-4"
      style={{ borderBottomColor: NEUTRAL_GREY[200] }}
    >
      <p
        className="text-[1rem] leading-[1.6] font-semibold"
        style={{ color: BRAND_NAVY[900] }}
      >
        About
      </p>
      <ul className="mt-3 list-none space-y-1 p-0">
        {ABOUT_SUBLINKS.map((label) => (
          <li key={label}>
            <HeaderV1NavLink href="#" className="block w-full py-2" onClick={linkTap} onLight>
              {label}
            </HeaderV1NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

const PROMOTION_BAR_MESSAGE =
  "Epicor Turns to Exactera for More Efficient, Audit-Ready Global Transfer Pricing";

const PROMOTION_DISMISS_BUTTON_CLASSES =
  "flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-white transition-opacity hover:opacity-80 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

type PromotionBarVariant = "v1-mint" | "v2-navy";

function PromotionBarDismissible({ variant }: { variant: PromotionBarVariant }) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) {
    return null;
  }

  const isMint = variant === "v1-mint";
  const barBg = isMint ? BRAND_MINT[600] : BRAND_NAVY[900];
  const readMoreColor = isMint ? BRAND_MINT[100] : BRAND_NAVY[200];

  return (
    <div
      className="h-[2.5rem] text-white"
      style={{ backgroundColor: barBg }}
    >
      <div className="mx-auto flex h-full max-w-[1320px] items-center gap-3 px-6 sm:gap-4">
        <div className="min-w-0 flex-1">
          <p className="hidden text-[0.875rem] leading-[1.55] font-semibold md:block truncate">
            {PROMOTION_BAR_MESSAGE}
          </p>
          <div
            className="promotion-bar-message-scroll md:hidden min-h-[1lh] overflow-x-hidden overflow-y-hidden motion-reduce:overflow-x-auto"
            aria-label={PROMOTION_BAR_MESSAGE}
          >
            <div className="promotion-bar-message-track">
              <span className="inline-block whitespace-nowrap pr-12 text-[0.875rem] leading-[1.55] font-semibold">
                {PROMOTION_BAR_MESSAGE}
              </span>
              <span
                className="inline-block whitespace-nowrap pr-12 text-[0.875rem] leading-[1.55] font-semibold"
                aria-hidden
              >
                {PROMOTION_BAR_MESSAGE}
              </span>
            </div>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="inline-flex h-[2rem] cursor-pointer items-center justify-center rounded-[0.5rem] border border-solid px-4 text-[1rem] leading-[1.6] font-bold focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
            style={{
              backgroundColor: "transparent",
              borderColor: readMoreColor,
              color: readMoreColor,
            }}
          >
            Read More
          </button>
          <button
            type="button"
            className={PROMOTION_DISMISS_BUTTON_CLASSES}
            aria-label="Dismiss announcement"
            onClick={() => setDismissed(true)}
          >
            <XMarkIcon className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}

function PromotionBarV1() {
  return <PromotionBarDismissible variant="v1-mint" />;
}

export function PromotionBarV2() {
  return <PromotionBarDismissible variant="v2-navy" />;
}

function HeaderV1UserMenu() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const buttonId = useId();
  const chrome = useHeaderV1Chrome();
  const glass = chrome === "glass-on-dark";

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
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        id={buttonId}
        type="button"
        className={glass ? HEADER_V1_ICON_BUTTON_CLASSES_OVERLAY : HEADER_V1_ICON_BUTTON_CLASSES}
        style={glass ? HEADER_V1_LINK_VARS_OVERLAY : HEADER_V1_LINK_VARS}
        aria-label="Account menu"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
      >
        <UserIcon className="h-6 w-6" aria-hidden />
      </button>
      {open ? (
        <div className="absolute right-0 top-full z-50 flex min-w-[12rem] flex-col items-stretch pt-1">
          <div
            id={menuId}
            role="menu"
            aria-labelledby={buttonId}
            className="rounded-[0.5rem] border border-solid bg-white py-1 shadow-lg"
            style={{ borderColor: NEUTRAL_GREY[200] }}
          >
            {USER_MENU_ITEMS.map((label) => (
              <button
                key={label}
                type="button"
                role="menuitem"
                className="flex w-full px-4 py-2.5 text-left text-[1rem] leading-[1.6] font-semibold transition-colors focus:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-zinc-900 text-[color:var(--nav-idle)] hover:text-[color:var(--nav-hover)]"
                style={HEADER_V1_LINK_VARS}
                onClick={() => setOpen(false)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

/** Global chrome header — desktop + mobile; see file doc. */
export type HeaderV1Variant = "default" | "mobile-specimen";

export function HeaderV1({
  className = "",
  variant = "default",
  headerChrome = "default",
}: {
  className?: string;
  variant?: HeaderV1Variant;
  /** Frosted bar + white logo/nav on video/dark heroes (e.g. Prototype 2). */
  headerChrome?: HeaderV1Chrome;
}) {
  return (
    <HeaderV1ChromeContext.Provider value={headerChrome}>
      <HeaderV1Inner className={className} variant={variant} />
    </HeaderV1ChromeContext.Provider>
  );
}

function HeaderV1Inner({
  className = "",
  variant,
}: {
  className?: string;
  variant: HeaderV1Variant;
}) {
  const chrome = useHeaderV1Chrome();
  const isGlass = chrome === "glass-on-dark";
  const barIconClass = isGlass ? HEADER_V1_ICON_BUTTON_CLASSES_OVERLAY : HEADER_V1_ICON_BUTTON_CLASSES;
  const barIconVars = isGlass ? HEADER_V1_LINK_VARS_OVERLAY : HEADER_V1_LINK_VARS;

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const mobilePanelId = useId();
  const isForcedMobile = variant === "mobile-specimen";

  const closeMobileNav = () => setMobileNavOpen(false);
  const closeMobileNavFromLink = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    closeMobileNav();
  };

  useEffect(() => {
    if (!mobileNavOpen) {
      return;
    }
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    if (!mobileNavOpen) {
      return;
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileNavOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileNavOpen]);

  const desktopClusterClass = isForcedMobile ? "hidden" : "hidden lg:flex";
  const mobileClusterClass = isForcedMobile ? "flex" : "flex lg:hidden";
  const desktopNavClass = isForcedMobile ? "hidden" : "hidden min-w-0 flex-wrap items-center gap-x-4 gap-y-2 sm:gap-x-6 lg:flex";
  const drawerViewportClass = isForcedMobile ? "" : "lg:hidden";

  const iconCluster = (
    <>
      <button
        type="button"
        className={barIconClass}
        style={barIconVars}
        aria-label="Search"
      >
        <MagnifyingGlassIcon className="h-6 w-6" aria-hidden />
      </button>

      <HeaderV1UserMenu />
    </>
  );

  return (
    <>
      <header
        className={`h-[4.5rem] ${isGlass ? "absolute top-0 right-0 left-0 z-50 border-b border-white/15 bg-white/10 backdrop-blur-xl backdrop-saturate-150" : "bg-white"} ${className}`.trim()}
        style={
          isGlass
            ? undefined
            : {
                borderBottomWidth: 1,
                borderBottomStyle: "solid",
                borderBottomColor: NEUTRAL_GREY[200],
              }
        }
      >
        <div className="mx-auto flex h-full max-w-[1320px] items-center justify-between gap-4 px-6">
          <div className="flex min-w-0 flex-1 items-center gap-6 lg:gap-8">
            <a href="#" className="shrink-0">
              <Image
                src="/logo.svg"
                alt="Exactera"
                width={182}
                height={34}
                className={`h-8 w-auto ${isGlass ? "brightness-0 invert" : ""}`.trim()}
              />
            </a>

            <nav className={desktopNavClass} aria-label="Primary">
              <HeaderV1ServicesFlyoutDesktop />
              <HeaderV1SoftwareFlyoutDesktop />
              <HeaderV1NavLink href="#">Pricing</HeaderV1NavLink>
              <HeaderV1AboutFlyoutDesktop />
              <HeaderV1NavLink href="#">Contact</HeaderV1NavLink>
            </nav>
          </div>

          <div className={`${desktopClusterClass} shrink-0 items-center gap-6 sm:gap-10`}>
            <div className="flex items-center gap-3 sm:gap-4">{iconCluster}</div>
            <SpeakToExpertPrimaryCtaButton />
          </div>

          <div className={`${mobileClusterClass} shrink-0 items-center gap-3`}>
            {iconCluster}
            <button
              type="button"
              className={barIconClass}
              style={barIconVars}
              aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileNavOpen}
              aria-controls={mobilePanelId}
              onClick={() => setMobileNavOpen((o) => !o)}
            >
              {mobileNavOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden />
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[100] ${drawerViewportClass} ${
          mobileNavOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!mobileNavOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/40 transition-opacity duration-[420ms] ease-out motion-reduce:transition-none ${
            mobileNavOpen ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Close menu"
          tabIndex={mobileNavOpen ? 0 : -1}
          onClick={closeMobileNav}
        />
        <div
          id={mobilePanelId}
          role="dialog"
          aria-modal={mobileNavOpen}
          aria-hidden={!mobileNavOpen}
          aria-label="Primary navigation"
          className={`absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-xl transition-transform duration-[420ms] ease-out motion-reduce:transition-none ${
            mobileNavOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{
            borderLeftWidth: 1,
            borderLeftStyle: "solid",
            borderLeftColor: NEUTRAL_GREY[200],
          }}
        >
            <div
              className="flex h-[4.5rem] shrink-0 items-center justify-between border-b border-solid px-6"
              style={{ borderBottomColor: NEUTRAL_GREY[200] }}
            >
              <span
                className="text-[1rem] leading-[1.6] font-semibold"
                style={{ color: BRAND_NAVY[900] }}
              >
                Menu
              </span>
              <button
                type="button"
                className={HEADER_V1_ICON_BUTTON_CLASSES}
                style={HEADER_V1_LINK_VARS}
                aria-label="Close menu"
                onClick={closeMobileNav}
              >
                <XMarkIcon className="h-6 w-6" aria-hidden />
              </button>
            </div>

            <nav
              className="flex flex-1 flex-col overflow-y-auto px-6 py-2"
              aria-label="Primary"
            >
              <HeaderV1ServicesSectionMobile onClose={closeMobileNav} />
              <HeaderV1SoftwareSectionMobile onClose={closeMobileNav} />
              <HeaderV1AboutSectionMobile onClose={closeMobileNav} />
              {HEADER_V1_MOBILE_NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="border-b border-solid py-4 last:border-b-0"
                  style={{ borderBottomColor: NEUTRAL_GREY[200] }}
                >
                  <HeaderV1NavLink
                    href={item.href}
                    className="block w-full"
                    onClick={closeMobileNavFromLink}
                    onLight
                  >
                    {item.label}
                  </HeaderV1NavLink>
                </div>
              ))}
            </nav>

            <div
              className="shrink-0 border-t border-solid p-6"
              style={{ borderTopColor: NEUTRAL_GREY[200] }}
            >
              <SpeakToExpertPrimaryCtaButton className="w-full" />
            </div>
          </div>
        </div>
    </>
  );
}

export function DesignSystemHeaderFooter() {
  return (
    <section
      aria-labelledby="ds-header-footer-heading"
      className="space-y-10 [font-family:var(--font-plus-jakarta),system-ui,sans-serif]"
    >
      <div>
        <h3
          id="ds-header-footer-heading"
          className="text-sm font-semibold tracking-wide text-zinc-500 uppercase"
        >
          Header and footer
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-zinc-600">
          Layout specimens for global chrome. Definitions and tokens live in this
          file.
        </p>
      </div>

      <div>
        <h4 className="text-xs font-semibold tracking-wide text-zinc-500 uppercase">
          Promotion bar V1
        </h4>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-zinc-600">
          2.5rem mint 600 strip; Body Small semibold white copy; Read More is
          outline-only (mint 100). Trailing X dismisses the bar until you refresh.
        </p>

        <div className="mt-4">
          <PromotionBarV1 />
        </div>
      </div>

      <div>
        <h4 className="text-xs font-semibold tracking-wide text-zinc-500 uppercase">
          Promotion bar V2
        </h4>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-zinc-600">
          Same layout; navy 900 background; Read More outline (navy 200). X dismisses
          until refresh.
        </p>

        <div className="mt-4">
          <PromotionBarV2 />
        </div>
      </div>

      <div>
        <h4 className="text-xs font-semibold tracking-wide text-zinc-500 uppercase">
          Header V1
        </h4>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-zinc-600">
          4.5rem bar; content max-width 1320px. Nav hovers use brand mint 600. Below{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs">lg</code>, primary
          CTA moves into the slide-out drawer with Search, Account, and Menu in the bar.
        </p>

        <HeaderV1 className="mt-4" />

        <h4 className="mt-10 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
          Header V1 (mobile specimen)
        </h4>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-zinc-600">
          Fixed ~390px preview — mobile chrome at any viewport (
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs">
            variant=&quot;mobile-specimen&quot;
          </code>
          ).
        </p>

        <div className="mt-4 w-full max-w-[390px] overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 shadow-inner">
          <HeaderV1 variant="mobile-specimen" />
        </div>
      </div>

      <div>
        <h4 className="text-xs font-semibold tracking-wide text-zinc-500 uppercase">
          Client logos strip
        </h4>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-zinc-600">
          Social proof band: centered headline (<strong>NEUTRAL_GREY</strong> 600),{" "}
          <strong>NEUTRAL_GREY</strong> 50 background, bottom border 200. Logos are
          greyscaled with subtle opacity; duplicated row marquees infinitely (
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs">
            globals.css
          </code>
          ). Full definition in <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs">prototype-client-logos-strip.tsx</code>.
        </p>

        <div className="mt-4 overflow-hidden rounded-lg border border-zinc-200">
          <PrototypeClientLogosStrip />
        </div>
      </div>
    </section>
  );
}
