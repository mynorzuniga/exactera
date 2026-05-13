"use client";

import {
  CalendarIcon,
  ChevronDownIcon,
  EyeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType, CSSProperties, SVGProps } from "react";
import { useId, useState } from "react";

import { BRAND_NAVY, NEUTRAL_GREY, RED } from "@/components/design-system-colors";

/**
 * Text field specimens for the design system (Components → Input tab).
 *
 * Element: `<input>` (single-line).
 * Font: Plus Jakarta Sans — inherited from section (`--font-plus-jakarta`).
 *
 * **Variants** (specimen rows; shared controls apply to all):
 * - **Default**: background white; border neutral grey **600**; focus-visible border **brand navy 600**; value text **800**; placeholder **400**; icon **800**.
 * - **Disabled**: background neutral grey **100**; border, value, placeholder, icon, and complementary text **400**; not interactive.
 * - **Error**: same as default except **idle** border **red 600**; focus-visible border still **brand navy 600**.
 *
 * Shared field metrics:
 * - Height: `3.25rem`
 * - Corner radius: `0.5rem`
 * - Border: **1px** solid
 * - Typography: Body Standard — `1rem`, `line-height: 1.6`
 *
 * **Field label** (optional): `0.25rem` above input (`margin-bottom`); Body Small — `0.875rem`, `line-height: 1.55`, `font-weight` 400; color matches **idle border** of the variant (grey **600**, grey **400** when disabled, red **600** when error). **Required** (when label is on): optional red **600** asterisk after the label (`RED[600]`).
 *
 * **Complementary text** (optional): `0.25rem` below field (`margin-top`); Body Small — `0.875rem`, `line-height: 1.55`, `font-weight` 400; neutral grey **600** (grey **400** when disabled).
 *
 * **Trailing icon** (optional): Eye (password), Calendar, Search — Heroicons 24 outline; replaceable via `ICON_OPTIONS`.
 *
 * **Ready to use** (default chrome only; not wired to variant toggles):
 * - **Dropdown**: `<button type="button">` shaped like the text field; shows **Selection option** in value (**800**) color; chevron **800** (`ChevronDownIcon`). Use `aria-haspopup` / `aria-expanded` when connecting a listbox.
 * - **Search bar**: `<input type="search">` with trailing **MagnifyingGlassIcon** (**800**).
 *
 * Tokens: `NEUTRAL_GREY`, `RED`, `BRAND_NAVY` in `lib/design-system-color-tokens.ts`.
 *
 * **Exports for composition**: {@link dsInputShellStyle}, {@link dsTextInputClassName},
 * {@link DS_INPUT_TRAILING_ICON_WRAPPER_CLASS} — keep header/toolbar fields aligned with this spec.
 */

type IconOptionId = "eye" | "calendar" | "search";

type FieldVariant = "default" | "disabled" | "error";

const ICON_OPTIONS: {
  id: IconOptionId;
  label: string;
  description: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}[] = [
  {
    id: "eye",
    label: "Eye",
    description: "Password",
    Icon: EyeIcon,
  },
  {
    id: "calendar",
    label: "Calendar",
    description: "Date",
    Icon: CalendarIcon,
  },
  {
    id: "search",
    label: "Search",
    description: "Magnifying glass",
    Icon: MagnifyingGlassIcon,
  },
];

const COMPLEMENTARY_COPY = "Complementary text";

const FIELD_LABEL_TEXT = "Label";

const DROPDOWN_DISPLAY_TEXT = "Selection option";

