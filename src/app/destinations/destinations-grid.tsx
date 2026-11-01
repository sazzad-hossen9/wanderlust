"use client";

import Image from "next/image";
import * as React from "react";
import { ArrowUpRight, CalendarDays, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type Destination = {
  id: string;
  title: string;
  country: string;
  price: number | null;
  rating: number | null;
  image: string | null;
  duration: string | null;
  category: string | null;
};

const categoryOptions = [
  "All",
  "Beach",
  "Mountain",
  "Adventure",
  "Honeymoon",
  "Cultural",
  "Wildlife",
] as const;

const priceOptions = [
  { value: "any", label: "Any price" },
  { value: "under-1500", label: "Under $1,500" },
  { value: "1500-3000", label: "$1,500 - $3,000" },
  { value: "over-3000", label: "Over $3,000" },
] as const;

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
] as const;

const triggerClasses =
  "h-9 w-full rounded-[4px] bg-white px-4 text-[13px] tracking-wide uppercase";

function withinPriceRange(
  price: number | null,
  range: string | null,
): boolean {
  if (range === null || range === "any") return true;
  if (price === null) return false;
  if (range === "under-1500") return price < 1500;
  if (range === "1500-3000") return price >= 1500 && price <= 3000;
  return price > 3000;
}

function sortDestinations(
  destinations: Destination[],
  sort: string | null,
): Destination[] {
  const sorted = [...destinations];
  if (sort === "price-low") {
    sorted.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
  } else if (sort === "price-high") {
    sorted.sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
  } else if (sort === "rating") {
    sorted.sort((a, b) => (b.rating ?? -1) - (a.rating ?? -1));
  }
  return sorted;
}

function DestinationCard({ destination }: { destination: Destination }) {
  const { title, country, price, rating, image, duration } = destination;

  return (
    <article className="flex h-full flex-col bg-white shadow-sm">
      <div className="relative aspect-video overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={`${title}${country ? `, ${country}` : ""}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-brand-tint text-sm text-muted-foreground">
            No image
          </div>
        )}
        {rating !== null && (
          <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-foreground">
            {String(rating)}
            <Star className="size-3.5 fill-foreground text-foreground" />
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        {country && (
          <p className="flex items-center gap-1.5 text-xs text-foreground/70">
            <MapPin className="size-3.5" />
            {country}
          </p>
        )}

        <div className="mt-1.5 flex items-baseline justify-between gap-3">
          <h3 className="font-serif text-base">{title}</h3>
          {price !== null && (
            <p className="shrink-0 text-sm font-semibold">
              ${price.toLocaleString("en-US")}
              <span className="text-[11px] font-normal text-foreground/60">
                /Person
              </span>
            </p>
          )}
        </div>

        {duration && (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-foreground/70">
            <CalendarDays className="size-3.5" />
            {duration}
          </p>
        )}

        <Button
          variant="link"
          type="button"
          className="mt-auto h-auto self-start p-0 text-xs font-semibold tracking-wide text-brand underline underline-offset-2 hover:text-brand/80"
        >
          BOOK NOW
          <ArrowUpRight data-icon="inline-end" />
        </Button>
      </div>
    </article>
  );
}

export function DestinationsGrid({
  destinations,
  emptyNote,
}: {
  destinations: Destination[];
  emptyNote?: string;
}) {
  const [category, setCategory] = React.useState<string | null>(null);
  const [priceRange, setPriceRange] = React.useState<string | null>(null);
  const [sort, setSort] = React.useState<string | null>(null);

  const visible = React.useMemo(() => {
    const filtered = destinations.filter((destination) => {
      if (
        category &&
        category !== "All" &&
        destination.category?.toLowerCase() !== category.toLowerCase()
      ) {
        return false;
      }
      return withinPriceRange(destination.price, priceRange);
    });
    return sortDestinations(filtered, sort);
  }, [destinations, category, priceRange, sort]);

  return (
    <div>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <Select value={category ?? undefined} onValueChange={setCategory}>
          <SelectTrigger aria-label="Filter by category" className={triggerClasses}>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categoryOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={priceRange ?? undefined} onValueChange={setPriceRange}>
          <SelectTrigger aria-label="Filter by price range" className={triggerClasses}>
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            {priceOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sort ?? undefined} onValueChange={setSort}>
          <SelectTrigger aria-label="Sort destinations" className={triggerClasses}>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <p className="mt-4 text-sm text-foreground/80">
        Showing {visible.length}{" "}
        {visible.length === 1 ? "destination" : "destinations"}
      </p>

      {visible.length === 0 ? (
        <p className="mt-5 text-base text-muted-foreground">
          {emptyNote ?? "No destinations match your filters."}
        </p>
      ) : (
        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((destination) => (
            <li key={destination.id} className="h-full">
              <DestinationCard destination={destination} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
