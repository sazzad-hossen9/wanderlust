import type { Metadata } from "next";
import { Suspense } from "react";
import { DestinationsList } from "./destinations-list";

export const metadata: Metadata = {
  title: "Explore All Destinations | Wanderlast",
  description:
    "Browse all curated travel destinations, filter by category, price and rating, and book your next trip.",
};

// Fetches the travel API at request time; <Suspense> streams the skeleton
// while the request (to the separately-running backend) is in flight.
export const dynamic = "force-dynamic";

function ListSkeleton() {
  return (
    <div>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-9 animate-pulse rounded-[4px] bg-muted"
          />
        ))}
      </div>

      <div className="mt-4 h-5 w-44 animate-pulse rounded bg-muted" />

      <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <li key={index} className="h-full">
            <div className="flex h-full flex-col bg-white shadow-sm">
              <div className="aspect-video animate-pulse bg-brand-tint" />
              <div className="flex flex-1 flex-col gap-3 p-4">
                <div className="h-3 w-20 animate-pulse bg-brand-tint" />
                <div className="h-5 w-3/4 animate-pulse rounded bg-brand-tint" />
                <div className="h-3 w-24 animate-pulse bg-brand-tint" />
                <div className="mt-auto h-3 w-16 animate-pulse bg-brand-tint" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DestinationsPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 pt-10 pb-24">
      <h1 className="font-serif text-4xl">Explore All Destinations</h1>
      <p className="mt-2 text-base text-muted-foreground">
        Find your perfect travel experience from our curated collection
      </p>
      <Suspense fallback={<ListSkeleton />}>
        <DestinationsList />
      </Suspense>
    </main>
  );
}
