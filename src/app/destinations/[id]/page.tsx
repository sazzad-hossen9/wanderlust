import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

import {
  ArrowLeft,
  CalendarDays,
  Check,
  MapPin,
  Star,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { BookingCard } from "./booking-card";
import EditDestinationDialog from "@/components/editDestinationDialog";

const API_URL = "http://localhost:5000/destination";

export const dynamic = "force-dynamic";

// Backend থেকে পাওয়া Raw Data
type RawDestination = {
  _id?: string | number;
  id?: string | number;

  title?: string;
  name?: string;
  "destination-name"?: string;

  country?: string;
  location?: string;
  category?: string;

  price?: string | number;
  rating?: string | number;
  reviews?: string | number;

  image?: string;
  "image-url"?: string;
  image_url?: string;

  days?: number;
  nights?: number;
  duration?: string;

  "departure-date"?: string;

  description?: string;
  overview?: string;

  highlights?: string[] | string;
};

// Normalized Destination Data
export type DestinationDetail = {
  id: string;
  title: string;
  country: string;
  category: string | null;
  price: number | null;
  rating: number | null;
  reviews: number | null;
  image: string | null;
  duration: string | null;
  departureDate: string | null;
  overview: string;
  highlights: string[];
};

// Number Convert Function
function toNumber(
  value: string | number | undefined
): number | null {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);

    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

// Default Highlights
const designHighlights = [
  "Luxury beachfront accommodation",
  "Traditional Balinese spa treatment",
  "Sunrise trek to Mount Batur",
  "Visit Uluwatu Temple at sunset",
  "Private beach dinner experience",
];

// Convert Backend Data
function mapDestination(
  raw: RawDestination
): DestinationDetail | null {
  const title =
    raw["destination-name"] ??
    raw.title ??
    raw.name;

  if (!title) return null;

  const id = String(raw._id ?? raw.id ?? "");

  if (!id) return null;

  const fallbackDuration =
    raw.days !== undefined || raw.nights !== undefined
      ? `${raw.days ?? 0} Days / ${raw.nights ?? 0} Nights`
      : null;

  let highlights: string[] = [];

  if (Array.isArray(raw.highlights)) {
    highlights = raw.highlights.filter(
      (item): item is string =>
        typeof item === "string" &&
        item.trim() !== ""
    );
  } else if (
    typeof raw.highlights === "string" &&
    raw.highlights.trim() !== ""
  ) {
    highlights = raw.highlights
      .split(/\r?\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return {
    id,

    title,

    country:
      raw.country ??
      raw.location ??
      "",

    category:
      raw.category ??
      null,

    price: toNumber(raw.price),

    rating: toNumber(raw.rating),

    reviews: toNumber(raw.reviews),

    image:
      raw["image-url"] ??
      raw.image ??
      raw.image_url ??
      null,

    duration:
      raw.duration && raw.duration.trim() !== ""
        ? raw.duration
        : fallbackDuration,

    departureDate:
      raw["departure-date"] ??
      null,

    overview: (
      raw.description ??
      raw.overview ??
      ""
    ).trim(),

    highlights:
      highlights.length > 0
        ? highlights
        : designHighlights,
  };
}

// Fetch Destination
const loadDestination = cache(
  async (
    id: string
  ): Promise<DestinationDetail | null> => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        cache: "no-store",
      });

      if (!res.ok) return null;

      const rawData = (await res.json()) as RawDestination;

      return mapDestination(rawData);
    } catch (error) {
      console.error("Destination fetch error:", error);

      return null;
    }
  }
);

// Page Props
type DetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

// SEO Metadata
export async function generateMetadata({
  params,
}: DetailsPageProps): Promise<Metadata> {
  const { id } = await params;

  const detail = await loadDestination(id);

  return {
    title: detail
      ? `${detail.title} | Wanderlast`
      : "Destination | Wanderlast",

    description:
      detail?.overview ||
      "Trip details, pricing and booking.",
  };
}

// Details Page
export default async function DetailsPage({
  params,
}: DetailsPageProps) {
  const { id } = await params;

  const detail = await loadDestination(id);

  if (!detail) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-6 pt-10 pb-24">

      {/* Top Bar */}

      <div className="flex flex-wrap items-center justify-between gap-3">

        <Link
          href="/destinations"
          className="flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Destinations
        </Link>

        <div className="flex items-center gap-2">

          {/* Edit Button */}

          <EditDestinationDialog detail={detail} />

          {/* Cancel Button */}

          <Button
            variant="outline"
            className="h-9 rounded-[4px] border-red-300 px-4 text-sm text-red-500 hover:bg-red-50 hover:text-red-500"
          >
            <Trash2 className="mr-2 size-4" />
            Cancel
          </Button>

        </div>
      </div>

      {/* Hero Image */}

      <div className="relative mt-5 aspect-[2.8/1] w-full overflow-hidden rounded-md bg-brand-tint">

        {detail.image ? (
          <Image
            src={detail.image}
            alt={`${detail.title}, ${detail.country}`}
            fill
            sizes="(min-width: 1280px) 1232px, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No image
          </div>
        )}

      </div>

      {/* Content + Booking Sidebar */}

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_352px]">

        {/* Left Content */}

        <article>

          {/* Country */}

          {detail.country && (
            <p className="flex items-center gap-1.5 text-sm text-foreground/70">
              <MapPin className="size-4 text-brand" />
              {detail.country}
            </p>
          )}

          {/* Title */}

          <h1 className="mt-2 font-serif text-4xl leading-tight lg:text-5xl">
            {detail.title}
          </h1>

          {/* Rating + Duration */}

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">

            {detail.rating !== null && (
              <span className="flex items-center gap-1.5">
                <Star className="size-4 fill-brand text-brand" />

                <span className="font-semibold">
                  {detail.rating}
                </span>
              </span>
            )}

            {detail.reviews !== null && (
              <span className="text-foreground/70">
                ({detail.reviews} reviews)
              </span>
            )}

            {detail.rating !== null &&
              detail.duration && (
                <span
                  aria-hidden
                  className="h-4 w-px bg-foreground/20"
                />
              )}

            {detail.duration && (
              <span className="flex items-center gap-1.5 font-medium">
                <CalendarDays className="size-4 text-brand" />
                {detail.duration}
              </span>
            )}

          </div>

          {/* Overview */}

          {detail.overview && (
            <section className="mt-10">

              <h2 className="font-serif text-2xl">
                Overview
              </h2>

              <p className="mt-3 max-w-2xl text-[15px] leading-7 text-foreground/75">
                {detail.overview}
              </p>

            </section>
          )}

          {/* Highlights */}

          <section className="mt-10">

            <h2 className="font-serif text-2xl">
              Highlights
            </h2>

            <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">

              {detail.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-center gap-2.5 text-sm text-foreground/80"
                >
                  <Check className="size-4 shrink-0 text-green-600" />

                  {highlight}
                </li>
              ))}

            </ul>

          </section>

        </article>

        {/* Right Booking Sidebar */}

        <aside className="self-start lg:border-l lg:border-border lg:pl-10">

          <BookingCard
            title={detail.title}
            price={detail.price}
            departureDate={detail.departureDate}
          />

        </aside>

      </div>

    </main>
  );
}