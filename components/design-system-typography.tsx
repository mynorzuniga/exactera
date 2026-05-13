import type { ReactNode } from "react";

const SAMPLE =
  "Combine expert guidance with scalable tooling across your tax lifecycle.";

const WEIGHTS = [
  { label: "Regular", className: "font-normal", numeric: 400 },
  { label: "Semibold", className: "font-semibold", numeric: 600 },
  { label: "Bold", className: "font-bold", numeric: 700 },
] as const;

/** Display sizes — Standard body is 1rem per spec. */
const HEADINGS = [
  {
    name: "Heading 1",
    fontSize: "3rem",
    lineHeight: 1.15,
    letterSpacing: "-0.02em",
  },
  {
    name: "Heading 2",
    fontSize: "2.25rem",
    lineHeight: 1.2,
    letterSpacing: "-0.02em",
  },
  {
    name: "Heading 3",
    fontSize: "1.875rem",
    lineHeight: 1.22,
    letterSpacing: "-0.015em",
  },
  {
    name: "Heading 4",
    fontSize: "1.5rem",
    lineHeight: 1.3,
    letterSpacing: "-0.01em",
  },
  {
    name: "Heading 5",
    fontSize: "1.25rem",
    lineHeight: 1.35,
    letterSpacing: "-0.005em",
  },
  {
    name: "Heading 6",
    fontSize: "1.125rem",
    lineHeight: 1.4,
    letterSpacing: "0",
  },
] as const;

const BODY_SCALES = [
  { name: "Body Big", fontSize: "1.125rem", lineHeight: 1.6 },
  { name: "Body Standard", fontSize: "1rem", lineHeight: 1.6 },
  { name: "Body Small", fontSize: "0.875rem", lineHeight: 1.55 },
  { name: "Body Micro", fontSize: "0.75rem", lineHeight: 1.5 },
] as const;

type ScaleRow = {
  name: string;
  fontSize: string;
  lineHeight: number;
  letterSpacing?: string;
};

function SpecimenGrid({
  title,
  description,
  rows,
  renderCell,
}: {
  title: string;
  description?: string;
  rows: readonly ScaleRow[];
  renderCell: (row: ScaleRow, weight: (typeof WEIGHTS)[number]) => ReactNode;
}) {
  return (
    <section className="space-y-4" aria-labelledby={`typ-${title.replace(/\s+/g, "-")}`}>
      <div>
        <h3
          id={`typ-${title.replace(/\s+/g, "-")}`}
          className="text-sm font-semibold uppercase tracking-wide text-zinc-500"
        >
          {title}
        </h3>
        {description ? (
          <p className="mt-1 max-w-2xl text-sm text-zinc-600">{description}</p>
        ) : null}
      </div>

      <div className="overflow-x-auto">
        <div
          className="inline-block min-w-full align-middle"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(10rem,12rem) repeat(3, minmax(10rem, 1fr))",
            gap: "1rem 1.25rem",
          }}
        >
          <div className="text-xs font-medium uppercase tracking-wide text-zinc-400" />
          {WEIGHTS.map((w) => (
            <div
              key={w.label}
              className="text-xs font-medium uppercase tracking-wide text-zinc-400"
            >
              {w.label}{" "}
              <span className="font-mono font-normal normal-case text-zinc-500">
                ({w.numeric})
              </span>
            </div>
          ))}

          {rows.map((row) => (
            <div key={row.name} className="contents">
              <div className="border-b border-zinc-100 py-3">
                <div className="text-sm font-medium text-zinc-800">{row.name}</div>
                <div className="mt-0.5 font-mono text-[0.6875rem] text-zinc-500">
                  {row.fontSize}
                  <span className="text-zinc-400"> · lh {row.lineHeight}</span>
                </div>
              </div>
              {WEIGHTS.map((weight) => (
                <div
                  key={`${row.name}-${weight.label}`}
                  className="flex items-center border-b border-zinc-100 py-3 text-zinc-900"
                >
                  {renderCell(row, weight)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DesignSystemTypography() {
  return (
    <div className="space-y-14 [font-family:var(--font-plus-jakarta),system-ui,sans-serif]">
      <div className="max-w-2xl space-y-2">
        <p className="text-base leading-7 text-zinc-600">
          Typography uses{" "}
          <span className="font-semibold text-zinc-800">Plus Jakarta Sans</span>{" "}
          (<span className="font-mono text-sm text-zinc-700">400 · 600 · 700</span>
          ). Body <span className="font-medium text-zinc-800">Standard</span> is{" "}
          <span className="font-mono text-sm">1rem</span> (16px at a 16px root).
        </p>
      </div>

      <SpecimenGrid
        title="Headings"
        rows={HEADINGS}
        renderCell={(row, weight) => (
          <p
            className={`max-w-none whitespace-nowrap ${weight.className}`}
            style={{
              fontSize: row.fontSize,
              lineHeight: row.lineHeight,
              letterSpacing: row.letterSpacing ?? "normal",
            }}
          >
            {row.name}
          </p>
        )}
      />

      <SpecimenGrid
        title="Body"
        description="Four sizes; Standard matches 1rem."
        rows={BODY_SCALES}
        renderCell={(row, weight) => (
          <p
            className={`max-w-none ${weight.className}`}
            style={{
              fontSize: row.fontSize,
              lineHeight: row.lineHeight,
            }}
          >
            {SAMPLE}
          </p>
        )}
      />

      <SpecimenGrid
        title="Link"
        description="Same scale and weights as body, with underline."
        rows={BODY_SCALES.map(({ name, fontSize, lineHeight }) => ({
          name: name.replace(/^Body /, "Link "),
          fontSize,
          lineHeight,
        }))}
        renderCell={(row, weight) => (
          <span
            className={`underline decoration-zinc-900 underline-offset-[3px] ${weight.className}`}
            style={{
              fontSize: row.fontSize,
              lineHeight: row.lineHeight,
            }}
          >
            {SAMPLE}
          </span>
        )}
      />
    </div>
  );
}
