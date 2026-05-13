# Exactera design system — source of truth

This file is the **canonical specification** for design tokens, typography, spacing, brand assets, and documented UI patterns in this repo. Agents and humans MUST treat it as the contract for how Exactera prototypes and product UI are built here.

---

## Mandatory rules for agents

1. **Read this file before** implementing or changing UI, styling, layouts, tokens, or new components tied to the design system.
2. **Do not invent** tokens, color ramps, font stacks, naming, spacing scales, or component APIs that are not documented here **or** in the referenced source files listed below—unless the user explicitly tells you to add them (then update **`system.md`** for foundations/tokens and **the relevant component source file** for component definitions when applicable).
3. **Do not make arbitrary choices** where this document + linked code imply a controlled value (e.g. swapping hexes, inventing heading sizes, picking ad hoc shadows or radii). If the spec is silent:
   - **Stop and ask the user for clarification**, or
   - Propose wording to add here first, then implement after confirmation.
4. **Light mode only** unless this file is extended to describe dark-mode tokens.
5. **Keep parity**: when you change **tokens or typography constants** in code, update the matching subsection of this document. **Component anatomy, variants, and styling rules** stay in the **component source file** that `system.md` points to—do not duplicate full component specs here.
6. **Prototypes** (`app/prototype-*`, etc.) are built in code; **do not** record their page-level layout, copy, or section-by-section details here. **`system.md`** stays a **foundations + registry** reference, not a log of each prototype.

---

## Where it lives in code (reference implementations)

| Area | Primary file(s) |
|------|-----------------|
| Design system tabs (foundations + Components subtabs: CTA, Input, Header and Footer) | `components/design-system-tabs.tsx` |
| Colors (swatches UI) | `components/design-system-colors.tsx` |
| Color tokens (hex ramps, RSC-safe) | `lib/design-system-color-tokens.ts` |
| Spacing scale (presentational up to `5rem`) | `components/design-system-sizing.tsx` |
| Typography specimens | `components/design-system-typography.tsx` |
| App shell / design system home + prototype routes | `app/page.tsx`, `app/prototype-1/page.tsx`, `app/prototype-2/page.tsx`, `app/layout.tsx`, `app/globals.css` |
| Global header (V1 desktop + mobile drawer) + promotion bars | `components/design-system-header-footer.tsx` |
| Brand logo asset | `public/logo.svg` |
| Fonts (Next/font) | `app/layout.tsx` — `--font-geist-sans`, `--font-geist-mono`, `--font-plus-jakarta` |

Token **values** in code prevail if this file ever drifts out of date; agents should reconcile by updating `system.md`.

---

## Color tokens

Canonical hex values live in **`lib/design-system-color-tokens.ts`** (`export const SHADE_STEPS`: 50, 100 … 950). The **Colors** tab UI and copy-to-clipboard live in **`components/design-system-colors.tsx`** (client); **Server Components** in `app/` should import tokens from the **`lib`** file only, not from the client specimen module.

| Palette | Notes |
|---------|------|
| **Grey** | True neutral (**R = G = B**) at every step. |
| **Green** | Green ramp (`GREEN` constant). |
| **Yellow** | Yellow ramp (`YELLOW` constant). |
| **Red** | Red ramp (`RED` constant). |
| **Brand mint** | Base / generator seed **`#10c585`** at step **500** (star badge in UI). Full ramp `BRAND_MINT`. |
| **Brand navy** | Base / generator seed **`#232a5c`** at step **900** (star badge). Full ramp `BRAND_NAVY`. |
| **Base** | White `#ffffff`, Black `#000000`. |

Extended colors, semantic tokens (`primary-text`, etc.), borders, fills for components—**must be added here before use** unless the user approves inline.

---

## Typography

Canonical specimens and sizes live in **`components/design-system-typography.tsx`** and font loading in **`app/layout.tsx`**.

### Font stack

| Role | Specification |
|------|----------------|
| Brand / typography UI | **Plus Jakarta Sans**, CSS variable **`--font-plus-jakarta`**, loads weights **400, 600, 700**. |
| App default (outside specimens) | Geist Sans / Geist Mono still loaded; use Jakarta for DS-aligned prototype UI when instructed. |

### Weights

| Name | Tailwind-ish | Numeric |
|------|----------------|---------|
| Regular | `font-normal` | 400 |
| Semibold | `font-semibold` | 600 |
| Bold | `font-bold` | 700 |

Apply these three weights across **Heading 1–6**, **Body** sizes, **Link** sizes (underline per specimens).

### Headings — size / line-height / tracking (implementation constants)

Specimen labels in UI: “Heading 1” … “Heading 6”. Values:

| Level | `font-size` | `line-height` | `letter-spacing` |
|-------|-------------|---------------|-------------------|
| H1 | `3rem` | 1.15 | `-0.02em` |
| H2 | `2.25rem` | 1.2 | `-0.02em` |
| H3 | `1.875rem` | 1.22 | `-0.015em` |
| H4 | `1.5rem` | 1.3 | `-0.01em` |
| H5 | `1.25rem` | 1.35 | `-0.005em` |
| H6 | `1.125rem` | 1.4 | `0` |

### Body — sizes (standard = baseline)

| Name | `font-size` | `line-height` |
|------|-------------|---------------|
| Body Big | `1.125rem` | 1.6 |
| **Body Standard** | **`1rem`** (baseline) | 1.6 |
| Body Small | `0.875rem` | 1.55 |
| Body Micro | `0.75rem` | 1.5 |

### Links

Mirror **Body** sizing and weights; specimen uses **underline** plus **`underline-offset`** (Tailwind `underline-offset-[3px]` in implementation). Extend link colors / states **here first** once defined.

**Root assumption for px copy:** **`1rem` = `16px`** at document root (`ROOT_PX` in sizing component matches this).

---

## Spacing scale

Canonical step list: **`0.25rem` … `5rem`** in **`0.25rem`** increments (20 steps). Documented under **Sizing** tab; constant `REM_STEPS` in **`components/design-system-sizing.tsx`**.

Production may use **`> 5rem`**, but undocumented spacing **must not** be assumed—ask user or extend this doc.

---

## Brand & layout cues

| Item | Specification |
|------|----------------|
| Wordmark | `public/logo.svg` (`<Image src="/logo.svg" …>` on home headline). |
| Page width | Wide content container `max-w-screen-2xl` on home (`app/page.tsx`). |
| Tone | Professional tax / corporate UI; defer copy and IA to stakeholder input when unclear.

---

## Components (registry)

`system.md` lists **where** design-system components live. **Full definitions** (anatomy, variants, tokens, copy rules) live **only** in those files.

| Component | Source file |
|-----------|-------------|
| CTA buttons (specimens) | `components/design-system-cta-buttons.tsx` |
| Input (specimens) | `components/design-system-input.tsx` |
| Header, footer, promotion bars V1–V2 (`HeaderV1`, `PromotionBarV2`) | `components/design-system-header-footer.tsx` |

Promotion bars use client state: the **X** control hides the bar until the page is reloaded (not persisted).

_Add new rows here when you add component files; document the component in that file._

---

## Changelog mindset

Every time **foundations** (tokens, typography constants in TS/CSS, tables above) change in code, mirror the change **in this file** when that content is owned here. Component-only changes stay documented in the component file.
