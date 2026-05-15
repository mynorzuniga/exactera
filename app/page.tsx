import Image from "next/image";
import Link from "next/link";

import { DesignSystemTabs } from "@/components/design-system-tabs";

const prototypeNavLinkClassName =
  "inline-flex items-center justify-center rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-900 shadow-sm transition-colors hover:border-zinc-400 hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-zinc-50 font-sans text-zinc-900">
      <main className="mx-auto w-full max-w-[1320px] flex-1 px-6 py-12 sm:px-10 lg:px-12 lg:py-16">
        <header className="border-b border-zinc-200 pb-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <h1 className="flex flex-wrap items-center gap-x-3 gap-y-2 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
                <span>DevSavant</span>
                <span aria-hidden className="font-normal text-zinc-400">
                  –
                </span>
                <Image
                  src="/logo.svg"
                  alt="Exactera"
                  width={182}
                  height={34}
                  className="h-8 w-auto sm:h-9"
                  priority
                />
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
                This page is the main root for the design system used across Exactera.
                Interactive prototypes and UI explorations documented here anchor
                how we ship consistent patterns, tokens, and components in the
                product.
              </p>
            </div>
            <nav
              className="flex shrink-0 flex-wrap items-center gap-3"
              aria-label="Interactive prototypes"
            >
              <Link href="/prototype-1" className={prototypeNavLinkClassName}>
                Prototype 1
              </Link>
              <Link href="/prototype-2" className={prototypeNavLinkClassName}>
                Prototype 2
              </Link>
              <Link href="/prototype-3" className={prototypeNavLinkClassName}>
                Prototype 3
              </Link>
            </nav>
          </div>
        </header>

        <section className="pt-10" aria-labelledby="design-system-groundwork">
          <h2 id="design-system-groundwork" className="sr-only">
            Design system groundwork
          </h2>
          <DesignSystemTabs />
        </section>
      </main>
    </div>
  );
}
