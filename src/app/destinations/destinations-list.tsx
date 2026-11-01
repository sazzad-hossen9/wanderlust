import { DestinationsGrid, type Destination } from "./destinations-grid";

// The travel API backend (runs separately, outside this Next.js app).
const API_URL = "http://localhost:5000/destination";

type RawDestination = {
  _id?: string | number;
  id?: string | number;
  title?: string;
  name?: string;
  country?: string;
  location?: string;
  price?: string | number;
  rating?: string | number;
  image?: string;
  image_url?: string;
  imageUrl?: string;
  days?: number;
  nights?: number;
  duration?: string;
  category?: string;
};

function toNumber(value: string | number | undefined): number | null {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function mapDestination(raw: RawDestination, index: number): Destination {
  const idValue = raw._id ?? raw.id;
  const title = raw.title ?? raw.name ?? "Untitled destination";

  const fallbackDuration =
    raw.days !== undefined || raw.nights !== undefined
      ? `${raw.days ?? 0} Days/${raw.nights ?? 0} Nights`
      : null;

  return {
    id: idValue != null ? String(idValue) : `${title}-${index}`,
    title,
    country: raw.country ?? raw.location ?? "",
    price: toNumber(raw.price),
    rating: toNumber(raw.rating),
    image: raw.image ?? raw.image_url ?? raw.imageUrl ?? null,
    duration:
      raw.duration && raw.duration.trim() !== ""
        ? raw.duration
        : fallbackDuration,
    category: raw.category && raw.category.trim() !== "" ? raw.category : null,
  };
}

export async function DestinationsList() {
  let destinations: Destination[] = [];
  let failed = false;

  try {
    const res = await fetch(API_URL, { cache: "no-store" });
    if (res.ok) {
      const raw = (await res.json()) as RawDestination[];
      if (Array.isArray(raw)) {
        destinations = raw.map(mapDestination);
      }
    } else {
      failed = true;
    }
  } catch {
    failed = true;
  }

  const emptyNote = failed
    ? "We couldn't load destinations right now. Please make sure the travel API is running and try again."
    : "No destinations found.";

  return <DestinationsGrid destinations={destinations} emptyNote={emptyNote} />;
}