function shellStyleForVariant(variant: FieldVariant): CSSProperties {
  const focusBorder = BRAND_NAVY[600];

  if (variant === "disabled") {
    const g400 = NEUTRAL_GREY[400];
    return {
      ["--ds-input-bg" as string]: NEUTRAL_GREY[100],
      ["--ds-input-ph" as string]: g400,
      ["--ds-input-text" as string]: g400,
      ["--ds-input-border" as string]: g400,
      ["--ds-input-border-focus" as string]: g400,
      ["--ds-input-icon" as string]: g400,
      ["--ds-input-hint" as string]: g400,
      ["--ds-input-label" as string]: g400,
    };
  }

  if (variant === "error") {
    const hint = NEUTRAL_GREY[600];
    return {
      ["--ds-input-bg" as string]: "#ffffff",
      ["--ds-input-ph" as string]: NEUTRAL_GREY[400],
      ["--ds-input-text" as string]: NEUTRAL_GREY[800],
      ["--ds-input-border" as string]: RED[600],
      ["--ds-input-border-focus" as string]: focusBorder,
      ["--ds-input-icon" as string]: NEUTRAL_GREY[800],
      ["--ds-input-hint" as string]: hint,
      ["--ds-input-label" as string]: RED[600],
    };
  }

  const hint = NEUTRAL_GREY[600];
  const borderIdle = NEUTRAL_GREY[600];
  return {
    ["--ds-input-bg" as string]: "#ffffff",
    ["--ds-input-ph" as string]: NEUTRAL_GREY[400],
    ["--ds-input-text" as string]: NEUTRAL_GREY[800],
    ["--ds-input-border" as string]: borderIdle,
    ["--ds-input-border-focus" as string]: focusBorder,
    ["--ds-input-icon" as string]: NEUTRAL_GREY[800],
    ["--ds-input-hint" as string]: hint,
    ["--ds-input-label" as string]: borderIdle,
  };
}

export type DsInputFieldVariant = FieldVariant;

export function dsInputShellStyle(
  variant: DsInputFieldVariant,
): CSSProperties {
  return shellStyleForVariant(variant);
}

/**
 * `<input>` classes for design-system text fields. An ancestor must apply
 * {@link dsInputShellStyle} so `var(--ds-input-*)` resolve.
 */
export function dsTextInputClassName(options: {
  trailingIcon: boolean;
}): string {
  const paddingEnd = options.trailingIcon ? "pr-10" : "pr-3";
  return `w-full rounded-[0.5rem] border border-solid border-[color:var(--ds-input-border)] bg-[color:var(--ds-input-bg)] py-0 pl-3 ${paddingEnd} leading-[1.6] font-normal text-[1rem] text-[color:var(--ds-input-text)] placeholder:text-[color:var(--ds-input-ph)] focus:outline-none focus-visible:border-[color:var(--ds-input-border-focus)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 disabled:cursor-not-allowed h-[3.25rem]`;
}

/** Trailing icon layer (e.g. search). Use with {@link dsTextInputClassName} `trailingIcon: true`. */
export const DS_INPUT_TRAILING_ICON_WRAPPER_CLASS =
  "pointer-events-none absolute top-1/2 right-3 inline-flex -translate-y-1/2 [&_svg]:h-5 [&_svg]:w-5 [&_svg]:text-[color:var(--ds-input-icon)]";

