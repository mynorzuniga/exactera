<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Design system (`system.md`)

For UI, prototypes, tokens, typography, spacing, or brand-aligned components, read **`system.md`** first (foundations + where components live). **Component definitions** (variants, anatomy, tokens per component) belong in the **source file** `system.md` references—keep those files authoritative; extend **`system.md`** mainly for registry paths and foundations. Do not invent undocumented tokens or patterns unless the owner explicitly directs you (then document them in the right place).

**Default content width:** primary layout columns use **`max-w-[1320px]`** (centered, with padding) per **`system.md`** — Brand & layout cues; do not substitute a wider default (e.g. `max-w-screen-2xl`) for main content unless the user directs it and the doc is updated.
