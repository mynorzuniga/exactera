/** Pure token constants (no `"use client"`). Import from here in Server Components / `app/` pages. */

export const SHADE_STEPS = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
] as const;

/** True neutral grey: equal R, G, B — no hue. */
export const NEUTRAL_GREY: Record<(typeof SHADE_STEPS)[number], string> = {
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#e5e5e5",
  300: "#d4d4d4",
  400: "#a3a3a3",
  500: "#737373",
  600: "#525252",
  700: "#404040",
  800: "#262626",
  900: "#171717",
  950: "#0a0a0a",
};

export const GREEN: Record<(typeof SHADE_STEPS)[number], string> = {
  50: "#ecfdf5",
  100: "#d1fae5",
  200: "#a7f3d0",
  300: "#6ee7b7",
  400: "#34d399",
  500: "#10b981",
  600: "#059669",
  700: "#047857",
  800: "#065f46",
  900: "#064e3b",
  950: "#022c22",
};

export const YELLOW: Record<(typeof SHADE_STEPS)[number], string> = {
  50: "#fffbeb",
  100: "#fef3c7",
  200: "#fde68a",
  300: "#fcd34d",
  400: "#fbbf24",
  500: "#f59e0b",
  600: "#d97706",
  700: "#b45309",
  800: "#92400e",
  900: "#78350f",
  950: "#451a03",
};

export const RED: Record<(typeof SHADE_STEPS)[number], string> = {
  50: "#fef2f2",
  100: "#fee2e2",
  200: "#fecaca",
  300: "#fca5a5",
  400: "#f87171",
  500: "#ef4444",
  600: "#dc2626",
  700: "#b91c1c",
  800: "#991b1b",
  900: "#7f1d1d",
  950: "#450a0a",
};

/** Mint brand ramp — anchor #10c585 at 500. */
export const BRAND_MINT: Record<(typeof SHADE_STEPS)[number], string> = {
  50: "#f2fcf9",
  100: "#dcf8ee",
  200: "#b8f0dc",
  300: "#7fe4c4",
  400: "#42d5a8",
  500: "#10c585",
  600: "#0da873",
  700: "#0b8a60",
  800: "#0c6f4e",
  900: "#0a5b41",
  950: "#033027",
};

/** Navy brand ramp — anchor #232a5c at 900. */
export const BRAND_NAVY: Record<(typeof SHADE_STEPS)[number], string> = {
  50: "#f5f6fc",
  100: "#ebedf8",
  200: "#d8dbf0",
  300: "#b9bddf",
  400: "#9399cb",
  500: "#7179b5",
  600: "#585f9d",
  700: "#454c82",
  800: "#393f6d",
  900: "#232a5c",
  950: "#141839",
};
