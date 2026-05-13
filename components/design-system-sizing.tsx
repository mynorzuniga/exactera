"use client";

const ROOT_PX = 16;

/** 0.25rem … 5rem in steps of 0.25rem (4px). */
const REM_STEPS: number[] = Array.from({ length: 20 }, (_, i) => (i + 1) * 0.25);

function formatRem(rem: number): string {
  const trimmed = rem.toFixed(2).replace(/\.?0+$/, "");
  return `${trimmed}rem`;
}

export function DesignSystemSizing() {
  return (
    <div className="space-y-8">
      <p className="max-w-2xl text-base leading-7 text-zinc-600">
        Spacing scale in{" "}
        <span className="font-medium text-zinc-800">rem</span>
        , assuming{" "}
        <span className="font-mono text-sm text-zinc-700">
          1rem = {ROOT_PX}px
        </span>{" "}
        on the root. Values increase by{" "}
        <span className="font-mono text-sm text-zinc-700">
          0.25rem
        </span>{" "}
        (4px) up to{" "}
        <span className="font-mono text-sm text-zinc-700">
          5rem
        </span>{" "}
        for reference; larger values are fine in production.
      </p>

      <div className="overflow-x-auto">
        <div className="min-w-[min(100%,42rem)] space-y-3">
          {REM_STEPS.map((rem) => {
            const px = rem * ROOT_PX;
            return (
              <div
                key={rem}
                className="flex items-center gap-4 sm:gap-6"
              >
                <div className="w-[5.5rem] shrink-0 font-mono text-[0.8125rem] font-medium tabular-nums text-zinc-800">
                  {formatRem(rem)}
                </div>
                <div className="flex min-w-0 flex-1 items-center">
                  <div
                    className="h-8 max-w-full shrink-0 rounded-sm bg-zinc-800"
                    style={{ width: `${rem}rem` }}
                  />
                </div>
                <div className="w-12 shrink-0 text-right font-mono text-[0.75rem] tabular-nums text-zinc-500">
                  {px}px
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