function InputSpecimenRow({
  variant,
  fieldId,
  hintId,
  showFieldLabel,
  showRequired,
  showIcon,
  IconComponent,
  showComplementaryText,
  inputType,
  value,
  onChange,
  variantLabel,
}: {
  variant: FieldVariant;
  fieldId: string;
  hintId: string;
  showFieldLabel: boolean;
  showRequired: boolean;
  showIcon: boolean;
  IconComponent: ComponentType<SVGProps<SVGSVGElement>>;
  showComplementaryText: boolean;
  inputType: "text" | "password";
  value: string;
  onChange: (v: string) => void;
  variantLabel: string;
}) {
  const disabled = variant === "disabled";

  const describedBy = showComplementaryText ? hintId : undefined;
  const required = showFieldLabel && showRequired;

  return (
    <div className="space-y-1">
      <p className="text-xs font-semibold tracking-wide text-zinc-500 uppercase">
        {variantLabel}
      </p>
      <div className="w-full" style={shellStyleForVariant(variant)}>
        {showFieldLabel ? (
          <label
            htmlFor={fieldId}
            className="mb-[0.25rem] block text-[0.875rem] leading-[1.55] font-normal text-[color:var(--ds-input-label)]"
          >
            {FIELD_LABEL_TEXT}
            {showRequired ? (
              <span
                className="ml-0.5 font-normal"
                style={{ color: RED[600] }}
                aria-hidden
              >
                *
              </span>
            ) : null}
          </label>
        ) : null}
        <div className="relative w-full">
          <input
            id={fieldId}
            type={inputType}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Placeholder"
            autoComplete="off"
            disabled={disabled}
            aria-label={showFieldLabel ? undefined : "Demo field"}
            aria-required={required || undefined}
            aria-describedby={describedBy}
            className={dsTextInputClassName({ trailingIcon: showIcon })}
          />
          {showIcon ? (
            <span
              className={DS_INPUT_TRAILING_ICON_WRAPPER_CLASS}
              aria-hidden
            >
              <IconComponent />
            </span>
          ) : null}
        </div>
        {showComplementaryText ? (
          <p
            id={hintId}
            className="mt-[0.25rem] text-[0.875rem] leading-[1.55] font-normal text-[color:var(--ds-input-hint)]"
          >
            {COMPLEMENTARY_COPY}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function ReadyUseDropdownTrigger({ triggerId }: { triggerId: string }) {
  return (
    <div className="w-full space-y-1">
      <p className="text-xs font-semibold tracking-wide text-zinc-500 uppercase">
        Dropdown
      </p>
      <div className="w-full" style={shellStyleForVariant("default")}>
        <button
          id={triggerId}
          type="button"
          aria-haspopup="listbox"
          aria-expanded="false"
          className="inline-flex h-[3.25rem] w-full cursor-pointer items-center justify-between gap-2 rounded-[0.5rem] border border-solid border-[color:var(--ds-input-border)] bg-[color:var(--ds-input-bg)] px-3 text-left text-[1rem] leading-[1.6] font-normal focus:outline-none focus-visible:border-[color:var(--ds-input-border-focus)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
        >
          <span className="min-w-0 truncate text-[color:var(--ds-input-text)]">
            {DROPDOWN_DISPLAY_TEXT}
          </span>
          <ChevronDownIcon
            aria-hidden
            className="h-5 w-5 shrink-0 text-[color:var(--ds-input-icon)]"
          />
        </button>
      </div>
    </div>
  );
}

function ReadyUseSearchField({ fieldId }: { fieldId: string }) {
  const [value, setValue] = useState("");

  return (
    <div className="w-full space-y-1">
      <p className="text-xs font-semibold tracking-wide text-zinc-500 uppercase">
        Search bar
      </p>
      <div className="w-full" style={shellStyleForVariant("default")}>
        <div className="relative w-full">
          <input
            id={fieldId}
            type="search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search"
            autoComplete="off"
            className={dsTextInputClassName({ trailingIcon: true })}
          />
          <span
            className={DS_INPUT_TRAILING_ICON_WRAPPER_CLASS}
            aria-hidden
          >
            <MagnifyingGlassIcon />
          </span>
        </div>
      </div>
    </div>
  );
}

export function DesignSystemInput() {
  const [showFieldLabel, setShowFieldLabel] = useState(true);
  const [showRequired, setShowRequired] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [showComplementaryText, setShowComplementaryText] = useState(false);
  const [iconKind, setIconKind] = useState<IconOptionId>("search");
  const [valueDefault, setValueDefault] = useState("");
  const [valueDisabled, setValueDisabled] = useState("");
  const [valueError, setValueError] = useState("");

  const baseId = useId();
  const iconToggleId = `${baseId}-icon-toggle`;
  const labelToggleId = `${baseId}-label-toggle`;
  const requiredToggleId = `${baseId}-required-toggle`;
  const hintToggleId = `${baseId}-hint-toggle`;

  const selected = ICON_OPTIONS.find((o) => o.id === iconKind)!;
  const SelectedIcon = selected.Icon;

  const inputType =
    showIcon && iconKind === "eye" ? "password" : "text";

  return (
    <section
      aria-labelledby="ds-input-heading"
      className="space-y-6 [font-family:var(--font-plus-jakarta),system-ui,sans-serif]"
    >
      <div>
        <h3
          id="ds-input-heading"
          className="text-sm font-semibold tracking-wide text-zinc-500 uppercase"
        >
          Fields
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-zinc-600">
          Default, disabled, and error variants. Label, icon, complementary
          text, and icon type controls apply to every row.
        </p>
      </div>

      <div className="flex flex-wrap items-start gap-10">
        <div className="flex min-w-[12rem] max-w-md flex-1 flex-col gap-8">
          <InputSpecimenRow
            variant="default"
            variantLabel="Default"
            fieldId={`${baseId}-field-default`}
            hintId={`${baseId}-hint-default`}
            showFieldLabel={showFieldLabel}
            showRequired={showRequired}
            showIcon={showIcon}
            IconComponent={SelectedIcon}
            showComplementaryText={showComplementaryText}
            inputType={inputType}
            value={valueDefault}
            onChange={setValueDefault}
          />
          <InputSpecimenRow
            variant="disabled"
            variantLabel="Disabled"
            fieldId={`${baseId}-field-disabled`}
            hintId={`${baseId}-hint-disabled`}
            showFieldLabel={showFieldLabel}
            showRequired={showRequired}
            showIcon={showIcon}
            IconComponent={SelectedIcon}
            showComplementaryText={showComplementaryText}
            inputType={inputType}
            value={valueDisabled}
            onChange={setValueDisabled}
          />
          <InputSpecimenRow
            variant="error"
            variantLabel="Error"
            fieldId={`${baseId}-field-error`}
            hintId={`${baseId}-hint-error`}
            showFieldLabel={showFieldLabel}
            showRequired={showRequired}
            showIcon={showIcon}
            IconComponent={SelectedIcon}
            showComplementaryText={showComplementaryText}
            inputType={inputType}
            value={valueError}
            onChange={setValueError}
          />
        </div>

        <div className="flex min-w-[14rem] flex-col gap-4">
          <div className="flex items-center gap-2">
            <input
              id={labelToggleId}
              type="checkbox"
              checked={showFieldLabel}
              onChange={(e) => {
                const on = e.target.checked;
                setShowFieldLabel(on);
                if (!on) {
                  setShowRequired(false);
                }
              }}
              className="h-4 w-4 cursor-pointer rounded border border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
            />
            <label
              htmlFor={labelToggleId}
              className="cursor-pointer text-sm font-medium text-zinc-800"
            >
              Label
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              id={requiredToggleId}
              type="checkbox"
              checked={showRequired}
              disabled={!showFieldLabel}
              onChange={(e) => setShowRequired(e.target.checked)}
              className="h-4 w-4 cursor-pointer rounded border border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <label
              htmlFor={requiredToggleId}
              className={
                showFieldLabel
                  ? "cursor-pointer text-sm font-medium text-zinc-800"
                  : "cursor-not-allowed text-sm font-medium text-zinc-400"
              }
            >
              Required
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              id={iconToggleId}
              type="checkbox"
              checked={showIcon}
              onChange={(e) => setShowIcon(e.target.checked)}
              className="h-4 w-4 cursor-pointer rounded border border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
            />
            <label
              htmlFor={iconToggleId}
              className="cursor-pointer text-sm font-medium text-zinc-800"
            >
              Icon
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              id={hintToggleId}
              type="checkbox"
              checked={showComplementaryText}
              onChange={(e) => setShowComplementaryText(e.target.checked)}
              className="h-4 w-4 cursor-pointer rounded border border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
            />
            <label
              htmlFor={hintToggleId}
              className="cursor-pointer text-sm font-medium text-zinc-800"
            >
              Complementary text
            </label>
          </div>

          <fieldset className="space-y-2 border-0 p-0">
            <legend className="mb-2 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
              Icon type
            </legend>
            <div className="flex flex-col gap-2">
              {ICON_OPTIONS.map((opt) => {
                const rid = `${baseId}-icon-${opt.id}`;
                return (
                  <div key={opt.id} className="flex items-center gap-2">
                    <input
                      id={rid}
                      type="radio"
                      name={`${baseId}-icon-kind`}
                      value={opt.id}
                      checked={iconKind === opt.id}
                      onChange={() => setIconKind(opt.id)}
                      className="h-4 w-4 cursor-pointer border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
                    />
                    <label
                      htmlFor={rid}
                      className="cursor-pointer text-sm text-zinc-800"
                    >
                      {opt.label}{" "}
                      <span className="text-zinc-500">({opt.description})</span>
                    </label>
                  </div>
                );
              })}
            </div>
          </fieldset>
        </div>
      </div>

      <div
        className="border-t border-zinc-200 pt-10"
        aria-labelledby="ds-input-ready-heading"
      >
        <h3
          id="ds-input-ready-heading"
          className="text-sm font-semibold tracking-wide text-zinc-500 uppercase"
        >
          Ready to use
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-zinc-600">
          Dropdown trigger and search field using default field styling. These
          are not affected by the variant controls above.
        </p>
        <div className="mt-8 flex max-w-md flex-col gap-8">
          <ReadyUseDropdownTrigger
            triggerId={`${baseId}-ready-dropdown`}
          />
          <ReadyUseSearchField fieldId={`${baseId}-ready-search`} />
        </div>
      </div>
    </section>
  );
}
