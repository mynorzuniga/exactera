import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Exactera · Prototype 2",
  description: "Interactive prototype 2 for Exactera.",
};

export default function Prototype2Page() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-zinc-50 font-sans text-zinc-900">
      <main className="mx-auto w-full max-w-screen-2xl flex-1 px-6 py-12 sm:px-10 lg:px-12 lg:py-16">
        <p className="text-sm text-zinc-500">
          <Link
            href="/"
            className="font-medium text-zinc-700 underline underline-offset-[3px] hover:text-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
          >
            ← Design system
          </Link>
        </p>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
          Prototype 2
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
          Placeholder for the second prototype route.
        </p>
      </main>
    </div>
  );
}
